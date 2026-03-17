"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CalendarRange,
  CheckCircle2,
  Compass,
  Plane,
  ShieldCheck
} from "lucide-react";
import { useEffect, useState } from "react";
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
  const [phaseIdx, setPhaseIdx] = useState(0);

  const activePhase = timeline[phaseIdx];
  const activeMedia = PLANNING_PHASES[phaseIdx];

  useEffect(() => {
    if (reduceMotion) return;

    const id = window.setInterval(() => {
      setPhaseIdx((prev) => (prev + 1) % timeline.length);
    }, 6800);

    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section id="planning" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,10,0.99)_0%,rgba(6,10,12,0.98)_45%,rgba(7,8,9,0.99)_100%)]" />
      <div className="planning-radar absolute inset-0 opacity-80" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(18rem,23rem)] xl:items-end"
        >
          <div className="max-w-[52rem]">
            <Label gold>Planning / Command Center</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,5.8vw,6.2rem)] leading-[0.9] tracking-[-0.05em] text-[#f3ede3]">
              Precision is the luxury.
              <span className="block italic font-light text-[#c6d2d0]">The section should feel operational, not ornamental.</span>
            </h2>
          </div>

          <p className="max-w-[24rem] text-[15px] leading-[1.9] text-white/66 sm:text-[16px]">
            Planning now reads like a control surface: season window, terrain fit, inclusions, and
            travel logic all live inside one system instead of being scattered into matching cards.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 overflow-hidden rounded-[2.3rem] border border-white/12 bg-[linear-gradient(180deg,rgba(8,11,13,0.92),rgba(7,9,11,0.82))] shadow-[0_40px_90px_rgba(0,0,0,0.3)]"
        >
          <div className="border-b border-white/10 p-5 lg:p-6">
            <div className="mb-5 flex items-end justify-between gap-6">
              <div>
                <Label gold>Timeline control</Label>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[clamp(2rem,4vw,3rem)] leading-[0.96] text-white">
                  Move through the trip like an itinerary builder.
                </h3>
              </div>
              <div className="hidden lg:flex items-center gap-3 rounded-full border border-white/10 bg-black/14 px-4 py-2">
                <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                <span className="label text-[8px] tracking-[0.24em] text-white/60">
                  ACTIVE WINDOW {String(phaseIdx + 1).padStart(2, "0")}
                </span>
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-6">
              {timeline.map((item, index) => {
                const active = index === phaseIdx;

                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setPhaseIdx(index)}
                    className={`rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${
                      active
                        ? "border-[#c8a96e]/40 bg-[#c8a96e]/10"
                        : "border-white/10 bg-black/10 hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <p className={`label text-[8px] tracking-[0.24em] ${active ? "text-[#e8c98a]" : "text-white/34"}`}>
                      {item.window}
                    </p>
                    <p className={`mt-3 font-[family-name:var(--font-display)] text-[1.25rem] leading-[1.02] ${active ? "text-white" : "text-white/78"}`}>
                      {item.title}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid gap-6 p-5 lg:p-6 xl:grid-cols-[minmax(0,1.12fr)_20rem]">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="rounded-[1.8rem] border border-white/10 bg-black/10 p-5">
                <Label gold>{activeMedia.badge}</Label>
                <div className="mt-4 flex flex-wrap gap-2">
                  {activeMedia.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/58"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.3rem,4.2vw,4.2rem)] leading-[0.94] tracking-[-0.04em] text-[#f5efe5]">
                  {activePhase.title}
                </h3>
                <p className="mt-4 max-w-[38rem] text-[15px] leading-[1.85] text-white/74 sm:text-[16px]">
                  {activePhase.description}
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,13,0.62),rgba(8,11,13,0.28))] p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <CalendarRange size={16} className="text-[#c8a96e]" />
                    </span>
                    <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/38">Window</p>
                    <p className="mt-2 text-[13px] leading-6 text-white/78">{activePhase.window}</p>
                  </div>

                  <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,13,0.62),rgba(8,11,13,0.28))] p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <Compass size={16} className="text-[#c8a96e]" />
                    </span>
                    <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/38">Terrain read</p>
                    <p className="mt-2 text-[13px] leading-6 text-white/78">{activeMedia.terrain}</p>
                  </div>

                  <div className="rounded-[1.2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,13,0.62),rgba(8,11,13,0.28))] p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                      <ShieldCheck size={16} className="text-[#c8a96e]" />
                    </span>
                    <p className="mt-3 label text-[8px] tracking-[0.24em] text-white/38">Planning fit</p>
                    <p className="mt-2 text-[13px] leading-6 text-white/78">{activeMedia.planning}</p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/10">
                <div className="relative min-h-[22rem]">
                  <Image
                    src={activeMedia.image}
                    alt={activePhase.title}
                    fill
                    sizes="(min-width: 1280px) 22vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,12,0.04),rgba(8,10,12,0.3)_42%,rgba(8,10,12,0.88)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <Label gold>Active terrain</Label>
                    <p className="mt-3 text-[14px] leading-7 text-white/74">{activeMedia.planning}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[1.7rem] border border-white/10 bg-black/10 p-5">
                <Label gold>Trip assembly</Label>
                <div className="mt-4 space-y-3">
                  {planningNotes.slice(0, 3).map((note, index) => (
                    <div key={note.title} className="rounded-[1.15rem] border border-white/10 bg-white/[0.02] p-4">
                      <p className="label text-[8px] tracking-[0.24em] text-white/34">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h4 className="mt-3 font-[family-name:var(--font-display)] text-[1.3rem] leading-[1.02] text-white">
                        {note.title}
                      </h4>
                      <p className="mt-3 text-[13px] leading-6 text-white/64">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-[#c8a96e]/20 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.03))] p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Label gold>Commercial read</Label>
                    <p className="mt-2 font-[family-name:var(--font-display)] text-[2.15rem] leading-none text-[#e8c98a]">
                      On request
                    </p>
                    <p className="mt-3 text-[13px] leading-6 text-white/70">
                      Scope stays tailored by species mix, group size, season, and how much remote reach the trip should carry.
                    </p>
                  </div>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                    <Plane size={18} className="text-[#c8a96e]" />
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 border-t border-white/10 p-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_18rem] lg:p-6">
            <div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-5">
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

            <div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-5">
              <Label>Additional</Label>
              <div className="mt-4 space-y-2.5">
                {pricingItems.excluded.map((item) => (
                  <div key={item} className="flex gap-3 text-[13px] leading-6 text-white/58">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/22" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.6rem] border border-white/10 bg-black/10 p-5">
              <Label gold>Next step</Label>
              <p className="mt-4 text-[14px] leading-7 text-white/72">
                Once the right window is clear, the rest of the trip logic becomes much easier to shape accurately.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <MagneticButton
                  tag="a"
                  href="#contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-6 py-3.5 label text-[10px] tracking-[0.32em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
                >
                  START PLANNING <ArrowRight size={14} />
                </MagneticButton>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-5"
        >
          {planningNotes.map((note, index) => (
            <div
              key={note.title}
              className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,13,0.58),rgba(8,11,13,0.24))] p-5"
            >
              <span className="font-[family-name:var(--font-display)] text-[2.3rem] leading-none text-white/12">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-5 font-[family-name:var(--font-display)] text-[1.42rem] leading-[1.04] text-white">
                {note.title}
              </h4>
              <p className="mt-4 text-[13px] leading-6 text-white/62">{note.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
