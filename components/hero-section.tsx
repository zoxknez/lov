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
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div className="absolute inset-0" style={{ y: y1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster={HERO_POSTER_SRC}
        >
          <source src={HERO_VIDEO_SRC} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-forest-950" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 pt-32 pb-20 text-center"
      >
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 30 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex justify-center">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Kaimanawa Trophy Safaris logo"
              width={480}
              height={480}
              priority
              className="h-64 w-64 object-contain drop-shadow-2xl md:h-80 md:w-80 lg:h-[22rem] lg:w-[22rem] transition-transform duration-700 hover:scale-105"
            />
          </div>
          
          <div className="mb-4">
             <TextReveal className="text-[14px] font-bold uppercase tracking-[0.4em] text-gold-400">
                Kaimanawa Trophy Safaris
             </TextReveal>
          </div>

          <h1 className="mb-6 font-display text-4xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-8xl tracking-tight max-w-5xl">
             <TextReveal delay={0.2}>
               A True New Zealand Hunting Experience
             </TextReveal>
          </h1>

          <p className="text-lg text-gold-200/80 md:text-2xl font-light tracking-[0.1em] italic">
             <TextReveal delay={0.6}>
               Experience the Hunt. Discover New Zealand.
             </TextReveal>
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Link
              href="#contact"
              className="group relative inline-block rounded-full border-2 border-gold-400 bg-gold-400 px-10 py-4 font-bold text-black transition-all duration-300 hover:bg-gold-300 hover:border-gold-300 shadow-glow"
            >
              Plan Your Hunt
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
            <Link
              href="#territory"
              className="inline-block rounded-full border-2 border-white/20 bg-white/5 backdrop-blur-md px-10 py-4 font-bold text-white transition-all duration-300 hover:border-gold-400 hover:text-gold-400"
            >
              Explore Territory
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce"
      >
        <ChevronDown className="h-8 w-8 text-gold-400/50" />
      </motion.div>
    </section>
  );
}
