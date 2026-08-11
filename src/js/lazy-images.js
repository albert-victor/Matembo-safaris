/** Lazy-load images with priority queue */

const MAX_CONCURRENT = 16;
const LOAD_TIMEOUT_MS = 650;
const VISIBLE_PRIORITY_COUNT = 24;

let activeLoads = 0;
const pendingQueue = [];

export function hydrateSlideImage(slide) {
  const img = slide?.querySelector("img[data-src]");
  if (!img) return;
  requestImageLoad(img, { priority: true });
}

export function ensureImagePreconnect() {
  // Images are served locally — no external CDN preconnect needed.
}

function resolveImageSrc(img) {
  return img.getAttribute("data-src") || img.dataset.srcOriginal || "";
}

function markMediaReady(img) {
  img.classList.add("is-loaded");
  img
    .closest(".dest-card, .safari-card, .dest-teaser-slide, .mega-menu")
    ?.classList.add("is-media-ready");
}

function attachImageLoad(img, job, t0) {
  const src = resolveImageSrc(img);
  if (!src) {
    activeLoads = Math.max(0, activeLoads - 1);
    job.resolve?.(false);
    drainQueue();
    return;
  }

  img.removeAttribute("data-src");

  const finish = (ok) => {
    activeLoads = Math.max(0, activeLoads - 1);
    if (ok) markMediaReady(img);
    job.resolve?.(ok);
    drainQueue();
  };

  const onLoad = () => finish(true);
  const onError = () => finish(false);

  img.addEventListener("load", onLoad, { once: true });
  img.addEventListener("error", onError, { once: true });

  if (job.priority && "fetchPriority" in img) {
    img.fetchPriority = "high";
  }

  img.src = src;

  if (img.complete) {
    img.removeEventListener("load", onLoad);
    img.removeEventListener("error", onError);
    finish(img.naturalWidth > 0);
  }
}

function drainQueue() {
  while (activeLoads < MAX_CONCURRENT && pendingQueue.length) {
    const job = pendingQueue.shift();
    if (!job?.img?.isConnected) continue;

    const img = job.img;
    if (img.getAttribute("src") && img.complete && img.naturalWidth > 0) {
      markMediaReady(img);
      job.resolve?.(true);
      continue;
    }
    if (img.getAttribute("src") && !img.hasAttribute("data-src")) continue;

    const src = resolveImageSrc(img);
    if (!src && !img.getAttribute("data-src")) continue;

    activeLoads += 1;
    attachImageLoad(img, job, performance.now());
  }
}

export function requestImageLoad(img, { priority = false } = {}) {
  if (!img) return Promise.resolve(false);

  if (img.getAttribute("src") && !img.hasAttribute("data-src")) {
    if (img.complete) {
      const ok = img.naturalWidth > 0;
      if (ok) markMediaReady(img);
      return Promise.resolve(ok);
    }
    return new Promise((resolve) => {
      img.addEventListener("load", () => {
        markMediaReady(img);
        resolve(true);
      }, { once: true });
      img.addEventListener("error", () => resolve(false), { once: true });
    });
  }

  return new Promise((resolve) => {
    pendingQueue[priority ? "unshift" : "push"]({
      img,
      priority,
      resolve,
    });
    drainQueue();
  });
}

export function loadImagesIn(root, { priority = false } = {}) {
  if (!root) return;
  root.querySelectorAll("img[data-src]").forEach((img) => {
    requestImageLoad(img, { priority });
  });
}

function isNearViewport(el, margin = 480) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight || document.documentElement.clientHeight;
  return rect.top <= vh + margin && rect.bottom >= -margin;
}

export function waitForCardMedia(el, timeoutMs = LOAD_TIMEOUT_MS) {
  const img =
    el.querySelector(".safari-card__image[data-src], .safari-card__image") ||
    el.querySelector(".dest-card__cinema img[data-src], .dest-card__cinema img") ||
    el.querySelector("img[data-src]");

  if (!img) return Promise.resolve(true);

  if (img.complete && img.naturalWidth > 0) {
    markMediaReady(img);
    return Promise.resolve(true);
  }

  const loadPromise = requestImageLoad(img, { priority: true });
  const timeoutPromise = new Promise((resolve) => {
    window.setTimeout(() => resolve(false), timeoutMs);
  });

  return Promise.race([loadPromise, timeoutPromise]);
}

/** Wire up images that already have a real src (eager / static markup). */
export function bootstrapImagesWithSrc(root = document) {
  root.querySelectorAll('img[src]:not([src=""])').forEach((img) => {
    if (img.classList.contains("is-loaded")) return;
    if (img.complete && img.naturalWidth > 0) {
      markMediaReady(img);
      return;
    }
    img.addEventListener("load", () => markMediaReady(img), { once: true });
    img.addEventListener("error", () => img.classList.add("is-loaded"), { once: true });
  });
}

/** Prefetch mega-menu thumbs during idle time so opening the menu feels instant. */
export function prefetchMegaMenuImages() {
  const run = () => {
    document.querySelectorAll(".mega-menu img[data-src]").forEach((img) => {
      requestImageLoad(img, { priority: false });
    });
  };

  if ("requestIdleCallback" in window) {
    window.requestIdleCallback(run, { timeout: 2500 });
  } else {
    window.setTimeout(run, 1200);
  }
}

export function initLazyImages(root = document) {
  ensureImagePreconnect();
  bootstrapImagesWithSrc(root);

  const images = [...root.querySelectorAll("img[data-src]")].filter(
    (img) => !img.getAttribute("src") && !img.closest(".mega-menu")
  );

  if (!images.length) return;

  const visible = images.filter((img) => isNearViewport(img));
  const offscreen = images.filter((img) => !visible.includes(img));

  visible
    .sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
    .slice(0, VISIBLE_PRIORITY_COUNT)
    .forEach((img) => requestImageLoad(img, { priority: true }));

  if (!("IntersectionObserver" in window)) {
    offscreen.forEach((img) => requestImageLoad(img));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (a, b) =>
            a.target.getBoundingClientRect().top -
            b.target.getBoundingClientRect().top
        )
        .forEach((entry) => {
          requestImageLoad(entry.target, { priority: true });
          obs.unobserve(entry.target);
        });
    },
    { rootMargin: "480px 0px", threshold: 0.01 }
  );

  offscreen.forEach((img) => observer.observe(img));
}
