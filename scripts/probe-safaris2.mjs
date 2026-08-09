const BASE = "https://www.tanzaniatourism.com";

async function fetchHtml(url) {
  const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
  return res.text();
}

function extractSafariLinks(html) {
  return [
    ...new Set(
      [...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"/gi)].map(
        (m) => m[1]
      )
    ),
  ];
}

function extractListingCards(html) {
  const cards = [];
  const re =
    /<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"[^>]*>([\s\S]*?)<\/a>\s*(?=<a href="https:\/\/www\.tanzaniatourism\.com\/safari\/|<\/div>)/gi;
  // simpler: find h4 titles near safari links
  const blockRe =
    /<a href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"[\s\S]*?<h4[^>]*>([^<]+)<\/h4>[\s\S]*?<\/a>/gi;
  let m;
  while ((m = blockRe.exec(html))) {
    const block = m[0];
    const img = block.match(/<img[^>]+src="([^"]+)"/)?.[1];
    const meta = block.match(/<p[^>]*>([^<]+)<\/p>/i)?.[1] || "";
    cards.push({ url: m[1], title: m[2].trim(), img, meta: meta.replace(/\s+/g, " ").trim() });
  }
  return cards;
}

// Count pages
const allLinks = new Set();
let page = 1;
while (page <= 30) {
  const url = page === 1 ? `${BASE}/safaris` : `${BASE}/safaris/page/${page}`;
  const html = await fetchHtml(url);
  const links = extractSafariLinks(html);
  if (!links.length) {
    console.log("Stop at page", page, "no links");
    break;
  }
  const before = allLinks.size;
  links.forEach((l) => allLinks.add(l));
  const added = allLinks.size - before;
  console.log("page", page, "links", links.length, "new", added, "total", allLinks.size);
  if (added === 0) break;
  page++;
}

console.log("\nTotal unique safaris:", allLinks.size);

// Sample listing cards from page 1
const html1 = await fetchHtml(`${BASE}/safaris`);
const cards = extractListingCards(html1);
console.log("\nListing cards sample:", cards.length);
cards.slice(0, 3).forEach((c) => console.log(JSON.stringify(c, null, 2)));

// Detail page deep probe
const detailUrl = `${BASE}/safari/2-days-to-tarangire-national-park-ngorongoro-crater`;
const detail = await fetchHtml(detailUrl);

// Save snippet around overview
const ovIdx = detail.indexOf("Overview");
console.log("\nDetail probe:", detailUrl);
console.log("overview snippet:", detail.slice(ovIdx, ovIdx + 2000));

// itinerary
const itIdx = detail.toLowerCase().indexOf("itinerary");
console.log("\nitinerary idx", itIdx);
if (itIdx >= 0) console.log(detail.slice(itIdx, itIdx + 3000));

// images - lazy load data-src?
const dataSrc = [...detail.matchAll(/data-src="([^"]+)"/gi)].map((m) => m[1]);
console.log("\ndata-src images:", dataSrc.length, dataSrc.slice(0, 5));

const bgImg = [...detail.matchAll(/background-image:\s*url\(['"]?([^'")]+)/gi)].map((m) => m[1]);
console.log("bg images:", bgImg.slice(0, 5));

const allImg = [...detail.matchAll(/(?:src|data-src|data-lazy-src)="([^"]+\.(?:jpg|jpeg|webp|png)[^"]*)"/gi)].map(
  (m) => m[1]
);
console.log("all img attrs:", [...new Set(allImg)].slice(0, 10));

// activities
const actIdx = detail.indexOf("Activities");
console.log("\nactivities snippet:", detail.slice(actIdx, actIdx + 1500));
