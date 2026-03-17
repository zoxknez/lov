"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  type LucideIcon,
  ArrowRight,
  CalendarRange,
  Compass,
  House,
  Plane,
  ShieldCheck,
  Trees,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { experiencePillars } from "@/lib/site-content";

const EXPERIENCE_VIDEO_SRC = "/media/hero-wilderness-demo.mp4";
const EXPERIENCE_VIDEO_POSTER = "/media/experience-lodge-view.jpg";

type Fact = {
  icon: LucideIcon;
  label: string;
  value: string;
};

type ExperienceScene = {
  key: string;
  badge: string;
  title: string;
  text: string;
  mediaType: "image" | "video";
  mediaSrc: string;
  secondaryImage: string;
  mediaPosition?: string;
  cinematicLabel: string;
  cinematicTitle: string;
  cinematicText: string;
  tags: string[];
  facts: Fact[];
  supportTitle: string;
  supportText: string;
};

const EXPERIENCE_SCENES: ExperienceScene[] = [
  {
    key: "country",
    badge: experiencePillars[0].label,
    title: experiencePillars[0].title,
    text: experiencePillars[0].text,
    mediaType: "image",
    mediaSrc: "/media/experience-alpine-forest.jpg",
    secondaryImage: "/media/experience-lodge-view.jpg",
    mediaPosition: "object-center",
    cinematicLabel: "Terrain-First Thinking",
    cinematicTitle: "The country chooses the trip before the brochure ever can.",
    cinematicText:
      "Bush, river valleys, and alpine faces are matched to species and season first, so the program feels shaped by ground truth instead of marketing symmetry.",
    tags: ["North Island bush", "South Island alpine", "Species-led timing"],
    facts: [
      { icon: Trees, label: "Terrain", value: "Bush, valley, alpine" },
      { icon: Compass, label: "Method", value: "Country before itinerary" },
      { icon: CalendarRange, label: "Window", value: "Built around species timing" }
    ],
    supportTitle: "Country note",
    supportText: "The tone here is about reading terrain well, not decorating it with empty luxury cues."
  },
  {
    key: "hosting",
    badge: experiencePillars[1].label,
    title: experiencePillars[1].title,
    text: experiencePillars[1].text,
    mediaType: "video",
    mediaSrc: EXPERIENCE_VIDEO_SRC,
    secondaryImage: "/media/experience-alpine-forest.jpg",
    cinematicLabel: "Hosted Rhythm",
    cinematicTitle: "Lodge comfort supports the hunt instead of replacing it.",
    cinematicText:
      "Private rooms, recovery, and controlled transfers remain in frame, but the field standard still leads. The section should feel composed, not resort-soft.",
    tags: ["Private lodge feel", "Remote camps when needed", "Small hosted groups"],
    facts: [
      { icon: House, label: "Stay", value: "Lodge-backed base" },
      { icon: Users, label: "Format", value: "Usually 2-4 hunters" },
      { icon: Compass, label: "Reach", value: "Remote only when needed" }
    ],
    supportTitle: "Hosting note",
    supportText: "The hospitality layer is visible, but it stays secondary to the field logic and pace."
  },
  {
    key: "planning",
    badge: experiencePillars[2].label,
    title: experiencePillars[2].title,
    text: experiencePillars[2].text,
    mediaType: "image",
    mediaSrc: "/media/experience-lodge-view.jpg",
    secondaryImage: "/media/experience-alpine-forest.jpg",
    mediaPosition: "object-center",
    cinematicLabel: "Travel Confidence",
    cinematicTitle: "The premium feeling comes from removing uncertainty before arrival.",
    cinematicText:
      "Permits, rifles, transfers, trophy-export steps, and pacing all get settled early, so the hunt itself can stay uncluttered once boots hit the ground.",
    tags: ["DOC aware", "Rifles + permits", "Transfer logic"],
    facts: [
      { icon: ShieldCheck, label: "Compliance", value: "DOC + MPI aware" },
      { icon: Plane, label: "Travel", value: "Arrival mapped early" },
      { icon: Compass, label: "Outcome", value: "Trip feels composed" }
    ],
    supportTitle: "Planning note",
    supportText: "This chapter makes the site feel considered, because invisible friction is part of the design problem too."
  }
];

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function ExperienceShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });

  const [activeIdx, setActiveIdx] = useState(0);
  const activeScene = EXPERIENCE_SCENES[activeIdx];

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % EXPERIENCE_SCENES.length);
    }, 6800);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

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
    <section ref={sectionRef} className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,8,0.98)_0%,rgba(16,12,8,0.96)_42%,rgba(9,10,8,0.98)_100%)]" />
      <div className="experience-editorial absolute inset-0 opacity-90" />
      <div className="absolute inset-y-0 left-[10%] w-px bg-gradient-to-b from-transparent via-[#c8a96e]/35 to-transparent" />
      <div className="absolute inset-y-0 right-[14%] hidden w-px bg-gradient-to-b from-transparent via-white/10 to-transparent xl:block" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,24rem)] xl:items-end"
        >
          <div className="max-w-[54rem]">
            <Label gold>Experience / Editorial Spread</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.9vw,6.5rem)] leading-[0.88] tracking-[-0.05em] text-[#f4ede2]">
              Not a luxury wrapper.
              <span className="block italic font-light text-[#d8ccb8]">A field story with better manners.</span>
            </h2>
          </div>

          <p className="max-w-[25rem] text-[15px] leading-[1.9] text-white/65 sm:text-[16px]">
            This section now behaves like a magazine spread. It opens the site with point of view,
            chapter selection, and atmosphere instead of repeating another product dashboard.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[19rem_minmax(0,1fr)]">
          <div className="space-y-3 xl:pr-4">
            {EXPERIENCE_SCENES.map((scene, index) => {
              const active = index === activeIdx;

              return (
                <motion.button
                  key={scene.key}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.55,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => setActiveIdx(index)}
                  onMouseEnter={() => setActiveIdx(index)}
                  className={`w-full border-b pb-5 pt-1 text-left transition-all duration-300 ${
                    active ? "border-[#c8a96e]/45" : "border-white/10 hover:border-white/22"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span className={`font-[family-name:var(--font-display)] text-[3rem] leading-none ${active ? "text-[#e8c98a]" : "text-white/14"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <Label gold={active}>{scene.badge}</Label>
                      <h3 className="mt-3 font-[family-name:var(--font-display)] text-[1.7rem] leading-[0.98] text-white">
                        {scene.title}
                      </h3>
                      <p className="mt-3 text-[13px] leading-6 text-white/58">{scene.text}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[1.7rem] border border-[#c8a96e]/20 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.02))] p-5"
            >
              <Label gold>Editorial note</Label>
              <p className="mt-3 text-[14px] leading-7 text-white/72">
                The goal here is tone-setting. Before species, areas, or logistics, the site should
                prove it understands what this experience actually feels like.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <MagneticButton
                  tag="a"
                  href="#species"
                  className="inline-flex items-center gap-3 rounded-full bg-[#c8a96e] px-5 py-3 label text-[10px] tracking-[0.3em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
                >
                  SEE SPECIES <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_17rem] xl:items-start">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden rounded-[2.25rem] border border-white/12 bg-black/20 shadow-[0_40px_90px_rgba(0,0,0,0.28)]"
            >
              <div className="relative min-h-[35rem] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene.key}
                    initial={reduceMotion ? false : { opacity: 0.15, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? {} : { opacity: 0.08, scale: 1.02 }}
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
                        poster={EXPERIENCE_VIDEO_POSTER}
                      >
                        <source src={activeScene.mediaSrc} type="video/mp4" />
                      </video>
                    ) : (
                      <Image
                        src={activeScene.mediaSrc}
                        alt={activeScene.title}
                        fill
                        sizes="(min-width: 1280px) 55vw, 100vw"
                        className={activeScene.mediaPosition ? `object-cover ${activeScene.mediaPosition}` : "object-cover object-center"}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,8,6,0.08)_0%,rgba(10,8,6,0.25)_35%,rgba(10,8,6,0.9)_100%)]" />
                <div className="absolute inset-y-0 left-0 w-[45%] bg-[linear-gradient(90deg,rgba(10,8,6,0.78),rgba(10,8,6,0.1))]" />

                <div className="absolute left-6 top-6 rounded-full border border-white/14 bg-black/20 px-4 py-2 backdrop-blur-md">
                  <Label gold>{activeScene.cinematicLabel}</Label>
                </div>
                <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/18 px-4 py-2 backdrop-blur-md">
                  <span className="label text-[9px] tracking-[0.28em] text-white/72">
                    CHAPTER {String(activeIdx + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative z-10 flex min-h-[35rem] flex-col justify-end p-6 lg:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeScene.key}-copy`}
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
                      className="max-w-[38rem]"
                    >
                      <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.3rem,4.2vw,4.5rem)] leading-[0.92] tracking-[-0.04em] text-[#f5eee4]">
                        {activeScene.cinematicTitle}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.85] text-white/74 sm:text-[16px]">
                        {activeScene.cinematicText}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {activeScene.facts.map((fact) => {
                      const Icon = fact.icon;

                      return (
                        <div
                          key={fact.label}
                          className="rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(15,12,9,0.62),rgba(15,12,9,0.28))] p-4 backdrop-blur-xl"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                            <Icon size={16} className="text-[#c8a96e]" />
                          </span>
                          <p className="mt-3 label text-[8px] tracking-[0.25em] text-white/40">{fact.label}</p>
                          <p className="mt-2 text-[13px] leading-6 text-white/78">{fact.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.72, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <div className="overflow-hidden rounded-[1.7rem] border border-white/12 bg-[linear-gradient(180deg,rgba(15,12,9,0.72),rgba(15,12,9,0.42))] p-3">
                <div className="relative h-44 overflow-hidden rounded-[1.2rem] border border-white/10">
                  <Image
                    src={activeScene.secondaryImage}
                    alt={activeScene.supportTitle}
                    fill
                    sizes="280px"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,8,0.04),rgba(8,8,8,0.62))]" />
                </div>
                <div className="mt-4">
                  <Label gold>{activeScene.supportTitle}</Label>
                  <p className="mt-2 text-[13px] leading-6 text-white/66">{activeScene.supportText}</p>
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-white/10 bg-black/18 p-5">
                <Label>Signal words</Label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeScene.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/56"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
