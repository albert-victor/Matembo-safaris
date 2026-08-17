import { FONT_AWESOME_URL } from "../lib/font-awesome-snippet.js";

let injected = false;

/** Load Font Awesome when a page shell omits the CDN stylesheet (e.g. npx serve on source HTML). */
export function ensureFontAwesome() {
  if (
    injected ||
    document.querySelector(`link[href="${FONT_AWESOME_URL}"]`) ||
    document.querySelector('link[href*="font-awesome"]')
  ) {
    return;
  }

  injected = true;

  if (!document.querySelector('link[rel="preconnect"][href="https://cdnjs.cloudflare.com"]')) {
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://cdnjs.cloudflare.com";
    preconnect.crossOrigin = "anonymous";
    document.head.appendChild(preconnect);
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONT_AWESOME_URL;
  link.crossOrigin = "anonymous";
  link.referrerPolicy = "no-referrer";
  document.head.appendChild(link);
}
