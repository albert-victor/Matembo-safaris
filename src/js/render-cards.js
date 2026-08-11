import { packagePageUrl } from "./paths.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function padIndex(n) {
  return String(n + 1).padStart(2, "0");
}

function renderHighlights(pkg) {
  const items = pkg.matemboPitch
    ? [pkg.matemboPitch, ...(pkg.highlights || [])]
    : pkg.highlights || [];
  return items
    .slice(0, 3)
    .map((item) => `<li class="safari-card__highlight">${escapeHtml(item)}</li>`)
    .join("");
}

export function renderCard(pkg, index, options = {}) {
  const viewLabel = options.viewLabel || "View Safari";
  const displayTitle = pkg.matemboLabel || pkg.title;
  const inCarousel = Boolean(options.inCarousel);
  const delay = inCarousel ? 0 : index % 3;
  const badge = pkg.badge
    ? `<span class="safari-card__badge">${escapeHtml(pkg.badge)}</span>`
    : "";
  const objectPosition = pkg.objectPosition || "center center";
  const accent = index % 2 === 0 ? "green" : "gold";
  const indexLabel = padIndex(index);

  return `
    <article
      class="safari-card${inCarousel ? " safari-card--carousel" : ""}"
      ${inCarousel ? "" : "data-reveal"}
      data-accent="${accent}"
      ${!inCarousel && delay ? `data-reveal-delay="${delay}"` : ""}
      aria-labelledby="pkg-title-${pkg.id}"
    >
      <div class="safari-card__glow" aria-hidden="true"></div>
      <div class="safari-card__frame"${inCarousel ? "" : " data-tilt"}>
        <div class="safari-card__inner">
          <span class="safari-card__index" aria-hidden="true">${indexLabel}</span>

          <div class="safari-card__media">
            <span class="safari-card__bracket safari-card__bracket--tl" aria-hidden="true"></span>
            <span class="safari-card__bracket safari-card__bracket--br" aria-hidden="true"></span>

            <div class="safari-card__motion">
              <img
                class="safari-card__image"
                data-src="${escapeHtml(pkg.image)}"
                data-img-preset="card"
                src=""
                alt="${escapeHtml(pkg.alt)}"
                width="560"
                height="350"
                loading="lazy"
                decoding="async"
                style="object-position: ${objectPosition}"
              />
            </div>

            <div class="safari-card__overlay safari-card__overlay--gold" aria-hidden="true"></div>
            <div class="safari-card__overlay safari-card__overlay--green" aria-hidden="true"></div>
            ${badge}
            <span class="safari-card__duration-stamp">${escapeHtml(pkg.duration)}</span>
            <span class="safari-card__circuit-script">${escapeHtml(pkg.circuit)}</span>
          </div>

          <div class="safari-card__perforation" aria-hidden="true"></div>

          <div class="safari-card__body">
            <div class="safari-card__title-block">
              <span class="safari-card__accent-mark" aria-hidden="true"></span>
              <h3 class="safari-card__title" id="pkg-title-${pkg.id}">
                ${escapeHtml(displayTitle)}
              </h3>
            </div>

            <ul class="safari-card__highlights">
              ${renderHighlights(pkg)}
            </ul>

            <div class="safari-card__actions">
              <a href="${packagePageUrl(pkg)}" class="btn btn--primary btn--card">${escapeHtml(viewLabel)}</a>
              <a href="/contact.html" class="btn btn--secondary btn--card">Enquire</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

export async function renderPackageCards(containerTarget, options = {}) {
  const container =
    typeof containerTarget === "string"
      ? document.querySelector(containerTarget)
      : containerTarget;
  if (!container) return;

  const { ids, packages: customPackages, viewLabel } = options;
  let packages = customPackages;

  if (!packages?.length) {
    const { safariPackages } = await import("../data/safari-packages.js");
    packages = safariPackages;
  }

  if (ids?.length) {
    const { safariPackages } = await import("../data/safari-packages.js");
    packages = ids
      .map((id) => safariPackages.find((pkg) => pkg.id === id))
      .filter(Boolean);
  }

  container.innerHTML = packages
    .map((pkg, index) => renderCard(pkg, index, { viewLabel }))
    .join("");
}
