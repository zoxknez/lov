'use client';

import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const FOOTER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(2026);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="border-t border-white/10 bg-black py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Main Footer Content */}
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d9b167] bg-[#d9b167]/10 overflow-hidden">
                <img src={FOOTER_LOGO_SRC} alt="Kaimanawa Logo" className="h-full w-full object-contain p-1" />
              </div>
              <div>
                <p className="font-display text-xs font-bold uppercase tracking-[0.15em] text-white">KAIMANAWA</p>
                <p className="text-[9px] uppercase tracking-[0.15em] text-gray-500">Trophy Safaris</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Guided New Zealand hunting programs based out of Ohakune, with North Island and South Island itineraries planned
              around the species and the season.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-white">Explore</h4>
            <ul className="space-y-2">
              <li>
                <a href="#story" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#hunt" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Hunting Territory
                </a>
              </li>
              <li>
                <a href="#animals" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Species Available
                </a>
              </li>
              <li>
                <a href="#stay" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Accommodation
                </a>
              </li>
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a href="#gallery" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#guide" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Meet Vuk
                </a>
              </li>
              <li>
                <a href="#contact" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="/" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.1em] text-white">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 flex-shrink-0 text-[#d9b167] mt-0.5" />
                <a href="tel:+64210885013" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  +64 21 088 50131
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-[#d9b167] mt-0.5" />
                <a href="mailto:hunting@kaimanawasafaris.com" className="text-sm text-gray-400 hover:text-[#d9b167] transition-colors">
                  hunting@kaimanawasafaris.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 text-[#d9b167] mt-0.5" />
                <span className="text-sm text-gray-400">
                  Ohakune<br />New Zealand
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-12 border-t border-white/10" />

        {/* Bottom Footer */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            Copyright {currentYear} Kaimanawa Trophy Safaris. All rights reserved. | New Zealand Based | English Only
          </p>

          {/* Social Links */}
          <div className="flex gap-4">
            <a href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-gray-400 hover:border-[#d9b167] hover:text-[#d9b167] transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-gray-400 hover:border-[#d9b167] hover:text-[#d9b167] transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-white/10 text-gray-400 hover:border-[#d9b167] hover:text-[#d9b167] transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Disclosure */}
        <div className="mt-8 rounded-lg border border-white/5 bg-white/2.5 p-4">
          <p className="text-[11px] text-gray-500">
            International guests should confirm firearms requirements, DOC permit conditions, airline rules, and trophy-export
            paperwork before travel. Helicopter access, alpine movements, and remote-country plans always depend on permits,
            weather, and operator availability. All content Copyright Kaimanawa Trophy Safaris, established 2025.
          </p>
        </div>
      </div>
    </footer>
  );
}
