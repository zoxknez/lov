"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { estateHighlights } from "@/lib/data";

type SignatureRevealProps = {
  daylight: number;
  isNight: boolean;
};

export default function SignatureReveal({ daylight, isNight }: SignatureRevealProps) {
  return (
    <section className={`section-shell signature-shell signature-shell-tight signature-phase relative z-10 ${isNight ? "is-night" : "is-day"}`}>
      <div className="signature-phase-day" style={{ opacity: daylight * 0.54 }} aria-hidden />
      <div className="signature-phase-night" style={{ opacity: (1 - daylight) * 0.7 }} aria-hidden />
      <div className="signature-glow" aria-hidden />
      <div className="signature-heading premium-panel rounded-2xl bg-black/35 p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Signature Estate Reveal</p>
        <h2 className="font-serif text-4xl md:text-5xl">A quieter luxury read of the landscape</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-stone-300">
          The estate should feel expansive, calm, and assured. These frames are not just visual mood; they explain how
          terrain, light, and access shape the guest experience.
        </p>
      </div>

      <div className="signature-grid grid gap-4 lg:grid-cols-3">
        {estateHighlights.slice(0, 3).map((item, idx) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 30, rotate: idx === 1 ? 0 : idx === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.08 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="premium-panel reveal-card signature-card group relative min-h-[370px] overflow-hidden rounded-[28px] p-3"
          >
            <div className="relative h-full overflow-hidden rounded-2xl">
              <Image src={item.image} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-[10px] uppercase tracking-[0.15em] text-[#dfc28f]">Estate frame 0{idx + 1}</p>
                <h3 className="mt-1 font-serif text-2xl text-white">{item.title}</h3>
                <p className="mt-1 text-sm text-stone-200">{item.description}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em]">
                  <span className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[#e7cb95]">Guest pacing</span>
                  <span className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[#e7cb95]">Visual privacy</span>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
