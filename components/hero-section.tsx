'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Globe, Zap, Radio, Clock, Wind, ArrowUpRight } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';

const HERO_POSTER_SRC = getBlobAssetUrl('/media/hunting area  and deers/Hunting  area  near Rotorua.jpg');
const HERO_VIDEO_SRC = getBlobAssetUrl('/media/hero-wilderness-demo.mp4');
const BRAND_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 300]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [nzTime, setNzTime] = useState('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    
    const updateTime = () => {
      const now = new Date();
      const nz = now.toLocaleTimeString('en-NZ', { 
        timeZone: 'Pacific/Auckland', 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      });
      setNzTime(nz);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timer);
    };
  }, []);

  return (
    <section id="home" className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-black font-sans">
      
      {/* ── Background Layer ── */}
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster={HERO_POSTER_SRC}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-forest-950/80" />
        
        {/* Technical Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(rgba(200,169,110,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.5) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />
      </motion.div>

      {/* ── Massive Watermark (Premium Editorial) ── */}
      <div className="absolute left-12 top-1/2 -translate-y-1/2 overflow-hidden pointer-events-none select-none hidden md:block">
        <motion.h2 
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 2.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="lateral-watermark font-display text-[7rem] font-black uppercase leading-none tracking-[-0.08em] [writing-mode:vertical-lr] rotate-180"
        >
          KAIMANAWA
        </motion.h2>
      </div>

      {/* ── Main Content Container ── */}
      <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-10">
        
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            
            {/* Left Column: Branding & Headline (8 cols) */}
            <motion.div 
              style={{ opacity }}
              className="lg:col-span-8"
            >
              {/* Branding Group */}
              <div className="mb-10 flex flex-col sm:flex-row sm:items-center gap-8 md:gap-12">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Aperture HUD */}
                  <div className="absolute inset-[-30px] rounded-full border border-gold-400/10 animate-spin-slow pointer-events-none" />
                  <div className="absolute inset-[-15px] rounded-full border border-gold-400/20 border-dashed pointer-events-none" />
                  
                  <div className="relative h-44 w-44 md:h-56 md:w-56 transition-transform duration-700 hover:rotate-3">
                     <Image 
                       src={BRAND_LOGO_SRC} 
                       alt="KTS Logo" 
                       fill 
                       priority
                       className="object-contain drop-shadow-[0_0_30px_rgba(200,169,110,0.15)]" 
                     />
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="space-y-4"
                >
                   <div className="flex flex-col gap-1">
                      <p className="text-[14px] font-bold uppercase tracking-[0.4em] text-gold-400">
                         Kaimanawa Trophy Safaris
                      </p>
                      <div className="flex items-center gap-3 text-white/40">
                         <Globe className="h-3 w-3" />
                         <span className="text-[10px] font-bold uppercase tracking-[0.25em]">Ohakune Base · 39.4167° S</span>
                      </div>
                   </div>
                   <div className="h-px w-24 bg-gradient-to-r from-gold-400/40 to-transparent" />
                </motion.div>
              </div>

              {/* Headline */}
              <h1 className="space-y-2 text-balance lg:max-w-3xl">
                 <span className="block overflow-hidden">
                    <motion.span 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="block font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter text-white md:text-7xl lg:text-9xl soft-text-glow"
                    >
                      True NZ
                    </motion.span>
                 </span>
                 <span className="block overflow-hidden pb-4">
                    <motion.span 
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                      className="block font-display text-5xl font-black uppercase leading-[0.9] tracking-tighter text-gold-200 md:text-7xl lg:text-9xl"
                    >
                      Fair Chase
                    </motion.span>
                 </span>
              </h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="mt-8 max-w-xl text-lg font-light italic leading-relaxed text-gray-400 md:text-xl"
              >
                Professional outfitting for international hunters. From the volcanic plateaus to the alpine peaks of the Southern Alps.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="mt-12 flex flex-col gap-5 sm:flex-row"
              >
                 <Link href="#contact" className="group relative flex items-center justify-center gap-5 overflow-hidden rounded-full bg-gold-400 px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] text-black shadow-premium transition-all hover:scale-105 active:scale-95">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-shimmer" />
                    <Zap className="h-3.5 w-3.5" />
                    <span>Plan Expedition</span>
                 </Link>
                 <Link href="#territory" className="group flex items-center justify-center gap-5 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-[11px] font-black uppercase tracking-[0.4em] text-white backdrop-blur-md transition-all hover:border-gold-400/50 hover:bg-white/10">
                    <span>Explore Territory</span>
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </Link>
              </motion.div>
            </motion.div>

            {/* Right Column: Operational Data (4 cols) */}
            <motion.div 
              style={{ opacity }}
              className="lg:col-span-4"
            >
              <div className="flex flex-col gap-6">
                {/* Live Status Card */}
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 1.8 }}
                  className="rounded-[2.5rem] border border-white/8 bg-forest-900/30 p-8 md:p-10 backdrop-blur-3xl shadow-premium"
                >
                  <div className="mb-10 flex items-center justify-between border-b border-white/5 pb-6">
                     <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400 shadow-glow">
                           <Radio className="h-4 w-4 animate-pulse" />
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gold-400">Live Feed</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/70">Secure</span>
                     </div>
                  </div>
                  
                  <div className="grid gap-10">
                     <div className="flex items-center gap-6">
                        <Clock className="h-5 w-5 text-white/20" />
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 mb-1">Ohakune Base Time</p>
                          <p className="font-display text-3xl font-bold text-white tracking-widest leading-none">{nzTime}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <Wind className="h-5 w-5 text-white/20" />
                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/30 mb-1">Field Conditions</p>
                          <p className="font-display text-3xl font-bold text-white tracking-widest leading-none">+12°C · NW 8kn</p>
                        </div>
                     </div>
                  </div>
                </motion.div>

                {/* Season Badge (Technical) */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 2.1 }}
                  className="group relative overflow-hidden rounded-2xl border border-gold-400/20 bg-gold-400/5 p-6 backdrop-blur-md transition-all hover:bg-gold-400/10"
                >
                   <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-4">
                         <div className="h-2 w-2 rounded-full bg-gold-400 animate-ping" />
                         <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gold-300">Season Active</span>
                      </div>
                      <span className="text-[14px] font-display font-bold text-white">2026/27</span>
                   </div>
                </motion.div>
              </div>
            </motion.div>
        </div>

      </div>

      {/* ── Floating Visual Elements ── */}
      
      {/* Scope Reticle (Mouse Follow) */}
      <motion.div 
        className="pointer-events-none fixed z-[100] h-32 w-32 rounded-full border border-gold-400/15 mix-blend-difference hidden lg:block"
        animate={{ x: mousePos.x - 64, y: mousePos.y - 64 }}
        transition={{ type: 'spring', damping: 25, stiffness: 120, mass: 0.5 }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-30">
           <div className="h-px w-8 bg-gold-400" />
           <div className="h-8 w-px bg-gold-400 absolute" />
        </div>
      </motion.div>

      {/* Bottom ticker banner */}
      <div className="absolute bottom-6 left-0 w-full overflow-hidden pointer-events-none opacity-20">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap gap-16"
        >
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex gap-16 text-[11px] font-bold uppercase tracking-[0.5em] text-white italic">
              <span>Fair Chase New Zealand</span>
              <span className="text-gold-400">·</span>
              <span>Alpine Specialist</span>
              <span className="text-gold-400">·</span>
              <span>International Outfitting</span>
              <span className="text-gold-400">·</span>
              <span>Est. 1988</span>
              <span className="text-gold-400">·</span>
            </div>
          ))}
        </motion.div>
      </div>

    </section>
  );
}
