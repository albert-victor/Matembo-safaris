import { renderHero } from "./render-home.js";
import { renderSiteNav } from "./render-site-nav.js";
import { initSiteNav, refreshSiteHeaderState } from "./site-nav.js";
import { initServicesShowcase } from "./services-showcase.js";
import { initHeroSlideshow } from "./hero-slideshow.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initLazyImages } from "./lazy-images.js";

function initCritical() {
  renderSiteNav();
  initSiteNav();
  refreshSiteHeaderState();

  renderHero();
  initHeroSlideshow();
  initLazyImages(document.getElementById("home-hero"));

  if (document.querySelector("[data-services-showcase]")) {
    initServicesShowcase();
  }

  initScrollReveal();
}

function initDeferredHome() {
  import("./render-home-sections.js")
    .then((sections) => {
      import("./services-showcase.js").then((svc) => {
        if (document.querySelector("[data-services-static]")) {
          svc.renderServicesShowcase();
        } else if (!document.querySelector("#home-services-showcase .svc-field")) {
          svc.renderServicesShowcase();
        }
        if (document.querySelector("[data-services-showcase]")) {
          svc.initServicesShowcase();
        }
      });

      sections.renderPopularDestinations();
      sections.renderPopularItineraries();
      sections.renderTestimonialsSlider();
      sections.renderCredentialsMarquee();
      sections.renderStickyQuote();
      sections.renderHomeContact();
      sections.renderWhatsAppFloat();

      return Promise.all([
        import("./autoslider.js"),
        import("./slideshow.js"),
        import("./card-tilt.js"),
        import("./render-home.js"),
      ]).then(([autoslider, slideshow, cardTilt, homeRender]) => {
        autoslider.initAutoslider();
        slideshow.initSlideshows();
        cardTilt.initCardTilt();
        homeRender.renderSiteFooter();
        initLazyImages(document.getElementById("home-popular-destinations"));
        initLazyImages(document.getElementById("home-popular-itineraries"));
        initLazyImages(document.getElementById("home-sticky-quote"));
        initScrollReveal();
      });
    })
    .catch((error) => {
      console.error("Matembo deferred home init failed:", error);
    });
}

function init() {
  try {
    initCritical();

    const runDeferred = () => initDeferredHome();
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(runDeferred, { timeout: 2500 });
    } else {
      window.setTimeout(runDeferred, 800);
    }
  } catch (error) {
    console.error("Matembo home init failed:", error);
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
