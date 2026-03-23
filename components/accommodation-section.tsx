'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Utensils, Users, Wifi, Flame, Bed, Coffee, Wind } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';

const lodges = [
  {
    id: 'ohakune',
    type: 'Primary Base',
    typeColor: 'text-gold-300 border-gold-400/30 bg-gold-400/8',
    name: 'Ohakune\nLodge Base',
    location: 'Ohakune · North Island',
    tagline: 'Central North Island hunting base',
    description: 'A comfortable, properly hosted lodge sitting at the heart of the North Island program. Everything runs from here — meals, briefings, debrief evenings, and early starts into the Kaimanawa.',
    image: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
    capacity: '2–4 hunters',
    features: [
      { icon: Bed, label: 'Private Bedrooms' },
      { icon: Flame, label: 'Heating & Fireplace' },
      { icon: Utensils, label: 'Chef-Prepared Meals' },
      { icon: Coffee, label: 'Communal Lounge' },
      { icon: Wifi, label: 'Lodge Wi-Fi' },
      { icon: Users, label: 'Personal Hosting' },
    ],
    highlight: 'Perfect access to Kaimanawa, Kaweka, and Central Plateau blocks.',
  },
  {
    id: 'alpine',
    type: 'Backcountry',
    typeColor: 'text-sky-300 border-sky-400/30 bg-sky-400/8',
    name: 'Remote Alpine\nField Camps',
    location: 'Southern Alps · South Island',
    tagline: 'Deep mountain access when terrain demands it',
    description: 'Simple, functional field camps used when the hunt calls for more reach into serious mountain country. No unnecessary comfort — but everything needed to run an efficient alpine program.',
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    capacity: '1–2 hunters',
    features: [
      { icon: Wind, label: 'Full Mountain Immersion' },
      { icon: Utensils, label: 'Field Catering' },
      { icon: MapPin, label: 'Weather-Led Access' },
      { icon: Flame, label: 'Hunt-Focused Living' },
    ],
    highlight: 'Extended reach into tahr and chamois country without cutting the program short.',
  },
];

export default function AccommodationSection() {
  const [active, setActive] = useState(0);
  const lodge = lodges[active];

  return (
    <section id="stay" className="relative overflow-hidden bg-transparent py-24 md:py-32 font-sans">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-gold-500/4 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400 mb-4">
            <TextReveal>Where You Rest</TextReveal>
          </p>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tight text-white md:text-8xl lg:text-[8rem] leading-none">
            <TextReveal delay={0.1}>Lodge & Camps</TextReveal>
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
          <p className="mx-auto mt-8 max-w-2xl text-lg italic leading-relaxed text-gray-400">
            <TextReveal delay={0.3}>
              Comfortable lodge hosting where it makes sense — remote camps only when the hunt really needs extra reach.
            </TextReveal>
          </p>
        </div>

        {/* ── Lodge Tabs ── */}
        <div className="mb-8 flex gap-3 justify-center">
          {lodges.map((l, i) => (
            <button
              key={l.id}
              onClick={() => setActive(i)}
              className={`relative flex items-center gap-3 rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.28em] transition-all duration-500 ${
                active === i
                  ? 'border-gold-400/60 bg-gold-400/10 text-gold-300 shadow-glow'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {active === i && (
                <motion.span layoutId="lodge-dot" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              )}
              {l.type}
            </button>
          ))}
        </div>

        {/* ── Main Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lodge.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 lg:grid-cols-5 mb-6"
          >
            {/* Image */}
            <div className="lg:col-span-3 relative overflow-hidden rounded-[2.5rem] min-h-[420px] lg:min-h-[500px]">
              <Image
                src={getBlobAssetUrl(lodge.image)}
                alt={lodge.name}
                fill
                sizes="(max-width:1023px) 100vw, 60vw"
                className="object-cover scale-[1.04] transition-transform duration-[2000ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

              {/* HUD Corners */}
              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>
              <div className="absolute top-6 right-6 pointer-events-none flex flex-col items-end">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>
              <div className="absolute bottom-6 left-6 pointer-events-none flex flex-col justify-end">
                <div className="h-px w-8 bg-gold-400/50" />
                <div className="h-8 w-px bg-gold-400/50" />
              </div>
              <div className="absolute bottom-6 right-6 pointer-events-none flex flex-col items-end justify-end">
                <div className="h-px w-8 bg-gold-400/50" />
                <div className="h-8 w-px bg-gold-400/50" />
              </div>

              {/* Top badges */}
              <div className="absolute top-7 left-1/2 -translate-x-1/2 flex gap-2">
                <span className={`rounded-full border px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] ${lodge.typeColor} backdrop-blur-md`}>
                  {lodge.type}
                </span>
              </div>

              {/* Capacity badge */}
              <div className="absolute top-7 right-7">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-1.5 backdrop-blur-md">
                  <Users className="h-3 w-3 text-gold-400/60" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.28em] text-white/60">{lodge.capacity}</span>
                </div>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex items-center gap-2.5 mb-4">
                  <MapPin className="h-3.5 w-3.5 text-gold-400/70" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/70">{lodge.location}</span>
                </div>
                <h3 className="font-display text-4xl font-bold uppercase leading-tight text-white whitespace-pre-line">
                  {lodge.name}
                </h3>
              </div>
            </div>

            {/* Info */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Description */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium">
                <div className="absolute top-0 left-0 h-px w-28 bg-gradient-to-r from-gold-400/40 to-transparent" />
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.42em] text-gold-400/55">{lodge.tagline}</p>
                <p className="text-sm leading-relaxed text-gray-300 italic mt-4">{lodge.description}</p>
                <div className="mt-6 rounded-xl border border-gold-400/10 bg-gold-400/5 px-4 py-3">
                  <p className="text-[10px] leading-relaxed text-gold-300/70">{lodge.highlight}</p>
                </div>
              </div>

              {/* Features grid */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-7 shadow-premium">
                <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.42em] text-gold-400/55">Facilities</p>
                <div className="grid grid-cols-2 gap-3">
                  {lodge.features.map((f) => {
                    const Icon = f.icon;
                    return (
                      <div key={f.label} className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-all hover:border-gold-400/20 hover:bg-gold-400/5">
                        <Icon className="h-3.5 w-3.5 text-gold-400/60 transition-colors group-hover:text-gold-400" />
                        <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-gray-400 group-hover:text-gray-200 transition-colors">{f.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Dining Quote ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative overflow-hidden rounded-[2rem] border border-gold-500/10 bg-forest-900/30 p-10 shadow-premium text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-forest-600/5" />
          <div className="relative flex flex-col items-center gap-5 md:flex-row md:gap-10 md:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/8 text-gold-400 shadow-glow">
              <Utensils className="h-5 w-5" />
            </div>
            <p className="font-display text-xl font-light italic leading-relaxed text-gray-300 md:text-2xl">
              &ldquo;Meals are prepared around the rhythm of the hunt — not the other way around. Excellent food, reliable hospitality, and a stay that feels relaxed after long days in the bush.&rdquo;
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
