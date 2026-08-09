import { siteMeta } from "../data/home-data.js";

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

export function renderBrandMark(className = "brand-mark") {
  return `
    <span class="${className}" aria-hidden="true">
      <svg class="${className}__icon" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M8 28c2-8 8-14 16-14 3 0 6 1 8 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M32 17c3 1 6 4 7 8 1 4 0 8-2 11" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M14 30c-1 4 0 8 3 11 2 2 5 3 8 2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
        <path d="M22 14v8M19 18h6" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
        <circle cx="27" cy="16" r="1.1" fill="currentColor"/>
        <path d="M10 26c-2 1-3 3-3 5" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/>
      </svg>
      <span class="${className}__text">
        <span class="${className}__name">Matembo</span>
        <span class="${className}__tag">${escapeHtml(siteMeta.tagline)}</span>
      </span>
    </span>
  `;
}
