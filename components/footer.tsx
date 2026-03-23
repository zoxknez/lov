'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Shield } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const FOOTER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="relative overflow-hidden bg-forest-950 pt-24 pb-12">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Column */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-gold-500/30 bg-forest-900/50 shadow-glow overflow-hidden">
                <img src={FOOTER_LOGO_SRC} alt="Kaimanawa Logo" className="h-full w-full object-contain p-2" />
              </div>
              <div>
                <p className="font-display text-base font-bold uppercase tracking-[0.2em] text-white leading-none">KAIMANAWA</p>
                <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-500">Trophy Safaris</p>
              </div>
            </div>
            <p className="font-sans text-sm leading-relaxed text-gray-400">
              Curated New Zealand hunting programs focusing on fair chase, ethics, and premium hospitality. 
              From the deep bush of the North Island to the alpine peaks of the South.
            </p>
            <div className="flex gap-4">
               {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                 <a key={i} href="#" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-gray-400 transition-all hover:border-gold-500/40 hover:text-gold-400">
                    <Icon className="h-5 w-5" />
                 </a>
               ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">The Experience</h4>
            <ul className="space-y-4">
              {['Story', 'Territory', 'Species', 'Stay'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-3 text-sm text-gray-400 transition-all hover:text-gold-300">
                    <div className="h-px w-4 bg-gold-500/0 transition-all group-hover:w-6 group-hover:bg-gold-500/50" />
                    {item === 'Stay' ? 'Accommodation' : item === 'Territory' ? 'Hunting Territory' : item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">Resources</h4>
            <ul className="space-y-4">
              {['Gallery', 'Guide', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="group flex items-center gap-3 text-sm text-gray-400 transition-all hover:text-gold-300">
                    <div className="h-px w-4 bg-gold-500/0 transition-all group-hover:w-6 group-hover:bg-gold-500/50" />
                    {item === 'Guide' ? 'Meet the Team' : item}
                  </a>
                </li>
              ))}
              <li>
                <a href="#" className="group flex items-center gap-3 text-sm text-gray-400 transition-all hover:text-gold-300">
                   <div className="h-px w-4 bg-gold-500/0 transition-all group-hover:w-6 group-hover:bg-gold-500/50" />
                   Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="mb-8 font-display text-sm font-bold uppercase tracking-[0.2em] text-white">Base Operations</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/10">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">WhatsApp Available</p>
                   <a href="tel:+64210885013" className="text-sm font-medium text-white hover:text-gold-300">+64 21 088 50131</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/10">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Primary Email</p>
                   <a href="mailto:hunting@kaimanawasafaris.com" className="text-sm font-medium text-white hover:text-gold-300">hunting@kaimanawasafaris.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400 border border-gold-400/10">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                   <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">HQ Location</p>
                   <p className="text-sm font-medium text-white">Ohakune, New Zealand</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-medium tracking-wider text-gray-500">
            © {currentYear} KAIMANAWA TROPHY SAFARIS. <span className="hidden md:inline mx-2 text-gray-700">|</span> 
            NEW ZEALAND BASED <span className="hidden md:inline mx-2 text-gray-700">|</span> 
            ALL RIGHTS RESERVED
          </p>
          <div className="flex items-center gap-2">
             <Shield className="h-4 w-4 text-gold-500/40" />
             <p className="text-[10px] uppercase tracking-widest text-gray-600">Secure Consultation Guaranteed</p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 rounded-2xl bg-forest-900/20 border border-white/5 p-6">
          <p className="text-[10px] leading-relaxed text-gray-600 uppercase tracking-tight">
            International guests must confirm firearms requirements, DOC permit conditions, and trophy-export paperwork prior to booking.
            All itineraries depend on local weather and safety assessments. 
            Official member of NZ hunting circles.
          </p>
        </div>
      </div>
    </footer>
  );
}
