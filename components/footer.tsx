'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin, Shield, Mountain } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

const FOOTER_LOGO_SRC = getBlobAssetUrl('/media/logo.png');

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <footer className="relative overflow-hidden bg-transparent pt-32 pb-16 font-sans">
      <div className="absolute left-1/2 top-0 h-px w-full max-w-7xl -translate-x-1/2 bg-gradient-to-r from-transparent via-gold-500/30 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.012),transparent_18%,rgba(255,255,255,0.02)_62%,rgba(0,0,0,0.18)_100%)]" />
      <div className="pointer-events-none absolute -left-[12%] top-[4%] h-[420px] w-[420px] rounded-full bg-gold-400/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] top-[18%] h-[360px] w-[360px] rounded-full bg-emerald-400/10 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-[-12%] left-[24%] h-[440px] w-[440px] rounded-full bg-amber-500/8 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(14,20,24,0.82),rgba(7,10,13,0.58))] px-8 py-10 shadow-premium backdrop-blur-[28px] md:px-12 md:py-14 lg:grid lg:grid-cols-4 lg:gap-16"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(200,169,110,0.12),transparent_24%),radial-gradient(circle_at_86%_14%,rgba(88,122,114,0.12),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.025),transparent_28%)]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-300/50 to-transparent" />

          <motion.div variants={itemVariants} className="relative space-y-10 lg:col-span-2">
            <div className="relative group/logo">
              <div className="pointer-events-none absolute -left-12 -top-16 opacity-[0.05] transition-transform duration-[20s] linear animate-spin-slow group-hover/logo:opacity-[0.08]">
                <Mountain className="h-72 w-72 text-gold-300" />
              </div>

              <div className="relative z-10 flex items-center gap-6">
                <div className="relative flex h-20 w-20 items-center justify-center rounded-[1.75rem] border border-gold-400/25 bg-white/[0.04] shadow-premium backdrop-blur-md transition-transform duration-700 hover:scale-105">
                  <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_50%_30%,rgba(215,186,137,0.16),transparent_70%)]" />
                  <Image src={FOOTER_LOGO_SRC} alt="Kaimanawa Logo" fill className="object-contain p-3.5" />
                </div>
                <div>
                  <p className="font-display text-2xl font-bold uppercase tracking-[0.4em] leading-none text-white md:text-3xl">
                    KAIMANAWA
                  </p>
                  <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.58em] text-gold-200/75">
                    Trophy Safaris
                  </p>
                  <p className="mt-4 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-white/60">
                    New Zealand Trophy Hunting
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-xl rounded-[2rem] border border-white/8 bg-black/15 px-8 py-8 backdrop-blur-xl">
              <p className="text-lg italic leading-relaxed text-white/78">
                Curated New Zealand hunting programs focusing on fair chase, ethics, and premium hospitality.
                From the deep bush of the North Island to the alpine peaks of the South.
              </p>
            </div>

            <div className="flex gap-6">
              {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="group relative flex h-14 w-14 items-center justify-center rounded-[1.25rem] border border-white/10 bg-white/[0.035] text-white/68 transition-all hover:border-gold-400/40 hover:bg-gold-500/10 hover:text-gold-200 shadow-premium"
                >
                  <div className="absolute inset-0 rounded-[1.25rem] bg-gold-400/8 opacity-0 transition-opacity group-hover:opacity-100" />
                  <Icon className="relative z-10 h-6 w-6 transition-transform group-hover:scale-110" />
                </a>
              ))}
            </div>
          </motion.div>

          <div className="relative mt-12 grid grid-cols-2 gap-10 md:gap-16 lg:mt-0">
            <motion.div variants={itemVariants}>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-200/70">Registry</h4>
              <ul className="space-y-6">
                {['Story', 'Territory', 'Species', 'Stay'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="group relative flex items-center gap-4 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-white/66 transition-all hover:text-gold-200"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-gold-400"
                      />
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {item === 'Stay' ? 'Accommodation' : item === 'Territory' ? 'Hunting Territory' : item}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-200/70">Nodes</h4>
              <ul className="space-y-6">
                {['Gallery', 'Guide', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href={`#${item.toLowerCase()}`}
                      className="group relative flex items-center gap-4 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-white/66 transition-all hover:text-gold-200"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="absolute -left-4 h-1.5 w-1.5 rounded-full bg-gold-400"
                      />
                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        {item === 'Guide' ? 'Meet the Team' : item}
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#"
                    className="group relative flex items-center gap-4 py-1 text-[11px] font-bold uppercase tracking-[0.3em] text-white/46 transition-all hover:text-white"
                  >
                    <span className="transition-transform duration-500 group-hover:translate-x-1">Legal Notice</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative mt-12 space-y-5 lg:mt-0">
            <h4 className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-gold-200/70">Field Access</h4>
            <div className="space-y-5">
              <div className="flex items-start gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition-all duration-500 hover:border-gold-400/25 hover:bg-white/[0.05]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-gold-300/15 bg-gold-400/8 text-gold-200 shadow-glow-gold">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-200/55">WhatsApp Field Link</p>
                  <a href="tel:+64210885013" className="text-sm font-bold tracking-[0.12em] text-white/90 transition-colors hover:text-gold-200">
                    +64 21 088 50131
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition-all duration-500 hover:border-gold-400/25 hover:bg-white/[0.05]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-gold-300/15 bg-gold-400/8 text-gold-200 shadow-glow-gold">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-200/55">Secure Dispatch</p>
                  <a
                    href="mailto:hunting@kaimanawasafaris.com"
                    className="break-all text-sm font-bold tracking-[0.04em] text-white/90 transition-colors hover:text-gold-200"
                  >
                    hunting@kaimanawasafaris.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition-all duration-500 hover:border-gold-400/25 hover:bg-white/[0.05]">
                <div className="flex h-12 w-12 items-center justify-center rounded-[1rem] border border-gold-300/15 bg-gold-400/8 text-gold-200 shadow-glow-gold">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.24em] text-gold-200/55">HQ Base</p>
                  <p className="text-sm font-bold tracking-[0.12em] text-white/90">Ohakune, NZ</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className="group/footnote relative mt-10 overflow-hidden rounded-[3rem] border border-white/10 bg-[linear-gradient(135deg,rgba(34,23,15,0.34),rgba(9,12,15,0.9))] p-8 shadow-premium backdrop-blur-[26px] md:p-12">
          <div className="absolute left-0 top-0 h-px w-full bg-[length:200%_100%] animate-shimmer bg-gradient-to-r from-transparent via-gold-400/40 to-transparent" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(207,170,109,0.12),transparent_22%),radial-gradient(circle_at_84%_20%,rgba(84,114,108,0.08),transparent_24%)]" />

          <div className="relative z-10 flex flex-col items-center gap-12">
            <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row">
              <p className="flex flex-wrap justify-center gap-y-2 text-center text-[10px] font-bold uppercase tracking-[0.42em] text-white/66">
                <span>(c) 2026 Kaimanawa Trophy Safaris</span>
                <span className="mx-4 hidden text-gold-200/25 md:inline">|</span>
                <span>New Zealand Based</span>
                <span className="mx-4 hidden text-gold-200/25 md:inline">|</span>
                <span>All Rights Reserved</span>
              </p>

              <div className="group/seal flex items-center gap-4 rounded-full border border-gold-300/12 bg-white/[0.04] px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold-300/15 bg-gold-400/10 transition-all duration-700 group-hover/seal:border-gold-400/40 group-hover/seal:bg-gold-400/20">
                  <Shield className="h-4 w-4 text-gold-200/70 transition-all group-hover/seal:scale-110 group-hover/seal:text-gold-100" />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-white/62 transition-colors group-hover/seal:text-gold-100/85">
                  Secure Consultation Guaranteed
                </p>
              </div>
            </div>

            <div className="max-w-4xl text-center">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-200/62">Field Compliance & Legal</p>
              <p className="text-sm leading-8 text-white/62 md:text-[15px]">
                International guests should confirm firearms requirements, DOC permit conditions, and trophy-export paperwork prior to travel.
                All itineraries remain subject to weather, access, and field-safety assessments.
              </p>
            </div>
          </div>

          <div className="pointer-events-none absolute -bottom-8 -right-8 opacity-[0.04]">
            <Mountain className="h-48 w-48 -rotate-12 text-gold-300" />
          </div>
        </div>
      </div>
    </footer>
  );
}
