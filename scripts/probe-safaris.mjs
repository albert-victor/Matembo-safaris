const url = "https://www.tanzaniatourism.com/safaris";
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const html = await res.text();
console.log("length", html.length);

const safariLinks = [
  ...html.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"/gi),
].map((m) => m[1]);
console.log("safari links", new Set(safariLinks).size);
[...new Set(safariLinks)].slice(0, 10).forEach((u) => console.log(u));

const relLinks = [...html.matchAll(/href="(\/safari\/[^"]+)"/gi)].map((m) => m[1]);
console.log("relative safari links", new Set(relLinks).size);

// Try pagination URLs
for (const page of [1, 2, 3, "?page=2", "?offset=16"]) {
  const u = `https://www.tanzaniatourism.com/safaris${page === 1 ? "" : typeof page === "number" ? `/page/${page}` : page}`;
  const r = await fetch(u, { headers: { "User-Agent": "Mozilla/5.0" } });
  const h = await r.text();
  const count = [...h.matchAll(/href="(https:\/\/www\.tanzaniatourism\.com\/safari\/[^"]+)"/gi)].length;
  console.log(u, "status", r.status, "links", count);
}

// Sample detail page
const first = [...new Set(safariLinks)][0] || "https://www.tanzaniatourism.com/safari/day-trip-to-lake-chala";
const dr = await fetch(first, { headers: { "User-Agent": "Mozilla/5.0" } });
const detail = await dr.text();
console.log("\nDetail URL:", first, "length", detail.length);

// Look for itinerary, description patterns
const sections = ["itinerary", "description", "inclusion", "overview", "day"];
for (const s of sections) {
  const idx = detail.toLowerCase().indexOf(s);
  console.log(s, "at", idx);
}

// Dump some structure
const h4s = [...detail.matchAll(/<h[1-6][^>]*>([^<]+)<\/h[1-6]>/gi)].slice(0, 15);
console.log("\nHeadings:");
h4s.forEach((m) => console.log(" -", m[1].trim()));

const imgs = [...detail.matchAll(/src="(https:\/\/www\.tanzaniatourism\.com[^"]+\.(?:jpg|jpeg|webp|png))"/gi)].map((m) => m[1]);
console.log("\nImages:", new Set(imgs).size);
