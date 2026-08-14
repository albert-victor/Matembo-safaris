import { aboutPageData } from "../data/about-page-data.js";
import { socialLinks, siteMeta } from "../data/home-data.js";
import { formatCopy, escapeHtml } from "./content-utils.js";

export function renderAboutPage() {
  const hero = document.querySelector("#about-hero");
  const story = document.querySelector("#about-story");
  const moments = document.querySelector("#about-moments");
  const gallery = document.querySelector("#about-gallery");
  const team = document.querySelector("#about-team");
  const social = document.querySelector("#about-social");

  const d = aboutPageData;

  if (hero) {
    const particles = Array.from(
      { length: 5 },
      (_, i) => `<span class="about-hero__particle" style="--i:${i}"></span>`
    ).join("");

    hero.innerHTML = `
      <section class="about-hero">
        <div class="about-hero__media">
          <div class="about-hero__media-motion">
            <img
              src="${escapeHtml(d.hero.image)}"
              alt="${escapeHtml(d.hero.title)}"
              width="1920"
              height="1080"
              loading="eager"
              decoding="async"
              fetchpriority="high"
            />
          </div>
        </div>
        <div class="about-hero__overlay" aria-hidden="true">
          <div class="about-hero__overlay-tint"></div>
          <div class="about-hero__overlay-vignette"></div>
          <div class="about-hero__overlay-scrim"></div>
          <div class="about-hero__overlay-glow"></div>
        </div>
        <div class="about-hero__film" aria-hidden="true">
          <div class="about-hero__film-gradient"></div>
          <div class="about-hero__particles">${particles}</div>
        </div>
        <div class="container about-hero__content">
          <p class="about-hero__signature">${formatCopy(d.hero.signature)}</p>
          <h1 class="about-hero__title">${formatCopy(d.hero.title)}</h1>
          <p class="about-hero__lead">${formatCopy(d.hero.lead)}</p>
        </div>
      </section>
    `;
  }

  if (story) {
    story.innerHTML = `
      <section class="about-story home-section" aria-labelledby="about-story-title">
        <div class="container about-story__grid">
          <div class="about-story__media section-reveal">
            <img src="${escapeHtml(d.story.image)}" alt="Matembo Safari team in Tanzania" loading="lazy" width="520" height="600" />
          </div>
          <div class="about-story__content section-reveal">
            <span class="home-section__label">${formatCopy(d.story.label)}</span>
            <h2 id="about-story-title" class="home-section__title">${formatCopy(d.story.title)}</h2>
            ${d.story.paragraphs.map((p) => `<p class="about-story__text">${formatCopy(p)}</p>`).join("")}
            <dl class="home-about__stats">
              ${d.story.stats.map((s) => `
                <div class="home-about__stat">
                  <dt>${formatCopy(s.label)}</dt>
                  <dd>${formatCopy(s.value)}</dd>
                </div>
              `).join("")}
            </dl>
          </div>
        </div>
      </section>
    `;
  }

  if (moments) {
    moments.innerHTML = `
      <section class="about-moments home-section home-section--alt" aria-labelledby="about-moments-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">${formatCopy(d.moments.label)}</span>
            <h2 id="about-moments-title" class="home-section__title">${formatCopy(d.moments.title)}</h2>
            <p class="home-section__desc">${formatCopy(d.moments.desc)}</p>
          </header>
          <div class="about-moments__grid">
            ${d.moments.images.map((img, i) => `
              <figure class="about-moments__item" data-reveal ${i % 3 ? `data-reveal-delay="${i % 3}"` : ""}>
                <img src="${escapeHtml(img.src)}" alt="${formatCopy(img.alt)}" loading="lazy" width="400" height="300" />
              </figure>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  if (gallery) {
    gallery.innerHTML = `
      <section class="about-gallery home-section" id="about-gallery" aria-labelledby="about-gallery-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">${formatCopy(d.gallery.label)}</span>
            <h2 id="about-gallery-title" class="home-section__title">${formatCopy(d.gallery.title)}</h2>
            <p class="home-section__desc">${formatCopy(d.gallery.desc)}</p>
          </header>
          <div class="about-gallery__grid">
            ${d.gallery.images.map((img, i) => `
              <figure class="about-gallery__item${i % 5 === 0 ? " about-gallery__item--wide" : ""}" data-reveal ${i % 4 ? `data-reveal-delay="${i % 4}"` : ""}>
                <img src="${escapeHtml(img.src)}" alt="${formatCopy(img.alt)}" loading="lazy" width="360" height="280" />
              </figure>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }

  if (team) {
    team.innerHTML = `
      <section class="about-team home-section home-section--alt" aria-labelledby="about-team-title">
        <div class="container about-team__inner section-reveal">
          <span class="home-section__label">${formatCopy(d.team.label)}</span>
          <h2 id="about-team-title" class="home-section__title">${formatCopy(d.team.title)}</h2>
          <p class="about-team__text">${formatCopy(d.team.text)}</p>
          <dl class="about-team__contact">
            <div><dt>Location</dt><dd>${formatCopy(d.team.contact.location)}</dd></div>
            <div><dt>Phone</dt><dd><a href="tel:+255679529700">${formatCopy(d.team.contact.phone)}</a></dd></div>
            <div><dt>Email</dt><dd><a href="mailto:${escapeHtml(d.team.contact.email)}">${formatCopy(d.team.contact.email)}</a></dd></div>
          </dl>
          <a href="/contact.html" class="btn btn--primary">Plan your safari</a>
        </div>
      </section>
    `;
  }

  if (social) {
    social.innerHTML = `
      <section class="about-social" aria-label="Follow Matembo">
        <div class="container about-social__inner section-reveal">
          <span class="about-social__label">Follow Matembo</span>
          <div class="about-social__links">
            ${socialLinks.map((item) => `
              <a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer" class="about-social__link" aria-label="${escapeHtml(item.label)}">
                <i class="${escapeHtml(item.icon)}" aria-hidden="true"></i>
              </a>
            `).join("")}
          </div>
        </div>
      </section>
    `;
  }
}
