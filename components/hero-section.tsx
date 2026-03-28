'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Globe, Radio, Wind, Zap, Share2, Shield, Crosshair, Activity } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const HERO_POSTER_SRC = getBlobAssetUrl('/media/hunting area  and deers/Hunting  area  near Rotorua.jpg');
const HERO_VIDEO_SRC = getBlobAssetUrl('/media/hero-wilderness-demo.mp4');
const BRAND_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

const FIELD_REPORTS = [
  "Scout 01: North Tops clear",
  "Base: Weather window holding",
  "Ops: Logistics sync complete",
  "Alpine: Zero cloud at 2000m",
];

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const prefersReducedMotion = useReducedMotion();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nzTime, setNzTime] = useState('');
  const [canTrackPointer, setCanTrackPointer] = useState(false);
  const [reportIndex, setReportIndex] = useState(0);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px) and (pointer: fine)');
    const syncPointerMode = () => setCanTrackPointer(media.matches);

    syncPointerMode();
    media.addEventListener('change', syncPointerMode);

    return () => media.removeEventListener('change', syncPointerMode);
  }, []);

  useEffect(() => {
    if (!canTrackPointer) return undefined;

    const handleMouseMove = (event: MouseEvent) => {
      setMousePos({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [canTrackPointer]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const nz = now.toLocaleTimeString('en-NZ', {
        timeZone: 'Pacific/Auckland',
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
      });

      setNzTime(nz);
    };

    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const reportTimer = setInterval(() => {
      setReportIndex((prev) => (prev + 1) % FIELD_REPORTS.length);
    }, 4000);
    return () => clearInterval(reportTimer);
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-black font-sans">
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0" 
        style={{ y: y1 }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
      >
        <video
          autoPlay={!prefersReducedMotion}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          poster={HERO_POSTER_SRC}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        
        {/* Technical Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-forest-950/85" />
        <div className="pointer-events-none absolute inset-0 opacity-[0.05] bg-[radial-gradient(circle_at_center,_transparent_0%,_black_90%)]" />
        
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      {/* Vertical Branding */}
      <div className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 overflow-hidden select-none md:block">
        <motion.div
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 2.5, delay: 1 }}
           className="relative group"
        >
          <h2 className="lateral-watermark font-display text-[7.5rem] font-black uppercase leading-none tracking-[-0.08em] [writing-mode:vertical-lr] rotate-180 text-white/10 transition-colors duration-700 group-hover:text-gold-400/20">
            KAIMANAWA
          </h2>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
        </motion.div>
      </div>

      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-10 lg:py-0">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
          <motion.div style={{ opacity }} className="text-center lg:col-span-8 lg:text-left">
            <div className="mb-6 flex flex-col items-center gap-5 sm:mb-8 sm:flex-row sm:items-center sm:justify-center sm:gap-8 md:gap-12 lg:justify-start">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group"
              >
                <div className="pointer-events-none absolute inset-[-20px] hidden rounded-full border border-gold-400/10 sm:block sm:animate-spin-slow" />
                <div className="pointer-events-none absolute inset-[-10px] hidden rounded-full border border-dashed border-gold-400/20 sm:block" />

                <div className="relative h-32 w-32 transition-transform duration-700 hover:rotate-3 sm:h-36 sm:w-36 md:h-48 md:w-48">
                  <Image
                    src={BRAND_LOGO_SRC}
                    alt="KTS Logo"
                    fill
                    sizes="(max-width: 639px) 128px, (max-width: 767px) 160px, 224px"
                    priority
                    className="object-contain drop-shadow-[0_0_30px_rgba(200,169,110,0.15)]"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="space-y-3 text-center sm:text-left"
              >
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400 sm:text-[13px] sm:tracking-[0.4em]">
                    Kaimanawa Trophy Safaris
                  </p>
                  <div className="flex items-center justify-center gap-3 text-white/40 sm:justify-start">
                    <Globe className="h-3 w-3 text-gold-400/40" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] sm:text-[10px] sm:tracking-[0.25em]">
                      Ohakune Base - 39.4167 deg S
                    </span>
                  </div>
                </div>
                <div className="mx-auto h-px w-20 bg-gradient-to-r from-gold-400/40 to-transparent sm:mx-0 sm:w-24" />
              </motion.div>
            </div>

            <h1 className="mx-auto space-y-1 text-balance lg:mx-0 lg:max-w-3xl">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-[3.45rem] font-black uppercase leading-[0.92] tracking-tighter text-white soft-text-glow sm:text-6xl md:text-7xl lg:text-9xl"
                >
                  True NZ
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-4">
                <motion.span
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="block font-display text-[3.45rem] font-black uppercase leading-[0.92] tracking-tighter text-gold-200 sm:text-6xl md:text-7xl lg:text-9xl"
                >
                  Fair Chase
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
              className="mx-auto mt-4 max-w-xl text-base font-light italic leading-relaxed text-gray-400 sm:text-lg md:text-xl lg:mx-0"
            >
              Professional outfitting for international hunters. From the volcanic plateaus to the alpine peaks of the Southern Alps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-8 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:gap-4 lg:mt-10"
            >
              <Link
                href="#contact"
                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-full bg-gold-400 px-7 py-4 text-[10px] font-black uppercase tracking-[0.26em] text-black shadow-premium transition-all hover:scale-105 active:scale-95 sm:w-auto sm:gap-5 sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.4em]"
              >
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-shimmer" />
                <Zap className="h-3.5 w-3.5" />
                <span>Plan Expedition</span>
              </Link>
              <Link
                href="#territory"
                className="group flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-[10px] font-black uppercase tracking-[0.26em] text-white backdrop-blur-md transition-all hover:border-gold-400/50 hover:bg-white/10 sm:w-auto sm:gap-5 sm:px-10 sm:py-5 sm:text-[11px] sm:tracking-[0.4em]"
              >
                <span>Explore Territory</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Tactical Sidebar */}
          <motion.div style={{ opacity }} className="lg:col-span-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-5">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/40 p-6 shadow-premium backdrop-blur-3xl sm:p-8 lg:p-10"
              >
                {/* SVG Topographic Accent */}
                <div className="absolute -right-4 -top-4 opacity-5 pointer-events-none">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 50C50 30 150 70 200 50V200H0V50Z" stroke="white" strokeWidth="0.5"/>
                    <path d="M0 80C60 60 140 100 200 80" stroke="white" strokeWidth="0.5"/>
                    <path d="M0 110C70 90 130 130 200 110" stroke="white" strokeWidth="0.5"/>
                  </svg>
                </div>

                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10 text-gold-400 shadow-glow">
                      <Radio className="h-4 w-4 animate-pulse" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-gold-400">Live Feed</span>
                      <div className="flex items-center gap-1.5 pt-0.5">
                         <div className="h-1 w-1 rounded-full bg-emerald-500" />
                         <span className="text-[7px] font-bold uppercase tracking-widest text-emerald-400/60">SAT-LINK: STABLE</span>
                      </div>
                    </div>
                  </div>
                  <Share2 className="h-4 w-4 text-white/10" />
                </div>

                <div className="grid gap-8">
                  <div className="flex items-center gap-5">
                    <Clock className="h-5 w-5 text-white/20" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Ohakune Base Time</p>
                      <p className="font-display text-2xl font-bold leading-none tracking-[0.18em] text-white sm:text-3xl">
                        {nzTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <Wind className="h-5 w-5 text-white/20" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Field Conditions</p>
                      <p className="font-display text-2xl font-bold leading-none tracking-[0.12em] text-white sm:text-3xl">
                        12C - NW 8kn
                      </p>
                    </div>
                  </div>
                </div>

                {/* Operational Ticker */}
                <div className="mt-10 border-t border-white/5 pt-6">
                   <div className="flex items-center gap-3">
                      <Activity className="h-3 w-3 text-gold-400/40" />
                      <div className="flex-1 overflow-hidden h-4">
                         <AnimatePresence mode="wait">
                            <motion.p
                               key={reportIndex}
                               initial={{ y: 20, opacity: 0 }}
                               animate={{ y: 0, opacity: 1 }}
                               exit={{ y: -20, opacity: 0 }}
                               className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400/60"
                            >
                               {FIELD_REPORTS[reportIndex]}
                            </motion.p>
                         </AnimatePresence>
                      </div>
                   </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.1 }}
                className="group relative overflow-hidden rounded-[1.8rem] border border-gold-400/20 bg-gold-400/5 p-6 backdrop-blur-md transition-all hover:bg-gold-400/10"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Shield className="h-4 w-4 text-gold-400/60" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gold-300">Season Active</span>
                  </div>
                  <span className="font-display text-sm font-bold text-white">2026/27</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Mouse Crosshair */}
      {canTrackPointer && (
        <motion.div
          className="pointer-events-none fixed z-[100] hidden h-20 w-20 rounded-full border border-gold-400/30 mix-blend-difference lg:block"
          animate={{ 
            x: mousePos.x - 40, 
            y: mousePos.y - 40,
            scale: [1, 1.1, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ 
            x: { type: 'spring', damping: 30, stiffness: 150, mass: 0.4 },
            y: { type: 'spring', damping: 30, stiffness: 150, mass: 0.4 },
            scale: { duration: 2, repeat: Infinity },
            rotate: { duration: 10, repeat: Infinity, ease: "linear" }
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-60">
            <div className="h-px w-6 bg-gold-400" />
            <div className="absolute h-6 w-px bg-gold-400" />
            <div className="absolute inset-2 border-[0.5px] border-gold-400/20 rounded-full" />
          </div>
          <Crosshair className="absolute -right-1 -top-1 h-3 w-3 text-gold-400/40" />
        </motion.div>
      )}

      {/* Bottom Ticker */}
      <div className="pointer-events-none absolute bottom-6 left-0 hidden w-full overflow-hidden opacity-20 md:block">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-16"
        >
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex gap-16 text-[11px] font-bold uppercase tracking-[0.5em] text-white italic">
              <span>Fair Chase New Zealand</span>
              <span className="text-gold-400">-</span>
              <span>Alpine Specialist</span>
              <span className="text-gold-400">-</span>
              <span>International Outfitting</span>
              <span className="text-gold-400">-</span>
              <span>Est. 2025</span>
              <span className="text-gold-400">-</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// Add these Lucide icons to the import list: Activity, Share2, Shield, Crosshair
