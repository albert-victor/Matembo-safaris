const TILT_MAX = 3.5;
const LIFT_MAX = 5;

function initCardTilt() {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const canHoverTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  if (prefersReducedMotion || !canHoverTilt) return;

  document.querySelectorAll("[data-tilt]").forEach((frame) => {
    let rafId = null;

    const reset = () => {
      if (rafId) cancelAnimationFrame(rafId);
      frame.style.transform = "";
    };

    const update = (event) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const rect = frame.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;

        frame.style.transform = `
          perspective(800px)
          rotateX(${-y * TILT_MAX}deg)
          rotateY(${x * TILT_MAX}deg)
          translateY(-${LIFT_MAX}px)
        `;
      });
    };

    frame.addEventListener("mousemove", update, { passive: true });
    frame.addEventListener("mouseleave", reset);
    frame.addEventListener("blur", reset, true);
  });
}

export { initCardTilt };
