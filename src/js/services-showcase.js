import { servicesShowcase, servicesShowcaseIntro } from "../data/services-showcase-data.js";
import { loadImagesIn } from "./lazy-images.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderPanelMedia(item, eager = false) {
  const srcAttrs = eager
    ? `src="${escapeHtml(item.image)}" class="is-loaded" fetchpriority="high"`
    : `data-src="${escapeHtml(item.image)}" src=""`;

  return `
    <div class="svc-panel__media">
      <img
        ${srcAttrs}
        data-img-preset="card"
        alt="${escapeHtml(item.imageAlt)}"
        width="720"
        height="480"
        decoding="async"
        data-fallback="/assets/about/main3.jpg"
      />
      <div class="svc-panel__scrim" aria-hidden="true"></div>
      <span class="svc-panel__script">${escapeHtml(item.title)}</span>
    </div>
  `;
}

export function renderServicesShowcase() {
  const root = document.querySelector("#home-services-showcase");
  if (!root) return;

  const railItems = servicesShowcase
    .map(
      (item, i) => `
        <button
          type="button"
          class="svc-rail__item${i === 0 ? " is-active" : ""}"
          data-svc-tab="${item.id}"
          aria-selected="${i === 0 ? "true" : "false"}"
        >
          <span class="svc-rail__num">${String(i + 1).padStart(2, "0")}</span>
          <span class="svc-rail__label">${escapeHtml(item.title)}</span>
        </button>
      `
    )
    .join("");

  const panels = servicesShowcase
    .map(
      (item, i) => `
        <article class="svc-panel${i === 0 ? " is-active" : ""}" data-svc-panel="${escapeHtml(item.id)}" aria-hidden="${i === 0 ? "false" : "true"}">
          ${renderPanelMedia(item, i === 0)}
          <div class="svc-panel__body">
            <h3 class="svc-panel__title">${escapeHtml(item.title)}</h3>
            <p class="svc-panel__desc">${escapeHtml(item.description)}</p>
            <ul class="svc-panel__tags">
              ${item.highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}
            </ul>
            <a href="${escapeHtml(item.href)}" class="btn btn--secondary svc-panel__cta">Explore ${escapeHtml(item.title)}</a>
          </div>
        </article>
      `
    )
    .join("");

  root.innerHTML = `
    <section class="svc-field" id="services" aria-labelledby="services-title">
      <div class="container">
        <header class="home-section__header section-reveal">
          <span class="home-section__label">${escapeHtml(servicesShowcaseIntro.label)}</span>
          <h2 id="services-title" class="home-section__title">${escapeHtml(servicesShowcaseIntro.title)}</h2>
          <p class="home-section__desc">${escapeHtml(servicesShowcaseIntro.desc)}</p>
        </header>
      </div>

      <div class="svc-field__wrap section-reveal" data-services-showcase data-autoplay="6000">
        <div class="container">
          <div class="svc-rail" role="tablist" aria-label="Safari services">${railItems}</div>
        </div>
        <div class="container svc-stage">${panels}</div>
        <div class="svc-field__dots container" role="tablist" aria-label="Service pages">
          ${servicesShowcase.map((_, i) => `
            <button type="button" class="svc-field__dot${i === 0 ? " is-active" : ""}" data-svc-dot="${i}" aria-label="Service ${i + 1}"></button>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

export function initServicesShowcase() {
  const root = document.querySelector("[data-services-showcase]");
  if (!root) return;

  const tabs = [...root.querySelectorAll("[data-svc-tab]")];
  const panels = [...root.querySelectorAll("[data-svc-panel]")];
  const dots = [...root.querySelectorAll("[data-svc-dot]")];
  const rail = root.querySelector(".svc-rail");

  root.querySelectorAll(".svc-panel__media img").forEach((img) => {
    img.addEventListener("error", () => {
      const original = img.getAttribute("data-src") || img.dataset.srcOriginal;
      if (original && img.src.includes("/images/made/") && !img.dataset.retriedOriginal) {
        img.dataset.retriedOriginal = "1";
        img.dataset.srcOriginal = original;
        img.src = original;
        return;
      }
      const fallback = img.getAttribute("data-fallback");
      if (fallback && !img.dataset.fallbackApplied && !img.src.includes(fallback.replace(/^\//, ""))) {
        img.dataset.fallbackApplied = "1";
        img.src = fallback;
      }
    });
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const intervalMs = Number(root.dataset.autoplay || 6000);
  let index = 0;
  let timer = null;

  function scrollTabInRail(tab, smooth = false) {
    if (!rail || !tab) return;
    const targetLeft = tab.offsetLeft - rail.offsetWidth / 2 + tab.offsetWidth / 2;
    rail.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: smooth ? "smooth" : "instant",
    });
  }

  const activate = (nextIndex, { scrollTab = false } = {}) => {
    index = (nextIndex + panels.length) % panels.length;

    root.style.setProperty("--svc-autoplay", `${intervalMs}ms`);

    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    const activeTab = tabs[index];
    if (activeTab) {
      activeTab.classList.remove("is-active");
      void activeTab.offsetWidth;
      activeTab.classList.add("is-active");
    }

    panels.forEach((panel, i) => {
      const active = i === index;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");

      if (active) {
        const mediaImg = panel.querySelector(".svc-panel__media img");
        if (mediaImg) {
          mediaImg.style.animation = "none";
          void mediaImg.offsetWidth;
          mediaImg.style.animation = "";
        }
      }
    });

    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));

    loadImagesIn(panels[index], { priority: true });

    if (scrollTab) {
      scrollTabInRail(tabs[index], true);
    }
  };

  const stop = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const start = () => {
    if (prefersReducedMotion || panels.length <= 1) return;
    stop();
    timer = window.setInterval(() => activate(index + 1), intervalMs);
  };

  tabs.forEach((tab, i) => {
    tab.addEventListener("click", () => {
      activate(i, { scrollTab: true });
      start();
    });
  });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      activate(i, { scrollTab: true });
      start();
    });
  });

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  root.addEventListener("focusin", stop);
  root.addEventListener("focusout", (event) => {
    if (root.contains(event.relatedTarget)) return;
    start();
  });

  document.addEventListener("visibilitychange", () => {
    document.hidden ? stop() : start();
  });

  activate(0, { scrollTab: false });
  scrollTabInRail(tabs[0], false);
  start();
}
