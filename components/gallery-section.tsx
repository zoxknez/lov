'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react';
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

type GalleryGroup = {
  key: string;
  label: string;
  title: string;
  sub: string;
  assets: GalleryAsset[];
};

const previewGridClasses = [
  'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
  'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
  'col-span-2 row-span-1 md:col-span-4 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-6 md:row-span-1',
  'col-span-1 row-span-1 md:col-span-6 md:row-span-1',
] as const;

function formatAssetCount(value: number) {
  return String(value).padStart(2, '0');
}

function isVideoAsset(asset: GalleryAsset): asset is GalleryVideoAsset {
  return asset.kind === 'video';
}

function buildImageSrc(asset: GalleryImageAsset) {
  if (!asset.blobPath) return getBlobAssetUrl(asset.src);

  const params = new URLSearchParams({
    pathname: asset.blobPath,
    fallback: asset.fallbackSrc ?? asset.src,
  });

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

const allArchiveAssets: GalleryAsset[] = [
  ...recentAssets,
  ...trophyAssets,
  ...countyAssets,
  ...backcountryAssets,
  ...lodgeAssets,
  ...stayAssets,
  ...videoAssets,
];

const galleryGroups: GalleryGroup[] = [
  {
    key: 'all',
    label: 'All',
    title: 'Complete Archive',
    sub: 'Every field frame, hosted-stay still, and motion tape from the current archive.',
    assets: allArchiveAssets,
  },
  {
    key: 'video',
    label: 'Field Tapes',
    title: 'Motion Archive',
    sub: 'Premium hosted-stay video clips with cinematic field atmosphere.',
    assets: videoAssets,
  },
  { key: 'trophies', label: 'Trophies', title: 'Trophy Archive', sub: 'Red stag, sika, fallow, and field portraits.', assets: trophyAssets },
  {
    key: 'county',
    label: 'County',
    title: 'County Country',
    sub: 'Bush edges, lower country, and hosted access terrain.',
    assets: countyAssets,
  },
  {
    key: 'backcountry',
    label: 'Backcountry',
    title: 'Backcountry Lines',
    sub: 'Open basins, higher ridges, and deeper terrain.',
    assets: backcountryAssets,
  },
  { key: 'lodge', label: 'Lodge', title: 'Hosted Base', sub: 'Ohakune lodge life and interior frames.', assets: lodgeAssets },
  { key: 'stay', label: 'Stay', title: 'Hosted Stay', sub: 'Smestaj archive and additional accommodation frames.', assets: stayAssets },
  { key: 'recent', label: 'Recent', title: 'Recent Frames', sub: 'Current-season archive.', assets: recentAssets },
];

export default function GallerySection() {
  const [activeKey, setActiveKey] = useState('recent');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const quickBrowseRef = useRef<HTMLDivElement | null>(null);
  const quickBrowseDragRef = useRef({
    isDragging: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
  });
  const suppressThumbnailClickRef = useRef(false);
  const [isDraggingQuickBrowse, setIsDraggingQuickBrowse] = useState(false);

  const active = galleryGroups.find((group) => group.key === activeKey) ?? galleryGroups[0];
  const assets = active.assets;
  const previewAssets = assets.slice(0, previewGridClasses.length);
  const lightboxAsset = lightboxIndex !== null ? assets[lightboxIndex] : null;
  const hasMultipleAssets = assets.length > 1;

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

  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxIndex(null);
        return;
      }

      if (event.key === 'ArrowRight' && assets.length > 1) {
        event.preventDefault();
        setLightboxIndex((current) => (current === null ? null : (current + 1) % assets.length));
      }

      if (event.key === 'ArrowLeft' && assets.length > 1) {
        event.preventDefault();
        setLightboxIndex((current) => (current === null ? null : (current - 1 + assets.length) % assets.length));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, assets.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    thumbnailRefs.current[lightboxIndex]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  }, [activeKey, lightboxIndex]);

  const closeLightbox = () => setLightboxIndex(null);
  const openLightbox = (index: number) => setLightboxIndex(index);
  const showNext = () => setLightboxIndex((current) => (current === null ? null : (current + 1) % assets.length));
  const showPrev = () => setLightboxIndex((current) => (current === null ? null : (current - 1 + assets.length) % assets.length));

  const stopQuickBrowseDrag = () => {
    quickBrowseDragRef.current.isDragging = false;
    quickBrowseDragRef.current.pointerId = -1;
    setIsDraggingQuickBrowse(false);
  };

  const handleQuickBrowsePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const viewport = quickBrowseRef.current;

    if (!viewport) return;

    quickBrowseDragRef.current = {
      isDragging: true,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: viewport.scrollLeft,
    };
    suppressThumbnailClickRef.current = false;
    setIsDraggingQuickBrowse(true);
    viewport.setPointerCapture(event.pointerId);
  };

  const handleQuickBrowsePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = quickBrowseRef.current;
    const drag = quickBrowseDragRef.current;

    if (!viewport || !drag.isDragging || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;

    if (Math.abs(deltaX) > 6) {
      suppressThumbnailClickRef.current = true;
    }

    viewport.scrollLeft = drag.startScrollLeft - deltaX;
  };

  const handleQuickBrowsePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = quickBrowseRef.current;

    if (viewport?.hasPointerCapture(event.pointerId)) {
      viewport.releasePointerCapture(event.pointerId);
    }

    stopQuickBrowseDrag();
  };

  const handleQuickBrowseWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    const viewport = quickBrowseRef.current;

    if (!viewport) return;

    if (Math.abs(event.deltaY) > Math.abs(event.deltaX) && viewport.scrollWidth > viewport.clientWidth) {
      viewport.scrollLeft += event.deltaY;
      event.preventDefault();
    }
  };

  const handleQuickBrowseSelect = (index: number) => {
    if (suppressThumbnailClickRef.current) {
      suppressThumbnailClickRef.current = false;
      return;
    }

    openLightbox(index);
  };

  return (
    <section id="gallery" className={`gallery-lighttable relative overflow-hidden bg-transparent py-20 font-sans md:py-32 ${lightboxIndex !== null ? 'z-[10000]' : 'z-10'}`}>
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
                type="button"
                data-cursor="gallery"
                aria-pressed={activeKey === group.key}
                onClick={() => {
                  setActiveKey(group.key);
                  closeLightbox();
                }}
                className={`group flex items-center gap-3 rounded-full border px-5 py-3 text-[10px] font-black uppercase tracking-[0.28em] transition-all sm:px-6 sm:py-4 ${
                  activeKey === group.key
                    ? 'border-gold-400/50 bg-gold-400/15 text-gold-300 shadow-glow'
                    : 'border-white/10 bg-white/[0.04] text-gray-500 hover:border-gold-400/20 hover:text-white'
                }`}
              >
                <span>{group.label}</span>
                <span
                  className={`inline-flex min-w-[2.2rem] items-center justify-center rounded-full border px-2 py-1 text-[8px] font-black tracking-[0.22em] ${
                    activeKey === group.key
                      ? 'border-gold-400/30 bg-black/25 text-gold-200'
                      : 'border-white/10 bg-black/25 text-white/45 group-hover:text-white/80'
                  }`}
                >
                  {formatAssetCount(group.assets.length)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="mb-10 flex flex-col gap-6 border-b border-white/5 pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="mb-2 text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/40">Active Category</p>
            <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">{active.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-400">{active.sub}</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:gap-4">
            <div className="min-w-[8.5rem] rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-4 shadow-premium backdrop-blur-xl">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/25">In Category</p>
              <p className="stat-number mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white">{formatAssetCount(assets.length)}</p>
            </div>
            <div className="min-w-[8.5rem] rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-4 shadow-premium backdrop-blur-xl">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/25">Preview Grid</p>
              <p className="stat-number mt-2 font-display text-3xl font-bold uppercase tracking-tight text-gold-300">{formatAssetCount(previewAssets.length)}</p>
            </div>
            <div className="min-w-[8.5rem] rounded-[1.5rem] border border-white/10 bg-black/35 px-4 py-4 shadow-premium backdrop-blur-xl">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/25">Archive Sync</p>
              <p className="mt-2 text-[13px] font-black uppercase tracking-[0.34em] text-green-400/80">100%</p>
            </div>
          </div>
        </div>

        <div className="grid auto-rows-[14rem] grid-cols-2 gap-4 md:auto-rows-[18rem] md:grid-cols-12 md:gap-6">
          {previewAssets.map((asset, index) => {
            const gridClass = previewGridClasses[index] ?? 'col-span-1 row-span-1 md:col-span-4 md:row-span-1';

            return (
              <motion.button
                key={`${active.key}-${asset.meta.fileId}`}
                type="button"
                data-cursor="gallery"
                aria-label={`Open ${asset.alt}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                onClick={() => openLightbox(index)}
                className={`gallery-item group relative overflow-hidden rounded-[2.2rem] border border-white/10 shadow-premium transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/35 ${gridClass}`}
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
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 38vw"
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
          <div className="mb-6 flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-[9px] font-black uppercase tracking-[0.6em] text-white/10">Reference Filmstrip // RAW_CAPTURE_STREAM</p>
            <div className="inline-flex items-center justify-center gap-3 self-center rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/55 sm:self-auto">
              <span className="stat-number text-gold-300">{formatAssetCount(assets.length)}</span>
              Assets Ready
            </div>
          </div>
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
            {assets.map((asset, index) => (
              <button
                key={`strip-${asset.meta.fileId}`}
                type="button"
                data-cursor="gallery"
                aria-label={`Open asset ${index + 1}: ${asset.alt}`}
                onClick={() => openLightbox(index)}
                className={`relative h-24 w-40 shrink-0 overflow-hidden rounded-[1.2rem] border text-left transition-all sm:h-28 sm:w-48 ${
                  index === lightboxIndex ? 'scale-[1.02] border-gold-400 shadow-glow' : 'border-white/5 opacity-70 hover:opacity-100'
                }`}
              >
                {isVideoAsset(asset) ? (
                  <video muted playsInline preload="metadata" poster={buildPosterSrc(asset)} className="h-full w-full object-cover">
                    <source src={buildVideoSrc(asset)} type="video/mp4" />
                  </video>
                ) : (
                  <Image src={buildImageSrc(asset)} alt={asset.alt} fill sizes="192px" className="object-cover" />
                )}
                <div className={`absolute inset-0 transition-colors ${index === lightboxIndex ? 'bg-black/10' : 'bg-black/35'}`} />
                {isVideoAsset(asset) && (
                  <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/20 bg-black/55 text-gold-300">
                    <Play className="ml-0.5 h-3 w-3" />
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 p-3">
                  <p className="truncate text-[9px] font-black uppercase tracking-[0.18em] text-gold-300/85">{asset.meta.fileId}</p>
                  <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">{asset.alt}</p>
                </div>
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
            className="fixed inset-0 z-[1000] flex flex-col overflow-hidden bg-forest-950/96 backdrop-blur-3xl"
            onClick={closeLightbox}
            data-lenis-prevent
          >
            <div className="flex-1 min-h-0 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              <div className="mx-auto flex h-full max-w-7xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
                <div className="rounded-[2rem] border border-white/10 bg-black/60 px-4 py-4 shadow-premium backdrop-blur-3xl sm:px-6 sm:py-5">
                  <div className="flex items-start gap-4 sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.35em] text-gold-400/50">
                        {isVideoAsset(lightboxAsset) ? <Video className="h-3 w-3 shrink-0" /> : <ShieldCheck className="h-3 w-3 shrink-0" />}
                        {isVideoAsset(lightboxAsset) ? 'Field Tape' : 'Verified Field Data'}
                      </div>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                          <h2 className="truncate font-display text-xl font-bold uppercase tracking-tight text-white sm:text-3xl">{lightboxAsset.alt}</h2>
                          <p className="mt-1 text-[10px] font-black uppercase tracking-[0.24em] text-white/28">
                            {active.title} | {active.sub}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-3 self-start rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.24em] text-gold-200">
                          <span>Asset</span>
                          <span className="stat-number text-base font-display tracking-tight">
                            {formatAssetCount(lightboxIndex + 1)} / {formatAssetCount(assets.length)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Close expanded gallery view"
                      onClick={closeLightbox}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-all hover:rotate-90 hover:border-gold-400 hover:bg-gold-500 hover:text-black"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-1 min-h-0 flex-col gap-4">
                  <div className="relative flex-1 min-h-0 overflow-hidden rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%),linear-gradient(180deg,rgba(14,20,19,0.94),rgba(6,10,10,0.98))] shadow-premium">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/40" />

                    {hasMultipleAssets && (
                      <>
                        <button
                          type="button"
                          aria-label="Show previous asset"
                          onClick={showPrev}
                          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/40 transition-all hover:border-gold-400 hover:text-gold-300 sm:left-5 sm:h-14 sm:w-14"
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                        <button
                          type="button"
                          aria-label="Show next asset"
                          onClick={showNext}
                          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/40 transition-all hover:border-gold-400 hover:text-gold-300 sm:right-5 sm:h-14 sm:w-14"
                        >
                          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                      </>
                    )}

                    <motion.div
                      key={`${active.key}-${lightboxAsset.meta.fileId}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex h-full min-h-0 w-full items-center justify-center p-4 sm:p-6 lg:p-8"
                    >
                      {isVideoAsset(lightboxAsset) ? (
                        <video
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                          poster={buildPosterSrc(lightboxAsset)}
                          className="h-auto max-h-full w-auto max-w-full rounded-[1.6rem] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                        >
                          <source src={buildVideoSrc(lightboxAsset)} type="video/mp4" />
                        </video>
                      ) : (
                        <Image
                          src={buildImageSrc(lightboxAsset)}
                          alt={lightboxAsset.alt}
                          width={2400}
                          height={1600}
                          priority
                          sizes="100vw"
                          className="h-auto max-h-full w-auto max-w-full select-none rounded-[1.6rem] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                        />
                      )}
                    </motion.div>

                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 sm:bottom-6 sm:left-6 sm:right-6">
                      <div className="rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/70">
                        {isVideoAsset(lightboxAsset) ? `${lightboxAsset.meta.runtime ?? '--:--'} Runtime` : 'Photo Asset'}
                      </div>
                      <div className="rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-gold-200">
                        {lightboxAsset.meta.fileId}
                      </div>
                    </div>
                  </div>

                  <div className="grid shrink-0 gap-4 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.8fr)]">
                    <div className="rounded-[1.6rem] border border-white/10 bg-black/55 p-4 shadow-premium backdrop-blur-3xl sm:p-5">
                      <p className="text-[9px] font-black uppercase tracking-[0.32em] text-gold-400/45">Asset Metadata</p>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                        {[
                          { label: 'Capture Date', value: lightboxAsset.meta.date },
                          { label: 'Field Coords', value: lightboxAsset.meta.coords },
                          { label: 'Medium', value: lightboxAsset.meta.medium },
                          { label: 'Runtime', value: lightboxAsset.meta.runtime ?? 'PHOTO' },
                        ].map((item) => (
                          <div key={item.label} className="flex flex-col gap-1">
                            <span className="text-[7px] font-black uppercase tracking-[0.3em] text-white/30">{item.label}</span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white">{item.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="rounded-[1.6rem] border border-white/10 bg-black/55 p-4 shadow-premium backdrop-blur-3xl sm:p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.32em] text-gold-400/45">Quick Browse</p>
                          <p className="mt-2 text-xs leading-relaxed text-gray-400">Listaj celu kategoriju iz samog prikaza i preskoci odmah na zeljeni frame.</p>
                        </div>
                        <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-white/55">
                          {formatAssetCount(assets.length)}
                        </div>
                      </div>

                      <div
                        ref={quickBrowseRef}
                        className={`no-scrollbar flex gap-3 overflow-x-auto pb-1 select-none ${isDraggingQuickBrowse ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onPointerDown={handleQuickBrowsePointerDown}
                        onPointerMove={handleQuickBrowsePointerMove}
                        onPointerUp={handleQuickBrowsePointerUp}
                        onPointerCancel={handleQuickBrowsePointerUp}
                        onWheel={handleQuickBrowseWheel}
                        style={{ touchAction: 'pan-x' }}
                      >
                        {assets.map((asset, index) => (
                          <button
                            key={`lightbox-strip-${asset.meta.fileId}`}
                            ref={(element) => {
                              thumbnailRefs.current[index] = element;
                            }}
                            type="button"
                            data-cursor="gallery"
                            aria-label={`Open asset ${index + 1}: ${asset.alt}`}
                            onClick={() => handleQuickBrowseSelect(index)}
                            onDragStart={(event) => event.preventDefault()}
                            className={`group relative h-24 w-36 shrink-0 overflow-hidden rounded-[1.25rem] border text-left transition-all sm:h-28 sm:w-44 ${
                              index === lightboxIndex
                                ? 'border-gold-400 bg-gold-400/10 shadow-glow'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                            }`}
                          >
                            {isVideoAsset(asset) ? (
                              <video muted playsInline preload="metadata" poster={buildPosterSrc(asset)} className="h-full w-full object-cover">
                                <source src={buildVideoSrc(asset)} type="video/mp4" />
                              </video>
                            ) : (
                              <Image src={buildImageSrc(asset)} alt={asset.alt} fill sizes="240px" className="object-cover" />
                            )}

                            <div
                              className={`absolute inset-0 transition-colors ${
                                index === lightboxIndex ? 'bg-black/10' : 'bg-black/45 group-hover:bg-black/28'
                              }`}
                            />

                            <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-gold-200">
                              {formatAssetCount(index + 1)}
                            </div>

                            {isVideoAsset(asset) && (
                              <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/20 bg-black/55 text-gold-300">
                                <Play className="ml-0.5 h-3 w-3" />
                              </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 p-3">
                              <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white">{asset.alt}</p>
                              <p className="mt-1 truncate text-[8px] font-black uppercase tracking-[0.2em] text-white/45">{asset.meta.fileId}</p>
                            </div>
                          </button>
                        ))}
                      </div>

                      <p className="mt-4 text-[9px] font-black uppercase tracking-[0.24em] text-white/20">
                        Use arrows, keyboard, or the internal strip to move through the category.
                      </p>
                    </div>
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
