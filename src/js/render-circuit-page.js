import { getCircuitById, getAllCircuitsPageData } from "../data/circuits-page-data.js";
import { getDestinationsByCircuit } from "../data/all-destinations.js";
import { renderDestinationCards } from "./render-destinations.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function renderOtherCircuits(currentId) {
  return getAllCircuitsPageData()
    .filter((c) => c.id !== currentId)
    .slice(0, 4)
    .map(
      (circuit) => `
        <a class="circuit-teaser" href="${escapeHtml(circuit.pageHref)}" data-reveal>
          <span class="circuit-teaser__thumb">
            <img src="${escapeHtml(circuit.hero.src)}" alt="" loading="lazy" width="120" height="80" />
          </span>
          <span class="circuit-teaser__text">
            <span class="circuit-teaser__name">${escapeHtml(circuit.name)}</span>
            <span class="circuit-teaser__script">${escapeHtml(circuit.script)}</span>
          </span>
        </a>
      `
    )
    .join("");
}

export function renderCircuitNotFound(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = `
    <section class="circuit-page__empty">
      <div class="container">
        <h1>Circuit not found</h1>
        <p>That circuit page does not exist.</p>
        <a href="/circuits.html" class="btn btn--primary">All Circuits</a>
      </div>
    </section>
  `;
}

export function renderCircuitPage(containerSelector, circuitId) {
  const container = document.querySelector(containerSelector);
  const circuit = getCircuitById(circuitId);

  if (!container || !circuit) return false;

  document.title = `${circuit.name} | Matembo Safari & Tours`;

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.setAttribute("content", circuit.lead);

  container.innerHTML = `
    <article class="circuit-page">
      <header class="circuit-page__hero" data-hero>
        <div class="circuit-page__hero-media">
          <img
            src="${escapeHtml(circuit.hero.src)}"
            alt="${escapeHtml(circuit.hero.alt)}"
            width="1600"
            height="680"
            loading="eager"
            decoding="async"
          />
          <div class="circuit-page__hero-shade" aria-hidden="true"></div>
        </div>
        <div class="container circuit-page__hero-inner section-reveal">
          <p class="circuit-page__eyebrow">Tanzania Circuit</p>
          <h1 class="circuit-page__title">${escapeHtml(circuit.name)}</h1>
          <p class="circuit-page__script">${escapeHtml(circuit.script)}</p>
          <ul class="circuit-page__stats" aria-label="Circuit overview">
            <li><strong>${circuit.destinationCount}</strong> destinations</li>
            ${
              circuit.safariCount
                ? `<li><strong>${circuit.safariCount}</strong> safari packages</li>`
                : ""
            }
          </ul>
          <div class="circuit-page__hero-actions">
            <a href="${escapeHtml(circuit.safarisHref)}" class="btn btn--on-media">Safaris in this circuit</a>
            <a href="/circuits.html" class="btn btn--secondary btn--ghost-light">All Circuits</a>
          </div>
        </div>
      </header>

      <section class="circuit-page__intro">
        <div class="container circuit-page__intro-inner section-reveal">
          <p class="circuit-page__intro-lead">${escapeHtml(circuit.lead)}</p>
          <p class="circuit-page__intro-text">${escapeHtml(circuit.description)}</p>
        </div>
      </section>

      <section class="circuit-page__destinations" aria-labelledby="circuit-destinations-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">Destinations</span>
            <h2 id="circuit-destinations-title" class="home-section__title">Parks & places</h2>
            <p class="home-section__desc">Explore every destination in the ${escapeHtml(circuit.name)}.</p>
          </header>
          <div id="circuit-destinations-grid" class="dest-cards-grid dest-cards-grid--b"></div>
        </div>
      </section>

      ${
        circuit.safariCount
          ? `
      <section class="circuit-page__safaris-cta section-reveal">
        <div class="container circuit-page__safaris-inner">
          <div class="circuit-page__safaris-copy">
            <span class="home-section__label">Safari Packages</span>
            <h2 class="home-section__title">${circuit.safariCount} routes in ${escapeHtml(circuit.name)}</h2>
            <p class="home-section__desc">Real itineraries with day-by-day plans – ready to tailor from Iringa.</p>
          </div>
          <a href="${escapeHtml(circuit.safarisHref)}" class="btn btn--primary">View ${escapeHtml(circuit.name)} Safaris</a>
        </div>
      </section>
      `
          : ""
      }

      <section class="circuit-page__related" aria-labelledby="other-circuits-title">
        <div class="container">
          <header class="home-section__header section-reveal">
            <span class="home-section__label">More circuits</span>
            <h2 id="other-circuits-title" class="home-section__title">Explore elsewhere</h2>
          </header>
          <div class="circuit-page__related-grid">${renderOtherCircuits(circuit.id)}</div>
        </div>
      </section>
    </article>
  `;

  renderDestinationCards("#circuit-destinations-grid", "b", {
    destinations: getDestinationsByCircuit(circuitId),
  });

  return true;
}

export { getCircuitById };
