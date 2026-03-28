'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Bed, Coffee, Flame, MapPin, Users, Utensils, Wifi, Wind, Play, Compass, ExternalLink, Activity, X, ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Zap, Locate } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';
import MagneticButton from '@/components/magnetic-button';

const lodges = [
  {
    id: 'ohakune',
    type: 'Primary Base',
    typeColor: 'text-gold-300 border-gold-400/30 bg-gold-400/8',
    name: 'Ohakune\nLodge Base',
    location: 'Ohakune - North Island',
    tagline: 'Central North Island hunting base',
    description:
      'A comfortable, properly hosted lodge sitting at the heart of the North Island program. Everything runs from here - meals, briefings, debrief evenings, and early starts into the Kaimanawa.',
    image: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
    gallery: [
      '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
      '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg',
      '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg',
      '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg',
    ],
    capacity: '2-4 hunters',
    specs: [
      { label: 'Elevation', value: '590m MSL' },
      { label: 'Coordination', value: 'Alpha Base' },
      { label: 'Field Sync', value: 'Real-Time' },
    ],
    features: [
      { icon: Bed, label: 'Private Bedrooms' },
      { icon: Flame, label: 'Central Heating' },
      { icon: Utensils, label: 'Chef-Prepared' },
      { icon: Coffee, label: 'Lounge Area' },
      { icon: Wifi, label: 'Starlink WiFi' },
      { icon: Users, label: 'Full Hosting' },
    ],
    highlight: 'Strategic nexus for Kaimanawa and Kaweka operations.',
  },
  {
    id: 'alpine',
    type: 'Backcountry',
    typeColor: 'text-sky-300 border-sky-400/30 bg-sky-400/8',
    name: 'Remote Alpine\nField Camps',
    location: 'Southern Alps - South Island',
    tagline: 'Deep mountain access when terrain demands it',
    description:
      'Simple, functional field camps used when the hunt calls for more reach into serious mountain country. No unnecessary comfort - but everything needed for a successful alpine mission.',
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    gallery: [
      '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg',
    ],
    capacity: '1-2 hunters',
    specs: [
      { label: 'Elevation', value: '1800m+' },
      { label: 'Coordination', value: 'Field-Ops' },
      { label: 'Field Sync', value: 'Sat-Link' },
    ],
    features: [
      { icon: Wind, label: 'Alpine Immersion' },
      { icon: Utensils, label: 'Field Catering' },
      { icon: MapPin, label: 'Weather Access' },
      { icon: Flame, label: 'Portable Heat' },
      { icon: Compass, label: 'Navigation Kit' },
      { icon: Activity, label: 'Survival Logistics' },
    ],
    highlight: 'Advanced reach into high alpine trophy country.',
  },
];

export default function AccommodationSection() {
  const [active, setActive] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lodge = lodges[active];

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const next = () => setLightboxIndex((prev) => (prev !== null ? (prev + 1) % lodge.gallery.length : null));
  const prev = () => setLightboxIndex((prev) => (prev !== null ? (prev - 1 + lodge.gallery.length) % lodge.gallery.length : null));

  return (
    <section id="stay" className="relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      {/* Immersive Background Decor */}
      <div className="pointer-events-none absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/5 blur-[160px]" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* -- Cinematic Header -- */}
        <div className="mb-14 text-center md:mb-20">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.5em] text-gold-400/60">
            <TextReveal>Operational Bases</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8.5rem]">
            <TextReveal delay={0.1}>Lodge & Camps</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 140, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mx-auto mt-8 flex items-center gap-4"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            <div className="h-2 w-2 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20 shadow-glow" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/40 to-transparent" />
          </motion.div>
        </div>

        {/* -- Enhanced Tab Switcher -- */}
        <div className="-mx-4 mb-16 overflow-x-auto px-4 no-scrollbar">
          <div className="flex w-max min-w-full gap-4 md:justify-center">
            {lodges.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                className={`group relative flex items-center gap-4 whitespace-nowrap rounded-full border px-8 py-5 text-[11px] font-black uppercase tracking-[0.4em] transition-all duration-500 ${
                  active === index
                    ? 'border-gold-400/50 bg-gold-400/15 text-gold-300 shadow-glow ring-1 ring-gold-400/20'
                    : 'border-white/10 bg-white/[0.04] text-gray-500 hover:border-gold-400/20 hover:text-white'
                }`}
              >
                {active === index && <motion.span layoutId="lodge-dot-v4" className="h-2 w-2 rounded-full bg-gold-400 shadow-glow" />}
                {item.id === 'ohakune' ? 'North Island Hub' : 'Alpine Outposts'}
              </button>
            ))}
          </div>
        </div>

        {/* -- 3-COLUMN OPERATIONAL DOSSIER -- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lodge.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
              
              {/* STUB 1: VISUAL FOUNDATION (LEFT) */}
              <div className="lg:col-span-4 flex flex-col h-full">
                <div 
                  onClick={() => setLightboxIndex(0)}
                  className="group relative flex-1 cursor-pointer overflow-hidden rounded-[3rem] border border-white/15 min-h-[500px] lg:min-h-[680px] shadow-premium"
                >
                  <Image
                    src={getBlobAssetUrl(lodge.image)}
                    alt={lodge.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[6000ms] scale-[1.05] group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  {/* Operational Badge */}
                  <div className="absolute left-1/2 top-6 -translate-x-1/2 z-20">
                    <span className={`rounded-full border px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.4em] backdrop-blur-xl shadow-premium ${lodge.typeColor}`}>
                      {lodge.type} 
                    </span>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 z-30">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gold-400" />
                        <span className="text-[11px] font-black uppercase tracking-[0.5em] text-white/50">{lodge.location}</span>
                      </div>
                      <h3 className="whitespace-pre-line font-display text-4xl font-bold uppercase leading-[0.85] text-white sm:text-5xl lg:text-7xl">
                        {lodge.name}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute right-8 bottom-10 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/15 text-white backdrop-blur-xl transition-all hover:bg-gold-500 hover:text-black hover:scale-110 shadow-glow">
                    <Maximize2 className="h-6 w-6" />
                  </div>
                </div>
              </div>

              {/* STUB 2: TECHNICAL HUB (MIDDLE) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Precision Metrics Card */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {lodge.specs.map((spec) => (
                    <div key={spec.label} className="flex items-center justify-between rounded-2xl border border-white/10 bg-forest-900/40 p-5 group transition-colors hover:bg-gold-500/10">
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-400/40">{spec.label}</span>
                       <span className="text-xs font-bold uppercase text-white tracking-widest">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Secondary Archive Media */}
                <div 
                  onClick={() => setLightboxIndex(1 % lodge.gallery.length)}
                  className="group relative flex-1 min-h-[240px] cursor-pointer overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/40 shadow-premium"
                >
                  <Image
                    src={getBlobAssetUrl(lodge.gallery[1 % lodge.gallery.length])}
                    alt="Archive Detail"
                    fill
                    className="object-cover opacity-60 contrast-[1.1] transition-transform duration-1000 group-hover:scale-115"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center bg-black/20 group-hover:bg-black/10 transition-colors">
                     <Play className="h-6 w-6 text-gold-400/30 group-hover:text-gold-400 transition-colors" />
                     <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/50 group-hover:text-gold-300">Operational Log</p>
                  </div>
                </div>

                {/* Grid System / Status Hub */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest-900/30 p-8 shadow-premium">
                   <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-3">
                            <Activity className="h-4 w-4 text-gold-400" />
                            <span className="text-[11px] font-black uppercase text-white tracking-[0.3em]">Grid Status</span>
                         </div>
                         <span className="text-[8px] font-bold text-gold-400/40 uppercase tracking-[0.2em] ml-7">ENCRYPTION: LEVEL 4</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="h-2 w-2 rounded-full bg-green-500 shadow-glow animate-pulse" />
                         <span className="text-[9px] font-black uppercase text-green-500/60 tracking-widest mt-1">OPERATIONAL</span>
                      </div>
                   </div>
                   
                   <div className="mt-8 flex items-center gap-6 justify-center">
                      <Compass className="h-10 w-10 text-white/5 animate-spin-slow" />
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-400/20" />
                      <Locate className="h-10 w-10 text-white/5" />
                   </div>
                </div>
              </div>

              {/* STUB 3: INTELLIGENCE PILLAR (RIGHT) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Mission Narrative Dossier */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[3rem] border border-white/8 bg-[linear-gradient(135deg,rgba(18,28,26,0.6),rgba(10,16,15,0.8))] p-10 shadow-premium">
                  <div className="absolute left-0 top-0 h-px w-40 bg-gradient-to-r from-gold-400/40 to-transparent" />
                  <div className="absolute left-0 top-0 h-40 w-px bg-gradient-to-b from-gold-400/30 to-transparent" />
                  
                  <div className="mb-6 flex items-center justify-between">
                     <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-400/50 uppercase">{lodge.tagline}</span>
                     <ShieldCheck className="h-4 w-4 text-white/10" />
                  </div>

                  <p className="flex-1 text-lg leading-relaxed text-gray-300 font-medium md:text-xl lg:text-[1.2rem] lg:leading-[1.75]">
                     {lodge.description}
                  </p>
                  
                  <div className="mt-10 flex items-center gap-6 border-t border-white/5 pt-10">
                     <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">Operational Profile</span>
                        <span className="text-xs font-bold uppercase text-gold-400/70 italic">{lodge.highlight}</span>
                     </div>
                     <ExternalLink className="ml-auto h-5 w-5 text-white/10 hover:text-gold-400 transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* Base Logistics (Amenities Dashboard) */}
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest-900/30 p-10 shadow-premium">
                   <div className="mb-8 flex items-center justify-between">
                      <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gold-400/60">Base Logistics</p>
                      <div className="flex items-center gap-2 rounded-full border border-white/5 bg-black/40 px-4 py-2">
                         <Users className="h-4 w-4 text-gold-400/40" />
                         <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">{lodge.capacity} Personnel</span>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                     {lodge.features.map((feature) => {
                       const Icon = feature.icon;
                       return (
                         <div
                           key={feature.label}
                           className="group flex items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.03] px-6 py-5 transition-all hover:border-gold-400/30 hover:bg-gold-400/10 hover:-translate-y-1"
                         >
                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 transition-colors group-hover:bg-gold-400/20">
                              <Icon className="h-5 w-5 text-gold-400/50 group-hover:text-gold-400" />
                           </div>
                           <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                             {feature.label}
                           </span>
                         </div>
                       );
                     })}
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* -- Perfect Polish: Field Philosophy Footer -- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mt-12 overflow-hidden rounded-[4rem] border border-gold-500/10 bg-forest-950/40 p-10 text-center backdrop-blur-3xl sm:p-14"
        >
          {/* Topographic Background Decor */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,200 Q250,150 500,200 T1000,200 V400 H0 Z" fill="rgba(255,255,255,0.05)" />
              <path d="M0,100 C200,50 400,150 600,100 S1000,150 1000,100" stroke="gold" strokeWidth="0.5" fill="none" opacity="0.1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-10 md:flex-row md:gap-14 md:text-left">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-[2rem] border border-gold-400/20 bg-gold-400/5 text-gold-400/40 shadow-glow">
              <Utensils className="h-8 w-8" />
            </div>
            <div className="max-w-4xl">
               <p className="mb-4 text-[11px] font-black uppercase tracking-[0.6em] text-gold-400/40 italic">Operational Hospitality</p>
               <p className="font-display text-2xl leading-relaxed text-gray-300 italic sm:text-3xl md:text-4xl">
                 &ldquo;Meals are prepared around the rhythm of the hunt - not the other way around. Excellent food, reliable hospitality, and a stay that feels relaxed after long days in the bush.&rdquo;
               </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* -- Immersive Lightbox -- */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-forest-950/98 backdrop-blur-3xl flex items-center justify-center"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="absolute inset-x-0 top-0 z-[1010] flex items-center justify-between p-6 md:p-12">
               <div className="rounded-[2.5rem] border border-white/10 bg-black/60 px-8 py-5 backdrop-blur-2xl text-center md:text-left">
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gold-400/50 mb-2 leading-none">{lodge.name}</p>
                  <p className="text-white font-display text-xl font-bold uppercase tracking-tight sm:text-2xl leading-none">Field Archive // Frame {lightboxIndex + 1}</p>
               </div>
               <button onClick={() => setLightboxIndex(null)} className="h-14 w-14 flex items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/50 backdrop-blur-3xl transition-all hover:bg-gold-500 hover:text-black hover:rotate-90 md:h-16 md:w-16">
                  <X className="h-6 w-6 md:h-8 md:w-8" />
               </button>
            </div>

            <div className="relative z-[1005] h-full w-full flex items-center justify-center p-8 pt-32 pb-44 md:p-20 md:pt-40 md:pb-48" onClick={(e) => e.stopPropagation()}>
               <div className="absolute left-8 right-8 z-[1020] flex items-center justify-between pointer-events-none md:left-20 md:right-20">
                  <MagneticButton strength={0.2} onClick={prev} className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-black/30 text-white/30 hover:border-gold-400/40 hover:text-gold-400 backdrop-blur-xl">
                     <ChevronLeft className="h-10 w-10" />
                  </MagneticButton>
                  <MagneticButton strength={0.2} onClick={next} className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full border border-white/5 bg-black/30 text-white/30 hover:border-gold-400/40 hover:text-gold-400 backdrop-blur-xl">
                     <ChevronRight className="h-10 w-10" />
                  </MagneticButton>
               </div>
               <motion.div
                 key={lightboxIndex}
                 initial={{ opacity: 0, scale: 0.95 }}
                 animate={{ opacity: 1, scale: 1 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className="relative h-full w-full rounded-[4rem] overflow-hidden border border-white/10 bg-black/10"
               >
                  <Image src={getBlobAssetUrl(lodge.gallery[lightboxIndex])} alt="Lodge Frame" fill className="object-contain p-10" />
               </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
