"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, useMotionValue, useScroll, useSpring, useTransform, AnimatePresence, useAnimationFrame, MotionValue } from "framer-motion";
import { FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { AlertTriangle, ArrowRight, ArrowUpRight, CheckCircle2, Crown, Sparkles } from "lucide-react";
import WeatherOverlay from "@/components/weather-overlay";
import CursorSpotlight from "@/components/cursor-spotlight";
import TrustStrip from "@/components/trust-strip";
import AmbientAudio from "@/components/ambient-audio";
import ScrollCompass from "@/components/scroll-compass";
import CinematicTransition from "@/components/cinematic-transition";
import WeatherParticles from "@/components/weather-particles";
import BookingConfigurator, { type BookingConfig } from "@/components/booking-configurator";
import TurnstileWidget from "@/components/turnstile-widget";
import CustomCursor from "@/components/custom-cursor";
import ConciergeModal from "@/components/concierge-modal";
import ConciergeStatusTicker from "@/components/concierge-status-ticker";
import {
  availabilitySlots,
  estateHighlights,
  experiences,
  gameSpecies,
  guideStories,
  metrics,
  navItems
} from "@/lib/data";

const CommandCenter = dynamic<{ daylight: MotionValue<number>; isNight: boolean }>(() => import("@/components/command-center"));
const TrophyCarousel = dynamic(() => import("@/components/trophy-carousel"));
const InteractiveMap = dynamic(() => import("@/components/interactive-map"));
const SignatureReveal = dynamic<{ daylight: MotionValue<number>; isNight: boolean }>(() => import("@/components/signature-reveal"));
const StoryChapters = dynamic(() => import("@/components/story-chapters"));

function MagneticWrap({ children, strength = 15 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handlePointer = (e: MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * (strength / 100));
    y.set((e.clientY - centerY) * (strength / 100));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointer}
      onPointerLeave={reset}
      style={{ x: springX, y: springY }}
      className="magnetic-wrap"
    >
      {children}
    </motion.div>
  );
}

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: "easeOut" as const }
};

const staggerText = (text: string) => {
  return text.split("").map((char, i) => (
    <motion.span
      key={`${char}-${i}`}
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, delay: i * 0.02, ease: "easeOut" }}
      className="stagger-char"
    >
      {char === " " ? "\u00A0" : char}
    </motion.span>
  ));
};

type WeatherMode = "sun" | "wind" | "rain" | "snow";
const weatherModes: WeatherMode[] = ["sun", "wind", "rain", "snow"];
const heroVideoSources = [
  "https://player.vimeo.com/external/406240217.sd.mp4?s=d0092d6e32d2e1c944d15668d2a6bca2a1e05096&profile_id=165&oauth2_token_id=57447761", // Alpine landscape
  "https://player.vimeo.com/external/370331493.sd.mp4?s=7b23158b1416868a15ce4088d6d744b07f038d05&profile_id=165&oauth2_token_id=57447761", // Mountains
  "https://assets.mixkit.co/videos/preview/mixkit-rocky-mountains-20024-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-forest-and-mountain-landscape-9714-large.mp4",
  "https://assets.mixkit.co/videos/preview/mixkit-rough-mountain-landscape-21002-large.mp4"
];
const heroPoster = "/hero-poster.svg";

export default function ModernSite() {
  const [status, setStatus] = useState("");
  const [statusTone, setStatusTone] = useState<"idle" | "ok" | "err">("idle");
  const [submitting, setSubmitting] = useState(false);
  const [showConcierge, setShowConcierge] = useState(false);
  const [weatherMode, setWeatherMode] = useState<WeatherMode>("sun");
  const [windStrength, setWindStrength] = useState(0.5);
  const dayProgress = useMotionValue(0.68);
  const [isNight, setIsNight] = useState(false);
  const [performanceMode, setPerformanceMode] = useState<"ultra" | "balanced">("ultra");
  const [formStep, setFormStep] = useState<1 | 2>(1);
  const [activeSection, setActiveSection] = useState("hero");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [failedSpeciesImages, setFailedSpeciesImages] = useState<Record<string, boolean>>({});
  const [deviceProfile, setDeviceProfile] = useState<"low-mobile" | "high-mobile" | "tablet" | "desktop">("desktop");
  const [navVisible, setNavVisible] = useState(true);
  const [sectionWipeTick, setSectionWipeTick] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [heroVideoFailed, setHeroVideoFailed] = useState(false);
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

  useAnimationFrame((t, delta) => {
    const current = dayProgress.get();
    const next = (current + delta * 0.000019) % 1;
    dayProgress.set(next);

    // Calculate night boundary to trigger rare React renders for conditional trees
    const d = (Math.sin(next * Math.PI * 2 - Math.PI / 2) + 1) / 2;
    const isNowNight = d < 0.38;
    setIsNight(prev => {
      if (prev !== isNowNight) return isNowNight;
      return prev;
    });
  });

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
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
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

  let heroTicking = false;
  function handleHeroMove(event: MouseEvent<HTMLElement>) {
    if (deviceProfile !== "desktop" || heroTicking) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const cx = event.clientX;
    const cy = event.clientY;

    heroTicking = true;
    requestAnimationFrame(() => {
      const x = (cx - rect.left) / rect.width - 0.5;
      const y = (cy - rect.top) / rect.height - 0.5;
      pointerX.set(x * 36);
      pointerY.set(y * 24);
      heroTicking = false;
    });
  }

  function resetHeroParallax() {
    pointerX.set(0);
    pointerY.set(0);
  }

  const isLowMobile = deviceProfile === "low-mobile";
  const isTablet = deviceProfile === "tablet";
  const isDesktopProfile = deviceProfile === "desktop";

  const daylight = useTransform(dayProgress, (v: number) => (Math.sin(v * Math.PI * 2 - Math.PI / 2) + 1) / 2);
  const dayCycle = useTransform(daylight, (v: number) => 0.08 + v * 0.86);

  const heavyMode = performanceMode === "ultra" && (deviceProfile === "desktop" || isTablet);
  const heroUsesVideo = !prefersReducedMotion && !heroVideoFailed;
  const videoFilter = useTransform(daylight, v => `saturate(${1.12 + v * 0.1}) contrast(${1.03 + v * 0.08}) brightness(${0.92 + Math.min(1, Math.max(0, (0.42 - v) / 0.42)) * 0.17})`);

  return (
    <div className={`relative z-10 pb-20 profile-${deviceProfile} ${isDesktopProfile ? 'custom-crosshair' : ''}`}>
      <CustomCursor />
      <ScrollCompass />
      {heavyMode && <div className="grain-overlay" />}
      {heavyMode && <div className="light-leak light-leak-1" />}
      {heavyMode && <div className="light-leak light-leak-2" />}
      <CursorSpotlight enabled={heavyMode && isNight} />
      {heavyMode && !isLowMobile && <WeatherOverlay mode={weatherMode} wind={windStrength} dayCycle={dayCycle} />}
      <AmbientAudio mode={weatherMode} dayCycle={dayCycle} activeSection={activeSection} />
      <WeatherParticles mode={weatherMode} />

      <AnimatePresence>
        {showConcierge && <ConciergeModal onClose={() => setShowConcierge(false)} />}
      </AnimatePresence>

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
        <motion.div className="day-layer" style={{ opacity: useTransform(dayCycle, v => v * 0.8) }} />
        <motion.div className="night-layer" style={{ opacity: useTransform(dayCycle, v => (1 - v) * 0.72) }} />
        <motion.div className="sun-core" style={{ left: useTransform(dayCycle, v => `${8 + v * 74}%`), top: useTransform(dayCycle, v => `${56 - v * 40}%`), opacity: useTransform(dayCycle, v => Math.max(0, v - 0.15)) }} />
        <motion.div className="moon-core" style={{ left: useTransform(dayCycle, v => `${86 - v * 70}%`), top: useTransform(dayCycle, v => `${18 + v * 26}%`), opacity: useTransform(dayCycle, v => Math.max(0, 0.85 - v)) }} />
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
              <Image src="/brand-logo.png" alt="Kaimanawa official logo" width={112} height={112} className="h-full w-full scale-[1.07] rounded-full object-cover" priority sizes="120px" />
            </span>
            <div>
              <p className="font-serif text-[1.15rem] leading-none tracking-[0.2em] sm:text-[1.8rem] sm:tracking-[0.25em] [font-feature-settings:'ss01','ss02']">KAIMANAWA</p>
              <p className="hidden text-[10px] uppercase tracking-[0.35em] text-[#c8b085] sm:block">Private Alpine Estate</p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 text-sm font-medium text-stone-300 lg:flex">
            {navItems.map((item) => (
              <MagneticWrap key={item.href} strength={12}>
                <a
                  href={item.href}
                  className={`nav-link-premium pb-1 uppercase tracking-[0.2em] transition-all hover:text-[#d9b167] ${activeSection === item.href.slice(1) ? "is-active text-[#f2d29b]" : ""
                    }`}
                >
                  {item.label}
                </a>
              </MagneticWrap>
            ))}
          </nav>

          <MagneticWrap strength={20}>
            <button
              onClick={() => setShowConcierge(true)}
              className="action-btn-primary px-5 py-2.5 text-[10px] uppercase tracking-[0.2em] [box-shadow:0_0_20px_rgba(227,195,135,0.1)]"
            >
              Start Booking
            </button>
          </MagneticWrap>
        </div>
        <nav className="mx-auto flex w-[min(1220px,92vw)] gap-2 overflow-x-auto pb-2 text-[11px] uppercase tracking-[0.12em] text-stone-200 lg:hidden">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`premium-panel shrink-0 rounded-full bg-black/30 px-3 py-1.5 ${activeSection === item.href.slice(1) ? "border-[#e3c387] bg-black/60 text-[#f2d29b]" : ""
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
          <div className={`hero-media-shell absolute inset-0 ${heroVideoReady ? "is-ready" : "is-loading"}`}>
            {!heroVideoReady && (
              <Image
                src={heroPoster}
                alt="Hero Background Poster"
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            )}
            {heroUsesVideo ? (
              <motion.video
                className="hero-video-canvas absolute inset-0 h-full w-full scale-[1.06] object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={heroPoster}
                onCanPlay={() => setHeroVideoReady(true)}
                onError={() => setHeroVideoFailed(true)}
                aria-hidden
                style={{ filter: videoFilter }}
              >
                {heroVideoSources.map((src) => (
                  <source key={src} src={src} type={src.endsWith(".webm") ? "video/webm" : "video/mp4"} />
                ))}
              </motion.video>
            ) : null}
            <div className="hero-video-fallback absolute inset-0" aria-hidden />
            <div className="hero-video-noise absolute inset-0" aria-hidden />
          </div>
          <motion.div className="hero-vignette absolute inset-0 opacity-40" style={{ x: heroBgX, y: heroBgY }} />
          <motion.div className="hero-aurora absolute inset-0" style={{ x: heroBgX, y: heroBgY }} />
          <motion.div className="hero-dawn-wash absolute inset-0" style={{ opacity: useTransform(dayProgress, v => Math.max(Math.max(0, 1 - Math.abs(v - 0.23) / 0.16), Math.max(0, 1 - Math.abs(v - 0.73) / 0.16)) * 0.52) }} aria-hidden />
          <motion.div className="hero-noon-wash absolute inset-0" style={{ opacity: useTransform(dayProgress, v => Math.max(0, 1 - Math.abs(v - 0.5) / 0.24) * 0.3) }} aria-hidden />
          <motion.div className="hero-night-stars absolute inset-0" style={{ opacity: useTransform(daylight, v => Math.min(1, Math.max(0, (0.42 - v) / 0.42)) * 0.72) }} aria-hidden />
          <motion.div className="hero-sun-shaft absolute inset-0" style={{ opacity: useTransform(daylight, v => v * 0.56) }} aria-hidden />
          {isNight && <div className="hero-night-lift absolute inset-0" aria-hidden />}
          {isDesktopProfile && <div className="hero-scanline absolute inset-0" aria-hidden />}
          {isDesktopProfile && <div className="hero-glint absolute inset-0" aria-hidden />}
          {!isLowMobile && <motion.div className="hero-orb hero-orb-left" style={{ x: heroBgX, y: heroBgY }} />}
          {!isLowMobile && <motion.div className="hero-orb hero-orb-right" style={{ x: heroBgX, y: heroBgY }} />}

          <div className="section-shell relative z-20 flex min-h-[94vh] flex-col items-center justify-center">
            {/* Top-Right: Atmospherics */}
            <div className="pointer-events-none absolute inset-x-0 top-0 z-30 hidden h-1/3 lg:block">
              <div className="flex h-full items-start justify-end p-12">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(0,0,0,0.45)" }}
                  transition={{ delay: 0.6 }}
                  className="pointer-events-auto premium-panel w-[220px] rounded-2xl bg-black/30 p-5 backdrop-blur-xl border-white/5 transition-colors cursor-default"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`h-2.5 w-2.5 rounded-full weather-${weatherMode} animate-pulse`} />
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7cb95]">Atmospherics</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-serif text-stone-100 capitalize">{weatherMode}</p>
                    <span className="text-[10px] text-[#d9b167]/80">98% Sync</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Center: Core Narrative */}
            <motion.div
              className="hero-copy-shell relative z-20 flex max-w-4xl flex-col items-center text-center"
              style={{ y: titleY, opacity: titleOpacity, x: heroFrontX }}
            >
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-10 inline-flex items-center gap-2 rounded-full border border-[#efcf97]/20 bg-black/40 px-6 py-2 text-[10px] uppercase tracking-[0.5em] text-[#e3c387] backdrop-blur-md"
              >
                <Sparkles size={12} className="animate-pulse" />
                Est. 2027 • Private Estate
              </motion.p>

              <motion.h1
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                className="font-serif text-5xl leading-[0.85] text-white md:text-8xl xl:text-[9.5rem] [font-feature-settings:'ss01','ss02','clig'] [text-shadow:0_10px_30px_rgba(0,0,0,0.5)]"
              >
                {staggerText("KAIMANAWA")} <br />
                <span className="metal-text italic">{staggerText("moves like cinema.")}</span>
              </motion.h1>

              <p className="mt-12 max-w-xl text-lg leading-[1.9] text-stone-200/80 md:text-xl font-light">
                Experience a masterclass in hunting logistics. A premium arrival sequence
                meticulously crafted for the world&apos;s most discerning hunters.
              </p>

              <div className="mt-14 flex flex-wrap justify-center gap-6">
                <MagneticWrap strength={25}>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href="#game"
                    className="action-btn-primary hero-cta-primary px-14 py-5 text-[10px] uppercase tracking-[0.4em] [box-shadow:0_15px_35px_rgba(227,195,135,0.15)]"
                  >
                    Explore Species
                  </motion.a>
                </MagneticWrap>
                <MagneticWrap strength={25}>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    href="#guides"
                    className="action-btn-secondary hero-cta-secondary px-14 py-5 text-[10px] uppercase tracking-[0.4em]"
                  >
                    Trophy Guides
                  </motion.a>
                </MagneticWrap>
              </div>
            </motion.div>

            {/* Bottom-Left: Metrics */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden h-1/3 lg:block">
              <div className="flex h-full items-end justify-start p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.45)" }}
                  transition={{ delay: 1 }}
                  className="pointer-events-auto premium-panel w-[260px] rounded-2xl bg-black/30 p-6 backdrop-blur-xl border-white/5 transition-colors cursor-default"
                >
                  <div className="mb-5 flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#e7cb95]">Estate Metrics</span>
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {metrics.slice(0, 2).map((metric) => (
                      <div key={metric.label}>
                        <p className="text-2xl font-serif text-[#f0d8ac]">{metric.value}</p>
                        <p className="mt-1 text-[8px] uppercase tracking-[0.1em] text-stone-500">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Bottom-Right: Concierge & Status */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 hidden h-1/3 lg:block">
              <div className="flex h-full items-end justify-end p-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5, backgroundColor: "rgba(0,0,0,0.45)" }}
                  transition={{ delay: 1.2 }}
                  className="pointer-events-auto premium-panel w-[300px] rounded-2xl bg-black/30 p-6 backdrop-blur-xl border-white/5 transition-colors cursor-default"
                >
                  <div className="mb-4 flex items-center gap-3 text-[#e3c387]">
                    <Crown size={14} className="opacity-70" />
                    <span className="text-[10px] uppercase tracking-[0.3em]">Concierge Dispatch</span>
                  </div>
                  <ConciergeStatusTicker />
                  <div className="mt-5 flex gap-4 border-t border-white/5 pt-4">
                    {metrics.slice(2, 4).map((metric) => (
                      <div key={metric.label} className="flex-1">
                        <p className="text-lg font-serif text-[#f2d29b]">{metric.value}</p>
                        <p className="text-[8px] uppercase tracking-[0.1em] text-stone-500">{metric.label.split(' ').slice(0, 1)}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-black/45 py-4 backdrop-blur-md">
          <div className="noise-overlay opacity-5" />
          <div className="marquee-track flex gap-12 text-[10px] uppercase tracking-[0.4em] text-[#d9b167]/80">
            <span>Kaimanawa Private Hunts</span>
            <span>Cinematic Lodge Experience</span>
            <span>Trophy Strategy</span>
            <span>Elite Field Guides</span>
            <span>New Zealand Alpine Terrain</span>
            <span>Kaimanawa Private Hunts</span>
            <span>Cinematic Lodge Experience</span>
            <span>Trophy Strategy</span>
            <span>Elite Field Guides</span>
            <span>New Zealand Alpine Terrain</span>
          </div>
        </section>
        <CommandCenter daylight={daylight} isNight={isNight} />
        <TrustStrip />
        <CinematicTransition />

        <section id="estate" className="section-shell relative">
          <div className="estate-glow" />

          <motion.div {...reveal} className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d9b167] mb-4">01 Estate Overview</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] [font-feature-settings:'ss01','ss02','clig'] tracking-tight">Estate character with <br /><span className="metal-text italic">cinematic depth</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.25em]">
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Private access lines</span>
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Terrain rhythm</span>
            </div>
          </motion.div>

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <motion.article
              {...reveal}
              whileHover={{ y: -8 }}
              className="card-vignette premium-panel group relative min-h-[580px] overflow-hidden rounded-[40px] border-white/10"
            >
              <Image
                src={estateHighlights[0].image}
                alt={estateHighlights[0].title}
                fill
                priority
                className="object-cover transition duration-1000 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
              />
              <div className="absolute left-8 top-8 z-10 rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] backdrop-blur-md">
                Signature estate view
              </div>
              <div className="relative z-10 flex h-full flex-col justify-end p-10">
                <h3 className="font-serif text-4xl md:text-5xl text-white leading-tight">{estateHighlights[0].title}</h3>
                <p className="mt-4 max-w-xl text-stone-200/90 leading-relaxed font-light">{estateHighlights[0].description}</p>
                <div className="mt-8 grid max-w-xl gap-4 sm:grid-cols-3">
                  {[
                    { val: "420m", label: "Elevation spread" },
                    { val: "18", label: "Access routes" },
                    { val: "96%", label: "Planning conf." }
                  ].map(m => (
                    <div key={m.label} className="premium-panel rounded-2xl bg-black/45 p-4 backdrop-blur-xl border-white/5">
                      <p className="text-2xl font-semibold text-[#f0d8ac]">{m.val}</p>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-stone-400 mt-1">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            <div className="grid gap-6">
              {estateHighlights.slice(1).map((card, idx) => (
                <motion.article
                  key={card.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="card-vignette premium-panel group relative min-h-[180px] overflow-hidden rounded-[30px] border-white/5"
                >
                  <Image src={card.image} alt={card.title} fill className="object-cover transition duration-1000 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 400px" />
                  <div className="absolute left-6 top-6 z-10 text-[9px] uppercase tracking-[0.25em] text-[#e7cb95]/80">
                    Estate detail 0{idx + 2}
                  </div>
                  <div className="relative z-10 flex h-full flex-col justify-end p-8">
                    <h3 className="font-serif text-2xl text-white">{card.title}</h3>
                    <p className="mt-2 max-w-md text-xs text-stone-300/90 leading-relaxed">{card.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-6 grid gap-6 md:grid-cols-3">
            {[
              { title: "Visual openness", text: "Long alpine sight lines create a composed sense of scale before the program even begins." },
              { title: "Quiet approach", text: "Forest corridors and basin transitions support calmer movement and better guest composure." },
              { title: "Operational polish", text: "Access, recovery, and lodge return are planned so the day still feels refined after field time." }
            ].map(item => (
              <motion.div key={item.title} {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/30 p-6 backdrop-blur-xl border-white/5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] mb-3">{item.title}</p>
                <p className="text-[13px] text-stone-300 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <CinematicTransition />
        <SignatureReveal daylight={daylight} isNight={isNight} />
        <CinematicTransition />

        <section id="game" className="section-shell relative">
          <div className="species-glow" />

          <motion.div {...reveal} className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d9b167] mb-4">02 Game Species</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] [font-feature-settings:'ss01','ss02'] tracking-tight">Curated trophy programs <br /><span className="metal-text italic">with luxury positioning</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.25em]">
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Season-led planning</span>
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Trophy maturity focus</span>
            </div>
          </motion.div>

          <div className="relative z-10 mb-8 grid gap-6 md:grid-cols-3">
            {[
              { title: "Top trophy potential", text: "Red Stag remains the signature expression of the estate when timing and maturity align correctly." },
              { title: "Season logic", text: "Each program is shaped around timing, guest appetite, and the rhythm of the estate." },
              { title: "Field composure", text: "Distance, angle, and guide pacing are managed to keep the day calm, ethical, and controlled." }
            ].map(item => (
              <motion.div key={item.title} {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/30 p-6 backdrop-blur-xl border-white/5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] mb-3">{item.title}</p>
                <p className="text-[13px] text-stone-300 leading-relaxed font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <div className="relative z-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {gameSpecies.map((game, i) => (
              <motion.article
                key={game.title}
                {...reveal}
                transition={{ ...reveal.transition, delay: i * 0.1 }}
                whileHover={{ y: -12, scale: 1.01 }}
                className="premium-panel species-card group relative min-h-[480px] overflow-hidden rounded-[36px] bg-black/40 p-4 border-white/10 backdrop-blur-xl"
              >
                <div className="absolute left-8 top-8 z-20 rounded-full border border-white/20 bg-black/50 px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] backdrop-blur-md">
                  Signature 0{i + 1}
                </div>
                <div className="relative h-[220px] overflow-hidden rounded-[26px]">
                  {!failedSpeciesImages[game.title] ? (
                    <Image
                      src={game.image}
                      alt={game.title}
                      fill
                      className="object-cover transition duration-1000 group-hover:scale-110"
                      onError={() => setFailedSpeciesImages((prev) => ({ ...prev, [game.title]: true }))}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(66,95,80,0.55),rgba(24,34,29,0.9))]" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
                <div className="p-4 pt-6">
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <h3 className="font-serif text-3xl text-white">{game.title}</h3>
                    <span className="rounded-full border border-[#d9b167]/40 bg-[#d9b167]/10 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-[#e7cb95]">
                      {game.difficulty}
                    </span>
                  </div>
                  <p className="text-sm text-stone-300 font-light leading-relaxed mb-6">{game.detail}</p>

                  <div className="grid gap-3 text-[10px] text-stone-200">
                    {[
                      { l: "Trophy band", v: game.trophyBand },
                      { l: "Season window", v: game.primeSeason },
                      { l: "Terrain", v: game.terrain }
                    ].map(st => (
                      <p key={st.l} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 backdrop-blur-sm">
                        <span className="uppercase tracking-[0.14em] text-stone-400">{st.l}</span>
                        <span className="text-[#f0d8ac] tracking-wide font-medium">{st.v}</span>
                      </p>
                    ))}
                  </div>

                  <div className="mt-6 border-t border-white/5 pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[9px] uppercase tracking-[0.15em] text-[#e7cb95]/80">Concierge planning fit</p>
                      <p className="text-[10px] text-[#f2d29b] font-medium">{game.successRate}%</p>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-black/45 border border-white/[0.03]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${game.successRate}%` }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-[#e9c888] to-[#8ad9a7]"
                      />
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="absolute right-8 top-8 text-[#d9b167] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1" size={20} />
              </motion.article>
            ))}
          </div>

          <div className="relative z-10 mt-8 grid gap-6 md:grid-cols-3">
            {[
              { title: "Maturity standards", text: "Selective management and maturity thresholds help the portfolio feel premium rather than opportunistic." },
              { title: "Approach design", text: "Angle, access, and timing are shaped to keep the experience composed as well as effective." },
              { title: "Program flexibility", text: "Single-species and mixed itineraries can still be tailored around lodge rhythm and transfer preference." }
            ].map(item => (
              <motion.div key={item.title} {...reveal} whileHover={{ y: -5 }} className="premium-panel rounded-2xl bg-black/30 p-6 backdrop-blur-xl border-white/5">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] mb-3">{item.title}</p>
                <p className="text-[13px] text-stone-300 leading-relaxed font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>
        <CinematicTransition />

        <section id="experiences" className="section-shell relative">
          <div className="experiences-glow" />

          <motion.div {...reveal} className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d9b167] mb-4">03 Surrounding Experiences</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] [font-feature-settings:'ss01','ss02'] tracking-tight">Hospitality layers <br /><span className="metal-text italic">that complete the stay</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.25em]">
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Lodge Concierge</span>
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Private Transfer</span>
            </div>
          </motion.div>

          <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.article
              {...reveal}
              whileHover={{ y: -8 }}
              className="premium-panel experiences-suite relative min-h-[560px] overflow-hidden rounded-[40px] p-10 border-white/10"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_14%,rgba(214,170,95,0.22),transparent_42%),radial-gradient(circle_at_88%_86%,rgba(82,128,96,0.15),transparent_48%)]" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div>
                  <p className="inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] backdrop-blur-md">
                    Signature Hospitality Layer
                  </p>
                  <h3 className="mt-6 max-w-[15ch] font-serif text-4xl md:text-5xl text-white leading-tight">
                    Your stay should feel <span className="italic">composed</span> beyond the hunt.
                  </h3>
                  <p className="mt-4 max-w-xl text-stone-200/90 leading-relaxed font-light">
                    Companion activities, lodge pacing, dining, and transfer timing are arranged
                    around the field program so the wider experience stays calm and premium.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-3">
                    {[
                      { val: "4x4", label: "estate touring" },
                      { val: "Chef", label: "private dining" },
                      { val: "Suite", label: "lodge support" }
                    ].map(m => (
                      <div key={m.label} className="premium-panel rounded-2xl bg-black/45 p-4 backdrop-blur-xl border-white/5">
                        <p className="text-xl font-semibold text-[#f0d8ac]">{m.val}</p>
                        <p className="text-[9px] uppercase tracking-[0.14em] text-stone-400 mt-1">{m.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="premium-panel rounded-2xl bg-black/35 p-5 backdrop-blur-xl border-white/5">
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#e7cb95] mb-2">Daily Flow Integration</p>
                    <p className="text-sm text-stone-200 font-light leading-relaxed">Morning field split, afternoon reset, evening dining and private lodge rhythm.</p>
                  </div>
                </div>
              </div>
            </motion.article>

            <div className="grid gap-6 md:grid-cols-2">
              {experiences.map((item, idx) => (
                <motion.article
                  key={item.title}
                  {...reveal}
                  transition={{ ...reveal.transition, delay: idx * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="premium-panel experiences-card group relative min-h-[260px] overflow-hidden rounded-[32px] p-8 border-white/5 bg-black/40 backdrop-blur-xl"
                >
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(214,170,95,0.18),transparent_50%)]" />
                  <div className="relative z-10 flex h-full flex-col justify-between">
                    <div>
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <p className="text-[10px] uppercase tracking-[0.3em] text-[#d9b167]">{item.icon}</p>
                        <span className="rounded-full border border-[#d9b167]/30 bg-[#d9b167]/10 px-3 py-0.5 text-[8px] uppercase tracking-[0.2em] text-[#e7cb95]">
                          {item.level}
                        </span>
                      </div>
                      <h3 className="font-serif text-2xl text-white">{item.title}</h3>
                      <p className="mt-2 text-sm text-stone-300 font-light leading-relaxed line-clamp-2">{item.text}</p>
                    </div>

                    <div className="mt-4 space-y-1.5 border-t border-white/5 pt-4 text-[9px] uppercase tracking-[0.15em] text-stone-400">
                      <p className="flex justify-between"><span>Duration</span> <span className="text-stone-200">{item.duration}</span></p>
                      <p className="flex justify-between"><span>Scheduling</span> <span className="text-stone-200">{item.cadence}</span></p>
                    </div>
                    <ArrowUpRight className="absolute right-6 bottom-6 text-[#d9b167] opacity-0 transition-all duration-300 group-hover:opacity-60 group-hover:translate-x-1 group-hover:-translate-y-1" size={18} />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-4 grid gap-3 md:grid-cols-4">
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Guest wellbeing</p>
              <p className="mt-1 text-sm text-stone-200">Recovery-oriented pacing keeps the overall stay feeling generous rather than compressed.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Travel continuity</p>
              <p className="mt-1 text-sm text-stone-200">Private transfers and lodge timing reduce friction across the entire itinerary.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Companion integration</p>
              <p className="mt-1 text-sm text-stone-200">Parallel itineraries allow non-hunting guests to feel equally considered.</p>
            </motion.div>
            <motion.div {...reveal} whileHover={{ y: -4 }} className="premium-panel rounded-xl bg-black/35 p-3">
              <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Concierge orchestration</p>
              <p className="mt-1 text-sm text-stone-200">A single planning desk keeps the estate, lodge, and activity rhythm coherent.</p>
            </motion.div>
          </div>
        </section>
        <CinematicTransition />

        <section id="insights" className="section-shell relative">
          <div className="insights-glow" />
          <motion.div {...reveal} className="relative z-10 mb-12 flex flex-wrap items-end justify-between gap-8">
            <div className="max-w-2xl">
              <p className="text-[10px] uppercase tracking-[0.4em] text-[#d9b167] mb-4">Analytic Data</p>
              <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] [font-feature-settings:'ss01','ss02'] tracking-tight">Private archive <br /><span className="metal-text italic">& route context</span></h2>
            </div>
            <div className="flex flex-wrap gap-3 text-[9px] uppercase tracking-[0.25em]">
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Route context</span>
              <span className="premium-panel rounded-full bg-black/40 px-4 py-2 text-[#dfc28f] backdrop-blur-md border-white/5">Trophy archive</span>
            </div>
          </motion.div>
          <div className="relative z-10 grid gap-8 lg:grid-cols-2">
            <div className="premium-panel rounded-[40px] bg-black/40 p-1 overflow-hidden border-white/10 backdrop-blur-xl">
              <TrophyCarousel />
            </div>
            <div className="premium-panel rounded-[40px] bg-black/40 p-1 overflow-hidden border-white/10 backdrop-blur-xl">
              <InteractiveMap />
            </div>
          </div>
        </section>
        <CinematicTransition />
        <StoryChapters />
        <CinematicTransition />

        <section id="guides" className="section-shell pb-32">
          <div className="mb-20 grid gap-12 lg:grid-cols-2 lg:items-end">
            <div className="max-w-3xl">
              <motion.p {...reveal} className="text-xs uppercase tracking-[0.3em] text-[#d9b167]">Elite Field Command</motion.p>
              <motion.h2 {...reveal} className="mt-4 font-serif text-5xl md:text-6xl">{staggerText("TACTICAL DOSSIERS")}</motion.h2>
              <motion.p {...reveal} className="mt-8 text-lg font-light leading-relaxed text-stone-300">
                Our directors are not simply guides; they are tactical specialists with decades
                of high-country operational experience. Access their field profiles below.
              </motion.p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { v: "15+", l: "Avg Field Years" },
                { v: "1:1", l: "Elite Ratio" },
                { v: "SEC-5", l: "Clearance" }
              ].map(m => (
                <div key={m.l} className="premium-panel rounded-2xl bg-black/45 p-5 backdrop-blur-xl border-white/5">
                  <p className="text-2xl font-semibold text-[#f0d8ac]">{m.v}</p>
                  <p className="text-[9px] uppercase tracking-[0.14em] text-stone-400 mt-1">{m.l}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {guideStories.map((guide, idx) => (
              <motion.article
                key={guide.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                whileHover={{ y: -8 }}
                className="dossier-card group backdrop-blur-2xl"
              >
                <div className="relative h-64 overflow-hidden">
                  <Image src={guide.image} alt={guide.name} fill className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110" sizes="(max-width: 768px) 100vw, 33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080e0c] via-transparent to-transparent" />
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    <span className="dossier-tag">CLEARANCE: LVL 5</span>
                    <span className="dossier-tag">REF: ALPHA-{idx + 1}</span>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full dossier-biometric opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <div className="p-8">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-white">{guide.name}</h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#d9b167]/70">{guide.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] uppercase tracking-widest text-stone-500">Service</p>
                      <p className="font-mono text-xl text-[#f0d8ac]">{guide.years}Y</p>
                    </div>
                  </div>

                  <p className="mb-8 text-sm leading-relaxed text-stone-400 font-light italic">&quot;{guide.story}&quot;</p>

                  <div className="space-y-4 border-t border-white/5 pt-6">
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                      <span className="text-stone-500">Specialization</span>
                      <span className="text-[#d9b167]">{guide.specialization}</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                      <span className="text-stone-500">Success Factor</span>
                      <span className="text-[#f0d8ac]">{guide.successRate}% Combined</span>
                    </div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-widest">
                      <span className="text-stone-500">Comm Protocol</span>
                      <span className="text-stone-300">{guide.languages}</span>
                    </div>
                  </div>

                  <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-[#d9b167]/20 bg-[#d9b167]/5 py-3 text-[10px] uppercase tracking-[0.2em] text-[#f0d8ac] transition-all hover:bg-[#d9b167]/15">
                    Request Secure Link <ArrowRight size={12} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </section>
        <CinematicTransition />

        <section id="contact" className="section-shell relative">
          <div className="contact-glow" />

          <motion.div {...reveal} className="relative z-10 mb-12">
            <p className="text-[10px] uppercase tracking-[0.4em] text-[#d9b167] mb-4">Concierge Intake</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-[1.1] [font-feature-settings:'ss01','ss02'] tracking-tight">Begin a <span className="metal-text italic">private planning</span> conversation</h2>
          </motion.div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.article {...reveal} className="premium-panel rounded-[40px] bg-black/45 p-10 border-white/10 backdrop-blur-2xl">
              <p className="inline-flex rounded-full border border-white/20 bg-black/40 px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] text-[#e7cb95] backdrop-blur-md">
                Private Concierge Review
              </p>
              <h3 className="mt-8 max-w-[18ch] font-serif text-4xl text-white leading-snug">
                From first note to arrival, the program is shaped around <span className="italic text-[#e3c387]">clarity and ease.</span>
              </h3>
              <p className="mt-6 text-stone-300 font-light leading-relaxed">
                Share the outline of your trip and the planning desk will return a composed brief
                covering season timing, guide pairing, lodge rhythm, and transfers.
              </p>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="premium-panel rounded-2xl bg-black/45 p-6 border-white/5 backdrop-blur-xl transition-all hover:border-white/10">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#e7cb95]">Response Window</p>
                  <p className="mt-2 text-xl font-semibold text-[#f0d8ac]">Under 24h</p>
                </div>
                <div className="premium-panel rounded-2xl bg-black/45 p-6 border-white/5 backdrop-blur-xl transition-all hover:border-white/10">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-[#e7cb95]">Program Type</p>
                  <p className="mt-2 text-xl font-semibold text-[#f0d8ac]">Custom Expedition</p>
                </div>
              </div>

              <div className="mt-10 space-y-6">
                <p className="text-[9px] uppercase tracking-[0.3em] text-[#e7cb95]/80 border-b border-white/5 pb-2">Availability Snapshot</p>
                <div className="grid gap-3">
                  {availabilitySlots.slice(0, 3).map((slot) => (
                    <div key={slot.month} className="flex items-center justify-between text-sm tracking-wide">
                      <span className="text-stone-300">{slot.month}</span>
                      <div className="flex items-center gap-4">
                        <span className="h-px w-12 bg-white/5" />
                        <span className="text-[10px] uppercase tracking-widest text-[#dfc28f]">{slot.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>

            <div className="grid gap-6">
              <BookingConfigurator onConfigChange={setBookingConfig} />
              <motion.form {...reveal} onSubmit={onSubmit} className="premium-panel rounded-[30px] bg-black/35 p-7">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-[#e7cb95]">Step {formStep} of 2</p>
                    <h3 className="mt-2 font-serif text-2xl text-white">Request private review</h3>
                  </div>
                  <span className="inline-flex rounded-full border border-white/15 bg-black/25 px-3 py-1 text-[10px] uppercase tracking-[0.13em] text-[#e7cb95]">
                    Config linked
                  </span>
                </div>
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
                        <input required name="fullName" className="field-control mt-2" placeholder="Your full name" />
                      </label>
                      <label className="text-sm">Email
                        <input required type="email" name="email" className="field-control mt-2" placeholder="name@email.com" />
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
                        <input name="preferredMonth" className="field-control mt-2" placeholder="e.g. March or flexible" />
                      </label>
                      <label className="text-sm">Group size
                        <input name="groupSize" className="field-control mt-2" placeholder="e.g. 2 guests" defaultValue={`${bookingConfig.guests} guests`} />
                      </label>
                    </div>
                    <label className="mt-4 block text-sm">Configured brief
                      <input value={`${bookingConfig.comfort} / ${bookingConfig.transfer} / ${bookingConfig.stay}`} readOnly className="field-control mt-2 opacity-80" />
                    </label>
                    <label className="mt-4 block text-sm">Program notes
                      <textarea required name="message" rows={5} className="field-control mt-2" placeholder="Preferred timing, trip style, desired comfort level, and any lodge or travel preferences." />
                    </label>
                    <p className="mt-3 text-xs text-stone-300">
                      This is a planning request, not an instant booking. Final timing, hosting, and pricing are confirmed after concierge review.
                    </p>
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

