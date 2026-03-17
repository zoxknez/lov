"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  ShieldCheck,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { teamProfiles, values } from "@/lib/site-content";

const TEAM_MEDIA = [
  {
    badge: "Founding perspective",
    mediaType: "image",
    mediaSrc: "/media/experience-lodge-view.jpg",
    poster: "/media/experience-lodge-view.jpg",
    supportImage: "/media/species/red-deer.jpg",
    supportTitle: "Hosted standard",
    supportText: "Comfort, pace, and the overall guest rhythm are treated as part of the hunt standard."
  },
  {
    badge: "International viewpoint",
    mediaType: "image",
    mediaSrc: "/media/experience-alpine-forest.jpg",
    poster: "/media/experience-alpine-forest.jpg",
    supportImage: "/media/species/fallow-deer.jpg",
    supportTitle: "Selective standard",
    supportText: "Trips are shaped around quality, not volume, and that should be visible in the design language."
  },
  {
    badge: "Field guide authority",
    mediaType: "video",
    mediaSrc: "/media/hero-wilderness-demo.mp4",
    poster: "/media/hero-wilderness-poster.jpg",
    supportImage: "/media/species/chamois.jpg",
    supportTitle: "Field standard",
    supportText: "The guide layer should feel grounded, terrain-aware, and visibly tied to New Zealand country."
  }
] as const;

const TRUST_POINTS = [
  "Fair chase stays non-negotiable.",
  "Shot discipline and camp conduct are part of the product.",
  "Small hosted groups protect pace, privacy, and flexibility."
] as const;

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function StandardsShowcase() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.24 });

  const [activeIdx, setActiveIdx] = useState(0);
  const activeTeam = teamProfiles[activeIdx];
  const activeMedia = TEAM_MEDIA[activeIdx];

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % teamProfiles.length);
    }, 6400);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!inView || activeMedia.mediaType !== "video") {
      video.pause();
      return;
    }

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => null);
    }
  }, [activeMedia.mediaType, inView]);

  return (
    <section id="story" ref={sectionRef} className="relative overflow-hidden py-28 lg:py-36">
      <div className="standards-orb absolute left-[-8rem] top-20 h-80 w-80 rounded-full bg-[#c8a96e]/14 blur-3xl" />
      <div className="standards-orb absolute bottom-[-5rem] right-[-3rem] h-96 w-96 rounded-full bg-[#31513b]/22 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,176,104,0.13),transparent_26%),radial-gradient(circle_at_84%_18%,rgba(49,81,59,0.18),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.98)_0%,rgba(10,12,10,0.96)_42%,rgba(18,15,11,0.97)_100%)]" />
      <div className="standards-grid absolute inset-0 opacity-34" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:items-end"
        >
          <div className="max-w-[48rem]">
            <Label gold>Standards / Trust Layer</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.9] tracking-[-0.04em] text-[#f3ede3]">
              Earned over ninety years.
              <span className="block italic font-light text-[#d4c9b6]">Now the section feels credible, not decorative.</span>
            </h2>
          </div>

          <p className="max-w-[24rem] text-[15px] leading-[1.9] text-white/66 sm:text-[16px]">
            This block should build trust, not just fill space. The redesign turns values and team
            into one visible trust system with real atmosphere, field cues, and stronger hierarchy.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.06fr)_minmax(21rem,28rem)] xl:gap-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[40rem] overflow-hidden rounded-[2rem] border border-white/12 bg-black/20 shadow-[0_32px_90px_rgba(0,0,0,0.3)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTeam.name}
                initial={reduceMotion ? false : { opacity: 0.14, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? {} : { opacity: 0.1, scale: 1.02 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                {activeMedia.mediaType === "video" ? (
                  <video
                    ref={videoRef}
                    className="h-full w-full object-cover object-center"
                    muted
                    loop
                    playsInline
                    preload="none"
                    poster={activeMedia.poster}
                  >
                    <source src={activeMedia.mediaSrc} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={activeMedia.mediaSrc}
                    alt={activeTeam.name}
                    fill
                    sizes="(min-width: 1280px) 60vw, 100vw"
                    className="object-cover object-center"
                  />
                )}
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(226,188,109,0.2),transparent_28%),linear-gradient(180deg,rgba(7,8,7,0.14)_0%,rgba(7,8,7,0.4)_44%,rgba(7,8,7,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.82)_0%,rgba(7,8,7,0.18)_44%,rgba(7,8,7,0.7)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/24 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                  <Label gold>{activeMedia.badge}</Label>
                </span>
                <span className="rounded-full border border-white/10 bg-black/18 px-4 py-2 label text-[9px] tracking-[0.28em] text-white/72 backdrop-blur-md">
                  TRUST STANDARD / TEAM 0{activeIdx + 1}
                </span>
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-end">
                <div className="max-w-[35rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activeTeam.name}-headline`}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Label gold>{activeTeam.role}</Label>
                      <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.04em] text-[#f5efe5]">
                        {activeTeam.name}
                      </h3>
                      <p className="mt-3 label text-[10px] tracking-[0.28em] text-white/58">
                        {activeTeam.years} in the field
                      </p>
                      <p className="mt-4 text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                        {activeTeam.note}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="standards-float rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,11,10,0.74),rgba(10,11,10,0.42))] p-3 backdrop-blur-xl">
                  <div className="relative h-36 overflow-hidden rounded-[1.1rem] border border-white/10">
                    <Image
                      src={activeMedia.supportImage}
                      alt={activeMedia.supportTitle}
                      fill
                      sizes="240px"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.05),rgba(7,8,7,0.72))]" />
                  </div>
                  <div className="mt-3">
                    <Label gold>{activeMedia.supportTitle}</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/66">{activeMedia.supportText}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                {values.map((value, index) => (
                  <div
                    key={value.title}
                    className={`rounded-[1.2rem] border p-4 backdrop-blur-xl ${
                      index === activeIdx
                        ? "border-[#c8a96e]/28 bg-[#c8a96e]/10"
                        : "border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.62),rgba(9,10,9,0.28))]"
                    }`}
                  >
                    <span className="font-[family-name:var(--font-display)] text-[2.2rem] leading-none text-white/16">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h4 className="mt-4 font-[family-name:var(--font-display)] text-[1.35rem] leading-[1.04] text-white">
                      {value.title}
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-white/62">{value.text}</p>
                  </div>
                ))}
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
            <Label gold>The Team</Label>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[2.15rem] leading-[0.96] text-white">
              Human credibility, not generic luxury copy.
            </h3>
            <p className="mt-4 text-[14px] leading-7 text-white/68">
              Each profile now changes the visual scene and keeps the standards conversation tied to real people, not abstract claims.
            </p>

            <div className="mt-5 space-y-2.5">
              {teamProfiles.map((person, index) => {
                const active = index === activeIdx;

                return (
                  <button
                    key={person.name}
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
                        <p className="label text-[8px] tracking-[0.26em] text-white/42">{person.role}</p>
                        <p className={`mt-2 text-[1.05rem] leading-6 ${active ? "text-white" : "text-white/76"}`}>
                          {person.name}
                        </p>
                        <p className="mt-2 label text-[8px] tracking-[0.24em] text-white/42">{person.years} in the field</p>
                      </div>
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/18"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <ShieldCheck size={17} className="text-[#c8a96e]" />
                  </span>
                  <div>
                    <Label gold>Field ethic</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/72">{TRUST_POINTS[0]}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Compass size={17} className="text-[#c8a96e]" />
                  </span>
                  <div>
                    <Label>Camp discipline</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/72">{TRUST_POINTS[1]}</p>
                  </div>
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4 sm:col-span-2">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Users size={17} className="text-[#c8a96e]" />
                  </span>
                  <div>
                    <Label gold>Hosting format</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/72">{TRUST_POINTS[2]}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-[#c8a96e]/20 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.03))] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label gold>Trust Summary</Label>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[2.1rem] leading-none text-[#e8c98a]">
                    90+ years
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-white/70">
                    Shared field time across founders and guide layer, translated into smaller groups, cleaner planning, and better hunting rhythm.
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <CheckCircle2 size={18} className="text-[#c8a96e]" />
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <MagneticButton
                tag="a"
                href="#gallery"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-6 py-3.5 label text-[10px] tracking-[0.32em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
              >
                VIEW GALLERY <ArrowRight size={14} />
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
