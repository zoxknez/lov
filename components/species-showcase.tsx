"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  Compass,
  Mountain,
  ShieldCheck,
  Trees,
  Users
} from "lucide-react";
import { useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { speciesCatalog } from "@/lib/site-content";

const SPECIES_MEDIA = {
  "Red Deer": {
    image: "/media/species/red-deer.jpg",
    eyebrow: "Roar classic",
    fit: "object-center",
    tags: ["Mature stag", "Autumn roar", "Mixed access"],
    format: "Classic first-trip New Zealand trophy hunt.",
    terrainType: "High-country basins and bush margins",
    planning: "Best for guests who want a signature roar window with a strong hosted rhythm."
  },
  "Fallow Deer": {
    image: "/media/species/fallow-deer.jpg",
    eyebrow: "Selective stalk",
    fit: "object-center",
    tags: ["Autumn rut", "Open faces", "Private blocks"],
    format: "Selective, visual stalking with elegant trophy appeal.",
    terrainType: "Scrub country and open faces",
    planning: "A strong add-on or focused short program when timing and trophy goals are specific."
  },
  "Rusa Deer": {
    image: "/media/species/rusa-deer.jpg",
    eyebrow: "Later winter option",
    fit: "object-center",
    tags: ["North Island bush", "Private-country format", "Jul-Aug"],
    format: "A separate winter pursuit with its own pace and habitat.",
    terrainType: "Thicker North Island bush country",
    planning: "Best planned as a dedicated winter program rather than squeezed into an autumn itinerary."
  },
  "Sika Deer": {
    image: "/media/species/sika-deer.jpg",
    eyebrow: "Kaimanawa signature",
    fit: "object-center",
    tags: ["Kaimanawa country", "Quiet entries", "Rut window"],
    format: "One of New Zealand's most recognizable hosted bush hunts.",
    terrainType: "Central Plateau ridges and bush systems",
    planning: "Strong for guests who want the North Island story with real field character and pace."
  },
  "Arapawa Rams": {
    image: "/media/species/arapawa-rams.jpg",
    eyebrow: "Specialist add-on",
    fit: "object-center",
    tags: ["Private access", "By arrangement", "Selective add-on"],
    format: "A tightly arranged pursuit that works best as a specialist extension.",
    terrainType: "Private ground only",
    planning: "This is a precision option that depends on access, timing, and transport alignment."
  },
  "Chamois": {
    image: "/media/species/chamois.jpg",
    eyebrow: "Alpine glassing",
    fit: "object-center",
    tags: ["May-Jun focus", "Steep faces", "Weather led"],
    format: "Serious mountain hunting with light, patience, and glassing discipline.",
    terrainType: "Remote alpine faces and valleys",
    planning: "Perfect when the trip needs a true mountain chapter without forcing unnecessary camp theatrics."
  },
  "Himalayan Tahr": {
    image: "/media/species/himalayan-tahr.jpg",
    eyebrow: "High-country trophy",
    fit: "object-center",
    tags: ["Winter coat", "Southern Alps", "Heli support by need"],
    format: "One of the country's defining premium alpine trophies.",
    terrainType: "Southern Alps high country",
    planning: "Built for guests who want dramatic terrain, strong trophy presence, and weather-aware access."
  }
} as const;

type SpeciesName = keyof typeof SPECIES_MEDIA;

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function SpeciesShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);

  const activeSpecies = speciesCatalog[activeIdx];
  const activeMedia = SPECIES_MEDIA[activeSpecies.name as SpeciesName];

  return (
    <section id="species" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,10,9,0.98)_0%,rgba(10,13,11,0.98)_48%,rgba(8,9,8,0.99)_100%)]" />
      <div className="species-dossier absolute inset-0 opacity-90" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,23rem)] xl:items-end"
        >
          <div className="max-w-[50rem]">
            <Label gold>Species / Dossier Catalogue</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.9] tracking-[-0.05em] text-[#f3ede3]">
              Seven pursuits.
              <span className="block italic font-light text-[#d2c7b6]">Each should feel selected, not listed.</span>
            </h2>
          </div>

          <p className="max-w-[24rem] text-[15px] leading-[1.9] text-white/66 sm:text-[16px]">
            This section now behaves more like a premium field dossier. You browse, compare, and
            open each pursuit as its own file instead of scrolling through another repeated hero block.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)_19rem]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,10,0.92),rgba(8,11,10,0.72))] p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <Label gold>Index</Label>
                <p className="mt-2 text-sm text-white/52">Select a pursuit file.</p>
              </div>
              <span className="font-[family-name:var(--font-display)] text-4xl leading-none text-white/12">
                07
              </span>
            </div>

            <div className="space-y-2">
              {speciesCatalog.map((species, index) => {
                const media = SPECIES_MEDIA[species.name as SpeciesName];
                const active = index === activeIdx;

                return (
                  <button
                    key={species.name}
                    type="button"
                    onClick={() => setActiveIdx(index)}
                    className={`group w-full rounded-[1.35rem] border p-3 text-left transition-all duration-300 ${
                      active
                        ? "border-[#c8a96e]/40 bg-[#c8a96e]/10"
                        : "border-white/10 bg-black/10 hover:border-white/18 hover:bg-white/[0.03]"
                    }`}
                  >
                    <div className="grid grid-cols-[4rem_minmax(0,1fr)] gap-3">
                      <div className="relative h-16 overflow-hidden rounded-[1rem] border border-white/10">
                        <Image
                          src={media.image}
                          alt={species.name}
                          fill
                          sizes="96px"
                          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.04),rgba(7,8,7,0.62))]" />
                      </div>
                      <div className="min-w-0">
                        <p className={`label text-[8px] tracking-[0.24em] ${active ? "text-[#e8c98a]" : "text-white/34"}`}>
                          {String(index + 1).padStart(2, "0")}
                        </p>
                        <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.28rem] leading-[1.02] text-white">
                          {species.name}
                        </h3>
                        <p className="mt-2 text-[12px] leading-5 text-white/54">{species.season}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden rounded-[2.15rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,13,12,0.92),rgba(10,13,12,0.76))] shadow-[0_40px_90px_rgba(0,0,0,0.28)]"
          >
            <div className="relative min-h-[34rem] overflow-hidden border-b border-white/10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSpecies.name}
                  initial={reduceMotion ? false : { opacity: 0.14, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={reduceMotion ? {} : { opacity: 0.1, scale: 1.02 }}
                  transition={{ duration: 0.62, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={activeMedia.image}
                    alt={activeSpecies.name}
                    fill
                    sizes="(min-width: 1280px) 50vw, 100vw"
                    className={`object-cover ${activeMedia.fit}`}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,9,0.06),rgba(8,10,9,0.2)_40%,rgba(8,10,9,0.88)_100%)]" />
              <div className="absolute left-6 top-6 rounded-full border border-white/14 bg-black/20 px-4 py-2 backdrop-blur-md">
                <Label gold>{activeMedia.eyebrow}</Label>
              </div>
              <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/16 px-4 py-2">
                <span className="label text-[9px] tracking-[0.28em] text-white/70">
                  FILE {String(activeIdx + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-end">
                  <div className="max-w-[36rem]">
                    <Label gold>{activeSpecies.season}</Label>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.05em] text-[#f5efe5]">
                      {activeSpecies.name}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.85] text-white/74 sm:text-[16px]">
                      {activeSpecies.note}
                    </p>
                  </div>

                  <div className="rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,12,11,0.74),rgba(9,12,11,0.42))] p-4 backdrop-blur-xl">
                    <Label>Field summary</Label>
                    <p className="mt-3 text-[13px] leading-6 text-white/72">{activeMedia.format}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 p-6 lg:grid-cols-[minmax(0,1fr)_15rem]">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.25rem] border border-white/10 bg-black/12 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <CalendarRange size={16} className="text-[#c8a96e]" />
                  </span>
                  <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/38">Season</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/78">{activeSpecies.season}</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-black/12 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Trees size={16} className="text-[#c8a96e]" />
                  </span>
                  <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/38">Terrain</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/78">{activeMedia.terrainType}</p>
                </div>
                <div className="rounded-[1.25rem] border border-white/10 bg-black/12 p-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Users size={16} className="text-[#c8a96e]" />
                  </span>
                  <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/38">Format</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/78">{activeMedia.format}</p>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-[#c8a96e]/18 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.02))] p-4">
                <Label gold>Why it fits</Label>
                <p className="mt-3 text-[13px] leading-6 text-white/72">{activeMedia.planning}</p>
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[1.95rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,10,0.94),rgba(8,11,10,0.76))] p-5"
          >
            <Label gold>Pursuit Briefing</Label>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[2.15rem] leading-[0.96] text-white">
              Read it like a file, not a gallery caption.
            </h3>

            <div className="mt-5 flex flex-wrap gap-2">
              {activeMedia.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/56"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-[1.3rem] border border-white/10 bg-black/10 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Compass size={17} className="text-[#c8a96e]" />
                  </span>
                  <div>
                    <Label gold>Terrain read</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/72">{activeSpecies.terrain}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-white/10 bg-black/10 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Mountain size={17} className="text-[#c8a96e]" />
                  </span>
                  <div>
                    <Label>Field feel</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/72">{activeMedia.format}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.3rem] border border-white/10 bg-black/10 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <ShieldCheck size={17} className="text-[#c8a96e]" />
                  </span>
                  <div>
                    <Label gold>Planning fit</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/72">{activeMedia.planning}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <MagneticButton
                tag="a"
                href="#planning"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-6 py-3.5 label text-[10px] tracking-[0.32em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
              >
                VIEW TIMING <ArrowRight size={14} />
              </MagneticButton>
              <MagneticButton
                tag="a"
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-white/16 bg-white/[0.04] px-6 py-3.5 label text-[10px] tracking-[0.3em] text-white/84 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
              >
                START ENQUIRY <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
