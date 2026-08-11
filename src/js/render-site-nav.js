import {
  megaMenuPanels,
  siteMeta,
  brandEmblemPath,
  logoPath,
} from "../data/nav-data.js";
import { NAV_IMAGE_FALLBACK, bindNavImageFallbacks } from "../data/nav-images.js";
import { initSiteSearch } from "./site-search.js";
import { ensureImagePreconnect, bootstrapImagesWithSrc, prefetchMegaMenuImages } from "./lazy-images.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function isRemoteImage(url) {
  return typeof url === "string" && url.startsWith("http");
}

function renderDeferredImage(url, className, width, height, alt = "", preset = "thumb") {
  if (!url) return "";

  const presetAttr = isRemoteImage(url) ? preset : "";

  return `<img
    class="${className}"
    data-src="${escapeHtml(url)}"
    ${presetAttr ? `data-img-preset="${presetAttr}"` : ""}
    src=""
    alt="${escapeHtml(alt)}"
    width="${width}"
    height="${height}"
    loading="lazy"
    decoding="async"
    data-fallback="${escapeHtml(NAV_IMAGE_FALLBACK)}"
  />`;
}

function renderMegaListItems(items) {
  return items
    .map(
      (item) => `
        <li class="mega-menu__list-item">
          <a class="mega-menu__list-link" href="${escapeHtml(item.href)}">
            ${
              item.image
                ? `<span class="mega-menu__list-thumb-wrap">
                    ${renderDeferredImage(item.image, "mega-menu__list-thumb", 52, 52, "", "thumb")}
                  </span>`
                : ""
            }
            <span class="mega-menu__list-text">
              <span class="mega-menu__list-name">${escapeHtml(item.name)}</span>
              ${
                item.script || item.desc
                  ? `<span class="mega-menu__list-script">${escapeHtml(item.script || item.desc)}</span>`
                  : ""
              }
            </span>
          </a>
        </li>
      `
    )
    .join("");
}

function renderMegaAside(aside) {
  if (!aside) return "";

  return `
    <aside class="mega-menu__aside">
      ${
        aside.image
          ? `<span class="mega-menu__aside-media">
              ${renderDeferredImage(aside.image, "", 280, 120, "", "card")}
              <span class="mega-menu__aside-shade" aria-hidden="true"></span>
            </span>`
          : ""
      }
      <div class="mega-menu__aside-body">
        ${aside.label ? `<span class="mega-menu__aside-label">${escapeHtml(aside.label)}</span>` : ""}
        ${aside.title ? `<span class="mega-menu__aside-title">${escapeHtml(aside.title)}</span>` : ""}
        ${aside.tags ? `<span class="mega-menu__aside-tags">${escapeHtml(aside.tags)}</span>` : ""}
        ${aside.quote ? `<blockquote class="mega-menu__aside-quote">"${escapeHtml(aside.quote)}"</blockquote>` : ""}
        ${
          aside.ctaHref
            ? `<a href="${escapeHtml(aside.ctaHref)}" class="btn btn--primary-dark mega-menu__aside-cta">${escapeHtml(aside.ctaText || "Learn more")}</a>`
            : ""
        }
      </div>
    </aside>
  `;
}

function renderEditorialMega(panel, menuClass = "") {
  const { featured, heading, items, aside, footer } = panel;
  const hasSpotlight = Boolean(featured);

  const spotlight = hasSpotlight
    ? `
      <a class="mega-menu__spotlight" href="${escapeHtml(featured.href)}">
        <span class="mega-menu__spotlight-media">
          ${renderDeferredImage(featured.image, "", 320, 400, featured.alt || featured.name, "card")}
          <span class="mega-menu__spotlight-shade" aria-hidden="true"></span>
        </span>
        <span class="mega-menu__spotlight-body">
          <span class="mega-menu__spotlight-label">${escapeHtml(featured.label)}</span>
          <span class="mega-menu__spotlight-title">${escapeHtml(featured.name)}</span>
          <span class="mega-menu__spotlight-desc">${escapeHtml(featured.desc)}</span>
        </span>
      </a>
    `
    : "";

  return `
    <div class="mega-menu mega-menu--editorial${hasSpotlight ? "" : " mega-menu--no-spotlight"}${menuClass ? ` ${menuClass}` : ""}">
      <div class="mega-menu__align">
        <div class="mega-menu__shell">
          ${spotlight}
          <div class="mega-menu__core">
            <header class="mega-menu__head">
              <span class="mega-menu__head-label">${escapeHtml(heading.label)}</span>
              <h3 class="mega-menu__head-title">${escapeHtml(heading.title)}</h3>
            </header>
            <ul class="mega-menu__list">
              ${renderMegaListItems(items)}
            </ul>
            ${
              footer
                ? `<footer class="mega-menu__foot">
                    <a href="${escapeHtml(footer.href)}" class="mega-menu__foot-link">${escapeHtml(footer.text)}</a>
                  </footer>`
                : ""
            }
          </div>
          ${renderMegaAside(aside)}
        </div>
      </div>
    </div>
  `;
}

function renderNavItem(label, megaKey, href = null) {
  const panel = megaMenuPanels[megaKey];
  const triggerTag = href ? "a" : "button";
  const hrefAttr = href ? ` href="${escapeHtml(href)}"` : "";
  const typeAttr = href ? "" : ` type="button"`;
  const menuClass = megaKey === "about" ? "mega-menu--about" : "";
  const megaHtml = renderEditorialMega(panel, menuClass);

  return `
    <li class="site-nav__item" data-mega>
      <${triggerTag}
        class="site-nav__trigger"
        ${hrefAttr}${typeAttr}
        aria-haspopup="true"
        aria-expanded="false"
      >
        ${escapeHtml(label)}
        <svg class="site-nav__chevron" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
      </${triggerTag}>
      ${megaHtml}
    </li>
  `;
}

export function renderSiteNav(containerSelector = "#site-nav-root") {
  const root = document.querySelector(containerSelector);
  if (!root) return;

  ensureImagePreconnect();

  root.querySelector("#nav-emblem-bootstrap")?.remove();

  root.innerHTML = `
    <header class="site-header" data-site-header>
      <div class="site-header__bar">
        <div class="container site-header__inner">
          <a class="site-header__brand" href="/" aria-label="${escapeHtml(siteMeta.name)} home">
            <span class="site-header__brand-emblem-wrap" aria-hidden="true">
              <img
                class="site-header__brand-emblem is-loaded"
                src="${escapeHtml(brandEmblemPath)}"
                alt=""
                width="52"
                height="52"
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
              <button
                type="button"
                class="site-nav__close"
                data-nav-close
                aria-label="Close menu"
                aria-hidden="true"
              >
                <i class="fas fa-xmark" aria-hidden="true"></i>
              </button>
            </div>
            <ul class="site-nav__list">
              <li class="site-nav__item">
                <a class="site-nav__trigger site-nav__trigger--plain" href="/">Home</a>
              </li>
              ${renderNavItem("Destinations", "destinations", "/circuits.html")}
              ${renderNavItem("Safaris", "safaris", "/safaris.html")}
              ${renderNavItem("Things to Do", "thingsToDo", "/experiences.html")}
              ${renderNavItem("Ruaha", "ruaha", "/ruaha-safaris.html")}
              ${renderNavItem("About Us", "about")}
            </ul>
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
              <a href="/contact.html" class="btn btn--primary btn--nav site-header__cta">Talk to Us</a>
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
        <label class="site-search-overlay__label" for="site-search-input">
          Find your safari
        </label>
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

  const emblem = root.querySelector(".site-header__brand-emblem");
  emblem?.setAttribute("data-fallback", logoPath);
  emblem?.addEventListener("error", () => {
    const fallback = emblem.getAttribute("data-fallback");
    if (fallback && !emblem.src.includes(fallback)) emblem.src = fallback;
  }, { once: true });

  bindNavImageFallbacks(root);
  initSiteSearch(root);
  bootstrapImagesWithSrc(root);
  prefetchMegaMenuImages();
}
