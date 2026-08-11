import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initLazyImages } from "./lazy-images.js";
import { initCardTilt } from "./card-tilt.js";
import { trekkingPackages, trekkingSectionOrder } from "../data/trekking-packages.js";

const GRID_BY_SECTION = {
  "kilimanjaro-day-hikes": "#trek-kilimanjaro-day-hikes-grid",
  "kilimanjaro-4-5-days": "#trek-kilimanjaro-4-5-days-grid",
  "kilimanjaro-6-days": "#trek-kilimanjaro-6-days-grid",
  "kilimanjaro-7-days": "#trek-kilimanjaro-7-days-grid",
  "kilimanjaro-8-9-days": "#trek-kilimanjaro-8-9-days-grid",
  "mount-meru": "#trek-mount-meru-grid",
  "lengai-highlands": "#trek-lengai-highlands-grid",
  "eastern-mountains": "#trek-eastern-mountains-grid",
};

async function renderTrekkingSections() {
  for (const sectionId of trekkingSectionOrder) {
    const selector = GRID_BY_SECTION[sectionId];
    if (!selector) continue;

    const packages = trekkingPackages.filter((pkg) => pkg.sectionId === sectionId);
    const section = document.querySelector(selector)?.closest("section");

    if (!packages.length) {
      section?.setAttribute("hidden", "");
      continue;
    }

    section?.removeAttribute("hidden");
    await renderPackageCards(selector, { packages, viewLabel: "View Trek" });
  }
}

async function init() {
  renderSiteNav();
  renderSiteFooter();
  initSiteNav();

  await renderTrekkingSections();
  initCardTilt();
  initLazyImages();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
