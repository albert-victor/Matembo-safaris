/** Toggle Ken Burns on safari cards only when visible — max 4 concurrent. */
const MAX_MOTION = 4;
const cardStates = new Map();

function applyMotionCap() {
  const ranked = [...cardStates.entries()]
    .filter(([, state]) => state.intersecting)
    .sort((a, b) => b[1].ratio - a[1].ratio);

  const active = new Set(ranked.slice(0, MAX_MOTION).map(([card]) => card));

  cardStates.forEach((_, card) => {
    card.classList.toggle("is-motion-active", active.has(card));
  });
}

const motionObserver =
  typeof IntersectionObserver !== "undefined"
    ? new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              cardStates.set(entry.target, {
                intersecting: true,
                ratio: entry.intersectionRatio,
              });
            } else {
              cardStates.delete(entry.target);
              entry.target.classList.remove("is-motion-active");
            }
          });
          applyMotionCap();
        },
        { rootMargin: "60px 0px", threshold: [0, 0.1, 0.35, 0.6] }
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
