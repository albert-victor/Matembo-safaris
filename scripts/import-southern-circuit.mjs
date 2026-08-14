import { writeFileSync, mkdirSync } from "node:fs";
import { extractListingCards as parseListingCards } from "./lib/ttb-listing.mjs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/southern-circuit-destinations.js");
const PAGES_DIR = join(ROOT, "destinations");

const BASE = "https://www.tanzaniatourism.com";
const SOURCE_PAGE = `${BASE}/destinations/southern-circuit`;
const MAX_GALLERY = 12;
const MIN_GALLERY = 4;
const CARD_IMAGES = 3;

/** Matembo is based in Iringa – import all non-northern TTB circuits we operate from the south. */
const LISTING_SOURCES = [
  {
    name: "Southern Circuit",
    listing: `${BASE}/destinations/southern-circuit`,
    paginationPath: "/destinations/southern-circuit",
    circuitLabelFilter: "Southern Circuit",
    circuit: "southern",
    circuitLabel: "Southern Circuit",
    region: "Southern Tanzania",
  },
  {
    name: "Eastern Circuit",
    listing: `${BASE}/destinations/eastern-circuit`,
    paginationPath: "/destinations/eastern-circuit",
    circuitLabelFilter: "Eastern Circuit",
    circuit: "eastern",
    circuitLabel: "Eastern Circuit",
    region: "Eastern Tanzania",
  },
  {
    name: "Western Circuit",
    listing: `${BASE}/destinations/western-circuit`,
    paginationPath: "/destinations/western-circuit",
    circuitLabelFilter: "Western Circuit",
    circuit: "western",
    circuitLabel: "Western Circuit",
    region: "Western Tanzania",
  },
];

const SCRIPT_LABELS = {
  ruaha: "Wild Heart of the South",
  nyerere: "Rivers & Wilderness",
  kitulo: "Botanical Highlands",
  katavi: "Remote Plains",
  "kalambo-falls": "Ancient Falls",
  "mbozi-meteorite": "Cosmic Heritage",
  "lake-ngozi": "Crater Lake",
  "kaporogwe-falls": "Highland Cascades",
  "matema-beach": "Lake Shore Escape",
  "lake-nyasa": "Freshwater Frontier",
  "mnazi-bay": "Coastal Marine Park",
  igeleke: "Rock Art Gallery",
  isimila: "Stone Age Trail",
  mikumi: "Wildlife Gateway",
  udzungwa: "Waterfall Highlands",
  saadani: "Bush Meets Beach",
  usambara: "Cloud Forest Trails",
  amani: "Forest Reserves",
  uluguru: "Mountain Escapes",
  kilwa: "Swahili Coast History",
  "kilwa-kisiwani": "UNESCO Heritage",
  "songo-mnara": "Ancient Port Ruins",
  "kilwa-kivinje": "Historic Fishing Town",
  pangani: "Coastal Heritage",
  bagamoyo: "Slave Route History",
  kunduchi: "Coastal Ruins",
  gombe: "Chimpanzee Trails",
  mahale: "Lake Tanganyika Wilds",
  saanane: "Island Wildlife",
  rubondo: "Lake Victoria Island",
  ukerewe: "Lake Culture",
  "burigi-chato": "Northern Lakes Safari",
  "ibanda-kyerwa": "Border Wildlands",
  "lake-tanganyika": "Great Rift Lake",
  "lake-victoria": "Africa's Largest Lake",
};

function absUrl(path) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return BASE + (path.startsWith("/") ? path : `/${path}`);
}

function isTtbImage(url) {
  return typeof url === "string" && url.startsWith(`${BASE}/images/`);
}

function stripHtml(html = "") {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&lsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function slugToId(slug) {
  const map = {
    "ruaha-national-park": "ruaha",
    "nyerere-national-park": "nyerere",
    "kitulo-national-park": "kitulo",
    "katavi-national-park": "katavi",
    "kalambo-falls": "kalambo-falls",
    "mbozi-meteorite": "mbozi-meteorite",
    "lake-ngozi": "lake-ngozi",
    "kaporogwe-falls": "kaporogwe-falls",
    "matema-beach": "matema-beach",
    "lake-nyasa": "lake-nyasa",
    "mnazi-bay-ruvuma-estuary-marine-park": "mnazi-bay",
    "igeleke-rock-art-site": "igeleke",
    "isimila-stone-age-site": "isimila",
    "mikumi-national-park": "mikumi",
    "udzungwa-mountains-park": "udzungwa",
    "saadani-national-park": "saadani",
    "usambara-mountains": "usambara",
    "amani-nature-forest-reserves": "amani",
    "amboni-caves": "amboni-caves",
    "uluguru-mountains": "uluguru",
    "pugu-kazimzumbwi-nature-forest-reserve": "pugu-kazimzumbwi",
    "tanga-marine-park-and-reserves": "tanga-marine",
    kilwa: "kilwa",
    "kilwa-kisiwani": "kilwa-kisiwani",
    "songo-mnara": "songo-mnara",
    "kilwa-kivinje": "kilwa-kivinje",
    pangani: "pangani",
    bagamoyo: "bagamoyo",
    "kunduchi-ruins": "kunduchi",
    "gombe-stream-national-park": "gombe",
    "mahale-mountains-national-park": "mahale",
    "saanane-island-national-park": "saanane",
    "rubondo-island-national-park": "rubondo",
    "ukerewe-island": "ukerewe",
    "burigi-chato-national-park": "burigi-chato",
    "ibanda-kyerwa-national-park": "ibanda-kyerwa",
    "lake-tanganyika": "lake-tanganyika",
    "lake-victoria": "lake-victoria",
  };
  return map[slug] || slug.replace(/-national-park$/, "");
}

function shortName(fullName) {
  return fullName
    .replace(/ National Park$/i, "")
    .replace(/^Mount /i, "")
    .replace(/^Lake /i, "Lake ");
}

function guessScriptLabel(id, name) {
  if (SCRIPT_LABELS[id]) return SCRIPT_LABELS[id];
  if (/lake|beach|marine|bay/i.test(name)) return "Southern Waters";
  if (/falls|gorge/i.test(name)) return "Highland Discovery";
  if (/rock|stone|meteorite|art/i.test(name)) return "Heritage Trail";
  if (/chimp|mahale|gombe/i.test(name)) return "Primate Country";
  if (/island|rubondo|saanane|ukerewe/i.test(name)) return "Island Discovery";
  return "Southern Discovery";
}

function decodeEntities(text = "") {
  return stripHtml(text);
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
  if (!isTtbImage(url)) return [];

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
      const file = match[1];
      candidates.push(`${BASE}/images/uploads/${cleanUploadFilename(file)}`);
      candidates.push(absUrl(url));
    }
  }

  return [...new Set(candidates.filter(Boolean))];
}

async function resolveWorkingUrl(rawUrl, cache) {
  const candidates = uploadsCandidates(rawUrl);
  for (const candidate of candidates) {
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
      const ok = res.ok;
      cache.set(candidate, ok);
      if (ok) return candidate;
    } catch {
      cache.set(candidate, false);
    }
  }
  return null;
}

function extractListingCards(html, circuitLabelFilter) {
  return parseListingCards(html, {
    circuitLabel: circuitLabelFilter,
    decodeEntities,
    absUrl,
  });
}

function extractPaginationUrls(html, paginationPath) {
  const escaped = paginationPath.replace(/\//g, "\\/");
  return [
    ...new Set(
      [...html.matchAll(new RegExp(`href="(${BASE.replace(/\./g, "\\.")}${escaped}/P\\d+)"`, "g"))].map(
        (m) => m[1]
      )
    ),
  ];
}

function extractRawImageUrls(html, fallbackImage) {
  const uploads = [
    ...html.matchAll(/https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi),
  ].map((m) => m[0]);
  const made = [...html.matchAll(/\/images\/made\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map((m) =>
    absUrl(m[0])
  );
  const og = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";

  return [...new Set([og, fallbackImage, ...uploads, ...made].filter(isTtbImage))];
}

function extractParagraphs(html) {
  return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter(
      (p) =>
        p.length > 60 &&
        !/Subscribe|Sign up|cookie|Safari destination including|Tours & Safaris|Read more|Share this/i.test(p)
    );
}

function highlightsFromText(description, category) {
  const bits = [];
  if (/big five|lion|elephant|wild dog|leopard|buffalo|hippo|crocodile/i.test(description))
    bits.push("Wildlife viewing");
  if (/river|boat|ruvuma|nyerere|selous/i.test(description)) bits.push("Rivers & boat safaris");
  if (/lake|beach|marine|snorkel|dhow|coast/i.test(description)) bits.push("Lakes & coast");
  if (/bird|flamingo|ornith/i.test(description)) bits.push("Birdlife");
  if (/remote|wilderness|untouched|vast/i.test(description)) bits.push("Remote wilderness");
  if (/cultural|rock art|stone age|heritage|meteorite|falls/i.test(description))
    bits.push("Culture & heritage");
  if (/flower|botanical|kitulo|orchid/i.test(description)) bits.push("Botanical wonders");
  if (/mount|climb|summit|peak|mountain/i.test(description)) bits.push("Mountain routes");
  if (category) {
    bits.push(
      category
        .replace(/Southern Circuit \|/i, "")
        .replace(/Eastern Circuit \|/i, "")
        .replace(/Western Circuit \|/i, "")
        .trim()
    );
  }
  return [...new Set(bits)].slice(0, 3);
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  if (!res.ok) throw new Error(`Failed ${url} (${res.status})`);
  return res.text();
}

async function loadAllListingCards() {
  const map = new Map();

  for (const source of LISTING_SOURCES) {
    const firstHtml = await fetchHtml(source.listing);
    const pages = [source.listing, ...extractPaginationUrls(firstHtml, source.paginationPath)];

    for (const page of pages) {
      const html = page === source.listing ? firstHtml : await fetchHtml(page);
      extractListingCards(html, source.circuitLabelFilter).forEach((card) => {
        if (!map.has(card.href)) map.set(card.href, { card, source });
      });
    }
  }

  return [...map.values()];
}

function scoreImageUrl(url) {
  let score = 0;
  if (url.includes("/images/uploads/")) score += 10;
  if (!/_550_|shar-|brig-|_c1\./i.test(url)) score += 5;
  if (/\.jpg$/i.test(url)) score += 2;
  if (/thumb|icon|logo|banner|map/i.test(url)) score -= 20;
  return score;
}

function sortRawUrls(rawUrls) {
  return [...rawUrls].sort((a, b) => scoreImageUrl(b) - scoreImageUrl(a));
}

async function buildVerifiedGallery(rawUrls, cache, limit = MAX_GALLERY) {
  const verified = [];
  const seenKeys = new Set();
  const sorted = sortRawUrls(rawUrls);

  for (const raw of sorted) {
    if (verified.length >= limit) break;

    const resolved = await resolveWorkingUrl(raw, cache);
    if (!resolved) continue;

    const key = imageKey(resolved);
    if (seenKeys.has(key)) continue;
    seenKeys.add(key);
    verified.push(resolved);
  }

  return verified;
}

function pickCardImages(imageEntries) {
  const picked = [];
  const keys = new Set();
  for (const entry of imageEntries) {
    const key = imageKey(entry.src);
    if (keys.has(key)) continue;
    keys.add(key);
    picked.push(entry);
    if (picked.length >= CARD_IMAGES) break;
  }
  return picked;
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

function escapeHtmlAttr(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateDestinationPage(dest) {
  const hero = dest.gallery[0]?.src || dest.images[0]?.src;
  const desc = escapeHtmlAttr(dest.description.slice(0, 155));

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${escapeHtmlAttr(dest.fullName)} | Matembo Safari & Tours" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${escapeHtmlAttr(hero)}" />
    <title>${escapeHtmlAttr(dest.fullName)} | Matembo Safari & Tours</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Great+Vibes&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/styles/tokens.css" />
    <link rel="stylesheet" href="/src/styles/buttons.css" />
    <link rel="stylesheet" href="/src/styles/site.css" />
    <link rel="stylesheet" href="/src/styles/footer.css" />
    <link rel="stylesheet" href="/src/styles/nav.css" />
    <link rel="stylesheet" href="/src/styles/destination-view.css" />
  </head>
  <body data-destination-id="${escapeHtmlAttr(dest.id)}">
    <div id="site-nav-root"></div>
    <main id="destination-view-root"></main>
    <div id="site-footer"></div>
    <script type="module" src="/src/js/destination-view-main.js"></script>
  </body>
</html>
`;
}

console.log("Importing Southern Tanzania destinations from tanzaniatourism.com…");
console.log(`Sources: ${LISTING_SOURCES.map((s) => s.name).join(", ")}`);
const listing = await loadAllListingCards();
console.log(`Found ${listing.length} unique destinations across listing pages.`);

const urlCache = new Map();
const destinations = [];

for (const { card, source } of listing) {
  const slug = card.href.split("/destination/")[1].replace(/\/$/, "");
  const id = slugToId(slug);
  if (destinations.some((dest) => dest.id === id)) {
    console.warn(`⚠ Skipping duplicate id "${id}" for ${card.name}`);
    continue;
  }
  const detailHtml = await fetchHtml(card.href);
  const rawUrls = extractRawImageUrls(detailHtml, card.cardImage);
  const paragraphs = extractParagraphs(detailHtml);

  const verifiedUrls = await buildVerifiedGallery(rawUrls, urlCache, MAX_GALLERY);

  if (verifiedUrls.length < MIN_GALLERY) {
    console.warn(`⚠ ${card.name}: only ${verifiedUrls.length} working images (need ${MIN_GALLERY}) – skipped`);
    continue;
  }

  const imageEntries = verifiedUrls.map((src, i) => ({
    src,
    alt: `${card.name}${i ? ` – view ${i + 1}` : ""}`,
  }));

  const uniqueForCards = pickCardImages(imageEntries);

  const tagline =
    paragraphs[0]?.length > 160
      ? `${paragraphs[0].slice(0, 157).trim()}…`
      : paragraphs[0] || "";

  destinations.push({
    id,
    slug,
    circuit: source.circuit,
    circuitLabel: source.circuitLabel,
    name: shortName(card.name),
    fullName: card.name,
    scriptLabel: guessScriptLabel(id, card.name),
    region: source.region,
    category: card.category,
    bestSeason: "Jun – Oct",
    journeys: `${card.tourCount} tours · ${card.reviewCount} reviews`,
    tagline,
    description: paragraphs[0] || "",
    descriptions: paragraphs.slice(0, 8),
    highlights: highlightsFromText(paragraphs[0] || "", card.category),
    sourceUrl: card.href,
    images: uniqueForCards,
    gallery: imageEntries,
  });

  console.log(`  ✓ [${source.circuitLabel}] ${card.name} – ${imageEntries.length} photos kept`);
}

const file = `/** Auto-generated from tanzaniatourism.com – run: npm run import:southern */
export const TTB_COM_ORIGIN = ${JSON.stringify(BASE)};
export const TTB_SOUTHERN_CIRCUIT_URL = ${JSON.stringify(SOURCE_PAGE)};

export const southernCircuitMeta = {
  id: "southern",
  name: "Southern Tanzania",
  description: "Ruaha, Mikumi, Udzungwa, Nyerere, Katavi, Kilwa, Mahale & more – guided from Iringa",
  sourceUrl: ${JSON.stringify(SOURCE_PAGE)},
};

export const easternCircuitMeta = {
  id: "eastern",
  name: "Eastern Circuit",
  description: "Mikumi, Udzungwa, Saadani, Kilwa, Bagamoyo & the Swahili coast",
  sourceUrl: ${JSON.stringify(`${BASE}/destinations/eastern-circuit`)},
};

export const westernCircuitMeta = {
  id: "western",
  name: "Western Circuit",
  description: "Mahale, Gombe, Rubondo, Lake Tanganyika & western wilderness",
  sourceUrl: ${JSON.stringify(`${BASE}/destinations/western-circuit`)},
};

export const southernCircuitDestinations = ${serialize(destinations, 1)};
`;

writeFileSync(OUT, file, "utf8");
console.log(`Exported ${destinations.length} destinations → ${OUT}`);

mkdirSync(PAGES_DIR, { recursive: true });
for (const dest of destinations) {
  writeFileSync(join(PAGES_DIR, `${dest.id}.html`), generateDestinationPage(dest), "utf8");
}
console.log(`Generated ${destinations.length} destination pages → ${PAGES_DIR}/`);
