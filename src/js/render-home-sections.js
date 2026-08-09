import { renderAutosliderShell } from "./autoslider.js";
import { renderCard } from "./render-cards.js";
import { northernCircuitDestinations } from "../data/northern-circuit-destinations.js";
import { allDestinations } from "../data/all-destinations.js";
import { safariPackages } from "../data/safari-packages.js";
import {
  popularDestinationsIntro,
  popularDestinationIds,
  popularItinerariesIntro,
  popularItineraryIds,
  stickyQuoteSection,
} from "../data/home-sections-data.js";
import { credentialsIntro, certificationBodies } from "../data/credentials-data.js";
import {
  tripAdvisorReviews,
  tripAdvisorReviewsIntro,
  tripAdvisorListingUrl,
} from "../data/tripadvisor-reviews.js";
import { tripAdvisorUrl, contactCopy, siteMeta } from "../data/home-data.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderStars(rating) {
  return "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
}

function getDestinationsByIds(ids) {
  return ids
    .map((id) => allDestinations.find((d) => d.id === id) || northernCircuitDestinations.find((d) => d.id === id))
    .filter(Boolean);
}

function renderDestTeaserSlide(dest) {
  const img = dest.images?.[0];
  const tags = dest.highlights?.slice(0, 3) || [];
  return `
    <article class="dest-teaser-slide autoslider__slide">
      <a class="dest-teaser-slide__link" href="/destinations/${encodeURIComponent(dest.id)}.html">
        <div class="dest-teaser-slide__media">
          <img src="${escapeHtml(img?.src || "/assets/about/main3.jpg")}" alt="${escapeHtml(img?.alt || dest.name)}" loading="lazy" width="400" height="280" />
          <div class="dest-teaser-slide__overlay" aria-hidden="true"></div>
          <span class="dest-teaser-slide__script">${escapeHtml(dest.scriptLabel)}</span>
        </div>
        <div class="dest-teaser-slide__body">
          <h3 class="dest-teaser-slide__name">${escapeHtml(dest.name)}</h3>
          ${dest.journeys ? `<p class="dest-teaser-slide__journeys">${escapeHtml(dest.journeys)}</p>` : ""}
          ${tags.length ? `<ul class="dest-teaser-slide__tags">${tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>` : ""}
          <span class="dest-teaser-slide__cta">View destination →</span>
        </div>
      </a>
    </article>
  `;
}

function renderTestimonialSlide(review) {
  return `
    <blockquote class="testimonial-slide autoslider__slide">
      <div class="testimonial-slide__head">
        <img class="testimonial-slide__ta-logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="120" height="28" loading="lazy" />
        <div class="testimonial-slide__stars" aria-label="${review.rating} out of 5">${renderStars(review.rating)}</div>
      </div>
      <p class="testimonial-slide__quote">${escapeHtml(review.quote)}</p>
      <footer class="testimonial-slide__footer">
        <cite class="testimonial-slide__author">${escapeHtml(review.author)}</cite>
        <span class="testimonial-slide__meta">${escapeHtml(review.location)} · ${escapeHtml(review.tripType || "Safari")} · ${escapeHtml(review.date || "")}</span>
      </footer>
    </blockquote>
  `;
}

export function renderPopularDestinations() {
  const root = document.querySelector("#home-popular-destinations");
  if (!root) return;

  const destinations = getDestinationsByIds(popularDestinationIds);
  const trackHtml = destinations.map(renderDestTeaserSlide).join("");

  root.innerHTML = `
    <section class="home-section home-section--alt" id="destinations" aria-labelledby="destinations-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${escapeHtml(popularDestinationsIntro.label)}</span>
          <h2 id="destinations-title" class="home-section__title">${escapeHtml(popularDestinationsIntro.title)}</h2>
          <p class="home-section__desc">${escapeHtml(popularDestinationsIntro.desc)}</p>
        </header>
        ${renderAutosliderShell({
          label: "Popular destinations",
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

export function renderPopularItineraries() {
  const root = document.querySelector("#home-popular-itineraries");
  if (!root) return;

  const packages = popularItineraryIds
    .map((id) => safariPackages.find((p) => p.id === id))
    .filter(Boolean);

  const trackHtml = packages.map((pkg, i) => renderCard(pkg, i, { inCarousel: true })).join("");

  root.innerHTML = `
    <section class="home-section" id="itineraries" aria-labelledby="itineraries-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${escapeHtml(popularItinerariesIntro.label)}</span>
          <h2 id="itineraries-title" class="home-section__title">${escapeHtml(popularItinerariesIntro.title)}</h2>
          <p class="home-section__desc">${escapeHtml(popularItinerariesIntro.desc)}</p>
        </header>
        ${renderAutosliderShell({
          label: "Popular itineraries",
          autoplay: 5500,
          visible: "3",
          trackHtml,
        })}
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
          <span class="home-section__label">${escapeHtml(tripAdvisorReviewsIntro.label)}</span>
          <h2 id="testimonials-title" class="home-section__title">${escapeHtml(tripAdvisorReviewsIntro.title)}</h2>
          <p class="home-section__desc">${escapeHtml(tripAdvisorReviewsIntro.desc)}</p>
        </header>

        <div class="testimonials-ta-bar section-reveal">
          <img class="testimonials-ta-bar__logo" src="/assets/credentials/tripadvisor.svg" alt="TripAdvisor" width="140" height="32" loading="lazy" />
          <a href="${escapeHtml(tripAdvisorListingUrl)}" target="_blank" rel="noopener noreferrer" class="btn btn--secondary testimonials-ta-bar__link">
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

export function renderCredentialsMarquee() {
  const root = document.querySelector("#home-credentials");
  if (!root) return;

  const items = [...certificationBodies, ...certificationBodies]
    .map(
      (item) => `
        <a class="cred-marquee__item" href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer" title="${escapeHtml(item.name)}">
          <img class="cred-marquee__logo" src="${escapeHtml(item.logo)}" alt="${escapeHtml(item.name)}" width="120" height="48" loading="lazy" />
          <span class="cred-marquee__name">${escapeHtml(item.name)}</span>
        </a>
      `
    )
    .join("");

  root.innerHTML = `
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${escapeHtml(credentialsIntro.label)}</span>
          <h2 id="credentials-title" class="home-section__title">${escapeHtml(credentialsIntro.title)}</h2>
          <p class="home-section__desc">${escapeHtml(credentialsIntro.desc)}</p>
        </header>
      </div>
      <div class="cred-marquee section-reveal" aria-hidden="true">
        <div class="cred-marquee__track">${items}</div>
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
      <div class="sticky-quote__sticky">
        <div class="sticky-quote__media">
          <img src="${escapeHtml(q.image)}" alt="${escapeHtml(q.imageAlt)}" width="1920" height="1080" loading="lazy" />
          <div class="sticky-quote__scrim" aria-hidden="true"></div>
        </div>
        <div class="sticky-quote__content">
          <p class="sticky-quote__signature">${escapeHtml(q.signature)}</p>
          <h2 id="sticky-quote-title" class="sticky-quote__title">${escapeHtml(q.quote)}</h2>
          <p class="sticky-quote__body">${escapeHtml(q.body)}</p>
          <a href="${escapeHtml(q.cta.href)}" class="btn btn--hero-cream sticky-quote__cta">${escapeHtml(q.cta.label)}</a>
        </div>
      </div>
      <div class="sticky-quote__spacer" aria-hidden="true"></div>
    </section>
  `;
}

export function renderWhatsAppFloat() {
  const existing = document.querySelector("[data-wa-float]");
  if (existing) return;

  const el = document.createElement("a");
  el.className = "wa-float";
  el.href = "https://wa.me/255679529700";
  el.target = "_blank";
  el.rel = "noopener noreferrer";
  el.setAttribute("data-wa-float", "");
  el.setAttribute("aria-label", "WhatsApp safari enquiry");
  el.innerHTML = `
    <span class="wa-float__tab">
      <span class="wa-float__icon"><i class="fab fa-whatsapp" aria-hidden="true"></i></span>
      <span class="wa-float__text">Enquire</span>
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
        <span class="home-contact__script">${escapeHtml(contactCopy.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${escapeHtml(contactCopy.title)}</h2>
        <p class="home-contact__text">${escapeHtml(contactCopy.text)}</p>
        <div class="home-contact__actions">
          <a href="/contact.html" class="btn btn--primary">${escapeHtml(contactCopy.ctaPrimary.label.replace("Email enquiry", "Plan your safari"))}</a>
          <a href="${escapeHtml(contactCopy.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${escapeHtml(contactCopy.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${escapeHtml(siteMeta.location)} · ${escapeHtml(siteMeta.phone)}</p>
      </div>
    </section>
  `;
}

export { renderSiteFooter } from "./render-home.js";
