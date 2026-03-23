'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import MagneticButton from '@/components/magnetic-button';
import TextReveal from '@/components/text-reveal';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';

type GalleryImage = {
  src: string;
  alt: string;
  blobPath?: string;
  fallbackSrc?: string;
};

function buildBlobImageSrc(image: GalleryImage) {
  if (!image.blobPath) return getBlobAssetUrl(image.src);
  const params = new URLSearchParams({ pathname: image.blobPath, fallback: image.fallbackSrc ?? image.src });
  return `/api/blob-image?${params.toString()}`;
}

const galleries = [
  {
    key: 'all',
    label: 'All',
    title: 'Curated',
    sub: 'A first read of the Kaimanawa experience',
    images: null as null | GalleryImage[],
  },
  {
    key: 'trophies',
    label: 'Trophies',
    title: 'Trophy Archive',
    sub: 'Red stag · Sika · Fallow',
    images: [
      { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red stag trophy portrait' },
      { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika stag trophy portrait' },
      { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow buck trophy portrait' },
      { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Country and trophy moment' },
    ] as GalleryImage[],
  },
  {
    key: 'country',
    label: 'Country',
    title: 'The Territory',
    sub: 'North Island bush · Alpine reach',
    images: [
      { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'North Island hill country' },
      { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Native bush and ridgelines' },
      { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', alt: 'Remote backcountry cover' },
      { src: '/media/hunting area  and deers/main  photo. small size .png', alt: 'Forest valley approach' },
    ] as GalleryImage[],
  },
  {
    key: 'lodge',
    label: 'Lodge',
    title: 'Hosted Base',
    sub: 'Ohakune lodge life',
    images: [
      { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', alt: 'Ohakune lodge exterior' },
      { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg', alt: 'Shared dining area' },
      { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg', alt: 'Lounge and recovery space' },
      { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg', alt: 'Guest room interior' },
    ] as GalleryImage[],
  },
  {
    key: 'recent',
    label: 'Recent',
    title: 'Recent Frames',
    sub: 'Current-season archive',
    images: gallerySlike.map((img) => ({
      src: img.localSrc,
      fallbackSrc: img.localSrc,
      blobPath: img.blobPath,
      alt: img.alt,
    })) as GalleryImage[],
  },
];

export default function GallerySection() {
  const [activeKey, setActiveKey] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build curated 'all' images
  const allImages: GalleryImage[] = [
    galleries[1].images![0],
    galleries[2].images![1],
    galleries[1].images![1],
    galleries[3].images![0],
    galleries[2].images![2],
    galleries[3].images![1],
  ];
  const galleryCollections = galleries.map((gallery) =>
    gallery.key === 'all' ? { ...gallery, images: allImages } : gallery
  );

  const active = galleryCollections.find((g) => g.key === activeKey)!;
  const images = active.images ?? allImages;
  const featured = images.slice(0, 6);
  const strip = images.slice(0, Math.min(images.length, 10));

  const next = () => setLightboxIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % images.length : null));
  const prev = () => setLightboxIndex((prevIndex) => (prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : null));
  const lightboxImg = lightboxIndex !== null ? images[lightboxIndex] : null;

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prevIndex) => (prevIndex !== null ? (prevIndex + 1) % images.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prevIndex) => (prevIndex !== null ? (prevIndex - 1 + images.length) % images.length : null));
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, images.length]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-transparent py-20 md:py-32 font-sans">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-gold-600/4 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">

        {/* ── Header ── */}
        <div className="mb-12 flex flex-col items-center text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400">
            <TextReveal>The Visual Archive</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8rem] leading-none">
            <TextReveal delay={0.1}>Gallery</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mt-6 flex items-center gap-3"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/50 to-transparent" />
          </motion.div>
          <p className="mx-auto mt-6 max-w-xl text-sm italic text-gray-400 sm:text-base">
            <TextReveal delay={0.3}>Trophy portraits, country texture, field rhythm, and lodge atmosphere.</TextReveal>
          </p>
        </div>

        {/* ── Category Tabs ── */}
        <div className="-mx-4 mb-6 overflow-x-auto px-4 no-scrollbar md:mx-0 md:px-0">
          <div className="flex w-max min-w-full gap-2 md:flex-wrap md:justify-center">
          {galleryCollections.map((g) => (
            <button
              key={g.key}
              onClick={() => { setActiveKey(g.key); setLightboxIndex(null); }}
              className={`relative flex items-center gap-2.5 whitespace-nowrap rounded-full border px-5 py-2.5 text-[10px] font-bold uppercase tracking-[0.22em] transition-all duration-400 sm:px-6 sm:tracking-[0.28em] ${
                activeKey === g.key
                  ? 'border-gold-400/50 bg-gold-400/10 text-gold-300 shadow-glow'
                  : 'border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/20 hover:text-white'
              }`}
            >
              {activeKey === g.key && (
                <motion.span layoutId="gallery-cat-dot" className="h-1.5 w-1.5 rounded-full bg-gold-400" />
              )}
              {g.label}
              <span className={`text-[8px] tabular-nums ${activeKey === g.key ? 'text-gold-400/60' : 'text-gray-600'}`}>
                {g.images?.length ?? 0}
              </span>
            </button>
          ))}
          </div>
        </div>

        {/* ── Active Category Label ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35 }}
            className="mb-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">{active.title}</h3>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/55">{active.sub}</p>
            </div>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-[9px] font-bold uppercase tracking-[0.26em] text-gray-500">
              {images.length} frames
            </span>
          </motion.div>
        </AnimatePresence>

        {/* ── Masonry Grid ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeKey + '-grid'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid auto-rows-[8.5rem] grid-cols-2 gap-3 sm:auto-rows-[11rem] sm:gap-4 md:auto-rows-[13rem] md:grid-cols-12 md:gap-5"
          >
            {featured.map((img, i) => {
              const src = buildBlobImageSrc(img);
              const grid = [
                'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
                'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
                'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
                'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
                'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
                'col-span-2 row-span-1 md:col-span-4 md:row-span-1',
              ][i];

              return (
                <motion.button
                  key={`${activeKey}-${i}`}
                  type="button"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setLightboxIndex(i)}
                  data-cursor="gallery"
                  className={`group relative overflow-hidden rounded-[2rem] border border-white/8 shadow-premium transition-all duration-700 hover:-translate-y-1 hover:border-gold-400/30 ${grid}`}
                >
                  <Image
                    src={src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[2000ms] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                  {/* Gold shimmer on hover */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,169,110,0.15),transparent_50%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  {/* Frame badge */}
                  <div className="absolute left-5 top-5">
                    <span className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-md">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Expand icon */}
                  <div className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-gold-400/15 bg-gold-400/8 text-gold-300 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-12">
                    <Maximize2 className="h-4 w-4" />
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* ── Filmstrip ── */}
        <div className="mt-4 rounded-[1.6rem] border border-white/8 bg-black/15 p-3 shadow-premium backdrop-blur-xl sm:mt-5 sm:rounded-[1.8rem] sm:p-4">
          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {strip.map((img, i) => (
              <button
                key={`strip-${activeKey}-${i}`}
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group relative h-16 w-24 shrink-0 overflow-hidden rounded-[1rem] border border-white/8 transition-all hover:border-gold-400/30 sm:h-20 sm:w-28 sm:rounded-[1.2rem] md:h-24 md:w-36"
              >
                <Image src={buildBlobImageSrc(img)} alt={img.alt} fill sizes="160px" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 transition-opacity group-hover:bg-black/20" />
                <span className="absolute left-2 top-2 rounded-full bg-black/50 px-1.5 py-0.5 text-[7px] font-bold text-gold-300">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-forest-950/96 backdrop-blur-2xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top bar */}
            <div className="absolute inset-x-0 top-0 z-[110] flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between md:px-10 md:py-5">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-5 py-3 backdrop-blur-xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400/60">{active.title}</p>
                <p className="mt-1 font-display text-base font-bold uppercase tracking-tight text-white sm:text-lg">{lightboxImg.alt}</p>
                <p className="mt-0.5 text-[9px] text-gold-300/50 font-bold uppercase tracking-widest">
                  {lightboxIndex + 1} / {images.length}
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
                className="self-end flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 backdrop-blur-xl transition-all hover:border-gold-400/40 hover:text-gold-200 sm:self-auto sm:h-12 sm:w-12"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Arrows */}
            <div className="absolute inset-y-0 left-0 right-0 z-[109] hidden items-center justify-between px-6 md:flex md:px-8">
              <MagneticButton strength={0.3} onClick={(e) => { e.stopPropagation(); prev(); }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 backdrop-blur-xl transition-all hover:border-gold-400/30 hover:text-gold-200">
                <ChevronLeft className="h-6 w-6" />
              </MagneticButton>
              <MagneticButton strength={0.3} onClick={(e) => { e.stopPropagation(); next(); }}
                className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 backdrop-blur-xl transition-all hover:border-gold-400/30 hover:text-gold-200">
                <ChevronRight className="h-6 w-6" />
              </MagneticButton>
            </div>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="relative z-[105] mx-auto flex h-full max-w-6xl items-center justify-center px-4 pb-36 pt-28 sm:px-6 md:px-20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20 shadow-premium">
                <Image src={buildBlobImageSrc(lightboxImg)} alt={lightboxImg.alt} width={1920} height={1280} className="max-h-full max-w-full object-contain" />
              </div>
            </motion.div>

            {/* Bottom strip */}
            <div className="absolute inset-x-0 bottom-0 z-[110] px-4 pb-4 sm:px-6 sm:pb-5 md:px-10">
              <div className="mx-auto max-w-5xl rounded-[1.6rem] border border-white/10 bg-black/30 p-3 backdrop-blur-xl sm:rounded-[1.8rem] sm:p-4">
                <div className="mb-3 flex items-center justify-between gap-3 md:hidden">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); prev(); }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); next(); }}
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-300"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="no-scrollbar flex gap-3 overflow-x-auto">
                  {strip.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setLightboxIndex(i); }}
                      className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border transition-all sm:h-16 sm:w-24 md:h-20 md:w-28 ${
                        i === lightboxIndex ? 'border-gold-400/60' : 'border-white/10 hover:border-gold-400/20'
                      }`}
                    >
                      <Image src={buildBlobImageSrc(img)} alt={img.alt} fill sizes="128px" className="object-cover" />
                      <div className={`absolute inset-0 transition-opacity ${i === lightboxIndex ? 'bg-black/10' : 'bg-black/50'}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
