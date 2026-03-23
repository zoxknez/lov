'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Compass, Mountain, Trees, ShieldCheck, Wind, ArrowRight } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

const regions = [
  {
    id: 'north',
    tag: 'North Island',
    name: 'Kaimanawa\nCentral Plateau',
    location: 'Taupo · Turangi · Ohakune',
    image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua.jpg',
    icon: Trees,
    color: 'from-emerald-500/20 to-transparent',
    accent: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/8',
    species: ['Sika Deer', 'Red Deer', 'Fallow Deer', 'Rusa Deer'],
    terrain: 'Beech & podocarp bush, river valleys, tussock tops',
    signature: 'The only wild sika herd in the Southern Hemisphere. The Kaimanawa and Kaweka ranges host this singular North Island story across mountain beech, tussock alpine habitats, and deep river systems.',
    access: [
      { label: 'Clements Mill Rd', note: '27km east of Taupo, primary RHA access' },
      { label: 'Southern Corridor', note: '37km south of Tūrangi off SH1' },
      { label: 'Kiko Road', note: '10km north of Tūrangi, upper catchments' },
    ],
    stats: [
      { label: 'Park Area', value: '74,000 ha' },
      { label: 'Ranges', value: '4 mountain ranges' },
      { label: 'Base', value: 'Ohakune Lodge' },
    ],
    permit: 'DOC Recreation Hunting Area (RHA) · North Kaimanawa',
  },
  {
    id: 'south',
    tag: 'South Island',
    name: 'Southern Alps\nAlpine Country',
    location: 'Southern Alps · West Coast · Canterbury',
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    icon: Mountain,
    color: 'from-sky-500/20 to-transparent',
    accent: 'text-sky-300 border-sky-400/30 bg-sky-400/8',
    species: ['Himalayan Tahr', 'Chamois', 'Mountain Red Deer'],
    terrain: 'Alpine grasslands, sub-alpine shrubland, steep basins and faces',
    signature: "DOC places tahr across the entire Southern Alps chain, while chamois spread through South Island high country and West Coast forest edges. Genuine mountain work — not scenic add-ons.",
    access: [
      { label: 'Helicopter Support', note: 'Weather and terrain-led, not standard' },
      { label: 'Foot + 4WD', note: 'Primary access into basins and faces' },
      { label: 'Alpine Camps', note: 'Extended programs from field camps' },
    ],
    stats: [
      { label: 'Altitude', value: '1,200–2,800m' },
      { label: 'Terrain', value: 'Steep alpine' },
      { label: 'Season', value: 'May – July (peak)' },
    ],
    permit: 'DOC Concession Required · Southern Alps',
  },
];

const seasons = [
  { window: 'Mar – Apr', title: 'Red Deer Roar', icon: '♦', region: 'NI + SI', detail: 'Classic autumn roar. Mature stags vocal and territorial — best window for aggressive stalking.' },
  { window: 'Mar – May', title: 'Sika Whistle', icon: '◈', region: 'Central Plateau', detail: 'The Kaimanawa signature. Sika stags whistle and grunt through the bush. Most requested program.' },
  { window: 'Apr – May', title: 'Fallow Rut', icon: '◆', region: 'North Island', detail: 'Selective palmate buck hunting on private blocks during the autumn rut pattern.' },
  { window: 'May – Jun', title: 'Chamois Buck', icon: '◉', region: 'Southern Alps', detail: 'Alpine buck rut period. Long glassing sessions, careful climbing, demanding high-country work.' },
  { window: 'May – Jul', title: 'Tahr Winter', icon: '◈', region: 'Southern Alps', detail: 'Premium winter coat quality. Rut-active bulls in steep basins — the definitive alpine trophy.' },
  { window: 'Jul – Aug', title: 'Rusa Rut', icon: '◇', region: 'North Island', detail: 'Later-winter North Island add-on timed to the rusa rut. Dedicated program, separate itinerary.' },
];

const principles = [
  { icon: ShieldCheck, label: 'DOC Permitted', text: 'All public land access runs under valid DOC hunting permits. Private crossings carry separate landowner approval.' },
  { icon: Wind, label: 'Terrain First', text: 'Programs are built around the right country and seasonal window, then matched to trophy goals and your preferred pace.' },
  { icon: Compass, label: 'Flexible Access', text: 'Foot, 4WD, and helicopter selected by what the country demands — not imposed on every program as a default.' },
];

export default function HuntAreaSection() {
  const [activeRegion, setActiveRegion] = useState(0);
  const [activeSeason, setActiveSeason] = useState(0);
  const region = regions[activeRegion];

  return (
    <section id="territory" className="relative overflow-hidden bg-transparent py-24 md:py-32 font-sans territory-contours">
      <div className="absolute inset-0 bg-forest-950/10 backdrop-blur-[1px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400 mb-4">
            <TextReveal>Hunting Territory</TextReveal>
          </p>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tight text-white md:text-8xl lg:text-[8rem] leading-none">
            <TextReveal delay={0.1}>Where You Hunt</TextReveal>
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
              Programs built around the right country first — matched to the species, the seasonal window, and the pace your group wants in the field.
            </TextReveal>
          </p>
        </div>

        {/* ── Region Tabs ── */}
        <div className="mb-6 flex gap-3 justify-center">
          {regions.map((r, i) => (
            <button
              key={r.id}
              onClick={() => setActiveRegion(i)}
              className={`relative flex items-center gap-3 rounded-full border px-7 py-3 text-[11px] font-bold uppercase tracking-[0.28em] transition-all duration-500 ${
                activeRegion === i
                  ? 'border-gold-400/60 bg-gold-400/10 text-gold-300 shadow-glow'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {activeRegion === i && (
                <motion.span layoutId="region-dot" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              )}
              <r.icon className="h-3.5 w-3.5" />
              {r.tag}
            </button>
          ))}
        </div>

        {/* ── Region Panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 grid gap-6 lg:grid-cols-5"
          >
            {/* Image Panel */}
            <div className="lg:col-span-2 relative overflow-hidden rounded-[2.5rem] aspect-[4/5] lg:aspect-auto min-h-[400px]">
              <Image
                src={getBlobAssetUrl(region.image)}
                alt={region.tag}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover transition-transform duration-[2000ms] scale-[1.03] hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

              {/* Corner brackets */}
              <div className="absolute top-6 left-6 pointer-events-none">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>
              <div className="absolute top-6 right-6 pointer-events-none flex flex-col items-end">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>

              {/* Tag */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2">
                <span className={`rounded-full border px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] ${region.accent} backdrop-blur-md`}>
                  {region.tag}
                </span>
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-8 left-8 right-8">
                <p className="font-display text-3xl font-bold uppercase leading-tight text-white whitespace-pre-line">{region.name}</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/70">{region.location}</p>

                <div className="mt-6 flex gap-3">
                  {region.stats.map((s) => (
                    <div key={s.label} className="flex-1 rounded-xl border border-white/10 bg-black/40 px-3 py-2.5 backdrop-blur-md text-center">
                      <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-gold-400/60">{s.label}</p>
                      <p className="mt-1 text-xs font-bold text-white">{s.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-3 flex flex-col gap-5">
              {/* Signature Block */}
              <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium">
                <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-gold-400/50 to-transparent" />
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400/60">Territory Brief</p>
                <p className="text-base leading-relaxed text-gray-300">{region.signature}</p>

                {/* Species */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {region.species.map((s) => (
                    <span key={s} className="rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-widest text-gold-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Access Routes */}
              <div className="rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium">
                <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400/60">Access Routes</p>
                <div className="space-y-4">
                  {region.access.map((a, i) => (
                    <div key={a.label} className="flex items-start gap-4">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10">
                        <span className="text-[8px] font-bold text-gold-400">{i + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{a.label}</p>
                        <p className="text-[10px] text-gray-500">{a.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Terrain + Permit */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400/60">Terrain</p>
                  <p className="text-sm leading-relaxed text-gray-300">{region.terrain}</p>
                </div>
                <div className="rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400/60">Permit Framework</p>
                  <p className="text-sm leading-relaxed text-gray-300">{region.permit}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Season Windows ── */}
        <div className="mb-6">
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-[10px] font-bold uppercase tracking-[0.46em] text-gold-400/60">Seasonal Windows</p>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {seasons.map((s, i) => (
              <motion.button
                key={s.title}
                onClick={() => setActiveSeason(i)}
                whileHover={{ y: -3 }}
                className={`group relative overflow-hidden rounded-[1.6rem] border p-6 text-left transition-all duration-400 ${
                  activeSeason === i
                    ? 'border-gold-400/40 bg-gold-400/8 shadow-glow'
                    : 'border-white/8 bg-forest-900/20 hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.28em] ${
                    activeSeason === i ? 'border-gold-400/40 bg-gold-400/10 text-gold-300' : 'border-white/10 bg-white/[0.03] text-gray-500'
                  }`}>
                    {s.window}
                  </span>
                  <span className="text-xs text-gold-400/40">{s.icon}</span>
                </div>
                <p className={`font-display text-xl font-bold uppercase tracking-tight mb-1 ${activeSeason === i ? 'text-gold-200' : 'text-white'}`}>{s.title}</p>
                <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-400/50 mb-3">{s.region}</p>
                <p className={`text-xs leading-relaxed transition-colors ${activeSeason === i ? 'text-gray-300' : 'text-gray-500'}`}>{s.detail}</p>

                {activeSeason === i && (
                  <motion.div
                    layoutId="season-active"
                    className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* ── Principles Strip ── */}
        <div className="grid gap-4 sm:grid-cols-3">
          {principles.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
                className="group flex items-start gap-5 rounded-[2rem] border border-white/8 bg-forest-900/20 p-7 shadow-premium transition-all hover:border-gold-500/30"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-400/15 bg-gold-400/8 text-gold-400 shadow-glow transition-transform group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-display text-lg font-bold uppercase tracking-tight text-white mb-2">{p.label}</p>
                  <p className="text-xs leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">{p.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
