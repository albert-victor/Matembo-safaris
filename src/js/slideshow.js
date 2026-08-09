export function initSlideshows(root = document) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  root.querySelectorAll("[data-slideshow]").forEach((slideshow) => {
    const slides = [...slideshow.querySelectorAll("[data-slide]")];
    const dots = [...slideshow.querySelectorAll("[data-slide-dot]")];
    const prevBtn = slideshow.querySelector("[data-slide-prev]");
    const nextBtn = slideshow.querySelector("[data-slide-next]");

    if (slides.length <= 1) return;

    let current = 0;
    let timer = null;
    const intervalMs = Number(slideshow.dataset.interval || 5000);

    const goTo = (index) => {
      slides[current]?.classList.remove("is-active");
      dots[current]?.classList.remove("is-active");
      dots[current]?.setAttribute("aria-selected", "false");

      current = (index + slides.length) % slides.length;

      slides[current]?.classList.add("is-active");
      dots[current]?.classList.add("is-active");
      dots[current]?.setAttribute("aria-selected", "true");
    };

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (prefersReducedMotion) return;
      stop();
      timer = setInterval(next, intervalMs);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goTo(i);
        start();
      });
    });

    prevBtn?.addEventListener("click", () => {
      prev();
      start();
    });

    nextBtn?.addEventListener("click", () => {
      next();
      start();
    });

    slideshow.addEventListener("mouseenter", stop);
    slideshow.addEventListener("mouseleave", start);
    slideshow.addEventListener("focusin", stop);
    slideshow.addEventListener("focusout", start);

    goTo(0);
    start();
  });
}
