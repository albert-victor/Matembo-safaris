import {
  circuitCatalog,
  getDestinationsByCircuit,
  getDestinationById,
} from "./all-destinations.js";
import { DESTINATION_CIRCUITS, safarisCircuitHref, circuitPageHref } from "./circuit-nav.js";
import { safariPackages } from "./safari-packages.js";

const HERO_DESTINATION_IDS = {
  northern: "serengeti",
  southern: "ruaha",
  eastern: "mikumi",
  western: "mahale",
  zanzibar: "zanzibar",
  mafia: "mafia",
  oceanic: "mbudya-island-marine-reserve",
};

const CIRCUIT_LEADS = {
  northern:
    "Migration plains, crater floors, elephant rivers and Kilimanjaro on the horizon – Tanzania's most famous wildlife corridor.",
  southern:
    "Ruaha's baobabs, Nyerere's rivers, Katavi's isolation and the highlands around Iringa – the south at its wildest.",
  eastern:
    "Mikumi's open savanna, Udzungwa's waterfalls, Saadani where bush meets beach, and the Swahili history of Kilwa and Bagamoyo.",
  western:
    "Chimpanzee forests on Lake Tanganyika, Rubondo's island wilderness, and the quiet western parks few travellers reach.",
  zanzibar:
    "Stone Town lanes, spice farms, Jozani's red colobus, and white-sand Indian Ocean days after the bush.",
  mafia:
    "Chole Bay reefs, whale-shark seasons, dhow sunsets, and an island pace that feels worlds from the mainland.",
  oceanic:
    "Pemba, Misali, Fanjove and Tanzania's offshore atolls – barefoot luxury, coral gardens and dhow horizons.",
};

const CIRCUIT_SCRIPTS = Object.fromEntries(
  DESTINATION_CIRCUITS.map((c) => [c.id, c.script])
);

const SAFARI_LABEL_BY_CIRCUIT = {
  northern: "Northern Circuit",
  southern: "Southern Circuit",
  eastern: "Eastern Circuit",
  western: "Western Circuit",
  zanzibar: "Zanzibar Island",
  mafia: "Mafia Island",
  oceanic: "Ocean Islands",
};


export { circuitPageHref };

function circuitLabel(meta) {
  return DESTINATION_CIRCUITS.find((c) => c.id === meta.id)?.label || meta.name;
}

function heroImageForCircuit(circuitId) {
  const featuredId = HERO_DESTINATION_IDS[circuitId];
  const featured = featuredId ? getDestinationById(featuredId) : null;
  const dest = featured || getDestinationsByCircuit(circuitId)[0];
  const img = dest?.images?.[0] || dest?.gallery?.[0];
  return img
    ? { src: img.src, alt: img.alt || dest.fullName || circuitLabel({ id: circuitId }) }
    : { src: "/assets/about/main3.jpg", alt: "Tanzania safari landscape" };
}

function safariCountForCircuit(circuitId) {
  const label = SAFARI_LABEL_BY_CIRCUIT[circuitId];
  if (!label) return 0;
  return safariPackages.filter((pkg) => pkg.circuit === label).length;
}

export function getCircuitPageData(circuitId) {
  const meta = circuitCatalog.find((c) => c.id === circuitId);
  if (!meta) return null;

  const destinations = getDestinationsByCircuit(circuitId);
  const hero = heroImageForCircuit(circuitId);
  const label = circuitLabel(meta);
  const safariLabel = SAFARI_LABEL_BY_CIRCUIT[circuitId];

  return {
    id: meta.id,
    name: label,
    title: meta.name === label ? label : meta.name,
    script: CIRCUIT_SCRIPTS[circuitId] || "",
    description: meta.description,
    lead: CIRCUIT_LEADS[circuitId] || meta.description,
    hero,
    destinationCount: destinations.length,
    safariCount: safariCountForCircuit(circuitId),
    destinationsHref: `/destinations.html#${circuitId}-circuit`,
    safarisHref: safariLabel ? safarisCircuitHref(safariLabel) : "/safaris.html",
    pageHref: circuitPageHref(circuitId),
    sourceUrl: meta.sourceUrl,
  };
}

export function getAllCircuitsPageData() {
  return circuitCatalog.map((meta) => getCircuitPageData(meta.id)).filter(Boolean);
}

export function getCircuitById(circuitId) {
  return getCircuitPageData(circuitId);
}

export const allCircuitsPageMeta = {
  title: "Tanzania Circuits",
  script: "Seven regions · one country",
  lead:
    "From Serengeti migration routes to Mafia's reefs – explore every circuit Matembo covers across Tanzania, guided from Iringa.",
  hero: heroImageForCircuit("northern"),
};
