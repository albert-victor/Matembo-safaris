import { renderHero, renderSiteFooter } from "./render-home.js";
import { renderSiteNav } from "./render-site-nav.js";
import { initSiteNav, refreshSiteHeaderState } from "./site-nav.js";
import { renderServicesShowcase, initServicesShowcase } from "./services-showcase.js";
import {
  renderPopularDestinations,
  renderPopularItineraries,
  renderTestimonialsSlider,
  renderCredentialsMarquee,
  renderStickyQuote,
  renderHomeContact,
  renderWhatsAppFloat,
} from "./render-home-sections.js";
import { initAutoslider } from "./autoslider.js";
import { initSlideshows } from "./slideshow.js";
import { initCardTilt } from "./card-tilt.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initHeroSlideshow } from "./hero-slideshow.js";
import { initLazyImages, loadImagesIn } from "./lazy-images.js";

function initHomeContent() {
  renderServicesShowcase();
  renderPopularDestinations();
  renderPopularItineraries();
  renderTestimonialsSlider();
  renderCredentialsMarquee();
  renderStickyQuote();
  renderHomeContact();
  renderSiteFooter();
  renderWhatsAppFloat();

  initServicesShowcase();
  initAutoslider();
  initSlideshows();
  initCardTilt();
  initLazyImages();
  loadImagesIn(document.getElementById("home-popular-destinations"), { priority: true });
  loadImagesIn(document.getElementById("home-popular-itineraries"), { priority: true });
}

function init() {
  try {
    renderSiteNav();
    initSiteNav();
    renderHero();
    refreshSiteHeaderState();
    initHeroSlideshow();
    initLazyImages(document.getElementById("home-hero"));

    initHomeContent();
  } catch (error) {
    console.error("Matembo home init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
