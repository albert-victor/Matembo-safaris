import {
  renderCircuitPage,
  renderCircuitNotFound,
  getCircuitById,
} from "./render-circuit-page.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initSlideshows } from "./slideshow.js";

function resolveCircuitId() {
  const fromBody = document.body.dataset.circuitId;
  if (fromBody) return fromBody;

  const params = new URLSearchParams(window.location.search);
  return params.get("circuit") || "";
}

function init() {
  try {
    renderSiteNav();
    renderSiteFooter();

    const circuitId = resolveCircuitId();
    const ok = renderCircuitPage("#circuit-page-root", circuitId);

    if (!ok) {
      renderCircuitNotFound("#circuit-page-root");
    }

    initSiteNav();
    initSlideshows();
  } catch (error) {
    console.error("Matembo circuit page init failed:", error);
  } finally {
    initScrollReveal();
  }
}

export { getCircuitById };

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
