import { renderPackageCards } from "./render-cards.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initLazyImages } from "./lazy-images.js";
import { initCardTilt } from "./card-tilt.js";
import { initCardMotion } from "./card-motion.js";
import { getActivityCollection, getActivityPackagesForCollection } from "../data/activity-packages.js";
import { perfLog, auditPageImages, measureDomWeight } from "./perf-debug.js";

const t0 = performance.now();

function getCollectionId() {
  return document.body.dataset.activityCollection || "";
}

function renderHero(collection) {
  const label = document.querySelector("[data-activity-label]");
  const title = document.querySelector("[data-activity-title]");
  const script = document.querySelector("[data-activity-script]");
  const lead = document.querySelector("[data-activity-lead]");

  if (label) label.textContent = collection.label;
  if (title) title.textContent = collection.heroTitle;
  if (script) script.textContent = collection.heroScript;
  if (lead) lead.textContent = collection.heroLead;
  document.title = `${collection.label} | Matembo Safari & Tours`;
}

async function renderSections(collection) {
  const packages = getActivityPackagesForCollection(collection.id);
  const byId = new Map(packages.map((pkg) => [pkg.id, pkg]));

  await Promise.all(
    collection.sections.map(async (section) => {
      const grid = document.querySelector(`[data-activity-section="${section.id}"]`);
      const sectionEl = grid?.closest("section");
      const sectionPackages = section.packageIds.map((id) => byId.get(id)).filter(Boolean);

      if (!sectionPackages.length) {
        sectionEl?.setAttribute("hidden", "");
        return;
      }

      sectionEl?.removeAttribute("hidden");
      await renderPackageCards(grid, { packages: sectionPackages, viewLabel: "View Safari" });
    })
  );
}

async function init() {
  renderSiteNav();
  renderSiteFooter();
  initSiteNav();

  try {
    const collectionId = getCollectionId();
    const collection = getActivityCollection(collectionId);
    if (!collection) {
      console.error("Unknown activity collection:", collectionId);
      return;
    }

    renderHero(collection);
    await renderSections(collection);
    initCardTilt();
    initCardMotion();
    initLazyImages();
    initScrollReveal();
    perfLog("activity-packages-main.js:done", "activity page ready", {
      collectionId,
      totalMs: Math.round(performance.now() - t0),
      images: auditPageImages(),
      dom: measureDomWeight(),
    }, "B");
  } catch (error) {
    console.error("Activity page init failed:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
