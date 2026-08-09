export function initStickyStory() {
  const section = document.querySelector("[data-hero-story]");
  const videoWrap = section?.querySelector(".hero-story__video-wrap");
  const panels = section?.querySelectorAll("[data-story-panel]");

  if (!section || !panels?.length) return;

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  function setActivePanel(activePanel) {
    panels.forEach((panel) => {
      panel.classList.toggle("is-active", panel === activePanel);
    });
  }

  if (!("IntersectionObserver" in window)) {
    setActivePanel(panels[0]);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length) {
        setActivePanel(visible[0].target);
      }
    },
    { threshold: [0.35, 0.5, 0.65], rootMargin: "-12% 0px -12% 0px" }
  );

  panels.forEach((panel) => observer.observe(panel));

  if (!prefersReducedMotion && !isMobile && videoWrap) {
    let ticking = false;
    let parallaxActive = false;
    const scale =
      parseFloat(
        getComputedStyle(section).getPropertyValue("--hero-video-scale")
      ) || 1.28;

    function updateParallax() {
      const rect = section.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const inView = rect.bottom > 0 && rect.top < viewHeight;

      if (!inView) {
        if (parallaxActive) {
          videoWrap.classList.remove("is-parallax");
          videoWrap.style.transform = `scale(${scale})`;
          parallaxActive = false;
        }
        ticking = false;
        return;
      }

      if (!parallaxActive) {
        videoWrap.classList.add("is-parallax");
        parallaxActive = true;
      }

      const progress = Math.min(
        1,
        Math.max(0, (viewHeight - rect.top) / section.offsetHeight)
      );
      const offset = (progress - 0.5) * 18;
      videoWrap.style.transform = `translate3d(0, ${offset}px, 0) scale(${scale})`;
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true }
    );

    updateParallax();
  }
}
