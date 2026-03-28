'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X, Play, Activity, Locate, Calendar, ShieldCheck, Zap, Radar, Cpu, Lock, Globe } from 'lucide-react';
import MagneticButton from '@/components/magnetic-button';
import TextReveal from '@/components/text-reveal';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';

type GalleryImage = {
  src: string;
  alt: string;
  blobPath?: string;
  fallbackSrc?: string;
  meta?: {
    fileId: string;
    coords: string;
    date: string;
    status: string;
  };
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
    title: 'Visual Archive',
    sub: 'Full-spectrum field operations log',
    images: null as null | GalleryImage[],
  },
  {
    key: 'video',
    label: 'Field Tapes',
    title: 'Operational Footage',
    sub: 'Encrypted field recordings and cinematic teasers',
    isVideo: true,
    images: [] as GalleryImage[],
  },
  {
    key: 'trophies',
    label: 'Trophies',
    title: 'Trophy Archive',
    sub: 'Red stag · Sika · Fallow',
    images: [
      { 
        src: '/media/hunting area  and deers/Red Deer Stag.jpg', 
        alt: 'Red stag trophy portrait',
        meta: { fileId: 'TG-RD-01', coords: '39.12S 175.40E', date: 'April 2025', status: 'ARCHIVED' }
      },
      { 
        src: '/media/hunting area  and deers/Sika  deer Stag.jpg', 
        alt: 'Sika stag trophy portrait',
        meta: { fileId: 'TG-SK-02', coords: '39.05S 175.45E', date: 'March 2025', status: 'ARCHIVED' }
      },
      { 
        src: '/media/hunting area  and deers/Fellow  deer.jpg', 
        alt: 'Fallow buck trophy portrait',
        meta: { fileId: 'TG-FL-03', coords: '39.18S 175.52E', date: 'May 2025', status: 'ARCHIVED' }
      },
      { 
        src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', 
        alt: 'Country and trophy moment',
        meta: { fileId: 'FL-OP-04', coords: '38.15S 176.10E', date: 'April 2025', status: 'ARCHIVED' }
      },
    ] as GalleryImage[],
  },
  {
    key: 'country',
    label: 'Country',
    title: 'The Territory',
    sub: 'North Island bush · Alpine reach',
    images: [
      { 
        src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', 
        alt: 'North Island hill country',
        meta: { fileId: 'TR-NI-01', coords: '38.10S 176.05E', date: '2025', status: 'FIELD-READY' }
      },
      { 
        src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', 
        alt: 'Native bush and ridgelines',
        meta: { fileId: 'TR-BS-02', coords: '39.20S 175.60E', date: '2025', status: 'FIELD-READY' }
      },
      { 
        src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', 
        alt: 'Remote backcountry cover',
        meta: { fileId: 'TR-AC-03', coords: '39.30S 175.70E', date: '2025', status: 'FIELD-READY' }
      },
    ] as GalleryImage[],
  },
  {
    key: 'lodge',
    label: 'Lodge',
    title: 'Hosted Base',
    sub: 'Ohakune lodge life',
    images: [
      { 
        src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', 
        alt: 'Ohakune lodge exterior',
        meta: { fileId: 'BS-OH-01', coords: '39.27S 175.58E', date: 'Base Log', status: 'OPERATIONAL' }
      },
    ] as GalleryImage[],
  },
  {
    key: 'recent',
    label: 'Recent',
    title: 'Recent Frames',
    sub: 'Current-season archive',
    images: gallerySlike.map((img, i) => ({
      src: img.localSrc,
      fallbackSrc: img.localSrc,
      blobPath: img.blobPath,
      alt: img.alt,
      meta: { fileId: `RF-${String(i+1).padStart(2,'0')}`, coords: '39.25S 175.50E', date: 'Recent', status: 'NEW' }
    })) as GalleryImage[],
  },
];

export default function GallerySection() {
  const [activeKey, setActiveKey] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [timecode, setTimecode] = useState("00:00:00:00");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setTimecode(`${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}:${String(Math.floor(now.getMilliseconds()/10)).padStart(2,'0')}`);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const allImages: GalleryImage[] = [
    galleries[2].images![0],
    galleries[3].images![1],
    galleries[2].images![1],
    galleries[4].images![0],
    galleries[3].images![2],
    galleries[3].images![0],
  ];
  
  const galleryCollections = galleries.map((gallery) =>
    gallery.key === 'all' ? { ...gallery, images: allImages } : gallery
  );

  const active = galleryCollections.find((g) => g.key === activeKey)!;
  const images = active.images ?? allImages;
  const featured = images.slice(0, 6);
  const strip = images.slice(0, Math.min(images.length, 10));

  const next = () => {
    handleLightboxOpen(null);
    setTimeout(() => handleLightboxOpen((lightboxIndex !== null ? (lightboxIndex + 1) % images.length : null)), 50);
  };
  const prev = () => {
    handleLightboxOpen(null);
    setTimeout(() => handleLightboxOpen((lightboxIndex - 1 + images.length) % images.length), 50);
  };
  
  const handleLightboxOpen = (index: number | null) => {
    if (index !== null) {
      setIsAuthenticating(true);
      setLightboxIndex(index);
      setTimeout(() => setIsAuthenticating(false), 600);
    } else {
      setLightboxIndex(null);
    }
  };

  const lightboxImg = lightboxIndex !== null ? images[lightboxIndex] : null;

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-gold-600/4 blur-[140px]" />

      {/* Subtle Static Background Grid */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(circle,white_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* -- Cinematic Header -- */}
        <div className="mb-14 flex flex-col items-center text-center">
          <p className="mb-4 text-[10px] font-black uppercase tracking-[0.6em] text-gold-400 opacity-60">
             Operational Visual Archive // Log.2026
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8.5rem]">
            <TextReveal delay={0.1}>Gallery</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 140, opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="mt-8 flex items-center gap-4"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
            <div className="h-2 w-2 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20 shadow-glow" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/40 to-transparent" />
          </motion.div>
          <p className="mx-auto mt-10 max-w-xl text-sm italic leading-relaxed text-white/40 sm:text-lg">
            &ldquo;Trophy portraits, country texture, field rhythm, and lodge atmosphere.&rdquo;
          </p>
        </div>

        {/* -- Tactical Tabs -- */}
        <div className="-mx-4 mb-14 overflow-x-auto px-4 no-scrollbar">
          <div className="flex w-max min-w-full gap-3 md:flex-wrap md:justify-center">
            {galleryCollections.map((g) => (
              <button
                key={g.key}
                onClick={() => { setActiveKey(g.key); handleLightboxOpen(null); }}
                className={`group relative flex items-center gap-4 whitespace-nowrap rounded-full border px-8 py-5 text-[10px] font-black uppercase tracking-[0.35em] transition-all duration-500 ${
                  activeKey === g.key
                    ? 'border-gold-400/50 bg-gold-400/15 text-gold-300 shadow-glow ring-1 ring-gold-400/20'
                    : 'border-white/10 bg-white/[0.04] text-gray-500 hover:border-gold-400/20 hover:text-white'
                }`}
              >
                {activeKey === g.key && <motion.span layoutId="gallery-cat-v2" className="h-1.5 w-1.5 rounded-full bg-gold-400 shadow-glow" />}
                {g.label}
                <span className={`text-[8px] tabular-nums ${activeKey === g.key ? 'text-gold-400/60' : 'text-white/10'}`}>
                  {g.key === 'video' ? 'LIVE' : (g.images?.length ?? images.length)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* -- Header Stats -- */}
        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-white/5 pb-10">
           <div>
              <div className="flex items-center gap-3 mb-2">
                 <div className="h-1 w-1 bg-gold-400 rounded-full" />
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/40">Active Category</span>
              </div>
              <h3 className="font-display text-4xl font-bold uppercase tracking-tight text-white md:text-6xl">{active.title}</h3>
           </div>
           
           <div className="flex flex-wrap gap-8">
              {[
                 { label: 'Archive Sync', val: '100%', color: 'text-green-500/60' },
                 { label: 'Frames localized', val: `${images.length}`, color: 'text-white/40' },
                 { label: 'Signal Quality', val: 'A-LEVEL', color: 'text-gold-400/40' }
              ].map(stat => (
                 <div key={stat.label} className="flex flex-col gap-1.5">
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20">{stat.label}</span>
                    <span className={`text-[11px] font-bold uppercase tracking-widest ${stat.color}`}>{stat.val}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* -- Media Content -- */}
        <AnimatePresence mode="wait">
          {activeKey === 'video' ? (
             <motion.div
               key="field-tapes"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="relative overflow-hidden rounded-[3.5rem] border border-white/10 bg-forest-950 aspect-video shadow-premium"
             >
                <Image
                  src={getBlobAssetUrl('/media/hunting area  and deers/Hunting  area  near Rotorua.jpg')}
                  alt="Field Tapes HUD"
                  fill
                  className="object-cover opacity-60 contrast-[1.2] grayscale-[30%]"
                />
                
                {/* ADVANCED HUD */}
                <div className="absolute inset-0 px-10 py-10 flex flex-col justify-between z-20">
                   <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-2">
                         <div className="flex items-center gap-4">
                            <div className="h-3 w-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_12px_rgba(220,38,38,0.8)]" />
                            <span className="text-[11px] font-black uppercase text-white tracking-[0.5em]">REC // STAG_RUT_TEASER_V1</span>
                         </div>
                         <div className="flex items-center gap-4 ml-7">
                            <Activity className="h-3 w-3 text-gold-400/40" />
                            <span className="text-[9px] font-bold text-gray-500 tracking-widest uppercase">Signal: -74dBm // Secure</span>
                         </div>
                      </div>
                      <div className="text-right flex flex-col gap-1">
                         <p className="text-2xl font-mono font-black text-gold-400 tabular-nums">{timecode}</p>
                         <div className="flex items-center justify-end gap-3 opacity-30">
                            <Globe className="h-3 w-3" />
                            <span className="text-[8px] font-bold uppercase tracking-widest">Master Link: ACTIVE</span>
                         </div>
                      </div>
                   </div>

                   <div className="flex flex-col items-center gap-4">
                      <div className="group relative flex h-20 w-20 cursor-pointer items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10 backdrop-blur-3xl transition-all hover:scale-115 hover:bg-gold-500 hover:text-black">
                         <Play className="h-6 w-6 ml-1 transition-transform group-hover:scale-110" />
                         <div className="absolute -inset-4 animate-ping rounded-full border border-gold-400/10" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">Unlock Field Archive</p>
                   </div>

                   <div className="flex items-end justify-between border-t border-white/10 pt-8">
                      <div className="max-w-md">
                         <div className="flex items-center gap-3 mb-2">
                            <Radar className="h-4 w-4 text-gold-400/60" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-300">Observation Report</span>
                         </div>
                         <p className="text-xs text-white/50 leading-relaxed font-medium">Sub-alpine scrub observation, North Island tops. High-resolution stag behavior tracking collected during season 2025.</p>
                      </div>
                      <div className="text-right flex flex-col gap-2">
                         <span className="text-[11px] font-bold text-white/20 uppercase tracking-[0.3em]">Encryption: LEVEL_8</span>
                         <span className="text-[10px] font-black text-gold-400/50 uppercase tracking-widest">SAT_LINK_ENABLED</span>
                      </div>
                   </div>
                </div>
             </motion.div>
          ) : (
             <motion.div
               key={activeKey + '-grid'}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="grid auto-rows-[12rem] grid-cols-2 gap-4 sm:auto-rows-[15rem] md:auto-rows-[18rem] md:grid-cols-12 md:gap-8"
             >
                {featured.map((img, i) => {
                  const src = buildBlobImageSrc(img);
                  const gridClass = [
                    'col-span-2 row-span-2 md:col-span-8 md:row-span-2',
                    'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
                    'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
                    'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
                    'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
                    'col-span-2 row-span-1 md:col-span-4 md:row-span-1',
                  ][i];

                  return (
                    <motion.button
                      key={`${activeKey}-${i}`}
                      type="button"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, delay: i * 0.08 }}
                      onClick={() => handleLightboxOpen(i)}
                      className={`group relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-premium transition-all duration-700 hover:-translate-y-2 hover:border-gold-400/40 ${gridClass}`}
                    >
                      <Image
                        src={src}
                        alt={img.alt}
                        fill
                        sizes="(max-width:768px) 100vw, 40vw"
                        className="object-cover transition-transform duration-[6000ms] group-hover:scale-120 grayscale-[20%] group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
                      
                      {/* -- ANALYTICAL OVERLAYS -- */}
                      {/* Corner Brackets */}
                      <div className="absolute inset-4 pointer-events-none border border-white/5 opacity-40 group-hover:opacity-100 transition-opacity">
                         <div className="absolute left-0 top-0 h-3 w-3 border-l-2 border-t-2 border-gold-400/40" />
                         <div className="absolute right-0 top-0 h-3 w-3 border-r-2 border-t-2 border-gold-400/40" />
                         <div className="absolute left-0 bottom-0 h-3 w-3 border-l-2 border-b-2 border-gold-400/40" />
                         <div className="absolute right-0 bottom-0 h-3 w-3 border-r-2 border-b-2 border-gold-400/40" />
                      </div>

                      {/* Vertical Scanning Line */}
                      <motion.div 
                        initial={{ top: "-100%" }}
                        animate={{ top: "200%" }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-0 h-20 bg-gradient-to-b from-transparent via-gold-400/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100"
                      />

                      {/* TACTICAL METADATA (HOVER) */}
                      <div className="absolute inset-0 bg-forest-950/40 opacity-0 transition-opacity duration-500 group-hover:opacity-100 backdrop-blur-[3px]">
                         <div className="absolute inset-0 p-10 flex flex-col justify-between">
                            <div className="flex items-start justify-between">
                               <div className="flex flex-col gap-1">
                                  <span className="text-[9px] font-black uppercase text-gold-400/40 tracking-[0.4em]">Archive Index</span>
                                  <span className="text-sm font-bold text-white tracking-widest">{img.meta?.fileId}</span>
                               </div>
                               <Locate className="h-5 w-5 text-gold-400/30" />
                            </div>

                            <div className="space-y-6">
                               <div className="flex items-center gap-4">
                                  <Calendar className="h-4 w-4 text-gold-400/60" />
                                  <span className="text-[10px] font-bold text-gray-200 tracking-[0.4em] uppercase">{img.meta?.date}</span>
                               </div>
                               <div className="flex items-center gap-4">
                                  <Locate className="h-4 w-4 text-gold-400/60" />
                                  <span className="text-[10px] font-bold text-gray-200 tracking-[0.4em] uppercase">{img.meta?.coords}</span>
                               </div>
                            </div>

                            <div className="flex items-center justify-between border-t border-white/10 pt-6">
                               <div className="flex items-center gap-2">
                                  <div className="h-2 w-2 rounded-full bg-gold-400 shadow-glow" />
                                  <span className="text-[10px] font-black text-gold-300 uppercase tracking-widest">{img.meta?.status}</span>
                               </div>
                               <div className="h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-black/40">
                                  <Maximize2 className="h-5 w-5 text-white/20" />
                                </div>
                            </div>
                         </div>
                      </div>

                      {/* Static ID Badge */}
                      <div className="absolute left-8 top-8 opacity-100 group-hover:opacity-0 transition-all">
                         <span className="rounded-lg border border-white/10 bg-black/60 px-4 py-2 text-[10px] font-bold text-gold-400 tracking-widest">
                           {String(i + 1).padStart(2, '0')}
                         </span>
                      </div>
                    </motion.button>
                  );
                })}
             </motion.div>
          )}
        </AnimatePresence>

        {/* -- Cinematic Filmstrip (Raw Negative) -- */}
        {activeKey !== 'video' && (
           <div className="mt-12 rounded-[2.5rem] border border-white/5 bg-black/40 p-6 shadow-premium backdrop-blur-3xl sm:p-8">
              <p className="mb-6 text-[9px] font-black uppercase tracking-[0.6em] text-white/10 text-center">Reference Filmstrip // RAW_CAPTURE_STREAM</p>
              <div className="no-scrollbar flex gap-5 overflow-x-auto pb-2">
                {strip.map((img, i) => (
                  <button
                    key={`strip-${activeKey}-${i}`}
                    type="button"
                    onClick={() => handleLightboxOpen(i)}
                    className={`group relative h-24 w-40 shrink-0 overflow-hidden rounded-[1.2rem] border transition-all duration-500 sm:h-28 sm:w-48 ${
                       i === lightboxIndex ? 'border-gold-400 scale-[1.02] shadow-glow' : 'border-white/5 opacity-40 hover:opacity-100'
                    }`}
                  >
                    <Image src={buildBlobImageSrc(img)} alt={img.alt} fill className="object-cover" />
                    
                    {/* Sprocket Holes Effect */}
                    <div className="absolute inset-y-0 left-1 w-2 flex flex-col justify-around opacity-20 group-hover:opacity-40 transition-opacity">
                       {[1,2,3,4].map(x => <div key={x} className="h-1.5 w-1.5 rounded-sm bg-white" />)}
                    </div>
                    <div className="absolute inset-y-0 right-1 w-2 flex flex-col justify-around opacity-20 group-hover:opacity-40 transition-opacity">
                       {[1,2,3,4].map(x => <div key={x} className="h-1.5 w-1.5 rounded-sm bg-white" />)}
                    </div>

                    <div className={`absolute inset-0 ${i === lightboxIndex ? 'bg-transparent' : 'bg-black/30 group-hover:bg-transparent transition-colors'}`} />
                    <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] font-black text-gold-400/40 uppercase tracking-widest">FRM_{String(i + 1).padStart(2, '0')}</span>
                  </button>
                ))}
              </div>
           </div>
        )}
      </div>

      {/* -- Tactical Lightbox 3.0 -- */}
      <AnimatePresence>
        {lightboxIndex !== null && lightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000] bg-forest-950/98 backdrop-blur-3xl"
            onClick={() => handleLightboxOpen(null)}
          >
            {/* Top Tactical Header */}
            <div className="absolute inset-x-0 top-0 z-[1110] flex flex-col gap-6 px-10 py-10 md:flex-row md:items-center md:justify-between">
              <div className="rounded-[2.8rem] border border-white/10 bg-black/60 px-10 py-6 backdrop-blur-2xl">
                 <div className="flex items-center gap-4 mb-2">
                    <ShieldCheck className="h-3 w-3 text-gold-400" />
                    <p className="text-[11px] font-black uppercase tracking-[0.5em] text-gold-400/40">Verified Field Data</p>
                    <div className="h-px w-8 bg-white/10" />
                    <p className="text-[10px] font-bold text-gray-500 tracking-[0.3em] uppercase">Archive Rank: ALPHA</p>
                 </div>
                 <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-4xl">{lightboxImg.alt}</h2>
                 <div className="mt-4 flex gap-8">
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Operational ID</span>
                       <span className="text-[12px] font-bold text-gold-400 tabular-nums">{lightboxImg.meta?.fileId}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                       <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">Access Status</span>
                       <span className="text-[11px] font-bold text-green-500/60 uppercase tracking-widest font-mono">AUTHORIZED_VIEW</span>
                    </div>
                 </div>
              </div>

              <div className="flex gap-4">
                 <MagneticButton strength={0.3} onClick={() => handleLightboxOpen(null)} className="h-16 w-16 flex items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/50 hover:bg-gold-500 hover:text-black transition-all hover:rotate-90">
                    <X className="h-8 w-8" />
                 </MagneticButton>
              </div>
            </div>

            {/* Central Viewport with Scan Effect */}
            <motion.div
              key={lightboxIndex}
              className="relative z-[1100] mx-auto flex h-full max-w-7xl items-center justify-center px-10 pb-44 pt-40"
              onClick={(e) => e.stopPropagation()}
            >
               <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[4rem] border border-white/10 bg-black/40 shadow-premium">
                  {/* Background Topographic Accents */}
                  <div className="absolute inset-0 opacity-[0.08] pointer-events-none overflow-hidden">
                     <svg width="100%" height="100%" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
                        <motion.path 
                           animate={{ d: ["M0,500 Q250,450 500,500 T1000,500", "M0,500 Q250,550 500,500 T1000,500", "M0,500 Q250,450 500,500 T1000,500"] }}
                           transition={{ duration: 10, repeat: Infinity }}
                           stroke="gold" strokeWidth="0.5" fill="none" opacity="0.3" 
                        />
                        <motion.path 
                           animate={{ d: ["M0,300 C200,250 400,350 600,300 S1000,350 1000,300", "M0,300 C200,350 400,250 600,300 S1000,250 1000,300", "M0,300 C200,250 400,350 600,300 S1000,350 1000,300"] }}
                           transition={{ duration: 15, repeat: Infinity }}
                           stroke="gold" strokeWidth="0.3" fill="none" opacity="0.2" 
                        />
                     </svg>
                  </div>

                  <AnimatePresence>
                    {isAuthenticating ? (
                       <motion.div 
                         initial={{ opacity: 0 }} 
                         animate={{ opacity: 1 }} 
                         exit={{ opacity: 0 }}
                         className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-forest-950/80 backdrop-blur-lg"
                       >
                          <Cpu className="h-12 w-12 text-gold-400 mb-6 animate-spin-slow" />
                          <p className="text-[12px] font-black uppercase tracking-[0.8em] text-gold-400 animate-pulse">Authenticating Frame...</p>
                          <div className="mt-8 h-px w-48 bg-white/5 relative overflow-hidden">
                             <motion.div 
                               initial={{ left: "-100%" }} 
                               animate={{ left: "100%" }} 
                               transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                               className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" 
                             />
                          </div>
                       </motion.div>
                    ) : (
                       <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full w-full flex items-center justify-center p-12">
                          <Image src={buildBlobImageSrc(lightboxImg)} alt={lightboxImg.alt} width={2560} height={1440} className="max-h-full max-w-full object-contain shadow-[0_0_100px_rgba(0,0,0,0.8)]" />
                       </motion.div>
                    )}
                  </AnimatePresence>
               </div>
            </motion.div>

            {/* Bottom Metadata Dashboard */}
            <div className="absolute inset-x-0 bottom-0 z-[1110] px-10 pb-12">
               <div className="mx-auto max-w-6xl rounded-[3.5rem] border border-white/10 bg-black/60 p-8 backdrop-blur-3xl shadow-premium">
                  <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
                     
                     {/* Analytical Logs */}
                     <div className="grid grid-cols-2 gap-x-12 gap-y-6 md:grid-cols-4 lg:flex-1 lg:max-w-4xl">
                        {[
                           { label: 'File Hash', value: lightboxImg.meta?.fileId, icon: Lock },
                           { label: 'Field Coords', value: lightboxImg.meta?.coords, icon: Locate },
                           { label: 'Capture Date', value: lightboxImg.meta?.date, icon: Calendar },
                           { label: 'Archive Rank', value: i === 0 ? 'SIGNATURE' : 'OPERATIONAL', icon: Zap }
                        ].map((stat) => (
                           <div key={stat.label} className="flex flex-col gap-2">
                              <div className="flex items-center gap-3 opacity-30">
                                 <stat.icon className="h-3 w-3" />
                                 <span className="text-[8px] font-black uppercase tracking-[0.3em]">{stat.label}</span>
                              </div>
                              <span className="text-[11px] font-bold text-white uppercase tracking-widest">{stat.value}</span>
                           </div>
                        ))}
                     </div>

                     {/* Navigation System */}
                     <div className="flex items-center gap-4 lg:pl-12 lg:border-l lg:border-white/5">
                        <MagneticButton strength={0.4} onClick={(e) => { e.stopPropagation(); prev(); }} className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-gold-500/10 hover:border-gold-400">
                           <ChevronLeft className="h-6 w-6 text-white/40 group-hover:text-gold-400" />
                        </MagneticButton>
                        <MagneticButton strength={0.4} onClick={(e) => { e.stopPropagation(); next(); }} className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 hover:bg-gold-500/10 hover:border-gold-400">
                           <ChevronRight className="h-6 w-6 text-white/40 group-hover:text-gold-400" />
                        </MagneticButton>
                     </div>
                  </div>
                  
                  {/* Data Flow Bar */}
                  <div className="mt-8 flex items-center justify-between border-t border-white/5 pt-6">
                     <span className="text-[9px] font-black uppercase text-gold-400/20 tracking-[0.5em]">SYSTEM_STABLE: OK</span>
                     <div className="flex items-center gap-2">
                        <div className="h-1 w-1 rounded-full bg-gold-400 animate-pulse" />
                        <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest font-mono">STREAMING_ENCRYPTED_DATA_PACKET_99%</span>
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
