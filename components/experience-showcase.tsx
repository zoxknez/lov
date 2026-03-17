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
    cinematicTitle: "Place leads the hunt before any itinerary becomes fixed.",
    cinematicText:
      "Bush, river valleys, and alpine faces are matched to species and season first, so the trip feels composed rather than packaged.",
    tags: ["North Island bush", "South Island alpine", "Species-led timing"],
    facts: [
      { icon: Trees, label: "Terrain", value: "Bush, valley, alpine" },
      { icon: Compass, label: "Approach", value: "Country before brochure" },
      { icon: CalendarRange, label: "Window", value: "Built around species timing" }
    ],
    supportTitle: "Hosted base, real reach",
    supportText: "Comfort stays part of the experience, but the plan still starts with the right country."
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
    cinematicTitle: "Lodge comfort stays in frame without dulling the field standard.",
    cinematicText:
      "Private rooms, proper recovery, and controlled transfers sit underneath the hunt instead of turning it into a tourist loop.",
    tags: ["Private lodge feel", "Remote camps when needed", "Small hosted groups"],
    facts: [
      { icon: House, label: "Stay", value: "Lodge-backed base" },
      { icon: Users, label: "Group size", value: "Usually 2-4 hunters" },
      { icon: Compass, label: "Reach", value: "Remote only when needed" }
    ],
    supportTitle: "Scene reference",
    supportText: "This panel uses an external aerial lodge visual so the section feels alive instead of flat black."
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
    cinematicTitle: "Permits, rifles, transfers, and export are handled before arrival.",
    cinematicText:
      "The premium feeling is not just visual. It comes from removing uncertainty before the hunt starts and protecting the field pace once you land.",
    tags: ["DOC aware", "Rifles + permits", "Transfer logic"],
    facts: [
      { icon: ShieldCheck, label: "Compliance", value: "DOC + MPI aware" },
      { icon: Plane, label: "Travel", value: "Arrival mapped early" },
      { icon: Compass, label: "Outcome", value: "Trip feels composed" }
    ],
    supportTitle: "Planning card",
    supportText: "Species, month, and group size turn into a tailored travel and field outline with less friction."
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
    }, 6500);

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
      <div className="experience-orb absolute left-[-8rem] top-16 h-72 w-72 rounded-full bg-[#c8a96e]/14 blur-3xl" />
      <div className="experience-orb absolute bottom-[-5rem] right-[-2rem] h-80 w-80 rounded-full bg-[#36513c]/22 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(213,176,108,0.12),transparent_28%),radial-gradient(circle_at_82%_24%,rgba(74,104,76,0.18),transparent_34%),linear-gradient(135deg,rgba(7,8,7,0.98),rgba(12,14,11,0.96)_42%,rgba(24,18,12,0.94)_100%)]" />
      <div className="experience-grid absolute inset-0 opacity-40" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_minmax(20rem,28rem)] xl:items-end"
        >
          <div className="max-w-[48rem]">
            <Label gold>Field Standards / Editorial Feature</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.6vw,6.1rem)] leading-[0.9] tracking-[-0.04em] text-[#f2ece2]">
              Less outfitter.
              <span className="block italic font-light text-[#d9cfbf]">More private guide.</span>
            </h2>
          </div>

          <div className="xl:justify-self-end">
            <p className="max-w-[28rem] text-[15px] leading-[1.9] text-white/68 sm:text-[16px]">
              Kaimanawa Trophy Safaris works best when the site communicates atmosphere and operating
              logic at the same time. This section now does both: terrain, hosting standard, and
              travel confidence all move together instead of sitting in a flat black list.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <MagneticButton
                tag="a"
                href="#species"
                className="inline-flex items-center gap-3 rounded-full bg-[#c8a96e] px-6 py-3.5 label text-[10px] tracking-[0.32em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
              >
                EXPLORE SPECIES <ArrowRight size={14} />
              </MagneticButton>
              <MagneticButton
                tag="a"
                href="#planning"
                className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-white/[0.04] px-6 py-3.5 label text-[10px] tracking-[0.3em] text-white/82 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
              >
                VIEW PLANNING <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(20rem,30rem)] xl:gap-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[32rem] overflow-hidden rounded-[2rem] border border-white/12 bg-black/20 shadow-[0_32px_90px_rgba(0,0,0,0.32)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeScene.key}
                initial={reduceMotion ? false : { opacity: 0.15, scale: 1.03 }}
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
                    poster={EXPERIENCE_VIDEO_POSTER}
                  >
                    <source src={activeScene.mediaSrc} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={activeScene.mediaSrc}
                    alt={activeScene.title}
                    fill
                    sizes="(min-width: 1280px) 60vw, 100vw"
                    className={activeScene.mediaPosition ? `object-cover ${activeScene.mediaPosition}` : "object-cover object-center"}
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(228,194,126,0.22),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.18)_0%,rgba(7,8,7,0.36)_42%,rgba(7,8,7,0.88)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.72)_0%,rgba(7,8,7,0.12)_42%,rgba(7,8,7,0.72)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/24 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                  <Label gold>{activeScene.cinematicLabel}</Label>
                </span>
                {activeScene.mediaType === "video" && (
                  <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/18 px-4 py-2 backdrop-blur-md">
                    <span className="label text-[9px] tracking-[0.28em] text-white/72">External video preview</span>
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8a96e]/70" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e8c98a]" />
                    </span>
                  </span>
                )}
              </div>

              <div className="max-w-[35rem]">
                <motion.div
                  key={`${activeScene.key}-copy`}
                  initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.6rem)] leading-[0.94] tracking-[-0.03em] text-[#f5eee4]">
                    {activeScene.cinematicTitle}
                  </h3>
                  <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                    {activeScene.cinematicText}
                  </p>
                </motion.div>
              </div>

              <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
                <div className="rounded-[1.5rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,8,7,0.62),rgba(7,8,7,0.3))] p-4 backdrop-blur-xl">
                  <div className="flex flex-wrap gap-2">
                    {activeScene.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-3">
                    {activeScene.facts.map((fact) => {
                      const Icon = fact.icon;

                      return (
                        <div key={fact.label} className="rounded-[1.1rem] border border-white/10 bg-black/16 p-3.5">
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

                <motion.div
                  key={`${activeScene.key}-support`}
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="experience-float rounded-[1.4rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,11,10,0.74),rgba(10,11,10,0.42))] p-3 backdrop-blur-xl"
                >
                  <div className="relative h-32 overflow-hidden rounded-[1.1rem] border border-white/10">
                    <Image
                      src={activeScene.secondaryImage}
                      alt={activeScene.supportTitle}
                      fill
                      sizes="240px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.05),rgba(7,8,7,0.68))]" />
                  </div>
                  <div className="mt-3">
                    <Label gold>{activeScene.supportTitle}</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/66">{activeScene.supportText}</p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-3">
            {EXPERIENCE_SCENES.map((scene, index) => {
              const active = index === activeIdx;

              return (
                <motion.button
                  key={scene.key}
                  type="button"
                  initial={reduceMotion ? false : { opacity: 0, x: 14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{
                    duration: 0.65,
                    delay: reduceMotion ? 0 : index * 0.08,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  onClick={() => setActiveIdx(index)}
                  onMouseEnter={() => setActiveIdx(index)}
                  className={`w-full rounded-[1.7rem] border p-5 text-left transition-all duration-300 ${
                    active
                      ? "border-[#c8a96e]/40 bg-[linear-gradient(135deg,rgba(200,169,110,0.14),rgba(255,255,255,0.02))] shadow-[0_20px_60px_rgba(0,0,0,0.18)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
                  }`}
                >
                  <div className="flex gap-4">
                    <span className={`font-[family-name:var(--font-display)] text-[2.8rem] leading-none ${active ? "text-[#e8c98a]" : "text-white/12"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Label gold={active}>{scene.badge}</Label>
                          <h3 className="mt-2 font-[family-name:var(--font-display)] text-[1.6rem] leading-[1.04] text-white">
                            {scene.title}
                          </h3>
                        </div>
                        <span className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/18"}`} />
                      </div>

                      <p className="mt-4 text-[14px] leading-[1.85] text-white/62">{scene.text}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {scene.tags.map((tag) => (
                          <span
                            key={tag}
                            className={`rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] ${
                              active
                                ? "border-[#c8a96e]/30 bg-[#c8a96e]/10 text-[#e8c98a]"
                                : "border-white/10 bg-white/[0.04] text-white/54"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
