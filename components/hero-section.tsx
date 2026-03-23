'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Clock, Globe, Radio, Wind, Zap } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const HERO_POSTER_SRC = getBlobAssetUrl('/media/hunting area  and deers/Hunting  area  near Rotorua.jpg');
const HERO_VIDEO_SRC = getBlobAssetUrl('/media/hero-wilderness-demo.mp4');
const BRAND_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const prefersReducedMotion = useReducedMotion();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nzTime, setNzTime] = useState('');
  const [canTrackPointer, setCanTrackPointer] = useState(false);

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

  return (
    <section id="home" className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-black font-sans">
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
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
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-transparent to-forest-950/85" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </motion.div>

      <div className="pointer-events-none absolute left-12 top-1/2 hidden -translate-y-1/2 overflow-hidden select-none md:block">
        <motion.h2
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lateral-watermark font-display text-[7rem] font-black uppercase leading-none tracking-[-0.08em] [writing-mode:vertical-lr] rotate-180"
        >
          KAIMANAWA
        </motion.h2>
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

                <div className="relative h-32 w-32 transition-transform duration-700 hover:rotate-3 sm:h-40 sm:w-40 md:h-56 md:w-56">
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
                  <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-400 sm:text-[14px] sm:tracking-[0.4em]">
                    Kaimanawa Trophy Safaris
                  </p>
                  <div className="flex items-center justify-center gap-3 text-white/40 sm:justify-start">
                    <Globe className="h-3 w-3" />
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
              className="mx-auto mt-6 max-w-xl text-base font-light italic leading-relaxed text-gray-400 sm:text-lg md:mt-8 md:text-xl lg:mx-0"
            >
              Professional outfitting for international hunters. From the volcanic plateaus to the alpine peaks of the Southern Alps.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4 lg:mt-12"
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

          <motion.div style={{ opacity }} className="lg:col-span-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 lg:gap-6">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 1.8 }}
                className="rounded-[2rem] border border-white/8 bg-forest-900/30 p-5 shadow-premium backdrop-blur-3xl sm:p-6 md:p-10"
              >
                <div className="mb-6 flex items-center justify-between border-b border-white/5 pb-4 sm:mb-8 sm:pb-5 md:mb-10 md:pb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10 text-gold-400 shadow-glow sm:h-10 sm:w-10">
                      <Radio className="h-4 w-4 animate-pulse" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-400 sm:text-[11px] sm:tracking-[0.3em]">
                      Live Feed
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/70">Secure</span>
                  </div>
                </div>

                <div className="grid gap-6 sm:gap-8 md:gap-10">
                  <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                    <Clock className="h-4 w-4 text-white/20 sm:h-5 sm:w-5" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Ohakune Base Time</p>
                      <p className="font-display text-2xl font-bold leading-none tracking-[0.18em] text-white sm:text-3xl sm:tracking-widest">
                        {nzTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-5 md:gap-6">
                    <Wind className="h-4 w-4 text-white/20 sm:h-5 sm:w-5" />
                    <div>
                      <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.25em] text-white/30">Field Conditions</p>
                      <p className="font-display text-2xl font-bold leading-none tracking-[0.12em] text-white sm:text-3xl sm:tracking-widest">
                        12C - NW 8kn
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 2.1 }}
                className="group relative overflow-hidden rounded-[1.6rem] border border-gold-400/20 bg-gold-400/5 p-5 backdrop-blur-md transition-all hover:bg-gold-400/10 sm:p-6"
              >
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="h-2 w-2 animate-ping rounded-full bg-gold-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gold-300 sm:text-[11px] sm:tracking-[0.4em]">
                      Season Active
                    </span>
                  </div>
                  <span className="text-[13px] font-display font-bold text-white sm:text-[14px]">2026/27</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {canTrackPointer && (
        <motion.div
          className="pointer-events-none fixed z-[100] hidden h-32 w-32 rounded-full border border-gold-400/15 mix-blend-difference lg:block"
          animate={{ x: mousePos.x - 64, y: mousePos.y - 64 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.5 }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-30">
            <div className="h-px w-8 bg-gold-400" />
            <div className="absolute h-8 w-px bg-gold-400" />
          </div>
        </motion.div>
      )}

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
