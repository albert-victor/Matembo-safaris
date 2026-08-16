import { getSafariPackageById } from "../data/all-safari-packages.js";
import {
  renderPackagePage,
  renderPackageNotFound,
} from "./render-package-view.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initSlideshows } from "./slideshow.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initCardTilt } from "./card-tilt.js";

function resolvePackageId() {
  const fromBody = document.body.dataset.packageId;
  if (fromBody) return fromBody;

  const params = new URLSearchParams(window.location.search);
  return params.get("id") || "";
}

function init() {
  try {
    renderSiteNav();
    renderSiteFooter();

    const id = resolvePackageId();
    const pkg = getSafariPackageById(id);

    if (!pkg) {
      renderPackageNotFound("#package-view-root");
      initSiteNav();
      return;
    }

    renderPackagePage("#package-view-root", pkg);
    initSiteNav();
    initSlideshows();
    initCardTilt();
  } catch (error) {
    console.error("Matembo package page init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
