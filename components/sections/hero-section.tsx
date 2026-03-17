"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronRight, MapPin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import AuroraCanvas from "@/components/aurora-canvas";
import MagneticButton from "@/components/magnetic-button";
import { heroVisuals, heroFacts } from "@/lib/site-content";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-5 py-5 bg-white/[0.03] border-r border-white/[0.07] last:border-r-0">
      <p className="font-display text-2xl text-white leading-none">{value}</p>
      <p className="mt-2 label-xs text-white/38 leading-relaxed">{label}</p>
    </div>
  );
}

export default function HeroSection() {
  const reduceMotion = useReducedMotion();
  const [heroIndex, setHeroIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const activeHero = heroVisuals[heroIndex];
  const INTERVAL = 5000;

  useEffect(() => {
    if (reduceMotion) return;
    let start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = (elapsed % INTERVAL) / INTERVAL;
      setProgress(pct);
      if (elapsed >= INTERVAL) {
        start = now;
        setHeroIndex((i) => (i + 1) % heroVisuals.length);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  const circumference = 2 * Math.PI * 18; // r=18

  return (
    <section id="home" className="relative min-h-screen overflow-hidden flex flex-col">
      {/* Full-bleed background image */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeHero.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.4, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={activeHero.image}
              alt={activeHero.title}
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Layered overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,3,0.45)_0%,rgba(2,4,3,0.3)_35%,rgba(2,4,3,0.75)_70%,rgba(2,4,3,0.98)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_left,rgba(14,28,18,0.5),transparent_60%)]" />
        <AuroraCanvas className="opacity-50" intensity="low" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 section-shell pt-32 pb-16">
        <div className="flex-1 grid lg:grid-cols-2 gap-10 lg:gap-16 items-end">

          {/* Left: Main headline */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-end"
          >
            {/* Pre-label */}
            <div className="flex items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/30 px-4 py-2 backdrop-blur-md">
                <Sparkles size={12} className="text-[#c9922a]" />
                <span className="label-xs text-white/70">New Zealand · Private Hunt Concierge</span>
              </span>
            </div>

            {/* Display headline */}
            <h1 className="font-display text-[clamp(3.2rem,7.5vw,7.5rem)] leading-[0.88] text-white">
              Hunt the{" "}
              <em className="not-italic text-gold-shimmer">wild</em>
              <br />
              edge of the{" "}
              <br />
              world.
            </h1>

            <p className="mt-8 text-[clamp(1rem,1.4vw,1.2rem)] leading-[1.75] text-white/62 max-w-lg font-light">
              Kaimanawa Trophy Safaris — bespoke guided hunting across Central North Island bush country and South Island alpine terrain. For the hunter who demands more than a package.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton tag="a" href="#contact" className="inline-flex items-center gap-3 rounded-full bg-[#c9922a] px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#020403] hover:bg-[#e4b668] transition-colors duration-300">
                Begin Planning
                <ArrowRight size={15} />
              </MagneticButton>
              <MagneticButton tag="a" href="#species" className="inline-flex items-center gap-3 rounded-full border border-white/18 bg-white/[0.06] backdrop-blur-sm px-7 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85 hover:bg-white/12 transition-colors duration-300">
                Species Collection
                <ChevronRight size={15} className="text-[#c9922a]" />
              </MagneticButton>
            </div>

            {/* Coordinate ticker */}
            <div className="mt-10 flex items-center gap-4">
              <MapPin size={14} className="text-[#c9922a] shrink-0" />
              <span className="label-xs text-white/32 tracking-[0.4em]">39°S · 175°E · KAIMANAWA</span>
            </div>
          </motion.div>

          {/* Right: Featured image card */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest-900 shadow-panel">
              {/* Image */}
              <div className="relative aspect-[3/4] min-h-[28rem] lg:min-h-[38rem]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`panel-${activeHero.image}`}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 1, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeHero.image}
                      alt={activeHero.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 46vw"
                    />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,3,0.05)_0%,rgba(2,4,3,0.5)_55%,rgba(2,4,3,0.97)_100%)]" />

                {/* Top badges */}
                <div className="absolute top-5 inset-x-5 flex items-start justify-between">
                  <span className="rounded-full border border-white/14 bg-black/25 px-4 py-2 label-xs text-white/70 backdrop-blur-md">
                    Featured setting
                  </span>
                  {/* Progress ring */}
                  <div className="w-10 h-10 relative flex items-center justify-center">
                    <svg width="40" height="40" viewBox="0 0 40 40" className="-rotate-90">
                      <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <circle
                        cx="20" cy="20" r="18"
                        fill="none"
                        stroke="#c9922a"
                        strokeWidth="1.5"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference * (1 - progress)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.1s linear" }}
                      />
                    </svg>
                    <span className="absolute font-display text-[10px] text-white">{heroIndex + 1}</span>
                  </div>
                </div>

                {/* Caption */}
                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p className="label-xs text-[#c9922a] mb-3">Now guiding</p>
                  <h2 className="font-display text-3xl lg:text-4xl text-white leading-tight">{activeHero.title}</h2>
                  <p className="mt-3 text-sm leading-6 text-white/60 max-w-xs">{activeHero.detail}</p>
                </div>
              </div>

              {/* Slide selector */}
              <div className="bg-[#060d08] border-t border-white/8 px-6 py-4 flex gap-2 flex-wrap">
                {heroVisuals.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => { setHeroIndex(index); setProgress(0); }}
                    className={`rounded-full px-4 py-2 label-xs transition-all duration-300 ${
                      heroIndex === index
                        ? "bg-[#c9922a] text-[#020403]"
                        : "border border-white/10 text-white/44 hover:text-white hover:border-white/20"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-10 overflow-hidden rounded-[1.8rem] border border-white/8 bg-black/25 backdrop-blur-lg grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/[0.07] lg:divide-y-0"
        >
          {heroFacts.map((fact) => (
            <StatCard key={fact.label} value={fact.value} label={fact.label} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
