'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { ShieldCheck, Award } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

export default function StorySection() {
  type FounderProfile = {
    name: string;
    role: string;
    origin: string;
    experience: string;
    description: string;
    image: string | null;
  };

  const founders: FounderProfile[] = [
    {
      name: 'Alex Sipka',
      role: 'Co-Founder',
      origin: 'Serbia',
      experience: '40 Years',
      description: 'Veteran hunter whose decades in the field shaped the standards and pace behind the Kaimanawa program.',
      image: null,
    },
    {
      name: 'Artem Prikazov',
      role: 'Co-Founder',
      origin: 'Russia',
      experience: '15 Years',
      description: 'Internationally travelled hunter focused on the quality of New Zealand game and the experience around it.',
      image: null,
    },
    {
      name: 'Vuk Mijatovic',
      role: 'Lead Guide',
      origin: 'New Zealand Field Ops',
      experience: '35+ Years',
      description: 'Lead field guide with deep knowledge of New Zealand terrain, animal behaviour, and hunt execution.',
      image: null,
    },
  ];

  const missionQuote =
    'Kaimanawa Trophy Safaris was born from a shared passion for the New Zealand wilderness. Our aim is simple: to create a properly hosted hunting program that feels authentic in the field and meticulously polished in the planning.';

  const founderNames = ['Artem Prikazov', 'Alex Sipka', 'Vuk Mijatovic'];

  const splitFounderName = (name: string) => {
    const [firstName, ...rest] = name.split(' ');
    return {
      firstName,
      lastName: rest.join(' '),
      initials: name
        .split(' ')
        .map((part) => part[0])
        .join('')
        .slice(0, 2),
    };
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section id="story" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans">
      {/* Editorial Depth Layer */}
      <div className="absolute inset-0 bg-forest-950/12 backdrop-blur-[1px] pointer-events-none" />
      {/* Background Decorative Elements */}
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-gold-400/5 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-forest-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[13px] uppercase tracking-[0.4em] text-gold-300 font-bold mb-4">
             <TextReveal>The Legacy</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-9xl">
             <TextReveal delay={0.1}>Our Story</TextReveal>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" 
          />
          <p className="mx-auto mt-10 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl italic">
             <TextReveal delay={0.4}>
                Founded in 2025 to introduce international hunters to the quality of New Zealand trophies and the raw majesty of its wild landscapes.
             </TextReveal>
          </p>
        </div>

        {/* Mission Statement / Feature Box */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="group relative overflow-hidden rounded-[3rem] border border-white/10 bg-forest-900/20 p-px shadow-2xl backdrop-blur-xl">
            <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-gold-500/45 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />

            <div className="relative overflow-hidden rounded-[3rem] bg-[linear-gradient(180deg,rgba(9,14,13,0.82),rgba(5,8,8,0.92))] px-8 py-16 md:px-16 md:py-24 lg:px-24 lg:py-28">
              <div className="pointer-events-none absolute left-1/2 top-1/2 flex h-[105%] w-[105%] -translate-x-1/2 -translate-y-1/2 items-center justify-center opacity-[0.025] grayscale">
                <Image
                  src={getBlobAssetUrl('/media/logo.png')}
                  alt=""
                  width={1100}
                  height={1100}
                  className="object-contain"
                />
              </div>

              <div className="relative z-10">
                <div className="mb-10 flex flex-col items-center text-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400 shadow-glow"
                  >
                    <Award className="h-8 w-8" />
                  </motion.div>

                  <p className="text-[10px] font-bold uppercase tracking-[0.48em] text-gold-400/65">
                    Founding Statement
                  </p>
                </div>

                <motion.blockquote
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.15 }}
                  className="mx-auto max-w-5xl text-center"
                >
                  <div className="relative px-2 md:px-8">
                    <span className="pointer-events-none absolute -left-1 top-0 font-display text-5xl italic leading-none text-gold-300/45 md:-left-4 md:text-7xl">
                      &quot;
                    </span>
                    <p className="font-display text-[2.1rem] font-light italic leading-[1.12] tracking-tight text-gray-100 md:text-[3.5rem] lg:text-[4.35rem]">
                      {missionQuote}
                    </p>
                    <span className="pointer-events-none absolute -bottom-6 right-0 font-display text-5xl italic leading-none text-gold-300/45 md:-right-2 md:text-7xl">
                      &quot;
                    </span>
                  </div>
                </motion.blockquote>

                <div className="mx-auto mt-16 max-w-4xl border-t border-white/10 pt-10 md:mt-20">
                  <div className="mb-7 flex items-center justify-center gap-4">
                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-gold-500/70" />
                    <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400/60">The Founders</p>
                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-gold-500/70" />
                  </div>

                  <div className="grid gap-4 text-center md:grid-cols-3">
                    {founderNames.map((name, i) => (
                      <motion.div
                        key={name}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.45 + i * 0.08 }}
                        className="rounded-[1.6rem] border border-white/10 bg-white/[0.03] px-5 py-5 shadow-premium backdrop-blur-sm transition-colors duration-500 hover:border-gold-500/30"
                      >
                        <span className="font-display text-xl font-bold uppercase tracking-[0.14em] text-white md:text-2xl">
                          {name}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Core Values / Standards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-40 grid gap-10 md:grid-cols-2"
        >
          <motion.div variants={itemVariants} className="group relative rounded-3xl border border-white/5 bg-forest-900/30 p-12 transition-all duration-700 hover:border-gold-500/30 hover:bg-forest-900/50 shadow-premium">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 transition-transform duration-700 group-hover:scale-110 shadow-glow">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="mb-5 font-display text-4xl font-bold text-white uppercase tracking-tight">Fair Chase Hunting</h3>
            <p className="text-lg leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors">
              The hunt should still feel like a real hunt: earned, physical, respectful of the animal, and true to the rugged New Zealand backcountry. We believe in the ethics of the pursuit.
            </p>
            <div className="absolute right-10 top-10 opacity-0 transition-all duration-700 group-hover:opacity-10 group-hover:translate-x-2">
               <span className="font-display text-8xl font-bold text-gold-400">01</span>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="group relative rounded-3xl border border-white/5 bg-forest-900/30 p-12 transition-all duration-700 hover:border-gold-500/30 hover:bg-forest-900/50 shadow-premium">
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-400 transition-transform duration-700 group-hover:scale-110 shadow-glow">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="mb-5 font-display text-4xl font-bold text-white uppercase tracking-tight">Ethical Standards</h3>
            <p className="text-lg leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors">
              Shot selection, recovery, camp conduct, and deep respect for the land are our baseline. We don&apos;t just hunt; we steward the tradition for future generations.
            </p>
            <div className="absolute right-10 top-10 opacity-0 transition-all duration-700 group-hover:opacity-10 group-hover:translate-x-2">
               <span className="font-display text-8xl font-bold text-gold-400">02</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <div className="relative">
          <div className="mb-16 flex flex-col gap-8 lg:mb-20 xl:flex-row xl:items-end xl:justify-between">
            <div className="min-w-0 max-w-3xl">
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold-400 font-bold">
                 <TextReveal>Operational Experts</TextReveal>
              </p>
              <h3 className="mt-3 font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl uppercase tracking-tighter">
                <TextReveal delay={0.2}>Meet The Team</TextReveal>
              </h3>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="w-full max-w-2xl rounded-[2rem] border border-white/10 bg-black/15 p-6 shadow-premium backdrop-blur-xl xl:max-w-xl"
            >
              <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
                <div className="max-w-md">
                  <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/60">Team Brief</p>
                  <p className="mt-4 text-sm leading-7 text-gray-300">
                    A small operating team shaped around planning discipline, field judgement, and genuine New Zealand hunt execution.
                  </p>
                </div>
                <div className="flex items-center gap-4 border-t border-white/10 pt-4 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/50">Profiles</p>
                    <p className="mt-2 text-xl font-semibold text-white">3</p>
                  </div>
                  <div className="h-10 w-px bg-white/10" />
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/50">Combined</p>
                    <p className="mt-2 text-xl font-semibold text-white">90+ Years</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid gap-8 xl:grid-cols-3"
          >
            {founders.map((founder, index) => {
              const { firstName, lastName, initials } = splitFounderName(founder.name);

              return (
              <motion.div 
                key={founder.name} 
                variants={itemVariants}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(9,14,13,0.84),rgba(5,8,8,0.96))] shadow-premium transition-all duration-700 hover:-translate-y-1 hover:border-gold-500/35"
              >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(200,169,110,0.08),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.02),transparent_24%)] opacity-70" />

                <div className="relative flex h-full flex-col p-8 md:p-9">
                  <div className="mb-8 flex items-start justify-between gap-4">
                    <div className="rounded-full border border-white/10 bg-white/[0.03] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.36em] text-gold-400 shadow-premium">
                      {founder.role}
                    </div>
                    <span className="font-display text-4xl font-bold tracking-tight text-white/[0.08]">
                      0{index + 1}
                    </span>
                  </div>

                  <div className="relative overflow-hidden rounded-[2.15rem] border border-white/10 bg-black/18 p-7 shadow-premium">
                    {founder.image ? (
                      <div className="absolute inset-0">
                        <Image
                          src={getBlobAssetUrl(founder.image)}
                          alt={founder.name}
                          fill
                          sizes="(max-width: 1279px) 100vw, 33vw"
                          className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                      </div>
                    ) : null}

                    <div className="pointer-events-none absolute right-6 top-5 font-display text-[5rem] font-bold uppercase leading-none tracking-[0.12em] text-white/[0.05] md:text-[6rem]">
                      {initials}
                    </div>

                    <div className="relative z-10">
                      <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/60">
                        {founder.origin}
                      </p>

                      <div className="mt-7 flex h-16 w-16 items-center justify-center rounded-[1.4rem] border border-gold-400/18 bg-gold-400/[0.06] font-display text-xl font-bold uppercase tracking-[0.24em] text-gold-300 shadow-glow-gold">
                        {initials}
                      </div>

                      <h4 className="mt-7 font-display text-4xl font-bold uppercase leading-[0.9] tracking-tight text-white md:text-[3.3rem]">
                        <span className="block">{firstName}</span>
                        <span className="block text-gold-50">{lastName}</span>
                      </h4>
                    </div>
                  </div>

                  <p className="mt-8 text-base leading-8 text-gray-300">
                    {founder.description}
                  </p>

                  <div className="mt-auto pt-8">
                    <div className="grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-2">
                      <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/55">Experience</p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/90">{founder.experience}</p>
                      </div>
                      <div className="rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-4 py-4">
                        <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/55">Role</p>
                        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.08em] text-white/90">{founder.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )})}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
