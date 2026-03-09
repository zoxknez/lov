"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { mapZones } from "@/lib/data";

export default function InteractiveMap() {
  const [activeId, setActiveId] = useState(mapZones[0].id);
  const active = useMemo(() => mapZones.find((z) => z.id === activeId) ?? mapZones[0], [activeId]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="premium-panel map-intel-card rounded-[28px] p-5"
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">Interactive Estate Map</p>
        <div className="flex flex-wrap gap-2">
          {mapZones.map((zone) => (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveId(zone.id)}
              className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] transition ${zone.id === activeId ? "border-[#d9b167] bg-[#d9b167]/20 text-[#f0d8ac]" : "border-white/20 text-stone-300 hover:border-[#d9b167]/60"
                }`}
            >
              {zone.title}
            </button>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[linear-gradient(180deg,rgba(91,132,111,0.22),rgba(15,30,23,0.68))] p-4">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(214,170,95,0.16),transparent_42%),radial-gradient(circle_at_82%_70%,rgba(110,170,138,0.12),transparent_44%)]" />
        <div className="drone-scanline pointer-events-none absolute inset-0 z-[5] opacity-[0.15]" />

        {/* Drone Brackets */}
        <div className="drone-ui-bracket -left-1 -top-1 border-l-2 border-t-2 border-[#d9b167]/40" />
        <div className="drone-ui-bracket -right-1 -top-1 border-r-2 border-t-2 border-[#d9b167]/40" />
        <div className="drone-ui-bracket -bottom-1 -left-1 border-b-2 border-l-2 border-[#d9b167]/40" />
        <div className="drone-ui-bracket -bottom-1 -right-1 border-b-2 border-r-2 border-[#d9b167]/40" />

        <div className="relative z-10 min-h-[250px] overflow-hidden rounded-xl border border-white/10 bg-black/40">
          <div className="absolute left-4 top-4 z-20 flex flex-col gap-1 font-mono text-[8px] uppercase tracking-widest text-[#d9b167]/70">
            <span className="animate-pulse">LAT: 39.04° S</span>
            <span>LNG: 175.88° E</span>
            <span>ALT: {active.elevationM}M</span>
          </div>

          <svg viewBox="0 0 100 70" className="h-[250px] w-full filter drop-shadow-[0_0_8px_rgba(217,177,103,0.2)]">
            <defs>
              <linearGradient id="terrainGlow" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(223,194,143,0.22)" />
                <stop offset="100%" stopColor="rgba(116,181,142,0.12)" />
              </linearGradient>
            </defs>
            <path d="M4,50 C18,33 27,16 48,14 C68,12 84,22 96,32 L96,68 L4,68 Z" fill="rgba(10,24,18,0.9)" stroke="url(#terrainGlow)" />
            <path d="M12,46 C24,34 36,23 50,21 C66,19 79,25 90,33" fill="none" stroke="rgba(199,166,109,0.45)" strokeDasharray="2 2" />
            <path d="M17,55 C28,47 40,40 53,39 C66,38 76,43 86,50" fill="none" stroke="rgba(137,203,166,0.32)" strokeDasharray="2 2" />

            {mapZones.map((zone) => (
              <g key={zone.id}>
                <circle
                  cx={zone.x}
                  cy={zone.y}
                  r={zone.id === activeId ? 3.2 : 2.4}
                  fill={zone.id === activeId ? "#f1cf90" : "#d0b17d"}
                  onClick={() => setActiveId(zone.id)}
                  style={{ cursor: "pointer" }}
                />
                <circle cx={zone.x} cy={zone.y} r={zone.id === activeId ? 7.5 : 5.2} fill="none" stroke="rgba(241,207,144,0.4)" />
              </g>
            ))}
          </svg>
        </div>

        <div className="relative z-10 mt-3 grid gap-2 sm:grid-cols-2">
          <div className="premium-panel rounded-xl bg-black/35 p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">{active.title}</p>
            <p className="mt-1 text-sm text-stone-200">{active.text}</p>
          </div>
          <div className="premium-panel rounded-xl bg-black/35 p-3">
            <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Estate Notes</p>
            <div className="mt-1 grid grid-cols-2 gap-1 text-xs text-stone-100">
              <p>Elevation: {active.elevationM}m</p>
              <p>Risk: {active.risk}</p>
              <p>Movement: {active.density}</p>
              <p>Focus: {active.dominantSpecies}</p>
            </div>
            <p className="mt-2 text-xs text-[#f0d8ac]">Preferred window: {active.shotWindow}</p>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
