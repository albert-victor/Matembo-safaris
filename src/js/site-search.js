import { loadSearchIndex, searchSiteIndex } from "../data/site-search-index.js";
import { NAV_IMAGE_FALLBACK } from "../data/nav-images.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function initSiteSearch(scope = document) {
  const mount = scope instanceof Document ? scope.documentElement : scope;
  if (mount.dataset?.searchReady) return;
  mount.dataset.searchReady = "1";

  const toggle = scope.querySelector("[data-search-toggle]");
  const overlay = scope.querySelector("[data-search-overlay]");
  const input = scope.querySelector("[data-search-input]");
  const results = scope.querySelector("[data-search-results]");
  const header = scope.querySelector("[data-site-header]");
  if (!toggle || !overlay || !input || !results) return;

  let indexPromise = null;
  let debounceTimer = null;

  function getIndex() {
    if (!indexPromise) indexPromise = loadSearchIndex();
    return indexPromise;
  }

  function openSearch() {
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    header?.classList.add("is-search-open");
    document.documentElement.classList.add("is-search-open");
    window.requestAnimationFrame(() => input.focus());
    getIndex();
  }

  function closeSearch() {
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    header?.classList.remove("is-search-open");
    document.documentElement.classList.remove("is-search-open");
    input.value = "";
    results.innerHTML = "";
  }

  function renderResults(items) {
    if (!items.length) {
      results.innerHTML = `<p class="site-search__empty">No matches – try a park, safari or activity name.</p>`;
      return;
    }

    results.innerHTML = items
      .map(
        (item) => `
          <a class="site-search__result" href="${escapeHtml(item.href)}">
            ${
              item.image
                ? `<img class="site-search__result-thumb" src="${escapeHtml(item.image)}" alt="" loading="lazy" width="44" height="44" data-fallback="${escapeHtml(NAV_IMAGE_FALLBACK)}" />`
                : `<span class="site-search__result-icon" aria-hidden="true"><i class="fas fa-compass"></i></span>`
            }
            <span class="site-search__result-text">
              <span class="site-search__result-title">${escapeHtml(item.title)}</span>
              <span class="site-search__result-meta">${escapeHtml(item.subtitle)}</span>
            </span>
          </a>
        `
      )
      .join("");

    results.querySelectorAll("[data-fallback]").forEach((img) => {
      img.addEventListener("error", () => {
        img.src = img.getAttribute("data-fallback");
      }, { once: true });
    });
  }

  async function runSearch() {
    const query = input.value.trim();
    if (query.length < 2) {
      results.innerHTML = `<p class="site-search__hint">Type at least 2 characters to search…</p>`;
      return;
    }
    results.innerHTML = `<p class="site-search__loading">Searching…</p>`;
    const index = await getIndex();
    renderResults(searchSiteIndex(index, query));
  }

  toggle.addEventListener("click", () => {
    overlay.hidden ? openSearch() : closeSearch();
  });

  overlay.querySelectorAll("[data-search-close]").forEach((el) => {
    el.addEventListener("click", closeSearch);
  });

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(runSearch, 180);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
    }
    if (event.key === "Enter") {
      const first = results.querySelector(".site-search__result");
      if (first) {
        event.preventDefault();
        first.click();
      }
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !overlay.hidden) closeSearch();
  });
}
