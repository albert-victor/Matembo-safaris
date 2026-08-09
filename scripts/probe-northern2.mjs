const BASE = "https://www.tanzaniatourism.com";

function absUrl(path) {
  if (path.startsWith("http")) return path;
  return BASE + (path.startsWith("/") ? path : `/${path}`);
}

function extractCards(html) {
  const cards = [];
  const re =
    /<a href="(https:\/\/www\.tanzaniatourism\.com\/destination\/[^"]+)" class="hotelsCard[^"]*" title="([^"]+)"[\s\S]*?<img src="([^"]+)"[\s\S]*?<span>([^<]+)<\/span>[\s\S]*?<p class="text-light-1[^"]*">([^<]+)<\/p>[\s\S]*?text-white">(\d+)\s*<\/div>[\s\S]*?\((\d+)\)/gi;
  let m;
  while ((m = re.exec(html))) {
    cards.push({
      href: m[1],
      title: m[2].trim(),
      cardImage: absUrl(m[3]),
      name: m[4].trim(),
      category: m[5].replace(/\s+/g, " ").trim(),
      tourCount: Number(m[6]),
      reviewCount: Number(m[7]),
    });
  }
  return cards;
}

function extractPagination(html) {
  return [...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/destinations\/northern-circuit[^"]*)"/g)].map((m) => m[1]);
}

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.ok ? res.text() : "";
}

function stripHtml(html = "") {
  return html.replace(/<[^>]+>/g, " ").replace(/&[^;]+;/g, " ").replace(/\s+/g, " ").trim();
}

function extractDetail(html) {
  const ogImage = html.match(/property="og:image"\s+content="([^"]+)"/i)?.[1] || "";
  const paragraphs = [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => stripHtml(m[1]))
    .filter((p) => p.length > 100 && !/Subscribe|Sign up|cookie/i.test(p));
  const gallery = [...html.matchAll(/https:\/\/www\.tanzaniatourism\.com\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map((m) => m[0]);
  const madeGallery = [...html.matchAll(/\/images\/made\/images\/uploads\/[^"'\s>]+\.(?:jpg|jpeg|webp|png)/gi)].map((m) => absUrl(m[0]));
  return {
    ogImage,
    description: paragraphs[0] || stripHtml(html.match(/property="og:description"\s+content="([^"]+)"/i)?.[1] || ""),
    images: [...new Set([ogImage, ...gallery, ...madeGallery].filter(Boolean))],
  };
}

const start = `${BASE}/destinations/northern-circuit`;
const firstHtml = await fetchHtml(start);
const pages = new Set([start, ...extractPagination(firstHtml)]);
console.log("pages found", [...pages]);

const listing = new Map();
for (const page of pages) {
  const html = page === start ? firstHtml : await fetchHtml(page);
  const cards = extractCards(html);
  console.log(page.replace(BASE, ""), cards.length);
  cards.forEach((c) => listing.set(c.href, c));
}

console.log("total listing cards", listing.size);

// fetch details for first 3
for (const card of [...listing.values()].slice(0, 3)) {
  const html = await fetchHtml(card.href);
  const detail = extractDetail(html);
  console.log("\n", card.name);
  console.log(" tours:", card.tourCount, "reviews:", card.reviewCount);
  console.log(" desc:", detail.description.slice(0, 120));
  console.log(" images:", detail.images.length, detail.images.slice(0, 3));
}
