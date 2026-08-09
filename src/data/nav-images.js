/** Verified TTB image URLs used in nav mega menus (from package imports). */
export const NAV_IMAGE_FALLBACK = "/assets/about/main3.jpg";

export const NAV_IMAGES = {
  ruaha2d: "https://www.tanzaniatourism.com/images/uploads/Ruaha_National_Park_Ruaha_River_42.jpg",
  ruaha3d: "https://www.tanzaniatourism.com/images/uploads/Ruaha_National_Park_Ruaha_River_39.jpg",
  ruaha4d: "https://www.tanzaniatourism.com/images/uploads/Ruaha_National_Park_Hippos_47.jpg",
  ruaha5d: "https://www.tanzaniatourism.com/images/uploads/Ruaha_National_Park_Elephants_49.jpg",
  ruaha7d: "https://www.tanzaniatourism.com/images/uploads/Udzungwa_Mountains_National_Park_01.jpg",
  ruaha10d: "https://www.tanzaniatourism.com/images/uploads/Nyerere_National_Park_Lions_102.jpg",
  serengeti3d: "https://www.tanzaniatourism.com/images/uploads/Serengeti_Wildebeests_03.jpg",
  ngorongoroDay: "https://www.tanzaniatourism.com/images/uploads/Ngorongoro_Crater_01_NCA.jpg",
  tarangireDay: "https://www.tanzaniatourism.com/images/uploads/Tarangire_National_Park_Lions_20.jpg",
  serengeti5d: "https://www.tanzaniatourism.com/images/uploads/Serengeti_National_Park_Wildebeests_20.jpg",
  lemosho7d: "https://www.tanzaniatourism.com/images/uploads/Kilimanjaro_Trek_Lemosho_Route_04.jpg",
  machame8d: "https://www.tanzaniatourism.com/images/uploads/Kilimanjaro_Climb_Machame_Route_03.jpg",
  shiraDay: "https://www.tanzaniatourism.com/images/uploads/Kilimanjaro_Climb_Shira_Plateau_02.jpg",
  migration: "https://www.tanzaniatourism.com/images/uploads/Serengeti_Wildebeests_03.jpg",
  olduvai: "https://www.tanzaniatourism.com/images/uploads/Olduvai_Gorge_NCA_2_1.jpg",
  udzungwa: "https://www.tanzaniatourism.com/images/uploads/Udzungwa_Mountains_National_Park_01.jpg",
};

export function bindNavImageFallbacks(root = document) {
  root.querySelectorAll(".mega-menu img, .site-header__brand-emblem").forEach((img) => {
    if (img.dataset.fallbackBound) return;
    img.dataset.fallbackBound = "1";
    img.addEventListener("error", () => {
      const fallback = img.getAttribute("data-fallback") || NAV_IMAGE_FALLBACK;
      if (fallback && !img.src.endsWith(fallback.replace(/^\//, ""))) {
        img.src = fallback;
      }
    }, { once: true });
  });
}
