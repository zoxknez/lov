'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Shield, Mountain } from 'lucide-react';
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
          className="grid gap-20 lg:grid-cols-4"
        >
          {/* Brand Column - Editorial Seal of Quality */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-12">
            <div className="relative group/logo">
              {/* Background Rotating Seal Watermark */}
              <div className="absolute -top-12 -left-12 opacity-[0.03] transition-transform duration-[20s] linear animate-spin-slow group-hover/logo:opacity-[0.06] pointer-events-none">
                 <Mountain className="h-64 w-64 text-gold-400" />
              </div>
              
              <div className="relative z-10 flex items-center gap-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] border border-gold-500/20 bg-forest-900/40 shadow-premium backdrop-blur-md transition-transform hover:scale-110 duration-700">
                  <Image src={FOOTER_LOGO_SRC} alt="Kaimanawa Logo" fill className="object-contain p-3" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold uppercase tracking-[0.4em] text-white leading-none">KAIMANAWA</p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.6em] text-gold-500/60">Trophy Safaris</p>
                </div>
              </div>
            </div>

            <p className="text-lg leading-relaxed text-gray-400 max-w-md italic border-l border-gold-400/10 pl-8">
              Curated New Zealand hunting programs focusing on fair chase, ethics, and premium hospitality. 
              From the deep bush of the North Island to the alpine peaks of the South.
            </p>

            <div className="flex gap-6">
               {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="group relative flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/5 bg-forest-900/20 text-gray-500 transition-all hover:border-gold-500/40 hover:text-gold-400 hover:bg-gold-500/10 shadow-premium">
                    <div className="absolute inset-0 bg-gold-400/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-[1.25rem]" />
                    <Icon className="relative z-10 h-6 w-6 transition-transform group-hover:scale-110" />
                 </a>
               ))}
            </div>
          </motion.div>
 
          {/* Column Group: Experience & Resources */}
          <div className="grid grid-cols-2 gap-10 md:gap-20">
             {/* Experience Links */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-12 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-400/30">Registry</h4>
              <ul className="space-y-6">
                {['Story', 'Territory', 'Species', 'Stay'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="group relative flex items-center gap-4 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-all hover:text-gold-300">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="h-1.5 w-1.5 rounded-full bg-gold-400 absolute -left-4" 
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-500">
                         {item === 'Stay' ? 'Accommodation' : item === 'Territory' ? 'Hunting Territory' : item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
  
            {/* Resources Links */}
            <motion.div variants={itemVariants}>
              <h4 className="mb-12 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-400/30">Nodes</h4>
              <ul className="space-y-6">
                {['Gallery', 'Guide', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="group relative flex items-center gap-4 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-500 transition-all hover:text-gold-300">
                      <motion.div 
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="h-1.5 w-1.5 rounded-full bg-gold-400 absolute -left-4" 
                      />
                      <span className="group-hover:translate-x-1 transition-transform duration-500">
                         {item === 'Guide' ? 'Meet the Team' : item}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a href="#" className="group relative flex items-center gap-4 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-gray-600 transition-all hover:text-white">
                     <span className="group-hover:translate-x-1 transition-transform duration-500">Legal Notice</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
 
          {/* Base Operations Column - Tactical High-Tech Nodes */}
          <motion.div variants={itemVariants} className="space-y-8">
            <h4 className="mb-12 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-400/30">Field Access</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer bg-forest-900/10 p-4 rounded-2xl border border-white/0 hover:border-gold-500/20 hover:bg-forest-900/20 transition-all duration-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 border border-gold-400/10 group-hover:bg-gold-400/20 shadow-glow-gold transition-all">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">WhatsApp Field Link</p>
                   <a href="tel:+64210885013" className="text-xs font-bold text-white hover:text-gold-300 transition-colors tracking-widest">+64 21 088 50131</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer bg-forest-900/10 p-4 rounded-2xl border border-white/0 hover:border-gold-500/20 hover:bg-forest-900/20 transition-all duration-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 border border-gold-400/10 group-hover:bg-gold-400/20 shadow-glow-gold transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">Secure Dispatch</p>
                   <a href="mailto:hunting@kaimanawasafaris.com" className="text-xs font-bold text-white hover:text-gold-300 transition-colors tracking-widest break-all">hunting@kaimanawasafaris.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer bg-forest-900/10 p-4 rounded-2xl border border-white/0 hover:border-gold-500/20 hover:bg-forest-900/20 transition-all duration-500">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400 border border-gold-400/10 group-hover:bg-gold-400/20 shadow-glow-gold transition-all">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">HQ Base</p>
                   <p className="text-xs font-bold text-white tracking-widest">Ohakune, NZ</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section - Elite Finish */}
        <div className="mt-32 border-t border-white/5 bg-forest-900/10 rounded-[3rem] p-12 backdrop-blur-3xl overflow-hidden relative group/footnote">
           {/* Shimmer Finish */}
           <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent animate-shimmer bg-[length:200%_100%]" />
           
           <div className="relative z-10 flex flex-col items-center gap-12">
              <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8">
                <p className="text-[10px] font-bold tracking-[0.5em] text-gray-500 uppercase flex flex-wrap justify-center gap-y-2">
                  <span>© 2026 KAIMANAWA TROPHY SAFARIS</span> 
                  <span className="mx-4 text-gold-500/20 hidden md:inline">•</span> 
                  <span>NEW ZEALAND BASED</span> 
                  <span className="mx-4 text-gold-500/20 hidden md:inline">•</span> 
                  <span>ALL RIGHTS RESERVED</span>
                </p>
                <div className="flex items-center gap-4 group/seal cursor-pointer">
                   <div className="h-10 w-10 rounded-full bg-gold-500/5 flex items-center justify-center border border-gold-500/10 group-hover/seal:bg-gold-400/20 group-hover/seal:border-gold-400/40 transition-all duration-700">
                      <Shield className="h-4 w-4 text-gold-500/40 group-hover/seal:text-gold-400 group-hover/seal:scale-110 transition-all" />
                   </div>
                   <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-gray-600 group-hover/seal:text-gold-400/60 transition-colors">Secure Consultation Guaranteed</p>
                </div>
              </div>
 
              {/* Legal Disclaimer Footnote */}
              <div className="max-w-4xl text-center">
                <p className="text-[9px] font-bold leading-loose text-gray-600 uppercase tracking-[0.3em] mb-4">Field Compliance & Legal</p>
                <p className="text-[10px] font-medium leading-[2.2] text-gray-400/40 uppercase tracking-[0.2em] italic">
                   International guests must confirm firearms requirements, DOC permit conditions, and trophy-export paperwork prior to booking. <br className="hidden md:block" />
                   All itineraries depend on local weather and safety assessments. 
                   Official member of NZ hunting circles.
                </p>
              </div>
           </div>
           
           {/* Footnote Branding Accent */}
           <div className="absolute -bottom-6 -right-6 opacity-[0.02]">
              <Mountain className="h-40 w-40 text-gold-400 -rotate-12" />
           </div>
        </div>
      </div>
    </footer>
  );
}
