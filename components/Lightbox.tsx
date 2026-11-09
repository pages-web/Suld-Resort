"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Close } from "./Icons";

export type Photo = { src: string; alt: string };

export function useLightbox(photos: Photo[]) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((n: number) => setIndex(n), []);
  const node = <Lightbox photos={photos} index={index} setIndex={setIndex} />;
  return { open, node };
}

function Lightbox({ photos, index, setIndex }: { photos: Photo[]; index: number | null; setIndex: (n: number | null) => void }) {
  const n = photos.length;
  const go = useCallback((d: number) => index !== null && setIndex((index + d + n) % n), [index, n, setIndex]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIndex(null);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, go, setIndex]);

  if (index === null) return null;
  const p = photos[index];
  const btn = "absolute grid size-13 place-items-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-white/25";

  return (
    <div
      className="fixed inset-0 z-[100] grid animate-[pop_.3s_ease_both] place-items-center bg-[#08120c]/95 p-5"
      onClick={(e) => e.target === e.currentTarget && setIndex(null)}
      role="dialog"
      aria-modal="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img key={p.src} src={p.src} alt={p.alt} className="max-h-[86vh] max-w-[min(1100px,100%)] animate-pop rounded-xl shadow-[0_30px_80px_rgba(0,0,0,.6)]" />
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80">
        {p.alt} · {index + 1}/{n}
      </p>
      <button className={`${btn} top-5 right-5`} onClick={() => setIndex(null)} aria-label="Close"><Close /></button>
      <button className={`${btn} top-1/2 left-5 -translate-y-1/2`} onClick={() => go(-1)} aria-label="Previous"><ChevronLeft /></button>
      <button className={`${btn} top-1/2 right-5 -translate-y-1/2`} onClick={() => go(1)} aria-label="Next"><ChevronRight /></button>
    </div>
  );
}
