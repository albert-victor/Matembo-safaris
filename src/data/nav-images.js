/** Verified TTB image URLs used in nav mega menus (from package imports). */
export const NAV_IMAGE_FALLBACK = "/assets/about/main3.jpg";

export const NAV_IMAGES = {
  ruaha2d: "/assets/photos/Ruaha_National_Park_Ruaha_River_42.jpg",
  ruaha3d: "/assets/photos/Ruaha_National_Park_Ruaha_River_39.jpg",
  ruaha4d: "/assets/photos/Ruaha_National_Park_Hippos_47.jpg",
  ruaha5d: "/assets/photos/Ruaha_National_Park_Elephants_49.jpg",
  ruaha7d: "/assets/photos/Udzungwa_Mountains_National_Park_01.jpg",
  ruaha10d: "/assets/photos/Nyerere_National_Park_Lions_102.jpg",
  serengeti3d: "/assets/photos/Serengeti_Wildebeests_03.jpg",
  ngorongoroDay: "/assets/photos/Ngorongoro_Crater_01_NCA.jpg",
  tarangireDay: "/assets/photos/Tarangire_National_Park_Lions_20.jpg",
  serengeti5d: "/assets/photos/Serengeti_National_Park_Wildebeests_20.jpg",
  lemosho7d: "/assets/photos/Kilimanjaro_Trek_Lemosho_Route_04.jpg",
  machame8d: "/assets/photos/Kilimanjaro_Climb_Machame_Route_03.jpg",
  shiraDay: "/assets/photos/Kilimanjaro_Climb_Shira_Plateau_02.jpg",
  walkingSafaris: "/assets/about/walking safaris.jpg",
  migration: "/assets/photos/Serengeti_Wildebeests_03.jpg",
  olduvai: "/assets/photos/Olduvai_Gorge_NCA_2_1.jpg",
  udzungwa: "/assets/photos/Udzungwa_Mountains_National_Park_01.jpg",
};

function applyNavFallback(img) {
  const fallback = img.getAttribute("data-fallback") || NAV_IMAGE_FALLBACK;
  if (!fallback || img.dataset.fallbackApplied) return;
  img.dataset.fallbackApplied = "1";
  img.src = fallback;
}

export function bindNavImageFallbacks(root = document) {
  root.querySelectorAll(".mega-menu img, .site-header__brand-emblem").forEach((img) => {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = "1";

    img.addEventListener("error", () => {
      if (img.hasAttribute("data-src")) return;

      const original = img.dataset.srcOriginal;
      if (
        original &&
        img.src.includes("/images/made/") &&
        !img.dataset.retriedOriginal
      ) {
        img.dataset.retriedOriginal = "1";
        img.src = original;
        return;
      }

      if (original && !img.dataset.retriedOriginal && img.src !== original) {
        img.dataset.retriedOriginal = "1";
        img.src = original;
        return;
      }

      applyNavFallback(img);
    });
  });
}
