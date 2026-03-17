"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Mountain,
  Plane,
  TentTree,
  Trees,
  WavesLadder
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { areaHighlights } from "@/lib/site-content";

const TERRITORY_SCENES = [
  {
    key: "north",
    title: areaHighlights[0].title,
    intro: areaHighlights[0].intro,
    details: areaHighlights[0].details,
    label: "North Island / Central Plateau",
    mediaType: "video",
    mediaSrc: "/media/hero-wilderness-demo.mp4",
    poster: "/media/hero-wilderness-poster.jpg",
    secondaryImage: "/media/species/sika-deer.jpg",
    eyebrow: "Bush-led access",
    cinematicTitle: "Forest edges, ridge systems, and hosted North Island bush country.",
    cinematicText:
      "This is the quieter, more intimate terrain story: first-light movement, bush entries, and a lodge-backed rhythm that still feels genuinely field-led.",
    tags: ["Sika + red deer", "Taupo / Turangi story", "4WD + foot access"],
    facts: [
      { icon: Trees, label: "Country", value: "Bush and hill terrain" },
      { icon: Compass, label: "Pace", value: "Quiet entries, morning windows" },
      { icon: Plane, label: "Support", value: "Selective access only" }
    ],
    notes: [
      "Central North Island bush and hill country around Taupo, Turangi, and the Kaimanawa ranges.",
      "Lodge comfort remains part of the rhythm without flattening the hunt into a packaged loop."
    ]
  },
  {
    key: "south",
    title: areaHighlights[1].title,
    intro: areaHighlights[1].intro,
    details: areaHighlights[1].details,
    label: "South Island / Southern Alps",
    mediaType: "image",
    mediaSrc: "/media/species/himalayan-tahr.jpg",
    poster: "/media/species/chamois.jpg",
    secondaryImage: "/media/experience-alpine-forest.jpg",
    eyebrow: "Alpine reach",
    cinematicTitle: "Southern Alps terrain where access, weather, and elevation decide the day.",
    cinematicText:
      "The South Island chapter should feel expansive and serious, with remote basins, valley systems, and exposed faces shaping every movement decision.",
    tags: ["Tahr + chamois", "Remote basins", "Weather-led access"],
    facts: [
      { icon: Mountain, label: "Country", value: "Steep alpine faces" },
      { icon: WavesLadder, label: "Movement", value: "River valleys and exposed basins" },
      { icon: TentTree, label: "Format", value: "Remote camp when needed" }
    ],
    notes: [
      "Public-facing wording stays intentionally broad because exact blocks and access points can change by permits and weather.",
      "This is the more dramatic chapter of the itinerary, with longer glassing sessions and more serious terrain."
    ]
  }
] as const;

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function TerritoryShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.25 });

  const [activeIdx, setActiveIdx] = useState(0);
  const activeScene = TERRITORY_SCENES[activeIdx];

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!inView || activeScene.mediaType !== "video") {
      video.pause();
      return;
    }

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => null);
    }
  }, [activeScene.mediaType, inView]);

  return (
    <section id="areas" ref={sectionRef} className="relative overflow-hidden py-28 lg:py-36">
      <div className="territory-orb absolute left-[-8rem] top-20 h-72 w-72 rounded-full bg-[#c8a96e]/14 blur-3xl" />
      <div className="territory-orb absolute bottom-[-5rem] right-[-4rem] h-96 w-96 rounded-full bg-[#33533e]/22 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(214,176,104,0.12),transparent_24%),radial-gradient(circle_at_84%_20%,rgba(51,83,62,0.18),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.98)_0%,rgba(10,12,10,0.96)_44%,rgba(18,16,12,0.96)_100%)]" />
      <div className="territory-grid absolute inset-0 opacity-35" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:items-end"
        >
          <div className="max-w-[48rem]">
            <Label gold>Territory / Scenic Briefing</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.9] tracking-[-0.04em] text-[#f3ede3]">
              The land defines the hunt.
              <span className="block italic font-light text-[#d4c9b6]">Now the section actually feels like land.</span>
            </h2>
          </div>

          <p className="max-w-[24rem] text-[15px] leading-[1.9] text-white/66 sm:text-[16px]">
            The old version was informational but visually empty. This redesign turns territory into
            an atmospheric comparison between North Island bush programs and South Island alpine access.
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
                key={activeScene.key}
                initial={reduceMotion ? false : { opacity: 0.14, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? {} : { opacity: 0.1, scale: 1.02 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {activeScene.mediaType === "video" ? (
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover object-center"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={activeScene.poster}
                  >
                    <source src={activeScene.mediaSrc} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={activeScene.mediaSrc}
                    alt={activeScene.title}
                    fill
                    sizes="(min-width: 1280px) 60vw, 100vw"
                    className="object-cover object-center"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(226,188,109,0.22),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.16)_0%,rgba(7,8,7,0.36)_42%,rgba(7,8,7,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.78)_0%,rgba(7,8,7,0.18)_44%,rgba(7,8,7,0.68)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/24 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                  <Label gold>{activeScene.eyebrow}</Label>
                </span>
                <span className="rounded-full border border-white/10 bg-black/18 px-4 py-2 label text-[9px] tracking-[0.28em] text-white/72 backdrop-blur-md">
                  AREA {String(activeIdx + 1).padStart(2, "0")} / {String(TERRITORY_SCENES.length).padStart(2, "0")}
                </span>
              </div>

              <div className="max-w-[35rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeScene.key}-headline`}
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Label gold>{activeScene.label}</Label>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.6rem,5.8vw,5.4rem)] leading-[0.92] tracking-[-0.04em] text-[#f5efe5]">
                      {activeScene.cinematicTitle}
                    </h3>
                    <p className="mt-4 text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                      {activeScene.cinematicText}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
                <div className="rounded-[1.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.62),rgba(9,10,9,0.28))] p-4 backdrop-blur-xl">
                  <div className="flex flex-wrap gap-2">
                    {activeScene.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/58"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {activeScene.facts.map((fact) => {
                      const Icon = fact.icon;

                      return (
                        <div key={fact.label} className="rounded-[1.15rem] border border-white/10 bg-black/16 p-3.5">
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                            <Icon size={16} className="text-[#c8a96e]" />
                          </span>
                          <p className="mt-3 label text-[8px] tracking-[0.25em] text-white/42">{fact.label}</p>
                          <p className="mt-2 text-[13px] leading-5 text-white/80">{fact.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="territory-float rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,11,10,0.74),rgba(10,11,10,0.42))] p-3 backdrop-blur-xl">
                  <div className="relative h-36 overflow-hidden rounded-[1.1rem] border border-white/10">
                    <Image
                      src={activeScene.secondaryImage}
                      alt={activeScene.label}
                      fill
                      sizes="240px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.05),rgba(7,8,7,0.7))]" />
                  </div>
                  <div className="mt-3">
                    <Label gold>Field reference</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/66">
                      Supporting visual that reinforces species fit and the overall territory mood.
                    </p>
                  </div>
                </div>
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
            <Label gold>Territory Dossier</Label>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${activeScene.key}-sidebar`}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-[2.15rem] leading-[0.96] text-white">
                  Compare both islands like an actual itinerary choice.
                </h3>
                <p className="mt-4 text-[14px] leading-7 text-white/68">
                  Pick the terrain chapter that best matches species timing, desired physicality, and how much remote reach the trip should carry.
                </p>

                <div className="mt-5 space-y-2.5">
                  {TERRITORY_SCENES.map((scene, index) => {
                    const active = index === activeIdx;

                    return (
                      <button
                        key={scene.key}
                        type="button"
                        onClick={() => setActiveIdx(index)}
                        className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${
                          active
                            ? "border-[#c8a96e]/40 bg-[#c8a96e]/10"
                            : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="label text-[8px] tracking-[0.26em] text-white/42">AREA {String(index + 1).padStart(2, "0")}</p>
                            <p className={`mt-2 text-[1.05rem] leading-6 ${active ? "text-white" : "text-white/76"}`}>
                              {scene.title}
                            </p>
                            <p className="mt-3 text-[13px] leading-6 text-white/58">{scene.intro}</p>
                          </div>
                          <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/18"}`} />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 space-y-3">
                  {activeScene.notes.map((note) => (
                    <div key={note} className="rounded-[1.3rem] border border-white/10 bg-black/16 p-4">
                      <p className="text-[13px] leading-6 text-white/72">{note}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <MagneticButton
                    tag="a"
                    href="#planning"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-6 py-3.5 label text-[10px] tracking-[0.32em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
                  >
                    VIEW ACCESS LOGIC <ArrowRight size={14} />
                  </MagneticButton>
                  <MagneticButton
                    tag="a"
                    href="#contact"
                    className="inline-flex items-center justify-center gap-3 rounded-full border border-white/16 bg-white/[0.04] px-6 py-3.5 label text-[10px] tracking-[0.3em] text-white/84 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
                  >
                    PLAN THE RIGHT AREA <ArrowRight size={14} />
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
          className="mt-8 grid gap-3 xl:grid-cols-2"
        >
          {TERRITORY_SCENES.map((scene, index) => {
            const active = index === activeIdx;

            return (
              <button
                key={scene.key}
                type="button"
                onClick={() => setActiveIdx(index)}
                className={`group relative overflow-hidden rounded-[1.6rem] border text-left transition-all duration-300 ${
                  active
                    ? "border-[#c8a96e]/40 bg-[#c8a96e]/10 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
                    : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
                }`}
              >
                <div className="grid gap-4 p-5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-center">
                  <div className="relative h-32 overflow-hidden rounded-[1.15rem] border border-white/10">
                    <Image
                      src={scene.secondaryImage}
                      alt={scene.title}
                      fill
                      sizes="220px"
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.05),rgba(7,8,7,0.7))]" />
                  </div>
                  <div className="min-w-0">
                    <Label gold={active}>Area {String(index + 1).padStart(2, "0")}</Label>
                    <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.55rem] leading-[1.02] text-white">
                      {scene.title}
                    </h3>
                    <p className="mt-3 text-[13px] leading-6 text-white/58">{scene.intro}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
