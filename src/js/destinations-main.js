import { renderDestinationCards } from "./render-destinations.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { northernCircuitDestinations } from "../data/northern-circuit-destinations.js";
import { initSlideshows } from "./slideshow.js";
import { initLazyImages, loadImagesIn } from "./lazy-images.js";

const CIRCUIT_GRIDS = [
  ["#southern-circuit-grid", "southern"],
  ["#eastern-circuit-grid", "eastern"],
  ["#western-circuit-grid", "western"],
  ["#zanzibar-circuit-grid", "zanzibar"],
  ["#mafia-circuit-grid", "mafia"],
  ["#oceanic-circuit-grid", "oceanic"],
];

async function renderCircuitSection(containerSelector, circuitId) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const { getDestinationsByCircuit } = await import("../data/all-destinations.js");
  const destinations = getDestinationsByCircuit(circuitId);
  const section = container.closest("section");

  if (!destinations.length) {
    section?.setAttribute("hidden", "");
    return;
  }

  section?.removeAttribute("hidden");
  renderDestinationCards(containerSelector, "b", { destinations });
  loadImagesIn(section, { priority: true });
  initSlideshows(section);
}

function initNorthernFirst() {
  renderSiteNav();
  renderSiteFooter();
  initSiteNav();

  renderDestinationCards("#northern-circuit-grid", "b", {
    destinations: northernCircuitDestinations,
  });

  const northern = document.querySelector("#northern-circuit-grid")?.closest("section");
  loadImagesIn(northern, { priority: true });
  initSlideshows(northern);
  initLazyImages(northern);
  initScrollReveal();
}

async function initRemainingCircuits() {
  for (const [selector, circuitId] of CIRCUIT_GRIDS) {
    await renderCircuitSection(selector, circuitId);
  }
  initLazyImages();
}

function init() {
  try {
    initNorthernFirst();
    const runRest = () => {
      initRemainingCircuits().catch((error) => {
        console.error("Matembo circuit sections failed:", error);
      });
    };
    if ("requestIdleCallback" in window) {
      requestIdleCallback(runRest, { timeout: 500 });
    } else {
      setTimeout(runRest, 100);
    }
  } catch (error) {
    console.error("Matembo destinations init failed:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
