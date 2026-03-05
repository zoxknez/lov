"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowUpRight, CheckCircle2, Compass, Crown, MountainSnow, ShieldCheck, Sparkles } from "lucide-react";
import WeatherOverlay from "@/components/weather-overlay";
import HunterCrosshair from "@/components/hunter-crosshair";
import CursorSpotlight from "@/components/cursor-spotlight";
import TrustStrip from "@/components/trust-strip";
import AmbientAudio from "@/components/ambient-audio";
import ScrollCompass from "@/components/scroll-compass";
import CinematicTransition from "@/components/cinematic-transition";
import BookingConfigurator, { type BookingConfig } from "@/components/booking-configurator";
import TurnstileWidget from "@/components/turnstile-widget";
import {
  availabilitySlots,
  estateHighlights,
  experiences,
  gameSpecies,
  guideStories,
  metrics,
  navItems,
  rotatingNotes
} from "@/lib/data";

const CommandCenter = dynamic<{ daylight: number; isNight: boolean }>(() => import("@/components/command-center"));
const TrophyCarousel = dynamic(() => import("@/components/trophy-carousel"));
const InteractiveMap = dynamic(() => import("@/components/interactive-map"));
const SignatureReveal = dynamic<{ daylight: number; isNight: boolean }>(() => import("@/components/signature-reveal"));
const StoryChapters = dynamic(() => import("@/components/story-chapters"));

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const }
};

type WeatherMode = "sun" | "wind" | "rain" | "snow";
const weatherModes: WeatherMode[] = ["sun", "wind", "rain", "snow"];

export default function ModernSite() {
  const [tickerIndex, setTickerIndex] = useState(0);
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "ok" | "err">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [weatherMode, setWeatherMode] = useState<WeatherMode>("sun");
  const [windStrength, setWindStrength] = useState(0.5);
  const [dayProgress, setDayProgress] = useState(0.68);
  const [performanceMode, setPerformanceMode] = useState<"ultra" | "balanced">("ultra");
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [activeSection, setActiveSection] = useState("hero");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [failedSpeciesImages, setFailedSpeciesImages] = useState<Record<string, boolean>>({});
  const [deviceProfile, setDeviceProfile] = useState<"low-mobile" | "high-mobile" | "tablet" | "desktop">("desktop");
  const [navVisible, setNavVisible] = useState(true);
  const [sectionWipeTick, setSectionWipeTick] = useState(0);
  const [bookingConfig, setBookingConfig] = useState<BookingConfig>({
    species: "Red Stag",
    stay: "5 Nights",
    comfort: "Private Chalet",
    transfer: "Premium 4x4",
    guests: 2,
    perHunter: 12400,
    total: 24800,
    budgetBand: "NZ$15k - 30k"
  });
  const previousSection = useRef("hero");
  const lastWipeAt = useRef(0);

  const { scrollYProgress } = useScroll();
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -90]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0.25]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const parallaxX = useSpring(pointerX, { stiffness: 90, damping: 24, mass: 0.35 });
  const parallaxY = useSpring(pointerY, { stiffness: 90, damping: 24, mass: 0.35 });
  const heroBgX = useTransform(parallaxX, (v) => v * 0.4);
  const heroBgY = useTransform(parallaxY, (v) => v * 0.35);
  const heroFrontX = useTransform(parallaxX, (v) => v * -0.24);
  const heroFrontY = useTransform(parallaxY, (v) => v * -0.2);

  useEffect(() => {
    const id = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % rotatingNotes.length);
    }, 2800);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setWeatherMode((prev) => {
        const currentIndex = weatherModes.indexOf(prev);
        return weatherModes[(currentIndex + 1) % weatherModes.length];
      });
      setWindStrength(Math.random());
    }, 9000);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setDayProgress((prev) => (prev + 0.0019) % 1);
    }, 100);

    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    try {
      const savedMode = window.localStorage.getItem("kaimanawa-performance-mode");
      if (savedMode === "ultra" || savedMode === "balanced") {
        setPerformanceMode(savedMode);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem("kaimanawa-performance-mode", performanceMode);
    } catch {
      // ignore
    }
  }, [performanceMode]);

  useEffect(() => {
    if (performanceMode === "ultra") {
      document.body.classList.add("custom-crosshair");
    } else {
      document.body.classList.remove("custom-crosshair");
    }

    return () => document.body.classList.remove("custom-crosshair");
  }, [performanceMode]);

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = () => {
      const width = window.innerWidth;
      const coarse = media.matches;
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
      const cores = navigator.hardwareConcurrency ?? 8;
      const lowHardware = memory <= 4 || cores <= 4;

      if (coarse && width <= 900) {
        const profile = width <= 520 || lowHardware ? "low-mobile" : "high-mobile";
        setDeviceProfile(profile);
        setPerformanceMode("balanced");
      } else if (width <= 1200) {
        setDeviceProfile("tablet");
      } else {
        setDeviceProfile("desktop");
      }
    };

    update();
    window.addEventListener("resize", update);
    media.addEventListener("change", update);
    return () => {
      window.removeEventListener("resize", update);
      media.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        const delta = y - lastY;

        if (y < 80) {
          setNavVisible(true);
        } else if (delta > 6) {
          setNavVisible(false);
        } else if (delta < -6) {
          setNavVisible(true);
        }

        lastY = y;
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = ["estate", "game", "experiences", "insights", "guides", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const topVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (topVisible?.target?.id) {
          setActiveSection(topVisible.target.id);
        } else if (window.scrollY < 280) {
          setActiveSection("hero");
        }
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: "-12% 0px -45% 0px" }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const now = Date.now();
    const sectionChanged = activeSection !== previousSection.current;
    const shouldWipe = deviceProfile === "desktop" && sectionChanged && activeSection !== "hero" && now - lastWipeAt.current > 900;

    if (shouldWipe) {
      setSectionWipeTick((prev) => prev + 1);
      lastWipeAt.current = now;
    }

    previousSection.current = activeSection;
  }, [activeSection, deviceProfile]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (formStep === 1) {
      setFormStep(2);
      return;
    }

    const formData = new FormData(event.currentTarget);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      targetSpecies: String(formData.get("targetSpecies") ?? ""),
      message: String(formData.get("message") ?? ""),
      preferredMonth: String(formData.get("preferredMonth") ?? ""),
      groupSize: String(formData.get("groupSize") ?? ""),
      accommodation: String(formData.get("accommodation") ?? ""),
      transferMode: String(formData.get("transferMode") ?? ""),
      programLength: String(formData.get("programLength") ?? ""),
      budgetBand: String(formData.get("budgetBand") ?? ""),
      antiBotField: String(formData.get("antiBotField") ?? ""),
      turnstileToken
    };

    setSubmitting(true);
    setStatus("");
    setStatusTone("idle");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const result = (await response.json()) as { ok?: boolean; forwarded?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Failed");

      setStatus(
        result.forwarded === false
          ? "Request stored. Concierge forwarding needs manual review."
          : "Request submitted. KAIMANAWA concierge will contact you shortly."
      );
      setStatusTone("ok");
      setFormStep(1);
      setTurnstileToken("");
      event.currentTarget.reset();
    } catch {
      setStatus("Submission failed. Please retry.");
      setStatusTone("err");
    } finally {
      setSubmitting(false);
    }
  }

  function handleHeroMove(event: MouseEvent<HTMLElement>) {
    if (deviceProfile !== "desktop") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(x * 36);
    pointerY.set(y * 24);
  }

  function resetHeroParallax() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const isLowMobile = deviceProfile === "low-mobile";
  const isTablet = deviceProfile === "tablet";
  const isDesktopProfile = deviceProfile === "desktop";
  const daylight = (Math.sin(dayProgress * Math.PI * 2 - Math.PI / 2) + 1) / 2;
  const dawnGlow = Math.max(0, 1 - Math.abs(dayProgress - 0.23) / 0.16);
  const duskGlow = Math.max(0, 1 - Math.abs(dayProgress - 0.73) / 0.16);
  const noonGlow = Math.max(0, 1 - Math.abs(dayProgress - 0.5) / 0.24);
  const nightGlow = Math.min(1, Math.max(0, (0.42 - daylight) / 0.42));
  const dayCycle = 0.08 + daylight * 0.86;
  const isNight = daylight < 0.38;
  const heavyMode = performanceMode === "ultra" && (deviceProfile === "desktop" || isTablet);

  return (
    <div className={`relative z-10 pb-20 profile-${deviceProfile}`}>
      <ScrollCompass />
      {heavyMode && <HunterCrosshair />}
      <CursorSpotlight enabled={heavyMode && isNight} />
      {heavyMode && !isLowMobile && <WeatherOverlay mode={weatherMode} wind={windStrength} dayCycle={dayCycle} />}
      <AmbientAudio mode={weatherMode} dayCycle={dayCycle} activeSection={activeSection} />

      <motion.div className="fixed left-0 top-0 z-[80] h-[3px] w-full origin-left bg-gradient-to-r from-[#f4d8a6] to-[#af7b3f]" style={{ scaleX: scrollYProgress }} />
      {isDesktopProfile && sectionWipeTick > 0 && (
        <motion.div
          key={sectionWipeTick}
          className="section-wipe-overlay"
          initial={{ opacity: 0, x: "-115%" }}
          animate={{ opacity: [0, 0.9, 0.9, 0], x: ["-115%", "-12%", "40%", "118%"] }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        />
      )}
        <div className="daynight-layer" aria-hidden>
          <div className="day-layer" style={{ opacity: dayCycle * 0.8 }} />
          <div className="night-layer" style={{ opacity: (1 - dayCycle) * 0.72 }} />
          <div className="sun-core" style={{ left: `${8 + dayCycle * 74}%`, top: `${56 - dayCycle * 40}%`, opacity: Math.max(0, dayCycle - 0.15) }} />
          <div className="moon-core" style={{ left: `${86 - dayCycle * 70}%`, top: `${18 + dayCycle * 26}%`, opacity: Math.max(0, 0.85 - dayCycle) }} />
        </div>

      <div
        className="pointer-events-none fixed inset-0 z-[5] opacity-35"
        style={{ background: "radial-gradient(520px circle at 52% 18%, rgba(230, 189, 111, 0.18), transparent 62%)" }}
      />
      <button
        type="button"
        onClick={() => setPerformanceMode((prev) => (prev === "ultra" ? "balanced" : "ultra"))}
        className="mode-toggle premium-panel fixed bottom-5 left-5 z-[92] rounded-full bg-black/55 px-3 py-2 text-xs uppercase tracking-[0.12em] text-stone-100"
      >
        Mode: {performanceMode}
      </button>

      <header className={`sticky top-0 z-50 border-b border-white/10 bg-[#040705]/70 backdrop-blur-xl transition-transform duration-300 ${navVisible ? "translate-y-0" : "-translate-y-full"}`}>
        <div className="mx-auto flex w-[min(1220px,92vw)] min-h-[72px] items-center justify-between gap-3 py-1">
          <a href="#top" className="flex items-center gap-3">
            <span className="gradient-ring grid h-20 w-20 place-items-center overflow-hidden rounded-full bg-gradient-to-b from-[#213326] to-[#101811] p-1 md:h-28 md:w-28">
              <Image src="/brand-logo.png" alt="Kaimanawa official logo" width={112} height={112} className="h-full w-full scale-[1.07] rounded-full object-cover" />
            </span>
            <div>
              <p className="font-serif text-[1.15rem] leading-none tracking-[0.16em] sm:text-[1.7rem] sm:tracking-[0.22em]">KAIMANAWA</p>
              <p className="hidden text-[10px] uppercase tracking-[0.28em] text-[#c8b085] sm:block">New Zealand Private Hunts</p>
            </div>
          </a>

          <nav className="hidden items-center gap-5 text-sm text-stone-300 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`nav-link-premium transition hover:text-[#d9b167] ${
                  activeSection === item.href.slice(1) ? "is-active text-[#f2d29b]" : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="action-btn-primary px-3 py-2 text-[11px] sm:px-4 sm:text-xs"
          >
            Start Booking
          </a>
        </div>
        <nav className="mx-auto flex w-[min(1220px,92vw)] gap-2 overflow-x-auto pb-2 text-[11px] uppercase tracking-[0.12em] text-stone-200 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`premium-panel shrink-0 rounded-full bg-black/30 px-3 py-1.5 ${
                activeSection === item.href.slice(1) ? "border-[#e3c387] bg-black/60 text-[#f2d29b]" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main id="top" className="relative">
        <section
          className={`hero-parallax-zone relative min-h-[88vh] overflow-hidden md:min-h-[94vh] ${isDesktopProfile ? "hero-desktop-cinematic" : ""}`}
          onMouseMove={handleHeroMove}
          onMouseLeave={resetHeroParallax}
        >
          <video
            className="hero-video-canvas absolute inset-0 h-full w-full scale-[1.06] object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1800&q=80"
            style={{ filter: `saturate(${1.12 + daylight * 0.1}) contrast(${1.03 + daylight * 0.08}) brightness(${0.92 + nightGlow * 0.17})` }}
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-rocky-mountains-20024-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-forest-and-mountain-landscape-9714-large.mp4" type="video/mp4" />
            <source src="https://assets.mixkit.co/videos/preview/mixkit-rough-mountain-landscape-21002-large.mp4" type="video/mp4" />
          </video>
          <motion.div className="hero-vignette absolute inset-0" style={{ x: heroBgX, y: heroBgY }} />
          <motion.div className="hero-aurora absolute inset-0" style={{ x: heroBgX, y: heroBgY }} />
          <div className="hero-dawn-wash absolute inset-0" style={{ opacity: Math.max(dawnGlow, duskGlow) * 0.52 }} aria-hidden />
          <div className="hero-noon-wash absolute inset-0" style={{ opacity: noonGlow * 0.3 }} aria-hidden />
          <div className="hero-night-stars absolute inset-0" style={{ opacity: nightGlow * 0.72 }} aria-hidden />
          <div className="hero-sun-shaft absolute inset-0" style={{ opacity: daylight * 0.56 }} aria-hidden />
          {isNight && <div className="hero-night-lift absolute inset-0" aria-hidden />}
          {isDesktopProfile && <div className="hero-scanline absolute inset-0" aria-hidden />}
          {isDesktopProfile && <div className="hero-glint absolute inset-0" aria-hidden />}
          {!isLowMobile && <motion.div className="hero-orb hero-orb-left" style={{ x: heroBgX, y: heroBgY }} />}
          {!isLowMobile && <motion.div className="hero-orb hero-orb-right" style={{ x: heroBgX, y: heroBgY }} />}

          <motion.div
            className="section-shell relative z-10 grid min-h-[94vh] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]"
            style={{ y: titleY, opacity: titleOpacity, x: heroFrontX }}
          >
            <div className="hero-copy-shell max-w-3xl">
              <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#efcf97]/50 bg-black/45 px-4 py-1 text-xs uppercase tracking-[0.2em] text-[#e3c387]">
                <Sparkles size={14} />
                Cinematic 2027 Experience
              </p>

              <h1 className="max-w-[14ch] font-serif text-5xl leading-[0.98] text-white md:text-7xl xl:text-8xl">
                KAIMANAWA <span className="metal-text">moves like cinema.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg text-stone-100/90 md:text-xl">
                Ultra-premium visual direction for New Zealand trophy hunting. Cinematic motion, layered light, and a luxury-first interface
                designed to feel alive from first frame to final scroll.
              </p>
              <p className="mt-3 text-sm uppercase tracking-[0.14em] text-[#dfc28f]">
                Kaimanawa Range, Central North Island (Manawatu-Whanganui / Waikato), New Zealand
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#game" className="action-btn-primary hero-cta-primary px-7 py-3 text-sm tracking-[0.07em]">
                  Explore Species
                </a>
                <a href="#guides" className="action-btn-secondary hero-cta-secondary px-7 py-3 text-sm">
                  Trophy Guides
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2">
                {metrics.slice(0, 2).map((metric) => (
                  <motion.div key={metric.label} whileHover={{ y: -6 }} className="premium-panel hero-metric-card rounded-2xl bg-black/35 p-4">
                    <p className="text-3xl font-semibold text-[#f0d8ac]">{metric.value}</p>
                    <p className="text-xs uppercase tracking-[0.13em] text-stone-200">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div className="hero-side-shell space-y-4" style={{ y: heroFrontY }}>
              {isDesktopProfile && (
                <div className="premium-panel hero-telemetry-card w-fit rounded-xl bg-black/45 px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                  Signal lock: Kaimanawa sector ready
                </div>
              )}
              <div className="premium-panel hero-weather-pill inline-flex w-fit items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                <span className={`weather-dot weather-${weatherMode}`} />
                Weather: {weatherMode}
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="premium-panel hero-logo-panel mx-auto w-fit rounded-[30px] bg-black/55 p-5"
              >
                <div className="hero-logo-shell">
                  <Image src="/brand-logo.png" alt="Kaimanawa official logo large" width={260} height={260} className="h-[170px] w-[170px] rounded-2xl object-cover md:h-[260px] md:w-[260px]" />
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="premium-panel hero-update-card rounded-2xl bg-black/50 p-5"
              >
                <div className="hero-update-badge mb-2 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#e3c387]">
                  <Crown size={13} />
                  live elite update
                </div>
                <motion.p key={tickerIndex} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-sm text-stone-100">
                  {rotatingNotes[tickerIndex]}
                </motion.p>
              </motion.div>

              <div className="grid gap-3 sm:grid-cols-2">
                {metrics.slice(2, 4).map((metric) => (
                  <motion.div key={metric.label} whileHover={{ y: -6, rotateX: 4 }} className="premium-panel hero-metric-card rounded-2xl bg-black/35 p-4">
                    <p className="text-2xl font-semibold text-[#f0d8ac]">{metric.value}</p>
                    <p className="text-xs uppercase tracking-[0.13em] text-stone-200">{metric.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="overflow-hidden border-y border-white/10 bg-black/40 py-3">
          <div className="marquee-track text-xs uppercase tracking-[0.24em] text-[#d9b167]">
            KAIMANAWA PRIVATE HUNTS - CINEMATIC LODGE EXPERIENCE - TROPHY STRATEGY - ELITE FIELD GUIDES - NEW ZEALAND ALPINE TERRAIN -
          </div>
        </section>
        <CommandCenter daylight={daylight} isNight={isNight} />
        <TrustStrip />
        <CinematicTransition />

        <section id="estate" className="section-shell relative">
          <div className="estate-glow" />

          <motion.div {...reveal} className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">01 Estate Overview</p>
              <h2 className="font-serif text-4xl md:text-5xl">Terrain intelligence with cinematic depth</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.17em]">
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Live Wind Mapping</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Thermal Route Logic</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Low-Signature Access</span>
            </div>
          </motion.div>

          <div className="relative z-10 grid gap-4 lg:grid-cols-[1.24fr_0.76fr]">
            <motion.article
              {...reveal}
              whileHover={{ y: -8 }}
              className="card-vignette premium-panel group relative min-h-[520px] overflow-hidden rounded-[30px]"
            >
              <Image
                src={estateHighlights[0].image}
                alt={estateHighlights[0].title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute left-5 top-5 z-10 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                Prime Terrain Core
              </div>
              <div className="relative z-10 flex h-full flex-col justify-end p-7">
                <h3 className="font-serif text-4xl text-white">{estateHighlights[0].title}</h3>
                <p className="mt-2 max-w-xl text-sm text-stone-200">{estateHighlights[0].description}</p>
                <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-3">
                  <div className="premium-panel rounded-xl bg-black/45 p-3">
                    <p className="text-xl font-semibold text-[#f0d8ac]">420m</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">Elevation range</p>
                  </div>
                  <div className="premium-panel rounded-xl bg-black/45 p-3">
                    <p className="text-xl font-semibold text-[#f0d8ac]">18</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">Scout routes</p>
                  </div>
                  <div className="premium-panel rounded-xl bg-black/45 p-3">
                    <p className="text-xl font-semibold text-[#f0d8ac]">96%</p>
                    <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">Shot confidence</p>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4">
              {estateHighlights.slice(1).map((card, idx) => (
                <motion.article
                  key={card.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: idx * 0.08 }}
                  whileHover={{ y: -8, x: -2 }}
                  className="card-vignette premium-panel group relative min-h-[164px] overflow-hidden rounded-3xl"
                >
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute left-4 top-4 z-10 text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">
                    Sector 0{idx + 2}
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-end p-5">
                    <h3 className="font-serif text-2xl text-white">{card.title}</h3>
                    <p className="mt-1 max-w-md text-sm text-stone-200">{card.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-3">
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Visibility Grid</p>
              <p className="mt-2 text-sm text-stone-200">Long-lens lines from 12 ridge points with live weather-aware route switching.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Acoustic Discipline</p>
              <p className="mt-2 text-sm text-stone-200">Silent movement corridors reduce disturbance and increase controlled opportunities.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Recovery Logistics</p>
              <p className="mt-2 text-sm text-stone-200">Integrated extraction paths with low-impact mobility and guide synchronization.</p>
            </motion.div>
          </div>
        </section>
        <CinematicTransition />
        <SignatureReveal daylight={daylight} isNight={isNight} />
        <CinematicTransition />

        <section id="game" className="section-shell relative">
          <div className="species-glow" />

          <motion.div {...reveal} className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">02 Game Species</p>
              <h2 className="font-serif text-4xl md:text-5xl">Trophy-class hunting portfolio</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.17em]">
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Rut Priority Calendar</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Trophy Score Bands</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Ethical Shot Standard</span>
            </div>
          </motion.div>

          <div className="relative z-10 mb-4 grid gap-3 md:grid-cols-3">
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Top trophy potential</p>
              <p className="mt-2 text-sm text-stone-200">Red Stag band reaches 410+ SCI under strict maturity and pressure-control policies.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Prime timing engine</p>
              <p className="mt-2 text-sm text-stone-200">Season matrix tuned by rut rhythm, moon phases, and daily wind-window probability.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Ethical shot profile</p>
              <p className="mt-2 text-sm text-stone-200">Distance and angle control designed for high-confidence, low-stress execution.</p>
            </motion.div>
          </div>

          <div className="relative z-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {gameSpecies.map((game, i) => (
              <motion.article
                key={game.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.08 }}
                whileHover={{ y: -10, scale: 1.01 }}
                className="premium-panel species-card group relative min-h-[430px] overflow-hidden rounded-[28px] p-3"
              >
                <div className="absolute left-6 top-6 z-20 rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                  Tier 0{i + 1}
                </div>
                <div className="relative h-[54%] overflow-hidden rounded-2xl">
                  {!failedSpeciesImages[game.title] ? (
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover transition duration-700 group-hover:scale-110"
                      onError={() => setFailedSpeciesImages((prev) => ({ ...prev, [game.title]: true }))}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(66,95,80,0.55),rgba(24,34,29,0.9))]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" />
                </div>
                <div className="p-3">
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="font-serif text-3xl text-white">{game.title}</h3>
                    <span className="rounded-full border border-[#d9b167]/45 bg-[#d9b167]/15 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#e7cb95]">
                      {game.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300">{game.detail}</p>
                  <div className="mt-3 grid gap-2 text-xs text-stone-100">
                    <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Trophy band</span><span className="text-[#f0d8ac]">{game.trophyBand}</span></p>
                    <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Prime season</span><span className="text-[#f0d8ac]">{game.primeSeason}</span></p>
                    <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Shot range</span><span className="text-[#f0d8ac]">{game.shotRange}</span></p>
                    <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Terrain</span><span className="text-[#f0d8ac]">{game.terrain}</span></p>
                  </div>
                  <div className="mt-3">
                    <p className="mb-1 text-[10px] uppercase tracking-[0.13em] text-[#e7cb95]">Success model</p>
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/35">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#e9c888] to-[#8ad9a7]" style={{ width: `${game.successRate}%` }} />
                    </div>
                    <p className="mt-1 text-xs text-stone-300">{game.successRate}% controlled outcome probability</p>
                  </div>
                </div>
                <ArrowUpRight className="absolute right-5 top-5 text-[#d9b167] opacity-0 transition group-hover:opacity-100" size={18} />
              </motion.article>
            ))}
          </div>

          <div className="relative z-10 mt-5 grid gap-4 md:grid-cols-3">
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Genetics Program</p>
              <p className="mt-2 text-sm text-stone-200">Selective management with strict maturity rules and annual score auditing.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Shot Opportunity Design</p>
              <p className="mt-2 text-sm text-stone-200">Approach angles and distance windows optimized for ethical confidence.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/35 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Package Flexibility</p>
              <p className="mt-2 text-sm text-stone-200">Single-species and mixed expeditions with tailored lodge and transfer plans.</p>
            </motion.div>
          </div>
        </section>
        <CinematicTransition />

        <section id="experiences" className="section-shell relative">
          <div className="experiences-glow" />

          <motion.div {...reveal} className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">03 Surrounding Experiences</p>
              <h2 className="font-serif text-4xl md:text-5xl">Beyond hunting: premium companion journeys</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.17em]">
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Lodge Concierge</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Private Transfer</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Family Itineraries</span>
            </div>
          </motion.div>

          <div className="relative z-10 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.article
              {...reveal}
              whileHover={{ y: -8 }}
              className="premium-panel experiences-suite relative min-h-[520px] overflow-hidden rounded-[30px] p-7"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(214,170,95,0.28),transparent_42%),radial-gradient(circle_at_88%_86%,rgba(82,128,96,0.2),transparent_48%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="inline-flex rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                    Signature Lifestyle Layer
                  </p>
                  <h3 className="mt-4 max-w-[12ch] font-serif text-4xl text-white md:text-5xl">
                    Your group gets a fully orchestrated luxury ecosystem.
                  </h3>
                  <p className="mt-3 max-w-xl text-sm text-stone-200">
                    Beyond trophy hunting, every companion experience is synchronized with hunt windows and guest energy cycles for a seamless premium stay.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="premium-panel rounded-xl bg-black/45 p-3">
                      <p className="text-xl font-semibold text-[#f0d8ac]">4x4</p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">terrain tours</p>
                    </div>
                    <div className="premium-panel rounded-xl bg-black/45 p-3">
                      <p className="text-xl font-semibold text-[#f0d8ac]">Chef</p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">private dining</p>
                    </div>
                    <div className="premium-panel rounded-xl bg-black/45 p-3">
                      <p className="text-xl font-semibold text-[#f0d8ac]">VIP</p>
                      <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">lodge support</p>
                    </div>
                  </div>
                  <div className="premium-panel rounded-xl bg-black/35 p-3">
                    <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Companion flow</p>
                    <p className="mt-1 text-sm text-stone-200">Morning excursion - Afternoon reset - Evening private program</p>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4 md:grid-cols-2">
              {experiences.map((item, idx) => (
                <motion.article
                  key={item.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: idx * 0.08 }}
                  whileHover={{ y: -8 }}
                  className="premium-panel experiences-card group relative min-h-[246px] overflow-hidden rounded-3xl p-6"
                >
                  <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(214,170,95,0.24),transparent_50%)]" />
                  <div className="relative z-10">
                    <div className="mb-2 flex items-center justify-between gap-2">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d9b167]">{item.icon}</p>
                      <span className="rounded-full border border-[#d9b167]/45 bg-[#d9b167]/10 px-2 py-1 text-[10px] uppercase tracking-[0.12em] text-[#e7cb95]">
                        {item.level}
                      </span>
                    </div>
                    <h3 className="mt-1 font-serif text-2xl text-white">{item.title}</h3>
                    <p className="mt-2 text-sm text-stone-300">{item.text}</p>
                    <div className="mt-3 space-y-1 text-xs text-stone-200">
                      <p>Duration: {item.duration}</p>
                      <p>Ideal group: {item.group}</p>
                      <p>Cadence: {item.cadence}</p>
                    </div>
                    <ArrowUpRight className="mt-4 text-[#d9b167] opacity-70 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" size={18} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-4 grid gap-3 md:grid-cols-4">
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Guest wellbeing</p>
              <p className="mt-1 text-sm text-stone-200">Recovery-oriented pacing and comfort buffering.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Travel continuity</p>
              <p className="mt-1 text-sm text-stone-200">Private transfer routing with minimal idle time.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Family integration</p>
              <p className="mt-1 text-sm text-stone-200">Parallel companion itineraries during hunt sessions.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Concierge orchestration</p>
              <p className="mt-1 text-sm text-stone-200">Single control desk for lodge, route, and activities.</p>
            </motion.div>
          </div>
        </section>
        <CinematicTransition />

        <section id="insights" className="section-shell relative">
          <div className="insights-glow" />
          <motion.div {...reveal} className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Trophy Insights</p>
            <h2 className="font-serif text-4xl md:text-5xl">Interactive map and story intelligence</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.17em]">
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Route Heat Mapping</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Shot Window Analytics</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Species Density Board</span>
            </div>
          </motion.div>
          <div className="relative z-10 grid gap-5 lg:grid-cols-2">
            <TrophyCarousel />
            <InteractiveMap />
          </div>
        </section>
        <CinematicTransition />
        <StoryChapters />
        <CinematicTransition />

        <section id="guides" className="section-shell relative">
          <div className="guides-glow" />

          <motion.div {...reveal} className="relative z-10 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">04 Guide Stories</p>
              <h2 className="font-serif text-4xl md:text-5xl">Field masters behind every trophy</h2>
            </div>
            <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.17em]">
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Certified Team</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">24/7 Safety Protocol</span>
              <span className="premium-panel rounded-full bg-black/35 px-3 py-1 text-[#dfc28f]">Trophy Planning</span>
            </div>
          </motion.div>

          <div className="relative z-10 grid gap-4 lg:grid-cols-[1.08fr_0.92fr]">
            <motion.article {...reveal} whileHover={{ y: -8 }} className="premium-panel guides-command rounded-[30px] bg-black/45 p-7">
              <p className="inline-flex rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                Guide Intelligence Unit
              </p>
              <h3 className="mt-4 max-w-[15ch] font-serif text-4xl text-white md:text-5xl">
                Every move is planned by terrain, wind, and client profile.
              </h3>
              <p className="mt-4 max-w-2xl text-sm text-stone-300">
                Our guides run premium pre-hunt assessments, route strategy sessions, and real-time adjustments to keep outcomes controlled and ethical.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <div className="premium-panel rounded-xl bg-black/45 p-3">
                  <p className="text-xl font-semibold text-[#f0d8ac]">15+</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">avg years field time</p>
                </div>
                <div className="premium-panel rounded-xl bg-black/45 p-3">
                  <p className="text-xl font-semibold text-[#f0d8ac]">1:1</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">guide to hunter ratio</p>
                </div>
                <div className="premium-panel rounded-xl bg-black/45 p-3">
                  <p className="text-xl font-semibold text-[#f0d8ac]">100%</p>
                  <p className="text-[10px] uppercase tracking-[0.14em] text-stone-200">briefed safety routes</p>
                </div>
              </div>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <div className="premium-panel rounded-xl bg-black/35 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Live guide protocol</p>
                  <p className="mt-1 text-sm text-stone-200">Wind verification - route call - ethical shot gate - recovery command.</p>
                </div>
                <div className="premium-panel rounded-xl bg-black/35 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Operational focus</p>
                  <p className="mt-1 text-sm text-stone-200">Client safety, trophy quality, and clean execution under variable terrain.</p>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-4">
              {guideStories.map((guide, idx) => (
                <motion.article
                  key={guide.name}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: idx * 0.08 }}
                  whileHover={{ y: -8, x: -2 }}
                  className="premium-panel guide-dossier group grid min-h-[230px] grid-cols-[120px_1fr] overflow-hidden rounded-3xl bg-black/35"
                >
                  <div className="relative">
                    <Image src={guide.image} alt={guide.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">Lead Guide 0{idx + 1}</p>
                    <h3 className="mt-1 font-serif text-2xl text-white">{guide.name}</h3>
                    <p className="text-xs uppercase tracking-[0.13em] text-[#d9b167]">{guide.role}</p>
                    <p className="mt-2 text-sm text-stone-300">{guide.story}</p>
                    <div className="mt-3 grid gap-2 text-xs text-stone-100 sm:grid-cols-2">
                      <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Experience</span><span className="text-[#f0d8ac]">{guide.years}y</span></p>
                      <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Trophies</span><span className="text-[#f0d8ac]">{guide.trophies}+</span></p>
                      <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Success</span><span className="text-[#f0d8ac]">{guide.successRate}%</span></p>
                      <p className="inline-flex items-center justify-between rounded-lg border border-white/10 bg-black/25 px-2 py-1"><span>Safety</span><span className="text-[#f0d8ac]">{guide.safetyScore}</span></p>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.12em]">
                      <span className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[#e7cb95]">{guide.specialization}</span>
                      <span className="rounded-full border border-white/20 bg-black/20 px-2 py-1 text-[#e7cb95]">{guide.languages}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <CinematicTransition />

        <section id="contact" className="section-shell relative">
          <div className="contact-glow" />

          <motion.div {...reveal} className="relative z-10 mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Concierge Intake</p>
            <h2 className="font-serif text-4xl md:text-5xl">Build your KAIMANAWA program</h2>
          </motion.div>

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.06fr_0.94fr]">
            <motion.article {...reveal} className="premium-panel rounded-[30px] bg-black/45 p-7">
              <p className="inline-flex rounded-full border border-white/30 bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">
                Private Concierge Protocol
              </p>
              <h3 className="mt-4 max-w-[16ch] font-serif text-4xl text-white">
                From request to arrival, we engineer a full premium flow.
              </h3>
              <p className="mt-4 text-sm text-stone-300">
                Submit your details and our operations desk prepares species timing, guide pairing, transfer logistics, and lodge composition.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="premium-panel rounded-xl bg-black/45 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Response Window</p>
                  <p className="mt-1 text-lg font-semibold text-[#f0d8ac]">Under 24h</p>
                </div>
                <div className="premium-panel rounded-xl bg-black/45 p-3">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Program Type</p>
                  <p className="mt-1 text-lg font-semibold text-[#f0d8ac]">Custom-built</p>
                </div>
              </div>
              <div className="mt-5 space-y-3 text-sm text-stone-200">
                <p className="inline-flex items-center gap-2"><MountainSnow size={16} className="text-[#d9b167]" /> Kaimanawa Range, Central North Island, New Zealand</p>
                <p className="inline-flex items-center gap-2"><Compass size={16} className="text-[#d9b167]" /> Advanced logistics and transfer planning</p>
                <p className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-[#d9b167]" /> Fully briefed and insured field operation</p>
              </div>
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Availability Snapshot</p>
                <div className="mt-2 space-y-2">
                  {availabilitySlots.map((slot) => (
                    <div key={slot.month} className="premium-panel flex items-center justify-between rounded-xl bg-black/35 px-3 py-2">
                      <span className="text-sm text-stone-200">{slot.month}</span>
                      <span className="text-xs uppercase tracking-[0.12em] text-[#dfc28f]">{slot.status} - {slot.spots} spots</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            <div className="grid gap-6">
              <BookingConfigurator onConfigChange={setBookingConfig} />
              <motion.form {...reveal} onSubmit={onSubmit} className="premium-panel rounded-[30px] bg-black/35 p-7">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#e7cb95]">Step {formStep} of 2</p>
              <input type="hidden" name="accommodation" value={bookingConfig.comfort} />
              <input type="hidden" name="transferMode" value={bookingConfig.transfer} />
              <input type="hidden" name="programLength" value={bookingConfig.stay} />
              <input type="hidden" name="budgetBand" value={bookingConfig.budgetBand} />
              <input type="hidden" name="turnstileToken" value={turnstileToken} />
              <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              {formStep === 1 && (
                <>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm">Full name
                      <input required name="fullName" className="field-control mt-2" />
                    </label>
                    <label className="text-sm">Email
                      <input required type="email" name="email" className="field-control mt-2" />
                    </label>
                  </div>
                  <label className="mt-4 block text-sm">Target species
                    <select required name="targetSpecies" defaultValue={bookingConfig.species} className="field-control mt-2">
                      <option value="Red Stag">Red Stag</option>
                      <option value="Fallow Buck">Fallow Buck</option>
                      <option value="Wild Boar">Wild Boar</option>
                      <option value="Mixed Expedition">Mixed Expedition</option>
                    </select>
                  </label>
                </>
              )}

              {formStep === 2 && (
                <>
                  <div className="mt-2 grid gap-4 sm:grid-cols-2">
                    <label className="text-sm">Preferred month
                      <input name="preferredMonth" className="field-control mt-2" placeholder="e.g. May 2026" />
                    </label>
                    <label className="text-sm">Group size
                      <input name="groupSize" className="field-control mt-2" placeholder="e.g. 2 hunters" defaultValue={`${bookingConfig.guests} hunters`} />
                    </label>
                  </div>
                  <label className="mt-4 block text-sm">Configured package
                    <input value={`${bookingConfig.comfort} / ${bookingConfig.transfer} / ${bookingConfig.stay}`} readOnly className="field-control mt-2 opacity-80" />
                  </label>
                  <label className="mt-4 block text-sm">Program notes
                    <textarea required name="message" rows={5} className="field-control mt-2" placeholder="Preferred month, group size, hunt duration, and special lodge requests." />
                  </label>
                  <TurnstileWidget onTokenChange={setTurnstileToken} />
                </>
              )}

              <div className="mt-5 flex gap-3">
                {formStep === 2 && (
                  <button type="button" onClick={() => setFormStep(1)} className="action-btn-secondary px-5 py-3 text-xs">
                    Back
                  </button>
                )}
                <button type="submit" disabled={submitting} className="action-btn-primary px-7 py-3 text-sm disabled:opacity-60">
                  {formStep === 1 ? "Continue" : submitting ? "Submitting..." : "Send Concierge Request"}
                </button>
              </div>
              {status && (
                <p className={`mt-3 inline-flex items-center gap-2 text-sm ${statusTone === "ok" ? "text-emerald-300" : "text-amber-300"}`}>
                  {statusTone === "ok" ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
                  {status}
                </p>
              )}
              </motion.form>
            </div>
          </div>
        </section>
        </main>
    </div>
  );
}

