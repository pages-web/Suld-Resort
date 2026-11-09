"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const SLIDES = ["/assets/img/hero/hero-1.jpg", "/assets/img/hero/hero-3.jpg", "/assets/img/hero/hero-2.jpg", "/assets/img/hero/hero-4.jpg"];

export default function HeroSlider({ alts }: { alts: string[] }) {
  const [i, setI] = useState(0);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((n) => (n + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, [tick]);

  return (
    <>
      <div className="absolute inset-0">
        {SLIDES.map((src, n) => (
          <Image
            key={src}
            src={src}
            alt={alts[n] ?? ""}
            fill
            priority={n === 0}
            quality={92}
            sizes="100vw"
            className={`hero-slide object-cover ${n === 0 ? "object-[center_60%]" : "object-[center_72%]"} ${n === i ? "on" : ""}`}
          />
        ))}
      </div>
      <div className="absolute right-[max(16px,calc((100%-1200px)/2))] bottom-56 z-10 hidden flex-col gap-2.5 md:flex">
        {SLIDES.map((_, n) => (
          <button
            key={n}
            aria-label={`${n + 1}`}
            onClick={() => {
              setI(n);
              setTick((t) => t + 1);
            }}
            className={`w-2.5 rounded-full border-[1.5px] transition-all duration-500 ${
              n === i ? "h-9 border-gold bg-gold" : "h-2.5 border-white/80 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </>
  );
}
