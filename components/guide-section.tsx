'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Compass, Mountain, Quote, ShieldCheck, Target, Trophy, CheckCircle2 } from 'lucide-react';
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
  achievements: [
    '13.5" Bull Tahr',
    'Gold Medal Sika',
    'Gold Red Stags',
    'Gold Sambar Stag',
  ],
  philosophy: 'The goal is result earned through skill, patience, and sound field judgement.',
};

export default function GuideSection() {
  const [firstName, ...rest] = guide.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section id="guide" className="relative overflow-hidden bg-transparent py-24 md:py-32 font-sans">
      <div className="absolute inset-0 bg-forest-950/10 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-gold-400/3 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400 mb-4">
            <TextReveal>Operational Leadership</TextReveal>
          </p>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tight text-white md:text-8xl lg:text-[8rem] leading-none">
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

        {/* ── Main Dossier Panel ── */}
        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* Left — Image & Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-forest-900/20 shadow-premium aspect-[4/5]">
              {guide.image ? (
                <Image
                  src={getBlobAssetUrl(guide.image)}
                  alt={guide.name}
                  fill
                  className="object-cover scale-105 hover:scale-110 transition-transform duration-[2s]"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(200,169,110,0.12),transparent_60%)]">
                   <div className="font-display text-[10rem] font-bold text-white/[0.04] leading-none select-none">VM</div>
                   <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/40">Field Lead</div>
                </div>
              )}
              
              {/* HUD Frame */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-6 left-6 h-10 w-10 border-t border-l border-gold-400/40" />
                <div className="absolute bottom-6 right-6 h-10 w-10 border-b border-r border-gold-400/40" />
              </div>

              {/* Float Badge */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 rounded-full border border-gold-400/20 bg-black/40 px-5 py-2 backdrop-blur-md">
                   <div className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                   <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white">Active Operations</span>
                </div>
              </div>

              {/* Name Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-10 bg-gradient-to-t from-black/90 via-black/20 to-transparent">
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/70 mb-2">{guide.country}</p>
                <h3 className="font-display text-5xl font-bold uppercase leading-tight text-white">
                  {firstName}<br />
                  <span className="text-gold-200">{lastName}</span>
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Right — Bio, Specs & Records */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Bio & Intro */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 md:p-10 shadow-premium">
              <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-gold-400/40 to-transparent" />
              <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-gold-400/60 mb-6 italic">Professional Dossier</p>
              <p className="text-lg leading-relaxed text-gray-200 md:text-xl font-light italic mb-8">
                &ldquo;{guide.intro}&rdquo;
              </p>
              <p className="text-base leading-relaxed text-gray-400">
                {guide.bio}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-3 gap-4">
              {guide.specs.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="group rounded-[1.6rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium hover:border-gold-400/20 transition-all">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/8 text-gold-400 border border-gold-400/15 shadow-glow transition-transform group-hover:scale-110">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400/50 mb-1">{s.label}</p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">{s.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Records — Horizontal List */}
            <div className="rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium relative overflow-hidden">
              <div className="absolute top-0 right-0 h-px w-32 bg-gradient-to-l from-gold-400/30 to-transparent" />
              <div className="flex items-center justify-between mb-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.42em] text-gold-400/60">Archive of Excellence</p>
                <Trophy className="h-4 w-4 text-gold-400/40" />
              </div>
              <div className="flex flex-wrap gap-3">
                {guide.achievements.map((a) => (
                  <div key={a} className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.03] px-4 py-2 transition-all hover:border-gold-400/30 hover:bg-gold-400/5">
                    <CheckCircle2 className="h-3 w-3 text-gold-400/60" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Philosophy Accent */}
            <div className="mt-auto flex items-start gap-6 border-t border-white/8 pt-8 text-gray-400">
               <Quote className="h-8 w-8 shrink-0 text-gold-400/20" />
               <p className="text-sm italic leading-relaxed">
                 {guide.philosophy}
               </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
