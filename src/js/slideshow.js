import { hydrateSlideImage } from "./lazy-images.js";

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
  let timer = null;
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

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    if (prefersReducedMotion) return;
    stop();
    timer = setInterval(next, intervalMs);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      start();
    });
  });

  prevBtn?.addEventListener("click", () => {
    prev();
    start();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    start();
  });

  slideshow.addEventListener("mouseenter", stop);
  slideshow.addEventListener("mouseleave", start);
  slideshow.addEventListener("focusin", stop);
  slideshow.addEventListener("focusout", start);

  goTo(0);
  start();
}

export { hydrateSlideImage };

export function initSlideshows(root = document) {
  if (!root?.querySelectorAll) return;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const slideshows = [...root.querySelectorAll("[data-slideshow]")];

  if (!("IntersectionObserver" in window)) {
    slideshows.forEach((s) => initOneSlideshow(s, prefersReducedMotion));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        initOneSlideshow(entry.target, prefersReducedMotion);
        obs.unobserve(entry.target);
      });
    },
    { rootMargin: "200px 0px", threshold: 0.01 }
  );

  slideshows.forEach((slideshow) => {
    if (slideshow.dataset.slideshowReady === "true") return;
    observer.observe(slideshow);
  });
}
