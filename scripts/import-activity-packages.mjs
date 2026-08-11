/**
 * Curated activity collections from TTB activity pages:
 * - Bird Watching (15)
 * - Chimpanzee Watching (10 — TTB lists 5; supplemented with primate forest routes)
 * - Night Game Drives (5 — TTB lists 1; supplemented from night/evening drive itineraries)
 * - Cultural Visits (13 from TTB cultural-visits listing)
 *
 * Run: npm run import:activities
 */

import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
  serialize,
  fetchSafariListing,
  buildCuratedPackage,
} from "./lib/ttb-safari-cards.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const SAFARI_DATA = join(ROOT, "src/data/safari-packages.js");
const OUT = join(ROOT, "src/data/activity-packages.js");

const SOURCES = {
  "bird-watching": "https://www.tanzaniatourism.com/activities/bird-watching",
  "chimpanzee-watching": "https://www.tanzaniatourism.com/activities/chimpazee-watching",
  "night-game-drives": "https://www.tanzaniatourism.com/activities/night-game-drives",
  "cultural-visits": "https://www.tanzaniatourism.com/activities/cultural-visits",
};

const TARGET_COUNTS = {
  "bird-watching": 15,
  "chimpanzee-watching": 10,
  "night-game-drives": 5,
  "cultural-visits": 13,
};

const CHIMP_SUPPLEMENT_IDS = [
  "jozani-chwaka-bay-national-park",
  "day-trip-to-arusha-national-park",
  "3-days-safari-to-udzungwa-mikumi-national-parks",
  "4-days-safari-to-mikumi-and-udzungwa-national-parks",
  "7-days-safari-to-ruaha-udzungwa-and-mikumi-national-parks",
];

const NIGHT_SUPPLEMENT_IDS = [
  "4-days-safari-in-ruaha-national-park",
  "4-days-to-tarangire-serengeti-national-parks-and-ngorongoro-crater",
  "4-days-to-serengeti-national-park-and-ngorongoro-crater",
  "7-days-manyara-serengeti-ngorongoro-crater-and-tarangire-safari",
];

const COLLECTION_META = {
  "bird-watching": {
    label: "Bird Watching",
    heroTitle: "Tanzania Birding Safaris",
    heroScript: "Forest Endemics to Flamingo Lakes",
    heroLead:
      "Fifteen curated bird-watching itineraries from Tanzania Tourism — day trips through multi-day routes across northern parks, crater highlands and western lakes.",
    pagePath: "/bird-watching.html",
  },
  "chimpanzee-watching": {
    label: "Chimpanzee Watching",
    heroTitle: "Chimp & Primate Safaris",
    heroScript: "Gombe, Mahale & Forest Treks",
    heroLead:
      "Track wild chimpanzees on Lake Tanganyika shores and combine with Tanzania's best primate forest routes — sourced from Tanzania Tourism.",
    pagePath: "/activities/chimpanzee-watching.html",
  },
  "night-game-drives": {
    label: "Night Game Drives",
    heroTitle: "After-Dark Wildlife",
    heroScript: "Nocturnal Predators & Bush Nights",
    heroLead:
      "Five safaris with night or extended evening game drives — from Serengeti corridors to Ruaha's predator nights.",
    pagePath: "/night-game-drives.html",
  },
  "cultural-visits": {
    label: "Cultural Visits",
    heroTitle: "Culture & Community",
    heroScript: "Villages, Coast & Heritage",
    heroLead:
      "Thirteen cultural itineraries from Tanzania Tourism — coffee tours and highland villages to Stone Town, Bagamoyo and Maasai rift-valley routes.",
    pagePath: "/cultural-visits.html",
  },
};

const SECTIONS = {
  "bird-watching": [
    {
      id: "northern-day-trips",
      label: "Day Trips",
      title: "Northern Park Birding Days",
      desc: "Crater rims, Momella lakes, Tarangire baobabs and highland forest — compact days rich in species.",
    },
    {
      id: "northern-safaris",
      label: "Multi-Day",
      title: "Northern Birding Safaris",
      desc: "Two- to four-day routes linking Serengeti, Ngorongoro, Tarangire and Manyara for varied habitats.",
    },
    {
      id: "lakes-western",
      label: "Lakes & Western",
      title: "Lakes & Western Circuit",
      desc: "Gombe streams, Lake Jipe wetlands and volcanic Lake Chala — specialty birding beyond the northern loop.",
    },
  ],
  "chimpanzee-watching": [
    {
      id: "gombe-mahale",
      label: "Chimp Tracking",
      title: "Gombe & Mahale Mountains",
      desc: "Day trips and multi-day treks to Tanzania's legendary chimpanzee habitats on Lake Tanganyika.",
    },
    {
      id: "primate-forests",
      label: "Forest Primates",
      title: "Forest Primate Routes",
      desc: "Colobus monkeys, Udzungwa forest hikes and complementary primate experiences across Tanzania.",
    },
  ],
  "night-game-drives": [
    {
      id: "northern-night",
      label: "Northern Circuit",
      title: "Northern Night & Evening Drives",
      desc: "Serengeti, Tarangire and Ngorongoro routes with dedicated night or late-evening game drives.",
    },
    {
      id: "southern-night",
      label: "Southern Circuit",
      title: "Southern & Ruaha Nights",
      desc: "Ruaha predator nights and remote southern parks where nocturnal wildlife comes alive.",
    },
  ],
  "cultural-visits": [
    {
      id: "highlands-villages",
      label: "Highlands",
      title: "Highland Villages & Coffee",
      desc: "Materuni coffee tours, Pare and Uluguru mountain hikes with local community encounters.",
    },
    {
      id: "rift-maasai",
      label: "Rift Valley",
      title: "Maasai Land & Rift Safaris",
      desc: "Lake Natron, Engaruka ruins and multi-day routes through Maasai country and the Great Rift.",
    },
    {
      id: "coast-heritage",
      label: "Coast & Heritage",
      title: "Swahili Coast & Heritage",
      desc: "Stone Town walks, Bagamoyo history, Tongoni ruins and island cultural experiences.",
    },
  ],
};

function circuitToBirdSection(slug = "", circuit = "") {
  const value = `${slug} ${circuit}`.toLowerCase();
  if (/gombe|lake-jipe|lake-chala|mahale|kigoma|western/.test(value)) return "lakes-western";
  if (/day-trip|day-hike|day hike/.test(value)) return "northern-day-trips";
  return "northern-safaris";
}

function assignBirdSection(pkg, index) {
  const fromMeta = circuitToBirdSection(pkg.slug, pkg.circuit);
  if (fromMeta === "lakes-western") return fromMeta;
  if (/day-trip|day-hike/.test(pkg.slug)) return "northern-day-trips";
  if (index < 9) return "northern-day-trips";
  return "northern-safaris";
}

function assignChimpSection(slug) {
  if (CHIMP_SUPPLEMENT_IDS.includes(slug)) return "primate-forests";
  return "gombe-mahale";
}

function assignNightSection(slug, circuit = "") {
  const value = `${slug} ${circuit}`.toLowerCase();
  if (/ruaha|mikumi|nyerere|southern/.test(value)) return "southern-night";
  return "northern-night";
}

function assignCulturalSection(slug = "") {
  const value = slug.toLowerCase();
  if (/stone-town|nungwi|bagamoyo|tongoni|jibondo|mafia/.test(value)) return "coast-heritage";
  if (/natron|engaruka|rift-valley|oldoinyo-lengai/.test(value)) return "rift-maasai";
  return "highlands-villages";
}

function pseudoListing(base, order = 0) {
  return {
    slug: base.id,
    listingImage: base.image,
    listingDuration: base.duration,
    listingTitle: base.title,
    order,
  };
}

function packageNightScore(pkg) {
  const blob = JSON.stringify(pkg).toLowerCase();
  let score = 0;
  if ((pkg.activities || []).includes("Night Game Drives")) score += 100;
  if (/night game drive/.test(blob)) score += 50;
  if (/evening game drive|sunset game drive|nocturnal/.test(blob)) score += 20;
  return score;
}

async function buildFromListing(listing, byId, imageCache, assignSection) {
  const base = byId.get(listing.slug);
  if (!base) {
    console.warn(`  ⚠ Missing TTB detail for ${listing.slug} — run npm run import:safaris`);
    return null;
  }
  const sectionId = assignSection(base, listing.order);
  return buildCuratedPackage(base, listing, imageCache, sectionId);
}

async function buildFromBase(base, imageCache, sectionId, order) {
  return buildCuratedPackage(base, pseudoListing(base, order), imageCache, sectionId);
}

async function collectBirdPackages(byId, imageCache) {
  const listings = await fetchSafariListing(SOURCES["bird-watching"], 2);
  const picked = listings.slice(0, TARGET_COUNTS["bird-watching"]);
  const packages = [];

  for (let i = 0; i < picked.length; i++) {
    const listing = { ...picked[i], order: i };
    const pkg = await buildFromListing(listing, byId, imageCache, (base) =>
      assignBirdSection(base, i)
    );
    if (pkg) packages.push(pkg);
  }

  return { packages, listingCount: listings.length };
}

async function collectChimpPackages(byId, imageCache) {
  const listings = await fetchSafariListing(SOURCES["chimpanzee-watching"], 2);
  const packages = [];
  const used = new Set();

  for (let i = 0; i < listings.length; i++) {
    const listing = { ...listings[i], order: i };
    const pkg = await buildFromListing(listing, byId, imageCache, (base) =>
      assignChimpSection(base.slug)
    );
    if (pkg) {
      packages.push(pkg);
      used.add(pkg.id);
    }
  }

  for (const id of CHIMP_SUPPLEMENT_IDS) {
    if (packages.length >= TARGET_COUNTS["chimpanzee-watching"]) break;
    if (used.has(id)) continue;
    const base = byId.get(id);
    if (!base) continue;
    packages.push(await buildFromBase(base, imageCache, "primate-forests", packages.length));
    used.add(id);
  }

  return { packages: packages.slice(0, TARGET_COUNTS["chimpanzee-watching"]), listingCount: listings.length };
}

async function collectNightPackages(byId, imageCache) {
  const listings = await fetchSafariListing(SOURCES["night-game-drives"], 2);
  const packages = [];
  const used = new Set();

  for (let i = 0; i < listings.length; i++) {
    const listing = { ...listings[i], order: i };
    const pkg = await buildFromListing(listing, byId, imageCache, (base) =>
      assignNightSection(base.slug, base.circuit)
    );
    if (pkg) {
      packages.push(pkg);
      used.add(pkg.id);
    }
  }

  for (const id of NIGHT_SUPPLEMENT_IDS) {
    if (packages.length >= TARGET_COUNTS["night-game-drives"]) break;
    if (used.has(id)) continue;
    const base = byId.get(id);
    if (!base) continue;
    packages.push(
      await buildFromBase(
        base,
        imageCache,
        assignNightSection(base.slug, base.circuit),
        packages.length
      )
    );
    used.add(id);
  }

  if (packages.length < TARGET_COUNTS["night-game-drives"]) {
    const extras = [...byId.values()]
      .filter((pkg) => !used.has(pkg.id))
      .map((pkg) => ({ pkg, score: packageNightScore(pkg) }))
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    for (const { pkg } of extras) {
      if (packages.length >= TARGET_COUNTS["night-game-drives"]) break;
      packages.push(
        await buildFromBase(
          pkg,
          imageCache,
          assignNightSection(pkg.slug, pkg.circuit),
          packages.length
        )
      );
      used.add(pkg.id);
    }
  }

  return { packages: packages.slice(0, TARGET_COUNTS["night-game-drives"]), listingCount: listings.length };
}

async function collectCulturalPackages(byId, imageCache) {
  const listings = await fetchSafariListing(SOURCES["cultural-visits"], 2);
  const picked = listings.slice(0, TARGET_COUNTS["cultural-visits"]);
  const packages = [];

  for (let i = 0; i < picked.length; i++) {
    const listing = { ...picked[i], order: i };
    const pkg = await buildFromListing(listing, byId, imageCache, (base) =>
      assignCulturalSection(base.slug)
    );
    if (pkg) packages.push(pkg);
  }

  return { packages, listingCount: listings.length };
}

function mergeUniquePackages(groups) {
  const merged = [];
  const seen = new Set();
  for (const group of groups) {
    for (const pkg of group) {
      if (seen.has(pkg.id)) continue;
      seen.add(pkg.id);
      merged.push(pkg);
    }
  }
  return merged;
}

function buildSections(collectionId, packages) {
  const defs = SECTIONS[collectionId] || [];
  return defs
    .map((section) => ({
      ...section,
      packageIds: packages.filter((pkg) => pkg.sectionId === section.id).map((pkg) => pkg.id),
    }))
    .filter((section) => section.packageIds.length > 0);
}

async function main() {
  const { safariPackages } = await import(pathToFileURL(SAFARI_DATA).href);
  const byId = new Map(safariPackages.map((pkg) => [pkg.id, pkg]));
  const imageCache = new Map();

  console.log("Fetching bird watching listings…");
  const bird = await collectBirdPackages(byId, imageCache);
  console.log(`  TTB cards: ${bird.listingCount} → curated: ${bird.packages.length}`);

  console.log("\nFetching chimpanzee watching listings…");
  const chimp = await collectChimpPackages(byId, imageCache);
  console.log(`  TTB cards: ${chimp.listingCount} → curated: ${chimp.packages.length}`);

  console.log("\nFetching night game drive listings…");
  const night = await collectNightPackages(byId, imageCache);
  console.log(`  TTB cards: ${night.listingCount} → curated: ${night.packages.length}`);

  console.log("\nFetching cultural visits listings…");
  const cultural = await collectCulturalPackages(byId, imageCache);
  console.log(`  TTB cards: ${cultural.listingCount} → curated: ${cultural.packages.length}`);

  const collections = {
    "bird-watching": {
      ...COLLECTION_META["bird-watching"],
      sourceUrl: SOURCES["bird-watching"],
      targetCount: TARGET_COUNTS["bird-watching"],
      ttbListingCount: bird.listingCount,
      packages: bird.packages,
      sections: buildSections("bird-watching", bird.packages),
    },
    "chimpanzee-watching": {
      ...COLLECTION_META["chimpanzee-watching"],
      sourceUrl: SOURCES["chimpanzee-watching"],
      targetCount: TARGET_COUNTS["chimpanzee-watching"],
      ttbListingCount: chimp.listingCount,
      packages: chimp.packages,
      sections: buildSections("chimpanzee-watching", chimp.packages),
    },
    "night-game-drives": {
      ...COLLECTION_META["night-game-drives"],
      sourceUrl: SOURCES["night-game-drives"],
      targetCount: TARGET_COUNTS["night-game-drives"],
      ttbListingCount: night.listingCount,
      packages: night.packages,
      sections: buildSections("night-game-drives", night.packages),
    },
    "cultural-visits": {
      ...COLLECTION_META["cultural-visits"],
      sourceUrl: SOURCES["cultural-visits"],
      targetCount: TARGET_COUNTS["cultural-visits"],
      ttbListingCount: cultural.listingCount,
      packages: cultural.packages,
      sections: buildSections("cultural-visits", cultural.packages),
    },
  };

  const allPackages = mergeUniquePackages([
    bird.packages,
    chimp.packages,
    night.packages,
    cultural.packages,
  ]);

  const body = `/** Auto-generated — run: npm run import:activities */

export const ACTIVITY_SOURCE_URLS = ${JSON.stringify(SOURCES, null, 2)};

export const activityPackagesMeta = {
  importedAt: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
  collections: {
    "bird-watching": { count: ${bird.packages.length}, ttbListingCount: ${bird.listingCount} },
    "chimpanzee-watching": { count: ${chimp.packages.length}, ttbListingCount: ${chimp.listingCount} },
    "night-game-drives": { count: ${night.packages.length}, ttbListingCount: ${night.listingCount} },
    "cultural-visits": { count: ${cultural.packages.length}, ttbListingCount: ${cultural.listingCount} },
  },
};

export const activityCollections = ${JSON.stringify(
    Object.fromEntries(
      Object.entries(collections).map(([id, col]) => [
        id,
        {
          id,
          label: col.label,
          heroTitle: col.heroTitle,
          heroScript: col.heroScript,
          heroLead: col.heroLead,
          pagePath: col.pagePath,
          sourceUrl: col.sourceUrl,
          targetCount: col.targetCount,
          ttbListingCount: col.ttbListingCount,
          sectionOrder: col.sections.map((s) => s.id),
          sections: col.sections,
          packageIds: col.packages.map((p) => p.id),
        },
      ])
    ),
    null,
    2
  )};

export const activityPackages = ${serialize(allPackages, 1)};

export function getActivityCollection(id) {
  return activityCollections[id] ?? null;
}

export function getActivityPackagesForCollection(id) {
  const collection = getActivityCollection(id);
  if (!collection) return [];
  const idSet = new Set(collection.packageIds);
  return activityPackages.filter((pkg) => idSet.has(pkg.id));
}

export function getActivityPackageById(id) {
  return activityPackages.find((pkg) => pkg.id === id) ?? null;
}
`;

  writeFileSync(OUT, body, "utf8");
  console.log(`\nExported → ${OUT}`);
  console.log("\nSummary:");
  for (const [id, col] of Object.entries(collections)) {
    console.log(
      `  ${col.label}: ${col.packages.length} packages (${col.sections.map((s) => `${s.title} ${s.packageIds.length}`).join(" · ")})`
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
