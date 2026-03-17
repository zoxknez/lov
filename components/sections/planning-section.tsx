"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { timeline, planningNotes, pricingItems } from "@/lib/site-content";

export default function PlanningSection() {
  const reduceMotion = useReducedMotion();

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 }
  };
  const tr = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section id="planning" className="py-28 border-t border-white/[0.06]">
      <div className="section-shell">
        {/* Header */}
        <motion.div {...revealUp} transition={tr} className="mb-16 max-w-2xl">
          <p className="label-xs text-[#c9922a] mb-5">Planning</p>
          <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] text-white">
            Precision is the<br />
            <em className="not-italic text-white/45">new luxury.</em>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/52 font-light">
            Every great hunt lives in the planning. Season windows, permits, rifles, access — mapped before you arrive so the field stays fluid.
          </p>
        </motion.div>

        {/* Season timeline — horizontal scroll on mobile */}
        <div className="relative mb-16">
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduceMotion ? 0 : 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block absolute top-[2.6rem] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#c9922a]/40 to-transparent origin-left"
          />
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
            {timeline.map((item, index) => (
              <motion.article
                key={item.title}
                {...revealUp}
                transition={{ ...tr, delay: reduceMotion ? 0 : index * 0.07 }}
                className="card-hover-glow rounded-[1.8rem] border border-white/8 bg-white/[0.03] p-6"
              >
                {/* Timeline dot */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-2 h-2 rounded-full bg-[#c9922a] shrink-0" />
                  <p className="label-xs text-[#c9922a]">{item.window}</p>
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{item.title}</h3>
                <p className="text-sm leading-6 text-white/52">{item.description}</p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Notes + pricing grid */}
        <div className="grid xl:grid-cols-[1.1fr_0.9fr] gap-8">
          {/* Planning notes */}
          <div className="grid sm:grid-cols-2 gap-5 content-start">
            {planningNotes.map((note, index) => (
              <motion.article
                key={note.title}
                {...revealUp}
                transition={{ ...tr, delay: reduceMotion ? 0 : index * 0.05 }}
                className="card-hover-glow rounded-[1.8rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9922a]/25 bg-[#c9922a]/8">
                    <CheckCircle2 size={16} className="text-[#c9922a]" />
                  </span>
                  <p className="label-xs text-white/32">0{index + 1}</p>
                </div>
                <h3 className="font-display text-2xl text-white mb-3">{note.title}</h3>
                <p className="text-sm leading-6 text-white/55">{note.text}</p>
              </motion.article>
            ))}
          </div>

          {/* Pricing card */}
          <motion.article
            {...revealUp}
            transition={{ ...tr, delay: reduceMotion ? 0 : 0.2 }}
            className="rounded-[2.2rem] border border-[#c9922a]/18 bg-[#060d08] p-8 border-glow-gold"
          >
            <p className="label-xs text-[#c9922a] mb-8">What's included</p>
            <div className="grid sm:grid-cols-2 gap-8">
              <div>
                <p className="label-xs text-white/30 mb-5 pb-3 border-b border-white/8">Included</p>
                <div className="space-y-4">
                  {pricingItems.included.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-white/68">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#c9922a]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="label-xs text-white/30 mb-5 pb-3 border-b border-white/8">Additional</p>
                <div className="space-y-4">
                  {pricingItems.excluded.map((item) => (
                    <div key={item} className="flex gap-3 text-sm leading-6 text-white/45">
                      <span className="mt-[0.55rem] h-1.5 w-1.5 rounded-full bg-white/25 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-7 border-t border-white/8">
              <p className="label-xs text-white/30 mb-2">Pricing</p>
              <p className="font-display text-3xl text-white">On request</p>
              <p className="mt-2 text-sm text-white/45">Tailored per species, season, and group size. No hidden fees.</p>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
