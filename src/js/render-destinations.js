import {
  northernCircuitDestinations,
} from "../data/northern-circuit-destinations.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function destinationHref(dest) {
  return `/destinations/${encodeURIComponent(dest.id)}.html`;
}

function renderSlides(images, motionClass = "") {
  return images
    .map(
      (img, i) => `
        <div class="dest-slideshow__slide ${motionClass} ${i === 0 ? "is-active" : ""}" data-slide>
          <img
            src="${escapeHtml(img.src)}"
            alt="${escapeHtml(img.alt)}"
            width="640"
            height="400"
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
      `<button type="button" class="dest-slideshow__dot ${i === 0 ? "is-active" : ""}" data-slide-dot aria-label="Show image ${i + 1}" aria-selected="${i === 0 ? "true" : "false"}"></button>`
  ).join("");
}

function renderHighlights(items) {
  return items
    .map((item) => `<li class="dest-card__highlight">${escapeHtml(item)}</li>`)
    .join("");
}

function renderJourneys(dest) {
  if (!dest.journeys) return "";
  return `<p class="dest-card__journeys">${escapeHtml(dest.journeys)}</p>`;
}

/* Style A – Expedition craft (matches package cards) */
function renderStyleA(dest, index) {
  const delay = index % 3;
  const badge = dest.bestSeason
    ? `<span class="dest-card__season">${escapeHtml(dest.bestSeason)}</span>`
    : "";

  return `
    <article class="dest-card dest-card--a" id="${escapeHtml(dest.id)}" data-reveal ${delay ? `data-reveal-delay="${delay}"` : ""}>
      <div class="dest-card__frame" data-tilt>
        <div class="dest-card__inner">
          <span class="dest-card__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>

          <div class="dest-card__media" data-slideshow data-interval="4500">
            <span class="dest-card__bracket dest-card__bracket--tl" aria-hidden="true"></span>
            <span class="dest-card__bracket dest-card__bracket--br" aria-hidden="true"></span>
            <div class="dest-slideshow__track">
              ${renderSlides(dest.images, "dest-slideshow__slide--motion")}
            </div>
            <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
            <div class="dest-card__overlay dest-card__overlay--green" aria-hidden="true"></div>
            ${badge}
            <div class="dest-card__caption">
              <span class="dest-card__script">${escapeHtml(dest.scriptLabel)}</span>
              <h3 class="dest-card__name">${escapeHtml(dest.name)}</h3>
            </div>
            <div class="dest-slideshow__controls" aria-label="Image slideshow controls">
              <button type="button" class="dest-slideshow__arrow" data-slide-prev aria-label="Previous image">‹</button>
              <div class="dest-slideshow__dots">${renderDots(dest.images.length)}</div>
              <button type="button" class="dest-slideshow__arrow" data-slide-next aria-label="Next image">›</button>
            </div>
          </div>

          <div class="dest-card__perforation" aria-hidden="true"></div>

          <div class="dest-card__body">
            <p class="dest-card__region">${escapeHtml(dest.region)}${dest.circuitLabel ? ` · ${escapeHtml(dest.circuitLabel)}` : ""}</p>
            ${renderJourneys(dest)}
            <p class="dest-card__tagline">${escapeHtml(dest.tagline)}</p>
            <ul class="dest-card__highlights">${renderHighlights(dest.highlights)}</ul>
            <div class="dest-card__actions">
              <a href="${destinationHref(dest)}" class="btn btn--primary btn--card">Explore ${escapeHtml(dest.name)}</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

/* Style B – Cinematic strip (teaser cards for listings) */
function renderStyleB(dest, index) {
  const delay = index % 3;
  const tags = dest.highlights?.slice(0, 3) || [];

  return `
    <article class="dest-card dest-card--b dest-card--teaser" id="${escapeHtml(dest.id)}" data-reveal ${delay ? `data-reveal-delay="${delay}"` : ""}>
      <div class="dest-card__cinema" data-slideshow data-interval="5200">
        <div class="dest-slideshow__track dest-slideshow__track--cinema">
          ${renderSlides(dest.images)}
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

      <a class="dest-card__cinema-body dest-card__cinema-body--teaser" href="${destinationHref(dest)}">
        ${
          tags.length
            ? `<ul class="dest-card__tags">${tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
            : ""
        }
        <span class="dest-card__link">Explore ${escapeHtml(dest.name)} →</span>
      </a>
    </article>
  `;
}

/* Style C – Atlas compass compact */
function renderStyleC(dest, index) {
  const delay = index % 3;

  return `
    <article class="dest-card dest-card--c" id="${escapeHtml(dest.id)}" data-reveal ${delay ? `data-reveal-delay="${delay}"` : ""}>
      <div class="dest-card__atlas">
        <div class="dest-card__atlas-media" data-slideshow data-interval="6000">
          <div class="dest-slideshow__track">
            ${renderSlides(dest.images, "dest-slideshow__slide--motion")}
          </div>
          <div class="dest-card__overlay dest-card__overlay--gold" aria-hidden="true"></div>
          <div class="dest-card__compass" aria-hidden="true">✦</div>
          <div class="dest-slideshow__dots dest-slideshow__dots--compact">${renderDots(dest.images.length)}</div>
        </div>

        <div class="dest-card__atlas-body">
          <span class="dest-card__script dest-card__script--small">${escapeHtml(dest.scriptLabel)}</span>
          <h3 class="dest-card__name dest-card__name--compact">${escapeHtml(dest.name)}</h3>
          <p class="dest-card__meta-line">${escapeHtml(dest.region)} · ${escapeHtml(dest.bestSeason)}</p>
          <p class="dest-card__tagline dest-card__tagline--compact">${escapeHtml(dest.highlights[0] || dest.tagline)}</p>
          <div class="dest-card__actions dest-card__actions--single">
            <a href="${destinationHref(dest)}" class="btn btn--primary btn--card">Explore ${escapeHtml(dest.name)}</a>
          </div>
        </div>
      </div>
    </article>
  `;
}

export function renderDestinationCards(containerSelector, style = "a", options = {}) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  const { ids, destinations: customDestinations } = options;
  let destinations = customDestinations || northernCircuitDestinations;

  if (ids?.length) {
    destinations = ids
      .map((id) => destinations.find((dest) => dest.id === id))
      .filter(Boolean);
  }

  const renderers = { a: renderStyleA, b: renderStyleB, c: renderStyleC };
  const render = renderers[style] || renderStyleA;

  container.innerHTML = destinations.map(render).join("");
}
