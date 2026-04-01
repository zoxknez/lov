'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, ChevronLeft, ChevronRight, Locate, Maximize2, Play, ShieldCheck, Video, X } from 'lucide-react';
import TextReveal from '@/components/text-reveal';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { backcountryMedia, countyMedia, lodgeAccommodationMedia, stayMedia, stayVideoMedia, type VideoMediaItem } from '@/lib/media-collections';

type AssetMeta = {
  fileId: string;
  coords: string;
  date: string;
  status: string;
  medium: 'PHOTO' | 'VIDEO';
  runtime?: string;
};

type GalleryImageAsset = {
  kind: 'image';
  src: string;
  alt: string;
  blobPath?: string;
  fallbackSrc?: string;
  meta: AssetMeta;
};

type GalleryVideoAsset = {
  kind: 'video';
  src: string;
  poster: string;
  alt: string;
  orientation: 'landscape' | 'portrait';
  meta: AssetMeta;
};

type GalleryAsset = GalleryImageAsset | GalleryVideoAsset;

function isVideoAsset(asset: GalleryAsset): asset is GalleryVideoAsset {
  return asset.kind === 'video';
}

function buildImageSrc(asset: GalleryImageAsset) {
  if (!asset.blobPath) return getBlobAssetUrl(asset.src);
  const params = new URLSearchParams({ pathname: asset.blobPath, fallback: asset.fallbackSrc ?? asset.src });
  return `/api/blob-image?${params.toString()}`;
}

function buildVideoSrc(asset: GalleryVideoAsset) {
  return getBlobAssetUrl(asset.src);
}

function buildPosterSrc(asset: GalleryVideoAsset) {
  return getBlobAssetUrl(asset.poster);
}

function buildImageSet(
  prefix: string,
  media: { src: string; alt: string }[],
  coords: string,
  date: string,
  status: string,
) {
  return media.map((image, index) => ({
    kind: 'image' as const,
    src: image.src,
    alt: image.alt,
    meta: {
      fileId: `${prefix}-${String(index + 1).padStart(2, '0')}`,
      coords,
      date,
      status,
      medium: 'PHOTO' as const,
    },
  })) satisfies GalleryImageAsset[];
}

function buildVideoSet(
  prefix: string,
  media: VideoMediaItem[],
  coords: string,
  date: string,
  status: string,
) {
  return media.map((video, index) => ({
    kind: 'video' as const,
    src: video.src,
    poster: video.poster,
    alt: video.alt,
    orientation: video.orientation,
    meta: {
      fileId: `${prefix}-${String(index + 1).padStart(2, '0')}`,
      coords,
      date,
      status,
      medium: 'VIDEO' as const,
      runtime: video.durationLabel,
    },
  })) satisfies GalleryVideoAsset[];
}

const trophyAssets: GalleryAsset[] = [
  {
    kind: 'image',
    src: '/media/hunting area  and deers/Red Deer Stag.jpg',
    alt: 'Red stag trophy portrait',
    meta: { fileId: 'TG-RD-01', coords: '39.12S 175.40E', date: 'April 2025', status: 'ARCHIVED', medium: 'PHOTO' },
  },
  {
    kind: 'image',
    src: '/media/hunting area  and deers/Sika  deer Stag.jpg',
    alt: 'Sika stag trophy portrait',
    meta: { fileId: 'TG-SK-02', coords: '39.05S 175.45E', date: 'March 2025', status: 'ARCHIVED', medium: 'PHOTO' },
  },
  {
    kind: 'image',
    src: '/media/hunting area  and deers/Fellow  deer.jpg',
    alt: 'Fallow buck trophy portrait',
    meta: { fileId: 'TG-FL-03', coords: '39.18S 175.52E', date: 'May 2025', status: 'ARCHIVED', medium: 'PHOTO' },
  },
  {
    kind: 'image',
    src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg',
    alt: 'Country and trophy moment',
    meta: { fileId: 'TG-CT-04', coords: '38.15S 176.10E', date: 'April 2025', status: 'ARCHIVED', medium: 'PHOTO' },
  },
];

const countyAssets = buildImageSet('CTY', countyMedia, 'North Island county', 'March 2026', 'FIELD-READY');
const backcountryAssets = buildImageSet('BKC', backcountryMedia, 'High-country basin', 'March 2026', 'ACTIVE');
const lodgeAssets = buildImageSet('LDG', lodgeAccommodationMedia, '39.27S 175.58E', 'Base Log', 'OPERATIONAL');
const stayAssets = buildImageSet('STY', stayMedia, 'Hosted hillside stay', 'March 2026', 'READY');
const videoAssets = buildVideoSet('VID', stayVideoMedia, 'Hosted hillside stay', 'March 2026', 'ACTIVE');
const recentAssets = gallerySlike.map((img, index) => ({
  kind: 'image' as const,
  src: img.localSrc,
  fallbackSrc: img.localSrc,
  blobPath: img.blobPath,
  alt: img.alt,
  meta: {
    fileId: `RF-${String(index + 1).padStart(2, '0')}`,
    coords: '39.25S 175.50E',
    date: 'Recent',
    status: 'NEW',
    medium: 'PHOTO' as const,
  },
})) satisfies GalleryImageAsset[];

const allAssets: GalleryAsset[] = [
  trophyAssets[0],
  countyAssets[0],
  videoAssets[0],
  backcountryAssets[0],
  lodgeAssets[0],
  stayAssets[0],
];

const galleryGroups: Array<{ key: string; label: string; title: string; sub: string; assets: GalleryAsset[] }> = [
  { key: 'all', label: 'All', title: 'Visual Archive', sub: 'Full-spectrum field operations log', assets: allAssets },
  { key: 'video', label: 'Field Tapes', title: 'Motion Archive', sub: 'Premium hosted-stay video clips with cinematic field atmosphere', assets: videoAssets },
  { key: 'trophies', label: 'Trophies', title: 'Trophy Archive', sub: 'Red stag | Sika | Fallow', assets: trophyAssets },
  { key: 'county', label: 'County', title: 'County Country', sub: 'Bush edges, lower country, and hosted access terrain', assets: countyAssets },
  { key: 'backcountry', label: 'Backcountry', title: 'Backcountry Lines', sub: 'Open basins, higher ridges, and deeper terrain', assets: backcountryAssets },
  { key: 'lodge', label: 'Lodge', title: 'Hosted Base', sub: 'Ohakune lodge life', assets: lodgeAssets },
  { key: 'stay', label: 'Stay', title: 'Hosted Stay', sub: 'Smestaj archive and additional accommodation frames', assets: stayAssets },
  { key: 'recent', label: 'Recent', title: 'Recent Frames', sub: 'Current-season archive', assets: recentAssets },
];

export default function GallerySection() {
  const [activeKey, setActiveKey] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const active = galleryGroups.find((group) => group.key === activeKey) ?? galleryGroups[0];
  const assets = active.assets;
  const lightboxAsset = lightboxIndex !== null ? assets[lightboxIndex] : null;

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.classList.add('modal-active');
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-active');
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.classList.remove('modal-active');
    };
  }, [lightboxIndex]);

  const closeLightbox = () => setLightboxIndex(null);
  const openLightbox = (index: number) => setLightboxIndex(index);
  const showNext = () => setLightboxIndex((current) => (current === null ? null : (current + 1) % assets.length));
  const showPrev = () => setLightboxIndex((current) => (current === null ? null : (current - 1 + assets.length) % assets.length));

  return (
    <section id="gallery" className={`relative overflow-hidden bg-transparent py-20 font-sans md:py-32 ${lightboxIndex !== null ? 'z-[10000]' : 'z-10'}`}>
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-gold-600/4 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.02]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.6em] text-gold-400/60">Operational Visual Archive // Log.2026</p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8.5rem]">
            <TextReveal delay={0.1}>Gallery</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 140, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.35 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            <div className="h-2 w-2 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20 shadow-glow" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/40 to-transparent" />
          </motion.div>
          <p className="mx-auto mt-8 max-w-2xl text-sm italic leading-relaxed text-white/40 sm:text-lg">
            &ldquo;Trophy portraits, county lines, backcountry texture, lodge comfort, and the new motion archive from the smestaj collection.&rdquo;
          </p>
        </div>

        <div className="-mx-4 mb-10 overflow-x-auto px-4 no-scrollbar">
          <div className="flex w-max min-w-full gap-3 md:flex-wrap md:justify-center">
            {galleryGroups.map((group) => (
              <button
                key={group.key}
                onClick={() => {
                  setActiveKey(group.key);
                  closeLightbox();
                }}
                className={`rounded-full border px-6 py-4 text-[10px] font-black uppercase tracking-[0.32em] transition-all ${
                  activeKey === group.key
                    ? 'border-gold-400/50 bg-gold-400/15 text-gold-300 shadow-glow'
                    : 'border-white/10 bg-white/[0.04] text-gray-500 hover:border-gold-400/20 hover:text-white'
                }`}
              >
                {group.label}
                <span className={`ml-3 text-[8px] ${activeKey === group.key ? 'text-gold-400/60' : 'text-white/15'}`}>{group.assets.length}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-6 border-b border-white/5 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/40">Active Category</p>
            <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">{active.title}</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-400">{active.sub}</p>
          </div>
          <div className="flex gap-8">
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Archive Sync</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-green-500/60">100%</p>
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">Assets Localized</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-widest text-white/40">{assets.length}</p>
            </div>
          </div>
        </div>

        <div className="grid auto-rows-[14rem] grid-cols-2 gap-4 md:auto-rows-[18rem] md:grid-cols-12 md:gap-6">
          {assets.slice(0, Math.min(assets.length, 8)).map((asset, index) => {
            const gridClass = [
              'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
              'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
              'col-span-2 row-span-1 md:col-span-4 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-6 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-6 md:row-span-1',
            ][index] ?? 'col-span-1 row-span-1 md:col-span-4 md:row-span-1';

            return (
              <motion.button
                key={`${active.key}-${asset.meta.fileId}`}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                onClick={() => openLightbox(index)}
                className={`group relative overflow-hidden rounded-[2.2rem] border border-white/10 shadow-premium transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/35 ${gridClass}`}
              >
                {isVideoAsset(asset) ? (
                  <video
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    poster={buildPosterSrc(asset)}
                    className="h-full w-full object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                  >
                    <source src={buildVideoSrc(asset)} type="video/mp4" />
                  </video>
                ) : (
                  <Image
                    src={buildImageSrc(asset)}
                    alt={asset.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover transition-transform duration-[5000ms] group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                <div className="absolute inset-5 border border-white/5 opacity-40 transition-opacity group-hover:opacity-100" />

                <div className="absolute left-6 top-6 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-gold-300">
                  {asset.meta.fileId}
                </div>

                {isVideoAsset(asset) && (
                  <>
                    <div className="absolute right-6 top-6 rounded-full border border-gold-400/20 bg-black/50 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-white/70">
                      {asset.meta.runtime}
                    </div>
                    <div className="absolute right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300 shadow-glow">
                      <Play className="ml-1 h-5 w-5" />
                    </div>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                  <div className="mb-3 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.24em] text-gold-400/60">
                    {isVideoAsset(asset) ? <Video className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                    {isVideoAsset(asset) ? 'Motion Asset' : asset.meta.status}
                  </div>
                  <p className="font-display text-xl font-bold uppercase leading-tight text-white sm:text-2xl">{asset.alt}</p>
                  <div className="mt-4 flex flex-wrap gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-3 w-3 text-gold-400/60" />
                      {asset.meta.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <Locate className="h-3 w-3 text-gold-400/60" />
                      {asset.meta.coords}
                    </span>
                  </div>
                </div>

                {!isVideoAsset(asset) && (
                  <div className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/40 transition-all group-hover:border-gold-400/40 group-hover:text-gold-300">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        <div className="mt-12 rounded-[2.5rem] border border-white/5 bg-black/40 p-6 shadow-premium backdrop-blur-3xl sm:p-8">
          <p className="mb-6 text-center text-[9px] font-black uppercase tracking-[0.6em] text-white/10">Reference Filmstrip // RAW_CAPTURE_STREAM</p>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
            {assets.map((asset, index) => (
              <button
                key={`strip-${asset.meta.fileId}`}
                type="button"
                onClick={() => openLightbox(index)}
                className={`relative h-24 w-40 shrink-0 overflow-hidden rounded-[1.2rem] border transition-all sm:h-28 sm:w-48 ${
                  index === lightboxIndex ? 'scale-[1.02] border-gold-400 shadow-glow' : 'border-white/5 opacity-50 hover:opacity-100'
                }`}
              >
                {isVideoAsset(asset) ? (
                  <video muted playsInline preload="metadata" poster={buildPosterSrc(asset)} className="h-full w-full object-cover">
                    <source src={buildVideoSrc(asset)} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={buildImageSrc(asset)} alt={asset.alt} fill className="object-cover" />
                )}
                <div className={`absolute inset-0 ${index === lightboxIndex ? 'bg-transparent' : 'bg-black/30'}`} />
                {isVideoAsset(asset) && (
                  <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/20 bg-black/55 text-gold-300">
                    <Play className="ml-0.5 h-3 w-3" />
                  </div>
                )}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] font-black uppercase tracking-widest text-gold-400/40">
                  FRM_{String(index + 1).padStart(2, '0')}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxAsset && lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col bg-forest-950/98 backdrop-blur-3xl"
            onClick={closeLightbox}
            data-lenis-prevent
          >
            <div className="shrink-0 px-4 pb-6 pt-16 sm:px-10 sm:pb-10 sm:pt-32" onClick={(event) => event.stopPropagation()}>
              <div className="mx-auto max-w-7xl rounded-[2rem] border border-white/10 bg-black/60 p-4 shadow-premium backdrop-blur-3xl sm:p-5">
                <div className="flex items-center gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] text-gold-400/50">
                      {isVideoAsset(lightboxAsset) ? <Video className="h-3 w-3 shrink-0" /> : <ShieldCheck className="h-3 w-3 shrink-0" />}
                      {isVideoAsset(lightboxAsset) ? 'Field Tape' : 'Verified Field Data'}
                    </div>
                    <h2 className="truncate font-display text-lg font-bold uppercase tracking-tight text-white sm:text-3xl">{lightboxAsset.alt}</h2>
                  </div>
                  <button
                    onClick={closeLightbox}
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-all hover:rotate-90 hover:border-gold-400 hover:bg-gold-500 hover:text-black"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative flex-1 px-4 sm:px-8" onClick={(event) => event.stopPropagation()}>
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-premium sm:rounded-[3rem]">
                <button
                  onClick={showPrev}
                  className="absolute left-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/40 transition-all hover:border-gold-400 hover:text-gold-300 sm:left-6 sm:h-14 sm:w-14"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={showNext}
                  className="absolute right-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/40 transition-all hover:border-gold-400 hover:text-gold-300 sm:right-6 sm:h-14 sm:w-14"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>

                <div className="flex h-full w-full items-center justify-center p-6 sm:p-10">
                  {isVideoAsset(lightboxAsset) ? (
                    <video
                      controls
                      autoPlay
                      playsInline
                      preload="metadata"
                      poster={buildPosterSrc(lightboxAsset)}
                      className="max-h-full max-w-full rounded-[1.6rem] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                    >
                      <source src={buildVideoSrc(lightboxAsset)} type="video/mp4" />
                    </video>
                  ) : (
                    <Image
                      src={buildImageSrc(lightboxAsset)}
                      alt={lightboxAsset.alt}
                      width={2560}
                      height={1440}
                      className="max-h-full max-w-full object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="shrink-0 px-4 py-4 sm:px-8 sm:py-5" onClick={(event) => event.stopPropagation()}>
              <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-black/60 px-5 py-4 shadow-premium backdrop-blur-3xl sm:px-8 sm:py-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-10 sm:gap-y-0">
                    {[
                      { label: 'File Hash', value: lightboxAsset.meta.fileId },
                      { label: 'Field Coords', value: lightboxAsset.meta.coords },
                      { label: 'Capture Date', value: lightboxAsset.meta.date },
                      { label: 'Medium', value: lightboxAsset.meta.medium },
                      { label: 'Runtime', value: lightboxAsset.meta.runtime ?? 'PHOTO' },
                    ].map((item) => (
                      <div key={item.label} className="flex flex-col gap-1">
                        <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/30">{item.label}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white">{item.value}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.4em] text-gold-400/30">
                    Asset {String(lightboxIndex + 1).padStart(2, '0')} / {String(assets.length).padStart(2, '0')}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
