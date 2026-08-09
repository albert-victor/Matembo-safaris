import { writeFileSync } from "node:fs";

const url = "https://www.tanzaniatourism.com/destinations/northern-circuit";
const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
const html = await res.text();
writeFileSync("tmp-northern.html", html, "utf8");
console.log("saved", html.length);

// search patterns
const patterns = [
  /serengeti/gi,
  /data-[a-z-]+=/gi,
  /\/destinations\/[a-z0-9-]+/gi,
  /images\/uploads\/[^"']+/gi,
  /fetch\(|axios|api\//gi,
];
for (const p of patterns) {
  const m = html.match(p);
  console.log(p, m ? [...new Set(m)].slice(0, 15) : 0);
}
