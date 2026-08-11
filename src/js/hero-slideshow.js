import { requestImageLoad } from "./lazy-images.js";

export function initHeroSlideshow() {
  const root = document.querySelector("[data-hero-slideshow]");
  if (!root) return;

  const slides = [...root.querySelectorAll("[data-hero-slide]")];
  const panels = [...root.querySelectorAll("[data-hero-panel]")];
  const dots = [...root.querySelectorAll("[data-hero-dot]")];
  const scrollBtn = root.querySelector("[data-hero-scroll]");

  if (!slides.length || slides.length !== panels.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalMs = Number(root.dataset.interval || 8000);
  const textSwapMs = prefersReducedMotion ? 0 : 620;
  let index = 0;
  let timer = null;
  let swapping = false;

  function restartKenBurns(slideEl) {
    const img = slideEl?.querySelector(".hero-showcase__img");
    if (!img || prefersReducedMotion) return;
    img.style.animation = "none";
    void img.offsetWidth;
    img.style.animation = "";
  }

  function hydrateSlide(slideEl) {
    const img = slideEl?.querySelector(".hero-showcase__img[data-src]");
    if (img) requestImageLoad(img, { priority: true });
  }

  function setSlideVisuals(i) {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === i);
    });
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === i;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });
    restartKenBurns(slides[i]);
    hydrateSlide(slides[i]);
    hydrateSlide(slides[(i + 1) % slides.length]);
  }

  function activatePanel(i) {
    panels.forEach((panel, panelIndex) => {
      const active = panelIndex === i;
      panel.classList.remove("is-leaving");
      if (active) {
        panel.classList.remove("is-active");
        void panel.offsetWidth;
        panel.classList.add("is-active");
      } else {
        panel.classList.remove("is-active");
      }
      panel.setAttribute("aria-hidden", active ? "false" : "true");
    });
  }

  function goTo(nextIndex) {
    const i = (nextIndex + slides.length) % slides.length;
    if (i === index || swapping) return;

    const leavingPanel = panels[index];
    leavingPanel?.classList.add("is-leaving");
    leavingPanel?.classList.remove("is-active");
    leavingPanel?.setAttribute("aria-hidden", "true");

    setSlideVisuals(i);
    index = i;
    swapping = true;

    window.setTimeout(() => {
      leavingPanel?.classList.remove("is-leaving");
      activatePanel(i);
      swapping = false;
    }, textSwapMs);
  }

  const next = () => goTo(index + 1);

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    if (prefersReducedMotion || slides.length <= 1) return;
    stop();
    timer = window.setInterval(next, intervalMs);
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      goTo(i);
      start();
    });
  });

  scrollBtn?.addEventListener("click", () => {
    const nextSection = root.nextElementSibling;
    const target = nextSection || document.querySelector("#home-services-showcase, main, .home-section");
    target?.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    start();
  });

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  restartKenBurns(slides[0]);
  start();
}
