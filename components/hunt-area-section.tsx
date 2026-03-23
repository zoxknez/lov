'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { MapPin, Compass, Mountain, Wind } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

export default function HuntAreaSection() {


  const regions = [
    {
      name: 'North Island | Central Plateau',
      location: 'Taupo, Turangi, and Kaimanawa country',
      description:
        'Native bush, river valleys, and rugged hill country. This is the heart of the Kaimanawa sika story and a strong region for red deer, fallow deer, and selected rusa programs.',
      species: ['Red Deer', 'Sika Deer', 'Fallow Deer', 'Rusa Deer'],
      terrain: ['Dense native bush', 'River valleys', 'Hill country'],
      accessNote: 'Main lodge base in Ohakune, with daily logistics built around the specific hunt block.',
      image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua.jpg',
    },
    {
      name: 'South Island | Southern Alps',
      location: 'Alpine basins and remote backcountry',
      description:
        'Steep basins, exposed faces, and remote terrain for Himalayan tahr, chamois, and selected mountain red deer programs.',
      species: ['Himalayan Tahr', 'Chamois', 'Red Deer'],
      terrain: ['High alpine basins', 'Steep river valleys', 'Rocky faces'],
      accessNote: 'Helicopter support is utilized where terrain and weather make it the right tool for the hunt.',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    },
  ];

  const seasonWindows = [
    { window: 'Mar - Apr', title: 'Red Deer Roar', description: 'The classic autumn window for mature red stags.' },
    { window: 'Mar - May', title: 'Sika Rut', description: 'Prime sika period tied closely to the Kaimanawa story.' },
    { window: 'Apr - May', title: 'Fallow Rut', description: 'Best timing for selective fallow trophy hunting.' },
    { window: 'May - Jun', title: 'Chamois Focus', description: 'A favoured buck period in alpine country.' },
    { window: 'May - Jul', title: 'Tahr Rut', description: 'The main trophy period for bull tahr.' },
    { window: 'Jul - Aug', title: 'Rusa Program', description: 'A dedicated late-winter North Island option.' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section id="hunt" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Background Decorative Accent */}
      <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">
             <TextReveal>The Territory</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-9xl tracking-tighter">
             <TextReveal delay={0.2}>Where You Hunt</TextReveal>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" 
          />
          <p className="mx-auto mt-10 max-w-3xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl italic">
             <TextReveal delay={0.4}>
                Our programs are built around the right country first, matched to the species, the seasonal window, and the pace your group wants in the field.
             </TextReveal>
          </p>
        </div>

        {/* Regions Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-40 grid gap-12 md:grid-cols-2"
        >
          {regions.map((region) => (
            <motion.div
              key={region.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-forest-900/20 shadow-premium transition-all duration-700 hover:border-gold-500/40"
            >
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={getBlobAssetUrl(region.image)}
                  alt={region.name}
                  fill
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-90" />
                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="flex items-center gap-3 text-gold-400 mb-3">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{region.location}</span>
                  </div>
                  <h4 className="font-display text-4xl font-bold text-white tracking-tight uppercase">{region.name}</h4>
                </div>
              </div>

              <div className="p-10">
                <p className="mb-10 font-sans text-lg leading-relaxed text-gray-400 min-h-[4rem] group-hover:text-gray-200 transition-colors">
                  {region.description}
                </p>

                <div className="grid grid-cols-2 gap-10 border-t border-white/5 pt-10">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 opacity-50 mb-6">Core Species</p>
                    <div className="flex flex-wrap gap-2 gap-y-3">
                      {region.species.map((sp) => (
                        <span key={sp} className="text-xs font-bold text-white uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full border border-white/10">
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400 opacity-50 mb-6">Prime Terrain</p>
                    <div className="flex flex-wrap gap-2 gap-y-3">
                      {region.terrain.map((t) => (
                        <span key={t} className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                          {t} <span className="text-gold-500/40 ml-1">•</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-4 rounded-2xl bg-gold-400/5 p-5 border border-gold-400/10 shadow-glow-gold transition-colors group-hover:bg-gold-400/10">
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-400/20">
                     <Compass className="h-5 w-5 text-gold-400" />
                  </div>
                  <p className="text-xs leading-relaxed text-gold-200/90 font-medium">
                    <span className="font-bold text-gold-400 uppercase tracking-widest mr-2">Access:</span> {region.accessNote}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Access Philosophy */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-40 grid gap-10 md:grid-cols-3"
        >
           {[
             { icon: Wind, title: 'Versatile Access', desc: 'Foot travel, 4WD exploration, and helicopter support where the hunt requires it.' },
             { icon: Mountain, title: 'Diverse Country', desc: 'Integrated programs across both private and public land based on species and season.' },
             { icon: Compass, title: 'Remote Camps', desc: 'Authentic alpine experiences when the hunt pushes beyond our comfortable lodge base.' }
           ].map((item, i) => (
            <motion.div key={i} variants={itemVariants} className="flex flex-col items-center text-center p-8 rounded-3xl border border-white/5 bg-forest-900/10 hover:border-gold-400/20 transition-all group">
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-forest-900 text-gold-400 border border-white/5 shadow-glow transition-transform group-hover:scale-110">
                <item.icon className="h-10 w-10" />
              </div>
              <h5 className="font-display text-2xl font-bold text-white mb-4 uppercase tracking-tight">{item.title}</h5>
              <p className="text-sm text-gray-400 leading-relaxed font-sans">{item.desc}</p>
            </motion.div>
           ))}
        </motion.div>

        {/* Season Windows */}
        <div className="relative">
          <div className="mb-16 flex flex-col items-center justify-between gap-8 md:flex-row">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400">
                 <TextReveal>Seasonal Rhythms</TextReveal>
              </p>
              <h3 className="mt-3 font-display text-5xl font-bold text-white md:text-6xl uppercase tracking-tighter">
                <TextReveal delay={0.2}>Season Windows</TextReveal>
              </h3>
            </div>
            <p className="max-w-md text-sm text-gray-500 text-right font-medium italic">
              The main travel window runs from March through July, with dedicated rusa programs usually sitting later in winter.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {seasonWindows.map((item) => (
              <motion.div 
                key={item.title} 
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-forest-900/20 p-10 transition-all duration-700 hover:border-gold-500/30 hover:bg-forest-900/40 shadow-premium"
              >
                <div className="flex justify-between items-start mb-8">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/80">{item.window}</p>
                  <div className="h-px w-8 bg-gold-400/20 group-hover:w-full transition-all duration-700" />
                </div>
                <h4 className="font-display text-3xl font-bold text-white group-hover:text-gold-200 transition-colors uppercase tracking-tight">{item.title}</h4>
                <p className="mt-5 text-sm leading-relaxed text-gray-400 group-hover:text-gray-200 transition-colors font-sans">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
