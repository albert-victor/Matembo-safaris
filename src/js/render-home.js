import {
  aboutIntro,
  experiences,
  experiencesIntro,
  credentials,
  testimonials,
  testimonialsIntro,
  contactCopy,
  tripAdvisorUrl,
  siteMeta,
  socialLinks,
} from "../data/home-data.js";
import { heroSlides } from "../data/hero-slides-data.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderStars(rating) {
  return "★".repeat(rating) + "☆".repeat(Math.max(0, 5 - rating));
}

export function renderHero() {
  const root = document.querySelector("#home-hero");
  if (!root) return;

  root.querySelector("#hero-lcp-bootstrap")?.remove();

  const totalSlides = String(heroSlides.length).padStart(2, "0");

  const slideMarkup = heroSlides
    .map(
      (slide, i) => `
        <div
          class="hero-showcase__slide${i === 0 ? " is-active" : ""}"
          data-hero-slide="${i}"
          data-motion="${escapeHtml(slide.motion || "zoom-in")}"
        >
          <img
            class="hero-showcase__img${i === 0 ? " is-loaded" : ""}"
            ${i === 0 ? `src="${escapeHtml(slide.image)}" fetchpriority="high"` : `data-src="${escapeHtml(slide.image)}" src=""`}
            alt="${escapeHtml(slide.imageAlt)}"
            width="1920"
            height="1080"
            ${i === 0 ? 'decoding="async"' : 'loading="lazy" decoding="async"'}
            style="object-position: ${escapeHtml(slide.focus || "center")}"
          />
          <div class="hero-showcase__overlay" aria-hidden="true">
            <div class="hero-showcase__overlay-tint"></div>
            <div class="hero-showcase__overlay-vignette"></div>
            <div class="hero-showcase__overlay-scrim"></div>
            <div class="hero-showcase__overlay-glow"></div>
            <div class="hero-showcase__overlay-grain"></div>
          </div>
        </div>
      `
    )
    .join("");

  const particleMarkup = Array.from({ length: 5 }, (_, i) => `<span class="hero-showcase__particle" style="--i:${i}"></span>`).join("");

  const panelMarkup = heroSlides
    .map(
      (slide, i) => `
        <article
          class="hero-showcase__panel${i === 0 ? " is-active" : ""}"
          data-hero-panel="${i}"
          data-text-layout="${escapeHtml(slide.textLayout || "center")}"
          aria-hidden="${i === 0 ? "false" : "true"}"
        >
          <div class="hero-showcase__copy">
            <p class="hero-showcase__signature">${escapeHtml(slide.signature)}</p>
            <h1 class="hero-showcase__title">${escapeHtml(slide.title)}</h1>
            <p class="hero-showcase__lead">${escapeHtml(slide.lead)}</p>
          </div>
          <a href="${escapeHtml(slide.cta.href)}" class="btn btn--ghost hero-showcase__cta">${escapeHtml(slide.cta.label)}</a>
        </article>
      `
    )
    .join("");

  const dotsMarkup = heroSlides
    .map(
      (slide, i) => `
        <button
          type="button"
          class="hero-showcase__dot${i === 0 ? " is-active" : ""}"
          data-hero-dot="${i}"
          aria-label="Show ${escapeHtml(slide.title)}"
          aria-selected="${i === 0 ? "true" : "false"}"
        ></button>
      `
    )
    .join("");

  root.innerHTML = `
    <section
      class="hero-showcase hero-showcase--text-bottom"
      id="story"
      data-hero
      data-hero-slideshow
      data-interval="9000"
      aria-label="Tanzania safari highlights"
    >
      <div class="hero-showcase__stage">
        <div class="hero-showcase__slides" aria-hidden="true">${slideMarkup}</div>
        <div class="hero-showcase__film" aria-hidden="true">
          <div class="hero-showcase__film-gradient"></div>
          <div class="hero-showcase__particles">${particleMarkup}</div>
        </div>

        <div class="hero-showcase__content">
          <div class="hero-showcase__panels">${panelMarkup}</div>

          <nav class="hero-showcase__nav" aria-label="Hero slideshow navigation">
            <button type="button" class="hero-showcase__arrow hero-showcase__arrow--prev" data-hero-prev aria-label="Previous slide">
              <i class="fas fa-chevron-left" aria-hidden="true"></i>
            </button>

            <div class="hero-showcase__rail">
              <span class="hero-showcase__counter" data-hero-counter aria-live="polite">01 / ${totalSlides}</span>
              <div class="hero-showcase__track" aria-hidden="true">
                <span class="hero-showcase__fill" data-hero-progress style="width: ${Math.round(100 / heroSlides.length)}%"></span>
              </div>
              <div class="hero-showcase__dots" role="tablist" aria-label="Hero slides">${dotsMarkup}</div>
            </div>

            <button type="button" class="hero-showcase__arrow hero-showcase__arrow--next" data-hero-next aria-label="Next slide">
              <i class="fas fa-chevron-right" aria-hidden="true"></i>
            </button>
          </nav>
        </div>
      </div>
    </section>
  `;
}

export function renderAbout() {
  const root = document.querySelector("#home-about");
  if (!root) return;

  root.innerHTML = `
    <section class="home-about" id="about" aria-labelledby="about-title">
      <div class="container home-about__grid">
        <div class="home-about__media section-reveal">
          <img
            class="reveal-on-scroll"
            src="${escapeHtml(aboutIntro.image)}"
            alt="${escapeHtml(aboutIntro.imageAlt)}"
            width="480"
            height="560"
            loading="lazy"
          />
          <span class="home-about__media-overlay home-about__media-overlay--gold" aria-hidden="true"></span>
          <span class="home-about__media-overlay home-about__media-overlay--green" aria-hidden="true"></span>
        </div>

        <div class="home-about__content section-reveal">
          <span class="home-section__label">About Matembo</span>
          <span class="home-about__script">${escapeHtml(aboutIntro.scriptLabel)}</span>
          <h2 id="about-title" class="home-section__title">${escapeHtml(aboutIntro.title)}</h2>
          ${aboutIntro.paragraphs
            .map(
              (p, index) =>
                `<p class="home-about__text"${index ? ` data-reveal-delay="${Math.min(index, 2)}"` : ""}>${escapeHtml(p)}</p>`
            )
            .join("")}
          <dl class="home-about__stats">
            ${aboutIntro.stats
              .map(
                (stat, index) => `
                  <div class="home-about__stat"${index ? ` data-reveal-delay="${Math.min(index, 2)}"` : ""}>
                    <dt>${escapeHtml(stat.label)}</dt>
                    <dd>${escapeHtml(stat.value)}</dd>
                  </div>
                `
              )
              .join("")}
          </dl>
        </div>
      </div>
    </section>
  `;
}

export function renderExperiences() {
  const root = document.querySelector("#home-experiences");
  if (!root) return;

  root.innerHTML = `
    <section class="home-experiences" id="experiences" aria-labelledby="experiences-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">What We Offer</span>
          <h2 id="experiences-title" class="home-section__title">Safari Experiences</h2>
          <p class="home-section__desc">${escapeHtml(experiencesIntro)}</p>
        </header>

        <div class="home-experiences__grid">
          ${experiences
            .map(
              (item, index) => `
                <article class="experience-card" data-reveal ${index % 3 ? `data-reveal-delay="${index % 3}"` : ""}>
                  <span class="experience-card__icon" aria-hidden="true">${escapeHtml(item.icon)}</span>
                  <h3 class="experience-card__title">${escapeHtml(item.title)}</h3>
                  <p class="experience-card__text">${escapeHtml(item.text)}</p>
                  ${
                    item.href
                      ? `<a href="${escapeHtml(item.href)}" class="experience-card__link">Explore →</a>`
                      : ""
                  }
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function renderCredentials() {
  const root = document.querySelector("#home-credentials");
  if (!root) return;

  root.innerHTML = `
    <section class="home-credentials" id="credentials" aria-labelledby="credentials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">Trust & Credentials</span>
          <h2 id="credentials-title" class="home-section__title">Travel With Confidence</h2>
        </header>

        <dl class="credentials-grid">
          ${credentials
            .map(
              (item, index) => `
                <div class="credentials-grid__item" data-reveal ${index % 3 ? `data-reveal-delay="${index % 3}"` : ""}>
                  <dt>${escapeHtml(item.label)}</dt>
                  <dd>
                    ${
                      item.href
                        ? `<a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.value)}</a>`
                        : escapeHtml(item.value)
                    }
                  </dd>
                </div>
              `
            )
            .join("")}
        </dl>
      </div>
    </section>
  `;
}

export function renderTestimonials() {
  const root = document.querySelector("#home-testimonials");
  if (!root) return;

  root.innerHTML = `
    <section class="home-testimonials" id="testimonials" aria-labelledby="testimonials-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">Guest Voices</span>
          <h2 id="testimonials-title" class="home-section__title">What Travellers Say</h2>
          <p class="home-section__desc">${escapeHtml(testimonialsIntro)} <a href="${escapeHtml(tripAdvisorUrl)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-tripadvisor" aria-hidden="true"></i> TripAdvisor</a>.</p>
        </header>

        <div class="testimonials-grid">
          ${testimonials
            .map(
              (item, index) => `
                <blockquote class="testimonial-card" data-reveal ${index ? `data-reveal-delay="${index}"` : ""}>
                  <div class="testimonial-card__stars" aria-label="${item.rating} out of 5 stars">${renderStars(item.rating)}</div>
                  <p class="testimonial-card__quote">“${escapeHtml(item.quote)}”</p>
                  <footer class="testimonial-card__footer">
                    <cite class="testimonial-card__author">${escapeHtml(item.author)}</cite>
                    <span class="testimonial-card__meta">${escapeHtml(item.location)} · ${escapeHtml(item.source)}</span>
                  </footer>
                </blockquote>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function renderContactCta() {
  const root = document.querySelector("#home-contact");
  if (!root) return;

  root.innerHTML = `
    <section class="home-contact" id="contact" aria-labelledby="contact-title">
      <div class="container home-contact__inner section-reveal">
        <span class="home-contact__script">${escapeHtml(contactCopy.signature)}</span>
        <h2 id="contact-title" class="home-contact__title">${escapeHtml(contactCopy.title)}</h2>
        <p class="home-contact__text">${escapeHtml(contactCopy.text)}</p>
        <div class="home-contact__actions">
          <a href="${escapeHtml(contactCopy.ctaPrimary.href)}" class="btn btn--primary">${escapeHtml(contactCopy.ctaPrimary.label)}</a>
          <a href="${escapeHtml(contactCopy.ctaSecondary.href)}" class="btn btn--secondary" target="_blank" rel="noopener noreferrer">${escapeHtml(contactCopy.ctaSecondary.label)}</a>
        </div>
        <p class="home-contact__meta">${escapeHtml(siteMeta.location)} · ${escapeHtml(siteMeta.phone)}</p>
      </div>
    </section>
  `;
}

export function renderSiteFooter() {
  const root = document.querySelector("#site-footer");
  if (!root) return;

  const socialHtml = socialLinks
    .map(
      (item) => `
        <a
          class="site-footer__social-link${item.variant === "tripadvisor" ? " site-footer__social-link--tripadvisor" : ""}"
          href="${escapeHtml(item.href)}"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="${escapeHtml(item.label)}"
        >
          <i class="${escapeHtml(item.icon)}" aria-hidden="true"></i>
        </a>
      `
    )
    .join("");

  root.innerHTML = `
    <footer class="site-footer">
      <div class="site-footer__top">
        <div class="container site-footer__grid">
          <div class="site-footer__brand">
            <span class="site-footer__monogram" aria-hidden="true">M</span>
            <p class="site-footer__name">${escapeHtml(siteMeta.name)}</p>
            <p class="site-footer__tagline">Private wildlife journeys across Tanzania – from Serengeti plains to crater rim and coast.</p>
            <p class="site-footer__location">
              <i class="fas fa-location-dot" aria-hidden="true"></i>
              ${escapeHtml(siteMeta.location)}
            </p>
          </div>

          <nav class="site-footer__col" aria-label="Explore">
            <span class="site-footer__col-label">Explore</span>
            <a class="site-footer__link" href="/circuits.html">
              <i class="fas fa-compass" aria-hidden="true"></i>
              Circuits
            </a>
            <a class="site-footer__link" href="/destinations.html">
              <i class="fas fa-map" aria-hidden="true"></i>
              All Destinations
            </a>
            <a class="site-footer__link" href="/safaris.html">
              <i class="fas fa-route" aria-hidden="true"></i>
              Safari Packages
            </a>
            <a class="site-footer__link" href="/about.html">
              <i class="fas fa-leaf" aria-hidden="true"></i>
              About Matembo
            </a>
            <a class="site-footer__link" href="/#services">
              <i class="fas fa-binoculars" aria-hidden="true"></i>
              Safari Experiences
            </a>
          </nav>

          <nav class="site-footer__col" aria-label="Plan your trip">
            <span class="site-footer__col-label">Book</span>
            <a class="site-footer__link site-footer__link--accent" href="/contact.html">
              <i class="fas fa-calendar-check" aria-hidden="true"></i>
              Plan Your Safari
            </a>
            <a class="site-footer__link" href="${escapeHtml(tripAdvisorUrl)}" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-tripadvisor" aria-hidden="true"></i>
              TripAdvisor Reviews
            </a>
            <a class="site-footer__link" href="/circuits/northern.html">
              <i class="fas fa-map" aria-hidden="true"></i>
              Northern Circuit
            </a>
          </nav>

          <div class="site-footer__col">
            <span class="site-footer__col-label">Contact</span>
            <a class="site-footer__link" href="tel:+255679529700">
              <i class="fas fa-phone" aria-hidden="true"></i>
              ${escapeHtml(siteMeta.phone)}
            </a>
            <a class="site-footer__link" href="mailto:${escapeHtml(siteMeta.email)}">
              <i class="fas fa-envelope" aria-hidden="true"></i>
              ${escapeHtml(siteMeta.email)}
            </a>
            <a class="site-footer__link" href="https://wa.me/255679529700" target="_blank" rel="noopener noreferrer">
              <i class="fab fa-whatsapp" aria-hidden="true"></i>
              WhatsApp enquiry
            </a>
          </div>
        </div>
      </div>

      <div class="site-footer__social-bar">
        <div class="container site-footer__social-inner">
          <div class="site-footer__social" aria-label="Follow Matembo Safari & Tours">
            ${socialHtml}
          </div>
          <p class="site-footer__copyright">
            © ${new Date().getFullYear()} ${escapeHtml(siteMeta.name)}. Wildlife safaris across Tanzania.
          </p>
        </div>
      </div>
    </footer>
  `;
}
