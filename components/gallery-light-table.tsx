"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import MagneticButton from "@/components/magnetic-button";
import { galleryPlaceholders, galleryShowcase } from "@/lib/site-content";

const MOTION_REEL = {
  src: "/media/hero-wilderness-demo.mp4",
  poster: "/media/hero-wilderness-poster.jpg"
} as const;

function Label({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/38"}`}>
      {children}
    </p>
  );
}

export default function GalleryLightTable() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = galleryShowcase[activeIndex];
  const activeSlot = galleryPlaceholders[activeIndex % galleryPlaceholders.length];

  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.78,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  };

  return (
    <section id="gallery" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,8,0.99)_0%,rgba(7,9,11,0.98)_48%,rgba(5,6,7,0.99)_100%)]" />
      <div className="gallery-lighttable absolute inset-0 opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,169,110,0.16),transparent_22%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(122,141,138,0.14),transparent_24%)]" />

      <div className="shell-full relative z-10">
        <motion.div
          {...reveal}
          className="grid gap-8 border-b border-white/[0.08] pb-12 xl:grid-cols-[minmax(0,1fr)_24rem] xl:items-end"
        >
          <div className="max-w-[58rem]">
            <Label gold>Gallery / Cinematic Edit</Label>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6.4rem)] leading-[0.88] tracking-[-0.05em] text-white">
              A darker gallery,
              <span className="block italic font-light text-[#d6ccc0]">cut like a private visual edit.</span>
            </h2>
          </div>

          <div className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.88),rgba(8,9,11,0.68))] p-6 backdrop-blur-sm">
            <Label gold>Direction</Label>
            <p className="mt-4 text-[14px] leading-[1.9] text-white/62">
              Cream proof-sheet styling is gone. The gallery now sits in a darker, cleaner frame so
              the demo imagery feels premium instead of scrapbook-like.
            </p>
          </div>
        </motion.div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.12fr)_24rem] xl:items-start">
          <div className="min-w-0 space-y-6">
            <motion.div
              {...reveal}
              className="overflow-hidden rounded-[2.4rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(9,11,13,0.94),rgba(7,8,10,0.84))] p-3 shadow-[0_45px_140px_rgba(0,0,0,0.38)]"
            >
              <div className="relative overflow-hidden rounded-[1.9rem] border border-white/10 bg-black/25 aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeItem.title}
                    initial={reduceMotion ? false : { opacity: 0.16, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? {} : { opacity: 0.08, scale: 1.01 }}
                    transition={{ duration: reduceMotion ? 0 : 0.68, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      priority={activeIndex === 0}
                      sizes="(min-width: 1280px) 62vw, 100vw"
                      className="object-cover object-center"
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,8,0.14),rgba(5,7,8,0.24)_36%,rgba(5,7,8,0.88)_100%)]" />
                <div className="absolute inset-y-0 left-0 w-[48%] bg-[linear-gradient(90deg,rgba(5,7,8,0.82),rgba(5,7,8,0.08))]" />

                <div className="absolute left-5 top-5 rounded-full border border-white/12 bg-black/30 px-4 py-2 backdrop-blur-md">
                  <Label gold>{activeItem.code}</Label>
                </div>
                <div className="absolute right-5 top-5 rounded-full border border-white/10 bg-black/28 px-4 py-2 backdrop-blur-md">
                  <span className="label text-[8px] tracking-[0.24em] text-white/68">
                    FRAME {String(activeIndex + 1).padStart(2, "0")} / {String(galleryShowcase.length).padStart(2, "0")}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 grid gap-5 p-5 lg:grid-cols-[minmax(0,1fr)_15rem] lg:p-7">
                  <div className="max-w-[38rem]">
                    <Label gold>{activeItem.meta}</Label>
                    <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.6vw,4.9rem)] leading-[0.9] tracking-[-0.05em] text-white">
                      {activeItem.title}
                    </h3>
                    <p className="mt-4 max-w-[34rem] text-[15px] leading-[1.85] text-white/72 sm:text-[16px]">
                      {activeItem.note}
                    </p>
                  </div>

                  <div className="rounded-[1.45rem] border border-white/12 bg-[linear-gradient(180deg,rgba(7,9,10,0.78),rgba(7,9,10,0.52))] p-4 backdrop-blur-xl">
                    <Label>Shot Slot</Label>
                    <h4 className="mt-3 font-[family-name:var(--font-display)] text-[1.55rem] leading-[0.98] text-white">
                      {activeSlot.title}
                    </h4>
                    <p className="mt-3 text-[13px] leading-6 text-white/62">{activeSlot.description}</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.08 }}
              className="grid gap-4 md:grid-cols-3"
            >
              <article className="rounded-[1.55rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.92),rgba(8,9,10,0.74))] p-5">
                <Label gold>Selection</Label>
                <p className="mt-3 font-[family-name:var(--font-display)] text-[2rem] leading-none text-[#e8c98a]">
                  {activeItem.code}
                </p>
                <p className="mt-3 text-[13px] leading-6 text-white/58">Focused, darker frames with cleaner contrast and less visual noise.</p>
              </article>

              <article className="rounded-[1.55rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.92),rgba(8,9,10,0.74))] p-5">
                <Label>Why it works</Label>
                <p className="mt-3 text-[1.08rem] leading-7 text-white">The image reads like a premium edit, not a pasted-in proof card.</p>
              </article>

              <article className="rounded-[1.55rem] border border-[#c8a96e]/18 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.03))] p-5">
                <Label gold>Use on page</Label>
                <p className="mt-3 text-[13px] leading-6 text-white/66">
                  Demo photos now carry atmosphere first, with metadata and slot logic kept secondary and cleaner.
                </p>
              </article>
            </motion.div>

            <motion.div
              {...reveal}
              transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.12 }}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              {galleryPlaceholders.map((item, index) => (
                <article
                  key={item.title}
                  className="rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(9,11,13,0.88),rgba(8,9,11,0.72))] p-5"
                >
                  <p className="label text-[8px] tracking-[0.24em] text-white/26">
                    SLOT {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[1.6rem] leading-[0.98] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.85] text-white/54">{item.description}</p>
                </article>
              ))}
            </motion.div>
          </div>

          <motion.aside
            {...reveal}
            transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.06 }}
            className="space-y-4"
          >
            <div className="rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.9),rgba(8,9,11,0.76))] p-5">
              <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <Label gold>Frame Rail</Label>
                  <h3 className="mt-3 font-[family-name:var(--font-display)] text-[2rem] leading-[0.96] text-white">
                    Choose the active frame.
                  </h3>
                </div>
                <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2 label text-[8px] tracking-[0.24em] text-white/50">
                  LOCAL DEMO SET
                </span>
              </div>

              <div className="space-y-3">
                {galleryShowcase.map((item, index) => {
                  const active = index === activeIndex;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group w-full rounded-[1.45rem] border p-3 text-left transition-all duration-300 ${
                        active
                          ? "border-[#c8a96e]/40 bg-[#c8a96e]/10"
                          : "border-white/10 bg-black/10 hover:border-white/18 hover:bg-white/[0.03]"
                      }`}
                    >
                      <div className="grid grid-cols-[5.6rem_minmax(0,1fr)] gap-4">
                        <div className="relative h-24 overflow-hidden rounded-[1rem] border border-white/10">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="96px"
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,8,9,0.05),rgba(7,8,9,0.55))]" />
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3">
                            <p className={`label text-[8px] tracking-[0.24em] ${active ? "text-[#e8c98a]" : "text-white/34"}`}>
                              {item.code}
                            </p>
                            <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[#c8a96e]" : "bg-white/18 group-hover:bg-white/36"}`} />
                          </div>
                          <h4 className="mt-3 font-[family-name:var(--font-display)] text-[1.4rem] leading-[0.96] text-white">
                            {item.title}
                          </h4>
                          <p className="mt-2 text-[12px] leading-5 text-white/48">{item.meta}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.9),rgba(8,9,11,0.76))] p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <Label gold>Motion Reference</Label>
                  <p className="mt-3 text-[14px] leading-7 text-white/58">
                    A restrained reel keeps the gallery feeling alive without dragging it back into brochure territory.
                  </p>
                </div>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Play size={15} className="text-[#c8a96e]" />
                </span>
              </div>

              <div className="relative overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20 aspect-[16/10]">
                <video
                  className="h-full w-full object-cover object-center"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  poster={MOTION_REEL.poster}
                >
                  <source src={MOTION_REEL.src} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,8,0.08),rgba(6,7,8,0.45)_70%,rgba(6,7,8,0.8)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="label text-[8px] tracking-[0.24em] text-white/40">DEMO REEL</p>
                  <p className="mt-2 text-[13px] leading-6 text-white/70">
                    Used as atmosphere only, while the still-image edit remains the real focus.
                  </p>
                </div>
              </div>

              <MagneticButton
                tag="a"
                href="#contact"
                className="mt-6 inline-flex items-center gap-3 label text-[10px] tracking-[0.3em] text-[#c8a96e] transition-all duration-300 hover:gap-5"
              >
                REQUEST PRIVATE SET <ArrowRight size={13} />
              </MagneticButton>
            </div>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
