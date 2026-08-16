/**
 * Generic autoslider – one-card step with multi-visible viewport.
 */
import { loadImagesIn } from "./lazy-images.js";
import { syncCarouselCardMotion } from "./card-motion.js";

function hydrateVisibleSlides(slides, index, visible) {
  for (let i = index; i < Math.min(index + visible, slides.length); i++) {
    loadImagesIn(slides[i], { priority: i === index });
  }
  syncCarouselCardMotion(slides, index, visible);
}

function getVisibleCount(root) {
  const maxVisible = Number(root.dataset.visible) || 3;
  if (window.matchMedia("(min-width: 1200px)").matches) return maxVisible;
  if (window.matchMedia("(min-width: 768px)").matches) return Math.min(2, maxVisible);
  return 1;
}

export function initAutoslider(root = document) {
  if (!root?.querySelectorAll) return;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.querySelectorAll("[data-autoslider]").forEach((slider) => {
    if (slider.dataset.autosliderInit === "true") return;
    slider.dataset.autosliderInit = "true";

    const track = slider.querySelector("[data-autoslider-track]");
    const dotsRoot = slider.querySelector("[data-autoslider-dots]");
    const countEl = slider.querySelector("[data-autoslider-count]");
    const prevBtn = slider.querySelector("[data-autoslider-prev]");
    const nextBtn = slider.querySelector("[data-autoslider-next]");
    const slides = track ? [...track.children] : [];

    if (!slides.length) return;

    let index = 0;
    let visible = 1;
    let maxIndex = 0;
    let timer = null;
    let ready = false;
    let slideLock = false;
    let pointerStart = null;
    let touchStartX = null;
    let touchDeltaX = 0;
    let isInView = true;
    let cachedStep = 0;
    const intervalMs = Number(slider.dataset.autoplay || 5000);
    const startDelayMs = Number(slider.dataset.autoplayDelay || 600);
    const swipeThreshold = 42;

    const measure = () => {
      visible = getVisibleCount(slider);
      maxIndex = Math.max(0, slides.length - visible);
      if (index > maxIndex) index = 0;
      track.style.setProperty("--autoslider-visible", String(visible));
    };

    const getStepOffset = () => {
      if (cachedStep && ready) return cachedStep * index;
      const gap = parseFloat(getComputedStyle(track).gap) || 16;
      const slideWidth = slides[0]?.getBoundingClientRect().width || 0;
      cachedStep = slideWidth + gap;
      return index * cachedStep;
    };

    const bindDotListeners = () => {
      dotsRoot?.querySelectorAll("[data-autoslider-dot]").forEach((dot) => {
        dot.addEventListener("click", () => {
          goTo(Number(dot.dataset.autosliderDot));
          restart();
        });
      });
    };

    const renderDots = () => {
      if (!dotsRoot) return;
      const pages = maxIndex + 1;
      const existing = [...dotsRoot.querySelectorAll("[data-autoslider-dot]")];

      if (existing.length !== pages) {
        dotsRoot.innerHTML = Array.from({ length: pages }, (_, i) => `
        <button
          type="button"
          class="autoslider__dot ${i === index ? "is-active" : ""}"
          data-autoslider-dot="${i}"
          role="tab"
          aria-selected="${i === index ? "true" : "false"}"
          aria-label="Go to slide ${i + 1}"
        ></button>
      `).join("");
        bindDotListeners();
        return;
      }

      existing.forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
    };

    const updateCount = () => {
      if (!countEl) return;
      const start = index + 1;
      const end = Math.min(index + visible, slides.length);
      countEl.textContent = `${start}–${end} of ${slides.length}`;
    };

    const goTo = (nextIndex) => {
      index = ((nextIndex % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
      slideLock = true;
      slider.classList.add("is-advancing");
      track.style.transform = `translate3d(-${getStepOffset()}px, 0, 0)`;

      dotsRoot?.querySelectorAll("[data-autoslider-dot]").forEach((dot, i) => {
        const active = i === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
      updateCount();

      hydrateVisibleSlides(slides, index, visible);

      window.setTimeout(() => {
        slideLock = false;
        slider.classList.remove("is-advancing");
      }, 320);
    };

    const applyLayout = () => {
      cachedStep = 0;
      measure();
      renderDots();
      if (ready) requestAnimationFrame(() => goTo(index));
    };

    let resizeTimer = null;
    const scheduleLayout = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        applyLayout();
      }, 120);
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (prefersReducedMotion || maxIndex <= 0 || !isInView) return;
      stop();
      timer = setInterval(next, intervalMs);
    };

    const restart = () => {
      stop();
      start();
    };

    prevBtn?.addEventListener("click", () => { prev(); restart(); });
    nextBtn?.addEventListener("click", () => { next(); restart(); });

    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", (event) => {
      if (slider.contains(event.relatedTarget)) return;
      start();
    });

    slider.addEventListener(
      "pointerdown",
      (event) => {
        pointerStart = { x: event.clientX, y: event.clientY };
        if (event.pointerType === "touch" || event.pointerType === "pen") {
          touchStartX = event.clientX;
          touchDeltaX = 0;
          stop();
        }
      },
      { passive: true }
    );

    slider.addEventListener(
      "pointermove",
      (event) => {
        if (touchStartX == null) return;
        touchDeltaX = event.clientX - touchStartX;
      },
      { passive: true }
    );

    slider.addEventListener(
      "pointerup",
      (event) => {
        if (touchStartX == null) return;
        const delta = event.clientX - touchStartX;
        touchStartX = null;
        touchDeltaX = 0;
        if (Math.abs(delta) >= swipeThreshold) {
          delta < 0 ? next() : prev();
          restart();
        } else {
          start();
        }
      },
      { passive: true }
    );

    slider.addEventListener("click", (event) => {
      if (slideLock) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (pointerStart) {
        const moved =
          Math.abs(event.clientX - pointerStart.x) > 8 ||
          Math.abs(event.clientY - pointerStart.y) > 8;
        pointerStart = null;
        if (moved) {
          event.preventDefault();
          event.stopPropagation();
        }
      }
    }, true);

    window.addEventListener("resize", scheduleLayout, { passive: true });

    if ("ResizeObserver" in window) {
      new ResizeObserver(scheduleLayout).observe(track);
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            isInView = entry.isIntersecting;
            if (isInView) start();
            else stop();
          });
        },
        { threshold: 0.05, rootMargin: "40px 0px" }
      ).observe(slider);
    }

    measure();
    renderDots();
    requestAnimationFrame(() => {
      goTo(0);
      hydrateVisibleSlides(slides, 0, visible);
      ready = true;
      setTimeout(start, startDelayMs);
    });
  });
}

export function renderAutosliderShell(options = {}) {
  const {
    id = "",
    label = "Carousel",
    autoplay = 5000,
    autoplayDelay = 600,
    visible = "",
    showArrows = true,
    showCount = true,
    trackHtml = "",
  } = options;

  return `
    <div
      class="autoslider"
      data-autoslider
      data-autoplay="${autoplay}"
      data-autoplay-delay="${autoplayDelay}"
      ${visible ? `data-visible="${visible}"` : ""}
      ${id ? `id="${id}"` : ""}
    >
      ${showArrows ? `
        <div class="autoslider__controls">
          <button type="button" class="autoslider__arrow autoslider__arrow--prev" data-autoslider-prev aria-label="Previous">
            <span aria-hidden="true">‹</span>
          </button>
          <button type="button" class="autoslider__arrow autoslider__arrow--next" data-autoslider-next aria-label="Next">
            <span aria-hidden="true">›</span>
          </button>
        </div>
      ` : ""}
      <div class="autoslider__viewport" tabindex="0" aria-roledescription="carousel" aria-label="${label}">
        <div class="autoslider__track" data-autoslider-track>${trackHtml}</div>
      </div>
      <div class="autoslider__footer">
        <div class="autoslider__dots" data-autoslider-dots role="tablist" aria-label="Carousel pages"></div>
        ${showCount ? `<p class="autoslider__count" data-autoslider-count aria-live="polite"></p>` : ""}
      </div>
    </div>
  `;
}
