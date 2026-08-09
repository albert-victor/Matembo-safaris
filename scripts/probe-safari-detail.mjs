const BASE = "https://www.tanzaniatourism.com";
const detailUrl = `${BASE}/safari/2-days-to-tarangire-national-park-ngorongoro-crater`;
const html = await fetch(detailUrl, { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());

// Save key sections to file for analysis
import { writeFileSync } from "node:fs";

// Find id="itinerary" section
const itStart = html.indexOf('id="itinerary"');
console.log("itinerary section at", itStart);
if (itStart >= 0) console.log(html.slice(itStart, itStart + 4000));

// overview content
const ovMatch = html.match(/id="overview"[\s\S]*?<h3[^>]*>Overview<\/h3>\s*<div class="text-17[^"]*">([\s\S]*?)<\/div>/i);
console.log("\nOverview text:", ovMatch?.[1]?.slice(0, 500));

// tour snapshot / duration
const snap = html.match(/Tour snapshot[\s\S]{0,3000}/i);
console.log("\nSnapshot:", snap?.[0]?.slice(0, 1500));

// inclusions
const inc = html.match(/Inclusions?[\s\S]{0,2000}/i);
console.log("\nInclusions:", inc?.[0]?.slice(0, 1000));

// card pattern on listing
const listHtml = await fetch(`${BASE}/safaris`, { headers: { "User-Agent": "Mozilla/5.0" } }).then((r) => r.text());
const cardMatch = listHtml.match(/hotelsCard[\s\S]{0,800}/);
console.log("\nCard pattern:", cardMatch?.[0]);

// all hotelsCard blocks
const blocks = [...listHtml.matchAll(/class="hotelsCard[^"]*"[\s\S]*?<\/a>/gi)];
console.log("hotelsCard blocks", blocks.length);
if (blocks[0]) console.log(blocks[0][0].slice(0, 1200));

writeFileSync("scripts/tmp-safari-detail.html", html.slice(itStart >= 0 ? itStart : 0, (itStart >= 0 ? itStart : 0) + 8000));
