'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const HEADER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Territory', href: '#hunt' },
    { label: 'Species', href: '#animals' },
    { label: 'Accommodation', href: '#stay' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Guide', href: '#guide' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-black/80 backdrop-blur-md'
          : 'border-b border-white/5 bg-black/40 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex min-h-[70px] items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d9b167] bg-[#d9b167]/10 transition-all group-hover:border-[#d9b167] group-hover:bg-[#d9b167]/20 overflow-hidden">
              <img src={HEADER_LOGO_SRC} alt="Kaimanawa Logo" className="h-full w-full object-contain p-1" />
            </div>
            <div className="hidden sm:block">
              <p className="font-display text-sm font-bold uppercase tracking-[0.15em] text-white">KAIMANAWA</p>
              <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400">Trophy Safaris</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-gray-300 transition-colors hover:text-[#d9b167]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA Button - Desktop */}
          <a
            href="#contact"
            className="hidden md:inline-block rounded-full border border-[#d9b167] px-6 py-2 text-sm font-semibold text-[#d9b167] transition-all hover:bg-[#d9b167] hover:text-black"
          >
            Plan Your Hunt
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 backdrop-blur md:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4 space-y-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-sm font-semibold uppercase tracking-[0.1em] text-gray-300 hover:text-[#d9b167] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="block mt-4 rounded-full border border-[#d9b167] px-6 py-3 text-center text-sm font-semibold text-[#d9b167] hover:bg-[#d9b167] hover:text-black transition-all"
            >
              Plan Your Hunt
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
