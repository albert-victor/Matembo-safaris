const REVEAL_SELECTORS = [
  "[data-reveal]:not([data-story-panel])",
  ".section-reveal",
  ".reveal-on-scroll",
  ".site-footer",
  ".home-about__text",
  ".home-about__stat",
  ".home-section__title",
  ".home-section__desc",
  ".home-section__label",
  ".home-about__script",
  ".dest-page__lead",
  ".dest-page__text",
  ".dest-page__photo",
  ".dest-slideshow",
  ".dest-page__aside-block",
  ".experience-card__title",
  ".experience-card__text",
  ".testimonial-card__quote",
  ".credentials-grid__item",
  ".home-contact__title",
  ".home-contact__text",
  ".site-footer__col",
  ".site-footer__brand",
  ".site-footer__social",
].join(", ");

export function initScrollReveal(root = document) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const elements = root.querySelectorAll(REVEAL_SELECTORS);

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -4% 0px" }
  );

  elements.forEach((el) => {
    if (!el.classList.contains("is-visible")) {
      observer.observe(el);
    }
  });

  return observer;
}
