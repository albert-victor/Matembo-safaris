import { northernCircuitDestinations, northernCircuitMeta } from "./northern-circuit-destinations.js";
import {
  southernCircuitDestinations,
  southernCircuitMeta,
  easternCircuitMeta,
  westernCircuitMeta,
} from "./southern-circuit-destinations.js";
import {
  oceanicCircuitDestinations,
  oceanicCircuitMeta,
  zanzibarCircuitMeta,
  mafiaCircuitMeta,
} from "./oceanic-circuits-destinations.js";

export const circuitCatalog = [
  northernCircuitMeta,
  southernCircuitMeta,
  easternCircuitMeta,
  westernCircuitMeta,
  zanzibarCircuitMeta,
  mafiaCircuitMeta,
  oceanicCircuitMeta,
];

export const allDestinations = [
  ...northernCircuitDestinations,
  ...southernCircuitDestinations,
  ...oceanicCircuitDestinations,
];

export function getDestinationsByCircuit(circuitId) {
  if (circuitId === "northern") return northernCircuitDestinations;
  if (circuitId === "zanzibar" || circuitId === "mafia" || circuitId === "oceanic") {
    return oceanicCircuitDestinations.filter((dest) => dest.circuit === circuitId);
  }
  return southernCircuitDestinations.filter((dest) => dest.circuit === circuitId);
}

export function getDestinationById(id) {
  return allDestinations.find((dest) => dest.id === id) || null;
}
