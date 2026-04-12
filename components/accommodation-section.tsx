'use client';

import { useState, useEffect, useRef, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Bed, Coffee, Flame, MapPin, Users, Utensils, Wifi, Play, Compass, ExternalLink, Activity, X, ChevronLeft, ChevronRight, Maximize2, ShieldCheck, Locate } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';
import { lodgeAccommodationMedia, stayMedia, stayVideoMedia, type VideoMediaItem } from '@/lib/media-collections';
import gallerySlike from '@/lib/gallery-slike.json';

type PhotoFrame = {
  src: string;
  title: string;
  badge: string;
};

type Lodge = {
  id: string;
  type: string;
  typeColor: string;
  name: string;
  location: string;
  tagline: string;
  description: string;
  image: string;
  gallery: PhotoFrame[];
  videos: VideoMediaItem[];
  capacity: string;
  specs: { label: string; value: string }[];
  features: { icon: typeof Bed; label: string }[];
  highlight: string;
};

type ViewerState =
  | { kind: 'photo'; index: number }
  | { kind: 'video'; index: number };

function buildReversedPhotoFrames(sources: string[], titleBase: string) {
  const total = sources.length;

  return [...sources].reverse().map((src, index) => {
    const originalNumber = total - index;
    const paddedNumber = String(originalNumber).padStart(2, '0');

    return {
      src,
      title: `${titleBase} Frame ${paddedNumber}`,
      badge: `Frame ${paddedNumber}`,
    };
  });
}

function buildRfPhotoFrame(rfNumber: number, titleBase: string): PhotoFrame | null {
  const asset = gallerySlike[rfNumber - 1];

  if (!asset) return null;

  const paddedNumber = String(rfNumber).padStart(2, '0');

  return {
    src: asset.localSrc,
    title: `${titleBase} RF ${paddedNumber}`,
    badge: `RF ${paddedNumber}`,
  };
}

const lodgeGalleryFrames = buildReversedPhotoFrames(
  lodgeAccommodationMedia.map((image) => image.src),
  'Ohakune Lodge Base',
);

const stayGalleryFrames = [
  buildRfPhotoFrame(44, 'Hillside Hunter Stay'),
  buildRfPhotoFrame(35, 'Hillside Hunter Stay'),
  ...buildReversedPhotoFrames(
    stayMedia.map((image) => image.src),
    'Hillside Hunter Stay',
  ),
].filter((frame): frame is PhotoFrame => frame !== null);

const lodges: Lodge[] = [
  {
    id: 'ohakune',
    type: 'Primary Base',
    typeColor: 'text-gold-300 border-gold-400/30 bg-gold-400/8',
    name: 'Ohakune\nLodge Base',
    location: 'Ohakune - North Island',
    tagline: 'Central North Island hunting base',
    description:
      'A comfortable, properly hosted lodge sitting at the heart of the North Island program. Everything runs from here - meals, briefings, debrief evenings, and early starts into the Kaimanawa.',
    image: lodgeGalleryFrames[0]?.src ?? lodgeAccommodationMedia[0].src,
    gallery: lodgeGalleryFrames,
    videos: [],
    capacity: '2-4 hunters',
    specs: [
      { label: 'Elevation', value: '590m MSL' },
      { label: 'Coordination', value: 'Alpha Base' },
      { label: 'Field Sync', value: 'Real-Time' },
    ],
    features: [
      { icon: Bed, label: 'Private Bedrooms' },
      { icon: Flame, label: 'Central Heating' },
      { icon: Utensils, label: 'Chef-Prepared' },
      { icon: Coffee, label: 'Lounge Area' },
      { icon: Wifi, label: 'Starlink WiFi' },
      { icon: Users, label: 'Full Hosting' },
    ],
    highlight: 'Strategic nexus for Kaimanawa and Kaweka operations.',
  },
  {
    id: 'stay',
    type: 'Hosted Stay',
    typeColor: 'text-emerald-300 border-emerald-400/30 bg-emerald-400/8',
    name: 'Hillside\nHunter Stay',
    location: 'North Island - Panorama Base',
    tagline: 'Compact hosted stay with elevated views',
    description:
      'An additional stay option built for small groups or quieter overnights, with a covered outdoor lounge, a self-contained interior, and open views across the surrounding hill country.',
    image: stayGalleryFrames[0]?.src ?? stayMedia[0].src,
    gallery: stayGalleryFrames,
    videos: stayVideoMedia,
    capacity: '1-2 hunters',
    specs: [
      { label: 'Format', value: 'Private Stay' },
      { label: 'View', value: 'Valley Outlook' },
      { label: 'Field Sync', value: 'Hosted' },
    ],
    features: [
      { icon: Bed, label: 'Private Bedroom' },
      { icon: Coffee, label: 'Outdoor Lounge' },
      { icon: Utensils, label: 'Kitchenette' },
      { icon: MapPin, label: 'Wide Views' },
      { icon: Flame, label: 'Covered Deck' },
      { icon: Users, label: 'Small Group Fit' },
    ],
    highlight: 'Relaxed hosted stay with strong views and practical comfort.',
  },
];

export default function AccommodationSection() {
  const [active, setActive] = useState(0);
  const [viewer, setViewer] = useState<ViewerState | null>(null);
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
  const lodge = lodges[active];
  const hasVideos = lodge.videos.length > 0;
  const lightboxCount = viewer ? (viewer.kind === 'photo' ? lodge.gallery.length : lodge.videos.length) : 0;
  const activeVideo = viewer?.kind === 'video' ? lodge.videos[viewer.index] : null;
  const activePhoto = viewer?.kind === 'photo' ? lodge.gallery[viewer.index] : null;
  const lodgeNamePlain = lodge.name.replace(/\n/g, ' ');
  const viewerItems =
    viewer?.kind === 'video'
      ? lodge.videos.map((video, index) => ({
          key: `video-${index}`,
          thumbSrc: getBlobAssetUrl(video.poster),
          title: video.alt,
          badge: `Tape ${String(index + 1).padStart(2, '0')}`,
          runtime: video.durationLabel,
          mediaType: 'video' as const,
        }))
      : lodge.gallery.map((photo, index) => ({
          key: `photo-${index}`,
          thumbSrc: getBlobAssetUrl(photo.src),
          title: photo.title,
          badge: photo.badge,
          runtime: 'PHOTO',
          mediaType: 'photo' as const,
        }));
  const activeViewerItem = viewer ? viewerItems[viewer.index] : null;

  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (viewer !== null) {
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
  }, [viewer]);

  const next = () =>
    setViewer((prev) => {
      if (!prev) return null;
      const total = prev.kind === 'photo' ? lodge.gallery.length : lodge.videos.length;
      return { ...prev, index: (prev.index + 1) % total };
    });

  const prev = () =>
    setViewer((prevState) => {
      if (!prevState) return null;
      const total = prevState.kind === 'photo' ? lodge.gallery.length : lodge.videos.length;
      return { ...prevState, index: (prevState.index - 1 + total) % total };
    });

  useEffect(() => {
    if (!viewer) return;

    const moveViewer = (direction: 1 | -1) => {
      setViewer((prevState) => {
        if (!prevState) return null;

        const total = prevState.kind === 'photo' ? lodge.gallery.length : lodge.videos.length;
        const nextIndex = (prevState.index + direction + total) % total;

        return { ...prevState, index: nextIndex };
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setViewer(null);
        return;
      }

      if (event.key === 'ArrowRight' && lightboxCount > 1) {
        event.preventDefault();
        moveViewer(1);
      }

      if (event.key === 'ArrowLeft' && lightboxCount > 1) {
        event.preventDefault();
        moveViewer(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewer, lightboxCount, lodge.gallery.length, lodge.videos.length]);

  useEffect(() => {
    if (!viewer) return;

    thumbnailRefs.current[viewer.index]?.scrollIntoView({
      block: 'nearest',
      inline: 'center',
      behavior: 'smooth',
    });
  }, [viewer, active]);

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

  const handleQuickBrowseSelect = (index: number) => {
    if (suppressThumbnailClickRef.current) {
      suppressThumbnailClickRef.current = false;
      return;
    }

    setViewer((prevState) => (prevState ? { ...prevState, index } : prevState));
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

  return (
    <section id="stay" className={`relative overflow-hidden bg-transparent py-16 font-sans sm:py-20 md:py-32 ${viewer !== null ? 'z-[10000]' : 'z-10'}`}>
      {/* Immersive Background Decor */}
      <div className="pointer-events-none absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/5 blur-[160px]" />
      
      {/* Subtle Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* -- Cinematic Header -- */}
        <div className="mb-10 text-center sm:mb-14 md:mb-20">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/60 sm:mb-4 sm:text-[11px] sm:tracking-[0.5em]">
            <TextReveal>Operational Bases</TextReveal>
          </p>
          <h2 className="font-display text-4xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8.5rem]">
            <TextReveal delay={0.1}>Lodge & Stay</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 140, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mx-auto mt-8 flex items-center gap-4"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            <div className="h-2 w-2 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20 shadow-glow" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/40 to-transparent" />
          </motion.div>
        </div>

        {/* -- Enhanced Tab Switcher -- */}
        <div className="-mx-4 mb-10 overflow-x-auto px-4 no-scrollbar sm:mb-16">
          <div className="flex w-max min-w-full gap-3 md:justify-center">
            {lodges.map((item, index) => (
              <button
                key={item.id}
                onClick={() => {
                  setActive(index);
                  setViewer(null);
                }}
                className={`group relative flex items-center gap-3 whitespace-nowrap rounded-full border px-5 py-3.5 text-[10px] font-black uppercase tracking-[0.22em] transition-all duration-500 sm:px-8 sm:py-5 sm:text-[11px] sm:tracking-[0.4em] ${
                  active === index
                    ? 'border-gold-400/50 bg-gold-400/15 text-gold-300 shadow-glow ring-1 ring-gold-400/20'
                    : 'border-white/10 bg-white/[0.04] text-gray-500 hover:border-gold-400/20 hover:text-white'
                }`}
              >
                {active === index && <motion.span layoutId="lodge-dot-v4" className="h-2 w-2 rounded-full bg-gold-400 shadow-glow" />}
                {item.id === 'ohakune' ? 'North Island Hub' : 'Hunter Stay'}
              </button>
            ))}
          </div>
        </div>

        {/* -- 3-COLUMN OPERATIONAL DOSSIER -- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={lodge.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="grid gap-6 lg:grid-cols-12 lg:items-stretch lg:gap-8">
              
              {/* STUB 1: VISUAL FOUNDATION (LEFT) */}
              <div className="lg:col-span-4 flex flex-col h-full">
                <div 
                  onClick={() => setViewer({ kind: 'photo', index: 0 })}
                  className="group relative flex-1 cursor-pointer overflow-hidden rounded-[2rem] border border-white/15 min-h-[380px] shadow-premium sm:min-h-[500px] sm:rounded-[3rem] lg:min-h-[680px]"
                >
                  <Image
                    src={getBlobAssetUrl(lodge.image)}
                    alt={lodge.name}
                    fill
                    sizes="(max-width: 1023px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[6000ms] scale-[1.05] group-hover:scale-125"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  {/* Operational Badge */}
                  <div className="absolute left-1/2 top-5 z-20 -translate-x-1/2 sm:top-6">
                    <span className={`rounded-full border px-4 py-2 text-[9px] font-black uppercase tracking-[0.22em] backdrop-blur-xl shadow-premium sm:px-6 sm:py-2.5 sm:text-[10px] sm:tracking-[0.4em] ${lodge.typeColor}`}>
                      {lodge.type} 
                    </span>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 z-30 sm:bottom-10 sm:left-10 sm:right-10">
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center gap-3">
                        <MapPin className="h-4 w-4 text-gold-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/50 sm:text-[11px] sm:tracking-[0.5em]">{lodge.location}</span>
                      </div>
                      <h3 className="whitespace-pre-line font-display text-3xl font-bold uppercase leading-[0.88] text-white sm:text-5xl lg:text-7xl">
                        {lodge.name}
                      </h3>
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/15 text-white shadow-glow backdrop-blur-xl transition-all hover:scale-110 hover:bg-gold-500 hover:text-black sm:bottom-10 sm:right-8 sm:h-14 sm:w-14">
                    <Maximize2 className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                </div>
              </div>

              {/* STUB 2: TECHNICAL HUB (MIDDLE) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Precision Metrics Card */}
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {lodge.specs.map((spec) => (
                    <div key={spec.label} className="group flex flex-col items-start justify-between gap-2 rounded-2xl border border-white/10 bg-forest-900/40 p-4 transition-colors hover:bg-gold-500/10 sm:flex-row sm:items-center sm:gap-4 sm:p-5">
                       <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gold-400/40 sm:text-[10px] sm:tracking-[0.3em]">{spec.label}</span>
                       <span className="text-xs font-bold uppercase text-white tracking-widest">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* Secondary Archive Media */}
                {hasVideos ? (
                  <div
                    onClick={() => setViewer({ kind: 'video', index: 0 })}
                    className="group relative flex-1 min-h-[220px] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-premium sm:min-h-[240px] sm:rounded-[2.5rem]"
                  >
                    <video
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      poster={getBlobAssetUrl(lodge.videos[0].poster)}
                      className="h-full w-full object-cover opacity-70 contrast-[1.05] transition-transform duration-1000 group-hover:scale-110"
                    >
                      <source src={getBlobAssetUrl(lodge.videos[0].src)} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-black/25 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full border border-gold-400/20 bg-black/50 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.18em] text-gold-300 sm:left-6 sm:top-6 sm:px-4 sm:py-2 sm:text-[9px] sm:tracking-[0.3em]">
                      Motion Archive
                    </div>
                    <div className="absolute right-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[8px] font-bold uppercase tracking-[0.14em] text-white/60 sm:right-6 sm:top-6 sm:tracking-[0.2em]">
                      {lodge.videos[0].durationLabel}
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20 p-6 text-center transition-colors group-hover:bg-black/5 sm:p-8">
                      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-300 shadow-glow sm:h-16 sm:w-16">
                        <Play className="ml-1 h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gold-300 sm:text-[10px] sm:tracking-[0.4em]">Launch Field Tape</p>
                    </div>
                    <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                      <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                        <div>
                          <p className="text-[8px] font-black uppercase tracking-[0.3em] text-white/25">Featured Clip</p>
                          <p className="mt-1 text-xs font-bold uppercase tracking-[0.16em] text-white">{lodge.videos[0].alt}</p>
                        </div>
                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-300/80">
                          {lodge.videos.length} Clips
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div 
                    onClick={() => setViewer({ kind: 'photo', index: 1 % lodge.gallery.length })}
                    className="group relative flex-1 min-h-[220px] cursor-pointer overflow-hidden rounded-[2rem] border border-white/10 bg-black/40 shadow-premium sm:min-h-[240px] sm:rounded-[2.5rem]"
                  >
                    <Image
                      src={getBlobAssetUrl(lodge.gallery[1 % lodge.gallery.length].src)}
                      alt="Archive Detail"
                      fill
                      className="object-cover opacity-60 contrast-[1.1] transition-transform duration-1000 group-hover:scale-115"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/95 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/20 p-6 text-center transition-colors group-hover:bg-black/10 sm:p-8">
                       <Play className="h-6 w-6 text-gold-400/30 group-hover:text-gold-400 transition-colors" />
                       <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gold-400/50 transition-colors group-hover:text-gold-300 sm:text-[10px] sm:tracking-[0.4em]">Operational Log</p>
                     </div>
                  </div>
                )}

                {/* Grid System / Status Hub */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-forest-900/30 p-6 shadow-premium sm:rounded-[2.5rem] sm:p-8">
                   <div className="flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-1">
                         <div className="flex items-center gap-3">
                            <Activity className="h-4 w-4 text-gold-400" />
                            <span className="text-[11px] font-black uppercase text-white tracking-[0.3em]">Grid Status</span>
                         </div>
                         <span className="text-[8px] font-bold text-gold-400/40 uppercase tracking-[0.2em] ml-7">ENCRYPTION: LEVEL 4</span>
                      </div>
                      <div className="flex flex-col items-end">
                         <div className="h-2 w-2 rounded-full bg-green-500 shadow-glow animate-pulse" />
                         <span className="text-[9px] font-black uppercase text-green-500/60 tracking-widest mt-1">OPERATIONAL</span>
                      </div>
                   </div>
                   
                   <div className="mt-6 flex items-center justify-center gap-5 sm:mt-8 sm:gap-6">
                      <Compass className="h-10 w-10 text-white/5 animate-spin-slow" />
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-400/20" />
                      <Locate className="h-10 w-10 text-white/5" />
                   </div>
                </div>
              </div>

              {/* STUB 3: INTELLIGENCE PILLAR (RIGHT) */}
              <div className="lg:col-span-4 flex flex-col justify-between gap-6">
                
                {/* Mission Narrative Dossier */}
                <div className="relative flex flex-1 flex-col overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(135deg,rgba(18,28,26,0.6),rgba(10,16,15,0.8))] p-6 shadow-premium sm:rounded-[3rem] sm:p-10">
                  <div className="absolute left-0 top-0 h-px w-40 bg-gradient-to-r from-gold-400/40 to-transparent" />
                  <div className="absolute left-0 top-0 h-40 w-px bg-gradient-to-b from-gold-400/30 to-transparent" />
                  
                   <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
                     <span className="text-[9px] font-black uppercase tracking-[0.22em] text-gold-400/50 sm:text-[10px] sm:tracking-[0.5em]">{lodge.tagline}</span>
                     <ShieldCheck className="h-4 w-4 text-white/10" />
                   </div>

                   <p className="flex-1 text-base font-medium leading-relaxed text-gray-300 md:text-xl lg:text-[1.2rem] lg:leading-[1.75]">
                      {lodge.description}
                   </p>
                   
                   <div className="mt-8 flex flex-col items-start gap-4 border-t border-white/5 pt-8 sm:mt-10 sm:flex-row sm:items-center sm:gap-6 sm:pt-10">
                     <div className="flex flex-col gap-1.5">
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/20">Operational Profile</span>
                        <span className="text-xs font-bold uppercase text-gold-400/70 italic">{lodge.highlight}</span>
                     </div>
                     <ExternalLink className="ml-auto h-5 w-5 text-white/10 hover:text-gold-400 transition-colors cursor-pointer" />
                  </div>
                </div>

                {/* Base Logistics (Amenities Dashboard) */}
                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-forest-900/30 p-6 shadow-premium sm:rounded-[2.5rem] sm:p-10">
                  <div className="mb-6 flex flex-col items-start justify-between gap-3 sm:mb-8 sm:flex-row sm:items-center">
                      <p className="text-[10px] font-black uppercase tracking-[0.26em] text-gold-400/60 sm:text-[11px] sm:tracking-[0.5em]">Base Logistics</p>
                      <div className="flex items-center gap-2 rounded-full border border-white/5 bg-black/40 px-4 py-2">
                         <Users className="h-4 w-4 text-gold-400/40" />
                         <span className="text-[8px] font-bold uppercase tracking-[0.14em] text-white/40 sm:text-[9px] sm:tracking-widest">{lodge.capacity} Personnel</span>
                      </div>
                   </div>
                   {hasVideos && (
                     <div className="mb-6 flex flex-col items-start justify-between gap-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-4 sm:flex-row sm:items-center sm:px-5">
                        <div className="flex items-center gap-3">
                           <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />
                           <span className="text-[8px] font-black uppercase tracking-[0.18em] text-emerald-300 sm:text-[9px] sm:tracking-[0.3em]">Motion Log Ready</span>
                        </div>
                        <button
                          onClick={() => setViewer({ kind: 'video', index: 0 })}
                          className="rounded-full border border-white/10 bg-black/40 px-4 py-2 text-[8px] font-bold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-gold-400/30 hover:text-gold-200"
                        >
                          Open Videos
                        </button>
                     </div>
                   )}
                   <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                     {lodge.features.map((feature) => {
                       const Icon = feature.icon;
                       return (
                         <div
                           key={feature.label}
                           className="group flex items-center gap-4 rounded-[1.5rem] border border-white/5 bg-white/[0.03] px-5 py-4 transition-all hover:-translate-y-1 hover:border-gold-400/30 hover:bg-gold-400/10 sm:rounded-3xl sm:px-6 sm:py-5"
                         >
                           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 transition-colors group-hover:bg-gold-400/20">
                              <Icon className="h-5 w-5 text-gold-400/50 group-hover:text-gold-400" />
                           </div>
                           <span className="text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                             {feature.label}
                           </span>
                         </div>
                       );
                     })}
                   </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* -- Perfect Polish: Field Philosophy Footer -- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative mt-12 overflow-hidden rounded-[2.2rem] border border-gold-500/10 bg-forest-950/40 p-7 text-center backdrop-blur-3xl sm:rounded-[4rem] sm:p-14"
        >
          {/* Topographic Background Decor */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <path d="M0,200 Q250,150 500,200 T1000,200 V400 H0 Z" fill="rgba(255,255,255,0.05)" />
              <path d="M0,100 C200,50 400,150 600,100 S1000,150 1000,100" stroke="gold" strokeWidth="0.5" fill="none" opacity="0.1" />
            </svg>
          </div>

          <div className="relative z-10 flex flex-col items-center gap-6 md:flex-row md:gap-14 md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1.5rem] border border-gold-400/20 bg-gold-400/5 text-gold-400/40 shadow-glow sm:h-20 sm:w-20 sm:rounded-[2rem]">
              <Utensils className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <div className="max-w-4xl">
               <p className="mb-3 text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/40 italic sm:mb-4 sm:text-[11px] sm:tracking-[0.6em]">Operational Hospitality</p>
               <p className="font-display text-xl leading-relaxed text-gray-300 italic sm:text-3xl md:text-4xl">
                 &ldquo;Meals are prepared around the rhythm of the hunt - not the other way around. Excellent food, reliable hospitality, and a stay that feels relaxed after long days in the bush.&rdquo;
               </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* -- Immersive Lightbox -- */}
      <AnimatePresence>
        {viewer !== null && activeViewerItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] flex flex-col overflow-x-hidden overflow-y-auto bg-forest-950/98 backdrop-blur-3xl"
            onClick={() => setViewer(null)}
            data-lenis-prevent
          >
            {/* Lightbox Layout */}
            <div className="flex-1 min-h-0 w-full px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
              <div className="mx-auto flex h-full w-full min-w-0 max-w-7xl flex-col gap-4" onClick={(event) => event.stopPropagation()}>
                <div className="rounded-[1.6rem] border border-white/10 bg-black/60 px-4 py-4 shadow-premium backdrop-blur-3xl sm:rounded-[2rem] sm:px-6 sm:py-5">
                  <div className="flex items-start gap-4 sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-gold-400/50 sm:text-[9px] sm:tracking-[0.35em]">
                        {viewer.kind === 'video' ? <Play className="h-3 w-3 shrink-0" /> : <Maximize2 className="h-3 w-3 shrink-0" />}
                        {viewer.kind === 'video' ? 'Motion Archive' : 'Lodge Archive'}
                      </div>
                      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                        <div className="min-w-0">
                          <h2 className="truncate font-display text-xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                            {activeViewerItem.title}
                          </h2>
                          <p className="mt-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/28 sm:text-[10px] sm:tracking-[0.24em]">
                            {lodgeNamePlain} | {lodge.location}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-3 self-start rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-[9px] font-black uppercase tracking-[0.16em] text-gold-200 sm:text-[10px] sm:tracking-[0.24em]">
                          <span>{viewer.kind === 'video' ? 'Tape' : 'Frame'}</span>
                          <span className="stat-number text-base font-display tracking-tight">
                            {String(viewer.index + 1).padStart(2, '0')} / {String(lightboxCount).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      aria-label="Close expanded lodge gallery"
                      onClick={() => setViewer(null)}
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/50 transition-all hover:rotate-90 hover:border-gold-400 hover:bg-gold-500 hover:text-black"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
                {/* Media Stage */}
                <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col gap-4">
                  <div className="relative min-h-[42vh] flex-1 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_42%),linear-gradient(180deg,rgba(14,20,19,0.94),rgba(6,10,10,0.98))] shadow-premium sm:min-h-0 sm:rounded-[2rem]">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/[0.04] via-transparent to-black/40" />

                    {lightboxCount > 1 && (
                      <>
                        <button
                          type="button"
                          aria-label="Show previous asset"
                          onClick={prev}
                          className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/40 transition-all hover:border-gold-400 hover:text-gold-300 sm:left-5 sm:h-14 sm:w-14"
                        >
                          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                        <button
                          type="button"
                          aria-label="Show next asset"
                          onClick={next}
                          className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/55 text-white/40 transition-all hover:border-gold-400 hover:text-gold-300 sm:right-5 sm:h-14 sm:w-14"
                        >
                          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
                        </button>
                      </>
                    )}

                    <motion.div
                      key={`${viewer.kind}-${viewer.index}`}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="relative flex h-full min-h-0 w-full items-center justify-center p-4 sm:p-6 lg:p-8"
                    >
                      {activeVideo ? (
                        <video
                          controls
                          autoPlay
                          playsInline
                          preload="metadata"
                          poster={getBlobAssetUrl(activeVideo.poster)}
                          className="h-auto max-h-full w-auto max-w-full rounded-[1.6rem] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                        >
                          <source src={getBlobAssetUrl(activeVideo.src)} type="video/mp4" />
                        </video>
                      ) : activePhoto ? (
                        <Image
                          src={getBlobAssetUrl(activePhoto.src)}
                          alt={activeViewerItem.title}
                          width={2400}
                          height={1600}
                          priority
                          sizes="100vw"
                          className="h-auto max-h-full w-auto max-w-full select-none rounded-[1.6rem] object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]"
                        />
                      ) : null}
                    </motion.div>

                    <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 sm:bottom-6 sm:left-6 sm:right-6 sm:gap-3">
                      <div className="rounded-full border border-white/10 bg-black/55 px-4 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-white/70 sm:text-[10px] sm:tracking-[0.22em]">
                        {viewer.kind === 'video' ? `${activeVideo?.durationLabel ?? '--:--'} Runtime` : 'Photo Asset'}
                      </div>
                      <div className="rounded-full border border-gold-400/20 bg-gold-400/10 px-4 py-2 text-[8px] font-black uppercase tracking-[0.14em] text-gold-200 sm:text-[10px] sm:tracking-[0.22em]">
                        {activeViewerItem.badge}
                      </div>
                    </div>
                  </div>

                  <div className="grid w-full min-w-0 shrink-0 gap-4 lg:grid-cols-[minmax(16rem,0.95fr)_minmax(0,1.8fr)]">
                    <div className="hidden min-w-0 rounded-[1.6rem] border border-white/10 bg-black/55 p-4 shadow-premium backdrop-blur-3xl sm:block sm:p-5">
                      <p className="text-[9px] font-black uppercase tracking-[0.32em] text-gold-400/45">Asset Metadata</p>
                      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-2">
                        {[
                          { label: 'Base', value: lodgeNamePlain },
                          { label: 'Location', value: lodge.location },
                          { label: 'Medium', value: viewer.kind === 'video' ? 'Video' : 'Photo' },
                          { label: 'Runtime', value: viewer.kind === 'video' ? activeVideo?.durationLabel ?? '--:--' : 'PHOTO' },
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
                          <p className="mt-2 hidden text-xs leading-relaxed text-gray-400 sm:block">
                            Browse the full {viewer.kind === 'video' ? 'motion archive' : 'photo archive'} from inside the lightbox and jump straight to any {viewer.kind === 'video' ? 'tape' : 'frame'}.
                          </p>
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
                            {String(lightboxCount).padStart(2, '0')}
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
                        {viewerItems.map((item, index) => (
                          <button
                            key={`lodge-lightbox-strip-${item.key}`}
                            ref={(element) => {
                              thumbnailRefs.current[index] = element;
                            }}
                            type="button"
                            data-cursor="gallery"
                            aria-label={`Open ${viewer.kind === 'video' ? 'tape' : 'frame'} ${index + 1}: ${item.title}`}
                            onClick={() => handleQuickBrowseSelect(index)}
                            onDragStart={(event) => event.preventDefault()}
                            className={`group relative h-24 w-36 shrink-0 overflow-hidden rounded-[1.25rem] border text-left transition-all sm:h-28 sm:w-44 ${
                              index === viewer.index
                                ? 'border-gold-400 bg-gold-400/10 shadow-glow'
                                : 'border-white/10 bg-white/[0.02] hover:border-white/30'
                            }`}
                          >
                            <Image src={item.thumbSrc} alt={item.title} fill sizes="240px" className="object-cover" />

                            <div
                              className={`absolute inset-0 transition-colors ${
                                index === viewer.index ? 'bg-black/10' : 'bg-black/45 group-hover:bg-black/28'
                              }`}
                            />

                            <div className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.2em] text-gold-200">
                              {String(index + 1).padStart(2, '0')}
                            </div>

                            {item.mediaType === 'video' && (
                              <div className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border border-gold-400/20 bg-black/55 text-gold-300">
                                <Play className="ml-0.5 h-3 w-3" />
                              </div>
                            )}

                            <div className="absolute inset-x-0 bottom-0 p-3">
                              <p className="truncate text-[10px] font-bold uppercase tracking-[0.16em] text-white">{item.title}</p>
                              <p className="mt-1 truncate text-[8px] font-black uppercase tracking-[0.2em] text-white/45">{item.badge}</p>
                            </div>
                          </button>
                        ))}
                      </div>

                      <p className="mt-4 hidden text-[9px] font-black uppercase tracking-[0.24em] text-white/20 sm:block">
                        Use arrows, keyboard, or the internal strip to move through the archive.
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
