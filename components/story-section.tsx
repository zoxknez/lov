'use client';

import { motion } from 'framer-motion';
import { Award, Crosshair, ShieldCheck } from 'lucide-react';
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
    <section id="story" className="relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col items-center text-center md:mb-16">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400">
            <TextReveal>The Legacy</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white text-balance soft-text-glow sm:text-6xl md:text-8xl lg:text-[8rem]">
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

        <div className="mb-4 grid gap-4 sm:gap-6 lg:mb-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(9,14,13,0.9),rgba(5,8,8,0.95))] p-6 shadow-premium sm:p-8 md:rounded-[2.5rem] md:p-10 lg:col-span-3 lg:p-14"
          >
            <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/60 to-transparent" />
            <div className="absolute left-0 top-0 h-16 w-px bg-gradient-to-b from-gold-400/40 to-transparent" />

            <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.32em] text-gold-400/60 sm:text-[10px] sm:tracking-[0.46em]">
              Founding Statement
            </p>

            <blockquote className="relative">
              <span className="absolute -left-1 top-0 font-display text-4xl italic leading-none text-gold-300/40 select-none sm:-left-2 sm:-top-4 sm:text-6xl">
                &ldquo;
              </span>
              <p className="pr-2 font-display text-[1.9rem] font-light italic leading-[1.1] text-white text-balance sm:text-[2.25rem] sm:leading-[1.18] md:text-3xl lg:text-[2.1rem] lg:leading-[1.25]">
                Founded to introduce international hunters to the quality of New Zealand trophies and the raw majesty of its wild landscapes.
              </p>
              <span className="float-right -mt-2 font-display text-4xl italic leading-none text-gold-300/40 select-none sm:-mt-4 sm:text-6xl">
                &rdquo;
              </span>
            </blockquote>

            <div className="mt-8 flex flex-col items-start gap-3 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gray-500 sm:tracking-[0.36em]">
                Est. 2025 - New Zealand
              </p>
              <div className="h-px flex-1 bg-white/8" />
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-400/50 sm:tracking-[0.36em]">
                90+ Combined Years
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-3 sm:gap-4 lg:col-span-2"
          >
            {founders.map((founder, index) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + index * 0.1, duration: 0.7 }}
                whileHover={{ x: 4, transition: { duration: 0.3 } }}
                className="group flex items-center gap-4 rounded-[1.4rem] border border-white/8 bg-forest-900/20 px-4 py-4 shadow-premium transition-all duration-500 hover:border-gold-500/30 hover:bg-forest-900/40 sm:gap-5 sm:rounded-[1.6rem] sm:px-6 sm:py-5"
              >
                <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-gold-400/20 bg-gold-400/8 font-display text-sm font-bold uppercase tracking-widest text-gold-300 shadow-glow transition-all group-hover:border-gold-400/40 group-hover:bg-gold-400/14">
                  {founder.initials}
                  <div className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-gold-400/60 animate-pulse" />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[15px] font-bold uppercase tracking-tight text-white sm:text-base">
                    {founder.name}
                  </p>
                  <p className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.22em] text-gold-400/50 sm:text-[9px] sm:tracking-[0.3em]">
                    {founder.role} - {founder.origin}
                  </p>
                </div>

                <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] text-gray-400 sm:text-[9px] sm:tracking-[0.2em]">
                  {founder.exp}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {values.map((value, index) => {
            const Icon = value.icon;

            return (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.7 }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="group relative overflow-hidden rounded-[1.7rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium transition-all duration-500 hover:border-gold-500/30 sm:p-6 md:rounded-[2rem] md:p-8"
              >
                <div className="absolute right-6 top-6 font-display text-4xl font-black italic tracking-tighter text-gold-400/20 transition-all select-none soft-text-glow group-hover:text-gold-400/35 sm:right-10 sm:top-8 sm:text-5xl">
                  0{index + 1}
                </div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-400/15 bg-gold-400/10 text-gold-400 shadow-glow transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold uppercase tracking-tight text-white sm:mb-3 sm:text-2xl">
                  {value.label}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">
                  {value.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
