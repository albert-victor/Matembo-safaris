import { renderBcardPage } from "./render-bcard-page.js";
import { bcardData, buildVCard } from "../data/bcard-data.js";
import { initBcardSlideshow } from "./bcard-slideshow.js";

function downloadVCard() {
  const blob = new Blob([buildVCard()], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = bcardData.vcardFilename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function initSaveContactButtons() {
  document.querySelectorAll("[data-save-contact]").forEach((button) => {
    button.addEventListener("click", downloadVCard);
  });
}

function init() {
  try {
    document.documentElement.classList.add("bcard-body");
    document.body.classList.add("bcard-body");
    renderBcardPage();
    initSaveContactButtons();
    initBcardSlideshow();
  } catch (error) {
    console.error("Business card page init failed:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
