/**
 * Shared TTB safari listing-card helpers for import scripts.
 */

export const TTB_BASE = "https://www.tanzaniatourism.com";

export const SAFARI_CARD_RE =
  /<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"[^>]*class="tourCard[^"]*"[\s\S]*?<img src="([^"]+)"[\s\S]*?<div class="text-14 text-light-1">([^<]+)<\/div>[\s\S]*?<h4 class="tourCard__title[^"]*">\s*<span>([^<]+)<\/span>/gi;

export function absUrl(path, base = TTB_BASE) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return base + (path.startsWith("/") ? path : `/${path}`);
}

export function serialize(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (obj === null) return "null";
  if (typeof obj === "string") return JSON.stringify(obj);
  if (typeof obj === "number" || typeof obj === "boolean") return String(obj);
  if (Array.isArray(obj)) {
    if (!obj.length) return "[]";
    return `[\n${obj.map((v) => `${padIn}${serialize(v, indent + 1)}`).join(",\n")},\n${pad}]`;
  }
  const entries = Object.entries(obj)
    .map(([k, v]) => `${padIn}${k}: ${serialize(v, indent + 1)}`)
    .join(",\n");
  return `{\n${entries},\n${pad}}`;
}

function cleanUploadFilename(filename) {
  return filename
    .replace(/_550_550[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/_750_550[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/shar-\d+brig-\d+[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/_c\d+(?=\.(?:jpg|jpeg|png|webp))/i, "");
}

export function imageKey(url) {
  const file = url.split("/").pop()?.split("?")[0] || url;
  return cleanUploadFilename(file).toLowerCase();
}

function uploadsCandidates(rawUrl) {
  const url = absUrl(rawUrl);
  if (!url.startsWith(`${TTB_BASE}/images/`)) return [];

  const candidates = [];
  if (url.includes("/images/uploads/")) {
    const file = url.split("/images/uploads/")[1]?.split("?")[0];
    if (file) {
      candidates.push(`${TTB_BASE}/images/uploads/${file}`);
      const cleaned = cleanUploadFilename(file);
      if (cleaned !== file) candidates.push(`${TTB_BASE}/images/uploads/${cleaned}`);
    }
  }
  if (url.includes("/images/made/")) {
    const match = url.match(/\/images\/uploads\/([^/?"'\\s]+)/i);
    if (match) {
      candidates.push(`${TTB_BASE}/images/uploads/${cleanUploadFilename(match[1])}`);
    }
  }
  return [...new Set(candidates)];
}

async function resolveWorkingUrl(rawUrl, cache) {
  for (const candidate of uploadsCandidates(rawUrl)) {
    if (cache.has(candidate)) {
      if (cache.get(candidate)) return candidate;
      continue;
    }
    try {
      const res = await fetch(candidate, {
        method: "HEAD",
        headers: { "User-Agent": "Mozilla/5.0" },
        redirect: "follow",
      });
      cache.set(candidate, res.ok);
      if (res.ok) return candidate;
    } catch {
      cache.set(candidate, false);
    }
  }
  return null;
}

export async function resolveListingImage(listingImage, gallery, baseImage, cache) {
  const direct = await resolveWorkingUrl(listingImage, cache);
  if (direct) return direct;

  const listingKey = imageKey(absUrl(listingImage));
  const fromGallery = gallery.find((item) => imageKey(item.src) === listingKey);
  if (fromGallery) return fromGallery.src;

  const listingStem = listingKey.replace(/\.[^.]+$/, "");
  const partial = gallery.find((item) => {
    const key = imageKey(item.src).replace(/\.[^.]+$/, "");
    return key.includes(listingStem) || listingStem.includes(key);
  });
  if (partial) return partial.src;

  return baseImage;
}

export function reorderGallery(gallery, heroSrc) {
  if (!heroSrc) return gallery;
  const heroKey = imageKey(heroSrc);
  const heroItem = gallery.find((item) => imageKey(item.src) === heroKey);
  const rest = gallery.filter((item) => imageKey(item.src) !== heroKey);
  const lead = heroItem || { src: heroSrc, alt: gallery[0]?.alt || "" };
  return [lead, ...rest];
}

export function extractSafariListingCards(html) {
  const cards = [];
  let match;
  while ((match = SAFARI_CARD_RE.exec(html))) {
    cards.push({
      url: match[1],
      slug: match[1].split("/safari/")[1],
      listingImage: match[2],
      listingDuration: match[3].trim(),
      listingTitle: match[4].replace(/&amp;/g, "&").trim(),
    });
  }
  SAFARI_CARD_RE.lastIndex = 0;
  return cards;
}

export async function fetchSafariListing(base, maxPages = 5) {
  const combined = new Map();

  for (let page = 0; page < maxPages; page++) {
    const suffix = page === 0 ? "" : `/P${page * 16}`;
    const url = base + suffix;
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
    });
    if (!res.ok) break;

    const cards = extractSafariListingCards(await res.text());
    if (!cards.length) break;

    let added = 0;
    for (const card of cards) {
      if (combined.has(card.slug)) continue;
      combined.set(card.slug, card);
      added++;
    }
    if (!added) break;
  }

  return [...combined.values()];
}

export async function buildCuratedPackage(basePkg, listing, imageCache, sectionId) {
  const gallery = basePkg.gallery || [{ src: basePkg.image, alt: basePkg.alt }];
  const listingResolved = await resolveListingImage(
    listing.listingImage,
    gallery,
    basePkg.image,
    imageCache
  );

  return {
    ...basePkg,
    sectionId,
    duration: listing.listingDuration || basePkg.duration,
    image: listingResolved,
    alt: basePkg.alt || listing.listingTitle,
    gallery: reorderGallery(gallery, listingResolved),
    listingImage: listingResolved,
    listingOrder: listing.order,
  };
}

export function parseDurationDays(duration = "") {
  const match = String(duration).match(/(\d+)\s*days?/i);
  return match ? Number(match[1]) : /day trip|day hike/i.test(duration) ? 1 : 0;
}
