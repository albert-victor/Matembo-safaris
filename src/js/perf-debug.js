/** Debug perf probes – session 260cb5 */
const ENDPOINT = "http://127.0.0.1:7315/ingest/1b98e4f6-7f8e-4c21-a775-a6108c5ffb25";
const SESSION = "260cb5";

export function perfLog(location, message, data = {}, hypothesisId = "PERF") {
  // #region agent log
  fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Debug-Session-Id": SESSION },
    body: JSON.stringify({
      sessionId: SESSION,
      location,
      message,
      data,
      hypothesisId,
      timestamp: Date.now(),
      runId: data.runId || "baseline",
    }),
  }).catch(() => {});
  // #endregion
}

export function auditPageImages(scope = document) {
  const imgs = [...scope.querySelectorAll("img")];
  const pending = imgs.filter((img) => img.dataset.src && !img.getAttribute("src"));
  const external = imgs.filter((img) => {
    const src = img.getAttribute("src") || img.dataset.src || "";
    return src.startsWith("http") && !src.includes(window.location.host);
  });
  const lazy = imgs.filter((img) => img.loading === "lazy");
  const eager = imgs.filter((img) => img.loading === "eager" || !img.loading);
  return {
    total: imgs.length,
    pending: pending.length,
    external: external.length,
    local: imgs.length - external.length,
    lazy: lazy.length,
    eager: eager.length,
    megaPending: pending.filter((img) => img.closest(".mega-menu")).length,
    externalHosts: [...new Set(external.map((img) => {
      try { return new URL(img.getAttribute("src") || img.dataset.src).host; } catch { return "invalid"; }
    }))],
  };
}

export function measureDomWeight(scope = document.body) {
  return {
    nodes: scope.querySelectorAll("*").length,
    scripts: document.querySelectorAll("script").length,
    stylesheets: document.styleSheets.length,
  };
}
