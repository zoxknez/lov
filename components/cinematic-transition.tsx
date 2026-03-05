"use client";

import { motion } from "framer-motion";

export default function CinematicTransition() {
  return (
    <section className="section-shell py-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="cine-shell"
      >
        <motion.span
          initial={{ x: "-100%" }}
          whileInView={{ x: "160%" }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.35, ease: "easeInOut" }}
          className="cine-sweep"
        />
        <div className="cine-line" />
      </motion.div>
    </section>
  );
}
