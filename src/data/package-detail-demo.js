import { getSafariPackageById, safariPackages } from "./safari-packages.js";

const DEFAULT_ID = "2-days-to-tarangire-national-park-ngorongoro-crater";

export function resolvePackageDetail(id) {
  return getSafariPackageById(id) ?? getSafariPackageById(DEFAULT_ID) ?? safariPackages[0];
}

/** Default detail record for demos and fallbacks */
export const packageDetailDemo = resolvePackageDetail(DEFAULT_ID);

export { getSafariPackageById, safariPackages };
