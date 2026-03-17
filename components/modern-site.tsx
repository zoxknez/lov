"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import type { FormEvent, ReactNode } from "react";
import { useState } from "react";
import ConciergeDesk from "@/components/concierge-desk";
import ExperienceShowcase from "@/components/experience-showcase";
import GalleryLightTable from "@/components/gallery-light-table";
import LocalTime from "@/components/local-time";
import PlanningCommandCenter from "@/components/planning-command-center";
import PremiumHero from "@/components/premium-hero";
import SpeciesShowcase from "@/components/species-showcase";
import StandardsShowcase from "@/components/standards-showcase";
import TerritoryShowcase from "@/components/territory-showcase";
import { navigation } from "@/lib/site-content";

const EMAIL = "hunting@kaimanawasafaris.com";
const PHONE = "+64 21 088 50131";
const STEPS = [
  "Share the species, season, and group size.",
  "We shape the right territory and travel rhythm.",
  "You receive a tailored hunt outline with next steps."
] as const;

const TICKER_ITEMS = [
  "Kaimanawa Forest Park",
  "Red Deer | Late March",
  "Sika Rut | April",
  "Himalayan Tahr | May-July",
  "Southern Alps",
  "Chamois | Alpine",
  "90+ Years Field Experience",
  "Central North Island",
  "Private Hunt Concierge",
  "Fallow Deer | April",
  "New Zealand Wilderness",
  "Lodge-Based Programs"
] as const;

function Label({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/38"}`}>
      {children}
    </p>
  );
}

function HR() {
  return <div className="slash-divide my-0" />;
}

function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="ticker-wrap border-y border-white/[0.07] bg-black/60 py-[13px] backdrop-blur-sm">
      <div className="ticker">
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="flex items-center gap-5 whitespace-nowrap px-6">
            <span className="label text-[10px] tracking-[0.28em] text-white/35">{item}</span>
            <span className="text-[8px] text-[#c8a96e]">*</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function ModernSite() {
  const reduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [backTop, setBackTop] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"ok" | "err" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnToken, setTurnToken] = useState("");
  const turnEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (value) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(value > 40);
    setBackTop(value > 500);
    setNavVisible(!(value > 150 && value > previous));
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      targetSpecies: String(formData.get("targetSpecies") ?? "Red Deer"),
      message: String(formData.get("message") ?? ""),
      preferredMonth: String(formData.get("preferredMonth") ?? ""),
      groupSize: String(formData.get("groupSize") ?? "2 hunters"),
      accommodation: "Lodge base + remote camp if required",
      transferMode: "4WD with helicopter support where lawful",
      programLength: "Custom by species",
      budgetBand: "Pricing on request",
      antiBotField: String(formData.get("antiBotField") ?? ""),
      turnstileToken: turnToken
    };

    setSubmitting(true);
    setStatus(null);

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const json = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !json.ok) {
        throw new Error(json.error ?? "Failed");
      }

      setStatus("Received. We will follow up with planning details shortly.");
      setStatusTone("ok");
      setTurnToken("");
      event.currentTarget.reset();
    } catch {
      setStatus("Submission failed - please email us directly.");
      setStatusTone("err");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="top" className="relative overflow-x-hidden bg-[#080808] text-[#f5f0e8]">
      <div className="grain" />

      <header
        className={`fixed inset-x-0 top-0 z-[80] transition-all duration-700 ${
          scrolled ? "border-b border-white/[0.07] bg-[#080808]/92 py-2 backdrop-blur-xl" : "py-0"
        } ${navVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="shell-full flex h-16 items-center justify-between lg:h-[68px]">
          <a href="#home" className="group interactive flex flex-col leading-none">
            <span className="font-[family-name:var(--font-display)] text-[13px] uppercase tracking-[0.45em] text-white transition-colors duration-300 group-hover:text-[#c8a96e]">
              Kaimanawa
            </span>
            <span className="label mt-0.5 text-[8px] tracking-[0.3em] text-white/28">
              Trophy Safaris | New Zealand
            </span>
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group interactive relative label text-[9px] tracking-[0.3em] text-white/38 transition-colors duration-300 hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[#c8a96e] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden text-right lg:block">
              <p className="label text-[9px] tracking-[0.25em] text-white/45">
                <LocalTime timezone="Pacific/Auckland" />
              </p>
              <p className="label mt-0.5 text-[8px] tracking-[0.22em] text-white/22">NZDT</p>
            </div>

            <a
              href="#contact"
              className="hidden items-center gap-2 border border-white/18 px-5 py-2.5 label text-[9px] tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-[#080808] lg:inline-flex"
            >
              ENQUIRE
            </a>

            <button
              type="button"
              aria-label="Menu"
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center border border-white/15 text-white transition-colors duration-300 hover:bg-white/8 lg:hidden"
            >
              <Menu size={17} />
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <PremiumHero />
        <Ticker />

        <ExperienceShowcase />
        <HR />

        <SpeciesShowcase />
        <HR />

        <TerritoryShowcase />
        <HR />

        <PlanningCommandCenter />
        <HR />

        <StandardsShowcase />
        <HR />

        <GalleryLightTable />
        <HR />

        <ConciergeDesk
          email={EMAIL}
          phone={PHONE}
          steps={STEPS}
          onSubmit={handleSubmit}
          onTurnTokenChange={setTurnToken}
          submitting={submitting}
          status={status}
          statusTone={statusTone}
          turnEnabled={turnEnabled}
          hasTurnToken={Boolean(turnToken)}
        />

        <AnimatePresence>
          {statusTone === "ok" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="fixed inset-0 z-[200] flex items-center justify-center bg-[#080808]/95 backdrop-blur-xl"
            >
              <div className="max-w-lg px-8 text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Label gold>Enquiry Received</Label>
                  <h2 className="mb-6 mt-4 font-[family-name:var(--font-display)] text-[3.5rem] leading-[0.9] text-white">
                    We will be <br />
                    <span className="italic text-white/40">in touch.</span>
                  </h2>
                  <p className="mb-10 text-[14px] font-light leading-relaxed text-white/40">
                    Your preferences have been noted. Our concierge will review the details and contact
                    you shortly with a tailored outline.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setStatus(null);
                      setStatusTone(null);
                    }}
                    className="inline-flex items-center gap-2 border border-white/20 px-8 py-4 label text-[9px] tracking-[0.28em] text-white transition-all duration-300 hover:bg-white hover:text-black"
                  >
                    RETURN
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="border-t border-white/[0.07]">
          <div className="shell-full flex flex-col gap-8 py-10 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.3em] text-white">
                Kaimanawa
              </p>
              <p className="label mt-1 text-[8px] tracking-[0.28em] text-white/22">
                Trophy Safaris | New Zealand
              </p>
            </div>

            <nav className="flex flex-wrap gap-6">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="label text-[9px] tracking-[0.26em] text-white/22 transition-colors duration-300 hover:text-[#c8a96e]"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="space-y-1 lg:text-right">
              <a
                href={`mailto:${EMAIL}`}
                className="block text-[13px] text-white/40 transition-colors duration-300 hover:text-white"
              >
                {EMAIL}
              </a>
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="block text-[13px] text-white/25 transition-colors duration-300 hover:text-white"
              >
                {PHONE}
              </a>
              <p className="label pt-2 text-[8px] tracking-[0.22em] text-white/15">39S | 175E | 2026</p>
            </div>
          </div>
        </footer>
      </main>

      <AnimatePresence>
        {backTop && (
          <motion.a
            href="#top"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.3 }}
            className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center border border-white/15 bg-[#080808]/90 text-white transition-all duration-300 backdrop-blur-sm hover:border-[#c8a96e] hover:bg-[#c8a96e] hover:text-[#080808]"
            aria-label="Back to top"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 12V2M2 7l5-5 5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 250 }}
            className="fixed inset-0 z-[100] flex flex-col bg-[#080808] p-7"
          >
            <div className="flex items-center justify-between">
              <span className="font-[family-name:var(--font-display)] text-xl uppercase tracking-[0.3em]">
                Menu
              </span>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-white/15 text-white"
              >
                <X size={17} />
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-2">
              {navigation.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-2 font-[family-name:var(--font-display)] text-5xl text-white/70 transition-colors duration-300 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="mt-auto space-y-2 border-t border-white/[0.07] pt-10">
              <a href={`mailto:${EMAIL}`} className="block text-sm text-white/50">
                {EMAIL}
              </a>
              <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="block text-sm text-white/30">
                {PHONE}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
