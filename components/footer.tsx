'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronUp, Facebook, Instagram, Linkedin, Mail, MapPin, Mountain, Phone, ShieldCheck, Clock } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import MagneticButton from '@/components/magnetic-button';

const FOOTER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const [nzTime, setNzTime] = useState('');

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Ticking NZ Time
    const interval = setInterval(() => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Pacific/Auckland',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setNzTime(new Intl.DateTimeFormat('en-GB', options).format(new Date()));
    }, 1000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden bg-transparent pb-14 pt-16 font-sans sm:pt-20 md:pb-20 md:pt-40">
      {/* Immersive Foundation Decor */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-600/5 blur-[120px]" />

      {/* Topographic Background Decor */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <motion.path 
            initial={{ d: "M0,200 Q250,150 500,200 T1000,200 V400 H0 Z" }}
            animate={{ d: ["M0,200 Q250,150 500,200 T1000,200 V400 H0 Z", "M0,200 Q250,250 500,200 T1000,200 V400 H0 Z", "M0,200 Q250,150 500,200 T1000,200 V400 H0 Z"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            fill="rgba(255,255,255,0.05)" 
          />
          <motion.path 
            initial={{ d: "M0,100 C200,50 400,150 600,100 S1000,150 1000,100" }}
            animate={{ d: ["M0,100 C200,50 400,150 600,100 S1000,150 1000,100", "M0,100 C200,150 400,50 600,100 S1000,50 1000,100", "M0,100 C200,50 400,150 600,100 S1000,150 1000,100"] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            stroke="gold" strokeWidth="0.5" fill="none" opacity="0.1" 
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 border-b border-white/5 pb-14 md:pb-28 lg:grid-cols-12 lg:gap-20">
          
          {/* LOGO & NARRATIVE PILLAR */}
          <div className="space-y-8 sm:space-y-10 lg:col-span-5">
            <div className="flex items-start gap-4 sm:items-center sm:gap-6">
              <div className="relative group h-16 w-16 overflow-hidden rounded-[1.4rem] border border-gold-400/30 bg-black p-3 shadow-premium transition-transform hover:scale-105">
                <Image src={FOOTER_LOGO_SRC} alt="Kaimanawa" fill sizes="64px" className="object-contain p-2" />
                <div className="absolute -inset-2 bg-gold-400/10 blur-[20px] opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold uppercase tracking-[0.22em] text-white sm:tracking-[0.3em]">
                  Kaimanawa
                </h4>
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-gold-400/60 sm:text-[10px] sm:tracking-[0.45em]">
                   Trophy Safaris // NZ.2026
                </p>
              </div>
            </div>

            <p className="max-w-md text-lg italic leading-relaxed text-gray-400 sm:text-xl md:leading-[1.6]">
              Curated New Zealand hunting programs focusing on fair chase, field ethics, and the hosted rhythm of the South Pacific.
            </p>

            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <MagneticButton key={index} strength={0.3}>
                  <a
                    href="#"
                    className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/40 transition-all hover:bg-gold-500/10 hover:border-gold-400/50 hover:text-gold-400"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* NAVIGATION ARCHIVE PILLAR */}
          <div className="lg:col-span-3">
            <h5 className="mb-8 border-l border-gold-400/30 pl-4 text-[9px] font-black uppercase tracking-[0.28em] text-gold-400/30 sm:mb-10 sm:text-[10px] sm:tracking-[0.6em]">
              Navigation Archive
            </h5>
            <ul className="grid gap-5">
              {[
                { label: 'Story', href: '#story', id: '01' },
                { label: 'Territory', href: '#territory', id: '02' },
                { label: 'Species', href: '#species', id: '03' },
                { label: 'Stay', href: '#stay', id: '04' },
                { label: 'Gallery', href: '#gallery', id: '05' },
                { label: 'Contact', href: '#contact', id: '06' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.18em] text-gray-400 transition-all hover:translate-x-3 hover:text-gold-300 sm:gap-4 sm:text-[11px] sm:tracking-[0.25em]"
                  >
                    <span className="text-[9px] tabular-nums font-black text-white/10 group-hover:text-gold-400/40">[{item.id}]</span>
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400/40 transition-all group-hover:w-full" />
                    </span>
                    <ArrowUpRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* OPERATIONAL CONTACT PILLAR */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            <h5 className="border-l border-gold-400/30 pl-4 text-[9px] font-black uppercase tracking-[0.28em] text-gold-400/30 sm:text-[10px] sm:tracking-[0.6em]">
              Operational Contact
            </h5>
            <div className="space-y-6 sm:space-y-8">
              <div className="group flex items-center gap-4 sm:gap-6">
                <div className="relative h-12 w-12 flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-gold-400/50 shadow-premium group-hover:bg-gold-500/10 group-hover:text-gold-400 transition-all">
                  <Phone className="h-5 w-5" />
                  <div className="absolute -inset-px rounded-2xl border border-gold-400/5 opacity-0 group-hover:opacity-30" />
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 sm:text-[9px] sm:tracking-[0.4em]">
                    Primary Link // Signal: Stable
                  </p>
                  <a href="tel:+642108850131" className="text-base font-bold text-gray-300 transition-colors hover:text-white tracking-[0.12em]">
                    +64 21 088 50131
                  </a>
                </div>
              </div>
              
              <div className="group flex items-center gap-4 sm:gap-6">
                <div className="relative h-12 w-12 flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-gold-400/50 shadow-premium group-hover:bg-gold-500/10 group-hover:text-gold-400 transition-all">
                  <Mail className="h-5 w-5" />
                  <div className="absolute -inset-px rounded-2xl border border-gold-400/5 opacity-0 group-hover:opacity-30" />
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 sm:text-[9px] sm:tracking-[0.4em]">
                    Secure Email // Enc: AES-256
                  </p>
                  <a href="mailto:hunting@kaimanawasafaris.com" className="break-all text-base font-bold text-gray-300 transition-colors hover:text-white">
                    hunting@kaimanawasafaris.com
                  </a>
                </div>
              </div>

              <div className="group flex items-center gap-4 sm:gap-6">
                <div className="relative h-12 w-12 flex items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-gold-400/50 shadow-premium group-hover:bg-gold-500/10 group-hover:text-gold-400 transition-all">
                  <MapPin className="h-5 w-5" />
                  <div className="absolute -inset-px rounded-2xl border border-gold-400/5 opacity-0 group-hover:opacity-30" />
                </div>
                <div className="min-w-0">
                  <p className="mb-1 text-[8px] font-black uppercase tracking-[0.2em] text-white/20 sm:text-[9px] sm:tracking-[0.4em]">
                    HQ Location // NZ Base
                  </p>
                  <p className="text-base font-bold text-gray-300 tracking-[0.12em]">Ohakune - New Zealand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM COMMAND BAR */}
        <div className="mt-12 flex flex-col gap-8 md:mt-20 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:gap-14">
            <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/20 sm:text-[10px] sm:tracking-[0.4em]">
              Copyright 2026 Kaimanawa Trophy Safaris
            </p>
            
            <div className="flex flex-wrap items-center gap-3 rounded-full border border-gold-500/10 bg-gold-400/5 px-5 py-2.5 backdrop-blur-3xl shadow-glow sm:px-6">
              <ShieldCheck className="h-4 w-4 text-gold-400/60" />
              <span className="text-[8px] font-black uppercase tracking-[0.18em] text-gold-300/80 sm:text-[9px] sm:tracking-[0.35em]">
                Secure Consultation Protocol
              </span>
              <div className="h-2 w-2 rounded-full bg-green-500 shadow-glow animate-pulse" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-12 lg:gap-20">
             <div className="flex items-center gap-4 group">
                <Clock className="h-4 w-4 text-gold-400/40" />
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em]">NZ Operational Time</span>
                   <span className="text-sm font-mono font-bold text-gold-400 tabular-nums">{nzTime}</span>
                </div>
             </div>

             <div className="group flex items-center gap-5">
               <div className="text-left sm:text-right">
                 <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/40 leading-none transition-colors group-hover:text-gold-400 sm:text-[10px] sm:tracking-[0.5em]">
                   Based In New Zealand
                 </p>
               </div>
               <Mountain className="h-6 w-6 text-gold-400/20 group-hover:text-gold-400/50 transition-colors" />
             </div>
          </div>
        </div>

        {/* LEGAL DISPATCH */}
        <div className="mx-auto mt-16 max-w-4xl text-center md:mt-24 border-t border-white/5 pt-12">
          <p className="text-[9px] uppercase tracking-[0.18em] leading-relaxed text-white/10 sm:text-[10px] sm:tracking-[0.4em]">
            International guests should confirm firearm processing times and DOC permit protocols. Full itinerary terms are available on dispatch. // DATA_LOCK_V1.0
          </p>
        </div>
      </div>

      {/* TACTICAL SCROLL TO TOP */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            onClick={scrollToTop}
            className="group fixed bottom-4 right-4 z-[100] flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-400/30 bg-black/80 text-gold-400 shadow-glow backdrop-blur-3xl transition-all hover:bg-gold-400 hover:text-black active:scale-95 sm:bottom-8 sm:right-8 sm:h-16 sm:w-16"
          >
            <div className="absolute inset-0 border border-white/10 rounded-2xl opacity-40" />
            <div className="flex flex-col items-center">
               <ChevronUp className="h-6 w-6 transition-transform group-hover:-translate-y-1" />
               <span className="text-[7px] font-black uppercase tracking-tighter opacity-40">ASCENT</span>
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
