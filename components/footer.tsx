'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUpRight, ChevronUp, Facebook, Instagram, Linkedin, Mail, MapPin, Mountain, Phone, Shield } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import MagneticButton from '@/components/magnetic-button';

const FOOTER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowTop(window.scrollY > 800);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative overflow-hidden bg-transparent pb-14 pt-20 font-sans md:pb-16 md:pt-40">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 border-b border-white/5 pb-14 md:pb-24 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-8 lg:col-span-5 lg:space-y-12">
            <div className="flex items-start gap-4 sm:items-center sm:gap-6">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-gold-400/20 bg-white/[0.03] p-3 shadow-premium sm:h-16 sm:w-16">
                <Image src={FOOTER_LOGO_SRC} alt="Kaimanawa" fill sizes="64px" className="object-contain p-2" />
              </div>
              <div>
                <h4 className="font-display text-xl font-bold uppercase tracking-[0.2em] text-white sm:text-2xl sm:tracking-[0.3em]">
                  Kaimanawa
                </h4>
                <p className="text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/60 sm:text-[10px] sm:tracking-[0.4em]">
                  Trophy Safaris - NZ
                </p>
              </div>
            </div>

            <p className="max-w-md text-base italic leading-relaxed text-gray-300 sm:text-lg">
              Curated New Zealand hunting programs focusing on fair chase, field ethics, and the hosted rhythm of the South Pacific.
            </p>

            <div className="flex gap-3 sm:gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, index) => (
                <MagneticButton key={index} strength={0.2}>
                  <a
                    href="#"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/50 transition-all hover:border-gold-400/40 hover:text-gold-400 sm:h-12 sm:w-12"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/40 sm:mb-10 sm:tracking-[0.4em]">
              Navigation Archive
            </h5>
            <ul className="grid gap-4 sm:gap-5">
              {[
                { label: 'Story', href: '#story' },
                { label: 'Territory', href: '#territory' },
                { label: 'Species', href: '#species' },
                { label: 'Stay', href: '#stay' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-300 transition-colors hover:text-white"
                  >
                    <div className="h-1 w-0 bg-gold-400 transition-all group-hover:w-4" />
                    <span>{item.label}</span>
                    <ArrowUpRight className="-translate-y-1 h-3 w-3 opacity-0 transition-all group-hover:opacity-100" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6 lg:col-span-4 lg:space-y-8">
            <h5 className="mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/40 sm:mb-10 sm:tracking-[0.4em]">
              Operational Contact
            </h5>
            <div className="space-y-5 sm:space-y-6">
              <div className="group flex items-center gap-4 sm:gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/10 bg-gold-400/5 text-gold-400/60">
                  <Phone className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 sm:tracking-[0.3em]">
                    Primary Link
                  </p>
                  <a href="tel:+642108850131" className="text-sm font-bold text-gray-300 transition-colors hover:text-white sm:tracking-widest">
                    +64 21 088 50131
                  </a>
                </div>
              </div>
              <div className="group flex items-center gap-4 sm:gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/10 bg-gold-400/5 text-gold-400/60">
                  <Mail className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 sm:tracking-[0.3em]">
                    Secure Email
                  </p>
                  <a href="mailto:hunting@kaimanawasafaris.com" className="break-all text-sm font-bold text-gray-300 transition-colors hover:text-white">
                    hunting@kaimanawasafaris.com
                  </a>
                </div>
              </div>
              <div className="group flex items-center gap-4 sm:gap-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/10 bg-gold-400/5 text-gold-400/60">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <p className="mb-0.5 text-[9px] font-bold uppercase tracking-[0.24em] text-white/50 sm:tracking-[0.3em]">
                    HQ Location
                  </p>
                  <p className="text-sm font-bold text-gray-300 sm:tracking-widest">Ohakune - New Zealand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between md:gap-10">
          <div className="flex flex-col gap-4 sm:gap-5 md:flex-row md:items-center md:gap-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 sm:tracking-[0.44em]">
              Copyright 2026 Kaimanawa Trophy Safaris
            </p>
            <div className="flex items-center gap-4 rounded-full border border-white/5 bg-white/[0.02] px-5 py-2">
              <Shield className="h-3.5 w-3.5 text-gold-400/40" />
              <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-white/30 sm:tracking-[0.3em]">
                Secure Consultation Protocol
              </span>
            </div>
          </div>

          <div className="group flex items-center gap-4 sm:gap-12">
            <div className="relative overflow-hidden">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] leading-none text-white/40 sm:tracking-[0.5em]">
                Based In New Zealand
              </p>
              <div className="absolute bottom-0 left-0 h-px w-0 bg-gold-400/20 transition-all group-hover:w-full" />
            </div>
            <Mountain className="h-5 w-5 text-gold-400/20 transition-colors group-hover:text-gold-400/40 sm:h-6 sm:w-6" />
          </div>
        </div>

        <div className="mx-auto mt-12 max-w-4xl text-center md:mt-20">
          <p className="text-[9px] uppercase tracking-[0.22em] leading-relaxed text-white/20 sm:tracking-[0.3em]">
            International guests should confirm firearm processing times and DOC permit protocols. Full itinerary terms are available on dispatch.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            onClick={scrollToTop}
            className="group fixed bottom-5 right-4 z-[100] flex h-12 w-12 items-center justify-center rounded-full border border-gold-400/30 bg-forest-950/90 text-gold-400 shadow-[0_0_20px_rgba(200,169,110,0.15)] backdrop-blur-md transition-all hover:scale-110 hover:bg-gold-400 hover:text-black active:scale-95 sm:bottom-10 sm:right-10 sm:h-14 sm:w-14"
          >
            <ChevronUp className="h-5 w-5 group-hover:animate-bounce sm:h-6 sm:w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
