import { bcardData } from "../data/bcard-data.js";
import { escapeHtml } from "./content-utils.js";

function renderAction(item) {
  const icon = `<span class="bcard-action__icon"><i class="${escapeHtml(item.icon)}" aria-hidden="true"></i></span>`;
  const hint = item.hint
    ? `<span class="bcard-action__hint">${escapeHtml(item.hint)}</span>`
    : "";
  const label = `<span class="bcard-action__copy"><span class="bcard-action__label">${escapeHtml(item.label)}</span>${hint}</span>`;
  const chevron = `<span class="bcard-action__chev" aria-hidden="true"><i class="fas fa-chevron-right"></i></span>`;
  const accentClass = item.accent ? ` bcard-action--${item.accent}` : "";
  const classes = `bcard-action${item.primary ? " bcard-action--primary" : ""}${accentClass}`;

  if (item.action === "save-contact") {
    return `
      <button type="button" class="${classes}" data-save-contact>
        ${icon}${label}${chevron}
      </button>`;
  }

  const external = item.external ? ' target="_blank" rel="noopener noreferrer"' : "";
  return `
    <a class="${classes}" href="${escapeHtml(item.href)}"${external}>
      ${icon}${label}${chevron}
    </a>`;
}

function renderSocialLinks(links) {
  return links
    .map(
      (link) => `
      <a
        class="bcard-social__link${link.variant ? ` bcard-social__link--${link.variant}` : ""}"
        href="${escapeHtml(link.href)}"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="${escapeHtml(link.label)}"
        title="${escapeHtml(link.label)}"
      >
        <i class="${escapeHtml(link.icon)}" aria-hidden="true"></i>
      </a>`
    )
    .join("");
}

export function renderBcardPage() {
  const root = document.getElementById("bcard-root");
  if (!root) return;

  const d = bcardData;

  root.innerHTML = `
        <article class="bcard-glass" aria-label="Matembo Safari & Tours connect page">
          <div class="bcard-glass__kanga" aria-hidden="true"></div>
          <div class="bcard-glass__pattern" aria-hidden="true"></div>
          <span class="bcard-glass__corner bcard-glass__corner--tl" aria-hidden="true"></span>
          <span class="bcard-glass__corner bcard-glass__corner--br" aria-hidden="true"></span>

          <header class="bcard-head">
            <a class="bcard-head__logo-link" href="/" aria-label="Matembo Safari home">
              <img
                class="bcard-head__logo"
                src="${escapeHtml(d.emblem)}"
                alt=""
                width="64"
                height="64"
                decoding="async"
              />
            </a>
            <p class="bcard-head__eyebrow">Digital business card</p>
            <h1 class="bcard-head__title">${escapeHtml(d.name)}</h1>
            <p class="bcard-head__tagline">${escapeHtml(d.tagline)}</p>
            <p class="bcard-head__location">
              <i class="fas fa-location-dot" aria-hidden="true"></i>
              ${escapeHtml(d.location)}
            </p>
          </header>

          <div class="bcard-glass__rule" aria-hidden="true"></div>

          <nav class="bcard-actions" aria-label="Connect actions">
            ${d.actions.map(renderAction).join("")}
          </nav>

          <div class="bcard-bottom">
            <div class="bcard-social" aria-label="Social profiles">
              ${renderSocialLinks(d.socialLinks)}
            </div>

            <footer class="bcard-foot">
              <a href="tel:${escapeHtml(d.phoneTel)}">${escapeHtml(d.phone)}</a>
              <span class="bcard-foot__dot" aria-hidden="true">·</span>
              <a href="mailto:${escapeHtml(d.email)}">${escapeHtml(d.email)}</a>
            </footer>
          </div>
        </article>
  `;
}
