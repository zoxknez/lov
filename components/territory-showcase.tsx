"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";
import { useEffect, useRef } from "react";
import MagneticButton from "@/components/magnetic-button";
import { areaHighlights } from "@/lib/site-content";

const NORTH = {
  title: areaHighlights[0].title,
  intro: areaHighlights[0].intro,
  details: areaHighlights[0].details,
  eyebrow: "North Island / Bush Country",
  imagePoster: "/media/hero-wilderness-poster.jpg",
  videoSrc: "/media/hero-wilderness-demo.mp4",
  tags: ["Sika + red deer", "Taupo / Turangi", "4WD + foot access"]
} as const;

const SOUTH = {
  title: areaHighlights[1].title,
  intro: areaHighlights[1].intro,
  details: areaHighlights[1].details,
  eyebrow: "South Island / Alpine Reach",
  imageSrc: "/media/species/himalayan-tahr.jpg",
  tags: ["Tahr + chamois", "Remote basins", "Weather-led days"]
} as const;

const DECISION_ROWS = [
  {
    label: "Best for",
    north: "Guests who want bush character, quieter entries, and a lodge-backed pace.",
    south: "Guests who want exposure, altitude, and a more serious mountain chapter."
  },
  {
    label: "Access rhythm",
    north: "Road and foot movement with selective remote support only when terrain asks for it.",
    south: "Longer terrain logic, weather calls, and occasional remote camp or air-assisted reach."
  },
  {
    label: "Field feel",
    north: "Intimate, close, damp, patient, and timber-edged.",
    south: "Open, exposed, cinematic, and dictated by elevation and light."
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
  const northVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = northVideoRef.current;
    if (!video) return;

    video.muted = true;
    const playAttempt = video.play();
    if (playAttempt) {
      playAttempt.catch(() => null);
    }
  }, []);

  return (
    <section id="areas" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,8,0.99)_0%,rgba(7,9,10,0.98)_40%,rgba(8,8,7,0.99)_100%)]" />
      <div className="territory-contours absolute inset-0 opacity-55" />

      <div className="shell-full relative z-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 grid gap-8 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end"
        >
          <div className="max-w-[54rem]">
            <Label gold>Territory / Two-World Comparison</Label>
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.2rem)] leading-[0.88] tracking-[-0.05em] text-[#f3ede3]">
              One section.
              <span className="block italic font-light text-[#cfd7d3]">Two completely different worlds.</span>
            </h2>
          </div>

          <p className="max-w-[18rem] text-[14px] leading-[1.9] text-white/58">
            This is no longer a module with cards. It is one panoramic decision surface.
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.14 }}
          transition={{ duration: reduceMotion ? 0 : 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden rounded-[2.6rem] border border-white/10 shadow-[0_42px_110px_rgba(0,0,0,0.34)]"
        >
          <div className="lg:hidden">
            <div className="relative min-h-[24rem] overflow-hidden border-b border-white/10">
              <Image
                src={NORTH.imagePoster}
                alt={NORTH.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <video
                ref={northVideoRef}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
                muted
                loop
                playsInline
                preload="none"
                poster={NORTH.imagePoster}
              >
                <source src={NORTH.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,7,0.14),rgba(6,9,7,0.3)_42%,rgba(6,9,7,0.92)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <Label gold>{NORTH.eyebrow}</Label>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2.4rem] leading-[0.94] text-white">
                  Bush country with a quieter, more intimate rhythm.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-white/72">{NORTH.intro}</p>
              </div>
            </div>

            <div className="relative min-h-[24rem] overflow-hidden">
              <Image
                src={SOUTH.imageSrc}
                alt={SOUTH.title}
                fill
                sizes="100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,12,0.14),rgba(6,9,12,0.26)_42%,rgba(6,9,12,0.94)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <Label>{SOUTH.eyebrow}</Label>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2.4rem] leading-[0.94] text-white">
                  Alpine access where weather and elevation decide the day.
                </h3>
                <p className="mt-4 text-[14px] leading-[1.9] text-white/72">{SOUTH.intro}</p>
              </div>
            </div>
          </div>

          <div className="relative hidden min-h-[44rem] lg:block">
            <div
              className="absolute inset-y-0 left-0 w-[58%] overflow-hidden"
              style={{ clipPath: "polygon(0 0, 100% 0, 86% 100%, 0 100%)" }}
            >
              <Image
                src={NORTH.imagePoster}
                alt={NORTH.title}
                fill
                sizes="58vw"
                className="object-cover"
              />
              <video
                ref={northVideoRef}
                className="absolute inset-0 h-full w-full object-cover object-center opacity-80"
                muted
                loop
                playsInline
                preload="none"
                poster={NORTH.imagePoster}
              >
                <source src={NORTH.videoSrc} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,7,0.06),rgba(6,9,7,0.22)_38%,rgba(6,9,7,0.92)_100%)]" />
              <div className="absolute inset-y-0 left-0 w-[70%] bg-[linear-gradient(90deg,rgba(6,9,7,0.8),rgba(6,9,7,0.08))]" />
            </div>

            <div
              className="absolute inset-y-0 right-0 w-[58%] overflow-hidden"
              style={{ clipPath: "polygon(14% 0, 100% 0, 100% 100%, 0 100%)" }}
            >
              <Image
                src={SOUTH.imageSrc}
                alt={SOUTH.title}
                fill
                sizes="58vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,9,12,0.06),rgba(6,9,12,0.18)_38%,rgba(6,9,12,0.94)_100%)]" />
              <div className="absolute inset-y-0 right-0 w-[72%] bg-[linear-gradient(270deg,rgba(6,9,12,0.84),rgba(6,9,12,0.08))]" />
            </div>

            <div className="pointer-events-none absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/16 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0a0d0c]/88 px-5 py-3 shadow-[0_16px_40px_rgba(0,0,0,0.26)] backdrop-blur-xl">
                <Compass size={16} className="text-[#c8a96e]" />
                <span className="label text-[8px] tracking-[0.26em] text-white/64">COMPARE BOTH ISLANDS</span>
              </div>
            </div>

            <div className="absolute left-10 top-12 max-w-[15rem]">
              <Label gold>{NORTH.eyebrow}</Label>
              <p className="mt-4 font-[family-name:var(--font-display)] text-[4.6rem] leading-[0.88] text-white/[0.12]">
                NORTH
              </p>
            </div>

            <div className="absolute right-10 top-12 max-w-[15rem] text-right">
              <Label>{SOUTH.eyebrow}</Label>
              <p className="mt-4 font-[family-name:var(--font-display)] text-[4.6rem] leading-[0.88] text-white/[0.12]">
                SOUTH
              </p>
            </div>

            <div className="absolute bottom-10 left-10 max-w-[23rem]">
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3.7rem)] leading-[0.94] text-white">
                Bush country with a quieter, more intimate rhythm.
              </h3>
              <p className="mt-4 text-[14px] leading-[1.9] text-white/72">{NORTH.intro}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {NORTH.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/18 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/56"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="absolute bottom-10 right-10 max-w-[23rem] text-right">
              <h3 className="font-[family-name:var(--font-display)] text-[clamp(2.2rem,4vw,3.7rem)] leading-[0.94] text-white">
                Alpine access where weather and elevation decide the day.
              </h3>
              <p className="mt-4 text-[14px] leading-[1.9] text-white/72">{SOUTH.intro}</p>
              <div className="mt-6 flex flex-wrap justify-end gap-2">
                {SOUTH.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-black/18 px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/56"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10"
        >
          {DECISION_ROWS.map((row, index) => (
            <div
              key={row.label}
              className={`grid gap-6 px-6 py-6 lg:grid-cols-[12rem_minmax(0,1fr)_minmax(0,1fr)] lg:px-8 ${
                index !== DECISION_ROWS.length - 1 ? "border-b border-white/[0.07]" : ""
              }`}
            >
              <div>
                <Label gold={index === 0}>{row.label}</Label>
              </div>
              <p className="text-[13px] leading-[1.9] text-white/62">{row.north}</p>
              <p className="text-[13px] leading-[1.9] text-white/62">{row.south}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: reduceMotion ? 0 : 0.72, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_16rem] lg:items-start"
        >
          <div className="space-y-3">
            {NORTH.details.slice(0, 2).map((detail) => (
              <p key={detail} className="text-[13px] leading-[1.9] text-white/42">
                {detail}
              </p>
            ))}
          </div>

          <div className="space-y-3">
            {SOUTH.details.slice(0, 2).map((detail) => (
              <p key={detail} className="text-[13px] leading-[1.9] text-white/42">
                {detail}
              </p>
            ))}
          </div>

          <div className="lg:text-right">
            <MagneticButton
              tag="a"
              href="#planning"
              className="inline-flex items-center gap-3 label text-[10px] tracking-[0.3em] text-[#c8a96e] transition-all duration-300 hover:gap-5"
            >
              VIEW ACCESS LOGIC <ArrowRight size={13} />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
