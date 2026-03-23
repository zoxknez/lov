'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { ShieldCheck, Award } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

export default function StorySection() {


  const founders = [
    {
      name: 'Alex Sipka',
      role: 'Co-founder',
      origin: 'Serbia',
      experience: '40 years',
      description: 'Veteran hunter whose decades in the field shaped the standards and pace behind the Kaimanawa program.',
      image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
    },
    {
      name: 'Artem Prikazov',
      role: 'Co-founder',
      origin: 'Russia',
      experience: '15 years',
      description: 'Internationally travelled hunter focused on the quality of New Zealand game and the experience around it.',
      image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
    },
    {
      name: 'Vuk Mijatovic',
      role: 'Guide',
      origin: 'New Zealand field operations',
      experience: '35+ years',
      description: 'Lead field guide with deep knowledge of New Zealand terrain, animal behaviour, and hunt execution.',
      image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
    },
  ];

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
    <section id="story" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
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
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-40"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest-900/40 p-1 font-sans shadow-premium backdrop-blur-xl">
             <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 via-transparent to-forest-600/10" />
             <div className="relative flex flex-col items-center justify-center p-10 md:p-20">
                <motion.span 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="mb-8 inline-block rounded-full bg-gold-500/10 px-6 py-2 text-[10px] font-bold uppercase tracking-widest text-gold-200 border border-gold-500/20"
                >
                  Established 2025
                </motion.span>
                <div className="max-w-4xl text-center text-xl font-light leading-relaxed text-gray-200 md:text-4xl">
                  <TextReveal delay={0.2}>
                    &quot;Kaimanawa Trophy Safaris was born from a shared passion for the New Zealand wilderness. Our aim is simple: to create a properly hosted hunting program that feels authentic in the field and meticulously polished in the planning.&quot;
                  </TextReveal>
                </div>
                
                <div className="mt-14 flex flex-wrap justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/40">
                  {['Artem Prikazov', 'Alex Sipka', 'Vuk Mijatovic'].map((name) => (
                    <div key={name} className="flex items-center gap-3">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-400/50" />
                      <span>{name}</span>
                    </div>
                  ))}
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
          <div className="mb-20 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-gold-400 font-bold">
                 <TextReveal>Operational Experts</TextReveal>
              </p>
              <h3 className="mt-3 font-display text-5xl font-bold text-white md:text-6xl lg:text-7xl uppercase tracking-tighter">
                <TextReveal delay={0.2}>Meet The Team</TextReveal>
              </h3>
            </div>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '40%' }}
              className="h-px bg-gradient-to-r from-gold-500/40 to-transparent hidden md:block" 
            />
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid gap-10 md:grid-cols-3"
          >
            {founders.map((founder) => (
              <motion.div 
                key={founder.name} 
                variants={itemVariants}
                className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-forest-900/20 transition-all duration-700 hover:border-gold-500/40 shadow-premium cursor-pointer"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={getBlobAssetUrl(founder.image)}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-90" />
                  <div className="absolute inset-0 bg-gold-900/10 opacity-0 transition-opacity duration-700 group-hover:opacity-40" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-10 transition-transform duration-700 group-hover:-translate-y-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 mb-2">
                       {founder.role}
                    </p>
                    <h4 className="font-display text-4xl font-bold text-white tracking-tight">{founder.name}</h4>
                    <p className="mt-2 text-xs font-bold text-gold-500/60 uppercase tracking-widest">{founder.experience} experience</p>
                  </div>
                </div>
                
                <div className="relative p-10 pt-8">
                  <div className="mb-6 h-px w-16 bg-gold-500/40 transition-all duration-700 group-hover:w-full" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400 opacity-50 mb-4">{founder.origin}</p>
                  <p className="text-base leading-relaxed text-gray-400 transition-colors duration-500 group-hover:text-gray-200">
                    {founder.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
