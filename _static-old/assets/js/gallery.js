/* "Сүлд Ресортын агшинууд" — Swiper gallery */
(function () {
  if (!window.Swiper) return;
  const el = document.querySelector(".gallery-swiper .swiper");
  if (!el) return;

  const swiper = new Swiper(el, {
    effect: "coverflow",
    centeredSlides: true,
    slidesPerView: "auto",
    loop: true,
    speed: 800,
    grabCursor: true,
    keyboard: { enabled: true },
    autoplay: { delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true },
    coverflowEffect: { rotate: 0, stretch: 0, depth: 160, modifier: 1.2, scale: 0.86, slideShadows: false },
    navigation: { prevEl: ".g-prev", nextEl: ".g-next" },
    pagination: {
      el: ".g-pagination",
      type: "fraction",
      formatFractionCurrent: (n) => String(n).padStart(2, "0"),
      formatFractionTotal: (n) => String(n).padStart(2, "0"),
    },
    a11y: { prevSlideMessage: "Өмнөх зураг", nextSlideMessage: "Дараах зураг" },
  });

  // Side slides: first click brings them to the center; the centered slide opens the lightbox.
  el.addEventListener(
    "click",
    (e) => {
      const slide = e.target.closest(".swiper-slide");
      if (slide && !slide.classList.contains("swiper-slide-active")) {
        e.stopPropagation();
        e.preventDefault();
        swiper.slideToLoop(Number(slide.dataset.swiperSlideIndex));
      }
    },
    true
  );
})();
