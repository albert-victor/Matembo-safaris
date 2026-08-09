/** Shared circuit anchors for destinations & safaris pages */

export const DESTINATION_CIRCUITS = [
  { id: "northern", label: "Northern Circuit", script: "Serengeti · Ngorongoro · Tarangire" },
  { id: "southern", label: "Southern Circuit", script: "Ruaha · Nyerere · Katavi" },
  { id: "eastern", label: "Eastern Circuit", script: "Mikumi · Udzungwa · Kilwa" },
  { id: "western", label: "Western Circuit", script: "Mahale · Gombe · Rubondo" },
  { id: "zanzibar", label: "Zanzibar Island", script: "Stone Town · beaches · spice tours" },
  { id: "mafia", label: "Mafia Island", script: "Chole Bay · whale sharks · reefs" },
  { id: "oceanic", label: "Ocean Islands", script: "Pemba · Misali · offshore atolls" },
];

export const SAFARI_CIRCUIT_LABELS = [
  "Northern Circuit",
  "Southern Circuit",
  "Eastern Circuit",
  "Western Circuit",
  "Zanzibar Island",
  "Mafia Island",
  "Central Circuit",
  "Ocean Islands",
];

const SAFARI_CIRCUIT_ANCHORS = {
  "Northern Circuit": "northern-circuit",
  "Southern Circuit": "southern-circuit",
  "Eastern Circuit": "eastern-circuit",
  "Western Circuit": "western-circuit",
  "Zanzibar Island": "zanzibar-island",
  "Mafia Island": "mafia-island",
  "Central Circuit": "central-circuit",
  "Ocean Islands": "ocean-islands",
};

export function circuitAnchor(circuitId) {
  return `${circuitId}-circuit`;
}

export function circuitPageHref(circuitId) {
  return `/circuits/${encodeURIComponent(circuitId)}.html`;
}

export function destinationsCircuitHref(circuitId) {
  return circuitPageHref(circuitId);
}

export function safarisCircuitHref(circuitLabel) {
  const anchor =
    SAFARI_CIRCUIT_ANCHORS[circuitLabel] ||
    circuitLabel.toLowerCase().replace(/\s+/g, "-");
  return `/safaris.html#${anchor}`;
}
