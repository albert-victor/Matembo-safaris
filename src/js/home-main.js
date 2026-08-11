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
import {
  initLazyImages,
  loadImagesIn,
  bootstrapImagesWithSrc,
} from "./lazy-images.js";

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
  bootstrapImagesWithSrc(document.getElementById("home-services-showcase"));
  loadImagesIn(document.getElementById("home-services-showcase"), { priority: true });
  loadImagesIn(document.getElementById("home-popular-destinations"), { priority: true });
  loadImagesIn(document.getElementById("home-popular-itineraries"), { priority: true });
}

function init() {
  try {
    renderHero();
    bootstrapImagesWithSrc(document.getElementById("home-hero"));
    initLazyImages(document.getElementById("home-hero"));
    initHeroSlideshow();

    renderSiteNav();
    initSiteNav();
    refreshSiteHeaderState();

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
