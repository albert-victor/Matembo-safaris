import { renderSiteNavShell, scheduleMegaMenuHydration } from "./render-site-nav-shell.js";
import { bindNavImageFallbacks } from "../data/nav-images.js";
import { initSiteSearch } from "./site-search.js";
import { ensureFontAwesome } from "./ensure-font-awesome.js";

export { renderSiteNavShell, scheduleMegaMenuHydration } from "./render-site-nav-shell.js";

export function renderSiteNav(containerSelector = "#site-nav-root") {
  ensureFontAwesome();
  const root = document.querySelector(containerSelector);
  if (!root) return;

  renderSiteNavShell(containerSelector);
  bindNavImageFallbacks(root);
  scheduleMegaMenuHydration(root);

  if (!root.dataset.searchInit) {
    root.dataset.searchInit = "1";
    initSiteSearch(root);
  }
}
