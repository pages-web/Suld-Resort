"use client";

import Image from "next/image";
import { useLightbox, type Photo } from "./Lightbox";

/** Room photo mosaic (first photo large) or masonry grid; every photo opens the lightbox. */
export default function PhotoGrid({ photos, variant = "room" }: { photos: Photo[]; variant?: "room" | "masonry" }) {
  const { open, node } = useLightbox(photos);

  if (variant === "masonry") {
    return (
      <div className="mt-10 columns-1 gap-3.5 sm:columns-2 lg:columns-3">
        {photos.map((p, i) => (
          <button
            key={p.src}
            onClick={() => open(i)}
            className="group mb-3.5 block w-full cursor-zoom-in overflow-hidden rounded-2xl shadow-soft transition duration-500 break-inside-avoid hover:-translate-y-1 hover:shadow-lift"
          >
            <Image src={p.src} alt={p.alt} width={800} height={1000} sizes="(max-width: 640px) 100vw, 400px" className="h-auto w-full transition duration-700 group-hover:scale-105" />
          </button>
        ))}
        {node}
      </div>
    );
  }

  return (
    <div className="grid auto-rows-[140px] grid-cols-3 gap-2.5 sm:auto-rows-[160px]">
      {photos.map((p, i) => (
        <button
          key={p.src}
          onClick={() => open(i)}
          className={`group relative cursor-zoom-in overflow-hidden rounded-xl shadow-soft transition duration-500 hover:-translate-y-1 hover:shadow-lift ${
            i === 0 ? "col-span-3 row-span-2" : ""
          }`}
        >
          <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(max-width: 900px) 100vw, 640px" : "220px"} quality={88} className="object-cover transition duration-700 group-hover:scale-105" />
        </button>
      ))}
      {node}
    </div>
  );
}
