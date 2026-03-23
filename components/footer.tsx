'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Shield, Mountain, ChevronUp, ArrowUpRight } from 'lucide-react';
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
    <footer className="relative overflow-hidden bg-transparent pb-16 pt-32 font-sans md:pt-40">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* ── Main Footer Grid ── */}
        <div className="grid gap-16 lg:grid-cols-12 pb-24 border-b border-white/5">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-12">
            <div className="flex items-center gap-6">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-gold-400/20 bg-white/[0.03] p-3 shadow-premium">
                <Image src={FOOTER_LOGO_SRC} alt="Kaimanawa" fill className="object-contain p-2" />
              </div>
              <div>
                <h4 className="font-display text-2xl font-bold uppercase tracking-[0.3em] text-white">Kaimanawa</h4>
                <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/60">Trophy Safaris · NZ</p>
              </div>
            </div>
            
            <p className="max-w-md text-lg italic leading-relaxed text-gray-300">
              Curated New Zealand hunting programs focusing on fair chase, field ethics, and the hosted rhythm of the South Pacific.
            </p>
            
            <div className="flex gap-4">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <MagneticButton key={i} strength={0.2}>
                  <a href="#" className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.02] text-white/50 transition-all hover:border-gold-400/40 hover:text-gold-400">
                    <Icon className="h-5 w-5" />
                  </a>
                </MagneticButton>
              ))}
            </div>
          </div>

          {/* Navigation (3 cols) */}
          <div className="lg:col-span-3">
            <h5 className="mb-10 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/40">Navigation Archive</h5>
            <ul className="grid gap-5">
              {[
                { label: 'Story', href: '#story' },
                { label: 'Territory', href: '#hunt' },
                { label: 'Species', href: '#species' },
                { label: 'Stay', href: '#stay' },
                { label: 'Gallery', href: '#gallery' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="group flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-300 transition-colors hover:text-white">
                    <div className="h-1 w-0 bg-gold-400 transition-all group-hover:w-4" />
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Node (4 cols) */}
          <div className="lg:col-span-4 space-y-8">
             <h5 className="mb-10 text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400/40">Operational Contact</h5>
             <div className="space-y-6">
                <div className="flex items-center gap-5 group">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 border border-gold-400/10 text-gold-400/60">
                      <Phone className="h-4 w-4" />
                   </div>
                   <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mb-0.5">Primary Link</p>
                      <a href="tel:+642108850131" className="text-sm font-bold text-gray-300 hover:text-white transition-colors tracking-widest">+64 21 088 50131</a>
                   </div>
                </div>
                <div className="flex items-center gap-5 group">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 border border-gold-400/10 text-gold-400/60">
                      <Mail className="h-4 w-4" />
                   </div>
                   <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mb-0.5">Secure Email</p>
                      <a href="mailto:hunting@kaimanawasafaris.com" className="text-sm font-bold text-gray-300 hover:text-white transition-colors tracking-widest">hunting@kaimanawasafaris.com</a>
                   </div>
                </div>
                <div className="flex items-center gap-5 group">
                   <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 border border-gold-400/10 text-gold-400/60">
                      <MapPin className="h-4 w-4" />
                   </div>
                   <div className="min-w-0">
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50 mb-0.5">HQ Location</p>
                      <p className="text-sm font-bold text-gray-300 tracking-widest">Ohakune · New Zealand</p>
                   </div>
                </div>
             </div>
          </div>
        </div>

        {/* ── Bottom Section ── */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-10">
          
          <div className="flex flex-col md:flex-row items-center gap-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.44em] text-gray-400">
              © 2026 Kaimanawa Trophy Safaris
            </p>
            <div className="flex items-center gap-4 py-2 px-5 rounded-full border border-white/5 bg-white/[0.02]">
               <Shield className="h-3.5 w-3.5 text-gold-400/40" />
               <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/30">Secure Consultation Protocol</span>
            </div>
          </div>

          <div className="flex items-center gap-12 group">
             <div className="relative overflow-hidden">
                <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 leading-none">Based In New Zealand</p>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-gold-400/20 transition-all group-hover:w-full" />
             </div>
             <Mountain className="h-6 w-6 text-gold-400/20 group-hover:text-gold-400/40 transition-colors" />
          </div>

        </div>

        {/* ── Sub-footer Note ── */}
        <div className="mt-20 text-center max-w-4xl mx-auto">
           <p className="text-[9px] leading-relaxed uppercase tracking-[0.3em] text-white/20 select-none">
             International guests please note required firearm processing times and DOC permit protocols. Full itinerary terms available on dispatch.
           </p>
        </div>

      </div>

      {/* Floating Scroll to Top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-10 right-10 z-[100] group flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/30 bg-forest-950/90 text-gold-400 shadow-[0_0_20px_rgba(200,169,110,0.15)] backdrop-blur-md transition-all hover:bg-gold-400 hover:text-black hover:scale-110 active:scale-95"
          >
            <ChevronUp className="h-6 w-6 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

    </footer>
  );
}
