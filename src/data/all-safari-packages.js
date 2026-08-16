import {
  safariPackages as ttbPackages,
  safariPackagesMeta as ttbMeta,
  safariCircuitOrder as ttbCircuitOrder,
  getSafariPackageById as getTtbPackageById,
} from "./safari-packages.js";
import {
  southernSafariPackages,
  southernSafariPackagesMeta,
  getSouthernSafariPackageById,
} from "./southern-safari-packages.js";
import {
  tanzaniaSpecialistPackages,
  tanzaniaSpecialistPackagesMeta,
  getTanzaniaSpecialistPackageById,
} from "./tanzania-specialist-packages.js";

export {
  ttbPackages,
  southernSafariPackages,
  tanzaniaSpecialistPackages,
  ttbMeta,
  southernSafariPackagesMeta,
  tanzaniaSpecialistPackagesMeta,
  ttbCircuitOrder,
};

/** Combined catalogue for listings, search, and package pages */
export const safariPackages = [
  ...ttbPackages,
  ...southernSafariPackages,
  ...tanzaniaSpecialistPackages,
];

export const safariCircuitOrder = ttbCircuitOrder;

export const safariPackagesMeta = {
  count: safariPackages.length,
  ttbCount: ttbMeta.count,
  southernCount: southernSafariPackagesMeta.count,
  tanzaniaSpecialistCount: tanzaniaSpecialistPackagesMeta.count,
};

export function getSafariPackageById(id) {
  return (
    getSouthernSafariPackageById(id) ??
    getTanzaniaSpecialistPackageById(id) ??
    getTtbPackageById(id) ??
    null
  );
}

export const safariPackageCards = safariPackages;
