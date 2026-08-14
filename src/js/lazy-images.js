/** Native-first image loading – no JS-required visibility for images with src. */

export function hydrateSlideImage(slide) {
  const img = slide?.querySelector("img[data-src]");
  if (!img) return;
  promoteDataSrc(img, { priority: true });
}

export function ensureImagePreconnect() {}

function promoteDataSrc(img, { priority = false } = {}) {
  const src = img.getAttribute("data-src");
  if (!src) return;

  img.removeAttribute("data-src");
  if (!img.hasAttribute("loading")) {
    img.loading = priority ? "eager" : "lazy";
  }
  if (priority && "fetchPriority" in img) {
    img.fetchPriority = "high";
  }
  img.src = src;
}

export function requestImageLoad(img, { priority = false } = {}) {
  if (!img) return Promise.resolve(false);

  if (img.getAttribute("data-src") && !img.getAttribute("src")) {
    promoteDataSrc(img, { priority });
  }

  if (img.complete) {
    return Promise.resolve(img.naturalWidth > 0);
  }

  return new Promise((resolve) => {
    img.addEventListener("load", () => resolve(true), { once: true });
    img.addEventListener("error", () => resolve(false), { once: true });
  });
}

export function loadImagesIn(root, { priority = false } = {}) {
  if (!root) return;
  root.querySelectorAll("img[data-src]").forEach((img) => {
    promoteDataSrc(img, { priority });
  });
}

export function waitForCardMedia(el, timeoutMs = 650) {
  const img = el.querySelector("img[data-src], img[src]");
  if (!img) return Promise.resolve(true);

  if (img.getAttribute("data-src")) {
    promoteDataSrc(img, { priority: true });
  }

  if (img.complete && img.naturalWidth > 0) {
    return Promise.resolve(true);
  }

  const loadPromise = new Promise((resolve) => {
    img.addEventListener("load", () => resolve(true), { once: true });
    img.addEventListener("error", () => resolve(false), { once: true });
  });
  const timeoutPromise = new Promise((resolve) => {
    window.setTimeout(() => resolve(false), timeoutMs);
  });

  return Promise.race([loadPromise, timeoutPromise]);
}

export function bootstrapImagesWithSrc(root = document) {
  /* Images with real src are visible by default – no class gate required. */
}

export function prefetchMegaMenuImages() {
  /* Mega menu images use native loading="lazy" with real src after hydration. */
}

function isNearViewport(el, margin = 480) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= vh + margin && rect.bottom >= -margin;
}

export function initLazyImages(root = document) {
  const images = [...root.querySelectorAll("img[data-src]")].filter((img) => !img.getAttribute("src"));

  if (!images.length) return;

  const visible = images.filter((img) => isNearViewport(img));
  visible.forEach((img) => promoteDataSrc(img, { priority: true }));

  const offscreen = images.filter((img) => !visible.includes(img));
  if (!offscreen.length) return;

  if (!("IntersectionObserver" in window)) {
    offscreen.forEach((img) => promoteDataSrc(img));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          promoteDataSrc(entry.target);
          obs.unobserve(entry.target);
        });
    },
    { rootMargin: "480px 0px", threshold: 0.01 }
  );

  offscreen.forEach((img) => observer.observe(img));
}
