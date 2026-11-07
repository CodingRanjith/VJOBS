(function () {
  function setActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll("[data-nav]").forEach((el) => {
      if (el.getAttribute("data-nav") === page) {
        el.classList.add("active");
        el.setAttribute("aria-current", "page");
      }
    });
  }

  function bindStickyHeader() {
    const header = document.getElementById("siteHeader");
    if (!header) return;
    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function setYear() {
    const el = document.getElementById("yearStamp");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  function init() {
    setActiveNav();
    bindStickyHeader();
    setYear();
  }

  document.addEventListener("va:layout-ready", init);
  document.addEventListener("DOMContentLoaded", () => {
    // If includes are already inline / cached
    if (document.getElementById("siteHeader")) init();
  });
})();
