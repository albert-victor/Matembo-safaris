import { renderAllCircuitsPage } from "./render-circuits.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";

function init() {
  try {
    renderSiteNav();
    renderSiteFooter();
    renderAllCircuitsPage();
    initSiteNav();
  } catch (error) {
    console.error("Matembo circuits page init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
