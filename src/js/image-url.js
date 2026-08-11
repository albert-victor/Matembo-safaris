/** Local image paths — presets are handled by CSS (object-fit + dimensions). */
export function ttbImageUrl(url, _preset = "card") {
  return url || "";
}

export function optimizedImageUrl(url, preset = "card") {
  return ttbImageUrl(url, preset);
}
