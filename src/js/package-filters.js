/** Filter safari packages by TTB safari type or activity label. */

export function parseSafariTypes(safariType) {
  return String(safariType || "")
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function packageMatchesSafariType(pkg, typeLabel) {
  if (!typeLabel) return true;
  const needle = typeLabel.toLowerCase();
  return parseSafariTypes(pkg.safariType).some((part) => part.toLowerCase() === needle);
}

export function filterPackagesBySafariType(packages, typeLabel) {
  return packages.filter((pkg) => packageMatchesSafariType(pkg, typeLabel));
}

export function packageMatchesActivity(pkg, activityLabel) {
  if (!activityLabel) return false;
  const needle = activityLabel.toLowerCase();
  const activities = pkg.activities || [];
  return activities.some((item) => String(item).toLowerCase() === needle);
}

export function filterPackagesByActivity(packages, activityLabel) {
  return packages.filter((pkg) => packageMatchesActivity(pkg, activityLabel));
}
