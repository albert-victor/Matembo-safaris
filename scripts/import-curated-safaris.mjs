/**
 * Import curated safari collections:
 * - Matembo featured packages (TripAdvisor seeds → TTB itineraries)
 * - Game drive packages (TTB activities + safaris/game-drives)
 * - Ruaha National Park packages (destination + southern circuit)
 *
 * Run: npm run import:curated
 */

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  TTB_BASE,
  serialize,
  fetchSafariListing,
  buildCuratedPackage,
  parseDurationDays,
} from "./lib/ttb-safari-cards.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SEEDS_PATH = join(__dirname, "data/matembo-tripadvisor-seeds.json");
const SAFARI_DATA = join(ROOT, "src/data/safari-packages.js");
const TRIPADVISOR_URL =
  "https://www.tripadvisor.com/Attraction_Review-g297913-d29014688-Reviews-MATEMBO_SAFARIS_AND_TOURS-Arusha_Arusha_Region.html";

const GAME_DRIVE_LISTINGS = [
  `${TTB_BASE}/activities/game-drives`,
  `${TTB_BASE}/safaris/game-drives`,
];

const RUAHA_LISTINGS = [
  `${TTB_BASE}/destination/ruaha-national-park`,
  `${TTB_BASE}/safaris/southern-circuit`,
];

const GAME_DRIVE_SECTIONS = [
  {
    id: "northern-circuit",
    label: "Northern Circuit",
    title: "Northern Game Drives",
    desc: "Serengeti, Ngorongoro, Tarangire, Manyara and Arusha day trips — Tanzania's classic wildlife routes.",
  },
  {
    id: "southern-circuit",
    label: "Southern Circuit",
    title: "Southern Game Drives",
    desc: "Ruaha, Nyerere, Mikumi and Katavi — wild southern parks best reached from Iringa and Dar es Salaam.",
  },
  {
    id: "eastern-circuit",
    label: "Eastern Circuit",
    title: "Eastern Game Drives",
    desc: "Mikumi, Saadani bush-beach combos and Swahili coast extensions with wildlife drives.",
  },
];

const RUAHA_SECTIONS = [
  {
    id: "ruaha-only",
    label: "Ruaha Only",
    title: "Ruaha National Park Safaris",
    desc: "Two to four days focused on the Great Ruaha River, wild dogs and Tanzania's largest elephant herds.",
  },
  {
    id: "ruaha-combined",
    label: "Combined Routes",
    title: "Ruaha + Southern Parks",
    desc: "Multi-park itineraries linking Ruaha with Mikumi, Udzungwa and Nyerere.",
  },
];

function circuitToSectionId(circuit = "") {
  const value = circuit.toLowerCase();
  if (value.includes("southern")) return "southern-circuit";
  if (value.includes("eastern")) return "eastern-circuit";
  return "northern-circuit";
}

function assignRuahaSectionId(title = "", slug = "") {
  const value = `${title} ${slug}`.toLowerCase();
  if (/mikumi|nyerere|udzungwa/.test(value)) return "ruaha-combined";
  return "ruaha-only";
}

function isRuahaPackage(pkg) {
  const text = `${pkg.title} ${pkg.slug} ${(pkg.destinations || []).join(" ")}`.toLowerCase();
  return text.includes("ruaha");
}

async function mergeListings(listingUrls) {
  const combined = new Map();
  for (const url of listingUrls) {
    const cards = await fetchSafariListing(url);
    for (const card of cards) {
      if (!combined.has(card.slug)) combined.set(card.slug, card);
    }
    console.log(`  ${url} → ${cards.length} cards (${combined.size} unique)`);
  }
  return [...combined.values()];
}

async function tryTripAdvisorFetch() {
  try {
    const res = await fetch(TRIPADVISOR_URL, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
    });
    return { ok: res.ok, status: res.status, html: res.ok ? await res.text() : "" };
  } catch (err) {
    return { ok: false, status: 0, error: err.message };
  }
}

function buildMatemboFeatured(seeds, byId, listingBySlug) {
  return seeds.packages
    .map((seed, order) => {
      const base = byId.get(seed.ttbSlug);
      if (!base) {
        console.warn(`⚠ Matembo seed missing TTB package: ${seed.ttbSlug}`);
        return null;
      }

      const listing = listingBySlug.get(seed.ttbSlug);
      const pkg = {
        ...base,
        matemboLabel: seed.matemboLabel || base.title,
        matemboPitch: seed.pitch || base.highlights?.[0] || "",
        badge: seed.badge || base.badge,
        source: "tripadvisor-seed",
        sourceUrl: TRIPADVISOR_URL,
        ttbSlug: seed.ttbSlug,
        listingOrder: order,
      };

      if (listing) {
        pkg.duration = listing.listingDuration || pkg.duration;
        pkg.listingTitle = listing.listingTitle;
      }

      return pkg;
    })
    .filter(Boolean);
}

function writeDataFile(path, header, body) {
  writeFileSync(path, `${header}\n${body}\n`, "utf8");
  console.log(`Exported → ${path}`);
}

async function main() {
  console.log("Checking TripAdvisor listing…");
  const tripAdvisor = await tryTripAdvisorFetch();
  if (tripAdvisor.ok) {
    console.log(`  TripAdvisor reachable (${tripAdvisor.html.length} bytes) — using seed mapping for packages.`);
  } else {
    console.warn(
      `  TripAdvisor returned HTTP ${tripAdvisor.status || "error"} — using scripts/data/matembo-tripadvisor-seeds.json`
    );
  }

  const seeds = JSON.parse(readFileSync(SEEDS_PATH, "utf8"));
  const { safariPackages } = await import(pathToFileURL(SAFARI_DATA).href);
  const byId = new Map(safariPackages.map((pkg) => [pkg.id, pkg]));

  console.log("\nFetching game drive listings…");
  const gameDriveListings = await mergeListings(GAME_DRIVE_LISTINGS);

  console.log("\nFetching Ruaha listings…");
  const ruahaListings = await mergeListings(RUAHA_LISTINGS);
  const ruahaListingCards = ruahaListings.filter((card) => {
    const base = byId.get(card.slug);
    return base && isRuahaPackage(base);
  });

  const listingBySlug = new Map(
    [...gameDriveListings, ...ruahaListingCards].map((card) => [card.slug, card])
  );

  const imageCache = new Map();

  console.log("\nBuilding game drive packages…");
  gameDriveListings.forEach((item, i) => {
    item.order = i;
  });

  const gameDrivePackages = [];
  for (const listing of gameDriveListings) {
    const base = byId.get(listing.slug);
    if (!base) {
      console.warn(`  ⚠ Missing TTB detail for ${listing.slug} — run npm run import:safaris`);
      continue;
    }
    const sectionId = circuitToSectionId(base.circuit);
    const pkg = await buildCuratedPackage(base, listing, imageCache, sectionId);
    gameDrivePackages.push(pkg);
  }

  console.log("\nBuilding Ruaha packages…");
  ruahaListingCards.forEach((item, i) => {
    item.order = i;
  });

  const ruahaSafariPackages = [];
  for (const listing of ruahaListingCards) {
    const base = byId.get(listing.slug);
    if (!base) continue;
    const sectionId = assignRuahaSectionId(base.title, base.slug);
    const pkg = await buildCuratedPackage(base, listing, imageCache, sectionId);
    ruahaSafariPackages.push(pkg);
    console.log(`  ✓ ${pkg.title}`);
  }

  console.log("\nBuilding Matembo featured packages…");
  const matemboFeaturedPackages = buildMatemboFeatured(seeds, byId, listingBySlug);
  for (const pkg of matemboFeaturedPackages) {
    const listing = listingBySlug.get(pkg.id);
    if (listing) {
      const enriched = await buildCuratedPackage(pkg, listing, imageCache, pkg.sectionId || "featured");
      Object.assign(pkg, {
        image: enriched.image,
        gallery: enriched.gallery,
        listingImage: enriched.listingImage,
        duration: enriched.duration,
      });
    }
    console.log(`  ✓ ${pkg.matemboLabel} → ${pkg.title}`);
  }

  const gameDriveSections = GAME_DRIVE_SECTIONS.map((section) => ({
    ...section,
    packageIds: gameDrivePackages.filter((pkg) => pkg.sectionId === section.id).map((pkg) => pkg.id),
  })).filter((section) => section.packageIds.length > 0);

  const ruahaSections = RUAHA_SECTIONS.map((section) => ({
    ...section,
    packageIds: ruahaSafariPackages.filter((pkg) => pkg.sectionId === section.id).map((pkg) => pkg.id),
  })).filter((section) => section.packageIds.length > 0);

  const gameDriveOut = join(ROOT, "src/data/game-drive-packages.js");
  writeDataFile(
    gameDriveOut,
    `/** Auto-generated — run: npm run import:curated */`,
    `export const TTB_GAME_DRIVES_URLS = ${JSON.stringify(GAME_DRIVE_LISTINGS)};

export const gameDrivePackagesMeta = {
  count: ${gameDrivePackages.length},
  sourceUrls: ${JSON.stringify(GAME_DRIVE_LISTINGS)},
  importedAt: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
};

export const gameDriveSectionOrder = ${JSON.stringify(gameDriveSections.map((s) => s.id))};

export const gameDriveSections = ${serialize(gameDriveSections, 1)};

export const gameDrivePackages = ${serialize(gameDrivePackages, 1)};

export function getGameDrivePackageById(id) {
  return gameDrivePackages.find((pkg) => pkg.id === id) ?? null;
}
`
  );

  const ruahaOut = join(ROOT, "src/data/ruaha-safari-packages.js");
  writeDataFile(
    ruahaOut,
    `/** Auto-generated — run: npm run import:curated */`,
    `export const TTB_RUAHA_URLS = ${JSON.stringify(RUAHA_LISTINGS)};

export const ruahaSafariPackagesMeta = {
  count: ${ruahaSafariPackages.length},
  sourceUrls: ${JSON.stringify(RUAHA_LISTINGS)},
  importedAt: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
};

export const ruahaSectionOrder = ${JSON.stringify(ruahaSections.map((s) => s.id))};

export const ruahaSections = ${serialize(ruahaSections, 1)};

export const ruahaSafariPackages = ${serialize(ruahaSafariPackages, 1)};

export function getRuahaSafariPackageById(id) {
  return ruahaSafariPackages.find((pkg) => pkg.id === id) ?? null;
}
`
  );

  const matemboOut = join(ROOT, "src/data/matembo-featured-packages.js");
  writeDataFile(
    matemboOut,
    `/** Auto-generated — run: npm run import:curated */`,
    `export const TRIPADVISOR_URL = ${JSON.stringify(TRIPADVISOR_URL)};

export const matemboFeaturedMeta = {
  count: ${matemboFeaturedPackages.length},
  operator: ${JSON.stringify(seeds.operator.name)},
  location: ${JSON.stringify(seeds.operator.location)},
  tripAdvisorStatus: ${JSON.stringify(tripAdvisor.ok ? "reachable" : `blocked-${tripAdvisor.status || "error"}`)},
  importedAt: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
  note: ${JSON.stringify(seeds.operator.note)},
};

export const matemboFeaturedPackageIds = ${JSON.stringify(matemboFeaturedPackages.map((p) => p.id))};

export const matemboFeaturedPackages = ${serialize(matemboFeaturedPackages, 1)};

export function getMatemboFeaturedPackageById(id) {
  return matemboFeaturedPackages.find((pkg) => pkg.id === id) ?? null;
}
`
  );

  console.log("\nSummary:");
  console.log(
    `  Game drives: ${gameDrivePackages.length} (${gameDriveSections.map((s) => `${s.title} ${s.packageIds.length}`).join(" · ")})`
  );
  console.log(
    `  Ruaha: ${ruahaSafariPackages.length} (${ruahaSections.map((s) => `${s.title} ${s.packageIds.length}`).join(" · ")})`
  );
  console.log(`  Matembo featured (TripAdvisor seeds): ${matemboFeaturedPackages.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
