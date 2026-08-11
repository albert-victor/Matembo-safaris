import { getDestinationById, allDestinations } from "../data/all-destinations.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export { getDestinationById };

export function destinationPageUrl(dest) {
  return `/destinations/${encodeURIComponent(dest.id)}.html`;
}

const NORTHERN_FEATURED = [
  "serengeti",
  "ngorongoro",
  "kilimanjaro",
  "tarangire",
  "manyara",
  "arusha",
];

const SOUTHERN_FEATURED = [
  "ruaha",
  "nyerere",
  "katavi",
  "kitulo",
  "lake-nyasa",
  "matema-beach",
  "isimila",
  "mikumi",
];

const EASTERN_FEATURED = [
  "mikumi",
  "udzungwa",
  "saadani",
  "kilwa-kisiwani",
  "bagamoyo",
  "pangani",
];

const WESTERN_FEATURED = [
  "mahale",
  "gombe",
  "rubondo",
  "lake-tanganyika",
  "saanane",
];

const ZANZIBAR_FEATURED = [
  "zanzibar",
  "stone-town",
  "jozani-forest",
  "nungwi-beach",
  "pemba",
  "chumbe-island",
];

const MAFIA_FEATURED = [
  "mafia",
  "chole-bay",
  "juani-island",
  "misali-island",
];

const OCEANIC_FEATURED = [
  "pemba",
  "misali-island",
  "fanjove-island",
  "chumbe-island",
  "mnemba-island",
  "thanda-island",
];

const FEATURED_BY_CIRCUIT = {
  southern: SOUTHERN_FEATURED,
  eastern: EASTERN_FEATURED,
  western: WESTERN_FEATURED,
  northern: NORTHERN_FEATURED,
  zanzibar: ZANZIBAR_FEATURED,
  mafia: MAFIA_FEATURED,
  oceanic: OCEANIC_FEATURED,
};

export function getRelatedDestinations(currentId, count = 3) {
  const current = getDestinationById(currentId);
  const circuit = current?.circuit || "northern";
  const featured = FEATURED_BY_CIRCUIT[circuit] || NORTHERN_FEATURED;
  const pool = allDestinations.filter((dest) => dest.circuit === circuit);
  const picked = [];
  const seen = new Set([currentId]);

  for (const id of featured) {
    if (picked.length >= count) break;
    if (seen.has(id)) continue;
    const dest = getDestinationById(id);
    if (dest && dest.circuit === circuit) {
      picked.push(dest);
      seen.add(id);
    }
  }

  for (const dest of pool) {
    if (picked.length >= count) break;
    if (seen.has(dest.id)) continue;
    picked.push(dest);
    seen.add(dest.id);
  }

  return picked;
}

export function getPagePhotos(dest) {
  const source = dest.gallery?.length ? dest.gallery : dest.images;
  const seen = new Set();
  const unique = [];

  for (const photo of source) {
    if (!photo?.src || seen.has(photo.src)) continue;
    seen.add(photo.src);
    unique.push(photo);
    if (unique.length >= 12) break;
  }

  return unique;
}

function renderGallerySlides(images, dest) {
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

function renderDots(count) {
  return Array.from(
    { length: count },
    (_, i) =>
      `<button type="button" class="dest-slideshow__dot ${i === 0 ? "is-active" : ""}" data-slide-dot aria-label="Show image ${i + 1}"></button>`
  ).join("");
}

function renderHighlightPills(items, limit = 3, className = "dest-page__pills") {
  if (!items?.length) return "";
  return `
    <ul class="${className}" aria-label="Highlights">
      ${items.slice(0, limit).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ul>
  `;
}

function renderDescriptions(dest) {
  const paragraphs = dest.descriptions?.length ? dest.descriptions : [dest.description];
  return paragraphs
    .filter(Boolean)
    .map((p, i) =>
      i === 0
        ? `<p class="dest-page__lead">${escapeHtml(p)}</p>`
        : `<p class="dest-page__text">${escapeHtml(p)}</p>`
    )
    .join("");
}

function renderPhotoGrid(photos) {
  if (!photos.length) return "";

  return `
    <div class="dest-page__photo-grid">
      ${photos
        .map(
          (img, i) => `
            <button type="button" class="dest-page__photo" data-reveal data-lightbox-index="${i}" aria-label="View photo ${i + 1}"${i % 3 ? ` data-reveal-delay="${i % 3}"` : ""}>
              <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy" decoding="async" width="480" height="320" />
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderRelatedCards(related) {
  return related
    .map(
      (dest) => `
        <article class="dest-card dest-card--b dest-card--teaser dest-card--related" data-reveal>
          <div class="dest-card__cinema dest-card__cinema--related" data-slideshow data-interval="5000">
            <div class="dest-slideshow__track dest-slideshow__track--cinema">
              ${renderGallerySlides(dest.images, dest)}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            <div class="dest-card__cinema-caption">
              <span class="dest-card__script">${escapeHtml(dest.scriptLabel)}</span>
              <h3 class="dest-card__name">${escapeHtml(dest.name)}</h3>
            </div>
            <div class="dest-slideshow__filmstrip" role="tablist" aria-label="Slideshow images">
              ${dest.images
                .map(
                  (_, i) =>
                    `<button type="button" class="dest-slideshow__frame-mark ${i === 0 ? "is-active" : ""}" data-slide-dot aria-label="Show image ${i + 1}"></button>`
                )
                .join("")}
            </div>
          </div>
          <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${destinationPageUrl(dest)}">
            ${renderHighlightPills(dest.highlights, 2, "dest-card__tags")}
            <span class="dest-card__link">Explore ${escapeHtml(dest.name)} →</span>
          </a>
        </article>
      `
    )
    .join("");
}

export function renderDestinationPage(containerSelector, dest) {
  const container = document.querySelector(containerSelector);
  if (!container || !dest) return false;

  const photos = getPagePhotos(dest);
  const heroPhoto = photos[0];
  const related = getRelatedDestinations(dest.id, 3);

  document.title = `${dest.fullName} | Matembo Safari & Tours`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", dest.description);

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
          <p class="dest-page__eyebrow">${escapeHtml(dest.circuitLabel)} · ${escapeHtml(dest.region)}</p>
          <h1 class="dest-page__title">${escapeHtml(dest.fullName)}</h1>
          <p class="dest-page__script">${escapeHtml(dest.scriptLabel)}</p>
          ${renderHighlightPills(dest.highlights)}
          <div class="dest-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Plan Your Safari</a>
            <a href="/destinations.html" class="btn btn--secondary btn--ghost-light">All Destinations</a>
          </div>
        </div>
      </header>

      <section class="dest-page__gallery-band" aria-labelledby="gallery-title">
        <div class="container">
          <div class="dest-page__gallery-head section-reveal">
            <h2 id="gallery-title" class="dest-page__section-title">In pictures</h2>
          </div>
          ${renderPhotoGrid(photos)}
        </div>
      </section>

      <section class="dest-page__content">
        <div class="container">
          <aside class="dest-page__plan-bar section-reveal" aria-label="Plan your visit">
            <div class="dest-page__plan-bar-copy">
              <p class="dest-page__plan-bar-label">Good to know</p>
              <p class="dest-page__plan-bar-text">
                Best season <strong>${escapeHtml(dest.bestSeason)}</strong>
              </p>
            </div>
            <div class="dest-page__plan-bar-actions">
              <a href="/contact.html" class="btn btn--primary">Plan This Destination</a>
              <a href="/destinations.html" class="dest-page__aside-link">All destinations</a>
            </div>
          </aside>

          <div class="dest-page__main section-reveal">
            <h2 class="dest-page__section-title">About ${escapeHtml(dest.name)}</h2>
            <div class="dest-page__copy">${renderDescriptions(dest)}</div>
          </div>
        </div>
      </section>

      <section class="dest-page__related" aria-labelledby="related-title">
        <div class="container">
          <div class="dest-page__related-head section-reveal">
            <h2 id="related-title" class="dest-page__section-title">You may also like</h2>
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

export function renderDestinationNotFound(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <div class="container dest-page-empty">
      <h1 class="dest-page__title">Destination not found</h1>
      <p class="dest-page__text">Browse our <a href="/destinations.html">Northern Circuit destinations</a>.</p>
    </div>
  `;
}
