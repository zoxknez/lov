"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { areaHighlights, heroVisuals } from "@/lib/site-content";
import { MapPin } from "lucide-react";

export default function AreasSection() {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 }
  };
  const tr = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section id="areas" className="py-28 border-t border-white/[0.06]">
      <div className="section-shell">
        {/* Header */}
        <motion.div {...revealUp} transition={tr} className="mb-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-xl">
            <p className="label-xs text-[#c9922a] mb-5">Territory</p>
            <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] text-white">
              The land defines<br />
              <em className="not-italic text-white/45">the hunt.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-white/50 font-light lg:text-right">
            Two distinct island theatres. One curated by ancient forest ridgelines, the other by high-alpine granite faces.
          </p>
        </motion.div>

        {/* Area cards */}
        <div className="grid gap-6">
          {areaHighlights.map((area, index) => {
            const visual = heroVisuals[index];
            const isActive = active === index;

            return (
              <motion.div
                key={area.title}
                {...revealUp}
                transition={{ ...tr, delay: reduceMotion ? 0 : index * 0.08 }}
              >
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={`w-full text-left group relative overflow-hidden rounded-[2.5rem] border transition-all duration-500 ${
                    isActive
                      ? "border-[#c9922a]/30 shadow-aura-gold"
                      : "border-white/10 hover:border-white/18"
                  }`}
                >
                  {/* Background image */}
                  <div className="relative min-h-[22rem] lg:min-h-[26rem]">
                    <Image
                      src={visual.image}
                      alt={area.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      sizes="(max-width: 1280px) 100vw, 80vw"
                    />
                    {/* Overlay - shifts based on active */}
                    <div className={`absolute inset-0 transition-opacity duration-500 ${
                      isActive
                        ? "bg-[linear-gradient(100deg,rgba(2,4,3,0.95)_0%,rgba(2,4,3,0.7)_45%,rgba(2,4,3,0.88)_100%)]"
                        : "bg-[linear-gradient(100deg,rgba(2,4,3,0.88)_0%,rgba(2,4,3,0.55)_50%,rgba(2,4,3,0.82)_100%)]"
                    }`} />

                    {/* Content */}
                    <div className="relative z-10 h-full p-8 lg:p-10 grid lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:items-end">
                      {/* Left */}
                      <div>
                        <div className="flex items-center gap-3 mb-5">
                          <MapPin size={14} className="text-[#c9922a]" />
                          <span className="label-xs text-[#c9922a]">Area 0{index + 1}</span>
                        </div>
                        <h3 className="font-display text-[clamp(1.8rem,3.5vw,3rem)] leading-tight text-white">
                          {area.title}
                        </h3>
                        <p className="mt-5 text-base leading-relaxed text-white/62 max-w-md">
                          {area.intro}
                        </p>

                        {/* Active indicator */}
                        <div className={`mt-6 inline-flex items-center gap-3 rounded-full px-5 py-2.5 label-xs transition-all duration-400 ${
                          isActive
                            ? "bg-[#c9922a] text-[#020403]"
                            : "border border-white/14 text-white/45 group-hover:border-white/24 group-hover:text-white/60"
                        }`}>
                          {isActive ? "Currently Viewing" : "View Territory"}
                        </div>
                      </div>

                      {/* Right: detail pills */}
                      <div className="grid sm:grid-cols-1 gap-3">
                        {area.details.map((detail, di) => (
                          <motion.div
                            key={di}
                            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                            animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0.4, x: 0 }}
                            transition={{ duration: 0.4, delay: di * 0.06 }}
                            className="rounded-[1.4rem] border border-white/10 bg-black/20 px-5 py-4 text-sm leading-6 text-white/65 backdrop-blur-sm"
                          >
                            {detail}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
