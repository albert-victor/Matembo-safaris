import { hydrateSlideImage } from "./lazy-images.js";

const TICK_MS = 400;
const registry = new Set();
let masterTimer = null;

function syncMasterTimer() {
  if (!registry.size) {
    if (masterTimer) {
      clearInterval(masterTimer);
      masterTimer = null;
    }
    return;
  }

  if (masterTimer) return;

  masterTimer = setInterval(() => {
    const now = Date.now();
    registry.forEach((ctrl) => {
      if (!ctrl.isVisible || ctrl.prefersReducedMotion || ctrl.paused) return;
      if (now - ctrl.lastAdvance >= ctrl.intervalMs) {
        ctrl.advance();
        ctrl.lastAdvance = now;
      }
    });
  }, TICK_MS);
}

function initOneSlideshow(slideshow, prefersReducedMotion) {
  if (slideshow.dataset.slideshowReady === "true") return;
  slideshow.dataset.slideshowReady = "true";

  const slides = [...slideshow.querySelectorAll("[data-slide]")];
  const dots = [...slideshow.querySelectorAll("[data-slide-dot]")];
  const prevBtn = slideshow.querySelector("[data-slide-prev]");
  const nextBtn = slideshow.querySelector("[data-slide-next]");

  if (!slides.length) return;

  hydrateSlideImage(slides[0]);

  if (slides.length <= 1) return;

  let current = 0;
  const intervalMs = Number(slideshow.dataset.interval || 5000);

  const goTo = (index) => {
    slides[current]?.classList.remove("is-active");
    dots[current]?.classList.remove("is-active");
    dots[current]?.setAttribute("aria-selected", "false");

    current = (index + slides.length) % slides.length;

    slides[current]?.classList.add("is-active");
    hydrateSlideImage(slides[current]);
    dots[current]?.classList.add("is-active");
    dots[current]?.setAttribute("aria-selected", "true");
  };

  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  const ctrl = {
    intervalMs,
    prefersReducedMotion,
    isVisible: false,
    paused: false,
    lastAdvance: Date.now(),
    advance: next,
    setVisible(nextVisible) {
      ctrl.isVisible = nextVisible;
      slideshow.classList.toggle("is-slideshow-visible", nextVisible);
      if (nextVisible) {
        ctrl.lastAdvance = Date.now();
        registry.add(ctrl);
      } else {
        registry.delete(ctrl);
      }
      syncMasterTimer();
    },
    setPaused(nextPaused) {
      ctrl.paused = nextPaused;
      if (!nextPaused && ctrl.isVisible) ctrl.lastAdvance = Date.now();
    },
    bumpTimer() {
      ctrl.lastAdvance = Date.now();
    },
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      ctrl.bumpTimer();
    });
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    ctrl.bumpTimer();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    ctrl.bumpTimer();
  });

  slideshow.addEventListener("mouseenter", () => ctrl.setPaused(true));
  slideshow.addEventListener("mouseleave", () => ctrl.setPaused(false));
  slideshow.addEventListener("focusin", () => ctrl.setPaused(true));
  slideshow.addEventListener("focusout", () => ctrl.setPaused(false));

  slideshow._slideshowControl = ctrl;

  goTo(0);
}

export { hydrateSlideImage };

export function initSlideshows(root = document) {
  if (!root?.querySelectorAll) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const slideshows = [...root.querySelectorAll("[data-slideshow]")];

  if (!("IntersectionObserver" in window)) {
    slideshows.forEach((s) => {
      initOneSlideshow(s, prefersReducedMotion);
      s._slideshowControl?.setVisible(true);
    });
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const control = entry.target._slideshowControl;
        if (control) {
          control.setVisible(entry.isIntersecting);
          return;
        }
        if (!entry.isIntersecting) return;
        initOneSlideshow(entry.target, prefersReducedMotion);
        entry.target._slideshowControl?.setVisible(true);
      });
    },
    { rootMargin: "80px 0px", threshold: 0.05 }
  );

  slideshows.forEach((slideshow) => {
    if (slideshow.dataset.slideshowReady === "true") return;
    observer.observe(slideshow);
  });
}
