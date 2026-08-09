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

function init() {
  try {
    renderSiteNav();
    renderSiteFooter();

    const id = resolveExperienceId();
    const exp = getExperienceById(id);

    if (!exp) {
      renderExperienceNotFound("#experience-view-root");
      initSiteNav();
      return;
    }

    const ok = renderExperiencePage("#experience-view-root", exp);
    if (!ok) return;

    initSiteNav();
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
