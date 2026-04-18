'use client';

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Calendar, ChevronLeft, ChevronRight, Locate, Maximize2, Play, ShieldCheck, Video, X } from 'lucide-react';
import TextReveal from '@/components/text-reveal';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import {
  buildFallbackGalleryGroups,
  getFirstActiveGalleryKey,
  type GalleryAsset,
  type GalleryGroup,
  type GalleryImageAsset,
  type GalleryVideoAsset,
} from '@/lib/gallery-core';

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
  if (asset.blobPath) {
    const params = new URLSearchParams({
      pathname: asset.blobPath,
      fallback: asset.fallbackSrc ?? asset.src,
    });

    return `/api/blob-image?${params.toString()}`;
  }

  return getBlobAssetUrl(asset.src);
}

function buildPosterSrc(asset: GalleryVideoAsset) {
  if (asset.posterBlobPath) {
    const params = new URLSearchParams({
      pathname: asset.posterBlobPath,
      fallback: asset.posterFallbackSrc ?? asset.poster,
    });

    return `/api/blob-image?${params.toString()}`;
  }

  return getBlobAssetUrl(asset.poster);
}

function getGalleryTone(key: GalleryGroup['key']) {
  switch (key) {
    case 'red-deer':
      return {
        dot: 'bg-amber-300',
        line: 'via-amber-300/65',
        activeContainer: 'border-amber-300/35 bg-[linear-gradient(135deg,rgba(251,191,36,0.16),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(251,191,36,0.08),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-amber-300/20 hover:bg-amber-300/[0.06]',
        activeBadge: 'border-amber-300/30 bg-amber-300/12 text-amber-100',
        activeLabel: 'text-amber-100',
      };
    case 'sika-deer':
      return {
        dot: 'bg-gold-300',
        line: 'via-gold-300/65',
        activeContainer: 'border-gold-300/35 bg-[linear-gradient(135deg,rgba(212,175,55,0.16),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(212,175,55,0.08),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-gold-300/20 hover:bg-gold-300/[0.06]',
        activeBadge: 'border-gold-300/30 bg-gold-300/12 text-gold-100',
        activeLabel: 'text-gold-100',
      };
    case 'fallow-deer':
      return {
        dot: 'bg-emerald-300',
        line: 'via-emerald-300/65',
        activeContainer: 'border-emerald-300/35 bg-[linear-gradient(135deg,rgba(110,231,183,0.16),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(110,231,183,0.08),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-emerald-300/20 hover:bg-emerald-300/[0.06]',
        activeBadge: 'border-emerald-300/30 bg-emerald-300/12 text-emerald-100',
        activeLabel: 'text-emerald-100',
      };
    case 'rusa-sambar':
      return {
        dot: 'bg-rose-300',
        line: 'via-rose-300/65',
        activeContainer: 'border-rose-300/35 bg-[linear-gradient(135deg,rgba(253,164,175,0.16),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(253,164,175,0.08),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-rose-300/20 hover:bg-rose-300/[0.06]',
        activeBadge: 'border-rose-300/30 bg-rose-300/12 text-rose-100',
        activeLabel: 'text-rose-100',
      };
    case 'himalayan-tahr':
      return {
        dot: 'bg-sky-300',
        line: 'via-sky-300/65',
        activeContainer: 'border-sky-300/35 bg-[linear-gradient(135deg,rgba(125,211,252,0.16),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(125,211,252,0.08),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-sky-300/20 hover:bg-sky-300/[0.06]',
        activeBadge: 'border-sky-300/30 bg-sky-300/12 text-sky-100',
        activeLabel: 'text-sky-100',
      };
    case 'chamois':
      return {
        dot: 'bg-orange-300',
        line: 'via-orange-300/65',
        activeContainer: 'border-orange-300/35 bg-[linear-gradient(135deg,rgba(253,186,116,0.16),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(253,186,116,0.08),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-orange-300/20 hover:bg-orange-300/[0.06]',
        activeBadge: 'border-orange-300/30 bg-orange-300/12 text-orange-100',
        activeLabel: 'text-orange-100',
      };
    default:
      return {
        dot: 'bg-zinc-200',
        line: 'via-zinc-200/60',
        activeContainer: 'border-zinc-200/30 bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02))] shadow-[0_0_0_1px_rgba(255,255,255,0.06),0_18px_50px_rgba(0,0,0,0.28)]',
        inactiveContainer: 'border-white/10 bg-white/[0.035] hover:border-white/20 hover:bg-white/[0.06]',
        activeBadge: 'border-zinc-200/25 bg-white/10 text-white',
        activeLabel: 'text-white',
      };
  }
}

const fallbackGalleryGroups = buildFallbackGalleryGroups();

export default function GallerySection() {
  const [galleryGroups, setGalleryGroups] = useState<GalleryGroup[]>(fallbackGalleryGroups);
  const [activeKey, setActiveKey] = useState(getFirstActiveGalleryKey(fallbackGalleryGroups));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const thumbnailRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const quickBrowseRef = useRef<HTMLDivElement | null>(null);
  const quickBrowseDragRef = useRef({
    isDragging: false,
    pointerId: -1,
    startX: 0,
    startScrollLeft: 0,
    hasMoved: false,
  });
  const suppressThumbnailClickRef = useRef(false);
  const [isDraggingQuickBrowse, setIsDraggingQuickBrowse] = useState(false);

  const active = galleryGroups.find((group) => group.key === activeKey) ?? galleryGroups.find((group) => group.assets.length > 0) ?? galleryGroups[0];
  const assets = active.assets;
  const previewAssets = assets.slice(0, previewGridClasses.length);
  const lightboxAsset = lightboxIndex !== null ? assets[lightboxIndex] : null;
  const hasMultipleAssets = assets.length > 1;
  const activeIndex = galleryGroups.findIndex((group) => group.key === active.key) + 1;
  const activeTone = getGalleryTone(active.key);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    async function syncAdminManifest() {
      try {
        const response = await fetch('/api/gallery/manifest', {
          cache: 'no-store',
          signal: controller.signal,
        });
        const payload = (await response.json()) as { ok?: boolean; groups?: GalleryGroup[] };

        if (!response.ok || !payload.ok || !payload.groups?.length || !isMounted) {
          return;
        }

        const remoteGroups = payload.groups;

        setGalleryGroups(remoteGroups);
        setActiveKey((current) => {
          if (remoteGroups.some((group) => group.key === current && group.assets.length > 0)) {
            return current;
          }

          return getFirstActiveGalleryKey(remoteGroups);
        });
      } catch (error) {
        // Keep the local fallback groups when the admin manifest is unavailable.
        if (error instanceof Error && error.name !== 'AbortError') {
          console.warn('Gallery manifest sync failed:', error.message);
        }
      }
    }

    void syncAdminManifest();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
    quickBrowseDragRef.current.hasMoved = false;
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
      hasMoved: false,
    };
    suppressThumbnailClickRef.current = false;
    setIsDraggingQuickBrowse(false);
  };

  const handleQuickBrowsePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = quickBrowseRef.current;
    const drag = quickBrowseDragRef.current;

    if (!viewport || !drag.isDragging || drag.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - drag.startX;

    if (!drag.hasMoved && Math.abs(deltaX) <= 6) {
      return;
    }

    if (!drag.hasMoved) {
      drag.hasMoved = true;
      suppressThumbnailClickRef.current = true;
      setIsDraggingQuickBrowse(true);

      if (!viewport.hasPointerCapture(event.pointerId)) {
        viewport.setPointerCapture(event.pointerId);
      }
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

  const handleQuickBrowsePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = quickBrowseRef.current;
    const drag = quickBrowseDragRef.current;

    if (!drag.isDragging || drag.pointerId !== event.pointerId) return;
    if (viewport?.hasPointerCapture(event.pointerId)) return;

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

  const scrollQuickBrowseBy = (direction: 'left' | 'right') => {
    const viewport = quickBrowseRef.current;

    if (!viewport) return;

    const amount = Math.max(220, Math.round(viewport.clientWidth * 0.45));

    viewport.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  const handleQuickBrowseSelect = (index: number) => {
    if (suppressThumbnailClickRef.current) {
      suppressThumbnailClickRef.current = false;
      return;
    }

    openLightbox(index);
  };

  return (
    <section id="gallery" className={`gallery-lighttable relative overflow-hidden bg-transparent py-16 font-sans sm:py-20 md:py-32 ${lightboxIndex !== null ? 'z-[10000]' : 'z-10'}`}>
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-gold-600/4 blur-[140px]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.02]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col items-center text-center sm:mb-14">
          <p className="mb-3 text-[9px] font-black uppercase tracking-[0.28em] text-gold-400/60 sm:mb-4 sm:text-[10px] sm:tracking-[0.6em]">Operational Visual Archive // Log.2026</p>
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8.5rem]">
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
          <p className="mx-auto mt-6 max-w-2xl text-[15px] italic leading-relaxed text-white/40 sm:mt-8 sm:text-lg">
            &ldquo;A species-led visual archive, grouped by red deer, sika, fallow, rusa or sambar, tahr, chamois, and a final set of general hunting frames.&rdquo;
          </p>
        </div>

        <div className="mb-8 rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))] p-3 shadow-premium backdrop-blur-xl sm:rounded-[2.2rem] sm:p-4">
          <div className="-mx-1 overflow-x-auto px-1 no-scrollbar lg:overflow-visible">
            <div className="grid min-w-max grid-flow-col auto-cols-[minmax(10.75rem,1fr)] gap-3 pb-2 sm:auto-cols-[minmax(11.75rem,1fr)] md:gap-4 lg:min-w-0 lg:grid-flow-row lg:grid-cols-3 lg:pb-0 xl:grid-cols-4">
              {galleryGroups.map((group, index) => {
                const isActive = activeKey === group.key;
                const tone = getGalleryTone(group.key);
                const isEmpty = group.assets.length === 0;

                return (
                  <button
                    key={group.key}
                    type="button"
                    data-cursor="gallery"
                    aria-pressed={isActive}
                    disabled={isEmpty}
                    onClick={() => {
                      if (isEmpty) return;
                      setActiveKey(group.key);
                      closeLightbox();
                    }}
                    className={`group relative overflow-hidden rounded-[1.7rem] border px-4 py-4 text-left transition-all duration-500 disabled:cursor-not-allowed disabled:opacity-45 sm:px-5 ${
                      isActive ? tone.activeContainer : tone.inactiveContainer
                    }`}
                  >
                    <div className={`pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent ${tone.line} to-transparent ${isActive ? 'opacity-100' : 'opacity-35 group-hover:opacity-70'}`} />
                    <div className="relative">
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className={`h-2 w-2 rounded-full ${tone.dot} ${isActive ? 'opacity-100 shadow-glow' : 'opacity-55 group-hover:opacity-90'}`} />
                          <span className={`text-[8px] font-black uppercase tracking-[0.28em] ${isActive ? 'text-white/55' : 'text-white/28 group-hover:text-white/45'}`}>
                            Archive {formatAssetCount(index + 1)}
                          </span>
                        </div>

                        <span className={`inline-flex min-w-[2.35rem] items-center justify-center rounded-full border px-2.5 py-1 text-[8px] font-black tracking-[0.2em] ${isActive ? tone.activeBadge : 'border-white/10 bg-black/25 text-white/45 group-hover:text-white/75'}`}>
                          {formatAssetCount(group.assets.length)}
                        </span>
                      </div>

                      <p className={`font-display text-[0.95rem] font-bold uppercase leading-tight tracking-[0.18em] sm:text-[1.02rem] ${isActive ? tone.activeLabel : 'text-white/72 group-hover:text-white'}`}>
                        {group.label}
                      </p>
                      <p className={`mt-2 text-[8px] font-black uppercase tracking-[0.24em] ${isActive ? 'text-white/34' : 'text-white/18 group-hover:text-white/28'}`}>
                        Species Profile
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mb-10 grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-stretch sm:mb-12">
          <div className={`relative overflow-hidden rounded-[1.8rem] border px-5 py-6 shadow-premium backdrop-blur-xl sm:rounded-[2.2rem] sm:px-7 sm:py-7 ${activeTone.activeContainer}`}>
            <div className={`pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent ${activeTone.line} to-transparent`} />
            <div className="pointer-events-none absolute -right-20 top-0 h-40 w-40 rounded-full bg-white/6 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-10 h-40 w-40 rounded-full bg-black/35 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between gap-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[9px] font-black uppercase tracking-[0.26em] ${activeTone.activeBadge}`}>
                  Active Category
                </span>
                <span className="inline-flex items-center rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[9px] font-black uppercase tracking-[0.26em] text-white/60">
                  Archive {formatAssetCount(activeIndex)}
                </span>
              </div>

              <div className="max-w-3xl">
                <div className="mb-4 flex items-start gap-3">
                  <span className={`mt-3 h-2.5 w-2.5 shrink-0 rounded-full ${activeTone.dot} shadow-glow`} />
                  <div>
                    <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-6xl">{active.title}</h3>
                    <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/66 sm:text-[15px]">{active.sub}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-[0.26em] text-white/46">
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">Species-led curation</span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">Premium field archive</span>
                  <span className="rounded-full border border-white/10 bg-black/20 px-3 py-2">Client-sorted RF frames</span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <div className={`rounded-[1.5rem] border px-4 py-4 shadow-premium backdrop-blur-xl sm:rounded-[1.7rem] ${activeTone.activeContainer}`}>
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/38">Archive Frames</p>
              <p className="stat-number mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white">{formatAssetCount(assets.length)}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/46">in selected species</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 shadow-premium backdrop-blur-xl sm:rounded-[1.7rem]">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/25">Preview Grid</p>
              <p className={`stat-number mt-2 font-display text-3xl font-bold uppercase tracking-tight ${activeTone.activeLabel}`}>{formatAssetCount(previewAssets.length)}</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/40">front-of-gallery selection</p>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] px-4 py-4 shadow-premium backdrop-blur-xl sm:rounded-[1.7rem]">
              <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/25">Archive Sync</p>
              <p className="mt-2 text-[13px] font-black uppercase tracking-[0.34em] text-green-400/80">100%</p>
              <p className="mt-3 text-[10px] uppercase tracking-[0.24em] text-white/40">matched to client brief</p>
            </div>
          </div>
        </div>

        <div className="grid auto-rows-[11rem] grid-cols-2 gap-3 sm:gap-4 md:auto-rows-[18rem] md:grid-cols-12 md:gap-6">
          {previewAssets.map((asset, index) => {
            const gridClass = previewGridClasses[index] ?? 'col-span-1 row-span-1 md:col-span-4 md:row-span-1';

            return (
              <motion.button
                key={`${active.key}-${asset.meta.fileId}`}
                type="button"
                data-cursor="gallery"
                aria-label={`Open ${asset.label}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06, duration: 0.55 }}
                onClick={() => openLightbox(index)}
                className={`gallery-item group relative overflow-hidden rounded-[1.8rem] border border-white/10 shadow-premium transition-all duration-500 hover:-translate-y-2 hover:border-gold-400/35 sm:rounded-[2.2rem] ${gridClass}`}
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
                <div className="absolute inset-4 border border-white/5 opacity-40 transition-opacity group-hover:opacity-100 sm:inset-5" />

                <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-gold-300 sm:left-6 sm:top-6 sm:text-[9px] sm:tracking-[0.22em]">
                  {asset.meta.fileId}
                </div>

                {isVideoAsset(asset) && (
                  <>
                    <div className="absolute right-4 top-4 rounded-full border border-gold-400/20 bg-black/50 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/70 sm:right-6 sm:top-6 sm:tracking-[0.18em]">
                      {asset.meta.runtime}
                    </div>
                    <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300 shadow-glow sm:bottom-6 sm:right-6 sm:h-14 sm:w-14">
                      <Play className="ml-1 h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 p-4 text-left sm:p-6">
                  <div className="mb-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.16em] text-gold-400/60 sm:mb-3 sm:text-[9px] sm:tracking-[0.24em]">
                    {isVideoAsset(asset) ? <Video className="h-3 w-3" /> : <ShieldCheck className="h-3 w-3" />}
                    {isVideoAsset(asset) ? 'Motion Asset' : asset.meta.status}
                  </div>
                  <p className="font-display text-lg font-bold uppercase leading-tight text-white sm:text-2xl">{asset.label}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-[9px] font-bold uppercase tracking-[0.14em] text-white/55 sm:mt-4 sm:gap-4 sm:text-[10px] sm:tracking-[0.2em]">
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
                  <div className="absolute bottom-4 right-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/40 transition-all group-hover:border-gold-400/40 group-hover:text-gold-300 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12">
                    <Maximize2 className="h-5 w-5" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
 
        <div className="mt-12 rounded-[2rem] border border-white/5 bg-black/40 p-5 shadow-premium backdrop-blur-3xl sm:rounded-[2.5rem] sm:p-8">
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
                aria-label={`Open asset ${index + 1}: ${asset.label}`}
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
                  <p className="truncate text-[10px] font-bold uppercase tracking-[0.14em] text-white/80">{asset.label}</p>
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
            className="fixed inset-0 z-[1000] flex flex-col overflow-x-hidden overflow-y-auto bg-forest-950/96 backdrop-blur-3xl"
            onClick={closeLightbox}
            data-lenis-prevent
          >
            <div className="flex-1 min-h-0 w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              <div className="mx-auto flex h-full w-full min-w-0 max-w-7xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
                <div className="rounded-[1.6rem] border border-white/10 bg-black/60 px-4 py-4 shadow-premium backdrop-blur-3xl sm:rounded-[2rem] sm:px-6 sm:py-5">
                  <div className="flex items-start gap-4 sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-gold-400/50 sm:text-[9px] sm:tracking-[0.35em]">
                        {isVideoAsset(lightboxAsset) ? <Video className="h-3 w-3 shrink-0" /> : <ShieldCheck className="h-3 w-3 shrink-0" />}
                        {isVideoAsset(lightboxAsset) ? 'Field Tape' : 'Verified Field Data'}
                      </div>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                          <h2 className="truncate font-display text-xl font-bold uppercase tracking-tight text-white sm:text-3xl">{lightboxAsset.label}</h2>
                          <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/28 sm:text-[10px] sm:tracking-[0.24em]">
                            {active.title} | {active.sub}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-3 self-start rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-gold-200 sm:text-[10px] sm:tracking-[0.24em]">
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

                <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-4">
                  <div className="relative min-h-[42vh] flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%),linear-gradient(180deg,rgba(14,20,19,0.94),rgba(6,10,10,0.98))] shadow-premium sm:min-h-0 sm:rounded-[2rem]">
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

                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 sm:bottom-6 sm:left-6 sm:right-6 sm:gap-3">
                      <div className="rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-white/70 sm:text-[10px] sm:tracking-[0.22em]">
                        {isVideoAsset(lightboxAsset) ? `${lightboxAsset.meta.runtime ?? '--:--'} Runtime` : 'Photo Asset'}
                      </div>
                      <div className="rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-gold-200 sm:text-[10px] sm:tracking-[0.22em]">
                        {lightboxAsset.meta.fileId}
                      </div>
                    </div>
                  </div>

                  <div className="grid w-full min-w-0 shrink-0 gap-4 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.8fr)]">
                    <div className="hidden min-w-0 rounded-[1.6rem] border border-white/10 bg-black/55 p-4 shadow-premium backdrop-blur-3xl sm:block sm:p-5">
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

                    <div className="min-w-0 rounded-[1.6rem] border border-white/10 bg-black/55 p-4 shadow-premium backdrop-blur-3xl sm:p-5">
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.32em] text-gold-400/45">Quick Browse</p>
                          <p className="mt-2 hidden text-xs leading-relaxed text-gray-400 sm:block">Browse the full category from inside the lightbox and jump straight to any frame.</p>
                        </div>
                        <div className="hidden items-center gap-2 sm:flex">
                          <button
                            type="button"
                            aria-label="Scroll quick browse left"
                            onClick={() => scrollQuickBrowseBy('left')}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/55 transition-all hover:border-gold-400/40 hover:text-gold-200"
                          >
                            <ChevronLeft className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            aria-label="Scroll quick browse right"
                            onClick={() => scrollQuickBrowseBy('right')}
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/55 transition-all hover:border-gold-400/40 hover:text-gold-200"
                          >
                            <ChevronRight className="h-4 w-4" />
                          </button>
                          <div className="rounded-full border border-white/10 bg-black/40 px-3 py-2 text-[9px] font-black uppercase tracking-[0.22em] text-white/55">
                            {formatAssetCount(assets.length)}
                          </div>
                        </div>
                      </div>

                      <div
                        ref={quickBrowseRef}
                        className={`no-scrollbar flex w-full min-w-0 max-w-full gap-3 overflow-x-auto pb-1 select-none ${isDraggingQuickBrowse ? 'cursor-grabbing' : 'cursor-grab'}`}
                        onPointerDown={handleQuickBrowsePointerDown}
                        onPointerMove={handleQuickBrowsePointerMove}
                        onPointerUp={handleQuickBrowsePointerUp}
                        onPointerCancel={handleQuickBrowsePointerUp}
                        onPointerLeave={handleQuickBrowsePointerLeave}
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
                            aria-label={`Open asset ${index + 1}: ${asset.label}`}
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
                              <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white">{asset.label}</p>
                              <p className="mt-1 truncate text-[8px] font-black uppercase tracking-[0.2em] text-white/45">{asset.meta.fileId}</p>
                            </div>
                          </button>
                        ))}
                      </div>

                      <p className="mt-4 hidden text-[9px] font-black uppercase tracking-[0.24em] text-white/20 sm:block">
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
