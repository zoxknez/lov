'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const HEADER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 56);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Territory', href: '#territory' },
    { label: 'Species', href: '#species' },
    { label: 'Stay', href: '#stay' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Guide', href: '#guide' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-forest-950/90 backdrop-blur-md py-3'
          : 'border-b border-transparent bg-transparent py-4 md:py-5'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-3">
            <div
              className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border transition-all duration-500 ${
                scrolled
                  ? 'border-gold-500/30 bg-forest-900/45 shadow-glow md:h-11 md:w-11'
                  : 'border-white/10 bg-black/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'
              }`}
            >
              <Image
                src={HEADER_LOGO_SRC}
                alt="Kaimanawa Logo"
                fill
                sizes="44px"
                className="object-contain p-2 transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-display font-bold uppercase leading-none tracking-[0.26em] text-white transition-all duration-500 ${
                  scrolled ? 'text-[15px]' : 'text-[14px] text-white/88'
                }`}
              >
                KAIMANAWA
              </p>
              <div
                className={`mt-1 flex items-center gap-2 overflow-hidden transition-all duration-500 ${
                  scrolled ? 'max-h-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="h-px w-3 bg-gold-400/50" />
                <p
                  className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400"
                >
                  Trophy Safaris
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`group relative px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${
                  scrolled ? 'text-gray-300 hover:text-gold-400' : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-4 right-4 h-0.5 scale-x-0 bg-gold-400/50 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <div
            className={`hidden md:flex items-center gap-8 transition-all duration-500 ${
              scrolled ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
            }`}
          >
            <a
              href="#contact"
              className="rounded-full border border-gold-400/70 bg-black/25 px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-md transition-all duration-300 hover:border-gold-300 hover:bg-gold-400 hover:text-black"
            >
              Plan Your Hunt
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden rounded-xl p-2 text-gold-400 transition-colors hover:text-gold-300"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div id="mobile-navigation" className="fixed inset-x-0 top-[70px] h-screen border-t border-white/10 bg-forest-950/98 backdrop-blur-xl lg:hidden animate-fade-in">
          <div className="flex flex-col items-center justify-center h-[70vh] gap-8 px-6">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="group text-2xl font-display font-bold uppercase tracking-widest text-white hover:text-gold-400 transition-all animate-fade-up"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="mt-8 w-full max-w-xs rounded-full border-2 border-gold-400 bg-gold-400 px-8 py-4 text-center text-sm font-bold uppercase tracking-widest text-black hover:bg-gold-300 transition-all animate-fade-up"
              style={{ animationDelay: '800ms' }}
            >
              Consult a Guide
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
