"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "./Icons";

const REELS = [
  ["38304508389193997", "v01"],
  ["1543691247102537", "v02"],
  ["1027758716483310", "v03"],
  ["1048766944145784", "v04"],
  ["2613218512445531", "v05"],
];

/** Facebook reels — thumbnail first, the embed only loads after a click. */
export default function Videos({ caps }: { caps: string[] }) {
  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="mt-10 grid snap-x snap-mandatory auto-cols-[minmax(250px,1fr)] grid-flow-col gap-4.5 overflow-x-auto pb-3">
      {REELS.map(([id, thumb], i) => (
        <div key={id} className="group relative aspect-[9/16] snap-start overflow-hidden rounded-[18px] bg-black shadow-soft transition duration-500 hover:-translate-y-1.5 hover:shadow-lift">
          {playing === id ? (
            <iframe
              src={`https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(`https://www.facebook.com/reel/${id}/`)}&show_text=false&autoplay=true&width=320`}
              className="absolute inset-0 size-full border-0"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              allowFullScreen
              title={caps[i]}
            />
          ) : (
            <button className="absolute inset-0 size-full text-white" onClick={() => setPlaying(id)} aria-label={caps[i]}>
              <Image src={`/assets/img/${thumb}.jpg`} alt="" fill sizes="280px" className="object-cover opacity-85 transition duration-500 group-hover:scale-105 group-hover:opacity-100" />
              <span className="absolute inset-0 m-auto grid size-18 place-items-center rounded-full bg-gold/90 pl-1 text-forest-900 shadow-[0_0_0_10px_rgba(201,163,90,.25)] transition duration-400 group-hover:scale-110">
                <Play />
              </span>
              <span className="absolute inset-x-3.5 bottom-3.5 text-left font-bold [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">{caps[i]}</span>
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
