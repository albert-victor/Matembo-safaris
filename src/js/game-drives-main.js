import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initCardTilt } from "./card-tilt.js";
import { gameDrivePackages, gameDriveSectionOrder } from "../data/game-drive-packages.js";

const GRID_BY_SECTION = {
  "northern-circuit": "#game-drive-northern-grid",
  "southern-circuit": "#game-drive-southern-grid",
  "eastern-circuit": "#game-drive-eastern-grid",
};

function renderSections() {
  for (const sectionId of gameDriveSectionOrder) {
    const selector = GRID_BY_SECTION[sectionId];
    if (!selector) continue;

    const packages = gameDrivePackages.filter((pkg) => pkg.sectionId === sectionId);
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
