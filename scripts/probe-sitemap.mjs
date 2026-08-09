const BASE = "https://www.tanzaniatourism.com";
const xml = await fetch(`${BASE}/sitemap.xml`, { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());
console.log("sitemap length", xml.length);
console.log("first 500 chars:", xml.slice(0, 500));

const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
console.log("total locs", locs.length);
const safariLocs = locs.filter((u) => u.includes("/safari/"));
console.log("safari locs", safariLocs.length);
safariLocs.slice(0, 10).forEach((u) => console.log(u));

// If sitemap index, fetch child sitemaps
const childSitemaps = locs.filter((u) => u.endsWith(".xml"));
console.log("child sitemaps", childSitemaps.length);

let allSafari = [...safariLocs];
for (const sm of childSitemaps) {
  const child = await fetch(sm, { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());
  const childLocs = [...child.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const childSafari = childLocs.filter((u) => u.includes("/safari/"));
  console.log(sm, "safari", childSafari.length);
  allSafari.push(...childSafari);
}

allSafari = [...new Set(allSafari)];
console.log("\nTotal unique safari URLs:", allSafari.length);
