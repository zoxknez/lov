"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  Compass,
  Mountain,
  ShieldCheck,
  Users
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";

const HERO_VIDEO_SRC = "/media/hero-wilderness-demo.mp4";
const HERO_VIDEO_POSTER = "/media/hero-wilderness-poster.jpg";

const HERO_HIGHLIGHTS = [
  {
    icon: Mountain,
    label: "Territory",
    value: "North + South Island",
    note: "Bush country, river valleys, and serious alpine faces."
  },
  {
    icon: Users,
    label: "Group format",
    value: "2-4 hunters",
    note: "Small hosted groups keep the pace personal and flexible."
  },
  {
    icon: CalendarRange,
    label: "Timing",
    value: "Mar to Jul core windows",
    note: "Bush hunts first, then alpine weather windows for tahr and chamois."
  },
  {
    icon: ShieldCheck,
    label: "Planning",
    value: "DOC + MPI aware",
    note: "Permits, rifles, and export considerations shaped early."
  }
] as const;

const HERO_SCENES = [
  {
    eyebrow: "North Island bush",
    title: "Sika and red deer in Central Plateau country",
    season: "Late Mar to May",
    species: "Sika + red deer",
    detail: "Quiet entries, first-light movement, ridges, and hosted recovery back at the lodge."
  },
  {
    eyebrow: "South Island alpine",
    title: "Weather-led tahr and chamois access",
    season: "May to Jul",
    species: "Tahr + chamois",
    detail: "Glassing faces, steep alpine terrain, and access choices shaped by weather and exact timing."
  },
  {
    eyebrow: "Private program flow",
    title: "Custom itineraries that blend bush, valley, and alpine terrain",
    season: "By species",
    species: "Mixed format",
    detail: "The trip is built around your species window, group size, and how hard you want the field days to push."
  }
] as const;

const HERO_STEPS = [
  "Tell us species, preferred month, and group size.",
  "We match the right island, terrain, and lodging rhythm.",
  "You receive a tailored outline with access, permits, and next steps."
] as const;

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function PremiumHero() {
  const reduceMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setSceneIdx((prev) => (prev + 1) % HERO_SCENES.length);
    }, 5200);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const markReady = () => {
      setVideoReady(true);
      setVideoFailed(false);
    };

    const markFailed = () => {
      setVideoFailed(true);
      setVideoReady(false);
    };

    const playVideo = async () => {
      try {
        video.muted = true;
        await video.play();
        markReady();
      } catch {
        markFailed();
      }
    };

    playVideo();
    video.addEventListener("loadeddata", markReady);
    video.addEventListener("playing", markReady);
    video.addEventListener("error", markFailed);

    return () => {
      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("playing", markReady);
      video.removeEventListener("error", markFailed);
    };
  }, []);

  return (
    <section id="home" className="relative isolate overflow-hidden border-b border-white/[0.07]">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <Image
          src={HERO_VIDEO_POSTER}
          alt="New Zealand wilderness poster"
          fill
          priority
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ${videoReady && !videoFailed ? "opacity-0" : "opacity-100"}`}
        />
        <video
          ref={videoRef}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ${videoReady && !videoFailed ? "opacity-100" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={HERO_VIDEO_POSTER}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_26%,rgba(226,190,117,0.2),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,6,0.78)_0%,rgba(6,7,6,0.3)_24%,rgba(6,7,6,0.4)_52%,rgba(6,7,6,0.9)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,7,6,0.8)_0%,rgba(6,7,6,0.2)_42%,rgba(6,7,6,0.72)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-[100svh] items-center px-6 pb-8 pt-28 lg:px-12 lg:pb-10 lg:pt-28">
        <div className="shell-full w-full">
          <div className="grid w-full gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(23rem,27rem)] xl:gap-10">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-[46rem]"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/25 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                  <Label gold>Private Hunt Concierge / New Zealand</Label>
                </span>
                <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/18 px-4 py-2 backdrop-blur-md">
                  <span className="label text-[9px] tracking-[0.28em] text-white/72">Autoplay wilderness reel</span>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c8a96e]/70" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#e8c98a]" />
                  </span>
                </span>
              </div>

              <h1 className="mt-8 max-w-[14ch] font-[family-name:var(--font-display)] text-[clamp(3.4rem,7.4vw,6.3rem)] leading-[0.9] tracking-[-0.05em] text-white">
                Private New Zealand trophy safaris.
              </h1>

              <p className="mt-5 max-w-[40rem] text-[17px] leading-[1.8] text-white/76 sm:text-[18px]">
                Red deer, sika, chamois, and tahr programs built for small hosted groups across
                North Island bush and South Island alpine country, with timing, permits, rifles,
                and trophy-export planning shaped before you arrive.
              </p>

              <div className="mt-7 flex flex-wrap gap-2.5">
                <span className="rounded-full border border-white/12 bg-black/18 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-white/72 backdrop-blur-md">
                  Red deer + sika
                </span>
                <span className="rounded-full border border-white/12 bg-black/18 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-white/72 backdrop-blur-md">
                  Chamois + tahr
                </span>
                <span className="rounded-full border border-white/12 bg-black/18 px-4 py-2 text-[10px] uppercase tracking-[0.26em] text-white/72 backdrop-blur-md">
                  Lodge-to-field private hosting
                </span>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {HERO_HIGHLIGHTS.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
                      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: reduceMotion ? 0 : 0.08 * index,
                        ease: [0.16, 1, 0.3, 1]
                      }}
                      className="rounded-[1.6rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,9,8,0.58),rgba(8,9,8,0.24))] p-4 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Label gold>{item.label}</Label>
                          <p className="mt-3 font-[family-name:var(--font-display)] text-[1.55rem] leading-[1.02] text-[#f4eee6]">
                            {item.value}
                          </p>
                        </div>
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                          <Icon size={18} className="text-[#c8a96e]" />
                        </span>
                      </div>
                      <p className="mt-3 text-[13px] leading-6 text-white/58">{item.note}</p>
                    </motion.div>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
                <MagneticButton
                  tag="a"
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-8 py-4 label text-[10px] tracking-[0.34em] text-[#060706] transition-colors duration-300 hover:bg-[#e8c98a]"
                >
                  BEGIN PLANNING <ArrowRight size={14} />
                </MagneticButton>
                <MagneticButton
                  tag="a"
                  href="#species"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-white/18 bg-black/22 px-8 py-4 label text-[10px] tracking-[0.32em] text-white/84 backdrop-blur-md transition-colors duration-300 hover:bg-white/10"
                >
                  SEE SPECIES WINDOWS <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </motion.div>

            <motion.aside
              initial={reduceMotion ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-[2rem] border border-white/14 bg-[linear-gradient(180deg,rgba(9,10,9,0.68),rgba(9,10,9,0.34))] p-5 shadow-[0_28px_90px_rgba(0,0,0,0.32)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label gold>What You Know Immediately</Label>
                  <h2 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] leading-[0.98] text-white">
                    The entire trip logic, above the fold.
                  </h2>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Compass size={18} className="text-[#c8a96e]" />
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-2">
                <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4">
                  <Label>Prime windows</Label>
                  <p className="mt-3 text-[1.05rem] leading-6 text-white">Late March to May bush, May to July alpine.</p>
                </div>
                <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4">
                  <Label>Hosting rhythm</Label>
                  <p className="mt-3 text-[1.05rem] leading-6 text-white">Private pace, lodge comfort, remote reach only when the hunt needs it.</p>
                </div>
              </div>

              <div className="mt-5 space-y-2.5">
                {HERO_SCENES.map((scene, index) => {
                  const active = index === sceneIdx;

                  return (
                    <button
                      key={scene.title}
                      type="button"
                      onClick={() => setSceneIdx(index)}
                      className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${
                        active
                          ? "border-[#c8a96e]/45 bg-[#c8a96e]/10"
                          : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/[0.04]"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="label text-[8px] tracking-[0.26em] text-white/42">{scene.eyebrow}</p>
                          <p className={`mt-2 text-[1.05rem] leading-6 ${active ? "text-white" : "text-white/76"}`}>
                            {scene.title}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/58">
                              {scene.season}
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] uppercase tracking-[0.22em] text-white/58">
                              {scene.species}
                            </span>
                          </div>
                          <p className="mt-3 text-[13px] leading-6 text-white/58">{scene.detail}</p>
                        </div>
                        <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/22"}`} />
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/18 p-4">
                <Label gold>Enquiry Flow</Label>
                <div className="mt-4 space-y-3">
                  {HERO_STEPS.map((step, index) => (
                    <div key={step} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#c8a96e]/30 bg-[#c8a96e]/10 text-[10px] font-medium tracking-[0.18em] text-[#e8c98a]">
                        {index + 1}
                      </span>
                      <p className="text-[13px] leading-6 text-white/66">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </div>
    </section>
  );
}
