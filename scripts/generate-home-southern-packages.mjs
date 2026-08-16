import { writeFileSync } from "node:fs";
import { southernSafariPackages } from "../src/data/southern-safari-packages.js";

const PICKS = [
  "safari-adventure-to-ruaha-np-from-iringa",
  "2-days-adventure-in-ruaha-national-park",
  "4-day-astonish-mikumi-np-and-ruaha-national-park",
  "5-days-4-nights-mikumi-and-nyerere-adventure-safari",
  "3-days-nyerere-np-game-drive-boat-fishingmaasai-boma",
  "4-days-enjoy-udzungwa-and-mikumi-np",
  "3-day-2-nights-mikumi-adventure-safari",
  "7-day-safari-to-mikumi-udzungwa-mountains-and-ruaha-national-parks",
];

function cleanTitle(title) {
  return title
    .replace(/\+/g, " & ")
    .replace(/\s*&\s*&\s*/g, " & ")
    .replace(/\s+/g, " ")
    .replace(/^\s*[-–]\s*/, "")
    .trim();
}

function durationLabel(d) {
  const m = String(d).match(/(\d+)\s*Days?(?:\s*\/\s*(\d+)\s*Nights?)?/i);
  if (!m) return d || "Safari";
  const days = m[1];
  const nights = m[2] || String(Math.max(0, Number(days) - 1));
  if (Number(days) === 1 && !m[2]) return "Day Trip";
  return `${days} Days / ${nights} Nights`;
}

function cardFrom(pkg) {
  const title = cleanTitle(pkg.title);
  const highlights = [
    ...(pkg.destinations || []).slice(0, 2),
    ...(pkg.activities || []).slice(0, 2),
    pkg.circuit,
  ]
    .filter(Boolean)
    .slice(0, 5);

  return {
    id: pkg.id,
    title,
    matemboLabel: title,
    highlights,
    badge: pkg.badge || null,
    objectPosition: pkg.objectPosition || "center center",
    image: pkg.image,
    alt: title,
    priceLabel: pkg.priceLabel || null,
    priceOnRequest: Boolean(pkg.priceOnRequest),
    duration: durationLabel(pkg.duration),
    circuit: pkg.circuit || "Southern Circuit",
  };
}

const cards = PICKS.map((id) => {
  const pkg = southernSafariPackages.find((p) => p.id === id);
  if (!pkg) throw new Error(`Missing package: ${id}`);
  return cardFrom(pkg);
});

writeFileSync(
  "src/data/home-popular-southern-packages.js",
  `/** Lightweight southern circuit teasers for homepage row 2 */\nexport const homePopularSouthernPackages = ${JSON.stringify(cards, null, 2)};\n`
);

console.log(`Generated ${cards.length} southern packages → src/data/home-popular-southern-packages.js`);
