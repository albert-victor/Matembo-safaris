import { renderSiteNav } from "./render-site-nav.js";
import { initSiteNav } from "./site-nav.js";
import { renderAboutPage } from "./render-about-page.js";
import { renderSiteFooter } from "./render-home.js";
import { renderWhatsAppFloat } from "./render-home-sections.js";
import { initScrollReveal } from "./scroll-reveal.js";

function init() {
  try {
    renderSiteNav();
    renderAboutPage();
    renderSiteFooter();
    renderWhatsAppFloat();
    initSiteNav();
  } catch (error) {
    console.error("About page init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
