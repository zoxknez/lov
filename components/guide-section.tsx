'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Mountain, Quote, ShieldCheck, Target, Trophy } from 'lucide-react';
import Image from 'next/image';
import TextReveal from '@/components/text-reveal';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const guide = {
  name: 'Vuk Mijatovic',
  title: 'Professional Hunting Guide',
  country: 'New Zealand Field Operations',
  experience: '35+ years',
  image: null as string | null,
  bio: 'With more than 35 years in the field, Vuk brings deep knowledge of New Zealand terrain, animal behaviour, and the patient, fair-chase pace required for successful trophy hunting.',
  intro: 'Lead-guide delivery is built around calm field judgement, clean shot selection, and the right tempo for the country.',
  specs: [
    { label: 'Tenure', value: '35+ Yrs', icon: Target },
    { label: 'Country', value: 'Alpine/Bush', icon: Mountain },
    { label: 'Style', value: 'Fair-Chase', icon: ShieldCheck },
  ],
  achievements: ['13.5" Bull Tahr', 'Gold Medal Sika', 'Gold Red Stags', 'Gold Sambar Stag'],
  philosophy: 'The goal is result earned through skill, patience, and sound field judgement.',
};

export default function GuideSection() {
  const [firstName, ...rest] = guide.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section id="guide" className="relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-400/3 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400">
            <TextReveal>Operational Leadership</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8rem]">
            <TextReveal delay={0.1}>Lead Guide</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mx-auto mt-6 flex items-center gap-3"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/50 to-transparent" />
          </motion.div>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="relative lg:col-span-5"
          >
            <div className="relative aspect-[4/4.8] overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 shadow-premium md:rounded-[2.5rem]">
              {guide.image ? (
                <Image
                  src={getBlobAssetUrl(guide.image)}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="object-cover transition-transform duration-[2000ms] scale-105 hover:scale-110"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(200,169,110,0.12),transparent_60%)]">
                  <div className="font-display text-[7rem] font-bold leading-none text-white/[0.04] select-none sm:text-[10rem]">VM</div>
                  <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/40">Field Lead</div>
                </div>
              )}

              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-5 top-5 h-10 w-10 border-l border-t border-gold-400/40 sm:left-6 sm:top-6" />
                <div className="absolute bottom-5 right-5 h-10 w-10 border-b border-r border-gold-400/40 sm:bottom-6 sm:right-6" />
              </div>

              <div className="absolute left-1/2 top-5 -translate-x-1/2 sm:top-8">
                <div className="flex items-center gap-2 rounded-full border border-gold-400/20 bg-black/40 px-5 py-2 backdrop-blur-md">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-400" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.26em] text-white">Active Operations</span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-6 sm:p-10">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/70 sm:text-[10px] sm:tracking-[0.4em]">
                  {guide.country}
                </p>
                <h3 className="font-display text-4xl font-bold uppercase leading-[0.95] text-white sm:text-5xl">
                  {firstName}
                  <br />
                  <span className="text-gold-200">{lastName}</span>
                </h3>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col gap-4 sm:gap-6 lg:col-span-7"
          >
            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium sm:p-8 md:rounded-[2rem] md:p-10">
              <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/40 to-transparent" />
              <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/60">Professional Dossier</p>
              <p className="mb-6 text-lg font-light italic leading-relaxed text-gray-200 md:text-xl">
                &ldquo;{guide.intro}&rdquo;
              </p>
              <p className="text-sm leading-relaxed text-gray-400 sm:text-base">{guide.bio}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
              {guide.specs.map((spec) => {
                const Icon = spec.icon;

                return (
                  <div
                    key={spec.label}
                    className="group rounded-[1.4rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium transition-all hover:border-gold-400/20 sm:rounded-[1.6rem]"
                  >
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/15 bg-gold-400/8 text-gold-400 shadow-glow transition-transform group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-400/50">{spec.label}</p>
                    <p className="text-sm font-bold uppercase tracking-tight text-white">{spec.value}</p>
                  </div>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium sm:p-8 md:rounded-[2rem]">
              <div className="absolute right-0 top-0 h-px w-32 bg-gradient-to-l from-gold-400/30 to-transparent" />
              <div className="mb-6 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/60">Archive of Excellence</p>
                <Trophy className="h-4 w-4 text-gold-400/40" />
              </div>
              <div className="flex flex-wrap gap-3">
                {guide.achievements.map((achievement) => (
                  <div
                    key={achievement}
                    className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 transition-all hover:border-gold-400/30 hover:bg-gold-400/5"
                  >
                    <CheckCircle2 className="h-3 w-3 text-gold-400/60" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-300">{achievement}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col items-start gap-4 border-t border-white/8 pt-6 text-gray-400 sm:flex-row sm:gap-6 sm:pt-8">
              <Quote className="h-8 w-8 shrink-0 text-gold-400/20" />
              <p className="text-sm italic leading-relaxed">{guide.philosophy}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
