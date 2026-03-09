"use client";

import { motion } from "framer-motion";

export default function CinematicTransition() {
  return (
    <section className="relative h-24 overflow-hidden">
      {/* Top Shutter */}
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-x-0 top-0 h-1/2 z-10 bg-black/40 backdrop-blur-sm border-b border-white/5"
      />

      {/* Bottom Shutter */}
      <motion.div
        initial={{ y: "0%" }}
        whileInView={{ y: "100%" }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="absolute inset-x-0 bottom-0 h-1/2 z-10 bg-black/40 backdrop-blur-sm border-t border-white/5"
      />

      {/* Central Glint */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        whileInView={{ opacity: [0, 1, 0], scaleX: [0, 1.2, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeInOut", delay: 0.4 }}
        className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#d9b167]/30 to-transparent z-20"
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="h-px w-32 bg-white/20" />
        <div className="mx-4 h-1 w-1 rounded-full bg-white/40" />
        <div className="h-px w-32 bg-white/20" />
      </div>
    </section>
  );
}
