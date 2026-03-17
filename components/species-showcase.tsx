"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  Compass,
  Mountain,
  ShieldCheck,
  Trees,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { speciesCatalog } from "@/lib/site-content";

const SPECIES_VIDEO_SRC = "/media/hero-wilderness-demo.mp4";
const SPECIES_VIDEO_POSTER = "/media/hero-wilderness-poster.jpg";

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

type SpeciesStat = {
  icon: typeof CalendarRange;
  label: string;
  value: string;
};

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function SpeciesShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });

  const [activeIdx, setActiveIdx] = useState(0);
  const activeSpecies = speciesCatalog[activeIdx];
  const activeMedia = SPECIES_MEDIA[activeSpecies.name as SpeciesName];

  const stats: SpeciesStat[] = [
    { icon: CalendarRange, label: "Season", value: activeSpecies.season },
    { icon: Trees, label: "Terrain", value: activeMedia.terrainType },
    { icon: Users, label: "Format", value: activeMedia.format }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!inView) {
      video.pause();
      return;
    }

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => null);
    }
  }, [inView]);

  return (
    <section
      id="species"
      ref={sectionRef}
      className="relative overflow-hidden py-28 lg:py-36"
    >
      <div className="species-orb absolute left-[-7rem] top-20 h-72 w-72 rounded-full bg-[#c8a96e]/14 blur-3xl" />
      <div className="species-orb absolute bottom-[-4rem] right-[-3rem] h-96 w-96 rounded-full bg-[#2f4f38]/22 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_16%,rgba(214,176,104,0.12),transparent_24%),radial-gradient(circle_at_84%_18%,rgba(58,96,70,0.18),transparent_28%),linear-gradient(180deg,rgba(7,8,7,0.98)_0%,rgba(10,13,10,0.97)_36%,rgba(20,16,11,0.96)_100%)]" />
      <div className="species-grid absolute inset-0 opacity-35" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:items-end"
        >
          <div className="max-w-[48rem]">
            <Label gold>Species Collection / Media Showcase</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.4rem)] leading-[0.9] tracking-[-0.04em] text-[#f3ede3]">
              Seven pursuits.
              <span className="block italic font-light text-[#d5cab7]">One country, now with atmosphere.</span>
            </h2>
          </div>

          <p className="max-w-[24rem] text-[15px] leading-[1.9] text-white/66 sm:text-[16px]">
            The old section had the information but not the feeling. This version turns species
            selection into a cinematic dossier with real imagery, motion, and a clearer planning
            read on every pursuit.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,27rem)] xl:gap-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[40rem] overflow-hidden rounded-[2rem] border border-white/12 bg-black/20 shadow-[0_32px_90px_rgba(0,0,0,0.3)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSpecies.name}
                initial={reduceMotion ? false : { opacity: 0.12, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? {} : { opacity: 0.12, scale: 1.02 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeMedia.image}
                  alt={activeSpecies.name}
                  fill
                  sizes="(min-width: 1280px) 60vw, 100vw"
                  className={`object-cover ${activeMedia.fit}`}
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(226,188,109,0.22),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.12)_0%,rgba(7,8,7,0.34)_42%,rgba(7,8,7,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.78)_0%,rgba(7,8,7,0.2)_42%,rgba(7,8,7,0.66)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/24 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                  <Label gold>{activeMedia.eyebrow}</Label>
                </span>
                <span className="rounded-full border border-white/10 bg-black/18 px-4 py-2 label text-[9px] tracking-[0.28em] text-white/72 backdrop-blur-md">
                  SPECIES {String(activeIdx + 1).padStart(2, "0")} / {String(speciesCatalog.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-end">
                <div className="max-w-[34rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeSpecies.name}-headline`}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Label gold>{activeSpecies.season}</Label>
                      <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6.4vw,6.2rem)] leading-[0.92] tracking-[-0.04em] text-[#f5efe5]">
                        {activeSpecies.name}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                        {activeSpecies.note}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="species-float rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.72),rgba(9,10,9,0.4))] p-3 backdrop-blur-xl">
                  <div className="relative h-36 overflow-hidden rounded-[1.1rem] border border-white/10">
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover object-center"
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster={SPECIES_VIDEO_POSTER}
                    >
                      <source src={SPECIES_VIDEO_SRC} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.06),rgba(7,8,7,0.72))]" />
                  </div>
                  <div className="mt-3">
                    <Label gold>Field Motion</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/66">
                      A live wilderness reel keeps the section moving even while the still imagery changes by species.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.62),rgba(9,10,9,0.28))] p-4 backdrop-blur-xl"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                        <Icon size={16} className="text-[#c8a96e]" />
                      </span>
                      <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/42">{stat.label}</p>
                      <p className="mt-2 text-[13px] leading-6 text-white/78">{stat.value}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.aside
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,11,10,0.7),rgba(10,11,10,0.38))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.28)] backdrop-blur-xl"
          >
            <Label gold>Pursuit Briefing</Label>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeSpecies.name}-sidebar`}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[2.15rem] leading-[0.96] text-white">
                  {activeSpecies.name} planning, made visual.
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-white/68">
                  {activeMedia.planning}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {activeMedia.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/58"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="rounded-[1.3rem] border border-white/10 bg-black/16 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                        <Compass size={17} className="text-[#c8a96e]" />
                      </span>
                      <div>
                        <Label>Terrain Read</Label>
                        <p className="mt-2 text-[13px] leading-6 text-white/72">{activeSpecies.terrain}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.3rem] border border-white/10 bg-black/16 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                        <Mountain size={17} className="text-[#c8a96e]" />
                      </span>
                      <div>
                        <Label>Field Feel</Label>
                        <p className="mt-2 text-[13px] leading-6 text-white/72">{activeMedia.format}</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[1.3rem] border border-white/10 bg-black/16 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                        <ShieldCheck size={17} className="text-[#c8a96e]" />
                      </span>
                      <div>
                        <Label>Why It Works</Label>
                        <p className="mt-2 text-[13px] leading-6 text-white/72">{activeMedia.planning}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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
              </motion.div>
            </AnimatePresence>
          </motion.aside>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-7"
        >
          {speciesCatalog.map((species, index) => {
            const media = SPECIES_MEDIA[species.name as SpeciesName];
            const active = activeIdx === index;

            return (
              <button
                key={species.name}
                type="button"
                onClick={() => setActiveIdx(index)}
                className={`group relative overflow-hidden rounded-[1.5rem] border text-left transition-all duration-300 ${
                  active
                    ? "border-[#c8a96e]/40 bg-[#c8a96e]/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="relative h-36">
                  <Image
                    src={media.image}
                    alt={species.name}
                    fill
                    sizes="(min-width: 1280px) 14vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.06),rgba(7,8,7,0.8))]" />
                </div>
                <div className="relative p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Label gold={active}>{String(index + 1).padStart(2, "0")}</Label>
                      <h3 className={`mt-2 font-[family-name:var(--font-display)] text-[1.35rem] leading-[1.02] ${active ? "text-white" : "text-white/84"}`}>
                        {species.name}
                      </h3>
                    </div>
                    <span className={`mt-1 h-2.5 w-2.5 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/18"}`} />
                  </div>
                  <p className="mt-3 text-[12px] leading-5 text-white/58">{media.eyebrow}</p>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
