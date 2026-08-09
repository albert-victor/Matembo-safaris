/**
 * Generate individual circuit pages under circuits/
 * Run: npm run generate:circuits
 */

import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { circuitCatalog } from "../src/data/all-destinations.js";
import { getCircuitPageData } from "../src/data/circuits-page-data.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const PAGES_DIR = join(ROOT, "circuits");

function escapeHtmlAttr(text = "") {
  return text
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function generateCircuitPage(circuitId) {
  const circuit = getCircuitPageData(circuitId);
  if (!circuit) return "";

  const desc = escapeHtmlAttr(circuit.lead.slice(0, 155));

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${desc}" />
    <meta property="og:title" content="${escapeHtmlAttr(circuit.name)} | Matembo Safari & Tours" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:image" content="${escapeHtmlAttr(circuit.hero.src)}" />
    <title>${escapeHtmlAttr(circuit.name)} | Matembo Safari & Tours</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&family=Great+Vibes&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/styles/tokens.css" />
    <link rel="stylesheet" href="/src/styles/buttons.css" />
    <link rel="stylesheet" href="/src/styles/cards.css" />
    <link rel="stylesheet" href="/src/styles/site.css" />
    <link rel="stylesheet" href="/src/styles/footer.css" />
    <link rel="stylesheet" href="/src/styles/nav.css" />
    <link rel="stylesheet" href="/src/styles/circuits.css" />
  </head>
  <body data-circuit-id="${escapeHtmlAttr(circuitId)}">
    <div id="site-nav-root"></div>
    <main id="circuit-page-root"></main>
    <div id="site-footer"></div>
    <script type="module" src="/src/js/circuit-page-main.js"></script>
  </body>
</html>
`;
}

mkdirSync(PAGES_DIR, { recursive: true });

for (const meta of circuitCatalog) {
  writeFileSync(join(PAGES_DIR, `${meta.id}.html`), generateCircuitPage(meta.id), "utf8");
}

console.log(`Generated ${circuitCatalog.length} circuit pages → ${PAGES_DIR}/`);
