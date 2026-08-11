import {
  getExperienceById,
  experiences,
  experiencePageUrl,
} from "../data/experiences-data.js";
import {
  photosForExperience,
  splitIntoParagraphs,
  dedupePhotos,
} from "./content-utils.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export { getExperienceById };

export function getPagePhotos(exp) {
  return photosForExperience(exp, 4);
}

function getRelatedExperiences(currentId, count = 3) {
  const picked = [];
  const seen = new Set([currentId]);

  for (const exp of experiences) {
    if (picked.length >= count) break;
    if (seen.has(exp.id)) continue;
    picked.push(exp);
    seen.add(exp.id);
  }

  return picked;
}

function renderGallerySlides(images) {
  return images
    .map(
      (img, i) => `
        <div class="dest-slideshow__slide ${i === 0 ? "is-active" : ""}" data-slide>
          <img
            src="${escapeHtml(img.src)}"
            alt="${escapeHtml(img.alt)}"
            width="1200"
            height="675"
            loading="${i === 0 ? "eager" : "lazy"}"
            decoding="async"
          />
        </div>
      `
    )
    .join("");
}

function renderHighlightPills(items, limit = 3) {
  if (!items?.length) return "";
  return `
    <ul class="dest-page__pills" aria-label="Highlights">
      ${items.slice(0, limit).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderDescriptions(exp) {
  const paragraphs = exp.descriptions?.length
    ? exp.descriptions.filter(Boolean).slice(0, 5)
    : splitIntoParagraphs(exp.description);

  return paragraphs
    .map((p, i) =>
      i === 0
        ? `<p class="dest-page__lead">${escapeHtml(p)}</p>`
        : `<p class="dest-page__text">${escapeHtml(p)}</p>`
    )
    .join("");
}

function renderPhotoGrid(photos, heroSrc) {
  const extras = dedupePhotos(photos, { excludeSrc: heroSrc, max: 4 });
  if (!extras.length) return "";

  return `
    <div class="dest-page__photo-grid dest-page__photo-grid--compact">
      ${extras
        .map(
          (img, i) => `
            <button type="button" class="dest-page__photo" data-reveal data-lightbox-index="${i + 1}" aria-label="View photo ${i + 1}"${i % 3 ? ` data-reveal-delay="${i % 3}"` : ""}>
              <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy" decoding="async" width="480" height="320" />
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderTagPills(items, limit = 2) {
  if (!items?.length) return "";
  return `
    <ul class="dest-card__tags">
      ${items.slice(0, limit).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderRelatedCards(related) {
  return related
    .map(
      (exp) => `
        <article class="dest-card dest-card--b dest-card--teaser dest-card--related" data-reveal>
          <div class="dest-card__cinema dest-card__cinema--related">
            <div class="dest-slideshow__track dest-slideshow__track--cinema">
              <div class="dest-slideshow__slide is-active" data-slide>
                <img src="${escapeHtml(exp.images[0]?.src)}" alt="${escapeHtml(exp.images[0]?.alt || exp.name)}" loading="lazy" width="640" height="400" />
              </div>
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            <div class="dest-card__cinema-caption">
              <span class="dest-card__script">${escapeHtml(exp.scriptLabel)}</span>
              <h3 class="dest-card__name">${escapeHtml(exp.name)}</h3>
            </div>
          </div>
          <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${experiencePageUrl(exp)}">
            ${renderTagPills(exp.highlights, 2)}
            <span class="dest-card__link">Explore ${escapeHtml(exp.name)} →</span>
          </a>
        </article>
      `
    )
    .join("");
}

export function renderExperiencePage(containerSelector, exp) {
  const container = document.querySelector(containerSelector);
  if (!container || !exp) return false;

  const photos = getPagePhotos(exp);
  const heroPhoto = photos[0] || exp.images[0];
  const related = getRelatedExperiences(exp.id, 3);

  document.title = `${exp.fullName} | Matembo Safari & Tours`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", exp.description);

  container.innerHTML = `
    <article class="dest-page">
      <header class="dest-page__hero" data-hero>
        <div class="dest-page__hero-media">
          <img
            src="${escapeHtml(heroPhoto.src)}"
            alt="${escapeHtml(heroPhoto.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="dest-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container dest-page__hero-inner section-reveal">
          <p class="dest-page__eyebrow">${escapeHtml(exp.category)} · ${escapeHtml(exp.region)}</p>
          <h1 class="dest-page__title">${escapeHtml(exp.fullName)}</h1>
          <p class="dest-page__script">${escapeHtml(exp.scriptLabel)}</p>
          ${renderHighlightPills(exp.highlights)}
          <div class="dest-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Plan Your Safari</a>
            ${
              exp.id === "bird-watching"
                ? `<a href="/bird-watching.html" class="btn btn--secondary btn--ghost-light">Birding Packages</a>`
                : exp.id === "cultural-visits"
                  ? `<a href="/cultural-visits.html" class="btn btn--secondary btn--ghost-light">Cultural Packages</a>`
                  : `<a href="/experiences.html" class="btn btn--secondary btn--ghost-light">All Experiences</a>`
            }
          </div>
        </div>
      </header>

      ${
        photos.length > 1
          ? `
      <section class="dest-page__gallery-band" aria-labelledby="gallery-title">
        <div class="container">
          <div class="dest-page__gallery-head section-reveal">
            <h2 id="gallery-title" class="dest-page__section-title">More views</h2>
          </div>
          ${renderPhotoGrid(photos, heroPhoto.src)}
        </div>
      </section>
      `
          : ""
      }

      <section class="dest-page__content">
        <div class="container">
          <aside class="dest-page__plan-bar section-reveal" aria-label="Plan your visit">
            <div class="dest-page__plan-bar-copy">
              <p class="dest-page__plan-bar-label">Good to know</p>
              <p class="dest-page__plan-bar-text">
                Best season <strong>${escapeHtml(exp.bestSeason)}</strong>
              </p>
            </div>
            <div class="dest-page__plan-bar-actions">
              <a href="/contact.html" class="btn btn--primary">Plan This Experience</a>
              <a href="/experiences.html" class="dest-page__aside-link">All experiences</a>
            </div>
          </aside>

          <div class="dest-page__main section-reveal">
            <h2 class="dest-page__section-title">About ${escapeHtml(exp.name)}</h2>
            <div class="dest-page__copy">${renderDescriptions(exp)}</div>
          </div>
        </div>
      </section>

      <section class="dest-page__related" aria-labelledby="related-title">
        <div class="container">
          <div class="dest-page__related-head section-reveal">
            <h2 id="related-title" class="dest-page__section-title">More to explore</h2>
          </div>
          <div class="dest-page__related-grid">${renderRelatedCards(related)}</div>
        </div>
      </section>
    </article>

    <div class="dest-lightbox" data-lightbox hidden aria-hidden="true" role="dialog" aria-modal="true" aria-label="Photo gallery">
      <button type="button" class="dest-lightbox__close" data-lightbox-close aria-label="Close">×</button>
      <button type="button" class="dest-lightbox__prev" data-lightbox-prev aria-label="Previous">‹</button>
      <figure class="dest-lightbox__figure">
        <img class="dest-lightbox__img" src="" alt="" width="1200" height="800" />
      </figure>
      <button type="button" class="dest-lightbox__next" data-lightbox-next aria-label="Next">›</button>
    </div>
  `;

  return true;
}

export function renderExperienceNotFound(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <div class="container dest-page-empty">
      <h1 class="dest-page__title">Experience not found</h1>
      <p class="dest-page__text">Browse our <a href="/experiences.html">Where to Go experiences</a>.</p>
    </div>
  `;
}
