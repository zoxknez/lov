"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  CheckCircle2,
  Compass,
  MountainSnow,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import BookingConfigurator, { type BookingConfig } from "@/components/booking-configurator";
import CinematicTransition from "@/components/cinematic-transition";
import InteractiveMap from "@/components/interactive-map";
import SignatureReveal from "@/components/signature-reveal";
import StoryChapters from "@/components/story-chapters";
import TrophyCarousel from "@/components/trophy-carousel";
import TrustStrip from "@/components/trust-strip";
import TurnstileWidget from "@/components/turnstile-widget";
import {
  availabilitySlots,
  experiences,
  gameSpecies,
  guideStories,
  metrics,
  navItems,
  rotatingNotes
} from "@/lib/data";

type SubmitState = "idle" | "sending" | "success" | "error";

const contactHighlights = [
  "Private itinerary review within one business day",
  "Guide pairing based on trophy goal and travel pace",
  "Arrival, lodge, field rhythm, and departure planned as one program"
];

export default function ModernSite() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [activeNote, setActiveNote] = useState(0);
  const [config, setConfig] = useState<BookingConfig | null>(null);
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [submitMessage, setSubmitMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroLift = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const heroFade = useTransform(scrollYProgress, [0, 1], [1, 0.42]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveNote((prev) => (prev + 1) % rotatingNotes.length);
    }, 4800);

    return () => window.clearInterval(id);
  }, []);

  async function handleInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      targetSpecies: String(formData.get("targetSpecies") ?? config?.species ?? "Red Stag"),
      message: String(formData.get("message") ?? ""),
      preferredMonth: String(formData.get("preferredMonth") ?? ""),
      groupSize: String(formData.get("groupSize") ?? String(config?.guests ?? "")),
      accommodation: String(formData.get("accommodation") ?? config?.comfort ?? ""),
      transferMode: String(formData.get("transferMode") ?? config?.transfer ?? ""),
      programLength: String(formData.get("programLength") ?? config?.stay ?? ""),
      budgetBand: String(formData.get("budgetBand") ?? config?.budgetBand ?? ""),
      antiBotField: "",
      turnstileToken
    };

    setSubmitState("sending");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const data = (await response.json()) as { ok?: boolean; error?: string; forwarded?: boolean };

      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Inquiry could not be submitted.");
      }

      setSubmitState("success");
      setSubmitMessage(
        data.forwarded === false
          ? "Inquiry secured locally. Concierge forwarding will be retried from the operations side."
          : "Inquiry secured. The concierge desk will reply shortly."
      );
      setTurnstileToken("");
      form.reset();
    } catch (error) {
      setSubmitState("error");
      setSubmitMessage(error instanceof Error ? error.message : "Inquiry could not be submitted.");
    }
  }

  return (
    <main className="relative overflow-hidden">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050806]/80 backdrop-blur-xl">
        <div className="section-shell flex min-h-[92px] items-center justify-between gap-4 py-4">
          <a href="#top" className="flex items-center gap-4">
            <span className="gradient-ring grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-[#111814] p-1">
              <Image src="/brand-logo.png" alt="Kaimanawa" width={72} height={72} className="h-full w-full rounded-full object-cover" />
            </span>
            <div>
              <p className="font-serif text-lg tracking-[0.24em] text-white">KAIMANAWA</p>
              <p className="text-[10px] uppercase tracking-[0.26em] text-[#d8bd8a]">Private New Zealand Hunts</p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-stone-300 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="transition hover:text-[#e8cb98]">
                {item.label}
              </a>
            ))}
          </nav>

          <a href="#contact" className="action-btn-primary px-5 py-3 text-[11px]">
            Request Private Plan
          </a>
        </div>
      </header>

      <section id="top" ref={heroRef} className="section-shell relative pt-10">
        <motion.div style={{ y: heroLift, opacity: heroFade }} className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-[linear-gradient(145deg,rgba(15,23,19,0.88),rgba(7,11,9,0.72))] p-8 md:p-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(221,184,118,0.16),transparent_34%),radial-gradient(circle_at_85%_20%,rgba(91,127,98,0.18),transparent_32%)]" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#d9b167]/35 bg-[#d9b167]/10 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-[#ecd2a3]">
                <Sparkles className="h-3.5 w-3.5" />
                Quiet luxury. Full coordination.
              </div>

              <h1 className="mt-6 max-w-[12ch] font-serif text-5xl leading-[0.95] text-white md:text-7xl">
                Private hunting programs with a calm premium presence.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-stone-200 md:text-lg">
                Designed for guests who want confident logistics, composed field execution, and discreet service from
                arrival to departure. The experience now reads like a premium travel product, not a tactical interface.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#estate" className="action-btn-primary inline-flex items-center gap-2 px-6 py-3 text-[11px]">
                  Explore Estate
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a href="#contact" className="action-btn-secondary px-6 py-3 text-[11px]">
                  Speak With Concierge
                </a>
              </div>

              <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {metrics.map((item) => (
                  <div key={item.label} className="premium-panel rounded-2xl bg-black/20 p-4">
                    <p className="text-2xl font-semibold text-[#f0d8ac]">{item.value}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.14em] text-stone-300">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="relative min-h-[460px] overflow-hidden rounded-[34px] border border-white/10">
              <Image src="/placeholders/hero-editorial.svg" alt="Kaimanawa editorial landscape" fill priority className="object-cover" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,6,0.88),rgba(5,8,6,0.22)_45%,rgba(5,8,6,0.08))]" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="premium-panel rounded-[28px] bg-black/35 p-5">
                  <p className="text-[10px] uppercase tracking-[0.18em] text-[#e7cb95]">Concierge Brief</p>
                  <p className="mt-2 text-lg leading-7 text-stone-100">{rotatingNotes[activeNote]}</p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="premium-panel rounded-[26px] p-5">
                <ShieldCheck className="h-5 w-5 text-[#e7cb95]" />
                <h2 className="mt-3 font-serif text-2xl text-white">Operational Trust</h2>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  Field standards, guest safety, and ethical planning presented clearly instead of theatrically.
                </p>
              </div>
              <div className="premium-panel rounded-[26px] p-5">
                <Compass className="h-5 w-5 text-[#e7cb95]" />
                <h2 className="mt-3 font-serif text-2xl text-white">Route Clarity</h2>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  Estate timing, terrain, and lodge rhythm are arranged as one composed itinerary.
                </p>
              </div>
              <div className="premium-panel rounded-[26px] p-5">
                <MountainSnow className="h-5 w-5 text-[#e7cb95]" />
                <h2 className="mt-3 font-serif text-2xl text-white">Place First</h2>
                <p className="mt-2 text-sm leading-6 text-stone-300">
                  The landscape leads the design language so the interface feels premium, not game-like.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <TrustStrip />
      <CinematicTransition />

      <section id="estate">
        <SignatureReveal daylight={0.82} isNight={false} />
      </section>

      <section id="game" className="section-shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Programs</p>
            <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">Curated around timing, maturity, and guest preference.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-300">
            Species presentation is restrained and service-led. The objective is to help the client understand the
            shape of the program, not to make the interface feel like a simulator.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {gameSpecies.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(17,28,22,0.86),rgba(8,12,10,0.72))]">
              <div className="relative h-[280px] overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(5,8,6,0.86),rgba(5,8,6,0.18)_52%,rgba(5,8,6,0.04))]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">{item.primeSeason}</p>
                  <h3 className="mt-1 font-serif text-3xl text-white">{item.title}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-stone-200">{item.detail}</p>
                <div className="mt-4 grid gap-2 text-xs uppercase tracking-[0.13em] text-stone-300">
                  <div className="premium-panel flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span>Trophy band</span>
                    <span className="text-[#f0d8ac]">{item.trophyBand}</span>
                  </div>
                  <div className="premium-panel flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span>Terrain</span>
                    <span className="text-right text-[#f0d8ac]">{item.terrain}</span>
                  </div>
                  <div className="premium-panel flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span>Typical range</span>
                    <span className="text-[#f0d8ac]">{item.shotRange}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experiences" className="section-shell">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Guest Experience</p>
          <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">Luxury hospitality should read as intentional, not overloaded.</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {experiences.map((item) => (
            <article key={item.title} className="premium-panel rounded-[28px] bg-[linear-gradient(160deg,rgba(17,28,22,0.82),rgba(8,12,10,0.7))] p-5">
              <p className="text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">{item.level}</p>
              <h3 className="mt-3 font-serif text-2xl text-white">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-300">{item.text}</p>
              <div className="mt-4 space-y-2 text-xs uppercase tracking-[0.13em] text-stone-400">
                <p>Duration: <span className="text-stone-200">{item.duration}</span></p>
                <p>Group: <span className="text-stone-200">{item.group}</span></p>
                <p>Cadence: <span className="text-stone-200">{item.cadence}</span></p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="insights" className="section-shell grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
        <TrophyCarousel />
        <InteractiveMap />
      </section>

      <StoryChapters />

      <section id="guides" className="section-shell">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Guides</p>
            <h2 className="mt-3 font-serif text-4xl text-white md:text-5xl">The people behind the pace, judgment, and guest care.</h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-stone-300">
            This section should build trust through calm authority. The guide roster is framed like a private service
            team, not as operator avatars inside a tactical interface.
          </p>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {guideStories.map((guide) => (
            <article key={guide.name} className="overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(160deg,rgba(17,28,22,0.82),rgba(8,12,10,0.72))]">
              <div className="relative h-[300px]">
                <Image src={guide.image} alt={guide.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(4,7,5,0.88),rgba(4,7,5,0.16)_55%,rgba(4,7,5,0.04))]" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-[#e7cb95]">{guide.role}</p>
                  <h3 className="mt-1 font-serif text-3xl text-white">{guide.name}</h3>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm leading-6 text-stone-200">{guide.story}</p>
                <div className="mt-4 grid gap-2 text-xs uppercase tracking-[0.13em] text-stone-300">
                  <div className="premium-panel flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span>Specialty</span>
                    <span className="text-[#f0d8ac]">{guide.specialization}</span>
                  </div>
                  <div className="premium-panel flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span>Experience</span>
                    <span className="text-[#f0d8ac]">{guide.years} years</span>
                  </div>
                  <div className="premium-panel flex items-center justify-between rounded-xl bg-black/20 px-3 py-2">
                    <span>Languages</span>
                    <span className="text-[#f0d8ac]">{guide.languages}</span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section-shell">
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <div className="premium-panel rounded-[32px] bg-[linear-gradient(150deg,rgba(18,29,24,0.9),rgba(7,11,9,0.74))] p-8">
              <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Private Planning</p>
              <h2 className="mt-3 max-w-[12ch] font-serif text-4xl text-white md:text-5xl">Build a composed private program.</h2>
              <p className="mt-4 text-base leading-7 text-stone-200">
                Inquiry and configuration now sit inside one calmer section. The client sees itinerary logic, estimated
                positioning, and a clear path to contact without layered gimmicks.
              </p>
              <div className="mt-6 space-y-3 text-sm text-stone-200">
                {contactHighlights.map((item) => (
                  <div key={item} className="premium-panel flex items-center gap-3 rounded-2xl bg-black/20 px-4 py-3">
                    <CheckCircle2 className="h-4 w-4 text-[#e7cb95]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-[10px] uppercase tracking-[0.14em] text-[#e7cb95]">Availability Snapshot</p>
                <div className="mt-2 space-y-2">
                  {availabilitySlots.map((slot) => (
                    <div key={slot.month} className="premium-panel flex items-center justify-between rounded-xl bg-black/35 px-3 py-2">
                      <span className="text-sm text-stone-200">{slot.month}</span>
                      <span className="text-xs uppercase tracking-[0.12em] text-[#dfc28f]">
                        {slot.status} • {slot.spots} placements
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <BookingConfigurator onConfigChange={setConfig} />
          </div>

          <form onSubmit={handleInquiry} className="premium-panel rounded-[32px] bg-[linear-gradient(150deg,rgba(18,29,24,0.9),rgba(7,11,9,0.74))] p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-[#d9b167]">Concierge Inquiry</p>
                <h3 className="mt-2 font-serif text-3xl text-white md:text-4xl">Tell us the shape of your ideal program.</h3>
              </div>
              {config ? (
                <div className="rounded-2xl border border-[#d9b167]/25 bg-[#d9b167]/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-[#ecd2a3]">
                  {config.species} • {config.stay} • {config.budgetBand}
                </div>
              ) : null}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-stone-200">
                Full name
                <input name="fullName" required className="field-control mt-2" placeholder="Private guest name" />
              </label>
              <label className="text-sm text-stone-200">
                Email
                <input name="email" required type="email" className="field-control mt-2" placeholder="you@example.com" />
              </label>
              <label className="text-sm text-stone-200">
                Target species
                <select name="targetSpecies" defaultValue={config?.species ?? "Red Stag"} className="field-control mt-2">
                  {gameSpecies.map((item) => (
                    <option key={item.title} value={item.title}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-sm text-stone-200">
                Preferred month
                <input name="preferredMonth" className="field-control mt-2" placeholder="March, April, flexible..." />
              </label>
              <label className="text-sm text-stone-200">
                Group size
                <input name="groupSize" defaultValue={config?.guests ? String(config.guests) : ""} className="field-control mt-2" placeholder="2 guests" />
              </label>
              <label className="text-sm text-stone-200">
                Program length
                <input name="programLength" defaultValue={config?.stay ?? ""} className="field-control mt-2" placeholder="5 Nights" />
              </label>
              <label className="text-sm text-stone-200">
                Accommodation
                <input name="accommodation" defaultValue={config?.comfort ?? ""} className="field-control mt-2" placeholder="Private Chalet" />
              </label>
              <label className="text-sm text-stone-200">
                Transfer
                <input name="transferMode" defaultValue={config?.transfer ?? ""} className="field-control mt-2" placeholder="Premium 4x4" />
              </label>
            </div>

            <input type="hidden" name="budgetBand" value={config?.budgetBand ?? ""} />
            <input type="hidden" name="antiBotField" tabIndex={-1} autoComplete="off" />

            <label className="mt-4 block text-sm text-stone-200">
              Message
              <textarea
                name="message"
                required
                rows={6}
                className="field-control mt-2 resize-y"
                placeholder="Describe your preferred style of trip, desired comfort level, travel timing, and any special requirements."
              />
            </label>

            <TurnstileWidget onTokenChange={setTurnstileToken} />

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-md text-xs leading-5 text-stone-400">
                Indicative pricing and program structure are refined after review. This form is for private planning,
                not instant checkout.
              </p>
              <button type="submit" disabled={submitState === "sending"} className="action-btn-primary px-6 py-3 text-[11px] disabled:opacity-70">
                {submitState === "sending" ? "Sending..." : "Request Private Review"}
              </button>
            </div>

            {submitMessage ? (
              <p
                className={`mt-4 rounded-2xl border px-4 py-3 text-sm ${
                  submitState === "success"
                    ? "border-emerald-300/20 bg-emerald-500/10 text-emerald-100"
                    : "border-rose-300/20 bg-rose-500/10 text-rose-100"
                }`}
              >
                {submitMessage}
              </p>
            ) : null}
          </form>
        </div>
      </section>
    </main>
  );
}
