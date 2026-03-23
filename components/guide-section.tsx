'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Quote, Target, Shield, Award, Mountain, Trophy } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

export default function GuideSection() {
  const guide: {
    name: string;
    title: string;
    country: string;
    experience: string;
    bio: string;
    image: string | null;
    specialties: string[];
    philosophy: string;
    notableAchievements: string[];
    closing: string;
  } = {
    name: 'Vuk Mijatovic',
    title: 'Professional Hunting Guide',
    country: 'New Zealand Field Operations',
    experience: '35+ years',
    bio: 'With more than 35 years in the field, Vuk Mijatovic brings deep knowledge of New Zealand terrain, animal behaviour, and the patient, fair-chase pace required for successful trophy hunting.',
    image: null,
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

  return (
    <section id="guide" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans experience-editorial">
      {/* Editorial Shadow Layer */}
      <div className="absolute inset-0 bg-black/28 backdrop-blur-[1px] pointer-events-none" />
      {/* Background Cinematic Accents */}
      <div className="absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-gold-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 h-[600px] w-[600px] rounded-full bg-forest-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Cinematic Section Header */}
        <div className="mb-32 flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-gold-400 mb-6 flex items-center gap-4">
               <span className="h-px w-10 bg-gold-400/30" />
               <TextReveal>Operational Leadership</TextReveal>
            </p>
            <h2 className="font-display text-6xl font-bold uppercase tracking-tighter text-white md:text-8xl lg:text-9xl leading-none">
               <TextReveal delay={0.2}>Lead Guide</TextReveal>
            </h2>
          </div>
          <div className="hidden lg:block h-px flex-1 bg-gradient-to-r from-gold-500/20 to-transparent mx-20 mb-8" />
        </div>

        {/* Lead Guide Profile - Asymmetrical Hero */}
        <div className="grid gap-20 lg:grid-cols-12 lg:items-start">
          
          {/* Visual Column (Asymmetrical Power) */}
          <div className="relative lg:col-span-5">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full overflow-hidden rounded-[3.5rem] border border-white/5 bg-forest-900/10 shadow-premium group"
            >
              {/* Personal Demo Placeholder / Image Handler */}
              {!guide.image ? (
                <div className="flex h-full w-full items-center justify-center bg-forest-950">
                   <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(163,126,67,0.15),transparent)]" />
                   <div className="relative flex flex-col items-center">
                      <div className="mb-6 h-32 w-32 rounded-full border border-gold-400/20 bg-gold-400/5 flex items-center justify-center backdrop-blur-md group-hover:scale-110 group-hover:border-gold-400/40 transition-all duration-1000">
                         <span className="font-display text-xs font-bold tracking-[0.5em] text-gold-400 opacity-60 group-hover:opacity-100 transition-opacity">LEAD GUIDE</span>
                      </div>
                      <h4 className="font-display text-6xl font-bold tracking-[0.3em] text-white/5 uppercase select-none group-hover:text-gold-400/10 transition-colors duration-1000">DEMO</h4>
                   </div>
                </div>
              ) : (
                <Image 
                  src={getBlobAssetUrl(guide.image)} 
                  alt={guide.name} 
                  fill 
                  className="object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" 
                />
              )}
              
              {/* Artistic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/90 via-forest-950/20 to-transparent" />
              <div className="absolute inset-0 bg-gold-400/5 opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
              
              {/* Perspective Experience Card */}
              <div className="absolute bottom-10 left-10 right-10">
                <div className="overflow-hidden rounded-3xl border border-white/10 bg-forest-900/60 p-8 backdrop-blur-2xl shadow-glow">
                   <div className="flex items-center justify-between mb-4">
                      <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400">Field Tenure</p>
                      <Target className="h-4 w-4 text-gold-400/40" />
                   </div>
                   <div className="flex items-end gap-2">
                     <span className="font-display text-5xl font-bold text-white leading-none tracking-tighter">{guide.experience.split('+')[0]}</span>
                     <span className="mb-1 text-xl font-bold text-gold-500 uppercase tracking-widest">{guide.experience.split('+')[1] || '+'} Years</span>
                   </div>
                   <div className="mt-6 h-1 w-full bg-white/5 overflow-hidden rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '85%' }}
                        transition={{ duration: 1.5, delay: 0.5 }}
                        className="h-full bg-gradient-to-r from-gold-600 to-gold-400 shadow-glow-gold" 
                      />
                   </div>
                </div>
              </div>
            </motion.div>
            
            {/* Background Graphic Element */}
            <div className="absolute -top-10 -left-10 -z-10 h-40 w-40 rounded-full bg-gold-400/5 blur-3xl" />
          </div>

          {/* Biographical Column */}
          <div className="lg:col-span-7 lg:pl-10">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              <div className="mb-12">
                <div className="flex items-center gap-3 text-gold-500/60 mb-4">
                   <Shield className="h-4 w-4" />
                   <span className="text-[11px] font-bold uppercase tracking-[0.4em]">{guide.country}</span>
                </div>
                
                {/* Personal "Signature" Presentation */}
                <div className="relative">
                   <h3 className="font-display text-7xl font-bold text-white leading-none tracking-tighter md:text-8xl">
                     {guide.name.split(' ')[0]} <span className="text-gold-400/90">{guide.name.split(' ')[1]}</span>
                   </h3>
                   <div className="mt-6 flex items-center gap-6">
                      <p className="text-xl text-gray-400 font-sans italic tracking-wide">{guide.title}</p>
                      <div className="h-px flex-1 bg-white/5" />
                   </div>
                </div>
              </div>

              <p className="text-xl leading-relaxed text-gray-300 mb-14 font-sans max-w-2xl border-l border-gold-400/20 pl-10">
                {guide.bio}
              </p>

              {/* Specialties - Elite Icon Grid */}
              <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
                <div className="space-y-6">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/40 mb-8">Operational Focus</p>
                   {guide.specialties.slice(0, 3).map((specialty, idx) => (
                    <div key={idx} className="flex items-center gap-5 group/spec">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gold-400 transition-all group-hover/spec:border-gold-400/40 group-hover/spec:bg-gold-400/10">
                         <Award className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover/spec:text-white transition-colors">{specialty}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-6">
                   <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/40 mb-8">Technical Mastery</p>
                   {guide.specialties.slice(3).map((specialty, idx) => (
                    <div key={idx} className="flex items-center gap-5 group/spec">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gold-400 transition-all group-hover/spec:border-gold-400/40 group-hover/spec:bg-gold-400/10">
                         <Mountain className="h-4 w-4" />
                      </div>
                      <span className="text-sm font-bold uppercase tracking-widest text-gray-400 group-hover/spec:text-white transition-colors">{specialty}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Premium Philosophy Block */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="mt-20 relative p-12 rounded-[2.5rem] bg-gradient-to-br from-gold-500/5 to-transparent border border-gold-500/10 shadow-premium overflow-hidden"
              >
                 <Quote className="absolute -top-4 -right-4 h-24 w-24 text-gold-400/5 -rotate-12" />
                 <p className="relative z-10 text-xl font-medium leading-relaxed italic text-gray-200 font-sans">
                   &quot;{guide.philosophy}&quot;
                 </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Notable Results - Elite Bento Hall of Fame */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="relative mt-48 pt-24 border-t border-white/5"
        >
          {/* Section Background Watermark */}
          <div className="absolute top-0 right-0 opacity-5 -translate-y-1/2 pointer-events-none group/hall">
             <Trophy className="h-[400px] w-[400px] text-gold-400 -rotate-12 transition-transform duration-[4s] group-hover/hall:rotate-0" />
          </div>

          <div className="mb-20 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-gold-500/40 mb-3 ml-1">Archive of Excellence</p>
              <h3 className="font-display text-6xl font-bold text-white md:text-7xl uppercase tracking-tighter leading-none">Notable Results</h3>
            </div>
            <div className="hidden lg:block h-px w-32 bg-gold-400/20 mb-3" />
          </div>

          <div className="grid gap-6 md:grid-cols-4 lg:grid-cols-6 mb-24">
            {guide.notableAchievements.map((achievement, idx) => (
              <motion.div 
                key={idx} 
                whileHover={{ y: -5 }}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-forest-900/10 p-10 transition-all duration-700 hover:border-gold-500/40 shadow-premium ${
                  idx === 0 ? 'md:col-span-2 lg:col-span-4 h-64' :
                  idx === 1 ? 'md:col-span-2 lg:col-span-2 h-64' :
                  idx === 2 ? 'md:col-span-2 lg:col-span-3 h-56' :
                  'md:col-span-2 lg:col-span-3 h-56'
                }`}
              >
                {/* Reactive Shine Layer */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(163,126,67,0)_30%,rgba(163,126,67,0.1)_45%,rgba(163,126,67,0.2)_50%,rgba(163,126,67,0.1)_55%,rgba(163,126,67,0)_70%)] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-opacity duration-1000" />
                
                <div className="relative z-10 flex flex-col justify-between h-full">
                   <div className="flex items-center justify-between">
                      <Target className="h-5 w-5 text-gold-400/40 transition-transform group-hover:scale-125 group-hover:text-gold-400" />
                      <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400/20">Certified</span>
                   </div>
                   
                   <div>
                      <div className="mb-4 h-px w-8 bg-gold-500/40 group-hover:w-full transition-all duration-700" />
                      <p className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl group-hover:text-gold-200 transition-colors uppercase">
                        {achievement}
                      </p>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Closing Elite Signature Statement */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="mt-32 "
        >
          <div className="relative mx-auto max-w-5xl rounded-[3.5rem] border border-white/5 bg-forest-900/20 p-2 font-sans shadow-premium backdrop-blur-3xl">
             <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-forest-500/5 opacity-50" />
             <div className="relative px-12 py-16 flex flex-col items-center md:px-24 md:py-24 text-center overflow-hidden">
                {/* Stylized Quote Indicator */}
                <div className="mb-12 flex items-center gap-6 opacity-40">
                   <div className="h-px w-16 bg-gold-400/40" />
                   <Quote className="h-10 w-10 text-gold-400" />
                   <div className="h-px w-16 bg-gold-400/40" />
                </div>
                
                <p className="text-xl font-display italic text-gray-200 leading-relaxed md:text-3xl lg:text-4xl tracking-tight max-w-3xl drop-shadow-2xl">
                  &quot;{guide.closing}&quot;
                </p>
                
                {/* Branding Signature Line */}
                <div className="mt-16 text-[10px] font-bold uppercase tracking-[0.6em] text-gold-500/60">
                   KAIMANAWA PRECISION STANDARDS
                </div>
                
                {/* Background Decorative Element */}
                <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gold-400/5 blur-3xl" />
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
