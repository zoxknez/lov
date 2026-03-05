"use client";

import { motion } from "framer-motion";
import { trustBadges } from "@/lib/data";

export default function TrustStrip() {
  return (
    <section className="section-shell trust-strip-shell py-5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="premium-panel trust-strip-panel flex flex-wrap items-center gap-2 rounded-full px-4 py-3 text-[10px] uppercase tracking-[0.16em] text-[#e7cd9b]"
      >
        {trustBadges.map((item) => (
          <span key={item} className="trust-pill inline-flex rounded-full px-3 py-1">
            {item}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
