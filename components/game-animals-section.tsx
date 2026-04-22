'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Banknote, Calendar, ChevronLeft, ChevronRight, MapPin, Target, Trophy } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';

type AnimalProfile = {
  name: string;
  scientific: string;
  index: string;
  grade: {
    label: string;
    color: string;
  };
  region: string;
  season: string;
  price: string;
  trophy: string;
  trophyPct: number;
  terrain: string;
  headline: string;
  description: string;
  tags: string[];
  image: string;
  imageCredit?: {
    author: string;
    sourceUrl: string;
    licenseLabel: string;
    licenseUrl: string;
  };
};

const animals: AnimalProfile[] = [
  {
    name: 'Red Deer',
    scientific: 'Cervus elaphus',
    index: '01',
    grade: { label: 'Gold Grade', color: 'text-amber-300 border-amber-400/30 bg-amber-400/8' },
    region: 'North + South Island',
    season: 'Mar - Apr',
    price: '$5,000 - $10,000',
    trophy: '350-400 SCI',
    trophyPct: 92,
    terrain: 'Bush, hill country, alpine basins',
    headline: 'The Classic\nNZ Roar',
    description:
      'Classic New Zealand roar hunting for mature stags in beech bush, open hill country, and alpine basins. The autumn roar window runs from late March into April - vocal, territorial stags at their most aggressive.',
    tags: ['Roar-led autumn timing', 'Mature stag focus', 'NI + SI programs'],
    image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
  },
  {
    name: 'Sika Deer',
    scientific: 'Cervus nippon',
    index: '02',
    grade: { label: 'Signature', color: 'text-gold-300 border-gold-400/30 bg-gold-400/8' },
    region: 'Kaimanawa, Central Plateau',
    season: 'Mar - May',
    price: '$3,000 - $5,000',
    trophy: '160-200 Douglas',
    trophyPct: 80,
    terrain: 'Dense beech and podocarp bush',
    headline: 'Kaimanawa\nSignature',
    description:
      'The only wild sika herd in the Southern Hemisphere. The Kaimanawa whistle period runs late March into May - elusive bush deer, dense cover, and one of the most authentic stalking experiences in New Zealand.',
    tags: ['Signature species', 'Kaimanawa bush stalking', 'Rut-driven whistle timing'],
    image: '/media/hunting area  and deers/sika deer.jpeg',
  },
  {
    name: 'Himalayan Tahr',
    scientific: 'Hemitragus jemlahicus',
    index: '03',
    grade: { label: 'Alpine Rare', color: 'text-sky-300 border-sky-400/30 bg-sky-400/8' },
    region: 'Southern Alps',
    season: 'May - Jul',
    price: '$3,000 - $5,000',
    trophy: '10-13 inches',
    trophyPct: 88,
    terrain: 'Alpine grasslands, remote basins, steep faces',
    headline: 'The Alpine\nTrophy',
    description:
      'Genuine mountain work in the Southern Alps. Winter coat quality and rut timing make May-July the premium window. Steep basins, remote access, and the most physically demanding hunt in the program.',
    tags: ['Winter coat quality', 'Remote alpine terrain', 'Rut-active bulls'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Himalayan%20Tahr%20at%20Dawn.jpg',
    imageCredit: {
      author: 'Megaurab09',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Himalayan_Tahr_at_Dawn.jpg',
      licenseLabel: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    name: 'Fallow Deer',
    scientific: 'Dama dama',
    index: '04',
    grade: { label: 'Select', color: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/8' },
    region: 'North Island private blocks',
    season: 'Apr - May',
    price: '$2,000 - $4,000',
    trophy: '170-200 points',
    trophyPct: 68,
    terrain: 'Open country, private-land blocks',
    headline: 'Exceptional\nFallow Buck Trophies',
    description:
      'Exceptional Fallow buck trophies.',
    tags: ['Autumn rut focus', 'Selective trophy standard', 'Private-land access'],
    image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
  },
  {
    name: 'Chamois',
    scientific: 'Rupicapra rupicapra',
    index: '05',
    grade: { label: 'Alpine', color: 'text-blue-300 border-blue-400/30 bg-blue-400/8' },
    region: 'South Island high country',
    season: 'May - Jun',
    price: '$2,000 - $4,000',
    trophy: '8-10 inches',
    trophyPct: 72,
    terrain: 'Steep alpine faces, high country ridges',
    headline: 'High Country\nStalker',
    description:
      'A wary, agile species that rewards patience and careful glassing from distance. The May-June rut is the favoured buck period - long days on the hill, demanding terrain, and a unique alpine trophy.',
    tags: ['Favoured rut period', 'Steep alpine faces', 'Long glassing sessions'],
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Tatra%20Chamois.jpg',
    imageCredit: {
      author: 'Jakub Frys',
      sourceUrl: 'https://commons.wikimedia.org/wiki/File:Tatra_Chamois.jpg',
      licenseLabel: 'CC BY-SA 4.0',
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    },
  },
  {
    name: 'Rusa Deer',
    scientific: 'Rusa timorensis',
    index: '06',
    grade: { label: 'Specialist', color: 'text-rose-300 border-rose-400/30 bg-rose-400/8' },
    region: 'North Island',
    season: 'Jul - Aug',
    price: '$2,000 - $4,000',
    trophy: 'Late-winter trophy',
    trophyPct: 60,
    terrain: 'Dense cover, river-valley habitat',
    headline: 'Late Winter\nAdd-On',
    description:
      'A dedicated North Island program timed to the rusa rut in July-August. Usually planned as a stand-alone itinerary rather than mixed into autumn deer or alpine programs.',
    tags: ['Later-winter rut timing', 'Dense cover habitat', 'Standalone itinerary'],
    image: '/media/hunting area  and deers/rusa deer.jpeg',
  },
];

export default function GameAnimalsSection({ dict }: { dict: any }) {
  const [active, setActive] = useState(0);
  const animalList = animals.map((a, i) => ({
    ...a,
    name: dict.animals[i]?.name ?? a.name,
    scientific: dict.animals[i]?.scientific ?? a.scientific,
    region: dict.animals[i]?.region ?? a.region,
    season: dict.animals[i]?.season ?? a.season,
    terrain: dict.animals[i]?.terrain ?? a.terrain,
    headline: dict.animals[i]?.headline ?? a.headline,
    description: dict.animals[i]?.description ?? a.description,
    tags: (dict.animals[i]?.tags as string[]) ?? a.tags,
    grade: {
      ...a.grade,
      label: dict.animals[i]?.grade ?? a.grade.label,
    }
  }));

  const animal = animalList[active];
  const animalImageSrc = animal.image.startsWith('https://') ? animal.image : getBlobAssetUrl(animal.image);
  const isExternalImage = animal.image.startsWith('https://');

  return (
    <section id="species" className="relative overflow-hidden bg-transparent py-16 font-sans sm:py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute left-1/4 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-gold-400/3 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400 sm:mb-4 sm:text-[11px] sm:tracking-[0.44em]">
            <TextReveal>{dict.tag}</TextReveal>
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[7rem]">
            <TextReveal delay={0.1}>{dict.title}</TextReveal>
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

        <div className="-mx-4 mb-6 overflow-x-auto px-4 no-scrollbar">
          <div className="flex w-max min-w-full gap-2 md:flex-wrap md:justify-center">
            {animalList.map((item, index) => (
              <button
                key={item.name}
                onClick={() => setActive(index)}
                className={`relative whitespace-nowrap rounded-full border px-4 py-2 text-[9px] font-bold uppercase tracking-[0.14em] transition-all duration-400 sm:px-5 sm:text-[10px] sm:tracking-[0.24em] ${
                  active === index
                    ? 'border-gold-400/50 bg-gold-400/10 text-gold-300 shadow-glow'
                    : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
                }`}
              >
                {active === index && (
                  <motion.span layoutId="species-pill" className="absolute inset-0 rounded-full bg-gold-400/5" />
                )}
                <span className="relative">{item.name}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={animal.name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid gap-4 sm:gap-6 lg:grid-cols-5"
          >
            <div className="relative min-h-[300px] overflow-hidden rounded-[1.8rem] sm:min-h-[440px] md:rounded-[2.5rem] lg:col-span-2 lg:min-h-[560px]">
              <Image
                src={animalImageSrc}
                alt={animal.name}
                fill
                sizes="(max-width: 1023px) 100vw, 40vw"
                unoptimized={isExternalImage}
                className="object-cover transition-transform duration-[2000ms] scale-105 hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />

              <div className="pointer-events-none absolute left-5 top-5 sm:left-6 sm:top-6">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>
              <div className="pointer-events-none absolute right-5 top-5 flex flex-col items-end sm:right-6 sm:top-6">
                <div className="h-8 w-px bg-gold-400/50" />
                <div className="h-px w-8 bg-gold-400/50" />
              </div>

              <div className="absolute left-4 right-16 top-4 flex justify-start sm:left-1/2 sm:right-auto sm:top-6 sm:-translate-x-1/2 sm:justify-center">
                <span className="truncate rounded-full border border-white/15 bg-black/50 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.12em] text-white/60 backdrop-blur-md sm:tracking-[0.18em]">
                  {animal.scientific}
                </span>
              </div>

              <div className="absolute right-4 top-4 font-display text-5xl font-bold leading-none text-white/[0.06] select-none sm:top-6 sm:right-8 sm:text-7xl">
                {animal.index}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8">
                <span className={`mb-3 inline-block rounded-full border px-3 py-1 text-[8px] font-bold uppercase tracking-[0.16em] backdrop-blur-md sm:mb-4 sm:text-[9px] sm:tracking-[0.22em] ${animal.grade.color}`}>
                  {animal.grade.label}
                </span>
                <h3 className="whitespace-pre-line font-display text-[1.95rem] font-bold uppercase leading-tight text-white sm:text-4xl">
                  {animal.headline}
                </h3>
                {animal.imageCredit && (
                  <p className="mt-3 text-[10px] leading-relaxed text-white/55">
                    {dict.photoCredit}:{' '}
                    <a
                      href={animal.imageCredit.sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                    >
                      {animal.imageCredit.author}
                    </a>{' '}
                    / {dict.wikimediaCommons} /{' '}
                    <a
                      href={animal.imageCredit.licenseUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="underline decoration-white/20 underline-offset-4 transition-colors hover:text-white"
                    >
                      {animal.imageCredit.licenseLabel}
                    </a>
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4 sm:gap-5 lg:col-span-3">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium sm:p-8 md:rounded-[2rem] has-beam">
                <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/50 to-transparent" />
                <div className="absolute left-0 top-0 h-10 w-px bg-gradient-to-b from-gold-400/30 to-transparent" />

                <div className="mb-5 flex flex-col items-start gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-display text-[1.9rem] font-bold uppercase tracking-tight text-white sm:text-4xl">{animal.name}</h4>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400/50">{animal.scientific}</p>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.22em] ${animal.grade.color}`}>
                    {animal.grade.label}
                  </span>
                </div>

                <p className="text-sm leading-relaxed text-gray-300 sm:text-base">{animal.description}</p>

                <div className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_240px] lg:items-end">
                  <div className="flex flex-wrap gap-2">
                    {animal.tags.map((tag) => (
                      <span
                        key={tag}
                      className="rounded-full border border-gold-400/15 bg-gold-400/5 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.16em] text-gold-300 sm:px-4 sm:text-[9px] sm:tracking-[0.2em]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="relative overflow-hidden rounded-[1.5rem] border border-gold-400/18 bg-black/20 px-5 py-4 shadow-[0_18px_40px_-26px_rgba(200,169,110,0.55)] backdrop-blur-xl lg:ml-auto">
                    <div className="absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/65 to-transparent" />
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-gold-400/18 bg-gold-400/8 text-gold-300">
                        <Banknote className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.28em] text-gold-400/55">{dict.cardPriceGuide}</p>
                        <p className="mt-2 font-display text-2xl font-bold leading-none tracking-tight text-white tabular-nums">
                          {animal.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                {[
                  { icon: Trophy, label: dict.cardTrophyScore, value: animal.trophy },
                  { icon: Calendar, label: dict.cardSeasonWindow, value: animal.season },
                  { icon: MapPin, label: dict.cardTerritory, value: animal.region },
                  { icon: Target, label: dict.cardTerrain, value: animal.terrain },
                ].map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.label}
                      className="group rounded-[1.4rem] border border-white/8 bg-forest-900/20 p-4 shadow-premium transition-all hover:border-gold-400/20 sm:rounded-[1.6rem] sm:p-5"
                    >
                      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl border border-gold-400/15 bg-gold-400/8 text-gold-400 transition-transform group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      <p className="mb-1 text-[8px] font-bold uppercase tracking-[0.24em] text-gold-400/50">{stat.label}</p>
                      <p className="text-sm font-bold leading-relaxed text-white">{stat.value}</p>
                      {stat.label === dict.cardTrophyScore && (
                        <div className="mt-3 h-px w-full overflow-hidden rounded-full bg-white/5">
                          <motion.div
                            key={animal.name}
                            className="h-full rounded-full bg-gradient-to-r from-gold-400/70 to-gold-300/30"
                            initial={{ width: 0 }}
                            animate={{ width: `${animal.trophyPct}%` }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.6rem] border border-white/8 bg-forest-900/20 px-4 py-3 sm:flex-nowrap sm:px-6 sm:py-4">
                <button
                  onClick={() => setActive((active - 1 + animalList.length) % animalList.length)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-gold-300 sm:text-[10px] sm:tracking-[0.18em]"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Prev
                </button>
                <div className="order-first flex w-full justify-center gap-1.5 sm:order-none sm:w-auto">
                  {animalList.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActive(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${index === active ? 'w-6 bg-gold-400' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                      aria-label={`Go to species ${index + 1}`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setActive((active + 1) % animalList.length)}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-gray-400 transition-colors hover:text-gold-300 sm:text-[10px] sm:tracking-[0.18em]"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative mt-8 overflow-hidden rounded-[1.8rem] border border-gold-500/10 bg-forest-900/30 p-5 text-center shadow-premium backdrop-blur-xl sm:mt-10 sm:p-10 md:rounded-[2rem]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-forest-600/5" />
          <p className="relative mx-auto max-w-3xl font-display text-lg font-light italic leading-relaxed text-gray-300 sm:text-xl">
            {dict.footerText}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
