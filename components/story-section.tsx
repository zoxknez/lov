'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Award, Crosshair } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

const founders = [
  { name: 'Alex Sipka', role: 'Co-Founder', origin: 'Serbia', exp: '40 Yrs', initials: 'AS' },
  { name: 'Artem Prikazov', role: 'Co-Founder', origin: 'Russia', exp: '15 Yrs', initials: 'AP' },
  { name: 'Vuk Mijatovic', role: 'Lead Guide', origin: 'NZ Field Ops', exp: '35+ Yrs', initials: 'VM' },
];

const values = [
  {
    icon: ShieldCheck,
    label: 'Fair Chase',
    text: 'Every hunt is earned, physical, and respectful of the animal and the land.',
  },
  {
    icon: Award,
    label: 'Ethical Standard',
    text: 'Shot selection, recovery, and camp conduct are our non-negotiable baseline.',
  },
  {
    icon: Crosshair,
    label: 'Precision Planning',
    text: 'Itineraries shaped around your trophy goals, species windows, and preferred terrain.',
  },
];

export default function StorySection() {
  return (
    <section id="story" className="relative overflow-hidden bg-transparent py-24 md:py-32 font-sans">
      <div className="absolute inset-0 bg-forest-950/10 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400 mb-4">
            <TextReveal>The Legacy</TextReveal>
          </p>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tight text-white md:text-8xl lg:text-[8rem] leading-none text-balance soft-text-glow">
            <TextReveal delay={0.1}>Our Story</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
            className="mx-auto mt-6 flex items-center gap-3"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/50 to-transparent" />
          </motion.div>
        </div>

        {/* ── Main split layout ── */}
        <div className="grid gap-6 lg:grid-cols-5 mb-6">

          {/* Left — Mission quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3 relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-[linear-gradient(135deg,rgba(9,14,13,0.9),rgba(5,8,8,0.95))] p-10 shadow-premium md:p-14"
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-gold-400/60 to-transparent" />
            <div className="absolute top-0 left-0 h-16 w-px bg-gradient-to-b from-gold-400/40 to-transparent" />

            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.46em] text-gold-400/60">Founding Statement</p>

            <blockquote className="relative">
              <span className="absolute -left-2 -top-4 font-display text-6xl italic text-gold-300/40 select-none leading-none">&ldquo;</span>
              <p className="font-display text-2xl font-light italic leading-relaxed text-white md:text-3xl lg:text-[2.1rem] lg:leading-[1.25] text-balance">
                Founded to introduce international hunters to the quality of New Zealand trophies and the raw majesty of its wild landscapes.
              </p>
              <span className="font-display text-6xl italic text-gold-300/40 select-none leading-none float-right -mt-4">&rdquo;</span>
            </blockquote>

            <div className="mt-10 flex items-center gap-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-gray-500">Est. 2025 · New Zealand</p>
              <div className="h-px flex-1 bg-white/8" />
              <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-gold-400/50">90+ Combined Years</p>
            </div>
          </motion.div>

          {/* Right — Founders */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {founders.map((f, i) => (
              <motion.div
                key={f.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.7 }}
                whileHover={{ x: 4, transition: { duration: 0.3 } }}
                className="group flex items-center gap-5 rounded-[1.6rem] border border-white/8 bg-forest-900/20 px-6 py-5 shadow-premium transition-all duration-500 hover:border-gold-500/30 hover:bg-forest-900/40"
              >
                {/* Avatar */}
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-gold-400/20 bg-gold-400/8 font-display text-sm font-bold uppercase tracking-widest text-gold-300 shadow-glow transition-all group-hover:border-gold-400/40 group-hover:bg-gold-400/14">
                  {f.initials}
                  <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-gold-400/60 animate-pulse" />
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-base font-bold uppercase tracking-tight text-white truncate">{f.name}</p>
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400/50 mt-0.5">{f.role} · {f.origin}</p>
                </div>

                {/* Exp badge */}
                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400">
                  {f.exp}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* ── Values row ── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.7 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium transition-all duration-500 hover:border-gold-500/30"
              >
                <div className="absolute top-0 right-0 h-px w-20 bg-gradient-to-l from-gold-400/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/10 text-gold-400 border border-gold-400/15 shadow-glow transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="absolute top-8 right-10 font-display text-5xl font-black italic text-gold-400/20 group-hover:text-gold-400/35 transition-all select-none tracking-tighter soft-text-glow">0{i + 1}</div>
                <h3 className="mb-3 font-display text-2xl font-bold uppercase tracking-tight text-white">{v.label}</h3>
                <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">{v.text}</p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
