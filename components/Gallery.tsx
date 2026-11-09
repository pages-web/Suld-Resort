"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { A11y, Autoplay, EffectCoverflow, Keyboard, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { useLightbox } from "./Lightbox";
import { ChevronLeft, ChevronRight } from "./Icons";

const FILES = ["p09", "p13", "p11", "p02", "p16", "p04", "p03", "p01", "p19", "p15", "p12", "p17", "p27", "p21", "p14"];

/** "Сүлд Ресортын агшинууд" — Swiper coverflow carousel with lightbox. */
export default function Gallery({ caps, prev, next }: { caps: string[]; prev: string; next: string }) {
  const photos = FILES.map((f, i) => ({ src: `/assets/img/${f}.jpg`, alt: caps[i] }));
  const { open, node } = useLightbox(photos);
  const swiperRef = useRef<SwiperType | null>(null);
  const navBtn =
    "grid size-12.5 place-items-center rounded-full border-[1.5px] border-line bg-surface text-fg shadow-soft transition duration-300 hover:scale-110 hover:border-forest-800 hover:bg-forest-800 hover:text-gold";

  return (
    <div className="gallery-swiper mt-11">
      <Swiper
        modules={[EffectCoverflow, Autoplay, Navigation, Pagination, Keyboard, A11y]}
        effect="coverflow"
        centeredSlides
        slidesPerView="auto"
        loop
        speed={800}
        grabCursor
        keyboard={{ enabled: true }}
        autoplay={{ delay: 3800, disableOnInteraction: false, pauseOnMouseEnter: true }}
        coverflowEffect={{ rotate: 0, stretch: 0, depth: 160, modifier: 1.2, scale: 0.86, slideShadows: false }}
        navigation={{ prevEl: ".g-prev", nextEl: ".g-next" }}
        pagination={{
          el: ".g-pagination",
          type: "fraction",
          formatFractionCurrent: (n: number) => String(n).padStart(2, "0"),
          formatFractionTotal: (n: number) => String(n).padStart(2, "0"),
        }}
        onSwiper={(s) => (swiperRef.current = s)}
      >
        {photos.map((p, i) => (
          <SwiperSlide key={p.src}>
            {({ isActive }) => (
              <button
                type="button"
                className={`relative block size-full ${isActive ? "cursor-zoom-in" : "cursor-pointer"}`}
                onClick={() => (isActive ? open(i) : swiperRef.current?.slideToLoop(i))}
                aria-label={p.alt}
              >
                <Image src={p.src} alt={p.alt} fill sizes="(max-width: 640px) 80vw, 480px" quality={85} className="object-cover" />
                <span className="slide-cap pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0a1912]/80 to-transparent px-5.5 pt-10 pb-4.5 text-left font-bold text-white">
                  {p.alt}
                </span>
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="container-x flex items-center justify-center gap-4.5">
        <button className={`g-prev ${navBtn}`} aria-label={prev}><ChevronLeft /></button>
        <div className="g-pagination" />
        <button className={`g-next ${navBtn}`} aria-label={next}><ChevronRight /></button>
      </div>
      {node}
    </div>
  );
}
