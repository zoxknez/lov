'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { ArrowLeft, ArrowRight, Compass, MapPin, Mountain, ShieldCheck, Trees, Wind } from 'lucide-react';
import TextReveal from '@/components/text-reveal';

type TerritorySignal = {
  icon: typeof Trees;
  title: string;
  description: string;
};

type Region = {
  name: string;
  location: string;
  description: string;
  image: string;
  species: string[];
  terrain: string[];
  highlights: Array<{ label: string; value: string }>;
  accessNote: string;
  fieldNote: string;
};

const territorySignals: TerritorySignal[] = [
  {
    icon: Trees,
    title: 'Kaimanawa Sika Country',
    description:
      'DOC describes the Kaimanawa and Kaweka herd as the only wild sika herd in the southern hemisphere, which is why the Central Plateau remains the signature North Island story behind these hunts.',
  },
  {
    icon: Mountain,
    title: 'Southern Alps Reach',
    description:
      'Official DOC guidance places tahr through alpine grasslands and sub-alpine shrublands across the Southern Alps, while chamois range widely through South Island high country and even lower West Coast forest edges.',
  },
  {
    icon: ShieldCheck,
    title: 'Permit-Guided Access',
    description:
      'When programs move onto public conservation land, each hunter needs a separate DOC permit, and private crossings still require landowner approval.',
  },
];

const regions: Region[] = [
  {
    name: 'North Island | Central Plateau',
    location: 'Taupo, Turangi, and Kaimanawa country',
    description:
      'Native bush, river valleys, and rugged hill country define the North Island program. This is the heart of the Kaimanawa sika story, with red deer, fallow deer, and selected rusa programs built around the right blocks and the right timing.',
    image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua.jpg',
    species: ['Sika Deer', 'Red Deer', 'Fallow Deer', 'Rusa Deer'],
    terrain: ['Beech and podocarp bush', 'River systems', 'Physical hill-country stalking'],
    highlights: [
      { label: 'Signature', value: 'Wild sika country' },
      { label: 'Country', value: 'Bush + river valleys' },
      { label: 'Travel Rhythm', value: 'Ohakune base logistics' },
    ],
    accessNote:
      'The lodge base sits in Ohakune, with day-by-day movement planned around the specific hunt block, weather, and the species being pursued.',
    fieldNote:
      'Kaimanawa Forest Park is shaped by four mountain ranges and large river systems, giving this program real wilderness texture rather than farm-style hunting country.',
  },
  {
    name: 'South Island | Southern Alps',
    location: 'Alpine basins and remote backcountry',
    description:
      'Steep basins, exposed faces, and remote alpine country shape the South Island hunts. This is where Himalayan tahr, chamois, and selected mountain red deer programs become genuine mountain work rather than a scenic add-on.',
    image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    species: ['Himalayan Tahr', 'Chamois', 'Mountain Red Deer'],
    terrain: ['Alpine grasslands', 'Sub-alpine shrubland', 'Steep river valleys and faces'],
    highlights: [
      { label: 'Signature', value: 'Tahr + chamois' },
      { label: 'Country', value: 'High alpine terrain' },
      { label: 'Travel Rhythm', value: 'Weather-led pushes' },
    ],
    accessNote:
      'Helicopter support is used only where the country, safety, and weather make it the right tool for the hunt rather than a shortcut.',
    fieldNote:
      'DOC places tahr across the Southern Alps and notes that chamois spread through South Island high country, including lower forest margins on the West Coast.',
  },
];

const accessPrinciples = [
  {
    icon: Wind,
    title: 'Versatile Access',
    desc: 'Foot travel, 4WD movement, and helicopter support are selected to suit the country rather than imposed on every program.',
  },
  {
    icon: Mountain,
    title: 'Wild Country First',
    desc: 'Programs are built around terrain and seasonal behaviour first, then matched to trophy goals and the strength of each block.',
  },
  {
    icon: Compass,
    title: 'Remote Camp Reach',
    desc: 'When mountain programs need more depth, simple alpine camps extend the hunt without compromising the hosted base experience.',
  },
];

const seasonWindows = [
  {
    window: 'Late Mar - Apr',
    title: 'Red Deer Roar',
    description: 'The classic autumn roar window, when mature red stags become vocal and territorial through March and April.',
    focus: 'North + South Island',
    note: 'Best for vocal, territorial stags',
  },
  {
    window: 'Late Mar - Early May',
    title: 'Sika Roar',
    description: 'The key Kaimanawa sika whistle period, with the best North Island rhythm generally running from late March into early May.',
    focus: 'Central Plateau bush',
    note: 'Signature Kaimanawa whistle timing',
  },
  {
    window: 'Apr - May',
    title: 'Fallow Rut',
    description: 'Best timing for selective fallow trophy hunting when bucks are settled into their autumn rut pattern.',
    focus: 'Selected North Island blocks',
    note: 'Autumn palmate buck focus',
  },
  {
    window: 'May - Jun',
    title: 'Chamois Focus',
    description: 'A favoured rut period for alpine buck hunting, often paired with long glassing sessions and careful climbing.',
    focus: 'South Island high country',
    note: 'Alpine buck period',
  },
  {
    window: 'May - Jul',
    title: 'Tahr Winter Window',
    description: 'Tahr can be hunted year-round, but winter coat quality and rut timing make this the premium alpine period.',
    focus: 'Southern Alps',
    note: 'Winter coat and rut quality',
  },
  {
    window: 'Mid Jul - Aug',
    title: 'Rusa Program',
    description: 'A later-winter North Island option timed to the rusa rut, usually run as a dedicated add-on rather than mixed into the main autumn window.',
    focus: 'Dedicated North Island add-on',
    note: 'Later-winter rut timing',
  },
];

export default function HuntAreaSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSeason, setActiveSeason] = useState(0);
  const [isSeasonPaused, setIsSeasonPaused] = useState(false);
  const seasonTrackRef = useRef<HTMLDivElement>(null);
  const seasonCardRefs = useRef<Array<HTMLElement | null>>([]);
  const activeSeasonRef = useRef(0);
  const seasonScrollFrameRef = useRef<number | null>(null);
  const seasonScrollTimeoutRef = useRef<number | null>(null);
  const seasonProgrammaticScrollRef = useRef(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  useEffect(() => {
    activeSeasonRef.current = activeSeason;
  }, [activeSeason]);

  const scrollToSeason = useCallback((index: number, behavior: ScrollBehavior = 'smooth') => {
    const track = seasonTrackRef.current;
    const total = seasonWindows.length;
    const normalizedIndex = ((index % total) + total) % total;
    const targetCard = seasonCardRefs.current[normalizedIndex];

    if (!track || !targetCard) {
      setActiveSeason(normalizedIndex);
      return;
    }

    if (seasonScrollTimeoutRef.current !== null) {
      window.clearTimeout(seasonScrollTimeoutRef.current);
      seasonScrollTimeoutRef.current = null;
    }

    const nextLeft = Math.max(0, targetCard.offsetLeft - (track.clientWidth - targetCard.offsetWidth) / 2);
    const nextBehavior = prefersReducedMotion ? 'auto' : behavior;

    seasonProgrammaticScrollRef.current = nextBehavior === 'smooth';
    setActiveSeason(normalizedIndex);
    track.scrollTo({
      left: nextLeft,
      behavior: nextBehavior,
    });

    if (seasonProgrammaticScrollRef.current) {
      seasonScrollTimeoutRef.current = window.setTimeout(() => {
        seasonProgrammaticScrollRef.current = false;
        seasonScrollTimeoutRef.current = null;
      }, 650);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      scrollToSeason(0, 'auto');
    }, 80);

    return () => window.clearTimeout(timeout);
  }, [scrollToSeason]);

  useEffect(() => {
    if (prefersReducedMotion || isSeasonPaused) return;

    const interval = window.setInterval(() => {
      scrollToSeason(activeSeasonRef.current + 1);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [isSeasonPaused, prefersReducedMotion, scrollToSeason]);

  useEffect(() => {
    return () => {
      if (seasonScrollFrameRef.current !== null) {
        window.cancelAnimationFrame(seasonScrollFrameRef.current);
      }

      if (seasonScrollTimeoutRef.current !== null) {
        window.clearTimeout(seasonScrollTimeoutRef.current);
      }
    };
  }, []);

  const syncSeasonFromScroll = useCallback(() => {
    const track = seasonTrackRef.current;
    if (!track || seasonProgrammaticScrollRef.current) return;

    if (seasonScrollFrameRef.current !== null) {
      window.cancelAnimationFrame(seasonScrollFrameRef.current);
    }

    seasonScrollFrameRef.current = window.requestAnimationFrame(() => {
      const liveTrack = seasonTrackRef.current;
      if (!liveTrack) return;

      const trackCenter = liveTrack.scrollLeft + liveTrack.clientWidth / 2;
      let nearestIndex = 0;
      let nearestDistance = Number.POSITIVE_INFINITY;

      seasonCardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(cardCenter - trackCenter);

        if (distance < nearestDistance) {
          nearestDistance = distance;
          nearestIndex = index;
        }
      });

      setActiveSeason((current) => (current === nearestIndex ? current : nearestIndex));
      seasonScrollFrameRef.current = null;
    });
  }, []);

  return (
    <section id="territory" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans territory-contours">
      <div className="pointer-events-none absolute inset-0 bg-black/26 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-gold-500/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400">
            <TextReveal>The Territory</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl lg:text-8xl">
            <TextReveal delay={0.2}>Where You Hunt</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 120 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"
          />
          <p className="mx-auto mt-10 max-w-3xl text-lg leading-relaxed text-gray-400 md:text-xl italic">
            <TextReveal delay={0.4}>
              Our programs are built around the right country first, matched to the species, the seasonal window, and the pace your group wants in the field.
            </TextReveal>
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-20 grid gap-6 lg:grid-cols-3"
        >
          {territorySignals.map((signal) => {
            const Icon = signal.icon;

            return (
              <motion.div
                key={signal.title}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-forest-900/15 p-8 shadow-premium transition-all duration-700 hover:border-gold-500/25 hover:bg-forest-900/25"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(200,169,110,0.08),transparent_46%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-black/20 text-gold-400 shadow-glow-gold">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-4 font-display text-3xl font-bold uppercase tracking-tight text-white">
                    {signal.title}
                  </h3>
                  <p className="text-sm leading-7 text-gray-400 group-hover:text-gray-200 transition-colors">
                    {signal.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="mb-28 grid gap-8 xl:grid-cols-2"
        >
          {regions.map((region) => (
            <motion.article
              key={region.name}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-[2.75rem] border border-white/10 bg-forest-900/15 shadow-premium transition-all duration-700 hover:border-gold-500/35"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={getBlobAssetUrl(region.image)}
                  alt={region.name}
                  fill
                  sizes="(max-width: 1279px) 100vw, 50vw"
                  className="object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/24 to-transparent opacity-95" />
                <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                  <div className="mb-4 flex items-center gap-3 text-gold-400">
                    <MapPin className="h-4 w-4" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em]">{region.location}</span>
                  </div>
                  <h3 className="max-w-[13ch] font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                    {region.name}
                  </h3>
                </div>
              </div>

              <div className="p-8 md:p-10">
                <p className="text-lg leading-relaxed text-gray-300">
                  {region.description}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {region.highlights.map((highlight) => (
                    <div
                      key={highlight.label}
                      className="rounded-[1.5rem] border border-white/10 bg-black/10 p-5 backdrop-blur-sm"
                    >
                      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/60">
                        {highlight.label}
                      </p>
                      <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white/88">
                        {highlight.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid gap-8 border-t border-white/10 pt-8 lg:grid-cols-[1.1fr_0.9fr]">
                  <div>
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-400/60">
                      Core Species
                    </p>
                    <div className="mb-7 flex flex-wrap gap-2">
                      {region.species.map((species) => (
                        <span
                          key={species}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-white/86"
                        >
                          {species}
                        </span>
                      ))}
                    </div>

                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-400/60">
                      Country Character
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-3">
                      {region.terrain.map((terrain) => (
                        <span key={terrain} className="inline-flex items-center gap-2 text-sm text-gray-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-gold-400/50" />
                          {terrain}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-[1.8rem] border border-gold-400/10 bg-gold-400/[0.06] p-5 shadow-glow-gold">
                      <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-300/70">
                        Field Note
                      </p>
                      <p className="text-sm leading-7 text-gold-100/80">
                        {region.fieldNote}
                      </p>
                    </div>

                    <div className="flex items-start gap-4 rounded-[1.8rem] border border-white/10 bg-black/15 p-5">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/15 text-gold-400">
                        <Compass className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/60">
                          Access Rhythm
                        </p>
                        <p className="text-sm leading-7 text-gray-300">{region.accessNote}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mb-28 overflow-hidden rounded-[2.5rem] border border-gold-500/10 bg-forest-900/30 shadow-premium backdrop-blur-xl"
        >
          <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="border-b border-white/10 p-8 lg:border-b-0 lg:border-r lg:p-10">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.38em] text-gold-400/60">
                Public + Private Access
              </p>
              <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                Country Is Planned, Not Random
              </h3>
              <p className="mt-5 max-w-2xl text-base leading-8 text-gray-300">
                We combine private blocks, managed access, and public conservation country depending on species, season, and the style of hunt required. When a program uses DOC land, every hunter needs a separate permit. Where private land crossings are involved, landowner approval remains essential.
              </p>
            </div>

            <div className="grid gap-0 divide-y divide-white/10">
              <div className="p-8 lg:p-10">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60">
                  DOC Guidance
                </p>
                <p className="text-sm leading-7 text-gray-300">
                  DOC hunting permits do not grant access across private land. If a route crosses private property, separate approval is still required.
                </p>
              </div>
              <div className="p-8 lg:p-10">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60">
                  Alpine Logistics
                </p>
                <p className="text-sm leading-7 text-gray-300">
                  Remote mountain days remain weather-led. Aircraft and helicopter support are used where the country genuinely calls for them, not as a substitute for the hunt itself.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-32 grid gap-8 md:grid-cols-3"
        >
          {accessPrinciples.map((item) => (
            <motion.div
              key={item.title}
              variants={itemVariants}
              className="group rounded-3xl border border-white/10 bg-forest-900/10 p-8 text-center transition-all duration-700 hover:border-gold-400/24 hover:bg-forest-900/24 shadow-premium"
            >
              <div className="mx-auto mb-7 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.5rem] border border-white/10 bg-black/20 text-gold-400 shadow-glow">
                <item.icon className="h-8 w-8" />
              </div>
              <h4 className="mb-4 font-display text-2xl font-bold uppercase tracking-tight text-white">
                {item.title}
              </h4>
              <p className="text-sm leading-7 text-gray-400 group-hover:text-gray-200 transition-colors">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <div className="relative mt-20">
          <div className="mb-20 flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="mb-6 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.5em] text-gold-400">
                <span className="h-px w-8 bg-gold-400/40" />
                <TextReveal>Operational Rhythm</TextReveal>
              </p>
              <h3 className="font-display text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl leading-tight">
                <TextReveal delay={0.2}>Season Windows</TextReveal>
              </h3>
            </div>
            <div className="relative max-w-sm rounded-2xl border border-white/5 bg-forest-900/30 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium italic leading-relaxed text-gray-400">
                The main hosted travel window runs from late March into July, with rusa usually sitting later into winter as a dedicated North Island option.
              </p>
              <div className="absolute -left-1 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full bg-gold-500/40" />
            </div>
          </div>

          <div
            className="group/slider relative"
            onMouseEnter={() => setIsSeasonPaused(true)}
            onMouseLeave={() => setIsSeasonPaused(false)}
            onFocusCapture={() => setIsSeasonPaused(true)}
            onBlurCapture={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                setIsSeasonPaused(false);
              }
            }}
          >
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-full -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_50%_50%,rgba(163,126,67,0.05),transparent_70%)] blur-[100px]" />

            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 hidden w-24 bg-gradient-to-r from-black via-black/75 to-transparent lg:block" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 hidden w-24 bg-gradient-to-l from-black via-black/75 to-transparent lg:block" />

            <div
              ref={seasonTrackRef}
              onScroll={syncSeasonFromScroll}
              className="season-track-fade no-scrollbar relative flex snap-x snap-proximity gap-7 overflow-x-auto px-4 py-8 md:px-[10vw] lg:px-[13vw]"
            >
              {seasonWindows.map((item, i) => {
                const isActive = i === activeSeason;

                return (
                  <motion.article
                    key={item.title}
                    ref={(node) => {
                      seasonCardRefs.current[i] = node;
                    }}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: i * 0.08 }}
                    className={`group/card relative w-[82vw] max-w-[31rem] snap-center shrink-0 overflow-hidden rounded-[2.5rem] border p-10 shadow-premium transition-all duration-500 will-change-transform md:w-[35rem] md:p-12 ${
                      isActive
                        ? '-translate-y-2 border-gold-500/30 bg-forest-900/40 opacity-100'
                        : 'border-white/5 bg-forest-900/10 opacity-64 scale-[0.965]'
                    }`}
                  >
                    <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'} bg-gradient-to-br from-white/[0.03] to-transparent`} />
                    <div className={`absolute right-10 top-10 transition-all duration-700 ${isActive ? 'opacity-25' : 'opacity-10'}`}>
                      <span className="font-display text-6xl font-bold tracking-tighter text-gold-400 md:text-7xl">0{i + 1}</span>
                    </div>

                    <div className="relative z-10">
                      <div className="mb-10 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className={`h-px transition-all duration-700 ${isActive ? 'w-14 bg-gold-500/60' : 'w-10 bg-gold-500/30'}`} />
                          <p className="text-[11px] font-bold uppercase tracking-[0.4em] leading-none text-gold-400">
                            {item.window}
                          </p>
                        </div>
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-white/60">
                          {item.focus}
                        </span>
                      </div>

                      <h4 className={`font-display font-bold uppercase leading-tight tracking-tight text-white transition-colors ${isActive ? 'text-4xl md:text-5xl' : 'text-3xl md:text-4xl'}`}>
                        {item.title}
                      </h4>

                      <div className="mb-8 mt-7 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                      <p className="text-base leading-relaxed text-gray-400 transition-colors group-hover/card:text-gray-200 italic">
                        {item.description}
                      </p>

                      <div className="mt-8 flex items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-3 rounded-full border border-gold-400/15 bg-gold-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-300">
                          <span>{item.note}</span>
                        </div>
                        <div className={`h-2 w-2 rounded-full bg-gold-500 transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`} />
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-5 md:flex-row">
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-3 shadow-premium backdrop-blur-md">
                {seasonWindows.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => scrollToSeason(index)}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index === activeSeason ? 'w-12 bg-gold-400' : 'w-2 bg-white/20 hover:bg-white/30'
                    }`}
                    aria-label={`Show ${item.title}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/25 p-2 shadow-premium backdrop-blur-md">
                <button
                  type="button"
                  onClick={() => scrollToSeason(activeSeason - 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/90 transition-all duration-300 hover:-translate-x-0.5 hover:border-gold-400/40 hover:bg-gold-400/10 hover:text-gold-100"
                  aria-label="Previous season window"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToSeason(activeSeason + 1)}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-white/[0.06] text-white/90 transition-all duration-300 hover:translate-x-0.5 hover:border-gold-400/40 hover:bg-gold-400/10 hover:text-gold-100"
                  aria-label="Next season window"
                >
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-gold-500/40">
                Auto-rotating seasonal rhythm
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
