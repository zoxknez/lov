"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getBlobAssetUrl } from "@/lib/blob-asset";

const BRAND_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Preloader() {
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Count from 0 to 100 over 1.4s
    const start = Date.now();
    const duration = 1400;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * 100));
      if (progress >= 1) {
        clearInterval(interval);
        setCount(100);
        // Trigger split-screen exit
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => setLoading(false), 900);
        }, 200);
      }
    }, 16);
    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <div className="fixed inset-0 z-[1000] overflow-hidden">
          {/* Left Panel */}
          <motion.div
            className="absolute inset-y-0 left-0 flex w-1/2 items-center justify-end bg-[#060809] pr-4 sm:pr-6"
            animate={exiting ? { x: "-100%" } : { x: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h-px w-full bg-gradient-to-l from-gold-400/30 to-transparent" />
          </motion.div>

          {/* Right Panel */}
          <motion.div
            className="absolute inset-y-0 right-0 flex w-1/2 items-center justify-start bg-[#060809] pl-4 sm:pl-6"
            animate={exiting ? { x: "100%" } : { x: 0 }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="h-px w-full bg-gradient-to-r from-gold-400/30 to-transparent" />
          </motion.div>

          {/* Center Content */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-[#060809] z-10"
            animate={exiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeIn" }}
          >
            {/* Crosshair corners */}
            <div className="pointer-events-none absolute inset-[18%] sm:inset-[15%]">
              {/* Top-left */}
              <div className="absolute top-0 left-0">
                <div className="h-8 w-px bg-gold-400/40" />
                <div className="h-px w-8 bg-gold-400/40" />
              </div>
              {/* Top-right */}
              <div className="absolute top-0 right-0 flex flex-col items-end">
                <div className="h-8 w-px bg-gold-400/40" />
                <div className="h-px w-8 bg-gold-400/40" />
              </div>
              {/* Bottom-left */}
              <div className="absolute bottom-0 left-0 flex flex-col justify-end">
                <div className="h-px w-8 bg-gold-400/40" />
                <div className="h-8 w-px bg-gold-400/40" />
              </div>
              {/* Bottom-right */}
              <div className="absolute bottom-0 right-0 flex flex-col items-end justify-end">
                <div className="h-px w-8 bg-gold-400/40" />
                <div className="h-8 w-px bg-gold-400/40" />
              </div>
            </div>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-24 w-24 sm:h-28 sm:w-28"
            >
              <Image
                src={BRAND_LOGO_SRC}
                alt="Kaimanawa Logo"
                fill
                sizes="112px"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2 text-center"
            >
              <p className="font-display text-xl font-bold uppercase tracking-[0.28em] text-white sm:text-2xl sm:tracking-[0.5em]">
                Kaimanawa
              </p>
              <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-gold-400/70 sm:text-[10px] sm:tracking-[0.46em]">
                Trophy Safaris · New Zealand
              </p>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative h-px w-40 overflow-hidden bg-white/10 sm:w-48">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold-400"
                  style={{ width: `${count}%` }}
                  transition={{ ease: "linear" }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(200,169,110,0.4)_50%,transparent_100%)] animate-shimmer" />
              </div>
              <p className="font-display text-xs font-bold tabular-nums tracking-[0.4em] text-gold-400/60">
                {String(count).padStart(3, '0')}
              </p>
            </motion.div>

            {/* Scanning line */}
            <motion.div
              className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-gold-400/20 to-transparent"
              animate={{ top: ["15%", "85%"] }}
              transition={{ duration: 1.5, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
