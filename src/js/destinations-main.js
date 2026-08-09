import { renderDestinationCards } from "./render-destinations.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { northernCircuitDestinations } from "../data/northern-circuit-destinations.js";
import { getDestinationsByCircuit } from "../data/all-destinations.js";
import { initSlideshows } from "./slideshow.js";

function renderCircuitSection(containerSelector, circuitId) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const destinations = getDestinationsByCircuit(circuitId);
  const section = container.closest("section");

  if (!destinations.length) {
    section?.setAttribute("hidden", "");
    return;
  }

  section?.removeAttribute("hidden");
  renderDestinationCards(containerSelector, "b", { destinations });
}

function init() {
  try {
    renderSiteNav();
    renderSiteFooter();

    renderDestinationCards("#northern-circuit-grid", "b", {
      destinations: northernCircuitDestinations,
    });

    renderCircuitSection("#southern-circuit-grid", "southern");
    renderCircuitSection("#eastern-circuit-grid", "eastern");
    renderCircuitSection("#western-circuit-grid", "western");
    renderCircuitSection("#zanzibar-circuit-grid", "zanzibar");
    renderCircuitSection("#mafia-circuit-grid", "mafia");
    renderCircuitSection("#oceanic-circuit-grid", "oceanic");

    initSiteNav();
    initSlideshows();
  } catch (error) {
    console.error("Matembo destinations init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
