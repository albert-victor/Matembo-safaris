/**
 * Import climbing & trekking packages from tanzaniatourism.com listing pages.
 * Run: npm run import:trekkings
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/trekking-packages.js");
const SAFARI_DATA = join(ROOT, "src/data/safari-packages.js");

const BASE = "https://www.tanzaniatourism.com";
const LISTINGS = [
  `${BASE}/activities/climbing-trekking`,
  `${BASE}/safaris/mountain-climbing`,
];

const CARD_RE =
  /<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"[^>]*class="tourCard[^"]*"[\s\S]*?<img src="([^"]+)"[\s\S]*?<div class="text-14 text-light-1">([^<]+)<\/div>[\s\S]*?<h4 class="tourCard__title[^"]*">\s*<span>([^<]+)<\/span>/gi;

const SECTIONS = [
  {
    id: "kilimanjaro-day-hikes",
    label: "Day Hikes",
    title: "Kilimanjaro Day Hikes",
    desc: "Single-day ascents on Marangu, Machame and the Shira Plateau — ideal acclimatisation before a summit trek.",
  },
  {
    id: "kilimanjaro-4-5-days",
    label: "4–5 Days",
    title: "4–5 Day Kilimanjaro Routes",
    desc: "Shorter Machame and Umbwe programmes for climbers with limited time.",
  },
  {
    id: "kilimanjaro-6-days",
    label: "6 Days",
    title: "6 Day Kilimanjaro Routes",
    desc: "Marangu, Rongai, Umbwe and Machame six-day itineraries to the roof of Africa.",
  },
  {
    id: "kilimanjaro-7-days",
    label: "7 Days",
    title: "7 Day Kilimanjaro Routes",
    desc: "Shira, Rongai, Lemosho, Machame variants and the Western Breach — extra days for acclimatisation.",
  },
  {
    id: "kilimanjaro-8-9-days",
    label: "8–9 Days",
    title: "8–9 Day Kilimanjaro Routes",
    desc: "Extended Machame, Lemosho and Northern Circuit options with the best summit success rates.",
  },
  {
    id: "mount-meru",
    label: "Mount Meru",
    title: "Mount Meru Climbs",
    desc: "Three- and four-day ascents of Tanzania's second highest peak, above Arusha National Park.",
  },
  {
    id: "lengai-highlands",
    label: "Ol Doinyo Lengai",
    title: "Ol Doinyo Lengai & Highlands",
    desc: "Active volcano climbs and multi-day Ngorongoro highland treks with Lake Natron.",
  },
  {
    id: "eastern-mountains",
    label: "Eastern Highlands",
    title: "Pare & Uluguru Mountain Hikes",
    desc: "Off-the-beaten-track day trips and multi-day hikes in the Eastern Arc mountains.",
  },
];

function absUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return BASE + (path.startsWith("/") ? path : `/${path}`);
}

function serialize(obj, indent = 0) {
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
    .replace(/shar-\d+brig-\d+[^.]*(?=\.(?:jpg|jpeg|png|webp))/i, "")
    .replace(/_c\d+(?=\.(?:jpg|jpeg|png|webp))/i, "");
}

function imageKey(url) {
  const file = url.split("/").pop()?.split("?")[0] || url;
  return cleanUploadFilename(file).toLowerCase();
}

function uploadsCandidates(rawUrl) {
  const url = absUrl(rawUrl);
  if (!url.startsWith(`${BASE}/images/`)) return [];

  const candidates = [];
  if (url.includes("/images/uploads/")) {
    const file = url.split("/images/uploads/")[1]?.split("?")[0];
    if (file) {
      candidates.push(`${BASE}/images/uploads/${file}`);
      const cleaned = cleanUploadFilename(file);
      if (cleaned !== file) candidates.push(`${BASE}/images/uploads/${cleaned}`);
    }
  }
  if (url.includes("/images/made/")) {
    const match = url.match(/\/images\/uploads\/([^/?"'\\s]+)/i);
    if (match) {
      candidates.push(`${BASE}/images/uploads/${cleanUploadFilename(match[1])}`);
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

async function fetchListingCards() {
  const combined = new Map();

  for (const base of LISTINGS) {
    for (const suffix of ["", "/P16", "/P32", "/P48"]) {
      const url = base + suffix;
      const res = await fetch(url, {
        headers: { "User-Agent": "Mozilla/5.0 (compatible; MatemboSafarisImport/1.0)" },
      });
      if (!res.ok) break;

      const html = await res.text();
      let match;
      let found = 0;
      while ((match = CARD_RE.exec(html))) {
        const slug = match[1].split("/safari/")[1];
        if (combined.has(slug)) continue;
        combined.set(slug, {
          slug,
          sourceUrl: match[1],
          listingImage: match[2],
          listingDuration: match[3].trim(),
          listingTitle: match[4].replace(/&amp;/g, "&").trim(),
        });
        found++;
      }
      CARD_RE.lastIndex = 0;
      if (!found) break;
    }
  }

  return [...combined.values()];
}

function assignSectionId(pkg, listingDuration) {
  const title = pkg.title.toLowerCase();
  const dur = (listingDuration || pkg.duration || "").toLowerCase();

  if (/meru/i.test(title)) return "mount-meru";
  if (/lengai|oldoinyo|ngorongoro highlands/i.test(title)) return "lengai-highlands";
  if (/pare|uluguru|choma/i.test(title)) return "eastern-mountains";

  if (/day hike/i.test(dur)) return "kilimanjaro-day-hikes";

  const dayMatch = dur.match(/(\d+)\s*days?/i) || pkg.duration?.match(/(\d+)/);
  const days = dayMatch ? Number(dayMatch[1]) : 0;

  if (days >= 8) return "kilimanjaro-8-9-days";
  if (days === 7) return "kilimanjaro-7-days";
  if (days === 6) return "kilimanjaro-6-days";
  if (days >= 4 && days <= 5) return "kilimanjaro-4-5-days";

  return "eastern-mountains";
}

function reorderGallery(gallery, heroSrc) {
  if (!heroSrc) return gallery;
  const heroKey = imageKey(heroSrc);
  const rest = gallery.filter((item) => imageKey(item.src) !== heroKey);
  const heroItem = gallery.find((item) => imageKey(item.src) === heroKey);
  const lead = heroItem || { src: heroSrc, alt: gallery[0]?.alt || "" };
  return [lead, ...rest];
}

async function resolveListingImage(listingImage, gallery, baseImage, cache) {
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

async function buildTrekkingPackage(basePkg, listing, imageCache) {
  const gallery = basePkg.gallery || [{ src: basePkg.image, alt: basePkg.alt }];
  const listingResolved = await resolveListingImage(
    listing.listingImage,
    gallery,
    basePkg.image,
    imageCache
  );
  const orderedGallery = reorderGallery(gallery, listingResolved);
  const sectionId = assignSectionId(basePkg, listing.listingDuration);

  return {
    ...basePkg,
    sectionId,
    duration: listing.listingDuration || basePkg.duration,
    image: listingResolved,
    alt: basePkg.alt || listing.listingTitle,
    gallery: orderedGallery,
    listingImage: listingResolved,
    listingOrder: listing.order,
  };
}

async function main() {
  console.log("Fetching TTB climbing & trekking listings…");
  const listings = await fetchListingCards();
  listings.forEach((item, i) => {
    item.order = i;
  });
  console.log(`Found ${listings.length} treks in source order`);

  const { safariPackages } = await import(pathToFileURL(SAFARI_DATA).href);
  const byId = new Map(safariPackages.map((pkg) => [pkg.id, pkg]));

  const missing = listings.filter((item) => !byId.has(item.slug));
  if (missing.length) {
    console.warn(
      `⚠ Missing ${missing.length} packages in safari-packages.js — run npm run import:safaris first:`
    );
    missing.forEach((item) => console.warn(`  - ${item.slug}`));
  }

  const imageCache = new Map();
  const trekkingPackages = [];

  for (const listing of listings) {
    const base = byId.get(listing.slug);
    if (!base) continue;
    const pkg = await buildTrekkingPackage(base, listing, imageCache);
    trekkingPackages.push(pkg);
    console.log(`  ✓ [${listing.order + 1}/${listings.length}] ${pkg.title}`);
  }

  const sectionOrder = SECTIONS.map((s) => s.id);
  const trekkingSections = SECTIONS.map((section) => ({
    ...section,
    packageIds: trekkingPackages.filter((pkg) => pkg.sectionId === section.id).map((pkg) => pkg.id),
  })).filter((section) => section.packageIds.length > 0);

  const file = `/** Auto-generated from tanzaniatourism.com — run: npm run import:trekkings */
export const TTB_TREKKING_URLS = ${JSON.stringify(LISTINGS)};

export const trekkingPackagesMeta = {
  count: ${trekkingPackages.length},
  sourceUrls: ${JSON.stringify(LISTINGS)},
  importedAt: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
};

export const trekkingSectionOrder = ${JSON.stringify(sectionOrder.filter((id) => trekkingSections.some((s) => s.id === id)))};

export const trekkingSections = ${serialize(trekkingSections, 1)};

export const trekkingPackages = ${serialize(trekkingPackages, 1)};

/** @param {string} id */
export function getTrekkingPackageById(id) {
  return trekkingPackages.find((pkg) => pkg.id === id) ?? null;
}

/** Card-ready list in TTB listing order */
export const trekkingPackageCards = trekkingPackages;
`;

  writeFileSync(OUT, file, "utf8");
  console.log(`\nExported ${trekkingPackages.length} treks → ${OUT}`);
  console.log(
    "Sections:",
    trekkingSections.map((s) => `${s.title} (${s.packageIds.length})`).join(" · ")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
