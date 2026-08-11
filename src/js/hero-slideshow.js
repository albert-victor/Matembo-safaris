import { requestImageLoad } from "./lazy-images.js";

const SLIDE_FADE_MS = 2200;

export function initHeroSlideshow() {
  const root = document.querySelector("[data-hero-slideshow]");
  if (!root) return;

  const slides = [...root.querySelectorAll("[data-hero-slide]")];
  const panels = [...root.querySelectorAll("[data-hero-panel]")];
  const dots = [...root.querySelectorAll("[data-hero-dot]")];
  const counter = root.querySelector("[data-hero-counter]");
  const progress = root.querySelector("[data-hero-progress]");
  const prevBtn = root.querySelector("[data-hero-prev]");
  const nextBtn = root.querySelector("[data-hero-next]");

  if (!slides.length || slides.length !== panels.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalMs = Number(root.dataset.interval || 9000);
  const textSwapMs = prefersReducedMotion ? 0 : 620;
  const slideFadeMs = prefersReducedMotion ? 0 : SLIDE_FADE_MS;
  let index = 0;
  let timer = null;
  let swapping = false;

  function pad(n) {
    return String(n + 1).padStart(2, "0");
  }

  function updateProgress(i) {
    if (!progress) return;
    progress.style.width = `${((i + 1) / slides.length) * 100}%`;
  }

  function restartKenBurns(slideEl) {
    const img = slideEl?.querySelector(".hero-showcase__img");
    if (!img || prefersReducedMotion) return;
    img.style.animation = "none";
    void img.offsetWidth;
    img.style.animation = "";
  }

  function updateTextLayout(i) {
    const layout = panels[i]?.dataset.textLayout || "center";
    root.classList.toggle("hero-showcase--text-bottom", layout === "bottom");
  }

  function hydrateSlide(slideEl) {
    const img = slideEl?.querySelector(".hero-showcase__img[data-src]");
    if (img) requestImageLoad(img, { priority: true });
  }

  function ensureSlideLoaded(slideEl) {
    return new Promise((resolve) => {
      const img = slideEl?.querySelector(".hero-showcase__img");
      if (!img) {
        resolve();
        return;
      }

      if (img.dataset.src && !img.getAttribute("src")) {
        requestImageLoad(img, { priority: true });
      }

      if (img.complete && img.naturalWidth > 0) {
        resolve();
        return;
      }

      const done = () => resolve();
      img.addEventListener("load", done, { once: true });
      img.addEventListener("error", done, { once: true });
      window.setTimeout(done, 1800);
    });
  }

  function updateChrome(i) {
    dots.forEach((dot, dotIndex) => {
      const active = dotIndex === i;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (counter) {
      counter.textContent = `${pad(i)} / ${String(slides.length).padStart(2, "0")}`;
    }

    updateProgress(i);
    updateTextLayout(i);
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

  async function goTo(nextIndex) {
    const i = (nextIndex + slides.length) % slides.length;
    if (i === index || swapping) return;

    swapping = true;
    const prevIndex = index;
    const prevSlide = slides[prevIndex];
    const nextSlide = slides[i];
    const leavingPanel = panels[prevIndex];

    await ensureSlideLoaded(nextSlide);

    leavingPanel?.classList.add("is-leaving");
    leavingPanel?.classList.remove("is-active");
    leavingPanel?.setAttribute("aria-hidden", "true");

    prevSlide.classList.remove("is-active");
    prevSlide.classList.add("is-leaving");
    nextSlide.classList.remove("is-leaving");
    nextSlide.classList.add("is-active");

    restartKenBurns(nextSlide);
    hydrateSlide(slides[(i + 1) % slides.length]);

    index = i;
    updateChrome(i);

    window.setTimeout(() => {
      prevSlide.classList.remove("is-leaving");
      leavingPanel?.classList.remove("is-leaving");
      activatePanel(i);
      swapping = false;
    }, Math.max(textSwapMs, slideFadeMs));
  }

  const next = () => {
    goTo(index + 1);
  };
  const prev = () => {
    goTo(index - 1);
  };

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

  prevBtn?.addEventListener("click", () => {
    prev();
    start();
  });

  nextBtn?.addEventListener("click", () => {
    next();
    start();
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

  hydrateSlide(slides[1]);
  updateTextLayout(0);
  updateProgress(0);
  restartKenBurns(slides[0]);
  start();
}
