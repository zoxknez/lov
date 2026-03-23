'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Compass, Mountain, Quote, ShieldCheck, Target, Trophy } from 'lucide-react';
import TextReveal from '@/components/text-reveal';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const guide = {
  name: 'Vuk Mijatovic',
  title: 'Professional Hunting Guide',
  country: 'New Zealand Field Operations',
  experience: '35+ years',
  image: null as string | null,
  bio: 'With more than 35 years in the field, Vuk Mijatovic brings deep knowledge of New Zealand terrain, animal behaviour, and the patient, fair-chase pace required for successful trophy hunting.',
  intro:
    'Lead-guide delivery is built around calm field judgement, clean shot selection, and the right tempo for the country rather than rushed mileage.',
  operationalNotes: [
    'North Island sika and red deer programs',
    'Southern Alps tahr and chamois work',
    'Small-group hosted hunt rhythm',
    'Strong emphasis on recovery and field ethics',
  ],
  signals: [
    { label: 'Field Tenure', value: '35+ Years', icon: Target },
    { label: 'Primary Country', value: 'Bush to alpine faces', icon: Mountain },
    { label: 'Hunt Style', value: 'Fair-chase, small-group pace', icon: ShieldCheck },
  ],
  specialties: [
    'Persistence in the field',
    'Sika stalking expertise',
    'Mountain red deer programs',
    'Tahr and chamois mountain hunting',
    'Shot selection discipline',
    'Small-group hunt delivery',
  ],
  philosophy:
    'Every hunt is conducted with respect for the animal, the country, and the traditions of true hunting. The goal is not simply a result, but a result earned through skill, patience, and sound field judgement.',
  notableAchievements: [
    '13.5-inch bull tahr',
    'Multiple gold medal sika deer',
    'Gold medal red stags',
    'Gold medal sambar stag',
  ],
  closing:
    'What Vuk enjoys most about guiding is sharing his passion for hunting and helping clients work toward exceptional trophies in the right way.',
};

export default function GuideSection() {
  const [firstName, ...rest] = guide.name.split(' ');
  const lastName = rest.join(' ');

  return (
    <section id="guide" className="relative overflow-hidden bg-transparent py-24 font-sans experience-editorial md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-black/26 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-[28rem] w-[28rem] rounded-full bg-forest-500/6 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-0 h-[34rem] w-[34rem] rounded-full bg-gold-500/6 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 grid gap-8 lg:mb-24 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
          <div className="min-w-0">
            <p className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.5em] text-gold-400">
              <span className="h-px w-10 bg-gold-400/30" />
              <TextReveal>Operational Leadership</TextReveal>
            </p>
            <h2 className="font-display text-6xl font-bold uppercase leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-[7rem] lg:whitespace-nowrap">
              <TextReveal delay={0.2}>Lead Guide</TextReveal>
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] border border-white/10 bg-forest-900/20 p-6 shadow-premium backdrop-blur-xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.36em] text-gold-400/60">Guide Brief</p>
            <p className="mt-4 text-sm leading-7 text-gray-300">{guide.intro}</p>
          </motion.div>
        </div>

        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95 }}
            className="relative lg:col-span-5"
          >
            <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-forest-950/60 shadow-premium">
              <div className="relative aspect-[4/5] overflow-hidden">
                {guide.image ? (
                  <Image
                    src={getBlobAssetUrl(guide.image)}
                    alt={guide.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 42vw"
                    className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-105"
                  />
                ) : (
                  <div className="relative flex h-full items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_50%_18%,rgba(200,169,110,0.14),transparent_32%),linear-gradient(180deg,rgba(14,23,18,0.92),rgba(5,8,8,0.98))]">
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.02),transparent_38%,transparent_62%,rgba(200,169,110,0.04))]" />
                    <div className="absolute left-8 top-8 rounded-full border border-gold-400/20 bg-gold-400/6 px-5 py-2 text-[10px] font-bold uppercase tracking-[0.34em] text-gold-300">
                      Lead Guide
                    </div>
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-8 text-center">
                      <p className="text-[10px] font-bold uppercase tracking-[0.46em] text-gold-400/50">Field Leadership</p>
                      <div className="mt-5 font-display text-[7rem] font-bold uppercase leading-none tracking-[0.08em] text-white/[0.07] md:text-[8.5rem]">
                        VM
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/85 to-transparent" />
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                  <div className="rounded-[2rem] border border-white/10 bg-black/35 p-6 shadow-premium backdrop-blur-xl">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/70">Field Tenure</p>
                        <div className="mt-3 flex items-end gap-2">
                          <span className="font-display text-5xl font-bold leading-none tracking-tighter text-white md:text-6xl">
                            35+
                          </span>
                          <span className="mb-1 text-sm font-bold uppercase tracking-[0.28em] text-gold-300">Years</span>
                        </div>
                      </div>
                      <Target className="mt-1 h-5 w-5 text-gold-400/45" />
                    </div>

                    <div className="mt-5 h-px w-full bg-gradient-to-r from-gold-500/50 to-transparent" />

                    <div className="mt-5 flex flex-wrap gap-2">
                      {guide.operationalNotes.map((note) => (
                        <span
                          key={note}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-white/78"
                        >
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -left-6 top-10 -z-10 h-28 w-28 rounded-full bg-gold-400/8 blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, delay: 0.15 }}
            className="lg:col-span-7 lg:pl-4"
          >
            <div className="mb-10">
              <div className="mb-5 flex items-center gap-3 text-gold-400/70">
                <Compass className="h-4 w-4" />
                <span className="text-[11px] font-bold uppercase tracking-[0.36em]">{guide.country}</span>
              </div>

              <h3 className="font-display text-5xl font-bold leading-[0.92] tracking-tighter text-white md:text-7xl xl:text-[5.8rem] xl:whitespace-nowrap">
                {firstName} <span className="text-gold-400/92">{lastName}</span>
              </h3>

              <div className="mt-5 flex items-center gap-5">
                <p className="text-lg italic tracking-[0.03em] text-gray-300 md:text-xl">{guide.title}</p>
                <div className="hidden h-px flex-1 bg-gradient-to-r from-white/10 to-transparent md:block" />
              </div>
            </div>

            <div className="rounded-[2.4rem] border border-white/10 bg-forest-900/18 p-8 shadow-premium backdrop-blur-xl md:p-10">
              <p className="text-lg leading-9 text-gray-200 md:text-[1.32rem]">{guide.bio}</p>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {guide.signals.map((signal) => {
                const Icon = signal.icon;

                return (
                  <div
                    key={signal.label}
                    className="rounded-[1.8rem] border border-white/10 bg-black/15 p-5 shadow-premium backdrop-blur-sm"
                  >
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-gold-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60">{signal.label}</p>
                    <p className="mt-3 text-sm font-semibold uppercase leading-6 tracking-[0.08em] text-white/90">
                      {signal.value}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-[2rem] border border-white/10 bg-forest-900/12 p-7 shadow-premium">
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/60">Operational Focus</p>
                <div className="space-y-4">
                  {guide.specialties.slice(0, 3).map((specialty) => (
                    <div key={specialty} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gold-400">
                        <Award className="h-4 w-4" />
                      </div>
                      <span className="text-sm uppercase tracking-[0.08em] text-gray-300">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-forest-900/12 p-7 shadow-premium">
                <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/60">Technical Mastery</p>
                <div className="space-y-4">
                  {guide.specialties.slice(3).map((specialty) => (
                    <div key={specialty} className="flex items-center gap-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gold-400">
                        <Mountain className="h-4 w-4" />
                      </div>
                      <span className="text-sm uppercase tracking-[0.08em] text-gray-300">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-gold-500/10 bg-gradient-to-br from-gold-500/[0.07] via-forest-900/20 to-transparent p-8 shadow-premium md:p-10"
            >
              <Quote className="absolute right-8 top-8 h-16 w-16 text-gold-400/10" />
              <p className="relative z-10 text-lg italic leading-9 text-gray-200 md:text-[1.18rem]">
                &quot;{guide.philosophy}&quot;
              </p>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-24 rounded-[3rem] border border-white/10 bg-forest-900/16 p-8 shadow-premium backdrop-blur-xl md:p-10"
        >
          <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.42em] text-gold-400/55">Archive of Excellence</p>
              <h3 className="font-display text-4xl font-bold uppercase leading-none tracking-tighter text-white md:text-6xl">
                Notable Results
              </h3>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-400/15 bg-gold-400/[0.06] text-gold-300">
              <Trophy className="h-5 w-5" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {guide.notableAchievements.map((achievement, index) => (
              <motion.div
                key={achievement}
                whileHover={{ y: -4 }}
                className="rounded-[2rem] border border-white/10 bg-black/15 p-6 shadow-premium transition-colors duration-300 hover:border-gold-400/30"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/45">Record {index + 1}</span>
                  <Target className="h-4 w-4 text-gold-400/35" />
                </div>
                <div className="mt-8 h-px w-10 bg-gold-500/40" />
                <p className="mt-6 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white">
                  {achievement}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.95, delay: 0.3 }}
          className="mt-12"
        >
          <div className="rounded-[3rem] border border-white/10 bg-gradient-to-r from-forest-900/22 via-black/12 to-forest-900/22 p-8 shadow-premium backdrop-blur-xl md:p-12">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-8 flex items-center justify-center gap-5 text-gold-400/45">
                <div className="h-px w-14 bg-gold-400/30" />
                <Quote className="h-7 w-7" />
                <div className="h-px w-14 bg-gold-400/30" />
              </div>

              <p className="font-display text-2xl italic leading-relaxed tracking-tight text-gray-100 md:text-4xl">
                &quot;{guide.closing}&quot;
              </p>

              <div className="mt-10 text-[10px] font-bold uppercase tracking-[0.52em] text-gold-400/60">
                Kaimanawa Precision Standards
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
