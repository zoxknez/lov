"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { galleryShowcase, galleryPlaceholders } from "@/lib/site-content";

function GalleryImage({ src, alt, title, accent, tall = false }: { src: string; alt: string; title: string; accent?: string; tall?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-white/8 cursor-pointer ${tall ? "row-span-2" : ""}`}
      style={{ minHeight: tall ? "36rem" : "18rem" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={`object-cover transition-transform duration-700 ${hovered ? "scale-[1.06]" : "scale-100"}`}
        sizes="(max-width: 768px) 100vw, 45vw"
      />
      {/* Base overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,4,3,0.04)_0%,rgba(2,4,3,0.78)_100%)]" />
      {/* Hover spotlight */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
        style={{ background: "radial-gradient(ellipse at 50% 70%, rgba(201,146,42,0.12) 0%, transparent 70%)" }}
      />
      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-6">
        {accent && (
          <p className="label-xs text-[#c9922a] mb-2">{accent}</p>
        )}
        <motion.h3
          animate={{ y: hovered ? 0 : 6, opacity: hovered ? 1 : 0.85 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl lg:text-3xl text-white"
        >
          {title}
        </motion.h3>
      </div>
    </div>
  );
}

export default function GallerySection() {
  const reduceMotion = useReducedMotion();

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 }
  };
  const tr = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section id="gallery" className="py-28 border-t border-white/[0.06]">
      <div className="section-shell">
        {/* Header */}
        <motion.div {...revealUp} transition={tr} className="mb-14 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="label-xs text-[#c9922a] mb-5">Gallery</p>
            <h2 className="font-display text-[clamp(2.6rem,5vw,5rem)] leading-[0.92] text-white">
              Fewer images.<br />
              <em className="not-italic text-white/45">Chosen with intent.</em>
            </h2>
          </div>
          <p className="max-w-sm text-base leading-relaxed text-white/48 font-light lg:text-right">
            Landscape, lodge, field movement, and trophy moments — each present, never crowded.
          </p>
        </motion.div>

        {/* Main grid */}
        <motion.div
          {...revealUp}
          transition={tr}
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.75fr] gap-5 mb-5"
        >
          <GalleryImage
            src={galleryShowcase[0].image}
            alt={galleryShowcase[0].title}
            title={galleryShowcase[0].title}
            accent="Lead visual"
            tall
          />
          <div className="grid gap-5">
            {galleryShowcase.slice(1, 3).map((item) => (
              <GalleryImage
                key={item.title}
                src={item.image}
                alt={item.title}
                title={item.title}
              />
            ))}
          </div>
        </motion.div>

        {/* Bottom: placeholder cards for gallery categories */}
        <motion.div
          {...revealUp}
          transition={{ ...tr, delay: reduceMotion ? 0 : 0.12 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {galleryPlaceholders.map((item, index) => (
            <div
              key={item.title}
              className="card-hover-glow rounded-[1.5rem] border border-white/8 bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c9922a]" />
                <p className="label-xs text-[#c9922a]">0{index + 1}</p>
              </div>
              <h4 className="font-display text-xl text-white mb-2">{item.title}</h4>
              <p className="text-xs leading-5 text-white/45">{item.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
