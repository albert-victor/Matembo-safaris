import { loadImagesIn } from "./lazy-images.js";

export function initSiteNav() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const navPanel = header.querySelector("#site-nav-panel");
  const toggle = header.querySelector("[data-nav-toggle]");
  const closeBtn = header.querySelector("[data-nav-close]");
  const backdrop = document.querySelector("[data-nav-backdrop]");
  const megaItems = header.querySelectorAll("[data-mega]");
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  let lastScrollY = window.scrollY;
  let closeTimer = null;
  const megaHandlers = new WeakMap();

  function isDesktop() {
    return desktopQuery.matches;
  }

  function setScrolled() {
    const lightPage = document.querySelector(".dest-listing-hero");
    const hero = document.querySelector("[data-hero]");
    const pendingHeroSlot = document.querySelector("#home-hero");
    const scrolled = window.scrollY > 48;

    if (lightPage && !hero) {
      header.classList.add("is-scrolled");
      header.classList.remove("is-over-hero");
      return;
    }

    if (!hero) {
      if (pendingHeroSlot && !pendingHeroSlot.querySelector("[data-hero]")) {
        header.classList.remove("is-scrolled");
        header.classList.add("is-over-hero");
        return;
      }

      header.classList.toggle("is-scrolled", scrolled || true);
      header.classList.remove("is-over-hero");
      return;
    }

    const heroBottom = hero.offsetHeight;
    const overHero = window.scrollY < heroBottom - 80;

    header.classList.toggle("is-scrolled", scrolled);
    header.classList.toggle("is-over-hero", overHero);
  }

  function setMobileOpen(open) {
    header.classList.toggle("is-mobile-open", open);
    toggle?.setAttribute("aria-expanded", open ? "true" : "false");
    toggle?.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    closeBtn?.setAttribute("aria-hidden", open ? "false" : "true");
    if (backdrop) {
      backdrop.hidden = !open;
      backdrop.setAttribute("aria-hidden", open ? "false" : "true");
    }
    document.documentElement.classList.toggle("is-nav-locked", open);
    if (!open) closeAllMega();
  }

  function openMega(item) {
    clearTimeout(closeTimer);
    megaItems.forEach((entry) => {
      const trigger = entry.querySelector(".site-nav__trigger");
      const panel = entry.querySelector(".mega-menu");
      const isTarget = entry === item;

      entry.classList.toggle("is-open", isTarget);
      if (trigger) trigger.setAttribute("aria-expanded", isTarget ? "true" : "false");
      if (panel) panel.classList.toggle("is-visible", isTarget);
      if (isTarget && panel) {
        loadImagesIn(panel, { priority: true });
      }
    });
    header.classList.add("is-mega-open");
    if (backdrop && isDesktop()) {
      backdrop.hidden = false;
      backdrop.setAttribute("aria-hidden", "true");
    }
  }

  function closeAllMega() {
    clearTimeout(closeTimer);
    megaItems.forEach((item) => {
      const trigger = item.querySelector(".site-nav__trigger");
      const panel = item.querySelector(".mega-menu");
      item.classList.remove("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (panel) panel.classList.remove("is-visible");
    });
    header.classList.remove("is-mega-open");
    if (backdrop && isDesktop() && !header.classList.contains("is-mobile-open")) {
      backdrop.hidden = true;
      backdrop.setAttribute("aria-hidden", "true");
    }
  }

  function toggleMega(item) {
    const willOpen = !item.classList.contains("is-open");
    if (willOpen) {
      openMega(item);
    } else {
      closeAllMega();
    }
  }

  function scheduleClose() {
    if (!isDesktop()) return;
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(closeAllMega, 90);
  }

  function bindMegaHover(item) {
    if (megaHandlers.has(item)) return;

    const trigger = item.querySelector(".site-nav__trigger");
    const panel = item.querySelector(".mega-menu");
    if (!trigger || !panel) return;

    const onEnter = () => openMega(item);
    const onLeave = () => scheduleClose();
    const onPanelEnter = () => clearTimeout(closeTimer);

    item.addEventListener("mouseenter", onEnter);
    item.addEventListener("mouseleave", onLeave);
    panel.addEventListener("mouseenter", onPanelEnter);
    panel.addEventListener("mouseleave", onLeave);

    megaHandlers.set(item, { onEnter, onLeave, onPanelEnter });
  }

  function unbindMegaHover(item) {
    const handlers = megaHandlers.get(item);
    if (!handlers) return;

    const panel = item.querySelector(".mega-menu");
    item.removeEventListener("mouseenter", handlers.onEnter);
    item.removeEventListener("mouseleave", handlers.onLeave);
    panel?.removeEventListener("mouseenter", handlers.onPanelEnter);
    panel?.removeEventListener("mouseleave", handlers.onLeave);
    megaHandlers.delete(item);
  }

  function syncMegaMode() {
    megaItems.forEach((item) => {
      if (isDesktop()) bindMegaHover(item);
      else unbindMegaHover(item);
    });
    if (!isDesktop()) closeAllMega();
  }

  toggle?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMobileOpen(!header.classList.contains("is-mobile-open"));
  });

  closeBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    setMobileOpen(false);
  });

  backdrop?.addEventListener("click", () => setMobileOpen(false));

  megaItems.forEach((item) => {
    const trigger = item.querySelector(".site-nav__trigger");
    const panel = item.querySelector(".mega-menu");
    if (!trigger || !panel) return;

    trigger.addEventListener("click", (event) => {
      if (isDesktop() && trigger.tagName === "A") return;

      event.preventDefault();
      event.stopPropagation();
      toggleMega(item);
    });

    panel.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (isDesktop() && trigger.tagName === "A") return;

      event.preventDefault();
      toggleMega(item);
    });
  });

  document.addEventListener("click", (event) => {
    if (header.classList.contains("is-mobile-open")) {
      if (navPanel?.contains(event.target)) return;
      return;
    }

    if (!isDesktop()) return;
    if (!header.contains(event.target)) closeAllMega();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllMega();
      setMobileOpen(false);
    }
  });

  desktopQuery.addEventListener("change", syncMegaMode);

  window.addEventListener(
    "scroll",
    () => {
      if (Math.abs(window.scrollY - lastScrollY) < 4) return;
      lastScrollY = window.scrollY;
      setScrolled();
    },
    { passive: true }
  );

  syncMegaMode();
  setScrolled();
}

export function refreshSiteHeaderState() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const lightPage = document.querySelector(".dest-listing-hero");
  const hero = document.querySelector("[data-hero]");
  const pendingHeroSlot = document.querySelector("#home-hero");
  const scrolled = window.scrollY > 48;

  if (lightPage && !hero) {
    header.classList.add("is-scrolled");
    header.classList.remove("is-over-hero");
    return;
  }

  if (!hero) {
    if (pendingHeroSlot && !pendingHeroSlot.querySelector("[data-hero]")) {
      header.classList.remove("is-scrolled");
      header.classList.add("is-over-hero");
      return;
    }

    header.classList.toggle("is-scrolled", scrolled || true);
    header.classList.remove("is-over-hero");
    return;
  }

  const heroBottom = hero.offsetHeight;
  const overHero = window.scrollY < heroBottom - 80;

  header.classList.toggle("is-scrolled", scrolled);
  header.classList.toggle("is-over-hero", overHero);
}
