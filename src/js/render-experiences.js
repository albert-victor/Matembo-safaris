import { experiences, experiencePageUrl } from "../data/experiences-data.js";
import { photosForExperience } from "./content-utils.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderSlides(images) {
  return images
    .map(
      (img, i) => `
        <div class="dest-slideshow__slide dest-slideshow__slide--motion ${i === 0 ? "is-active" : ""}" data-slide>
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
      `<button type="button" class="dest-slideshow__dot ${i === 0 ? "is-active" : ""}" data-slide-dot aria-label="Show image ${i + 1}"></button>`
  ).join("");
}

function renderExperienceCard(exp, index) {
  const delay = index % 3;
  const tags = exp.highlights?.slice(0, 2) || [];
  const cover = photosForExperience(exp, 1)[0] || exp.images[0];

  return `
    <article class="dest-card dest-card--b dest-card--teaser" id="${escapeHtml(exp.id)}" data-reveal ${delay ? `data-reveal-delay="${delay}"` : ""}>
      <div class="dest-card__cinema">
        <div class="dest-slideshow__track dest-slideshow__track--cinema">
          <div class="dest-slideshow__slide is-active" data-slide>
            <img
              src="${escapeHtml(cover.src)}"
              alt="${escapeHtml(cover.alt || exp.name)}"
              width="640"
              height="400"
              loading="lazy"
              decoding="async"
            />
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
        ${
          tags.length
            ? `<ul class="dest-card__tags">${tags.map((t) => `<li>${escapeHtml(t)}</li>`).join("")}</ul>`
            : ""
        }
        <p class="dest-card__tagline dest-card__tagline--compact">${escapeHtml(exp.tagline)}</p>
        <span class="dest-card__link">Explore ${escapeHtml(exp.name)} →</span>
      </a>
    </article>
  `;
}

export function renderExperienceCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  container.innerHTML = experiences
    .map((exp, index) => renderExperienceCard(exp, index))
    .join("");
}
