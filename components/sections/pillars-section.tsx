"use client";

import { motion, useReducedMotion } from "framer-motion";
import { experiencePillars } from "@/lib/site-content";
import MarqueeTicker from "@/components/marquee-ticker";

const tickerItems = [
  "Red Deer · Late March",
  "Sika · Kaimanawa Forest",
  "Himalayan Tahr · Southern Alps",
  "Chamois · Alpine Faces",
  "Fallow Deer · Private Blocks",
  "Rusa Deer · North Island",
  "90+ Years Field Experience",
  "Central North Island",
  "South Island Alpine"
];

export default function PillarsSection() {
  const reduceMotion = useReducedMotion();

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 }
  };
  const tr = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <>
      {/* Marquee ticker */}
      <div className="border-y border-white/[0.07] py-4 overflow-hidden">
        <MarqueeTicker items={tickerItems} separator="✦" speed="medium" />
      </div>

      {/* Pillars */}
      <section className="py-24 border-b border-white/[0.06]">
        <div className="section-shell">
          <div className="grid xl:grid-cols-[0.82fr_1.18fr] gap-12 xl:items-center">
            {/* Left */}
            <motion.div {...revealUp} transition={tr}>
              <p className="label-xs text-[#c9922a] mb-5">What we offer</p>
              <h2 className="font-display text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.92] text-white">
                Less outfitter noise.<br />
                <em className="not-italic text-white/45">More private-travel precision.</em>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-white/52 font-light max-w-sm">
                Each program is framed around terrain first, then tuned to species, season, and the exact pace your group wants in the field.
              </p>
            </motion.div>

            {/* Right: Pillar cards */}
            <div className="grid gap-5 sm:grid-cols-3">
              {experiencePillars.map((pillar, index) => (
                <motion.article
                  key={pillar.title}
                  {...revealUp}
                  transition={{ ...tr, delay: reduceMotion ? 0 : 0.06 + index * 0.08 }}
                  className="card-hover-glow group relative rounded-[1.8rem] border border-white/8 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 overflow-hidden"
                >
                  {/* Glow accent */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-[#c9922a]/8 blur-2xl group-hover:bg-[#c9922a]/15 transition-colors duration-500" />

                  <p className="label-xs text-[#c9922a] mb-5 relative">{pillar.label}</p>
                  <h3 className="font-display text-2xl text-white mb-4 leading-tight relative">{pillar.title}</h3>
                  <p className="text-sm leading-6 text-white/52 relative">{pillar.text}</p>

                  {/* Bottom line decoration */}
                  <div className="mt-6 h-px bg-gradient-to-r from-[#c9922a]/25 via-[#c9922a]/10 to-transparent" />
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
