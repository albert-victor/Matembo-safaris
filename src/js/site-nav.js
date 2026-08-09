export function initSiteNav() {
  const header = document.querySelector("[data-site-header]");
  if (!header) return;

  const toggle = header.querySelector("[data-nav-toggle]");
  const backdrop = document.querySelector("[data-nav-backdrop]");
  const megaItems = header.querySelectorAll("[data-mega]");
  const desktopQuery = window.matchMedia("(min-width: 901px)");
  let lastScrollY = window.scrollY;
  let closeTimer = null;

  function setScrolled() {
    const lightPage = document.querySelector(".dest-listing-hero");
    const hero = document.querySelector("[data-hero]");
    const scrolled = window.scrollY > 48;

    if (lightPage && !hero) {
      header.classList.add("is-scrolled");
      header.classList.remove("is-over-hero");
      return;
    }

    if (!hero) {
      header.classList.add("is-scrolled");
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
    });
    header.classList.add("is-mega-open");
  }

  function closeAllMega() {
    megaItems.forEach((item) => {
      const trigger = item.querySelector(".site-nav__trigger");
      const panel = item.querySelector(".mega-menu");
      item.classList.remove("is-open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (panel) panel.classList.remove("is-visible");
    });
    header.classList.remove("is-mega-open");
  }

  function scheduleClose() {
    clearTimeout(closeTimer);
    closeTimer = window.setTimeout(closeAllMega, 120);
  }

  toggle?.addEventListener("click", () => {
    setMobileOpen(!header.classList.contains("is-mobile-open"));
  });

  backdrop?.addEventListener("click", () => setMobileOpen(false));

  megaItems.forEach((item) => {
    const trigger = item.querySelector(".site-nav__trigger");
    const panel = item.querySelector(".mega-menu");
    if (!trigger || !panel) return;

    if (desktopQuery.matches) {
      item.addEventListener("mouseenter", () => openMega(item));
      item.addEventListener("mouseleave", scheduleClose);
      panel.addEventListener("mouseenter", () => clearTimeout(closeTimer));
      panel.addEventListener("mouseleave", scheduleClose);
    }

    trigger.addEventListener("click", (event) => {
      const isLink = trigger.tagName === "A";
      if (desktopQuery.matches && isLink) return;

      event.preventDefault();
      const willOpen = !item.classList.contains("is-open");
      closeAllMega();
      if (willOpen) openMega(item);
    });

    trigger.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      if (desktopQuery.matches && trigger.tagName === "A") return;

      event.preventDefault();
      item.classList.contains("is-open") ? closeAllMega() : openMega(item);
    });
  });

  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeAllMega();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllMega();
      setMobileOpen(false);
    }
  });

  window.addEventListener(
    "scroll",
    () => {
      if (Math.abs(window.scrollY - lastScrollY) < 4) return;
      lastScrollY = window.scrollY;
      setScrolled();
    },
    { passive: true }
  );

  setScrolled();
}
