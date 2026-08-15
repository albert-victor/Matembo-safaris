import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initLazyImages } from "./lazy-images.js";
import { initCardTilt } from "./card-tilt.js";
import { initCardMotion } from "./card-motion.js";
import { SAFARI_CATEGORIES } from "../data/safari-categories.js";
import { filterPackagesBySafariType } from "./package-filters.js";

function getCategory() {
  const categoryId = document.body.dataset.safariCategory;
  return SAFARI_CATEGORIES.find((entry) => entry.id === categoryId) || null;
}

function renderHero(category) {
  const label = document.querySelector("[data-category-label]");
  const title = document.querySelector("[data-category-title]");
  const script = document.querySelector("[data-category-script]");
  const lead = document.querySelector("[data-category-lead]");

  if (label) label.textContent = category.heroLabel;
  if (title) title.textContent = category.heroTitle;
  if (script) script.textContent = category.heroScript;
  if (lead) lead.textContent = category.heroLead;
  document.title = `${category.label} | Matembo Safari & Tours`;
}

async function renderPackages(category) {
  const grid = document.querySelector("#safari-category-grid");
  const empty = document.querySelector("[data-category-empty]");
  if (!grid) return;

  const { safariPackages } = await import("../data/safari-packages.js");
  const packages = filterPackagesBySafariType(safariPackages, category.matchType);

  if (!packages.length) {
    grid.innerHTML = "";
    empty?.removeAttribute("hidden");
    return;
  }

  empty?.setAttribute("hidden", "");
  await renderPackageCards("#safari-category-grid", { packages, viewLabel: "View Safari" });
}

async function init() {
  const category = getCategory();

  renderSiteNav();
  renderSiteFooter();
  initSiteNav();

  if (!category) return;

  renderHero(category);
  await renderPackages(category);
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
