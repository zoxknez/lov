'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import TextReveal from '@/components/text-reveal';

const HERO_POSTER_SRC = getBlobAssetUrl('/media/hunting area  and deers/Hunting  area  near Rotorua.jpg');
const HERO_VIDEO_SRC = getBlobAssetUrl('/media/hero-wilderness-demo.mp4');
const BRAND_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen min-h-[100svh] w-full overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
          poster={HERO_POSTER_SRC}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/78 via-black/44 to-forest-950/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,transparent_0,transparent_28%,rgba(0,0,0,0.18)_68%,rgba(0,0,0,0.5)_100%)]" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex h-full items-center px-6 pb-36 pt-32 text-center md:pb-28 md:pt-36"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto flex w-full max-w-6xl flex-col items-center"
        >
          <div className="mb-8 flex justify-center md:mb-10">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Kaimanawa Trophy Safaris logo"
              width={480}
              height={480}
              priority
              className="h-72 w-72 object-contain drop-shadow-2xl md:h-80 md:w-80 lg:h-[28rem] lg:w-[28rem] transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="mb-5 md:mb-6">
             <TextReveal className="text-[11px] font-bold uppercase tracking-[0.42em] text-gold-400 md:text-[12px]">
                Kaimanawa Trophy Safaris
             </TextReveal>
          </div>

          <h1 className="mx-auto max-w-6xl font-display text-white">
            <span className="block text-4xl font-bold uppercase tracking-tight md:text-6xl md:leading-[0.94] lg:text-[6.25rem] lg:leading-[0.9]">
              <TextReveal delay={0.2}>A True New Zealand</TextReveal>
            </span>
            <span className="block text-4xl font-bold uppercase tracking-tight md:text-6xl md:leading-[0.94] lg:text-[6.25rem] lg:leading-[0.9]">
              <TextReveal delay={0.38}>Hunting Experience</TextReveal>
            </span>
          </h1>

          <p className="mx-auto mt-7 max-w-3xl text-lg font-light italic tracking-[0.05em] text-gold-200/84 md:mt-8 md:text-2xl">
             <TextReveal delay={0.6}>
               Experience the Hunt. Discover New Zealand.
             </TextReveal>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="#contact"
              className="group relative inline-flex min-w-[12.5rem] items-center justify-center rounded-full border-2 border-gold-400 bg-gold-400 px-10 py-4 font-bold text-black transition-all duration-300 hover:border-gold-300 hover:bg-gold-300 shadow-glow"
            >
              Plan Your Hunt
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="#territory"
              className="inline-flex min-w-[12.5rem] items-center justify-center rounded-full border-2 border-white/20 bg-white/5 px-10 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Explore Territory
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.34em] text-white/58 transition-all duration-300 hover:text-gold-200 md:flex"
      >
        <span>Scroll</span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/12 bg-black/20 text-gold-300 backdrop-blur-md">
          <ChevronDown className="h-4 w-4" />
        </span>
      </motion.a>

      <motion.a
        href="#story"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 items-center justify-center rounded-full border border-white/12 bg-black/20 p-3 text-gold-300 backdrop-blur-md md:hidden"
        aria-label="Scroll to story section"
      >
        <ChevronDown className="h-4 w-4" />
      </motion.a>
    </section>
  );
}
