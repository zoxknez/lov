"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Compass,
  Plane,
  ShieldCheck
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MagneticButton from "@/components/magnetic-button";
import { planningNotes, pricingItems, timeline } from "@/lib/site-content";

const PLANNING_PHASES = [
  {
    key: "red-deer",
    image: "/media/species/red-deer.jpg",
    badge: "Autumn signature",
    terrain: "Classic roar basins and bush margins",
    planning: "Ideal first-window planning for guests wanting the most iconic New Zealand deer chapter.",
    tags: ["Popular entry point", "Autumn trophy focus", "Hosted rhythm"]
  },
  {
    key: "sika",
    image: "/media/species/sika-deer.jpg",
    badge: "North Island precision",
    terrain: "Kaimanawa and Central Plateau bush",
    planning: "Pairs well with guests who want tighter bush movement and a more private field tempo.",
    tags: ["Kaimanawa story", "Quiet entries", "Rut-led timing"]
  },
  {
    key: "fallow",
    image: "/media/species/fallow-deer.jpg",
    badge: "Selective trophy timing",
    terrain: "Open faces and select private blocks",
    planning: "Useful as a clean add-on or short focused pursuit where trophy selectivity matters.",
    tags: ["Visual stalking", "Elegant rut window", "Flexible add-on"]
  },
  {
    key: "chamois",
    image: "/media/species/chamois.jpg",
    badge: "Mountain chapter",
    terrain: "Steep alpine faces and valley systems",
    planning: "Best for itineraries that need a real alpine section without overselling camp hardship.",
    tags: ["May-Jun focus", "Weather led", "Long glassing"]
  },
  {
    key: "tahr",
    image: "/media/species/himalayan-tahr.jpg",
    badge: "Southern Alps trophy",
    terrain: "High-country basins and exposed faces",
    planning: "Built for strong winter coat timing and guests who want a dramatic mountain trophy story.",
    tags: ["Winter coat", "Remote access", "High-country trophy"]
  },
  {
    key: "rusa",
    image: "/media/species/rusa-deer.jpg",
    badge: "Winter specialist",
    terrain: "North Island bush habitat",
    planning: "Usually works best as a dedicated later-winter program, not an afterthought beside autumn hunts.",
    tags: ["Jul-Aug", "Private-country option", "Separate program"]
  }
] as const;

function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/42"}`}>
      {children}
    </p>
  );
}

export default function PlanningCommandCenter() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(sectionRef, { amount: 0.22 });

  const [phaseIdx, setPhaseIdx] = useState(0);
  const activePhase = timeline[phaseIdx];
  const activeMedia = PLANNING_PHASES[phaseIdx];

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % timeline.length);
    }, 6200);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

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
    <section id="planning" ref={sectionRef} className="relative overflow-hidden py-28 lg:py-36">
      <div className="planning-orb absolute left-[-8rem] top-16 h-80 w-80 rounded-full bg-[#c8a96e]/14 blur-3xl" />
      <div className="planning-orb absolute bottom-[-5rem] right-[-3rem] h-96 w-96 rounded-full bg-[#2f4d37]/22 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(214,176,104,0.13),transparent_26%),radial-gradient(circle_at_84%_20%,rgba(47,77,55,0.18),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.98)_0%,rgba(10,12,10,0.96)_38%,rgba(18,16,12,0.97)_100%)]" />
      <div className="planning-grid absolute inset-0 opacity-35" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,24rem)] xl:items-end"
        >
          <div className="max-w-[48rem]">
            <Label gold>Planning / Trip Assembly</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.3rem)] leading-[0.9] tracking-[-0.04em] text-[#f3ede3]">
              Precision is the luxury.
              <span className="block italic font-light text-[#d4c9b6]">Now planning and logistics live in one system.</span>
            </h2>
          </div>

          <p className="max-w-[24rem] text-[15px] leading-[1.9] text-white/66 sm:text-[16px]">
            Instead of one timeline block and another dry logistics block, this section now behaves
            like a premium trip planner: window selection, field fit, travel logic, and coverage all
            read together.
          </p>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1.08fr)_minmax(21rem,28rem)] xl:gap-10">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative min-h-[40rem] overflow-hidden rounded-[2rem] border border-white/12 bg-black/20 shadow-[0_32px_90px_rgba(0,0,0,0.3)]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhase.title}
                initial={reduceMotion ? false : { opacity: 0.14, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduceMotion ? {} : { opacity: 0.1, scale: 1.02 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={activeMedia.image}
                  alt={activePhase.title}
                  fill
                  sizes="(min-width: 1280px) 60vw, 100vw"
                  className="object-cover object-center"
                />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(226,188,109,0.22),transparent_30%),linear-gradient(180deg,rgba(7,8,7,0.14)_0%,rgba(7,8,7,0.38)_42%,rgba(7,8,7,0.9)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,7,0.78)_0%,rgba(7,8,7,0.2)_44%,rgba(7,8,7,0.68)_100%)]" />

            <div className="relative z-10 flex h-full flex-col justify-between p-6 lg:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center gap-3 rounded-full border border-white/14 bg-black/24 px-4 py-2 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                  <Label gold>{activeMedia.badge}</Label>
                </span>
                <span className="rounded-full border border-white/10 bg-black/18 px-4 py-2 label text-[9px] tracking-[0.28em] text-white/72 backdrop-blur-md">
                  WINDOW {String(phaseIdx + 1).padStart(2, "0")} / {String(timeline.length).padStart(2, "0")}
                </span>
              </div>

              <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_14rem] xl:items-end">
                <div className="max-w-[35rem]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${activePhase.title}-headline`}
                      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? {} : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Label gold>{activePhase.window}</Label>
                      <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.8rem,6vw,5.6rem)] leading-[0.92] tracking-[-0.04em] text-[#f5efe5]">
                        {activePhase.title}
                      </h3>
                      <p className="mt-4 text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                        {activePhase.description}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="planning-float rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(10,11,10,0.74),rgba(10,11,10,0.42))] p-3 backdrop-blur-xl">
                  <div className="relative h-36 overflow-hidden rounded-[1.1rem] border border-white/10">
                    <video
                      ref={videoRef}
                      className="h-full w-full object-cover object-center"
                      muted
                      loop
                      playsInline
                      preload="none"
                      poster="/media/hero-wilderness-poster.jpg"
                    >
                      <source src="/media/hero-wilderness-demo.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,7,0.05),rgba(7,8,7,0.72))]" />
                  </div>
                  <div className="mt-3">
                    <Label gold>Field pacing</Label>
                    <p className="mt-2 text-[13px] leading-6 text-white/66">
                      Motion stays subtle here so the planning section feels premium, not noisy.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.62),rgba(9,10,9,0.28))] p-4 backdrop-blur-xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <CalendarRange size={16} className="text-[#c8a96e]" />
                  </span>
                  <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/42">Window</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/78">{activePhase.window}</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.62),rgba(9,10,9,0.28))] p-4 backdrop-blur-xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <Compass size={16} className="text-[#c8a96e]" />
                  </span>
                  <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/42">Terrain read</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/78">{activeMedia.terrain}</p>
                </div>
                <div className="rounded-[1.2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.62),rgba(9,10,9,0.28))] p-4 backdrop-blur-xl">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                    <ShieldCheck size={16} className="text-[#c8a96e]" />
                  </span>
                  <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/42">Planning fit</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/78">{activeMedia.planning}</p>
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
            <Label gold>Trip Assembly</Label>
            <h3 className="mt-4 font-[family-name:var(--font-display)] text-[2.15rem] leading-[0.96] text-white">
              One read for season, permits, transport, and commercial scope.
            </h3>
            <p className="mt-4 text-[14px] leading-7 text-white/68">
              Click a window to change the planning stage. The same panel keeps logistics and coverage
              visible so the section feels like an actual decision surface.
            </p>

            <div className="mt-5 space-y-2.5">
              {timeline.map((item, index) => {
                const active = index === phaseIdx;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setPhaseIdx(index)}
                    className={`w-full rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${
                      active
                        ? "border-[#c8a96e]/40 bg-[#c8a96e]/10"
                        : "border-white/10 bg-black/12 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="label text-[8px] tracking-[0.26em] text-white/42">{item.window}</p>
                        <p className={`mt-2 text-[1.05rem] leading-6 ${active ? "text-white" : "text-white/76"}`}>
                          {item.title}
                        </p>
                      </div>
                      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/18"}`} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4">
                <Label gold>Included</Label>
                <div className="mt-4 space-y-2.5">
                  {pricingItems.included.map((item) => (
                    <div key={item} className="flex gap-3 text-[13px] leading-6 text-white/72">
                      <CheckCircle2 size={15} className="mt-1 shrink-0 text-[#c8a96e]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.35rem] border border-white/10 bg-black/16 p-4">
                <Label>Additional</Label>
                <div className="mt-4 space-y-2.5">
                  {pricingItems.excluded.map((item) => (
                    <div key={item} className="flex gap-3 text-[13px] leading-6 text-white/56">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/22" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[1.4rem] border border-[#c8a96e]/20 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.03))] p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Label gold>Commercial Read</Label>
                  <p className="mt-2 font-[family-name:var(--font-display)] text-[2.2rem] leading-none text-[#e8c98a]">
                    On request
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-white/70">
                    Final scope stays tailored by species mix, group size, season, and how much remote reach the hunt carries.
                  </p>
                </div>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Plane size={18} className="text-[#c8a96e]" />
                </span>
              </div>
            </div>
          </motion.aside>
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <div className="mb-5 flex items-end justify-between gap-6">
            <div>
              <Label gold>Logistics Matrix</Label>
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3.2rem)] leading-[0.96] text-white">
                The rest of the trip logic, still inside the same section.
              </h3>
            </div>
            <div className="hidden md:flex gap-3">
              <MagneticButton
                tag="a"
                href="#contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-6 py-3.5 label text-[10px] tracking-[0.32em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
              >
                START PLANNING <ArrowRight size={14} />
              </MagneticButton>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
            {planningNotes.map((note, index) => (
              <motion.div
                key={note.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{
                  duration: 0.6,
                  delay: reduceMotion ? 0 : index * 0.06,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="rounded-[1.6rem] border border-white/12 bg-[linear-gradient(180deg,rgba(9,10,9,0.58),rgba(9,10,9,0.24))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
              >
                <span className="font-[family-name:var(--font-display)] text-[2.4rem] leading-none text-white/12">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h4 className="mt-5 font-[family-name:var(--font-display)] text-[1.5rem] leading-[1.04] text-white">
                  {note.title}
                </h4>
                <p className="mt-4 text-[13px] leading-6 text-white/62">{note.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
