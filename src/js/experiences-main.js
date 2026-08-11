import { renderExperienceCards } from "./render-experiences.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { initSlideshows } from "./slideshow.js";
import { initLazyImages } from "./lazy-images.js";
import { navThingsToDoColumns } from "../data/nav-data.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderThingsToDoIndex() {
  const root = document.querySelector("#things-to-do-index");
  if (!root) return;

  root.innerHTML = navThingsToDoColumns
    .map(
      (column) => `
        <ul class="things-to-do-index__col">
          ${column
            .map(
              (item) => `
            <li>
              <a class="things-to-do-index__link" href="${escapeHtml(item.href)}">
                ${
                  item.image
                    ? `<img class="things-to-do-index__thumb" data-src="${escapeHtml(item.image)}" data-img-preset="thumb" src="" alt="" loading="lazy" width="40" height="40" decoding="async" />`
                    : ""
                }
                <span>${escapeHtml(item.name)}</span>
              </a>
            </li>
          `
            )
            .join("")}
        </ul>
      `
    )
    .join("");
}

function init() {
  renderSiteNav();
  renderSiteFooter();
  renderThingsToDoIndex();
  renderExperienceCards("#experiences-grid");
  initSiteNav();
  initLazyImages();
  initSlideshows();
  initScrollReveal();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
