import { bcardSlideshow } from "../data/bcard-slideshow-images.js";

const SLIDE_INTERVAL_MS = 11000;
const FADE_DURATION_MS = 6500;
const PRELOAD_AHEAD = 2;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.decoding = "async";
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}

function wrapKenburns(slideEl) {
  if (slideEl.querySelector(".bcard-cinema__kenburns")) return;

  const img = slideEl.querySelector("img");
  if (!img) return;

  const wrap = document.createElement("div");
  wrap.className = "bcard-cinema__kenburns";
  img.parentElement.insertBefore(wrap, img);
  wrap.appendChild(img);
}

function createSlide(slide, index) {
  const el = document.createElement("div");
  el.className = `bcard-cinema__slide${index === 0 ? " is-active" : ""}`;
  el.dataset.index = String(index);
  if (slide.kenburns) el.dataset.kenburns = slide.kenburns;

  const motion = document.createElement("div");
  motion.className = "bcard-cinema__kenburns";

  const img = document.createElement("img");
  img.src = slide.src;
  img.alt = "";
  img.width = 1920;
  img.height = 1080;
  img.style.setProperty("--bcard-focus", slide.focus || "center center");
  img.style.setProperty("--bcard-focus-mobile", slide.focusMobile || slide.focus || "center center");

  if (index === 0) {
    img.fetchPriority = "high";
    img.decoding = "sync";
  } else {
    img.loading = "lazy";
    img.decoding = "async";
  }

  motion.appendChild(img);
  el.appendChild(motion);
  return el;
}

function preloadUpcoming(slides, currentIndex) {
  for (let step = 1; step <= PRELOAD_AHEAD; step += 1) {
    const next = slides[(currentIndex + step) % slides.length];
    if (next?.src) preloadImage(next.src);
  }
}

function markCinemaReady(cinema) {
  if (cinema) cinema.classList.add("bcard-cinema--ready");
}

function syncExistingFirstSlide(container, firstSlide) {
  const existing = container.querySelector(".bcard-cinema__slide");
  if (!existing) return false;

  const img = existing.querySelector("img");
  if (!img) return false;

  img.src = firstSlide.src;
  img.style.setProperty("--bcard-focus", firstSlide.focus || "center center");
  img.style.setProperty("--bcard-focus-mobile", firstSlide.focusMobile || firstSlide.focus || "center center");

  if (firstSlide.kenburns) existing.dataset.kenburns = firstSlide.kenburns;
  wrapKenburns(existing);
  return true;
}

export function initBcardSlideshow(container = document.getElementById("bcard-slideshow")) {
  const slides = bcardSlideshow;
  const cinema = container?.closest(".bcard-cinema");
  if (!container || !slides.length) return null;

  const hasFirst = syncExistingFirstSlide(container, slides[0]);

  if (hasFirst) {
    slides.slice(1).forEach((slide, offset) => {
      container.appendChild(createSlide(slide, offset + 1));
    });
  } else {
    container.replaceChildren();
    slides.forEach((slide, index) => {
      container.appendChild(createSlide(slide, index));
    });
  }

  const firstImg = container.querySelector(".bcard-cinema__slide.is-active img");
  if (firstImg?.complete && firstImg.naturalWidth > 0) {
    markCinemaReady(cinema);
  } else if (firstImg) {
    firstImg.addEventListener("load", () => markCinemaReady(cinema), { once: true });
    firstImg.addEventListener("error", () => markCinemaReady(cinema), { once: true });
  } else {
    markCinemaReady(cinema);
  }

  preloadUpcoming(slides, 0);
  slides.slice(1).forEach((slide) => preloadImage(slide.src));

  if (slides.length < 2 || prefersReducedMotion()) {
    return null;
  }

  const slideEls = [...container.querySelectorAll(".bcard-cinema__slide")];
  let current = 0;
  let timerId = null;

  const advance = () => {
    const outgoing = slideEls[current];
    outgoing.classList.remove("is-active");
    outgoing.classList.add("is-fading-out");

    current = (current + 1) % slideEls.length;
    const incoming = slideEls[current];

    const motion = incoming.querySelector(".bcard-cinema__kenburns");
    if (motion) {
      motion.style.animation = "none";
      motion.style.transform = "scale(1) translate3d(0, 0, 0)";
      void motion.offsetHeight;
      motion.style.animation = "";
      motion.style.transform = "";
    }

    requestAnimationFrame(() => {
      incoming.classList.add("is-active");
    });

    window.setTimeout(() => {
      outgoing.classList.remove("is-fading-out");
    }, FADE_DURATION_MS + 120);

    preloadUpcoming(slides, current);
  };

  if (container) {
    container.style.setProperty("--bcard-fade-duration", `${FADE_DURATION_MS}ms`);
  }

  timerId = window.setInterval(advance, SLIDE_INTERVAL_MS);

  const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const onMotionChange = (event) => {
    if (event.matches) {
      window.clearInterval(timerId);
      timerId = null;
      slideEls.forEach((el, index) => {
        el.classList.toggle("is-active", index === 0);
      });
    } else if (!timerId) {
      current = 0;
      slideEls.forEach((el, index) => {
        el.classList.toggle("is-active", index === 0);
      });
      timerId = window.setInterval(advance, SLIDE_INTERVAL_MS);
    }
  };

  if (typeof motionQuery.addEventListener === "function") {
    motionQuery.addEventListener("change", onMotionChange);
  }

  return () => {
    if (timerId) window.clearInterval(timerId);
    if (typeof motionQuery.removeEventListener === "function") {
      motionQuery.removeEventListener("change", onMotionChange);
    }
  };
}
