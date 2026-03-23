'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const HERO_POSTER_SRC = getBlobAssetUrl('/media/hunting area  and deers/Hunting  area  near Rotorua.jpg');
const HERO_VIDEO_SRC = getBlobAssetUrl('/media/hero-wilderness-demo.mp4');
const BRAND_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black">
      {/* Video Background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          poster={HERO_POSTER_SRC}
        >
          <source
            src={HERO_VIDEO_SRC}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <div
          className={`transform transition-all duration-1000 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="mb-8 flex justify-center">
            <Image
              src={BRAND_LOGO_SRC}
              alt="Kaimanawa Trophy Safaris logo"
              width={440}
              height={440}
              priority
              className="h-64 w-64 object-contain drop-shadow-[0_10px_34px_rgba(0,0,0,0.55)] md:h-80 md:w-80 lg:h-[26rem] lg:w-[26rem]"
            />
          </div>
          <p className="mb-3 text-[13px] uppercase tracking-[0.2em] text-[#e4c27f]">Kaimanawa Trophy Safaris</p>
          <h1 className="mb-4 font-display text-4xl font-bold uppercase leading-tight text-white md:text-6xl lg:text-7xl">
            A True New Zealand Hunting Experience
          </h1>
          <p className="text-lg text-[#d9b167] md:text-2xl">
            Experience the Hunt. Discover New Zealand.
          </p>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg">
            Guided trophy hunts for international hunters across Central North Island bush country and South Island alpine
            terrain, with fair-chase values, small-group hosting, and tailored travel planning from first enquiry to final
            trophy logistics.
          </p>
        </div>

        {/* CTA Button */}
        <div
          className={`transform transition-all duration-1000 delay-300 ${
            isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="#contact"
              className="inline-block rounded-full border-2 border-[#d9b167] bg-[#d9b167] px-8 py-4 font-semibold text-black transition-all duration-300 hover:bg-[#d9b167]/90"
            >
              Plan Your Hunt
            </a>
            <a
              href="#hunt"
              className="inline-block rounded-full border-2 border-white/20 px-8 py-4 font-semibold text-white transition-all duration-300 hover:border-[#d9b167] hover:text-[#d9b167]"
            >
              Explore Territory
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-6 w-6 text-[#d9b167]" />
      </div>
    </section>
  );
}
