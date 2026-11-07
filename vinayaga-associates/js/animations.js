(function () {
  function initAOS() {
    if (typeof AOS === "undefined") return;
    AOS.init({
      duration: 650,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
      disable: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }

  function initSwiper() {
    if (typeof Swiper === "undefined") return;
    const el = document.querySelector(".swiper-clients");
    if (!el) return;
    // eslint-disable-next-line no-new
    new Swiper(".swiper-clients", {
      slidesPerView: 1,
      spaceBetween: 18,
      loop: true,
      autoplay: { delay: 4000, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 1 },
      },
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initAOS();
    initSwiper();
  });
})();
