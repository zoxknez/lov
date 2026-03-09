"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { trophyItems } from "@/lib/data";

export default function TrophyCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % trophyItems.length);
    }, 4200);

    return () => clearInterval(id);
  }, []);

  const item = trophyItems[index];

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-panel trophy-intel-card overflow-hidden rounded-[28px]"
    >
      <div className="relative h-[360px]">
        <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700" sizes="(max-width: 768px) 100vw, 600px" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute left-4 top-4 inline-flex rounded-full border border-[#e7cb95]/60 bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
          {item.season}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="font-serif text-3xl text-white md:text-4xl">{item.title}</h3>
          <p className="mt-1 max-w-xl text-sm text-stone-200">{item.note}</p>
        </div>
      </div>

      <div className="grid gap-3 border-t border-white/10 bg-black/35 p-4 sm:grid-cols-2">
        <div className="grid gap-2 text-sm text-stone-100">
          <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2"><span>Trophy class</span><span className="text-[#f0d8ac]">{item.score}</span></p>
          <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2"><span>Field distance</span><span className="text-[#f0d8ac]">{item.distanceM}m</span></p>
          <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2"><span>Conditions</span><span className="text-[#f0d8ac]">{item.wind}</span></p>
        </div>

        <div className="grid gap-2 text-sm text-stone-100">
          <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2"><span>Rifle setup</span><span className="text-[#f0d8ac]">{item.caliber}</span></p>
          <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2"><span>Lead guide</span><span className="text-[#f0d8ac]">{item.guide}</span></p>
          <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-3 py-2"><span>Planning fit</span><span className="text-[#f0d8ac]">{item.confidence}%</span></p>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/30 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.13em] text-stone-300">Archive Selection</p>
          <p className="text-xs uppercase tracking-[0.13em] text-[#d9b167]">{index + 1} / {trophyItems.length}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {trophyItems.map((entry, i) => (
            <button
              key={entry.title}
              type="button"
              aria-label={`Show trophy ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-xl border transition ${i === index ? "border-[#d9b167]/70" : "border-white/20 hover:border-[#d9b167]/45"
                }`}
            >
              <div className="relative h-20">
                <Image src={entry.image} alt={entry.title} fill className="object-cover" sizes="120px" />
                <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/25" />
                <p className="absolute bottom-1 left-2 right-2 truncate text-left text-[10px] uppercase tracking-[0.12em] text-stone-100">{entry.title}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
