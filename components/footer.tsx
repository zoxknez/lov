'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Shield } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const FOOTER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Footer() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } }
  };

  return (
    <footer className="relative overflow-hidden bg-forest-950 pt-32 pb-16 font-sans">
      {/* Decorative Gradient Top Border */}
      <div className="absolute top-0 left-1/2 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      
      {/* Decorative background glow */}
      <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-gold-500/5 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-20 lg:grid-cols-4 md:grid-cols-2"
        >
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-10">
            <div className="flex items-center gap-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-gold-500/30 bg-forest-900 shadow-glow-gold overflow-hidden transition-transform hover:scale-110 duration-500 relative">
                <Image src={FOOTER_LOGO_SRC} alt="Kaimanawa Logo" fill className="object-contain p-2.5" />
              </div>
              <div>
                <p className="font-display text-xl font-bold uppercase tracking-[0.3em] text-white leading-none">KAIMANAWA</p>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-500">Trophy Safaris</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs italic">
              Curated New Zealand hunting programs focusing on fair chase, ethics, and premium hospitality. 
              From the deep bush of the North Island to the alpine peaks of the South.
            </p>
            <div className="flex gap-5">
               {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="group flex h-12 w-12 items-center justify-center rounded-[1rem] border border-white/5 bg-white/5 text-gray-400 transition-all hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/5 hover:shadow-glow-gold">
                    <Icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                 </a>
               ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-10 font-display text-xs font-bold uppercase tracking-[0.4em] text-white/40">The Experience</h4>
            <ul className="space-y-6">
              {['Story', 'Territory', 'Species', 'Stay'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all hover:text-gold-300">
                    <div className="h-px w-0 bg-gold-500 transition-all duration-500 group-hover:w-8" />
                    <span className="group-hover:translate-x-1 transition-transform duration-500">
                       {item === 'Stay' ? 'Accommodation' : item === 'Territory' ? 'Hunting Territory' : item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-10 font-display text-xs font-bold uppercase tracking-[0.4em] text-white/40">Resources</h4>
            <ul className="space-y-6">
              {['Gallery', 'Guide', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-400 transition-all hover:text-gold-300">
                    <div className="h-px w-0 bg-gold-400 transition-all duration-500 group-hover:w-8" />
                    <span className="group-hover:translate-x-1 transition-transform duration-500">
                       {item === 'Guide' ? 'Meet the Team' : item}
                    </span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-gray-500 transition-all hover:text-white">
                   <div className="h-px w-0 bg-white transition-all duration-500 group-hover:w-8" />
                   <span className="group-hover:translate-x-1 transition-transform duration-500">Legal Notice</span>
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Details */}
          <motion.div variants={itemVariants}>
            <h4 className="mb-10 font-display text-xs font-bold uppercase tracking-[0.4em] text-white/40">Base Operations</h4>
            <div className="space-y-8">
              <div className="flex items-start gap-5 group">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 border border-gold-400/10 transition-colors group-hover:bg-gold-400/20 shadow-glow-gold">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1.5">WhatsApp Ready</p>
                   <a href="tel:+64210885013" className="text-sm font-bold text-white hover:text-gold-300 transition-colors tracking-wide">+64 21 088 50131</a>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 border border-gold-400/10 transition-colors group-hover:bg-gold-400/20 shadow-glow-gold">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1.5">Direct Inquiry</p>
                   <a href="mailto:hunting@kaimanawasafaris.com" className="text-sm font-bold text-white hover:text-gold-300 transition-colors tracking-wide">hunting@kaimanawasafaris.com</a>
                </div>
              </div>
              <div className="flex items-start gap-5 group">
                <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 border border-gold-400/10 transition-colors group-hover:bg-gold-400/20 shadow-glow-gold">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1.5">HQ Location</p>
                   <p className="text-sm font-bold text-white tracking-wide">Ohakune, New Zealand</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase">
            © 2026 KAIMANAWA TROPHY SAFARIS. <span className="hidden md:inline mx-3 text-gold-500/20">|</span> 
            NEW ZEALAND BASED <span className="hidden md:inline mx-3 text-gold-500/20">|</span> 
            ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-4 group cursor-pointer">
             <div className="h-8 w-8 rounded-full bg-gold-500/5 flex items-center justify-center border border-gold-500/10 group-hover:bg-gold-500/10 transition-colors">
                <Shield className="h-3.5 w-3.5 text-gold-500/40 group-hover:text-gold-500" />
             </div>
             <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-600 group-hover:text-gray-400 transition-colors">Secure Consultation Guaranteed</p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-16 rounded-[2rem] bg-gold-400/[0.02] border border-white/5 p-8 backdrop-blur-sm">
          <p className="text-[10px] font-medium leading-relaxed text-gray-600 uppercase tracking-widest text-center">
            International guests must confirm firearms requirements, DOC permit conditions, and trophy-export paperwork prior to booking.
            All itineraries depend on local weather and safety assessments. 
            Official member of NZ hunting circles.
          </p>
        </div>
      </div>
    </footer>
  );
}
