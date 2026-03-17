"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, MouseEvent, useRef } from "react";
import { speciesCatalog, heroVisuals } from "@/lib/site-content";

const speciesVisualMap: Record<string, typeof heroVisuals[0]> = {
  "Red Deer":      heroVisuals[0],
  "Fallow Deer":   heroVisuals[2],
  "Rusa Deer":     heroVisuals[0],
  "Sika Deer":     heroVisuals[0],
  "Arapawa Rams":  heroVisuals[2],
  "Chamois":       heroVisuals[1],
  "Himalayan Tahr":heroVisuals[1]
};

function TiltCard({ image, alt, children }: { image: string; alt: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 8}deg) translateZ(8px)`;
  }

  function handleLeave() {
    if (ref.current) ref.current.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ transition: "transform 0.45s cubic-bezier(0.16,1,0.3,1)", transformStyle: "preserve-3d" }}
      className="relative overflow-hidden rounded-[2.4rem] border border-white/10 bg-forest-900"
    >
      {children}
    </div>
  );
}

export default function SpeciesSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);
  const activeItem = speciesCatalog[active];
  const visual = speciesVisualMap[activeItem.name] ?? heroVisuals[0];

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 }
  };
  const transition = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section id="species" className="py-28 border-t border-white/[0.06]">
      <div className="section-shell">
        {/* Header */}
        <motion.div {...revealUp} transition={transition} className="mb-14 max-w-2xl">
          <p className="label-xs text-[#c9922a] mb-5">Species Collection</p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] text-white">
            Seven pursuits.<br />
            <em className="not-italic text-white/45">One extraordinary country.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/55 font-light max-w-xl">
            Each species breathes in its own terrain and season. Select one to understand the hunt before you plan it.
          </p>
        </motion.div>

        <div className="grid xl:grid-cols-[1fr_1.1fr] gap-10 xl:items-start">
          {/* Left: Sticky 3D tilt image */}
          <motion.div {...revealUp} transition={transition} className="xl:sticky xl:top-28">
            <TiltCard image={visual.image} alt={activeItem.name}>
              <div className="relative min-h-[36rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={visual.image + activeItem.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.8 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={visual.image}
                      alt={activeItem.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 100vw, 46vw"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,3,0.1)_0%,rgba(2,4,3,0.55)_55%,rgba(2,4,3,0.97)_100%)]" />

                {/* Badges */}
                <div className="absolute top-5 inset-x-5 flex items-center justify-between">
                  <span className="rounded-full border border-white/14 bg-black/25 px-4 py-2 label-xs text-[#c9922a] backdrop-blur-md">
                    Active species
                  </span>
                  <span className="rounded-full border border-white/14 bg-black/25 px-4 py-2 label-xs text-white/65 backdrop-blur-md">
                    {activeItem.season}
                  </span>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="label-xs text-[#c9922a] mb-3">Curated collection</p>
                  <AnimatePresence mode="wait">
                    <motion.h3
                      key={activeItem.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4 }}
                      className="font-display text-4xl lg:text-5xl text-white"
                    >
                      {activeItem.name}
                    </motion.h3>
                  </AnimatePresence>
                  <p className="mt-2 label-xs text-white/35 tracking-[0.2em]">{activeItem.terrain}</p>
                  <p className="mt-4 text-sm leading-6 text-white/62 max-w-sm">{activeItem.note}</p>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Right: Species list */}
          <div>
            <div className="rounded-[2.2rem] border border-white/8 overflow-hidden bg-white/[0.02]">
              {speciesCatalog.map((species, index) => (
                <motion.button
                  key={species.name}
                  {...revealUp}
                  transition={{ ...transition, delay: reduceMotion ? 0 : index * 0.04 }}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`w-full text-left border-t border-white/[0.07] first:border-t-0 px-7 py-7 transition-all duration-400 group ${
                    active === index ? "bg-white/[0.05]" : "hover:bg-white/[0.025]"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <p className="label-xs text-[#c9922a] mb-3">{species.season}</p>
                      <h3 className={`font-display text-[clamp(1.8rem,3vw,2.5rem)] leading-tight transition-colors duration-300 ${
                        active === index ? "text-white" : "text-white/70 group-hover:text-white/90"
                      }`}>
                        {species.name}
                      </h3>
                    </div>
                    <span className={`rounded-full px-4 py-2 label-xs transition-all duration-300 shrink-0 mt-1 ${
                      active === index
                        ? "bg-[#c9922a] text-[#020403]"
                        : "border border-white/12 text-white/38 group-hover:border-white/22 group-hover:text-white/55"
                    }`}>
                      {active === index ? "Viewing" : "Select"}
                    </span>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {active === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm leading-6 text-white/58">{species.note}</p>
                        <p className="mt-3 label-xs text-white/28 tracking-[0.18em]">{species.terrain}</p>

                        {/* Trait dots */}
                        <div className="mt-5 flex gap-2 flex-wrap">
                          {["Fair Chase", "Guided Access", "Trophy Quality", species.season.split(" ")[0]].map((trait) => (
                            <span key={trait} className="inline-flex items-center gap-2 rounded-full bg-[#c9922a]/10 border border-[#c9922a]/20 px-3 py-1.5 label-xs text-[#c9922a]/80">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#c9922a] inline-block" />
                              {trait}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
