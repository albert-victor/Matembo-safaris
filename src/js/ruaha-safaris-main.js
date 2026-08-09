import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initCardTilt } from "./card-tilt.js";
import { ruahaSafariPackages, ruahaSectionOrder } from "../data/ruaha-safari-packages.js";

const GRID_BY_SECTION = {
  "ruaha-only": "#ruaha-only-grid",
  "ruaha-combined": "#ruaha-combined-grid",
};

function renderSections() {
  for (const sectionId of ruahaSectionOrder) {
    const selector = GRID_BY_SECTION[sectionId];
    if (!selector) continue;

    const packages = ruahaSafariPackages.filter((pkg) => pkg.sectionId === sectionId);
    const section = document.querySelector(selector)?.closest("section");

    if (!packages.length) {
      section?.setAttribute("hidden", "");
      continue;
    }

    section?.removeAttribute("hidden");
    renderPackageCards(selector, { packages, viewLabel: "View Safari" });
  }
}

function init() {
  renderSiteNav();
  renderSiteFooter();
  renderSections();
  initSiteNav();
  initCardTilt();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
