'use client';

import { motion } from 'framer-motion';
import { Award, Crosshair, ShieldCheck, User, Zap, Activity, Info } from 'lucide-react';
import TextReveal from '@/components/text-reveal';
import TeamMemberModal from './team-member-modal';
import { useState } from 'react';

const founders = [
  { 
    name: 'Alex Sipka', 
    role: 'Co-Founder', 
    origin: 'Serbia', 
    exp: '40 Yrs', 
    initials: 'AS',
    expertise: 'International Heritage / Ethics',
    bio: 'With over 40 years of experience in the international hunting industry, Alex is a veteran who understands the importance of heritage and ethics. He has guided hundreds of successful hunts across the globe and brought his expertise to the pristine landscapes of New Zealand.',
    images: ['/media/founders/alex-1.jpg', '/media/founders/alex-2.jpg']
  },
  { 
    name: 'Artem Prikazov', 
    role: 'Co-Founder', 
    origin: 'Russia', 
    exp: '15 Yrs', 
    initials: 'AP',
    expertise: 'Technical Precision / Logistics',
    bio: 'Artem brings 15 years of dedicated hunting experience, combining technical precision with a deep passion for the wild. As a co-founder, he ensures that every detail of the safari experience meets the highest standards of luxury and authenticity.',
    images: ['/media/founders/artem-1.jpg', '/media/founders/artem-2.jpg']
  },
  { 
    name: 'Vuk Mijatovic', 
    role: 'Lead Guide', 
    origin: 'NZ Field Ops', 
    exp: '35+ Yrs', 
    initials: 'VM',
    expertise: 'High Alpine / Field Ops',
    bio: 'Our Lead Guide, Vuk, has spent 35+ years mastering the rugged terrain of New Zealand. His operational expertise and tactical knowledge of the field make him an invaluable asset for hunters seeking the ultimate fair chase challenge.',
    images: ['/media/founders/vuk-1.jpg', '/media/founders/vuk-2.jpg']
  },
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
  const [selectedFounder, setSelectedFounder] = useState<typeof founders[0] | null>(null);

  return (
    <section id="story" className="relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12 flex flex-col items-center text-center md:mb-20">
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
            className="mx-auto mt-8 flex items-center gap-3"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/50 to-transparent" />
          </motion.div>
        </div>

        {/* Founding Statement / Mission Preface */}
        <div className="mb-16 flex justify-center">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="relative max-w-4xl overflow-hidden rounded-[2rem] border border-white/5 bg-forest-900/10 p-8 text-center sm:p-12 md:rounded-[2.5rem]"
           >
              <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-gold-400/20 to-transparent" />
              <p className="mb-6 text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/40">Founding Mission</p>
              <h3 className="font-display text-2xl italic leading-tight text-white sm:text-3xl md:text-4xl">
                &ldquo;Founded to introduce international hunters to the quality of New Zealand trophies and the raw majesty of its wild landscapes.&rdquo;
              </h3>
              <div className="mt-8 flex items-center justify-center gap-4 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-500">
                 <span>Est. 2025</span>
                 <div className="h-1 w-1 rounded-full bg-gold-400/30" />
                 <span>90+ Combined Years</span>
              </div>
           </motion.div>
        </div>

        {/* Specialist Showcase Grid */}
        <div className="mb-20">
           <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-3">
                 <User className="h-4 w-4 text-gold-400/40" />
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/60 transition-colors">Team Specialists</p>
              </div>
              <div className="flex items-center gap-2">
                 <div className="h-1 w-1 animate-pulse rounded-full bg-gold-400" />
                 <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-gray-500">Click for Detailed Bio</p>
              </div>
           </div>

           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {founders.map((founder, index) => (
                <motion.div
                  key={founder.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  whileHover={{ y: -8, transition: { duration: 0.4, ease: "easeOut" } }}
                  onClick={() => setSelectedFounder(founder)}
                  className="group relative cursor-pointer overflow-hidden rounded-[2.2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium transition-all duration-500 hover:border-gold-500/40 hover:bg-forest-900/40"
                >
                  {/* Card Background Decoration */}
                  <div className="absolute -right-8 -top-8 opacity-5">
                     <Crosshair className="h-32 w-32 rotate-12 text-white" />
                  </div>
                  
                  {/* Header: Initial & Badge */}
                  <div className="mb-8 flex items-start justify-between">
                     <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-400/20 bg-gold-400/5 font-display text-2xl font-bold uppercase tracking-widest text-gold-300 shadow-glow transition-all group-hover:border-gold-400/50 group-hover:bg-gold-400/15">
                        {founder.initials}
                        <div className="absolute -right-1.5 -top-1.5 h-3 w-3 rounded-full bg-gold-400/60 animate-pulse" />
                     </div>
                     <div className="flex flex-col items-end gap-1">
                        <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 transition-colors group-hover:text-gold-200">
                           {founder.exp} Experience
                        </span>
                        <div className="flex items-center gap-1.5 opacity-40">
                           <Activity className="h-2.5 w-2.5" />
                           <span className="text-[7px] font-bold uppercase tracking-widest">Active</span>
                        </div>
                     </div>
                  </div>

                  {/* Identification */}
                  <div className="mb-6">
                     <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white group-hover:text-gold-100 transition-colors">
                        {founder.name}
                     </h3>
                     <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.25em] text-gold-400/60">
                        {founder.role} // {founder.origin}
                     </p>
                     <div className="mt-4 h-0.5 w-12 bg-gold-500/20 transition-all group-hover:w-20 group-hover:bg-gold-500/40" />
                  </div>

                  {/* Summary Preview */}
                  <div className="mb-8">
                     <p className="line-clamp-3 text-[13px] leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                        {founder.bio}
                     </p>
                  </div>

                  {/* Footer Stats & View */}
                  <div className="flex items-center justify-between border-t border-white/5 pt-6">
                     <div className="flex flex-col gap-0.5">
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20">Specialization</span>
                        <span className="text-[10px] font-bold uppercase tracking-tight text-gold-400/60">{founder.expertise}</span>
                     </div>
                     <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all group-hover:bg-gold-500 group-hover:text-black">
                        <Zap className="h-3.5 w-3.5" />
                     </div>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Operational Values Footer */}
        <div className="grid gap-4 sm:grid-cols-3">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="group flex items-center gap-6 rounded-[1.8rem] border border-white/5 bg-forest-900/10 p-6 shadow-premium transition-all hover:bg-gold-500/5 hover:border-gold-500/20"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-display font-bold uppercase tracking-widest text-white mb-0.5">{value.label}</h4>
                  <p className="text-[9px] font-medium leading-relaxed text-gray-500 uppercase tracking-widest">{value.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <TeamMemberModal 
        member={selectedFounder} 
        onClose={() => setSelectedFounder(null)} 
      />
    </section>
  );
}
