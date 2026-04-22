'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const HEADER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Header({ dict, lang }: { dict: any, lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { label: dict.story, href: '#story', id: 'story' },
    { label: dict.territory, href: '#territory', id: 'territory' },
    { label: dict.species, href: '#species', id: 'species' },
    { label: dict.stay, href: '#stay', id: 'stay' },
    { label: dict.gallery, href: '#gallery', id: 'gallery' },
    { label: dict.contact, href: '#contact', id: 'contact' },
  ];

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'ru' : 'en';
    // If pathname starts with /en or /ru, replace it
    let newPath = pathname;
    if (pathname.startsWith(`/${lang}`)) {
      newPath = pathname.replace(`/${lang}`, `/${nextLang}`);
    } else {
      newPath = `/${nextLang}${pathname}`;
    }
    router.push(newPath);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 56);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // IntersectionObserver for active section highlight
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-white/10 bg-forest-950/90 py-2.5 backdrop-blur-md sm:py-3'
          : 'border-b border-transparent bg-transparent py-3 sm:py-4 md:py-5'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/40 to-transparent transition-opacity duration-500 ${
          scrolled ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group relative flex items-center gap-2 sm:gap-3">
            <div
              className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border transition-all duration-500 sm:h-10 sm:w-10 ${
                scrolled
                  ? 'border-gold-500/30 bg-forest-900/45 shadow-glow md:h-11 md:w-11'
                  : 'border-white/10 bg-black/20'
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
            <div className="sm:hidden">
              <p className="font-display text-[12px] font-bold uppercase leading-none tracking-[0.18em] text-white/92">
                {dict.kaimanawa}
              </p>
              <p className="mt-1 text-[8px] font-bold uppercase tracking-[0.2em] text-gold-400/80">
                {dict.trophySafaris}
              </p>
            </div>
            <div className="hidden sm:block">
              <p
                className={`font-display font-bold uppercase leading-none tracking-[0.22em] text-white transition-all duration-500 ${
                  scrolled ? 'text-[14px]' : 'text-[13px] text-white/88'
                }`}
              >
                {dict.kaimanawa}
              </p>
              <div
                className={`mt-1 flex items-center gap-2 overflow-hidden transition-all duration-500 ${
                  scrolled ? 'max-h-5 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="h-px w-3 bg-gold-400/50" />
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400">
                  {dict.trophySafaris}
                </p>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="relative hidden lg:flex items-center gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`group relative px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-500 ${
                    isActive
                      ? 'text-gold-400'
                      : scrolled
                      ? 'text-gray-300 hover:text-gold-400'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{link.label}</span>
                  
                  {/* Glass Pill Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 z-0 rounded-full border border-gold-400/20 bg-gold-400/5 backdrop-blur-sm shadow-glow-gold"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Hover Trace */}
                  {!isActive && (
                    <span className="absolute bottom-1 left-5 right-5 h-px scale-x-0 bg-gold-400/40 transition-transform duration-500 group-hover:scale-x-100" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* CTA Button & Language - Desktop */}
          <div
            className={`hidden md:flex items-center gap-4 transition-all duration-500 ${
              scrolled ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0 pointer-events-none'
            }`}
          >
            <button
              onClick={toggleLanguage}
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/25 text-[10px] font-bold uppercase text-white backdrop-blur-md transition-all duration-300 hover:border-gold-400/50 hover:bg-white/10"
            >
              {lang === 'en' ? 'RU' : 'EN'}
            </button>
            <a
              href="#contact"
              className="group relative overflow-hidden rounded-full border border-gold-400/70 bg-black/25 px-8 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-gold-300 backdrop-blur-md transition-all duration-300 hover:border-gold-300 hover:bg-gold-400 hover:text-black"
            >
              <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_30%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0)_70%)] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
              <span className="relative">{dict.planYourHunt}</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-xl border border-white/10 bg-black/25 p-2.5 text-gold-400 transition-colors hover:text-gold-300 lg:hidden"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-[60px] h-[calc(100svh-60px)] border-t border-white/10 bg-forest-950/98 backdrop-blur-xl lg:hidden sm:top-[68px] sm:h-[calc(100svh-68px)]"
          >
            {/* Mobile Decorative */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-12 left-1/2 -translate-x-1/2 h-px w-24 bg-gradient-to-r from-transparent via-gold-400/30 to-transparent" />
            </div>
            <div className="flex h-full flex-col items-center justify-start gap-5 overflow-y-auto px-5 pb-10 pt-8 sm:px-6 sm:pt-10">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.06, duration: 0.4 }}
                  className={`group relative text-[1.3rem] font-display font-bold uppercase tracking-[0.16em] transition-all hover:text-gold-400 sm:text-2xl ${
                    activeSection === link.id ? 'text-gold-400' : 'text-white'
                  }`}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold-400/50 transition-all duration-500 group-hover:w-full" />
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-2 w-full max-w-sm rounded-full border-2 border-gold-400 bg-gold-400 px-6 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-black transition-all hover:bg-gold-300"
              >
                {dict.consultGuide}
              </motion.a>
              <motion.button
                onClick={toggleLanguage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
                className="mt-4 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xs font-bold text-white transition-all hover:bg-white/10"
              >
                {lang === 'en' ? 'RU' : 'EN'}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
