import {
  brandEmblemPath,
  logoPath,
  siteMeta,
  navShellItems,
} from "../data/nav-shell-data.js";
import { NAV_IMAGE_FALLBACK } from "../data/nav-images.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderShellNavItem(item) {
  if (item.plain) {
    return `
      <li class="site-nav__item">
        <a class="site-nav__trigger site-nav__trigger--plain" href="${escapeHtml(item.href)}">${escapeHtml(item.label)}</a>
      </li>
    `;
  }

  const tag = item.href ? "a" : "button";
  const hrefAttr = item.href ? ` href="${escapeHtml(item.href)}"` : "";
  const typeAttr = item.href ? "" : ` type="button"`;

  return `
    <li class="site-nav__item" data-mega-slot="${escapeHtml(item.megaKey)}">
      <${tag}
        class="site-nav__trigger"
        ${hrefAttr}${typeAttr}
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${escapeHtml(item.label)}
        <svg class="site-nav__chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </${tag}>
    </li>
  `;
}

export function renderSiteNavShellHTML() {
  const navItems = navShellItems.map(renderShellNavItem).join("");

  return `
    <header class="site-header is-over-hero" data-site-header>
      <div class="site-header__bar">
        <div class="container site-header__inner">
          <a class="site-header__brand" href="/" aria-label="${escapeHtml(siteMeta.name)} home">
            <span class="site-header__brand-emblem-wrap" aria-hidden="true">
              <img
                class="site-header__brand-emblem"
                src="${escapeHtml(brandEmblemPath)}"
                alt=""
                width="58"
                height="58"
                loading="eager"
                fetchpriority="high"
                decoding="async"
                data-fallback="${escapeHtml(NAV_IMAGE_FALLBACK)}"
              />
            </span>
            <span class="site-header__brand-lockup">
              <span class="site-header__brand-wordmark">Matembo</span>
              <span class="site-header__brand-sub">${escapeHtml(siteMeta.tagline)}</span>
            </span>
          </a>

          <nav id="site-nav-panel" class="site-nav" aria-label="Main navigation">
            <div class="site-nav__mobile-head">
              <span class="site-nav__mobile-title">Menu</span>
              <button type="button" class="site-nav__close" data-nav-close aria-label="Close menu" aria-hidden="true">
                <i class="fas fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <ul class="site-nav__list">${navItems}</ul>
            <div class="site-nav__mobile-cta">
              <a href="/contact.html" class="btn btn--primary site-nav__mobile-cta-primary">Plan Your Safari</a>
              <a href="/contact.html" class="btn btn--secondary site-nav__mobile-cta-secondary">Talk to Us</a>
            </div>
          </nav>

          <div class="site-header__end">
            <div class="site-header__tools" data-header-tools>
              <button
                type="button"
                class="site-header__search-toggle"
                data-search-toggle
                aria-expanded="false"
                aria-controls="site-search-overlay"
                aria-label="Search site"
              >
                <i class="fas fa-search" aria-hidden="true"></i>
              </button>
              <a href="/contact.html" class="btn btn--primary btn--nav site-header__cta">Plan your safari</a>
            </div>
            <button
              type="button"
              class="site-header__toggle"
              data-nav-toggle
              aria-expanded="false"
              aria-controls="site-nav-panel"
              aria-label="Open menu"
            >
              <span class="site-header__toggle-line"></span>
              <span class="site-header__toggle-line"></span>
              <span class="site-header__toggle-line"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
    <div class="site-nav-backdrop" data-nav-backdrop hidden aria-hidden="true"></div>

    <div class="site-search-overlay" data-search-overlay hidden aria-hidden="true">
      <div class="site-search-overlay__backdrop" data-search-close aria-hidden="true"></div>
      <div class="site-search-overlay__panel" role="dialog" aria-modal="true" aria-label="Search Matembo Safaris">
        <button type="button" class="site-search-overlay__close" data-search-close aria-label="Close search">
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
        <label class="site-search-overlay__label" for="site-search-input">Find your safari</label>
        <form class="site-search-overlay__form" data-search-form autocomplete="off">
          <div class="site-search-overlay__field">
            <span class="site-search-overlay__field-icon" aria-hidden="true"><i class="fas fa-search"></i></span>
            <input
              id="site-search-input"
              class="site-search-overlay__input"
              type="search"
              data-search-input
              placeholder="Serengeti, Ruaha, game drives, Kilimanjaro…"
              autocomplete="off"
              spellcheck="false"
            />
            <button type="submit" class="btn btn--secondary site-search-overlay__submit">Search</button>
          </div>
        </form>
        <div class="site-search-overlay__results" data-search-results role="listbox" aria-live="polite"></div>
      </div>
    </div>
  `;
}

export function renderSiteNavShell(containerSelector = "#site-nav-root") {
  const root = document.querySelector(containerSelector);
  if (!root || root.querySelector("[data-site-header]")) return root;

  root.querySelector("#nav-emblem-bootstrap")?.remove();
  root.innerHTML = renderSiteNavShellHTML();

  const emblem = root.querySelector(".site-header__brand-emblem");
  emblem?.setAttribute("data-fallback", logoPath);
  emblem?.addEventListener(
    "error",
    () => {
      const fallback = emblem.getAttribute("data-fallback");
      if (fallback && !emblem.src.includes(fallback)) emblem.src = fallback;
    },
    { once: true }
  );

  return root;
}

let megaHydratePromise = null;

export function scheduleMegaMenuHydration(root = document) {
  const scope = root instanceof Document ? root : root.ownerDocument || document;
  if (scope.querySelector("[data-mega]") || scope.documentElement.dataset.megaHydrateScheduled) {
    return;
  }
  scope.documentElement.dataset.megaHydrateScheduled = "1";

  const run = () => {
    if (!megaHydratePromise) {
      megaHydratePromise = import("./mega-menu-hydrate.js").then((m) => m.hydrateMegaMenus(scope));
    }
    return megaHydratePromise;
  };

  const trigger = () => {
    run();
    scope.querySelectorAll("[data-mega-slot]").forEach((item) => {
      item.querySelector(".site-nav__trigger")?.removeEventListener("pointerenter", trigger);
      item.querySelector(".site-nav__trigger")?.removeEventListener("focus", trigger);
      item.querySelector(".site-nav__trigger")?.removeEventListener("click", trigger);
    });
  };

  scope.querySelectorAll("[data-mega-slot]").forEach((item) => {
    const t = item.querySelector(".site-nav__trigger");
    t?.addEventListener("pointerenter", trigger, { once: true, passive: true });
    t?.addEventListener("focus", trigger, { once: true });
    t?.addEventListener("click", trigger, { once: true });
  });

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 4000 });
  } else {
    window.setTimeout(run, 1500);
  }
}
