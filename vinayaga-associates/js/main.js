(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // Close mobile nav after clicking a link
    document.addEventListener("click", (e) => {
      const link = e.target.closest("#primaryNav .nav-link, #primaryNav .dropdown-item, #primaryNav .header-cta");
      if (!link) return;
      const collapse = document.getElementById("primaryNav");
      if (collapse && collapse.classList.contains("show") && window.bootstrap) {
        const instance = bootstrap.Collapse.getInstance(collapse);
        if (instance) instance.hide();
      }
    });
  });
})();
