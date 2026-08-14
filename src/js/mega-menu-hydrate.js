import { megaMenuPanels } from "../data/nav-data.js";
import { bindNavImageFallbacks } from "../data/nav-images.js";
import { refreshMegaNavHandlers } from "./site-nav.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

function renderNavImage(url, className, width, height, alt = "") {
  if (!url) return "";
  return `<img
    class="${className}"
    src="${escapeHtml(url)}"
    alt="${escapeHtml(alt)}"
    width="${width}"
    height="${height}"
    loading="lazy"
    decoding="async"
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
                    ${renderNavImage(item.image, "mega-menu__list-thumb", 52, 52)}
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
              ${renderNavImage(aside.image, "", 280, 120)}
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
          ${renderNavImage(featured.image, "", 320, 400, featured.alt || featured.name)}
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
            <ul class="mega-menu__list">${renderMegaListItems(items)}</ul>
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

export async function hydrateMegaMenus(root = document) {
  const scope = root instanceof Document ? root : root.ownerDocument || document;
  if (scope.documentElement.dataset.megaHydrated) return;
  scope.documentElement.dataset.megaHydrated = "1";

  const slots = [...scope.querySelectorAll("[data-mega-slot]")];
  if (!slots.length) return;

  for (const slot of slots) {
    const megaKey = slot.getAttribute("data-mega-slot");
    const panel = megaMenuPanels[megaKey];
    if (!panel) continue;

    const menuClass = megaKey === "about" ? "mega-menu--about" : "";
    slot.insertAdjacentHTML("beforeend", renderEditorialMega(panel, menuClass));
    slot.removeAttribute("data-mega-slot");
    slot.setAttribute("data-mega", "");
  }

  bindNavImageFallbacks(scope);
  refreshMegaNavHandlers();
}
