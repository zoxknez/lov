"use client";

import { motion } from "framer-motion";

const chapters = [
  {
    code: "CH 01",
    title: "Arrival protocol",
    text: "Private transfer from Taupo corridor, concierge onboarding, and evening tactical brief.",
    meta: "Taupo Corridor - 17:40 arrival",
    status: "Concierge synced"
  },
  {
    code: "CH 02",
    title: "Terrain calibration",
    text: "Wind lanes, thermal shifts, and movement logic aligned to your selected trophy target.",
    meta: "Kaimanawa Core - 05:55 briefing",
    status: "Thermal map locked"
  },
  {
    code: "CH 03",
    title: "Prime engagement",
    text: "Guide-led final approach with disciplined shot setup, recovery, and cinematic documentation.",
    meta: "North Ridge - dual guide execution",
    status: "Ethical window active"
  }
];

export default function StoryChapters() {
  return (
    <section className="section-shell chapter-shell relative">
      <div className="chapter-glow" />

      <div className="relative z-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="premium-panel chapter-lead sticky top-28 h-fit rounded-[30px] bg-[linear-gradient(155deg,rgba(20,34,28,0.62),rgba(10,20,17,0.52))] p-7">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Micro-story Chapters</p>
          <h2 className="mt-2 font-serif text-4xl leading-[1.03] md:text-5xl">A cinematic client journey</h2>
          <p className="mt-3 text-sm text-stone-300">
            Each scroll beat represents a real operational phase of a KAIMANAWA expedition, from arrival protocol to final trophy engagement.
          </p>

          <div className="mt-5 grid gap-2 text-xs uppercase tracking-[0.14em] text-stone-200">
            <div className="premium-panel rounded-lg bg-black/25 px-3 py-2">Private transfer and lodge onboarding</div>
            <div className="premium-panel rounded-lg bg-black/25 px-3 py-2">Live terrain and weather calibration</div>
            <div className="premium-panel rounded-lg bg-black/25 px-3 py-2">Guide-led ethical shot execution</div>
          </div>
        </div>

        <div className="relative pl-0 lg:pl-8">
          <div className="chapter-rail" aria-hidden />
          <div className="space-y-4">
            {chapters.map((chapter, idx) => (
              <motion.article
                key={chapter.code}
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: idx * 0.1 }}
                className="premium-panel chapter-card rounded-[26px] bg-[linear-gradient(155deg,rgba(18,32,26,0.66),rgba(11,21,18,0.52))] p-6"
              >
                <span className="chapter-node" aria-hidden />
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#d9b167]">{chapter.code}</p>
                  <span className="rounded-full border border-emerald-200/25 bg-emerald-400/10 px-2 py-1 text-[10px] uppercase tracking-[0.14em] text-emerald-200">
                    {chapter.status}
                  </span>
                </div>
                <h3 className="font-serif text-3xl text-white md:text-4xl">{chapter.title}</h3>
                <p className="mt-2 max-w-2xl text-sm text-stone-200">{chapter.text}</p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.15em] text-[#e7cb95]">{chapter.meta}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
