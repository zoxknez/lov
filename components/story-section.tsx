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
      role: 'Co-Founder',
      origin: 'Serbia',
      experience: '40 Years',
      description: 'Veteran hunter whose decades in the field shaped the standards and pace behind the Kaimanawa program.',
      image: 'PERSON_DEMO',
    },
    {
      name: 'Artem Prikazov',
      role: 'Co-Founder',
      origin: 'Russia',
      experience: '15 Years',
      description: 'Internationally travelled hunter focused on the quality of New Zealand game and the experience around it.',
      image: 'PERSON_DEMO',
    },
    {
      name: 'Vuk Mijatovic',
      role: 'Lead Guide',
      origin: 'New Zealand Field Ops',
      experience: '35+ Years',
      description: 'Lead field guide with deep knowledge of New Zealand terrain, animal behaviour, and hunt execution.',
      image: 'PERSON_DEMO',
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
    <section id="story" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans">
      {/* Editorial Depth Layer */}
      <div className="absolute inset-0 bg-forest-950/20 backdrop-blur-[2px] pointer-events-none" />
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
          <div className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-forest-900/20 p-px shadow-2xl backdrop-blur-xl group">
             {/* Dynamic border glow */}
             <div className="absolute inset-x-0 -top-px h-px w-full bg-gradient-to-r from-transparent via-gold-500/50 to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
             
             <div className="relative overflow-hidden rounded-[3rem] bg-forest-950/40 px-10 py-20 md:px-20 md:py-32">
                {/* Background Watermark */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] grayscale pointer-events-none w-[120%] h-[120%] flex items-center justify-center">
                   <Image 
                     src={getBlobAssetUrl('/media/logo.png')} 
                     alt="" 
                     width={1200} 
                     height={1200}
                     className="object-contain"
                   />
                </div>

                <div className="relative z-10 flex flex-col items-center justify-center">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     className="mb-12 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/30 bg-gold-500/10 text-gold-400 shadow-glow"
                   >
                      <Award className="h-8 w-8" />
                   </motion.div>

                   <div className="max-w-4xl text-center">
                      <h3 className="mb-12 font-display text-2xl font-light italic leading-relaxed text-gray-100 md:text-5xl lg:text-6xl">
                        <TextReveal delay={0.2}>
                          &quot;Kaimanawa Trophy Safaris was born from a shared passion for the New Zealand wilderness. Our aim is simple: to create a properly hosted hunting program that feels authentic in the field and meticulously polished in the planning.&quot;
                        </TextReveal>
                      </h3>
                      
                      {/* Founders Signature Area */}
                      <div className="mt-16 flex flex-col items-center">
                         <div className="mb-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
                         <p className="text-[12px] font-bold uppercase tracking-[0.5em] text-gold-500/60 mb-8">The Founders</p>
                         
                         <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
                            {['Artem Prikazov', 'Alex Sipka', 'Vuk Mijatovic'].map((name, i) => (
                              <motion.div 
                                key={name}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="flex flex-col items-center"
                              >
                                <span className="text-lg font-display font-bold uppercase tracking-[0.2em] text-white md:text-2xl hover:text-gold-400 transition-colors duration-500">
                                   {name}
                                </span>
                                <div className="mt-2 h-0.5 w-0 bg-gold-500 transition-all duration-500 group-hover:w-full" />
                              </motion.div>
                            ))}
                         </div>
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
            className="grid gap-12 md:grid-cols-3"
          >
            {founders.map((founder) => (
              <motion.div 
                key={founder.name} 
                variants={itemVariants}
                className="group relative flex flex-col overflow-hidden rounded-[3.1rem] border border-white/5 bg-forest-900/10 transition-all duration-700 hover:border-gold-500/40 shadow-premium"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                   {/* Personal Demo Placeholder / Image Handler */}
                   {founder.image === 'PERSON_DEMO' ? (
                     <div className="flex h-full w-full items-center justify-center bg-forest-950">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(163,126,67,0.12),transparent)]" />
                        <div className="relative flex flex-col items-center">
                           <div className="mb-4 h-28 w-28 rounded-full border border-gold-400/20 bg-gold-400/5 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-gold-400/40 transition-all duration-1000">
                              <span className="font-display text-[10px] font-bold tracking-[0.5em] text-gold-400 opacity-60 group-hover:opacity-100 transition-opacity">PERSON</span>
                           </div>
                           <h4 className="font-display text-5xl font-bold tracking-[0.3em] text-white/5 uppercase select-none group-hover:text-gold-400/10 transition-colors duration-1000">DEMO</h4>
                        </div>
                     </div>
                   ) : (
                     <Image
                       src={getBlobAssetUrl(founder.image)}
                       alt={founder.name}
                       fill
                       className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110"
                     />
                   )}
                  
                  {/* Cinematic Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-95 transition-opacity duration-700 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gold-400/5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
                  
                  {/* Role Badge */}
                  <div className="absolute top-10 left-10">
                     <div className="rounded-full border border-white/10 bg-forest-950/40 backdrop-blur-2xl px-6 py-2.5 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-400 shadow-premium">
                        {founder.role}
                     </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-12">
                    <div className="transform transition-transform duration-700 group-hover:-translate-y-5">
                       <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold-500/60 mb-3">{founder.origin}</p>
                       <h4 className="font-display text-5xl font-bold text-white tracking-tight md:text-6xl uppercase leading-none drop-shadow-2xl">{founder.name}</h4>
                       <div className="mt-10 flex items-center gap-5">
                          <div className="h-px w-10 bg-gold-500/50 transition-all duration-700 group-hover:w-20" />
                          <p className="text-[11px] font-bold text-gold-400 uppercase tracking-[0.5em] italic">{founder.experience} Mastery</p>
                       </div>
                    </div>
                  </div>
                </div>
                
                {/* Character Detail Reveal (Elite Expansion) */}
                <div className="relative h-0 overflow-hidden transition-all duration-700 ease-[0.16,1,0.3,1] group-hover:h-44">
                   <div className="px-12 pb-12">
                      <div className="mb-8 h-px w-full bg-white/5" />
                      <p className="font-sans text-base leading-relaxed text-gray-400 transition-colors group-hover:text-gray-200">
                        {founder.description}
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
