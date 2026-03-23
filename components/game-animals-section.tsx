'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Trophy, Calendar, MapPin, Target } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

const animals = [
  {
    name: 'Red Deer',
    scientific: 'Cervus elaphus',
    index: '01',
    grade: { label: 'Gold Grade', color: 'text-amber-300 border-amber-400/30 bg-amber-400/8' },
    region: 'North + South Island',
    season: 'Mar – Apr',
    trophy: '350–400 SCI',
    terrain: 'Bush, hill country, alpine basins',
    headline: 'The Classic\nNZ Roar',
    description: 'Classic New Zealand roar hunting for mature stags in beech bush, open hill country, and alpine basins. The autumn roar window runs from late March into April — vocal, territorial stags at their most aggressive.',
    tags: ['Roar-led autumn timing', 'Mature stag focus', 'NI + SI programs'],
    image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
  },
  {
    name: 'Sika Deer',
    scientific: 'Cervus nippon',
    index: '02',
    grade: { label: 'Signature', color: 'text-gold-300 border-gold-400/30 bg-gold-400/8' },
    region: 'Kaimanawa, Central Plateau',
    season: 'Mar – May',
    trophy: '160–200 Douglas',
    terrain: 'Dense beech & podocarp bush',
    headline: 'Kaimanawa\nSignature',
    description: 'The only wild sika herd in the Southern Hemisphere. The Kaimanawa whistle period runs late March into May — elusive bush deer, dense cover, and one of the most authentic stalking experiences in New Zealand.',
    tags: ['Signature species', 'Kaimanawa bush stalking', 'Rut-driven whistle timing'],
    image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
  },
  {
    name: 'Himalayan Tahr',
    scientific: 'Hemitragus jemlahicus',
    index: '03',
    grade: { label: 'Alpine Rare', color: 'text-sky-300 border-sky-400/30 bg-sky-400/8' },
    region: 'Southern Alps',
    season: 'May – Jul',
    trophy: '10–13 inches',
    terrain: 'Alpine grasslands, remote basins, steep faces',
    headline: 'The Alpine\nTrophy',
    description: 'Genuine mountain work in the Southern Alps. Winter coat quality and rut timing make May–July the premium window. Steep basins, remote access, and the most physically demanding hunt in the program.',
    tags: ['Winter coat quality', 'Remote alpine terrain', 'Rut-active bulls'],
    image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua%202%20jpg.jpg',
  },
  {
    name: 'Fallow Deer',
    scientific: 'Dama dama',
    index: '04',
    grade: { label: 'Select', color: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/8' },
    region: 'North Island private blocks',
    season: 'Apr – May',
    trophy: 'Palmate maturity',
    terrain: 'Open country, private-land blocks',
    headline: 'Autumn\nPalmate Buck',
    description: 'Selective autumn hunting for palmate bucks on suitable private blocks. Arranged separately from the main roar window — focused on buck quality and rut timing rather than volume.',
    tags: ['Autumn rut focus', 'Selective trophy standard', 'Private-land access'],
    image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
  },
  {
    name: 'Chamois',
    scientific: 'Rupicapra rupicapra',
    index: '05',
    grade: { label: 'Alpine', color: 'text-blue-300 border-blue-400/30 bg-blue-400/8' },
    region: 'South Island high country',
    season: 'May – Jun',
    trophy: '8–10 inches',
    terrain: 'Steep alpine faces, high country ridges',
    headline: 'High Country\nStalker',
    description: 'A wary, agile species that rewards patience and careful glassing from distance. The May–June rut is the favoured buck period — long days on the hill, demanding terrain, and a unique alpine trophy.',
    tags: ['Favoured rut period', 'Steep alpine faces', 'Long glassing sessions'],
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
  },
  {
    name: 'Rusa Deer',
    scientific: 'Rusa timorensis',
    index: '06',
    grade: { label: 'Specialist', color: 'text-rose-300 border-rose-400/30 bg-rose-400/8' },
    region: 'North Island',
    season: 'Jul – Aug',
    trophy: 'Late-winter trophy',
    terrain: 'Dense cover, river-valley habitat',
    headline: 'Late Winter\nAdd-On',
    description: 'A dedicated North Island program timed to the rusa rut in July–August. Usually planned as a stand-alone itinerary rather than mixed into autumn deer or alpine programs.',
    tags: ['Later-winter rut timing', 'Dense cover habitat', 'Standalone itinerary'],
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg',
  },
];

export default function GameAnimalsSection() {
  const [active, setActive] = useState(0);
  const animal = animals[active];

  return (
    <section id="species" className="relative overflow-hidden bg-transparent py-24 md:py-32 font-sans">
      <div className="absolute inset-0 bg-forest-950/10 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold-400/3 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400 mb-4">
            <TextReveal>Premium Trophies</TextReveal>
          </p>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tight text-white md:text-8xl lg:text-[8rem] leading-none">
            <TextReveal delay={0.1}>Species Profiles</TextReveal>
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
        </div>

        {/* ── Species Tabs ── */}
        <div className="mb-8 flex flex-wrap gap-2 justify-center">
          {animals.map((a, i) => (
            <button
              key={a.name}
              onClick={() => setActive(i)}
              className={`relative rounded-full border px-5 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-400 ${
                active === i
                  ? 'border-gold-400/50 bg-gold-400/10 text-gold-300 shadow-glow'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {active === i && (
                <motion.span layoutId="species-pill" className="absolute inset-0 rounded-full bg-gold-400/5" />
              )}
              <span className="relative">{a.name}</span>
            </button>
          ))}
        </div>

        {/* ── Main Dossier Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={animal.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-6 lg:grid-cols-5"
          >
            {/* ── Image Column ── */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] min-h-[440px] lg:min-h-[560px]">
              <Image
                src={getBlobAssetUrl(animal.image)}
                alt={animal.name}
                fill
                sizes="(max-width:1023px) 100vw, 40vw"
                className="object-cover scale-105 transition-transform duration-[2000ms] hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

              {/* HUD corners */}
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
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-2">
                <span className="rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[8px] font-bold italic uppercase tracking-[0.2em] text-white/60 backdrop-blur-md">
                  {animal.scientific}
                </span>
              </div>

              {/* Index watermark */}
              <div className="absolute top-6 right-8 font-display text-7xl font-bold text-white/[0.06] select-none leading-none">
                {animal.index}
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span className={`mb-4 inline-block rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] ${animal.grade.color} backdrop-blur-md`}>
                  {animal.grade.label}
                </span>
                <h3 className="font-display text-4xl font-bold uppercase leading-tight text-white whitespace-pre-line">
                  {animal.headline}
                </h3>
              </div>
            </div>

            {/* ── Info Column ── */}
            <div className="lg:col-span-3 flex flex-col gap-5">

              {/* Species name + description */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium">
                <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-gold-400/50 to-transparent" />
                <div className="absolute top-0 left-0 h-10 w-px bg-gradient-to-b from-gold-400/30 to-transparent" />

                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h4 className="font-display text-4xl font-bold uppercase tracking-tight text-white">{animal.name}</h4>
                    <p className="mt-1 text-[10px] font-bold italic uppercase tracking-[0.24em] text-gold-400/50">{animal.scientific}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] ${animal.grade.color}`}>
                    {animal.grade.label}
                  </span>
                </div>

                <p className="text-base leading-relaxed text-gray-300 italic">{animal.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {animal.tags.map((t) => (
                    <span key={t} className="rounded-full border border-gold-400/15 bg-gold-400/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gold-300">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Trophy, label: 'Trophy Score', value: animal.trophy },
                  { icon: Calendar, label: 'Season Window', value: animal.season },
                  { icon: MapPin, label: 'Territory', value: animal.region },
                  { icon: Target, label: 'Terrain', value: animal.terrain },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="group rounded-[1.6rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium transition-all hover:border-gold-400/20"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-gold-400/15 bg-gold-400/8 text-gold-400 transition-transform group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-gold-400/50 mb-1">{stat.label}</p>
                      <p className="text-sm font-bold text-white">{stat.value}</p>
                    </div>
                  );
                })}
              </div>

              {/* Navigation hint */}
              <div className="flex items-center justify-between rounded-[1.6rem] border border-white/8 bg-forest-900/20 px-6 py-4">
                <button
                  onClick={() => setActive((active - 1 + animals.length) % animals.length)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-colors hover:text-gold-300"
                >
                  ← Prev
                </button>
                <div className="flex gap-1.5">
                  {animals.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActive(i)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActive((active + 1) % animals.length)}
                  className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-colors hover:text-gold-300"
                >
                  Next →
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Quote strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-10 relative overflow-hidden rounded-[2rem] border border-gold-500/10 bg-forest-900/30 p-10 shadow-premium text-center backdrop-blur-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-forest-600/5" />
          <p className="relative mx-auto max-w-3xl text-xl font-display font-light italic leading-relaxed text-gray-300">
            &ldquo;All hunts follow fair-chase principles. Multiple-species itineraries can be built by arrangement — final programs shaped by trophy goals, seasonal timing, and the right country.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
}
