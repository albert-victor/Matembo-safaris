import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initLazyImages } from "./lazy-images.js";
import { initCardTilt } from "./card-tilt.js";
import { initCardMotion } from "./card-motion.js";
import { activityBySlug } from "../data/things-to-do-nav.js";
import { filterPackagesByActivity } from "./package-filters.js";

function getActivityFromPage() {
  const slug = document.body.dataset.activitySlug;
  return activityBySlug(slug);
}

function renderHero(activity) {
  const label = document.querySelector("[data-activity-label]");
  const title = document.querySelector("[data-activity-title]");
  const lead = document.querySelector("[data-activity-lead]");

  if (label) label.textContent = "Things to Do";
  if (title) title.textContent = activity.label;
  if (lead) {
    lead.textContent = `Safari packages and day trips that include ${activity.label.toLowerCase()} – sourced from Tanzania Tourism and ready to tailor.`;
  }
  document.title = `${activity.label} | Matembo Safari & Tours`;
}

async function renderPackages(activity) {
  const grid = document.querySelector("#activity-packages-grid");
  const empty = document.querySelector("[data-activity-empty]");
  if (!grid) return;

  const { safariPackages } = await import("../data/safari-packages.js");
  const packages = filterPackagesByActivity(safariPackages, activity.label);

  if (!packages.length) {
    grid.innerHTML = "";
    empty?.removeAttribute("hidden");
    return;
  }

  empty?.setAttribute("hidden", "");
  await renderPackageCards("#activity-packages-grid", { packages, viewLabel: "View Safari" });
}

async function init() {
  renderSiteNav();
  renderSiteFooter();
  initSiteNav();

  const activity = getActivityFromPage();
  if (!activity) return;

  renderHero(activity);
  await renderPackages(activity);
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
