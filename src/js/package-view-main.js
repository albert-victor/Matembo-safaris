import { resolvePackageDetail } from "../data/package-detail-demo.js";
import { initSlideshows } from "./slideshow.js";
import { initScrollReveal } from "./scroll-reveal.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function getPackageFromUrl() {
  const id = new URLSearchParams(window.location.search).get("id");
  return resolvePackageDetail(id);
}

function scriptLabelFor(pkg) {
  return pkg.safariType || pkg.circuit || "Safari Package";
}

function renderGallerySlides(images, extraClass = "", fallback) {
  if (!images?.length) {
    return `
      <div class="pkg-slideshow__slide ${extraClass} is-active" data-slide>
        <img src="${escapeHtml(fallback?.src)}" alt="${escapeHtml(fallback?.alt)}" width="1200" height="700" loading="eager" decoding="async" />
      </div>
    `;
  }

  return images
    .map(
      (img, i) => `
        <div class="pkg-slideshow__slide ${extraClass} ${i === 0 ? "is-active" : ""}" data-slide>
          <img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" width="1200" height="700" loading="${i === 0 ? "eager" : "lazy"}" decoding="async" />
        </div>
      `
    )
    .join("");
}

function renderDots(count) {
  const total = Math.max(count, 1);
  return Array.from(
    { length: total },
    (_, i) =>
      `<button type="button" class="dest-slideshow__dot ${i === 0 ? "is-active" : ""}" data-slide-dot aria-label="Slide ${i + 1}"></button>`
  ).join("");
}

function renderItinerary(items) {
  if (!items?.length) {
    return `<p class="pkg-section__text">Day-by-day routing is available on enquiry. Share your dates and we will confirm lodges, drives, and park order for this package.</p>`;
  }

  return items
    .map(
      (day, i) => `
        <details class="pkg-itinerary__day" ${i === 0 ? "open" : ""}>
          <summary class="pkg-itinerary__summary">
            <span class="pkg-itinerary__day-label">${escapeHtml(day.day)}</span>
            <span class="pkg-itinerary__day-title">${escapeHtml(day.title)}</span>
          </summary>
          <p class="pkg-itinerary__text">${escapeHtml(day.summary)}</p>
        </details>
      `
    )
    .join("");
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

function renderViewA(pkg) {
  const root = document.querySelector("#package-view-a");
  if (!root) return;

  const gallery = pkg.gallery?.length ? pkg.gallery : [{ src: pkg.image, alt: pkg.alt || pkg.title }];
  const badge = pkg.badge
    ? `<span class="pkg-sidebar-card__badge">${escapeHtml(pkg.badge)}</span>`
    : "";

  root.innerHTML = `
    <div class="pkg-view-a">
      <header class="pkg-view-a__head">
        <span class="dest-card__script dest-card__script--on-light">${escapeHtml(scriptLabelFor(pkg))}</span>
        <h2 class="pkg-view-a__head-title">${escapeHtml(pkg.title)}</h2>
        <p class="pkg-view-a__head-meta">${escapeHtml(pkg.circuit)} · ${escapeHtml(pkg.duration)}</p>
      </header>

      <div class="pkg-gallery-compact" data-slideshow data-interval="6000">
        <div class="dest-slideshow__track dest-slideshow__track--mini">
          ${renderGallerySlides(gallery, "dest-slideshow__slide--motion", { src: pkg.image, alt: pkg.alt || pkg.title })}
        </div>
        <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
        <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
        <div class="dest-slideshow__dots dest-slideshow__dots--compact">${renderDots(gallery.length)}</div>
      </div>

      <div class="pkg-view-a__layout">
        <main class="pkg-view-a__main">
          <section class="pkg-section pkg-section--itinerary">
            <h3 class="pkg-section__title">Day-by-Day Itinerary</h3>
            <div class="pkg-itinerary pkg-itinerary--expanded">${renderItinerary(pkg.itinerary)}</div>
          </section>

          <section class="pkg-section">
            <h3 class="pkg-section__title">Overview</h3>
            <p class="pkg-section__text pkg-section__text--lead">${escapeHtml(pkg.overview)}</p>
          </section>

          <section class="pkg-section">
            <h3 class="pkg-section__title">Highlights</h3>
            <ul class="pkg-list">${renderList(pkg.highlights, "pkg-list__item")}</ul>
          </section>

          <section class="pkg-section pkg-section--split">
            <div>
              <h3 class="pkg-section__title">Included</h3>
              <ul class="pkg-list">${renderList(pkg.inclusions, "pkg-list__item")}</ul>
            </div>
            <div>
              <h3 class="pkg-section__title">Not Included</h3>
              <ul class="pkg-list">${renderList(pkg.exclusions, "pkg-list__item")}</ul>
            </div>
          </section>
        </main>

        <aside class="pkg-view-a__sidebar">
          <div class="pkg-sidebar-card">
            ${badge}
            <h3 class="pkg-sidebar-card__title">${escapeHtml(pkg.title)}</h3>
            <p class="pkg-sidebar-card__duration">${escapeHtml(pkg.duration)}</p>
            <div class="pkg-facts">${renderQuickFacts(pkg.quickFacts)}</div>
            <div class="pkg-sidebar-card__actions">
              <a href="/contact.html" class="btn btn--primary">Plan This Safari</a>
              <a href="/destinations.html" class="btn btn--secondary">Browse Destinations</a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderViewB(pkg) {
  const root = document.querySelector("#package-view-b");
  if (!root) return;

  const gallery = pkg.gallery?.length ? pkg.gallery : [{ src: pkg.image, alt: pkg.alt || pkg.title }];

  root.innerHTML = `
    <div class="pkg-view-b">
      <header class="pkg-view-b__header">
        <span class="dest-card__script dest-card__script--on-light">${escapeHtml(scriptLabelFor(pkg))}</span>
        <h2 class="pkg-view-b__title">${escapeHtml(pkg.title)}</h2>
        <p class="pkg-view-b__meta">${escapeHtml(pkg.circuit)} · ${escapeHtml(pkg.duration)}</p>
      </header>

      <div class="pkg-tabs" data-tabs>
        <div class="pkg-tabs__nav" role="tablist">
          <button type="button" class="pkg-tabs__btn is-active" role="tab" aria-selected="true" data-tab="overview">Overview</button>
          <button type="button" class="pkg-tabs__btn" role="tab" aria-selected="false" data-tab="itinerary">Itinerary</button>
          <button type="button" class="pkg-tabs__btn" role="tab" aria-selected="false" data-tab="gallery">Gallery</button>
        </div>

        <div class="pkg-tabs__panel is-active" data-panel="overview">
          <div class="pkg-gallery-compact pkg-gallery-compact--inline" data-slideshow data-interval="5500">
            <div class="dest-slideshow__track dest-slideshow__track--mini">
              ${renderGallerySlides(gallery, "dest-slideshow__slide--motion", { src: pkg.image, alt: pkg.alt || pkg.title })}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-slideshow__dots dest-slideshow__dots--compact">${renderDots(gallery.length)}</div>
          </div>
          <p class="pkg-section__text pkg-section__text--lead">${escapeHtml(pkg.overview)}</p>
          <ul class="pkg-list">${renderList(pkg.highlights, "pkg-list__item")}</ul>
        </div>

        <div class="pkg-tabs__panel" data-panel="itinerary">
          <div class="pkg-itinerary pkg-itinerary--timeline">${renderItinerary(pkg.itinerary)}</div>
        </div>

        <div class="pkg-tabs__panel" data-panel="gallery">
          <div class="pkg-gallery-grid">
            ${gallery
              .map(
                (img) =>
                  `<figure class="pkg-gallery-grid__item"><img src="${escapeHtml(img.src)}" alt="${escapeHtml(img.alt)}" loading="lazy" width="600" height="400" /></figure>`
              )
              .join("")}
          </div>
        </div>
      </div>

      <div class="pkg-view-b__cta">
        <a href="/contact.html" class="btn btn--primary">Plan This Safari</a>
        <a href="/destinations.html" class="btn btn--secondary">Browse Destinations</a>
      </div>
    </div>
  `;
}

function initTabs() {
  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = tabs.querySelectorAll("[data-tab]");
    const panels = tabs.querySelectorAll("[data-panel]");

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.tab;
        buttons.forEach((b) => {
          b.classList.toggle("is-active", b === btn);
          b.setAttribute("aria-selected", b === btn ? "true" : "false");
        });
        panels.forEach((p) => {
          p.classList.toggle("is-active", p.dataset.panel === id);
        });
      });
    });
  });
}

function init() {
  try {
    const pkg = getPackageFromUrl();
    document.title = `${pkg.title} | Matembo Safari & Tours`;

    renderViewA(pkg);
    renderViewB(pkg);
    initSlideshows();
    initTabs();
  } catch (error) {
    console.error("Matembo package view init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
