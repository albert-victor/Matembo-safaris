/** Toggle Ken Burns on safari cards only when visible in viewport. */
const motionObserver =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            entry.target.classList.toggle("is-motion-active", entry.isIntersecting);
          });
        },
        { rootMargin: "80px 0px", threshold: 0.08 }
      )
    : null;

export function syncCarouselCardMotion(slides, index, visible) {
  slides.forEach((slide, i) => {
    const card = slide.querySelector(".safari-card");
    if (!card) return;
    const inView = i >= index && i < index + visible;
    card.classList.toggle("is-motion-active", inView);
  });
}

export function initCardMotion(root = document) {
  if (!root?.querySelectorAll) return;

  root.querySelectorAll(".safari-card:not(.safari-card--carousel)").forEach((card) => {
    if (card.dataset.motionObserved === "true") return;
    card.dataset.motionObserved = "true";

    if (!motionObserver) {
      card.classList.add("is-motion-active");
      return;
    }

    motionObserver.observe(card);
  });
}
