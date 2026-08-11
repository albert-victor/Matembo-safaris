import { getAllCircuitsPageData, allCircuitsPageMeta } from "../data/circuits-page-data.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function renderCircuitCard(circuit, index) {
  const delay = index % 3;
  return `
    <article class="circuit-card" data-reveal ${delay ? `data-reveal-delay="${delay}"` : ""}>
      <a class="circuit-card__link" href="${escapeHtml(circuit.pageHref)}">
        <span class="circuit-card__media">
          <img
            data-src="${escapeHtml(circuit.hero.src)}"
            data-img-preset="card"
            src=""
            alt="${escapeHtml(circuit.hero.alt)}"
            width="640"
            height="400"
            loading="lazy"
            decoding="async"
          />
          <span class="circuit-card__shade" aria-hidden="true"></span>
        </span>
        <span class="circuit-card__body">
          <span class="circuit-card__label">${escapeHtml(circuit.name)}</span>
          <span class="circuit-card__script">${escapeHtml(circuit.script)}</span>
          <p class="circuit-card__desc">${escapeHtml(circuit.lead)}</p>
          <span class="circuit-card__meta">
            ${circuit.destinationCount} destinations
            ${circuit.safariCount ? ` · ${circuit.safariCount} safaris` : ""}
          </span>
          <span class="circuit-card__cta">Explore circuit →</span>
        </span>
      </a>
    </article>
  `;
}

export function renderAllCircuitsPage() {
  const circuits = getAllCircuitsPageData();
  const meta = allCircuitsPageMeta;

  document.title = `${meta.title} | Matembo Safari & Tours`;

  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", meta.lead);

  const heroRoot = document.querySelector("#circuits-hero-root");
  const gridRoot = document.querySelector("#circuits-grid-root");

  if (heroRoot) {
    heroRoot.innerHTML = `
      <header class="circuit-page__hero circuit-page__hero--index" data-hero>
        <div class="circuit-page__hero-media">
          <img
            data-src="${escapeHtml(meta.hero.src)}"
            data-img-preset="hero"
            src=""
            alt="${escapeHtml(meta.hero.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="circuit-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container circuit-page__hero-inner section-reveal">
          <p class="circuit-page__eyebrow">Matembo Safari & Tours</p>
          <h1 class="circuit-page__title">${escapeHtml(meta.title)}</h1>
          <p class="circuit-page__script">${escapeHtml(meta.script)}</p>
          <p class="circuit-page__lead">${escapeHtml(meta.lead)}</p>
          <div class="circuit-page__hero-actions">
            <a href="#circuits-grid" class="btn btn--on-media">Browse Circuits</a>
            <a href="/destinations.html" class="btn btn--secondary btn--ghost-light">All Destinations</a>
          </div>
        </div>
      </header>
    `;
  }

  if (gridRoot) {
    gridRoot.innerHTML = circuits.map(renderCircuitCard).join("");
  }
}
