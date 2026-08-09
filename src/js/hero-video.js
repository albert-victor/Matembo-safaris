function initHeroVideo() {
  document.querySelectorAll(".hero-story__video").forEach((video) => {
    const section = video.closest("[data-hero-story]");
    if (!section) return;

    const trim = parseFloat(section.dataset.loopTrim || "0.8");
    const fallback = video.parentElement?.querySelector(".hero-story__fallback");
    let loopedToFallback = false;

    const showFallback = () => {
      if (loopedToFallback) return;
      loopedToFallback = true;
      video.pause();
      video.classList.add("is-hidden");
      fallback?.classList.add("is-visible");
      section.classList.remove("is-video-fade");
    };

    const restartClip = () => {
      if (!video.duration || !Number.isFinite(video.duration)) return;
      video.currentTime = 0.05;
      video.play().catch(showFallback);
    };

    video.addEventListener("error", showFallback);

    video.addEventListener("loadedmetadata", () => {
      video.play().catch(showFallback);
    });

    let lastLoopCheck = 0;

    video.addEventListener("timeupdate", () => {
      if (!video.duration || !Number.isFinite(video.duration) || loopedToFallback) return;

      const now = performance.now();
      if (now - lastLoopCheck < 250) return;
      lastLoopCheck = now;

      const remaining = video.duration - video.currentTime;
      if (remaining <= trim) {
        restartClip();
      }
    });

    video.addEventListener("ended", showFallback);

    video.play().catch(showFallback);
  });
}

export { initHeroVideo };
