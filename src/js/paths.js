/** Lightweight URL helpers – no data file imports. */
export function packagePageUrl(pkg) {
  const id = typeof pkg === "string" ? pkg : pkg.id;
  return `/packages/${encodeURIComponent(id)}.html`;
}
