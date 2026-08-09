import { renderPackageCards } from "./render-cards.js";
import { initCardTilt } from "./card-tilt.js";

function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const revealElements = document.querySelectorAll(
    "[data-reveal], .section-reveal"
  );

  if (prefersReducedMotion) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("is-visible"));
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
    {
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px",
    }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function init() {
  try {
    renderPackageCards("#package-cards-root");

    document.querySelectorAll("[data-demo-link]").forEach((link) => {
      link.addEventListener("click", (event) => event.preventDefault());
    });

    initCardTilt();
  } catch (error) {
    console.error("Matembo UI demo init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
