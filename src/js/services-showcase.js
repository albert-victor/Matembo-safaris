import { servicesShowcase, servicesShowcaseIntro } from "../data/services-showcase-data.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
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
          <span class="svc-rail__icon"><i class="fas ${escapeHtml(item.icon)}" aria-hidden="true"></i></span>
          <span class="svc-rail__label">${escapeHtml(item.title)}</span>
        </button>
      `
    )
    .join("");

  const panels = servicesShowcase
    .map(
      (item, i) => `
        <article class="svc-panel${i === 0 ? " is-active" : ""}" data-svc-panel="${escapeHtml(item.id)}" aria-hidden="${i === 0 ? "false" : "true"}">
          <div class="svc-panel__media">
            <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.imageAlt)}" width="720" height="480" loading="${i === 0 ? "eager" : "lazy"}" />
            <div class="svc-panel__scrim" aria-hidden="true"></div>
            <span class="svc-panel__script">${escapeHtml(item.title)}</span>
          </div>
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

      <div class="svc-field__wrap section-reveal" data-services-showcase data-autoplay="5500">
        <div class="container">
          <div class="svc-rail" role="tablist" aria-label="Safari services">${railItems}</div>
        </div>
        <div class="svc-stage">${panels}</div>
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

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const tabs = [...root.querySelectorAll("[data-svc-tab]")];
  const panels = [...root.querySelectorAll("[data-svc-panel]")];
  const dots = [...root.querySelectorAll("[data-svc-dot]")];
  const intervalMs = Number(root.dataset.autoplay || 5500);

  let index = 0;
  let timer = null;

  const activate = (nextIndex) => {
    index = (nextIndex + panels.length) % panels.length;

    tabs.forEach((tab, i) => {
      const active = i === index;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });

    panels.forEach((panel, i) => {
      const active = i === index;
      panel.classList.toggle("is-active", active);
      panel.setAttribute("aria-hidden", active ? "false" : "true");
    });

    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  const stop = () => { if (timer) { clearInterval(timer); timer = null; } };
  const start = () => {
    if (prefersReducedMotion || panels.length <= 1) return;
    stop();
    timer = setInterval(() => activate(index + 1), intervalMs);
  };
  const restart = () => { stop(); start(); };

  tabs.forEach((tab, i) => tab.addEventListener("click", () => { activate(i); restart(); }));
  dots.forEach((dot, i) => dot.addEventListener("click", () => { activate(i); restart(); }));

  root.addEventListener("mouseenter", stop);
  root.addEventListener("mouseleave", start);
  start();
}
