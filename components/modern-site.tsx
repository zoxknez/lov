"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform
} from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Mail,
  Menu,
  PhoneCall,
  X
} from "lucide-react";
import ExperienceShowcase from "@/components/experience-showcase";
import LocalTime from "@/components/local-time";
import PlanningCommandCenter from "@/components/planning-command-center";
import PremiumHero from "@/components/premium-hero";
import SpeciesShowcase from "@/components/species-showcase";
import StandardsShowcase from "@/components/standards-showcase";
import TerritoryShowcase from "@/components/territory-showcase";
import TurnstileWidget from "@/components/turnstile-widget";
import AuroraCanvas from "@/components/aurora-canvas";
import MagneticButton from "@/components/magnetic-button";
import ParallaxImage from "@/components/parallax-image";
import {
  areaHighlights,
  experiencePillars,
  galleryShowcase,
  heroFacts,
  heroVisuals,
  navigation,
  planningNotes,
  pricingItems,
  speciesCatalog,
  teamProfiles,
  timeline,
  values
} from "@/lib/site-content";

/* ─── constants ─────────────────────────────── */
const EMAIL = "hunting@kaimanawasafaris.com";
const PHONE = "+64 21 088 50131";
const STEPS = [
  "Share the species, season, and group size.",
  "We shape the right territory and travel rhythm.",
  "You receive a tailored hunt outline with next steps."
] as const;
const HERO_VIDEO_SRC = "/media/hero-wilderness-demo.mp4";
const HERO_VIDEO_POSTER = "/media/hero-wilderness-poster.jpg";
const HERO_SCENE_META = [
  {
    kicker: "North Island focus",
    note: "Quiet bush entries and early-light movement for sika and red deer programs.",
    tags: ["Sika window", "Forest ridges", "4WD staging"],
    window: "Late Mar - May",
    access: "Bush entry",
    rhythm: "Quiet and patient"
  },
  {
    kicker: "South Island access",
    note: "Serious alpine country shaped by weather, elevation, and exact timing.",
    tags: ["Tahr + chamois", "Glassing faces", "Permit aware"],
    window: "May - Jul",
    access: "Alpine reach",
    rhythm: "Weather led"
  },
  {
    kicker: "Mixed terrain flow",
    note: "Riverbeds, valley crossings, and lodge-backed recovery between harder pushes.",
    tags: ["Backcountry pace", "Valley crossings", "Private concierge"],
    window: "By species",
    access: "Valley traverse",
    rhythm: "Long-form days"
  }
] as const;

/* ─── tiny helpers ───────────────────────────── */
function Label({ children, gold = false }: { children: React.ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/38"}`}>
      {children}
    </p>
  );
}

function HR() {
  return <div className="slash-divide my-0" />;
}

/* ─── TICKER ─────────────────────────────────── */
const TICKER_ITEMS = [
  "Kaimanawa Forest Park", "Red Deer · Late March", "Sika Rut · April",
  "Himalayan Tahr · May–July", "Southern Alps", "Chamois · Alpine",
  "90+ Years Field Experience", "Central North Island", "Private Hunt Concierge",
  "Fallow Deer · April", "New Zealand Wilderness", "Lodge-Based Programs",
];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap border-y border-white/[0.07] py-[13px] bg-black/60 backdrop-blur-sm">
      <div className="ticker">
        {doubled.map((t, i) => (
          <span key={i} className="flex items-center gap-5 px-6 whitespace-nowrap">
            <span className="label text-[10px] tracking-[0.28em] text-white/35">{t}</span>
            <span className="text-[#c8a96e] text-[8px]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────── */
export default function ModernSite() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [heroIdx, setHeroIdx] = useState(0);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
  const [speciesIdx, setSpeciesIdx] = useState(0);
  const [backTop, setBackTop] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"ok" | "err" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnToken, setTurnToken] = useState("");
  const turnEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const { scrollY } = useScroll();
  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const activeHero = heroVisuals[heroIdx];
  const activeHeroMeta = HERO_SCENE_META[heroIdx];
  const { scrollYProgress: heroProg } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroBackdropY = useTransform(heroProg, [0, 1], [0, reduceMotion ? 0 : 50]);
  const heroContentY = useTransform(heroProg, [0, 1], [0, reduceMotion ? 0 : 120]);
  const heroPanelY = useTransform(heroProg, [0, 1], [0, reduceMotion ? 0 : 90]);

  useMotionValueEvent(scrollY, "change", (v) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(v > 40);
    setBackTop(v > 500);

    // Dynamic Navigation: hide on scroll down (if past top), show on scroll up
    if (v > 150 && v > prev) {
      setNavVisible(false);
    } else {
      setNavVisible(true);
    }
  });

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setHeroIdx((i) => (i + 1) % heroVisuals.length), 5000);
    return () => clearInterval(id);
  }, [reduceMotion]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const tryPlay = () => {
      video.defaultMuted = true;
      video.muted = true;
      const playAttempt = video.play();
      if (playAttempt) {
        playAttempt.catch(() => null);
      }
    };

    tryPlay();
    video.addEventListener("canplay", tryPlay);

    return () => {
      video.removeEventListener("canplay", tryPlay);
    };
  }, []);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      fullName: String(fd.get("fullName") ?? ""),
      email: String(fd.get("email") ?? ""),
      targetSpecies: String(fd.get("targetSpecies") ?? "Red Deer"),
      message: String(fd.get("message") ?? ""),
      preferredMonth: String(fd.get("preferredMonth") ?? ""),
      groupSize: String(fd.get("groupSize") ?? "2 hunters"),
      accommodation: "Lodge base + remote camp if required",
      transferMode: "4WD with helicopter support where lawful",
      programLength: "Custom by species",
      budgetBand: "Pricing on request",
      antiBotField: String(fd.get("antiBotField") ?? ""),
      turnstileToken: turnToken
    };
    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = (await res.json()) as { ok?: boolean; forwarded?: boolean; error?: string };
      if (!res.ok || !json.ok) throw new Error(json.error ?? "Failed");
      setStatus("Received. We will follow up with planning details shortly.");
      setStatusTone("ok");
      setTurnToken("");
      e.currentTarget.reset();
    } catch {
      setStatus("Submission failed — please email us directly.");
      setStatusTone("err");
    } finally {
      setSubmitting(false);
    }
  }

  const rv = { initial: { opacity: 0, y: 32 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.12 } };
  const tr0 = { duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <div id="top" className="relative bg-[#080808] text-[#f5f0e8] overflow-x-hidden">
      <div className="grain" />

      {/* ══ NAV ════════════════════════════════════════════════════════════ */}
      <header className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ${scrolled ? "bg-[#080808]/92 backdrop-blur-xl border-b border-white/[0.07] py-2" : "py-0"} ${navVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="shell-full flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo wordmark */}
          <a href="#home" className="flex flex-col leading-none group interactive">
            <span className="font-[family-name:var(--font-display)] text-[13px] tracking-[0.45em] uppercase text-white group-hover:text-[#c8a96e] transition-colors duration-300">Kaimanawa</span>
            <span className="label text-[8px] tracking-[0.3em] text-white/28 mt-0.5">Trophy Safaris · New Zealand</span>
          </a>

          {/* Centre nav – desktop */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((n) => (
              <a key={n.href} href={n.href}
                className="label text-[9px] tracking-[0.3em] text-white/38 hover:text-white transition-colors duration-300 relative group interactive">
                {n.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#c8a96e] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:block text-right">
              <p className="label text-[9px] tracking-[0.25em] text-white/45"><LocalTime timezone="Pacific/Auckland" /></p>
              <p className="label text-[8px] tracking-[0.22em] text-white/22 mt-0.5">NZDT</p>
            </div>
            <a href="#contact"
              className="hidden lg:inline-flex items-center gap-2 border border-white/18 px-5 py-2.5 label text-[9px] tracking-[0.28em] text-white hover:bg-white hover:text-[#080808] transition-all duration-300">
              ENQUIRE
            </a>
            <button type="button" aria-label="Menu" onClick={() => setMobileOpen(true)}
              className="lg:hidden flex items-center justify-center w-10 h-10 border border-white/15 text-white hover:bg-white/8 transition-colors duration-300">
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">

        {/* ══ HERO ═══════════════════════════════════════════════════════════ */}
        <PremiumHero />
        <section
          ref={heroRef}
          id="home-legacy"
          className="hidden relative isolate min-h-screen overflow-hidden"
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div style={{ y: heroBackdropY }} className="absolute inset-0">
              <Image
                src={HERO_VIDEO_POSTER}
                alt="Mountain wilderness hero poster"
                fill
                priority
                className="object-cover object-center opacity-55 scale-[1.06]"
                sizes="100vw"
              />
              <video
                ref={heroVideoRef}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-all duration-[1400ms] ${heroVideoReady && !heroVideoFailed ? "opacity-100 scale-[1.04]" : "opacity-0 scale-[1.1]"}`}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_VIDEO_POSTER}
                onCanPlay={() => setHeroVideoFailed(false)}
                onPlaying={() => { setHeroVideoReady(true); setHeroVideoFailed(false); }}
                onError={() => { setHeroVideoFailed(true); setHeroVideoReady(false); }}
              >
                <source src={HERO_VIDEO_SRC} type="video/mp4" />
              </video>
            </motion.div>
            <div className="hero-grid absolute inset-0 opacity-30" />
            <div className="hero-premium-glow absolute -right-24 top-10 h-[26rem] w-[26rem] rounded-full" />
            <div className="hero-premium-glow absolute -left-24 bottom-16 h-[20rem] w-[20rem] rounded-full opacity-45" />
            <AuroraCanvas intensity="low" className="opacity-45" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(232,201,138,0.18),transparent_30%)]" />
            <div className="absolute inset-x-0 top-0 h-[38vh] bg-[linear-gradient(180deg,rgba(5,6,5,0.82),rgba(5,6,5,0.15))]" />
            <div className="hero-overlay absolute inset-0 opacity-90" />
            <div className="hero-video-vignette absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050605]/92 via-[#050605]/50 to-[#050605]/74" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050605] via-[#050605]/34 to-[#050605]/14" />
          </div>

          <motion.div
            style={{ y: heroContentY }}
            className="relative z-10 w-full px-6 pb-14 pt-28 lg:px-12 lg:pb-16 lg:pt-36"
          >
            <div className="shell-full grid min-h-[calc(100svh-6rem)] items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,490px)] xl:grid-cols-[minmax(0,1.15fr)_minmax(430px,520px)] xl:gap-16">
              <div className="max-w-[46rem]">
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-wrap items-center gap-3"
                >
                  <span className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/35 px-4 py-2 backdrop-blur-md">
                    <span className="h-2 w-2 rounded-full bg-[#c8a96e]" />
                    <Label gold>Private Hunt Concierge / New Zealand</Label>
                  </span>
                  <span className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2">
                    <span className="label text-[9px] tracking-[0.28em] text-white/60">Video demo active</span>
                    <span className="flex items-end gap-1">
                      {[0, 1, 2].map((bar) => (
                        <motion.span
                          key={bar}
                          className="w-[3px] rounded-full bg-[#c8a96e]/75"
                          animate={{ height: reduceMotion ? 9 : [7, 18, 10, 14, 7] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: bar * 0.12
                          }}
                        />
                      ))}
                    </span>
                  </span>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.95, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative mt-8 w-[240px] sm:w-[330px] lg:w-[380px] aspect-[3/1]"
                >
                  <Image
                    src="/logo.webp"
                    alt="Kaimanawa Trophy Safaris"
                    fill
                    className="object-contain object-left"
                    priority
                  />
                </motion.div>

                <motion.h1
                  initial={reduceMotion ? false : { opacity: 0, y: 42 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.05, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 max-w-5xl font-[family-name:var(--font-display)] text-[clamp(3.6rem,8.1vw,7.9rem)] leading-[0.88] tracking-[-0.03em] text-white"
                >
                  Premium New Zealand hunting,
                  <span className="block text-[#ebe4d7] italic font-light">staged like a private experience.</span>
                </motion.h1>

                <motion.p
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-7 max-w-2xl text-[15px] leading-[1.9] text-white/64 sm:text-[18px] font-light"
                >
                  Tailored red deer, sika, chamois, and tahr programs across bush country and alpine faces,
                  wrapped in a lodge-to-field rhythm that feels composed, premium, and unmistakably private.
                </motion.p>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.85, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-10 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center"
                >
                  <MagneticButton
                    tag="a"
                    href="#contact"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#c8a96e] px-8 py-4 label text-[10px] tracking-[0.35em] text-[#050605] transition-colors duration-300 hover:bg-[#e8c98a]"
                  >
                    BEGIN PLANNING <ArrowRight size={14} />
                  </MagneticButton>

                  <a
                    href="#species"
                    className="group inline-flex items-center gap-3 label text-[10px] tracking-[0.32em] text-white/78 transition-colors duration-300 hover:text-white"
                  >
                    VIEW COLLECTION
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </a>

                  <span className="label text-[9px] tracking-[0.26em] text-white/34">
                    Live demo reel / muted autoplay / premium pacing
                  </span>
                </motion.div>

                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.9, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-12 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
                >
                  {heroFacts.map((fact) => (
                    <div
                      key={fact.label}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md transition-colors duration-500 hover:bg-white/[0.08]"
                    >
                      <p className="font-[family-name:var(--font-display)] text-[1.7rem] leading-none text-[#e8c98a]">
                        {fact.value}
                      </p>
                      <p className="mt-3 text-[11px] leading-[1.7] text-white/54">{fact.label}</p>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                style={{ y: heroPanelY }}
                initial={reduceMotion ? false : { opacity: 0, x: 36 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-[28rem] lg:justify-self-end"
              >
                <div className="hero-panel-sheen pointer-events-none absolute inset-0 rounded-[2rem]" />
                <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.11),rgba(255,255,255,0.04))] p-5 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <Label gold>Current Scene</Label>
                      <p className="mt-2 label text-[9px] tracking-[0.26em] text-white/34">
                        Scene {String(heroIdx + 1).padStart(2, "0")} / {String(heroVisuals.length).padStart(2, "0")}
                      </p>
                    </div>
                    <div className="rounded-full border border-white/10 bg-black/25 px-3 py-2">
                      <span className="label text-[8px] tracking-[0.28em] text-white/62">{activeHeroMeta.window}</span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeHero.title}
                      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="mt-6"
                    >
                      <p className="label text-[8px] tracking-[0.26em] text-[#e8c98a]/82">{activeHeroMeta.kicker}</p>
                      <h2 className="mt-3 font-[family-name:var(--font-display)] text-[2.15rem] leading-[0.96] text-white">
                        {activeHero.title}
                      </h2>
                      <p className="mt-4 text-[14px] leading-7 text-white/64">{activeHero.detail}</p>
                      <p className="mt-3 text-[13px] leading-6 text-white/44">{activeHeroMeta.note}</p>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {activeHeroMeta.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-6 space-y-2">
                    {heroVisuals.map((item, index) => {
                      const meta = HERO_SCENE_META[index];
                      const isActive = heroIdx === index;

                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => setHeroIdx(index)}
                          className={`group flex w-full items-center gap-4 rounded-[1.35rem] border px-4 py-4 text-left transition-all duration-300 ${
                            isActive
                              ? "border-[#c8a96e]/45 bg-[#c8a96e]/10"
                              : "border-white/8 bg-black/10 hover:border-white/18 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span className={`font-[family-name:var(--font-display)] text-3xl leading-none ${isActive ? "text-[#e8c98a]" : "text-white/24 group-hover:text-white/38"}`}>
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div className="min-w-0 flex-1">
                            <p className="label text-[8px] tracking-[0.24em] text-white/34">{meta.kicker}</p>
                            <p className={`mt-1 text-[14px] leading-6 ${isActive ? "text-white" : "text-white/68"}`}>
                              {item.title}
                            </p>
                          </div>
                          <span className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${isActive ? "bg-[#c8a96e]" : "bg-white/18 group-hover:bg-white/35"}`} />
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-white/10 pt-5">
                    <div className="rounded-[1.1rem] border border-white/8 bg-black/15 px-3 py-4">
                      <p className="label text-[8px] tracking-[0.24em] text-white/28">Access</p>
                      <p className="mt-2 text-sm leading-5 text-white/76">{activeHeroMeta.access}</p>
                    </div>
                    <div className="rounded-[1.1rem] border border-white/8 bg-black/15 px-3 py-4">
                      <p className="label text-[8px] tracking-[0.24em] text-white/28">Rhythm</p>
                      <p className="mt-2 text-sm leading-5 text-white/76">{activeHeroMeta.rhythm}</p>
                    </div>
                    <div className="rounded-[1.1rem] border border-white/8 bg-black/15 px-3 py-4">
                      <p className="label text-[8px] tracking-[0.24em] text-white/28">Format</p>
                      <p className="mt-2 text-sm leading-5 text-white/76">Private, hosted</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
            transition={reduceMotion ? undefined : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 backdrop-blur-md lg:flex"
          >
            <span className="label text-[8px] tracking-[0.28em] text-white/48">Scroll for the full program</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#c8a96e]" />
          </motion.div>

          {/* GIANT headline — centered */}
          {false && (
            <>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="shell-full relative z-10 flex flex-col items-center text-center"
            >
              {/* Eyebrow */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-center gap-5 mb-6"
              >
                <span className="block w-12 h-px bg-[#c8a96e]" />
                <Label gold>Private Hunt Concierge · New Zealand</Label>
                <span className="block w-12 h-px bg-[#c8a96e]" />
              </motion.div>

              {/* Massive editorial headline, staggered */}
              <h1 className="font-[family-name:var(--font-display)] font-normal leading-[0.88] text-white tracking-tight flex flex-col items-center">
                <span className="block overflow-hidden pb-6">
                  <motion.div 
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1.3, delay: 1.3, ease: [0.16, 1, 0.3, 1] }}
                    className="relative w-[300px] sm:w-[500px] lg:w-[650px] aspect-[3/1] mb-2"
                  >
                    <Image 
                      src="/logo.webp" 
                      alt="Kaimanawa Trophy Safaris"
                      fill
                      className="object-contain"
                      priority
                    />
                  </motion.div>
                </span>
                <span className="block overflow-hidden -mt-4">
                  <motion.span 
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.3, delay: 1.45, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[clamp(3rem,9vw,8rem)] tracking-[-0.02em] text-[#e8e4db] italic font-light"
                  >
                    Where wild country
                  </motion.span>
                </span>
                <span className="block overflow-hidden">
                  <motion.span 
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.3, delay: 1.55, ease: [0.16, 1, 0.3, 1] }}
                    className="block text-[clamp(3rem,9vw,8rem)] tracking-[-0.02em] text-[#e8e4db] italic font-light"
                  >
                    becomes legend.
                  </motion.span>
                </span>
              </h1>

              {/* Bottom row — facts strip & button */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 1.7 }}
                className="mt-16 sm:mt-24 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-16 w-full"
              >
                {heroFacts.slice(0, 3).map((f) => (
                  <div key={f.label} className="flex flex-col items-center text-center group">
                    <span className="font-[family-name:var(--font-display)] text-[2.2rem] text-[#c8a96e] group-hover:scale-105 transition-transform duration-500">{f.value}</span>
                    <span className="label text-[9px] tracking-[0.25em] text-white/50 leading-[1.6] mt-2 group-hover:text-white/80 transition-colors duration-500">{f.label}</span>
                  </div>
                ))}
                
                {/* Replaced basic button with MagneticButton */}
                <div className="mt-8 sm:mt-0 sm:ml-8 interactive">
                  <MagneticButton>
                    <a href="#contact" className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-5 label text-[10px] tracking-[0.35em] hover:bg-white hover:text-black transition-all duration-500 rounded-full">
                      BEGIN PLANNING <ArrowRight size={14} className="ml-1" />
                    </a>
                  </MagneticButton>
                </div>
              </motion.div>
            </motion.div>

          {/* Hero image switcher — moved to bottom center dots instead of top right block */}
          <div className="hidden">
            {heroVisuals.map((v, i) => (
              <button key={i} type="button" onClick={() => setHeroIdx(i)} aria-label={`View ${v.title}`}
                className="group p-2">
                <span className={`block w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  heroIdx === i
                    ? "bg-[#c8a96e] scale-100"
                    : "bg-white/20 scale-75 group-hover:scale-100 group-hover:bg-white/50"
                 }`} />
              </button>
            ))}
          </div>
            </>
          )}
        </section>

        {/* ══ TICKER ═══════════════════════════════════════════════════════ */}
        <Ticker />

        {/* ══ INTRO / PILLARS ══════════════════════════════════════════════ */}
        <ExperienceShowcase />
        {false && <section className="shell-full py-28 lg:py-36">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
            {/* Left – big italic quote */}
            <motion.div {...rv} transition={tr0}>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.9] italic text-white/80 font-light">
                &ldquo;Less outfitter. <br />More private guide.&rdquo;
              </h2>
              <div className="mt-8 h-px w-16 bg-[#c8a96e]" />
              <p className="mt-7 text-[15px] leading-[1.85] text-white/48 font-light max-w-sm">
                Kaimanawa Trophy Safaris operates at the point where serious hunting and genuine hospitality meet — small groups, real terrain, no shortcuts.
              </p>
              <a href="#species" className="mt-10 inline-flex items-center gap-3 label text-[10px] tracking-[0.3em] text-[#c8a96e] hover:gap-5 transition-all duration-300 group">
                EXPLORE SPECIES <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>

            {/* Right – pillars as numbered list */}
            <div className="space-y-0">
              {experiencePillars.map((p, i) => (
                <motion.div key={p.title} {...rv}
                  transition={{ ...tr0, delay: reduceMotion ? 0 : i * 0.1 }}
                  className="strip-card py-7 flex gap-8 items-start">
                  <span className="font-[family-name:var(--font-display)] text-5xl text-white/10 shrink-0 leading-none mt-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <Label gold>{p.label}</Label>
                    <h3 className="font-[family-name:var(--font-display)] text-[1.65rem] text-white mt-2 leading-tight">{p.title}</h3>
                    <p className="mt-3 text-sm leading-[1.8] text-white/42">{p.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>}

        <HR />

        {/* ══ SPECIES ══════════════════════════════════════════════════════ */}
        <SpeciesShowcase />
        {false && <section id="species" className="py-28 lg:py-36">
          <div className="shell-full mb-12">
            <motion.div {...rv} transition={tr0} className="flex items-end justify-between flex-wrap gap-6">
              <div>
                <Label gold>Species Collection</Label>
                <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.88] text-white mt-4">
                  Seven pursuits.<br />
                  <span className="italic text-white/40">One country.</span>
                </h2>
              </div>
              <p className="text-sm text-white/35 max-w-xs leading-relaxed font-light">
                Select a species to understand its season, terrain, and what makes this pursuit worth planning for.
              </p>
            </motion.div>
          </div>

          {/* Active species — full bleed image */}
          <motion.div {...rv} transition={tr0} className="relative w-full h-[55vh] min-h-[340px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div key={speciesIdx}
                initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.9 }}
                className="absolute inset-0">
                <Image
                  src={speciesCatalog[speciesIdx].image ?? heroVisuals[0].image}
                  alt={speciesCatalog[speciesIdx].name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/40 to-[#080808]/80" />

            {/* Caption overlay left */}
            <div className="absolute inset-y-0 left-0 flex flex-col justify-end p-8 lg:p-14">
              <Label gold>{speciesCatalog[speciesIdx].season}</Label>
              <AnimatePresence mode="wait">
                <motion.h3 key={speciesIdx}
                  initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="font-[family-name:var(--font-display)] text-[clamp(3.5rem,7vw,7rem)] leading-none text-white mt-3">
                  {speciesCatalog[speciesIdx].name}
                </motion.h3>
              </AnimatePresence>
              <p className="mt-4 text-[13px] text-white/50 max-w-sm leading-relaxed font-light">{speciesCatalog[speciesIdx].terrain}</p>
            </div>

            {/* Species index — right */}
            <div className="absolute top-6 right-6 lg:right-10 flex flex-col gap-1 items-end">
              <Label>SPECIES {String(speciesIdx + 1).padStart(2, "0")} / {String(speciesCatalog.length).padStart(2, "0")}</Label>
            </div>
          </motion.div>

          {/* Species list — horizontal strip */}
          <div className="shell-full mt-3">
            <div className="h-scroll">
              {speciesCatalog.map((s, i) => (
                <button key={s.name} type="button" onClick={() => setSpeciesIdx(i)}
                  className={`h-scroll-item flex flex-col gap-2 px-6 py-5 border-r border-white/[0.07] min-w-[160px] text-left transition-all duration-300 ${
                    speciesIdx === i ? "bg-[#c8a96e]/10" : "hover:bg-white/[0.03]"
                  }`}>
                  <Label gold={speciesIdx === i}>{`0${i + 1}`}</Label>
                  <span className={`font-[family-name:var(--font-display)] text-xl leading-tight transition-colors duration-300 ${speciesIdx === i ? "text-white" : "text-white/42"}`}>
                    {s.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Expanded note */}
          <div className="shell-full mt-6">
            <AnimatePresence mode="wait">
              <motion.p key={speciesIdx}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[14px] leading-[1.9] text-white/48 font-light max-w-2xl">
                {speciesCatalog[speciesIdx].note}
              </motion.p>
            </AnimatePresence>
          </div>
        </section>}

        <HR />

        {/* ══ AREAS ════════════════════════════════════════════════════════ */}
        <TerritoryShowcase />
        {false && <section id="areas" className="py-28 lg:py-36 shell-full">
          <motion.div {...rv} transition={tr0} className="mb-16">
            <Label gold>Territory</Label>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.88] text-white mt-4">
              The land defines<br />
              <span className="italic text-white/40">the hunt.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-1">
            {areaHighlights.map((area, i) => (
              <motion.div key={area.title} {...rv}
                transition={{ ...tr0, delay: reduceMotion ? 0 : i * 0.1 }}
                className="group relative overflow-hidden" style={{ minHeight: "460px" }}>
                <ParallaxImage 
                  src={heroVisuals[i].image} alt={area.title} fill
                  containerClassName="absolute inset-0"
                  imageClassName="transition-transform duration-[1.8s] group-hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 50vw" 
                  offset={35}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/55 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/60 to-transparent pointer-events-none" />

                <div className="absolute inset-0 flex flex-col justify-between p-8 lg:p-10">
                  <div>
                    <Label gold>Area 0{i + 1}</Label>
                    <h3 className="font-[family-name:var(--font-display)] text-[clamp(1.8rem,3.5vw,3rem)] text-white mt-3 leading-tight max-w-xs">
                      {area.title}
                    </h3>
                  </div>
                  <div>
                    <p className="text-sm text-white/55 max-w-xs leading-relaxed font-light mb-6">{area.intro}</p>
                    {area.details.slice(0, 2).map((d) => (
                      <p key={d} className="label text-[9px] tracking-[0.22em] text-white/28 leading-relaxed py-2 border-t border-white/[0.07]">{d}</p>
                    ))}
                  </div>
                </div>

                {/* Number watermark */}
                <div className="absolute top-6 right-8 font-[family-name:var(--font-display)] text-[8rem] text-white/[0.04] leading-none select-none pointer-events-none">
                  {String(i + 1).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </div>
        </section>}

        <HR />

        {/* ══ PLANNING / TIMELINE ══════════════════════════════════════════ */}
        <PlanningCommandCenter />
        {false && <section id="planning" className="py-28 lg:py-36 shell-full">
          <motion.div {...rv} transition={tr0} className="mb-16 grid lg:grid-cols-2 gap-10 items-end">
            <div>
              <Label gold>Planning</Label>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.88] text-white mt-4">
                Precision is<br />
                <span className="italic text-white/40">the luxury.</span>
              </h2>
            </div>
            <p className="text-[15px] text-white/40 leading-[1.9] font-light max-w-sm">
              Season windows, permits, rifles, access — mapped before you arrive so the field stays fluid.
            </p>
          </motion.div>

          {/* Timeline — vertical list with large numbers */}
          <div className="grid lg:grid-cols-3 gap-1 mb-24">
            {timeline.map((t, i) => (
              <motion.div key={t.title} {...rv}
                transition={{ ...tr0, delay: reduceMotion ? 0 : i * 0.07 }}
                className="border-l-2 border-white/[0.07] pl-7 py-6 hover:border-[#c8a96e]/50 transition-colors duration-400 group">
                <span className="font-[family-name:var(--font-display)] text-[5rem] leading-none text-white/[0.06] block group-hover:text-white/[0.1] transition-colors duration-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Label gold>{t.window}</Label>
                <h3 className="font-[family-name:var(--font-display)] text-[1.7rem] text-white mt-3">{t.title}</h3>
                <p className="mt-3 text-[13px] text-white/38 leading-relaxed font-light">{t.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Planning notes + pricing — two col */}
          <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-16">
            <div>
              <Label gold>Logistics</Label>
              <div className="mt-6 divide-y divide-white/[0.07]">
                {planningNotes.map((n) => (
                  <div key={n.title} className="py-6">
                    <h4 className="font-[family-name:var(--font-display)] text-xl text-white mb-2">{n.title}</h4>
                    <p className="text-[13px] text-white/40 leading-relaxed font-light">{n.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label gold>What&apos;s covered</Label>
              <div className="mt-6 space-y-8">
                <div>
                  <p className="label text-[9px] tracking-[0.3em] text-white/25 mb-4 pb-3 border-b border-white/[0.07]">Included</p>
                  {pricingItems.included.map((item) => (
                    <div key={item} className="flex gap-3 py-2 text-[13px] text-white/55">
                      <CheckCircle2 size={14} className="text-[#c8a96e] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <p className="label text-[9px] tracking-[0.3em] text-white/25 mb-4 pb-3 border-b border-white/[0.07]">Additional</p>
                  {pricingItems.excluded.map((item) => (
                    <div key={item} className="flex gap-3 py-2 text-[13px] text-white/28">
                      <span className="mt-[0.5rem] h-1 w-1 bg-white/20 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/[0.07] pt-6">
                  <Label>Pricing</Label>
                  <p className="font-[family-name:var(--font-display)] text-[2.5rem] text-[#c8a96e] mt-2">On request.</p>
                  <p className="text-[12px] text-white/28 mt-1 font-light">Tailored per species, group, and season.</p>
                </div>
              </div>
            </div>
          </div>
        </section>}

        <HR />

        {/* ══ STORY / STANDARDS ════════════════════════════════════════════ */}
        <StandardsShowcase />
        {false && <section id="story" className="relative overflow-hidden py-28 lg:py-36">
          <motion.div className="absolute inset-[-12%] z-0">
            <Image src={heroVisuals[2].image} alt="New Zealand wilderness" fill className="object-cover" sizes="100vw" />
          </motion.div>
          <div className="absolute inset-0 z-0 bg-[linear-gradient(105deg,rgba(8,8,8,0.99)_0%,rgba(8,8,8,0.82)_40%,rgba(8,8,8,0.92)_100%)]" />

          <div className="shell-full relative z-10">
            <motion.div {...rv} transition={tr0} className="mb-16">
              <Label gold>Standards</Label>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.88] text-white mt-4">
                Earned over<br />
                <span className="italic text-white/40">ninety years.</span>
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-20">
              {/* Values */}
              <div>
                {values.map((v, i) => (
                  <motion.div key={v.title} {...rv}
                    transition={{ ...tr0, delay: reduceMotion ? 0 : i * 0.1 }}
                    className="strip-card py-7">
                    <div className="flex gap-6 items-start">
                      <span className="font-[family-name:var(--font-display)] text-4xl text-[#c8a96e]/30 shrink-0 leading-none">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-[family-name:var(--font-display)] text-[1.6rem] text-white">{v.title}</h3>
                        <p className="mt-2 text-[13px] text-white/40 leading-relaxed font-light">{v.text}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Team */}
              <div>
                <Label gold>The team</Label>
                <div className="mt-6 space-y-8">
                  {teamProfiles.map((p, i) => (
                    <motion.div key={p.name} {...rv}
                      transition={{ ...tr0, delay: reduceMotion ? 0 : 0.08 + i * 0.08 }}
                      className="border-l-2 border-[#c8a96e]/25 pl-6 py-2">
                      <Label gold>{p.role}</Label>
                      <h3 className="font-[family-name:var(--font-display)] text-[2rem] text-white mt-2">{p.name}</h3>
                      <p className="label text-[9px] tracking-[0.24em] text-white/28 mt-1">{p.years} in the field</p>
                      <p className="mt-3 text-[13px] text-white/40 leading-relaxed font-light">{p.note}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>}

        <HR />

        {/* ══ GALLERY ══════════════════════════════════════════════════════ */}
        <section id="gallery" className="py-28 lg:py-36">
          <div className="shell-full mb-12">
            <motion.div {...rv} transition={tr0}>
              <Label gold>Gallery</Label>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,6rem)] leading-[0.88] text-white mt-4">
                Chosen with<br />
                <span className="italic text-white/40">intent.</span>
              </h2>
            </motion.div>
          </div>

          {/* Editorial masonry — asymmetric */}
          <div className="grid grid-cols-12 gap-1">
            {/* Main hero image — col 1-8 row 1-2 */}
            <motion.div {...rv} transition={tr0}
              className="col-span-12 lg:col-span-8 group relative overflow-hidden" style={{ minHeight: "520px" }}>
              <ParallaxImage src={galleryShowcase[0].image} alt={galleryShowcase[0].title} fill
                containerClassName="absolute inset-0"
                imageClassName="transition-transform duration-[1.8s] group-hover:scale-[1.04]"
                sizes="(max-width:1024px) 100vw, 66vw"
                offset={60} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-0 p-8 pointer-events-none">
                <Label gold>Lead visual</Label>
                <h3 className="font-[family-name:var(--font-display)] text-4xl text-white mt-2">{galleryShowcase[0].title}</h3>
              </div>
            </motion.div>

            {/* Right stack */}
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-1">
              {galleryShowcase.slice(1, 3).map((g, i) => (
                <motion.div key={g.title} {...rv}
                  transition={{ ...tr0, delay: reduceMotion ? 0 : 0.1 + i * 0.07 }}
                  className="group relative overflow-hidden flex-1" style={{ minHeight: "255px" }}>
                  <ParallaxImage src={g.image} alt={g.title} fill
                    containerClassName="absolute inset-0"
                    imageClassName="transition-transform duration-[1.8s] group-hover:scale-[1.04]"
                    sizes="(max-width:1024px) 100vw, 33vw"
                    offset={25} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/85 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 p-5 pointer-events-none">
                    <h3 className="font-[family-name:var(--font-display)] text-2xl text-white">{g.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom band — full width */}
            {galleryShowcase[3] && (
              <motion.div {...rv} transition={{ ...tr0, delay: reduceMotion ? 0 : 0.15 }}
                className="col-span-12 group relative overflow-hidden" style={{ minHeight: "220px" }}>
                <ParallaxImage src={galleryShowcase[3].image} alt={galleryShowcase[3].title} fill
                  containerClassName="absolute inset-0"
                  imageClassName="transition-transform duration-[1.8s] group-hover:scale-[1.04]"
                  sizes="100vw"
                  offset={40} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-[#080808]/60 pointer-events-none" />
                <div className="absolute inset-0 flex items-center justify-between px-10 pointer-events-none">
                  <h3 className="font-[family-name:var(--font-display)] text-[2.5rem] text-white">{galleryShowcase[3].title}</h3>
                  <a href="#contact" className="flex items-center gap-2 label text-[9px] tracking-[0.3em] text-[#c8a96e] hover:gap-4 transition-all duration-300 group/link">
                    ENQUIRE <ArrowUpRight size={13} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                  </a>
                </div>
              </motion.div>
            )}
          </div>
        </section>

        <HR />

        {/* ══ CONTACT ══════════════════════════════════════════════════════ */}
        <section id="contact" className="py-28 lg:py-36 shell-full">
          <motion.div {...rv} transition={tr0} className="mb-16">
            <Label gold>Enquiry</Label>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,7rem)] leading-[0.88] text-white mt-4">
              Begin your <br />
              <span className="italic text-white/40">New Zealand story.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-20 items-start">
            {/* Left — info */}
            <motion.div {...rv} transition={tr0} className="space-y-8">
              <div className="divide-y divide-white/[0.07]">
                <a href={`mailto:${EMAIL}`}
                  className="flex items-center justify-between gap-4 py-6 group hover:text-[#c8a96e] transition-colors duration-300">
                  <span>
                    <Label>Email</Label>
                    <p className="mt-1 text-base text-white group-hover:text-[#c8a96e] transition-colors duration-300">{EMAIL}</p>
                  </span>
                  <Mail size={20} className="text-white/20 group-hover:text-[#c8a96e] transition-colors duration-300 shrink-0" />
                </a>
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`}
                  className="flex items-center justify-between gap-4 py-6 group hover:text-[#c8a96e] transition-colors duration-300">
                  <span>
                    <Label>WhatsApp / Call</Label>
                    <p className="mt-1 text-base text-white group-hover:text-[#c8a96e] transition-colors duration-300">{PHONE}</p>
                  </span>
                  <PhoneCall size={20} className="text-white/20 group-hover:text-[#c8a96e] transition-colors duration-300 shrink-0" />
                </a>
              </div>

              {/* Steps */}
              <div>
                <Label gold>How it works</Label>
                <div className="mt-5 divide-y divide-white/[0.07]">
                  {STEPS.map((s, i) => (
                    <div key={i} className="flex gap-5 py-5 items-start">
                      <span className="font-[family-name:var(--font-display)] text-3xl text-[#c8a96e]/40 shrink-0 leading-none">{String(i + 1).padStart(2, "0")}</span>
                      <p className="text-[13px] text-white/40 leading-relaxed font-light pt-1">{s}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div {...rv} transition={{ ...tr0, delay: reduceMotion ? 0 : 0.1 }}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="form-field">
                    <label htmlFor="fn">Full name</label>
                    <input id="fn" required name="fullName" placeholder=" " />
                  </div>
                  <div className="form-field">
                    <label htmlFor="em">Email address</label>
                    <input id="em" required type="email" name="email" placeholder=" " />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="form-field">
                    <label htmlFor="sp">Target species</label>
                    <select id="sp" required name="targetSpecies" defaultValue="Red Deer">
                      {speciesCatalog.map((s) => (
                        <option key={s.name} value={s.name} style={{ background: "#0e0e0e" }}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="gs">Group size</label>
                    <select id="gs" required name="groupSize" defaultValue="2 hunters">
                      {["1 hunter", "2 hunters", "3 hunters", "4 hunters", "Hunter + observer"].map((o) => (
                        <option key={o} value={o} style={{ background: "#0e0e0e" }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-field">
                  <label htmlFor="pm">Preferred window</label>
                  <input id="pm" name="preferredMonth" placeholder=" " />
                </div>

                <div className="form-field">
                  <label htmlFor="msg">Tell us about the trip</label>
                  <textarea id="msg" required name="message" rows={5} placeholder=" " style={{ resize: "none" }} />
                </div>

                <div>
                  <TurnstileWidget onTokenChange={setTurnToken} />
                </div>

                <button type="submit"
                  disabled={submitting || (turnEnabled && !turnToken)}
                  className="group w-full flex items-center justify-between gap-4 bg-[#c8a96e] text-[#080808] px-8 py-5 label text-[10px] tracking-[0.35em] hover:bg-[#e8c98a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300">
                  <span>{submitting ? "SENDING..." : "SUBMIT ENQUIRY"}</span>
                  {!submitting && <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />}
                  {submitting && <span className="h-3.5 w-3.5 border border-[#080808]/30 border-t-[#080808] rounded-full animate-spin" />}
                </button>

                <AnimatePresence>
                  {statusTone === "err" && status && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      className="label text-[9px] tracking-[0.25em] text-red-400 mt-4">
                      {status}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>

        {/* Cinematic Success Overlay */}
        <AnimatePresence>
          {statusTone === "ok" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080808]/95 backdrop-blur-xl"
            >
              <div className="text-center max-w-lg px-8">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Label gold>Enquiry Received</Label>
                  <h2 className="font-[family-name:var(--font-display)] text-[3.5rem] leading-[0.9] text-white mt-4 mb-6">
                    We will be <br /><span className="italic text-white/40">in touch.</span>
                  </h2>
                  <p className="text-[14px] text-white/40 font-light leading-relaxed mb-10">
                    Your preferences have been noted. Our concierge will review the details and contact you shortly with a tailored outline.
                  </p>
                  <button 
                    onClick={() => { setStatus(null); setStatusTone(null); }}
                    className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 label text-[9px] tracking-[0.28em] text-white hover:bg-white hover:text-black transition-all duration-300"
                  >
                     RETURN
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ FOOTER ═══════════════════════════════════════════════════════ */}
        <footer className="border-t border-white/[0.07]">
          <div className="shell-full py-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl tracking-[0.3em] uppercase text-white">Kaimanawa</p>
              <p className="label text-[8px] tracking-[0.28em] text-white/22 mt-1">Trophy Safaris · New Zealand</p>
            </div>

            <nav className="flex flex-wrap gap-6">
              {navigation.map((n) => (
                <a key={n.href} href={n.href} className="label text-[9px] tracking-[0.26em] text-white/22 hover:text-[#c8a96e] transition-colors duration-300">{n.label}</a>
              ))}
            </nav>

            <div className="space-y-1 lg:text-right">
              <a href={`mailto:${EMAIL}`} className="block text-[13px] text-white/40 hover:text-white transition-colors duration-300">{EMAIL}</a>
              <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="block text-[13px] text-white/25 hover:text-white transition-colors duration-300">{PHONE}</a>
              <p className="label text-[8px] tracking-[0.22em] text-white/15 pt-2">39°S · 175°E &nbsp; © 2026</p>
            </div>
          </div>
        </footer>
      </main>

      {/* ══ BACK TO TOP ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {backTop && (
          <motion.a href="#top" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 border border-white/15 bg-[#080808]/90 text-white hover:bg-[#c8a96e] hover:text-[#080808] hover:border-[#c8a96e] transition-all duration-300 backdrop-blur-sm"
            aria-label="Back to top">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>

      {/* ══ MOBILE MENU ══════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-[100] bg-[#080808] flex flex-col p-7">
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-xl tracking-[0.3em] uppercase">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-10 h-10 border border-white/15 text-white">
                <X size={17} />
              </button>
            </div>
            <nav className="mt-14 flex flex-col gap-2">
              {navigation.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMobileOpen(false)}
                  className="font-[family-name:var(--font-display)] text-5xl text-white/70 hover:text-white py-2 transition-colors duration-300">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="mt-auto pt-10 border-t border-white/[0.07] space-y-2">
              <a href={`mailto:${EMAIL}`} className="block text-sm text-white/50">{EMAIL}</a>
              <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="block text-sm text-white/30">{PHONE}</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
