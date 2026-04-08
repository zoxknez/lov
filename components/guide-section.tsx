'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Mountain, Quote, ShieldCheck, Target, Trophy, Award, Navigation } from 'lucide-react';
import Image from 'next/image';
import TextReveal from '@/components/text-reveal';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import gallerySlike from '@/lib/gallery-slike.json';

const guide = {
  name: 'Vuk Mijatovic',
  title: 'Professional Hunting Guide',
  country: 'New Zealand Field Operations',
  experience: '35+ years',
  image: gallerySlike[3]?.localSrc ?? null,
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
      {/* Dynamic backgrounds */}
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-gold-400/[0.02] blur-[160px]" />
      <div className="pointer-events-none absolute -right-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-gold-400/[0.02] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Simplified Header */}
        <div className="mb-16 flex flex-col items-center text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400">
            <TextReveal>Operational Leadership</TextReveal>
          </p>
          <div className="relative">
            <h2 className="font-display text-6xl font-black uppercase leading-none tracking-tighter text-white soft-text-glow sm:text-7xl md:text-9xl">
              <TextReveal delay={0.1}>Field Lead</TextReveal>
            </h2>
            <div className="absolute -right-4 -top-2 flex items-center gap-2 opacity-40 md:-right-8">
               <Navigation className="h-4 w-4 text-gold-400 rotate-45" />
               <span className="text-[10px] font-bold tracking-[0.2em] text-gold-400">Active</span>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Visual Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-full lg:col-span-5"
          >
            <div className="group relative h-full min-h-[500px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#090e0d] shadow-premium md:rounded-[3rem]">
              {/* Profile Background Graphics */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(200,169,110,0.1),transparent_70%)] opacity-40" />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.8)_90%)]" />
              
              {/* VM Large Initial Background */}
              <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 select-none items-center justify-center">
                 <span className="font-display text-[12rem] font-black tracking-tighter text-white/[0.03] transition-all group-hover:text-gold-400/[0.04] md:text-[18rem]">VM</span>
              </div>

              {guide.image ? (
                <Image
                  src={getBlobAssetUrl(guide.image)}
                  alt={guide.name}
                  fill
                  sizes="(max-width: 1023px) 100vw, 42vw"
                  className="z-10 object-cover transition-all duration-[2500ms] scale-105 group-hover:scale-110"
                />
              ) : (
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center p-12 text-center">
                   <div className="relative mb-6">
                      <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-gold-400/20 bg-gold-400/5 font-display text-4xl font-bold tracking-widest text-gold-300 shadow-glow backdrop-blur-sm">VM</div>
                      <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/50 bg-black text-gold-400 shadow-glow">
                         <Target className="h-4 w-4" />
                      </div>
                   </div>
                   <p className="max-w-[180px] text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 leading-relaxed">
                      Lead Guide New Zealand Operations
                   </p>
                </div>
              )}

              {/* Card Overlays */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-8 sm:p-12">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-1px w-8 bg-gold-400/40" />
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/70">
                      {guide.experience} Exp.
                   </p>
                </div>
                <h3 className="font-display text-5xl font-bold uppercase leading-tight text-white sm:text-6xl">
                  {firstName}
                  <br />
                  <span className="text-gold-200">{lastName}</span>
                </h3>
                <div className="mt-6 flex items-center gap-4">
                   <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
                      <Mountain className="h-3 w-3 text-gold-400" />
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300">Alpine Field Op</span>
                   </div>
                </div>
              </div>

              {/* Decorative corners */}
              <div className="pointer-events-none absolute inset-0 z-30 opacity-40">
                <div className="absolute left-10 top-10 h-10 w-10 border-l-2 border-t-2 border-gold-400/20" />
                <div className="absolute bottom-10 right-10 h-10 w-10 border-b-2 border-r-2 border-gold-400/20" />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Unified Dossier */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col h-full lg:col-span-7"
          >
            <div className="relative h-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,22,21,0.6),rgba(9,14,13,0.8))] p-8 shadow-premium sm:p-12 md:rounded-[3rem] lg:p-14">
               {/* Background Glow */}
               <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold-400/5 blur-3xl" />
               
               <div className="relative z-10 h-full flex flex-col">
                  {/* Bio & Intro Section */}
                  <div className="mb-10">
                    <div className="mb-6 flex items-center gap-3">
                       <Award className="h-5 w-5 text-gold-400" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold-400/60">Professional Dossier</span>
                    </div>
                    
                    <div className="relative mb-8">
                       <Quote className="absolute -left-6 -top-2 h-10 w-10 text-gold-500/10 opacity-60" />
                       <p className="font-display text-2xl font-light italic leading-relaxed text-white md:text-3xl lg:text-4xl">
                          &ldquo;{guide.intro}&rdquo;
                       </p>
                    </div>
                    
                    <p className="text-base leading-relaxed text-gray-400 md:text-lg">
                       {guide.bio}
                    </p>
                  </div>

                  {/* Specification Bar (Integrated) */}
                  <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6">
                     {guide.specs.map((spec) => {
                       const Icon = spec.icon;
                       return (
                         <div key={spec.label} className="group rounded-2xl border border-white/5 bg-white/[0.02] p-5 transition-all hover:bg-white/[0.05] hover:border-gold-500/20">
                            <Icon className="mb-3 h-5 w-5 text-gold-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                            <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-gold-400/40">{spec.label}</p>
                            <p className="font-display text-sm font-bold uppercase tracking-tight text-white">{spec.value}</p>
                         </div>
                       );
                     })}
                  </div>

                  {/* Achievements List (Clean) */}
                  <div className="mb-12">
                     <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/40">Archive of Excellence</p>
                     <div className="flex flex-wrap gap-2.5 sm:gap-4">
                        {guide.achievements.map((item) => (
                           <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-3 transition-all hover:border-gold-500/30 hover:bg-gold-500/5">
                              <Trophy className="h-3.5 w-3.5 text-gold-400" />
                              <span className="text-[11px] font-bold uppercase tracking-widest text-gray-200">{item}</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Philosophy Segment (Integrated Bottom) */}
                  <div className="mt-auto pt-10 border-t border-white/5">
                     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
                        <div className="hidden h-px flex-1 bg-gradient-to-r from-white/5 to-transparent sm:block" />
                        <div className="flex max-w-sm flex-col gap-2 italic">
                           <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400/30">Field Philosophy</p>
                           <p className="text-sm leading-relaxed text-gray-400">
                             {guide.philosophy}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
