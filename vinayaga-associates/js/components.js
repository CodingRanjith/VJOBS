/**
 * Shared header/footer includes for static hosting.
 * Works via fetch when served over http(s). Falls back gracefully on file://.
 */
(function () {
  async function inject(selector, url) {
    const host = document.querySelector(selector);
    if (!host) return;
    try {
      const res = await fetch(url, { cache: "no-cache" });
      if (!res.ok) throw new Error("Include fetch failed");
      host.innerHTML = await res.text();
      host.dispatchEvent(new CustomEvent("va:include-loaded", { bubbles: true }));
    } catch (err) {
      console.warn("Could not load include:", url, err);
      host.innerHTML =
        '<div class="container-va py-3"><p class="mb-0 text-danger">Navigation failed to load. Please open this site through a local web server (not file://).</p></div>';
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const tasks = [];
    if (document.querySelector("[data-include='header']")) {
      tasks.push(inject("[data-include='header']", "includes/header.html"));
    }
    if (document.querySelector("[data-include='footer']")) {
      tasks.push(inject("[data-include='footer']", "includes/footer.html"));
    }
    Promise.all(tasks).then(() => {
      document.dispatchEvent(new CustomEvent("va:layout-ready"));
    });
  });
})();
