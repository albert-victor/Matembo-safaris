import { getSafariPackageById, safariPackages } from "../data/all-safari-packages.js";
import {
  splitIntoParagraphs,
  extractActivitySections,
  packagePhotos,
} from "./content-utils.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

export function packagePageUrl(pkg) {
  const id = typeof pkg === "string" ? pkg : pkg.id;
  return `/packages/${encodeURIComponent(id)}.html`;
}

export { getSafariPackageById };

function scriptLabelFor(pkg) {
  return pkg.safariType || pkg.circuit || "Safari Package";
}

function renderOverview(pkg) {
  const paragraphs = splitIntoParagraphs(pkg.overview);
  const activitySections = extractActivitySections(pkg.overview, pkg.activities);

  const introHtml = paragraphs
    .slice(0, 3)
    .map((p, i) =>
      i === 0
        ? `<p class="pkg-section__text pkg-section__text--lead">${escapeHtml(p)}</p>`
        : `<p class="pkg-section__text">${escapeHtml(p)}</p>`
    )
    .join("");

  const activitiesHtml =
    activitySections.length > 0
      ? `
        <div class="pkg-activities">
          <h3 class="pkg-activities__title">What you can do</h3>
          <div class="pkg-activities__grid">
            ${activitySections
              .map(
                (item) => `
                  <article class="pkg-activity-card">
                    <h4 class="pkg-activity-card__title">${escapeHtml(item.title)}</h4>
                    ${
                      item.body
                        ? `<p class="pkg-activity-card__text">${escapeHtml(item.body)}</p>`
                        : ""
                    }
                  </article>
                `
              )
              .join("")}
          </div>
        </div>
      `
      : pkg.activities?.length
        ? `
        <div class="pkg-activities">
          <h3 class="pkg-activities__title">Activities</h3>
          <ul class="pkg-activity-tags">
            ${pkg.activities.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
        </div>
      `
        : "";

  return `${introHtml}${activitiesHtml}`;
}

function renderItinerary(items) {
  if (!items?.length) {
    return `<p class="pkg-section__text">Share your travel dates and we will confirm the day-by-day route, lodges, and park order for this safari.</p>`;
  }

  return `
    <ol class="pkg-itinerary-timeline">
      ${items
        .map(
          (day, i) => `
            <li class="pkg-itinerary-timeline__item">
              <div class="pkg-itinerary-timeline__marker" aria-hidden="true">
                <span class="pkg-itinerary-timeline__dot"></span>
                ${i < items.length - 1 ? `<span class="pkg-itinerary-timeline__line"></span>` : ""}
              </div>
              <article class="pkg-itinerary-timeline__card">
                <header class="pkg-itinerary-timeline__head">
                  <span class="pkg-itinerary-timeline__day">${escapeHtml(day.day)}</span>
                  <h3 class="pkg-itinerary-timeline__title">${escapeHtml(day.title)}</h3>
                </header>
                <p class="pkg-itinerary-timeline__text">${escapeHtml(day.summary)}</p>
              </article>
            </li>
          `
        )
        .join("")}
    </ol>
  `;
}

function renderList(items, className) {
  return (items ?? []).map((item) => `<li class="${className}">${escapeHtml(item)}</li>`).join("");
}

function renderQuickFacts(facts) {
  return (facts ?? [])
    .map(
      (f) => `
        <div class="pkg-facts__item">
          <span class="pkg-facts__label">${escapeHtml(f.label)}</span>
          <span class="pkg-facts__value">${escapeHtml(f.value)}</span>
        </div>
      `
    )
    .join("");
}

function renderExtraPhotos(photos) {
  if (!photos.length) return "";

  return `
    <section class="pkg-page__extras" aria-label="Additional photos">
      <div class="container">
        <div class="pkg-page__extras-grid">
          ${photos
            .map(
              (img) => `
                <figure class="pkg-page__extra-photo">
                  <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy" decoding="async" width="480" height="320" />
                </figure>
              `
            )
            .join("")}
        </div>
      </div>
    </section>
  `;
}

export function getRelatedPackages(currentId, count = 3) {
  const current = getSafariPackageById(currentId);
  const circuit = current?.circuit;
  const pool = safariPackages.filter((pkg) => pkg.id !== currentId);
  const sameCircuit = pool.filter((pkg) => pkg.circuit === circuit);
  const mixed = [...sameCircuit, ...pool.filter((pkg) => pkg.circuit !== circuit)];
  return mixed.slice(0, count);
}

export function renderPackagePage(containerSelector, pkg) {
  const container = document.querySelector(containerSelector);
  if (!container || !pkg) return false;

  const { hero, extras } = packagePhotos(pkg, 3);
  const related = getRelatedPackages(pkg.id, 3);

  document.title = `${pkg.title} | Matembo Safari & Tours`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute(
      "content",
      splitIntoParagraphs(pkg.overview)[0]?.slice(0, 155) ||
        `${pkg.title} – ${pkg.duration} safari with Matembo Safari & Tours.`
    );
  }

  container.innerHTML = `
    <article class="pkg-page">
      <header class="pkg-page__hero">
        <div class="pkg-page__hero-media">
          <img src="${escapeHtml(hero.src)}" alt="${escapeHtml(hero.alt)}" width="1920" height="820" loading="eager" decoding="async" fetchpriority="high" />
          <div class="pkg-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container pkg-page__hero-inner">
          <p class="pkg-page__eyebrow">${escapeHtml(pkg.circuit)} · ${escapeHtml(pkg.duration)}</p>
          <h1 class="pkg-page__title">${escapeHtml(pkg.title)}</h1>
          <p class="pkg-page__script">${escapeHtml(scriptLabelFor(pkg))}</p>
          ${
            pkg.priceLabel && !pkg.priceOnRequest
              ? `<p class="pkg-page__price-stamp" aria-label="Price">${escapeHtml(pkg.priceLabel)}</p>`
              : pkg.priceOnRequest
                ? `<p class="pkg-page__price-stamp pkg-page__price-stamp--on-request">Price on request</p>`
                : ""
          }
          ${
            pkg.badge
              ? `<span class="pkg-page__badge">${escapeHtml(pkg.badge)}</span>`
              : ""
          }
          <ul class="pkg-page__pills" aria-label="Highlights">
            ${pkg.highlights.slice(0, 3).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
          </ul>
          <div class="pkg-page__hero-actions">
            <a href="/contact.html" class="btn btn--on-media">Enquire</a>
            <a href="/safaris.html" class="btn btn--secondary btn--ghost-light">All Safaris</a>
          </div>
        </div>
      </header>

      ${renderExtraPhotos(extras)}

      <section class="pkg-page__content">
        <div class="container pkg-page__layout">
          <main class="pkg-page__main section-reveal">
            <section class="pkg-section">
              <h2 class="pkg-section__title">Overview</h2>
              <div class="pkg-prose">${renderOverview(pkg)}</div>
            </section>

            <section class="pkg-section">
              <h2 class="pkg-section__title">Highlights</h2>
              <ul class="pkg-list">${renderList(pkg.highlights, "pkg-list__item")}</ul>
            </section>

            <section class="pkg-section pkg-section--itinerary">
              <h2 class="pkg-section__title">Day-by-Day Itinerary</h2>
              ${renderItinerary(pkg.itinerary)}
            </section>

            <section class="pkg-section pkg-section--split">
              <div>
                <h2 class="pkg-section__title">Included</h2>
                <ul class="pkg-list">${renderList(pkg.inclusions, "pkg-list__item")}</ul>
              </div>
              <div>
                <h2 class="pkg-section__title">Not Included</h2>
                <ul class="pkg-list">${renderList(pkg.exclusions, "pkg-list__item")}</ul>
              </div>
            </section>
          </main>

          <aside class="pkg-page__sidebar section-reveal">
            <div class="pkg-sidebar-card">
              <h2 class="pkg-sidebar-card__title">${escapeHtml(pkg.title)}</h2>
              ${
                pkg.priceLabel
                  ? `<div class="pkg-sidebar-card__price-box${
                      pkg.priceOnRequest ? " pkg-sidebar-card__price-box--on-request" : ""
                    }">
                      <span class="pkg-sidebar-card__price-label">${
                        pkg.priceOnRequest ? "Tailor-made quote" : "Indicative price"
                      }</span>
                      <p class="pkg-sidebar-card__price">${escapeHtml(pkg.priceLabel)}</p>
                      <span class="pkg-sidebar-card__price-note">Per person · private safari</span>
                    </div>`
                  : ""
              }
              <p class="pkg-sidebar-card__duration">${escapeHtml(pkg.duration)}</p>
              <div class="pkg-facts">${renderQuickFacts(pkg.quickFacts)}</div>
              <div class="pkg-sidebar-card__actions">
                <a href="/contact.html" class="btn btn--primary">Enquire</a>
                <a href="/safaris.html" class="btn btn--secondary">Browse Safaris</a>
              </div>
            </div>
          </aside>
        </div>
      </section>

      ${
        related.length
          ? `
        <section class="pkg-page__related" aria-labelledby="related-safaris-title">
          <div class="container">
            <h2 id="related-safaris-title" class="pkg-section__title section-reveal">You may also like</h2>
            <div class="pkg-page__related-grid">
              ${related
                .map(
                  (item) => `
                <a class="pkg-page__related-card section-reveal" href="${packagePageUrl(item)}">
                  <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.alt || item.title)}" loading="lazy" width="400" height="260" />
                  <span class="pkg-page__related-body">
                    <span class="pkg-page__related-meta">${escapeHtml(item.duration)}</span>
                    <span class="pkg-page__related-title">${escapeHtml(item.title)}</span>
                  </span>
                </a>
              `
                )
                .join("")}
            </div>
          </div>
        </section>
      `
          : ""
      }
    </article>
  `;

  return true;
}

export function renderPackageNotFound(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <div class="container pkg-page-empty">
      <h1 class="pkg-page__title">Safari package not found</h1>
      <p class="pkg-section__text">Browse our <a href="/safaris.html">safari packages</a> or <a href="/contact.html">send an enquiry</a>.</p>
    </div>
  `;
}
