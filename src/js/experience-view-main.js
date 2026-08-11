import {
  getExperienceById,
  getPagePhotos,
  renderExperiencePage,
  renderExperienceNotFound,
} from "./render-experience-view.js";
import { renderSiteNav } from "./render-site-nav.js";
import { renderSiteFooter } from "./render-home.js";
import { initSiteNav } from "./site-nav.js";
import { initSlideshows } from "./slideshow.js";
import { initScrollReveal } from "./scroll-reveal.js";
import { renderPackageCards } from "./render-cards.js";
import { getActivityCollection, getActivityPackagesForCollection } from "../data/activity-packages.js";
import { initCardTilt } from "./card-tilt.js";

const EXPERIENCE_PACKAGE_COLLECTIONS = {
  "bird-watching": "bird-watching",
  "cultural-visits": "cultural-visits",
};

function resolveExperienceId() {
  const fromBody = document.body.dataset.experienceId;
  if (fromBody) return fromBody;

  const params = new URLSearchParams(window.location.search);
  return params.get("id") || params.get("experience") || "";
}

function initLightbox(gallery) {
  const lightbox = document.querySelector("[data-lightbox]");
  const items = document.querySelectorAll("[data-lightbox-index]");
  if (!lightbox || !items.length || !gallery.length) return;

  const img = lightbox.querySelector(".dest-lightbox__img");
  let current = 0;

  function show(index) {
    current = (index + gallery.length) % gallery.length;
    const photo = gallery[current];
    img.src = photo.src;
    img.alt = photo.alt?.replace(/\s*[––-]\s*view \d+$/i, "") || "";
    lightbox.hidden = false;
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("dest-lightbox-open");
  }

  function close() {
    lightbox.hidden = true;
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("dest-lightbox-open");
  }

  items.forEach((btn) => {
    btn.addEventListener("click", () => show(Number(btn.dataset.lightboxIndex)));
  });

  lightbox.querySelector("[data-lightbox-close]")?.addEventListener("click", close);
  lightbox.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => show(current - 1));
  lightbox.querySelector("[data-lightbox-next]")?.addEventListener("click", () => show(current + 1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", (e) => {
    if (lightbox.hidden) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
}

async function renderExperiencePackages(experienceId) {
  const collectionId = EXPERIENCE_PACKAGE_COLLECTIONS[experienceId];
  if (!collectionId) return;

  const collection = getActivityCollection(collectionId);
  const packages = getActivityPackagesForCollection(collectionId).slice(0, 6);
  const root = document.querySelector("#experience-view-root");
  if (!collection || !packages.length || !root) return;

  const section = document.createElement("section");
  section.className = "dest-listing-grid-section dest-page__packages-band";
  section.setAttribute("aria-labelledby", "experience-packages-title");
  section.innerHTML = `
    <div class="container">
      <header class="home-section__header section-reveal">
        <span class="home-section__label">Safari Packages</span>
        <h2 id="experience-packages-title" class="home-section__title">Curated ${collection.label} Itineraries</h2>
        <p class="home-section__desc">
          Real routes from Tanzania Tourism — view full details or enquire to tailor dates and lodges.
        </p>
      </header>
      <div id="experience-packages-grid" class="safari-cards-grid"></div>
      <p class="home-section__desc section-reveal" style="margin-top: 2rem; text-align: center;">
        <a href="${collection.pagePath}" class="btn btn--secondary">View all ${packages.length < 6 ? packages.length : collection.packageIds.length} packages →</a>
      </p>
    </div>
  `;

  const related = root.querySelector(".dest-page__related");
  if (related) {
    root.insertBefore(section, related);
  } else {
    root.appendChild(section);
  }

  await renderPackageCards("#experience-packages-grid", { packages, viewLabel: "View Safari" });
  initCardTilt();
  initScrollReveal();
}

async function init() {
  try {
    renderSiteNav();
    renderSiteFooter();
    initSiteNav();

    const id = resolveExperienceId();
    const exp = getExperienceById(id);

    if (!exp) {
      renderExperienceNotFound("#experience-view-root");
      return;
    }

    const ok = renderExperiencePage("#experience-view-root", exp);
    if (!ok) return;

    await renderExperiencePackages(id);
    initSlideshows();
    initLightbox(getPagePhotos(exp));
  } catch (error) {
    console.error("Matembo experience view init failed:", error);
  } finally {
    initScrollReveal();
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
