import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initLazyImages } from "./lazy-images.js";
import { initCardTilt } from "./card-tilt.js";
import { initCardMotion } from "./card-motion.js";

const GRID_BY_CIRCUIT = {
  "Northern Circuit": "#safari-northern-circuit-grid",
  "Southern Circuit": "#safari-southern-circuit-grid",
  "Eastern Circuit": "#safari-eastern-circuit-grid",
  "Western Circuit": "#safari-western-circuit-grid",
  "Zanzibar Island": "#safari-zanzibar-island-grid",
  "Mafia Island": "#safari-mafia-island-grid",
  "Central Circuit": "#safari-central-circuit-grid",
  "Ocean Islands": "#safari-ocean-islands-grid",
};

async function renderCircuitSections() {
  const { safariPackages, safariCircuitOrder } = await import("../data/safari-packages.js");
  const circuits =
    safariCircuitOrder?.length > 0
      ? safariCircuitOrder
      : [...new Set(safariPackages.map((pkg) => pkg.circuit))];

  for (const circuit of circuits) {
    const selector = GRID_BY_CIRCUIT[circuit];
    if (!selector) continue;

    const packages = safariPackages.filter((pkg) => pkg.circuit === circuit);
    const section = document.querySelector(selector)?.closest("section");

    if (!packages.length) {
      section?.setAttribute("hidden", "");
      continue;
    }

    section?.removeAttribute("hidden");
    await renderPackageCards(selector, { packages });
  }
}

async function init() {
  renderSiteNav();
  renderSiteFooter();
  initSiteNav();

  await renderCircuitSections();
  initCardTilt();
  initCardMotion();
  initLazyImages();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
