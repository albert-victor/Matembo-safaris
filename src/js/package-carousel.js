import { renderCard } from "./render-cards.js";
import { safariPackages } from "../data/safari-packages.js";

function getVisibleCount() {
  if (window.matchMedia("(min-width: 1024px)").matches) return 3;
  if (window.matchMedia("(min-width: 640px)").matches) return 2;
  return 1;
}

function getPageCount(total, visible) {
  return Math.max(1, Math.ceil(total / visible));
}

export function renderPackageCarousel(containerSelector, options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const { ids, limit = 12, packages: customPackages } = options;
  let packages = customPackages || safariPackages;

  if (ids?.length && !customPackages) {
    packages = ids
      .map((id) => safariPackages.find((pkg) => pkg.id === id))
      .filter(Boolean);
  } else if (!customPackages) {
    packages = [...packages]
      .sort((a, b) => b.reviewCount - a.reviewCount)
      .slice(0, limit);
  }

  container.innerHTML = `
    <div class="pkg-carousel" data-package-carousel data-autoplay="5500">
      <div class="pkg-carousel__controls">
        <button type="button" class="pkg-carousel__arrow pkg-carousel__arrow--prev" data-carousel-prev aria-label="Previous safaris">
          <span aria-hidden="true">‹</span>
        </button>
        <button type="button" class="pkg-carousel__arrow pkg-carousel__arrow--next" data-carousel-next aria-label="Next safaris">
          <span aria-hidden="true">›</span>
        </button>
      </div>

      <div class="pkg-carousel__viewport" data-carousel-viewport tabindex="0" aria-roledescription="carousel" aria-label="Featured safari packages">
        <div class="pkg-carousel__track" data-carousel-track>
          ${packages.map((pkg, index) => renderCard(pkg, index)).join("")}
        </div>
      </div>

      <div class="pkg-carousel__footer">
        <div class="pkg-carousel__dots" data-carousel-dots role="tablist" aria-label="Safari carousel pages"></div>
        <p class="pkg-carousel__count" data-carousel-count aria-live="polite"></p>
      </div>
    </div>
  `;
}

export function initPackageCarousel(root = document) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  root.querySelectorAll("[data-package-carousel]").forEach((carousel) => {
    const track = carousel.querySelector("[data-carousel-track]");
    const dotsRoot = carousel.querySelector("[data-carousel-dots]");
    const countEl = carousel.querySelector("[data-carousel-count]");
    const prevBtn = carousel.querySelector("[data-carousel-prev]");
    const nextBtn = carousel.querySelector("[data-carousel-next]");
    const cards = [...track.children];

    if (!cards.length) return;

    let page = 0;
    let visible = getVisibleCount();
    let pages = getPageCount(cards.length, visible);
    let timer = null;
    const intervalMs = Number(carousel.dataset.autoplay || 5500);

    const getStepOffset = () => {
      const gap = parseFloat(getComputedStyle(track).gap) || 20;
      const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
      return page * visible * (cardWidth + gap);
    };

    const renderDots = () => {
      dotsRoot.innerHTML = Array.from(
        { length: pages },
        (_, i) => `
          <button
            type="button"
            class="pkg-carousel__dot ${i === page ? "is-active" : ""}"
            data-carousel-dot="${i}"
            role="tab"
            aria-selected="${i === page ? "true" : "false"}"
            aria-label="Go to safari page ${i + 1}"
          ></button>
        `
      ).join("");

      dotsRoot.querySelectorAll("[data-carousel-dot]").forEach((dot) => {
        dot.addEventListener("click", () => {
          goTo(Number(dot.dataset.carouselDot));
          restart();
        });
      });
    };

    const updateCount = () => {
      const start = page * visible + 1;
      const end = Math.min((page + 1) * visible, cards.length);
      countEl.textContent = `Showing ${start}–${end} of ${cards.length} safaris`;
    };

    const goTo = (nextPage) => {
      page = (nextPage + pages) % pages;
      track.style.transform = `translate3d(-${getStepOffset()}px, 0, 0)`;

      dotsRoot.querySelectorAll("[data-carousel-dot]").forEach((dot, i) => {
        const active = i === page;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-selected", active ? "true" : "false");
      });
      updateCount();
    };

    const applyLayout = () => {
      visible = getVisibleCount();
      pages = getPageCount(cards.length, visible);
      if (page >= pages) page = 0;

      track.style.setProperty("--carousel-visible", String(visible));
      renderDots();
      requestAnimationFrame(() => goTo(page));
    };

    const next = () => goTo(page + 1);
    const prev = () => goTo(page - 1);

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (prefersReducedMotion || pages <= 1) return;
      stop();
      timer = setInterval(next, intervalMs);
    };

    const restart = () => {
      stop();
      start();
    };

    prevBtn?.addEventListener("click", () => {
      prev();
      restart();
    });

    nextBtn?.addEventListener("click", () => {
      next();
      restart();
    });

    carousel.addEventListener("mouseenter", stop);
    carousel.addEventListener("mouseleave", start);
    carousel.addEventListener("focusin", stop);
    carousel.addEventListener("focusout", start);

    window.addEventListener("resize", applyLayout, { passive: true });

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => applyLayout());
      ro.observe(track);
    }

    applyLayout();

    if (document.readyState === "complete") {
      start();
    } else {
      window.addEventListener("load", start, { once: true });
    }
  });
}
