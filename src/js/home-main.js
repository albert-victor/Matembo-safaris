import { renderSiteNav } from "./render-site-nav.js";
import { initSiteNav } from "./site-nav.js";
import { renderHero } from "./render-home.js";
import { renderServicesShowcase, initServicesShowcase } from "./services-showcase.js";
import {
  renderPopularDestinations,
  renderPopularItineraries,
  renderTestimonialsSlider,
  renderCredentialsMarquee,
  renderStickyQuote,
  renderHomeContact,
  renderSiteFooter,
  renderWhatsAppFloat,
} from "./render-home-sections.js";
import { initAutoslider } from "./autoslider.js";
import { initSlideshows } from "./slideshow.js";
import { initCardTilt } from "./card-tilt.js";
import { initStickyStory } from "./sticky-story.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initHeroVideo } from "./hero-video.js";

function init() {
  try {
    renderSiteNav();
    renderHero();
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
    initSiteNav();
    initHeroVideo();
    initSlideshows();
    initCardTilt();
    initStickyStory();
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
