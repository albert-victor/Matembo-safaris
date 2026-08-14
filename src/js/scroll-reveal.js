const REVEAL_SELECTORS = [
  "[data-reveal]:not([data-story-panel])",
  ".section-reveal",
  ".reveal-on-scroll",
  ".home-about__text",
  ".home-about__stat",
  ".home-about__script",
  ".dest-page__lead",
  ".dest-page__text",
  ".dest-page__photo",
  ".dest-page__aside-block",
  ".experience-card__title",
  ".experience-card__text",
  ".testimonial-card__quote",
  ".credentials-grid__item",
  ".site-footer__col",
  ".site-footer__brand",
  ".site-footer__social",
].join(", ");

import { waitForCardMedia } from "./lazy-images.js";

const STAGGER_MS = 40;
const STAGGER_CAP_MS = 240;
const SCROLL_OFFSET_PX = 120;

function collectRevealTargets(root) {
  const seen = new Set();
  const elements = [];

  root.querySelectorAll(REVEAL_SELECTORS).forEach((el) => {
    if (seen.has(el) || el.classList.contains("is-visible")) return;
    seen.add(el);
    elements.push(el);
  });

  const topLevel = elements.filter(
    (el) => !elements.some((other) => other !== el && other.contains(el))
  );

  return topLevel.sort(
    (a, b) =>
      a.getBoundingClientRect().top - b.getBoundingClientRect().top ||
      (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)
  );
}

function isAboveFold(el, margin = 80) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top < vh - margin;
}

function cascadeRevealTargets(el) {
  el.querySelectorAll(REVEAL_SELECTORS).forEach((child) => {
    if (child !== el) child.classList.add("is-visible");
  });
}

function getRevealDelay(el, batchIndex) {
  const attr = el.getAttribute("data-reveal-delay");
  if (attr === "1") return 100;
  if (attr === "2") return 200;
  const wowDelay = el.getAttribute("data-wow-delay");
  if (wowDelay && wowDelay.endsWith("ms")) {
    const parsed = Number.parseInt(wowDelay, 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return Math.min(batchIndex * STAGGER_MS, STAGGER_CAP_MS);
}

function revealElement(el, batchIndex = 0) {
  if (!el || el.classList.contains("is-visible")) return;

  const delay = getRevealDelay(el, batchIndex);
  el.style.setProperty("--reveal-delay", `${delay}ms`);

  window.setTimeout(() => {
    if (el.classList.contains("is-visible")) return;
    el.classList.add("is-visible");
    cascadeRevealTargets(el);
  }, delay);
}

function isCardReveal(el) {
  return el.matches(".dest-card, .safari-card") || el.querySelector("img[data-src], .safari-card__image");
}

function revealWhenReady(el, batchIndex = 0) {
  revealElement(el, batchIndex);
  if (isCardReveal(el)) {
    waitForCardMedia(el);
  }
}

export function initScrollReveal(root = document) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const elements = collectRevealTargets(root);
  if (!elements.length) return;

  document.documentElement.classList.add("js-reveal-ready");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((el) => {
      el.classList.add("is-visible");
      cascadeRevealTargets(el);
    });
    return;
  }

  elements.filter(isAboveFold).forEach((el) => {
    el.classList.add("is-visible");
    cascadeRevealTargets(el);
  });

  let batchCounter = 0;
  const pending = elements.filter((el) => !el.classList.contains("is-visible"));

  const observer = new IntersectionObserver(
    (entries) => {
      const intersecting = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target)
        .sort(
          (a, b) =>
            a.getBoundingClientRect().top - b.getBoundingClientRect().top
        );

      if (!intersecting.length) return;

      intersecting.forEach((el) => {
        revealWhenReady(el, batchCounter);
        batchCounter += 1;
        observer.unobserve(el);
      });
    },
    {
      threshold: 0,
      rootMargin: `0px 0px ${SCROLL_OFFSET_PX}px 0px`,
    }
  );

  requestAnimationFrame(() => {
    pending.forEach((el) => observer.observe(el));
  });
}
