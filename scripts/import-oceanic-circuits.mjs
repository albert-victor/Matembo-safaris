import { writeFileSync, mkdirSync } from "node:fs";
import { extractListingCards as parseListingCards } from "./lib/ttb-listing.mjs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const OUT = join(ROOT, "src/data/oceanic-circuits-destinations.js");
const PAGES_DIR = join(ROOT, "destinations");

const BASE = "https://www.tanzaniatourism.com";
const MAX_GALLERY = 12;
const MIN_GALLERY = 3;
const CARD_IMAGES = 3;

const LISTING_SOURCES = [
  {
    name: "Ocean Islands",
    listing: `${BASE}/destinations/ocean-islands`,
    paginationPath: "/destinations/ocean-islands",
    circuitLabelFilter: "Ocean Islands",
    circuit: "oceanic",
    circuitLabel: "Ocean Islands",
    region: "Indian Ocean Tanzania",
  },
  {
    name: "Zanzibar Island",
    listing: `${BASE}/destinations/zanzibar-island`,
    paginationPath: "/destinations/zanzibar-island",
    circuitLabelFilter: "Zanzibar Island",
    circuit: "zanzibar",
    circuitLabel: "Zanzibar Island",
    region: "Zanzibar Archipelago",
  },
  {
    name: "Mafia Island",
    listing: `${BASE}/destinations/mafia-island`,
    paginationPath: "/destinations/mafia-island",
    circuitLabelFilter: "Mafia Island",
    circuit: "mafia",
    circuitLabel: "Mafia Island",
    region: "Mafia Archipelago",
  },
];

const SCRIPT_LABELS = {
  zanzibar: "Spice Island Escape",
  pemba: "Green Island Trails",
  mafia: "Marine Paradise",
  "chumbe-island": "Coral Sanctuary",
  "mnemba-island": "Private Atoll",
  "prison-island": "Historic Islet",
  "jozani-forest": "Red Colobus Forest",
  "stone-town": "UNESCO Old Town",
  "nungwi-beach": "Northern Shores",
  "kendwa-beach": "Sunset Coast",
  "paje-beach": "Kite & Lagoon",
  "mnarani-marine": "Turtle Sanctuary",
  "changuu-island": "Giant Tortoises",
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
    "zanzibar-island": "zanzibar",
    "pemba-island": "pemba",
    "mafia-island": "mafia",
    "chumbe-island-coral-park": "chumbe-island",
    "chumbe-island": "chumbe-island",
    "mnemba-island": "mnemba-island",
    "changuu-island": "changuu-island",
    "prison-island-changuu": "changuu-island",
    "jozani-chwaka-bay-national-park": "jozani-forest",
    "stone-town-zanzibar": "stone-town",
    "nungwi-beach": "nungwi-beach",
    "kendwa-beach": "kendwa-beach",
    "paje-beach": "paje-beach",
    "mnarani-marine-turtles-conservation-pond": "mnarani-marine",
    "misali-island": "misali-island",
    "fanjove-island": "fanjove-island",
    "thanda-island": "thanda-island",
    "lazy-lagoon-island": "lazy-lagoon",
    "chapwani-island": "chapwani-island",
    "tumbatu-island": "tumbatu-island",
    "mnemba-atoll": "mnemba-island",
    "chole-bay": "chole-bay",
    "juani-island": "juani-island",
    "jambiani-beach": "jambiani-beach",
    "kizimkazi": "kizimkazi",
    "kizimkazi-dolphin-tours": "kizimkazi",
    "mnazi-bay-ruvuma-estuary-marine-park": "mnazi-bay",
  };
  return map[slug] || slug.replace(/-national-park$/, "").replace(/-marine-park$/, "");
}

function shortName(fullName) {
  return fullName
    .replace(/ National Park$/i, "")
    .replace(/^Mount /i, "")
    .replace(/^Lake /i, "Lake ");
}

function guessScriptLabel(id, name) {
  if (SCRIPT_LABELS[id]) return SCRIPT_LABELS[id];
  if (/beach|coast|shore|lagoon/i.test(name)) return "Island Shores";
  if (/marine|coral|snorkel|dive|reef|atoll/i.test(name)) return "Marine Discovery";
  if (/forest|colobus|mangrove/i.test(name)) return "Island Forests";
  if (/stone town|heritage|historic|ruins|slave/i.test(name)) return "Swahili Heritage";
  if (/turtle|dolphin|whale/i.test(name)) return "Ocean Wildlife";
  if (/island|archipelago|pemba|zanzibar|mafia/i.test(name)) return "Island Escape";
  return "Coastal Discovery";
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
  if (/snorkel|dive|reef|coral|marine|whale|dolphin|turtle/i.test(description))
    bits.push("Marine life & reefs");
  if (/beach|dhow|lagoon|coast|shore|sunset/i.test(description)) bits.push("Beaches & coast");
  if (/spice|stone town|heritage|historic|culture|swahili/i.test(description))
    bits.push("Culture & heritage");
  if (/forest|colobus|mangrove|bird/i.test(description)) bits.push("Nature & wildlife");
  if (/island|archipelago|atoll/i.test(description)) bits.push("Island escapes");
  if (/remote|pristine|untouched|paradise/i.test(description)) bits.push("Pristine waters");
  if (category) {
    bits.push(
      category
        .replace(/Ocean Islands \|/i, "")
        .replace(/Zanzibar Island \|/i, "")
        .replace(/Mafia Island \|/i, "")
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

console.log("Importing Zanzibar, Mafia & Ocean Islands from tanzaniatourism.com…");
console.log(`Sources: ${LISTING_SOURCES.map((s) => s.name).join(", ")}`);
const listing = await loadAllListingCards();
console.log(`Found ${listing.length} unique destinations across listing pages.`);

const urlCache = new Map();
const destinations = [];
const seenIds = new Set();

for (const { card, source } of listing) {
  const slug = card.href.split("/destination/")[1].replace(/\/$/, "");
  const id = slugToId(slug);
  if (seenIds.has(id)) {
    console.warn(`⚠ Skipping duplicate id "${id}" for ${card.name}`);
    continue;
  }
  const detailHtml = await fetchHtml(card.href);
  const rawUrls = extractRawImageUrls(detailHtml, card.cardImage);
  const paragraphs = extractParagraphs(detailHtml);

  const verifiedUrls = await buildVerifiedGallery(rawUrls, urlCache, MAX_GALLERY);

  if (verifiedUrls.length < MIN_GALLERY) {
    console.warn(`⚠ ${card.name}: only ${verifiedUrls.length} working images (need ${MIN_GALLERY}) — skipped`);
    continue;
  }

  const imageEntries = verifiedUrls.map((src, i) => ({
    src,
    alt: `${card.name}${i ? ` — view ${i + 1}` : ""}`,
  }));

  const uniqueForCards = pickCardImages(imageEntries);

  const tagline =
    paragraphs[0]?.length > 160
      ? `${paragraphs[0].slice(0, 157).trim()}…`
      : paragraphs[0] || "";

  seenIds.add(id);
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
    bestSeason: "Jun – Mar",
    journeys: `${card.tourCount} tours · ${card.reviewCount} reviews`,
    tagline,
    description: paragraphs[0] || "",
    descriptions: paragraphs.slice(0, 8),
    highlights: highlightsFromText(paragraphs[0] || "", card.category),
    sourceUrl: card.href,
    images: uniqueForCards,
    gallery: imageEntries,
  });

  console.log(`  ✓ [${source.circuitLabel}] ${card.name} — ${imageEntries.length} photos kept`);
}

const file = `/** Auto-generated from tanzaniatourism.com — run: npm run import:oceanic */
export const TTB_OCEANIC_ORIGIN = ${JSON.stringify(BASE)};

export const oceanicCircuitMeta = {
  id: "oceanic",
  name: "Ocean Islands",
  description: "Pemba, Misali, Fanjove & Indian Ocean islets — reefs, dhows & barefoot luxury",
  sourceUrl: ${JSON.stringify(`${BASE}/destinations/ocean-islands`)},
};

export const zanzibarCircuitMeta = {
  id: "zanzibar",
  name: "Zanzibar Island",
  description: "Stone Town, spice tours, Jozani Forest & the classic Zanzibar coast",
  sourceUrl: ${JSON.stringify(`${BASE}/destinations/zanzibar-island`)},
};

export const mafiaCircuitMeta = {
  id: "mafia",
  name: "Mafia Island",
  description: "Chole Bay, whale sharks, coral gardens & unhurried island life",
  sourceUrl: ${JSON.stringify(`${BASE}/destinations/mafia-island`)},
};

export const oceanicCircuitDestinations = ${serialize(destinations, 1)};
`;

writeFileSync(OUT, file, "utf8");
console.log(`Exported ${destinations.length} destinations → ${OUT}`);

mkdirSync(PAGES_DIR, { recursive: true });
for (const dest of destinations) {
  writeFileSync(join(PAGES_DIR, `${dest.id}.html`), generateDestinationPage(dest), "utf8");
}
console.log(`Generated ${destinations.length} destination pages → ${PAGES_DIR}/`);
