import { renderAutosliderShell } from "./autoslider.js";
import { renderCard, enrichPackageFromCatalogue } from "./render-cards.js";
import { homePopularDestinations } from "../data/home-popular-destinations.js";
import { homePopularPackages } from "../data/home-popular-packages.js";
import { homePopularSouthernPackages } from "../data/home-popular-southern-packages.js";
import {
  popularDestinationsIntro,
  popularItinerariesIntro,
  stickyQuoteSection,
} from "../data/home-sections-data.js";
import { credentialsIntro, certificationBodies } from "../data/credentials-data.js";
import {
  tripAdvisorReviews,
  tripAdvisorReviewsIntro,
  tripAdvisorListingUrl,
} from "../data/tripadvisor-reviews.js";
import { tripAdvisorUrl, contactCopy, siteMeta, whatsAppUrl, whatsAppNumber } from "../data/home-data.js";
import { safariPackages } from "../data/all-safari-packages.js";
import { formatCopy } from "./content-utils.js";

function renderStars(rating) {
  return "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
}

function countryFlag(code) {
  if (!code || code.length !== 2) return "";
  return code
    .toUpperCase()
    .split("")
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function renderTeaserSlides(images, motionClass = "", cardIndex = 0) {
  const list = images?.length ? images : [{ src: "/assets/about/main3.jpg", alt: "Safari destination" }];
  return list
    .map((img, i) => {
      const eager = cardIndex < 3 && i === 0;
      const srcAttrs = eager
        ? `src="${formatCopy(img.src)}"${cardIndex === 0 ? ' fetchpriority="high"' : ""}`
        : `data-src="${formatCopy(img.src)}" src=""`;
      return `
        <div class="dest-slideshow__slide ${motionClass} ${i === 0 ? "is-active" : ""}" data-slide>
          <img
            class="${eager ? "is-loaded" : ""}"
            ${srcAttrs}
            alt="${formatCopy(img.alt || "")}"
            width="400"
            height="280"
            decoding="async"
            ${eager ? "" : 'loading="lazy"'}
          />
        </div>
      `;
    })
    .join("");
}

function renderTeaserDots(count) {
  if (count <= 1) return "";
  return Array.from(
    { length: count },
    (_, i) =>
      `<button type="button" class="dest-slideshow__dot ${i === 0 ? "is-active" : ""}" data-slide-dot aria-label="Show image ${i + 1}" aria-selected="${i === 0 ? "true" : "false"}"></button>`
  ).join("");
}

function renderDestTeaserSlide(dest, cardIndex = 0) {
  const images = dest.images?.length ? dest.images : [{ src: "/assets/about/main3.jpg", alt: dest.name }];
  const tags = dest.highlights?.slice(0, 3) || [];
  const href = `/destinations/${encodeURIComponent(dest.id)}.html`;
  return `
    <article class="dest-teaser-slide autoslider__slide">
      <div class="dest-teaser-slide__media" data-slideshow data-interval="4500">
        <div class="dest-slideshow__track">
          ${renderTeaserSlides(images, "dest-slideshow__slide--motion", cardIndex)}
        </div>
        <div class="dest-teaser-slide__overlay" aria-hidden="true"></div>
        <span class="dest-teaser-slide__script">${formatCopy(dest.scriptLabel)}</span>
        ${
          images.length > 1
            ? `<div class="dest-slideshow__dots dest-slideshow__dots--compact dest-teaser-slide__dots">${renderTeaserDots(images.length)}</div>`
            : ""
        }
      </div>
      <div class="dest-teaser-slide__body">
        <h3 class="dest-teaser-slide__name">${formatCopy(dest.name)}</h3>
        ${dest.journeys ? `<p class="dest-teaser-slide__journeys">${formatCopy(dest.journeys)}</p>` : ""}
        ${tags.length ? `<ul class="dest-teaser-slide__tags">${tags.map((t) => `<li>${formatCopy(t)}</li>`).join("")}</ul>` : ""}
        <a class="dest-teaser-slide__cta" href="${formatCopy(href)}">View destination →</a>
      </div>
    </article>
  `;
}

function renderTestimonialSlide(review) {
  const flag = countryFlag(review.countryCode);
  return `
    <blockquote class="testimonial-card autoslider__slide">
      <div class="testimonial-card__head">
        <span class="testimonial-card__flag" aria-label="${formatCopy(review.country)}" title="${formatCopy(review.country)}">${flag}</span>
        <div class="testimonial-card__stars" aria-label="${review.rating} out of 5">${renderStars(review.rating)}</div>
      </div>
      <p class="testimonial-card__quote">"${formatCopy(review.quote)}"</p>
      <footer class="testimonial-card__footer">
        <cite class="testimonial-card__author">${formatCopy(review.author)}</cite>
        <span class="testimonial-card__meta">${formatCopy(review.country)} · ${formatCopy(review.tripType || "Safari")} · ${formatCopy(review.date || "")}</span>
      </footer>
      <img class="testimonial-card__ta" src="/assets/credentials/tripadvisor.svg" alt="" width="88" height="18" loading="lazy" aria-hidden="true" />
    </blockquote>
  `;
}

export function renderPopularDestinations() {
  const root = document.querySelector("#home-popular-destinations");
  if (!root) return;

  const destinations = homePopularDestinations;
  const trackHtml = destinations.map((dest, i) => renderDestTeaserSlide(dest, i)).join("");

  root.innerHTML = `
    <section class="home-section home-section--alt" id="destinations" aria-labelledby="destinations-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${formatCopy(popularDestinationsIntro.label)}</span>
          <h2 id="destinations-title" class="home-section__title">${formatCopy(popularDestinationsIntro.title)}</h2>
          <p class="home-section__desc">${formatCopy(popularDestinationsIntro.desc)}</p>
        </header>
        ${renderAutosliderShell({
          label: "Destinations inspiration",
          autoplay: 5000,
          visible: "3",
          trackHtml,
        })}
        <div class="home-section__actions section-reveal">
          <a href="/destinations.html" class="btn btn--secondary">All Destinations</a>
          <a href="/circuits.html" class="btn btn--primary">Browse Circuits</a>
        </div>
      </div>
    </section>
  `;
}

function renderItineraryRow(packages, options = {}) {
  const {
    id = "",
    label = "Popular itineraries",
    rowLabel = "",
    autoplay = 5500,
    autoplayDelay = 600,
    visible = "3",
    catalogue = [],
  } = options;

  const enriched = packages.map((pkg) => enrichPackageFromCatalogue(pkg, catalogue));

  const trackHtml = enriched
    .map((pkg, i) => renderCard(pkg, i, { inCarousel: true }))
    .join("");

  return `
    <div class="itinerary-row section-reveal"${rowLabel ? ` aria-labelledby="${id}-label"` : ""}>
      ${rowLabel ? `<p class="itinerary-row__label" id="${id}-label">${rowLabel}</p>` : ""}
      ${renderAutosliderShell({
        id,
        label,
        autoplay,
        autoplayDelay,
        visible,
        trackHtml,
      })}
    </div>
  `;
}

export function renderPopularItineraries() {
  const root = document.querySelector("#home-popular-itineraries");
  if (!root) return;

  root.innerHTML = `
    <section class="home-section" id="itineraries" aria-labelledby="itineraries-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${formatCopy(popularItinerariesIntro.label)}</span>
          <h2 id="itineraries-title" class="home-section__title">${formatCopy(popularItinerariesIntro.title)}</h2>
          <p class="home-section__desc">${formatCopy(popularItinerariesIntro.desc)}</p>
        </header>
        <div class="itinerary-rows">
          ${renderItineraryRow(homePopularPackages, {
            id: "popular-itineraries-featured",
            label: "Featured safari itineraries",
            rowLabel: "Featured safaris",
            autoplay: 5500,
            autoplayDelay: 600,
            visible: "3",
            catalogue: safariPackages,
          })}
          ${renderItineraryRow(homePopularSouthernPackages, {
            id: "popular-itineraries-southern",
            label: "Southern circuit safari itineraries",
            rowLabel: "Southern Circuit",
            autoplay: 6500,
            autoplayDelay: 3200,
            visible: "3",
            catalogue: safariPackages,
          })}
        </div>
        <div class="home-section__actions section-reveal">
          <a href="/safaris.html" class="btn btn--secondary">All Safari Packages</a>
          <a href="/contact.html" class="btn btn--primary">Enquire</a>
        </div>
      </div>
    </section>
  `;
}

export function renderTestimonialsSlider() {
  const root = document.querySelector("#home-testimonials");
  if (!root) return;

  const trackHtml = tripAdvisorReviews.map(renderTestimonialSlide).join("");
  const hasReviews = tripAdvisorReviews.length > 0;

  root.innerHTML = `
    <section class="home-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${formatCopy(tripAdvisorReviewsIntro.label)}</span>
          <h2 id="testimonials-title" class="home-section__title">${formatCopy(tripAdvisorReviewsIntro.title)}</h2>
          <p class="home-section__desc">${formatCopy(tripAdvisorReviewsIntro.desc)}</p>
        </header>

        <div class="testimonials-ta-bar section-reveal">
          <img class="testimonials-ta-bar__logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="140" height="32" loading="lazy" />
          <a href="${formatCopy(tripAdvisorListingUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary testimonials-ta-bar__link">
            Read all reviews on TripAdvisor
          </a>
        </div>

        ${
          hasReviews
            ? renderAutosliderShell({
                label: "Guest testimonials",
                autoplay: 6500,
                visible: "2",
                trackHtml,
              })
            : `<div class="testimonials-ta-widget section-reveal">
                <iframe
                  title="Matembo Safaris TripAdvisor reviews"
                  src="https://www.tripadvisor.com/WidgetEmbed-cdspropertydetail?locationId=29014688&partnerId=00000000000000000000&display=true"
                  loading="lazy"
                  class="testimonials-ta-widget__frame"
                ></iframe>
              </div>`
        }
      </div>
    </section>
  `;
}

function credentialsLogoClass(logoFit) {
  return logoFit && logoFit !== "default" ? ` cred-marquee__logo--${logoFit}` : "";
}

function renderCredentialItem(item) {
  return `
    <a class="cred-marquee__item" href="${formatCopy(item.href)}" target="_blank" rel="noopener noreferrer" title="${formatCopy(item.name)}">
      <span class="cred-marquee__slot">
        <img class="cred-marquee__logo${credentialsLogoClass(item.logoFit)}" src="${formatCopy(item.logo)}" alt="${formatCopy(item.name)}" width="96" height="48" loading="lazy" decoding="async" />
      </span>
      <span class="cred-marquee__name">${formatCopy(item.abbr)}</span>
    </a>
  `;
}

export function renderCredentialsMarquee() {
  const root = document.querySelector("#home-credentials");
  if (!root) return;

  const loop = [...certificationBodies, ...certificationBodies];
  const items = loop.map(renderCredentialItem).join("");

  root.innerHTML = `
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${formatCopy(credentialsIntro.label)}</span>
          <h2 id="credentials-title" class="home-section__title">${formatCopy(credentialsIntro.title)}</h2>
          <p class="home-section__desc">${formatCopy(credentialsIntro.desc)}</p>
        </header>
        <div class="cred-marquee section-reveal" aria-label="Tourism and certification partners">
          <div class="cred-marquee__frame">
            <div class="cred-marquee__pattern" aria-hidden="true"></div>
            <span class="cred-marquee__corner cred-marquee__corner--tl" aria-hidden="true"></span>
            <span class="cred-marquee__corner cred-marquee__corner--br" aria-hidden="true"></span>
            <div class="cred-marquee__viewport">
              <div class="cred-marquee__track">${items}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderStickyQuote() {
  const root = document.querySelector("#home-sticky-quote");
  if (!root) return;

  const q = stickyQuoteSection;

  root.innerHTML = `
    <section class="sticky-quote" aria-labelledby="sticky-quote-title">
      <div class="sticky-quote__panel">
        <div class="sticky-quote__media">
          <img src="${formatCopy(q.image)}" alt="${formatCopy(q.imageAlt)}" width="1920" height="1080" loading="eager" decoding="async" fetchpriority="low" />
          <div class="sticky-quote__scrim" aria-hidden="true"></div>
        </div>
        <div class="sticky-quote__content">
          <p class="sticky-quote__signature">${formatCopy(q.signature)}</p>
          <h2 id="sticky-quote-title" class="sticky-quote__title">${formatCopy(q.quote)}</h2>
          <p class="sticky-quote__body">${formatCopy(q.body)}</p>
          <a href="${formatCopy(q.cta.href)}" class="btn btn--ghost sticky-quote__cta">${formatCopy(q.cta.label)}</a>
        </div>
      </div>
    </section>
  `;
}

export function renderWhatsAppFloat() {
  const existing = document.querySelector("[data-wa-float]");
  if (existing) return;

  const el = document.createElement("a");
  el.className = "wa-float";
  el.href = whatsAppUrl;
  el.target = "_blank";
  el.rel = "noopener noreferrer";
  el.setAttribute("data-wa-float", "");
  el.setAttribute("aria-label", `WhatsApp Matembo Safaris ${whatsAppNumber}`);
  el.innerHTML = `
    <span class="wa-float__tab">
      <span class="wa-float__pulse" aria-hidden="true"></span>
      <span class="wa-float__icon"><i class="fab fa-whatsapp" aria-hidden="true"></i></span>
      <span class="wa-float__copy">
        <span class="wa-float__label">Safari chat</span>
        <span class="wa-float__text">Enquire</span>
      </span>
    </span>
  `;
  document.body.appendChild(el);
}

export function renderHomeContact() {
  const root = document.querySelector("#home-contact");
  if (!root) return;

  root.innerHTML = `
    <section class="home-contact" id="contact" aria-labelledby="contact-title">
      <div class="container home-contact__inner section-reveal">
        <span class="home-contact__script">${formatCopy(contactCopy.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${formatCopy(contactCopy.title)}</h2>
        <p class="home-contact__text">${formatCopy(contactCopy.text)}</p>
        <div class="home-contact__actions">
          <a href="/contact.html" class="btn btn--primary">${formatCopy(contactCopy.ctaPrimary.label.replace("Email enquiry", "Plan your safari"))}</a>
          <a href="${formatCopy(contactCopy.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${formatCopy(contactCopy.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${formatCopy(siteMeta.location)} · ${formatCopy(siteMeta.phone)}</p>
      </div>
    </section>
  `;
}

export { 