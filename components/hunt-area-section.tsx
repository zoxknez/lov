'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Compass, Mountain, ShieldCheck, Trees, Wind } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';

const regions = [
  {
    id: 'north',
    tag: 'North Island',
    name: 'Kaimanawa\nCentral Plateau',
    location: 'Taupo - Turangi - Ohakune',
    image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua.jpg',
    icon: Trees,
    accent: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/8',
    species: ['Sika Deer', 'Red Deer', 'Fallow Deer', 'Rusa Deer'],
    terrain: 'Beech and podocarp bush, river valleys, and tussock tops.',
    signature:
      'The only wild sika herd in the Southern Hemisphere. The Kaimanawa and Kaweka country delivers the defining North Island bush hunt across deep cover, river systems, and open tops.',
    access: [
      { label: 'Clements Mill Road', note: 'Main recreation hunting access east of Taupo.' },
      { label: 'Southern Corridor', note: 'Turangi side approach for selected catchments.' },
      { label: 'Kiko Road', note: 'Useful upper-country entry into bush and tops.' },
    ],
    stats: [
      { label: 'Park Area', value: '74,000 ha' },
      { label: 'Ranges', value: '4 ranges' },
      { label: 'Base', value: 'Ohakune' },
    ],
    permit: 'DOC public-land permits plus private-land permission where required.',
  },
  {
    id: 'south',
    tag: 'South Island',
    name: 'Southern Alps\nAlpine Country',
    location: 'West Coast - Canterbury - High Country',
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    icon: Mountain,
    accent: 'text-sky-300 border-sky-400/30 bg-sky-400/8',
    species: ['Himalayan Tahr', 'Chamois', 'Mountain Red Deer'],
    terrain: 'Alpine grasslands, sub-alpine scrub, steep faces, and remote basins.',
    signature:
      'DOC places tahr across the Southern Alps chain, while chamois range through South Island high country and forest margins. This is real alpine work, not a scenic add-on.',
    access: [
      { label: 'Helicopter Support', note: 'Used only when terrain and weather truly demand it.' },
      { label: 'Foot and 4WD', note: 'Primary access into most productive basins and faces.' },
      { label: 'Alpine Camps', note: 'Field camps extend reach for longer mountain programs.' },
    ],
    stats: [
      { label: 'Altitude', value: '1,200-2,800m' },
      { label: 'Terrain', value: 'Steep alpine' },
      { label: 'Peak Window', value: 'May - Jul' },
    ],
    permit: 'DOC access, concessions where required, and weather-led field planning.',
  },
];

const seasons = [
  {
    window: 'Mar - Apr',
    title: 'Red Deer Roar',
    region: 'North + South Island',
    detail: 'Classic autumn roar timing when mature stags are vocal, territorial, and highly responsive.',
  },
  {
    window: 'Mar - May',
    title: 'Sika Whistle',
    region: 'Central Plateau',
    detail: 'The defining Kaimanawa period with rut-driven whistle activity through dense bush country.',
  },
  {
    window: 'Apr - May',
    title: 'Fallow Rut',
    region: 'North Island',
    detail: 'Selective autumn palmate-buck hunting on suitable private blocks during the rut pattern.',
  },
  {
    window: 'May - Jun',
    title: 'Chamois Buck',
    region: 'Southern Alps',
    detail: 'Alpine buck period built around careful glassing, climbing, and patient high-country work.',
  },
  {
    window: 'May - Jul',
    title: 'Tahr Winter',
    region: 'Southern Alps',
    detail: 'Prime winter-coat and rut window for bulls in steep basins and demanding mountain terrain.',
  },
  {
    window: 'Jul - Aug',
    title: 'Rusa Rut',
    region: 'North Island',
    detail: 'Later-winter dedicated add-on timed to the rusa rut and usually run as its own itinerary.',
  },
];

const principles = [
  {
    icon: ShieldCheck,
    label: 'DOC Permitted',
    text: 'All public-land access runs under valid DOC permits, with separate approval for private crossings.',
  },
  {
    icon: Wind,
    label: 'Terrain First',
    text: 'Programs are built around the right country and seasonal window before any trophy plan is finalized.',
  },
  {
    icon: Compass,
    label: 'Flexible Access',
    text: 'Foot, 4WD, and helicopter are selected only when the country calls for them.',
  },
];

export default function HuntAreaSection() {
  const [activeRegion, setActiveRegion] = useState(0);
  const [activeSeason, setActiveSeason] = useState(0);
  const region = regions[activeRegion];

  return (
    <section id="territory" className="territory-contours relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center md:mb-16">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400">
            <TextReveal>Hunting Territory</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8rem]">
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
          <p className="mx-auto mt-6 max-w-2xl text-base italic leading-relaxed text-gray-400 sm:text-lg">
            <TextReveal delay={0.3}>
              Programs built around the right country first - matched to the species, the seasonal window, and the pace your group wants in the field.
            </TextReveal>
          </p>
        </div>

        <div className="-mx-4 mb-5 overflow-x-auto px-4 no-scrollbar">
          <div className="flex w-max min-w-full gap-3 md:justify-center">
            {regions.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActiveRegion(index)}
                className={`relative flex items-center gap-3 whitespace-nowrap rounded-full border px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-500 sm:px-7 sm:text-[11px] sm:tracking-[0.28em] ${
                  activeRegion === index
                    ? 'border-gold-400/60 bg-gold-400/10 text-gold-300 shadow-glow'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {activeRegion === index && (
                  <motion.span layoutId="region-dot" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                )}
                <item.icon className="h-3.5 w-3.5" />
                {item.tag}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={region.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 grid gap-4 sm:gap-6 lg:mb-6 lg:grid-cols-5"
          >
            <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] sm:min-h-[400px] md:rounded-[2.5rem] lg:col-span-2 lg:min-h-[560px]">
              <Image
                src={getBlobAssetUrl(region.image)}
                alt={region.tag}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                className="object-cover transition-transform duration-[2000ms] scale-[1.03] hover:scale-[1.08]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/45 to-transparent" />

              <div className="pointer-events-none absolute left-5 top-5 sm:left-6 sm:top-6">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>
              <div className="pointer-events-none absolute right-5 top-5 flex flex-col items-end sm:right-6 sm:top-6">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>

              <div className="absolute left-1/2 top-5 -translate-x-1/2 sm:top-6">
                <span className={`rounded-full border px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.3em] backdrop-blur-md ${region.accent}`}>
                  {region.tag}
                </span>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <p className="whitespace-pre-line font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                  {region.name}
                </p>
                <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-400/70 sm:text-[10px] sm:tracking-[0.3em]">
                  {region.location}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-3">
                  {region.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-white/10 bg-black/40 px-2 py-2 text-center backdrop-blur-md sm:px-3 sm:py-2.5"
                    >
                      <p className="text-[7px] font-bold uppercase tracking-[0.16em] text-gold-400/60 sm:text-[8px] sm:tracking-[0.2em]">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-[11px] font-bold text-white sm:text-xs">{stat.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-3">
              <div className="relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium sm:p-8 md:rounded-[2rem]">
                <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/50 to-transparent" />
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.32em] text-gold-400/60 sm:tracking-[0.4em]">
                  Territory Brief
                </p>
                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">{region.signature}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {region.species.map((species) => (
                    <span
                      key={species}
                      className="rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-gold-300"
                    >
                      {species}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium sm:p-8 md:rounded-[2rem]">
                <p className="mb-5 text-[9px] font-bold uppercase tracking-[0.32em] text-gold-400/60 sm:tracking-[0.4em]">
                  Access Routes
                </p>
                <div className="space-y-4">
                  {region.access.map((route, index) => (
                    <div key={route.label} className="flex items-start gap-4">
                      <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10">
                        <span className="text-[8px] font-bold text-gold-400">{index + 1}</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{route.label}</p>
                        <p className="text-[10px] leading-relaxed text-gray-500 sm:text-[11px]">{route.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.6rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium sm:p-6 md:rounded-[1.8rem]">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.32em] text-gold-400/60 sm:tracking-[0.4em]">
                    Terrain
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">{region.terrain}</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium sm:p-6 md:rounded-[1.8rem]">
                  <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.32em] text-gold-400/60 sm:tracking-[0.4em]">
                    Permit Framework
                  </p>
                  <p className="text-sm leading-relaxed text-gray-300">{region.permit}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mb-5 lg:mb-6">
          <div className="mb-5 flex items-center gap-4 sm:mb-6">
            <div className="h-px flex-1 bg-white/5" />
            <p className="text-[9px] font-bold uppercase tracking-[0.34em] text-gold-400/60 sm:text-[10px] sm:tracking-[0.46em]">
              Seasonal Windows
            </p>
            <div className="h-px flex-1 bg-white/5" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {seasons.map((season, index) => (
              <motion.button
                key={season.title}
                onClick={() => setActiveSeason(index)}
                whileHover={{ y: -3 }}
                className={`group relative overflow-hidden rounded-[1.6rem] border p-5 text-left transition-all duration-400 sm:p-6 ${
                  activeSeason === index
                    ? 'border-gold-400/40 bg-gold-400/8 shadow-glow'
                    : 'border-white/8 bg-forest-900/20 hover:border-white/20'
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-4">
                  <span
                    className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] ${
                      activeSeason === index
                        ? 'border-gold-400/40 bg-gold-400/10 text-gold-300'
                        : 'border-white/10 bg-white/[0.03] text-gray-500'
                    }`}
                  >
                    {season.window}
                  </span>
                  <span className="font-display text-lg font-bold text-gold-400/35">{String(index + 1).padStart(2, '0')}</span>
                </div>
                <p className={`mb-1 font-display text-2xl font-bold uppercase tracking-tight ${activeSeason === index ? 'text-gold-200' : 'text-white'}`}>
                  {season.title}
                </p>
                <p className="mb-3 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-400/50">{season.region}</p>
                <p className={`text-sm leading-relaxed transition-colors ${activeSeason === index ? 'text-gray-300' : 'text-gray-500'}`}>
                  {season.detail}
                </p>

                {activeSeason === index && (
                  <motion.div
                    layoutId="season-active"
                    className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold-400/50 to-transparent"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {principles.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <motion.div
                key={principle.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.7 }}
                className="group flex items-start gap-4 rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium transition-all hover:border-gold-500/30 sm:gap-5 sm:p-7 md:rounded-[2rem]"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold-400/15 bg-gold-400/8 text-gold-400 shadow-glow transition-transform group-hover:scale-110 sm:h-12 sm:w-12">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="mb-2 font-display text-lg font-bold uppercase tracking-tight text-white">{principle.label}</p>
                  <p className="text-sm leading-relaxed text-gray-400 transition-colors group-hover:text-gray-300">{principle.text}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
