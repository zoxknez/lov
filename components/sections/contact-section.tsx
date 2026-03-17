"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail, PhoneCall, Wind } from "lucide-react";
import { FormEvent, useState } from "react";
import AuroraCanvas from "@/components/aurora-canvas";
import TurnstileWidget from "@/components/turnstile-widget";
import { speciesCatalog } from "@/lib/site-content";

const contactEmail = "hunting@kaimanawasafaris.com";
const contactPhone = "+64 21 088 50131";

const enquirySteps = [
  "Share the species, season, and group size.",
  "We shape the right territory and travel rhythm.",
  "You receive a tailored hunt outline with next steps."
] as const;

export default function ContactSection() {
  const reduceMotion = useReducedMotion();
  const [status, setStatus] = useState<string | null>(null);
  const [statusTone, setStatusTone] = useState<"ok" | "error" | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      fullName: String(formData.get("fullName") ?? ""),
      email: String(formData.get("email") ?? ""),
      targetSpecies: String(formData.get("targetSpecies") ?? ""),
      message: String(formData.get("message") ?? ""),
      preferredMonth: String(formData.get("preferredMonth") ?? ""),
      groupSize: String(formData.get("groupSize") ?? ""),
      accommodation: "Lodge base + remote camp if required",
      transferMode: "4WD with helicopter support where lawful and required",
      programLength: "Custom by species",
      budgetBand: "Pricing on request",
      antiBotField: String(formData.get("antiBotField") ?? ""),
      turnstileToken
    };
    setSubmitting(true);
    setStatus(null);
    setStatusTone(null);
    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = (await response.json()) as { ok?: boolean; forwarded?: boolean; error?: string };
      if (!response.ok || !result.ok) throw new Error(result.error ?? "Failed");
      setStatus(result.forwarded === false
        ? "Request received. Forwarding needs a manual check, but your note has been stored."
        : "Request received. Kaimanawa Trophy Safaris will follow up with planning details."
      );
      setStatusTone("ok");
      setTurnstileToken("");
      event.currentTarget.reset();
    } catch {
      setStatus("Submission failed. Please retry or contact us directly by email.");
      setStatusTone("error");
    } finally {
      setSubmitting(false);
    }
  }

  const revealUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 }
  };
  const tr = { duration: reduceMotion ? 0 : 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

  return (
    <section id="contact" className="relative py-28 border-t border-white/[0.06] overflow-hidden">
      {/* Aurora background */}
      <AuroraCanvas className="opacity-60" intensity="high" />

      <div className="section-shell relative z-10">
        <div className="grid xl:grid-cols-[0.85fr_1.15fr] gap-12 xl:items-start">
          {/* Left: Info */}
          <motion.div {...revealUp} transition={tr}>
            <p className="label-xs text-[#c9922a] mb-5">Enquiry</p>
            <h2 className="font-display text-[clamp(2.8rem,5vw,5.5rem)] leading-[0.9] text-white">
              Begin your<br />
              <em className="not-italic text-white/45">New Zealand story.</em>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-white/55 font-light max-w-md">
              Every hunt starts with a conversation. Tell us what you're chasing — we'll shape the rest.
            </p>

            {/* Contact links */}
            <div className="mt-10 grid gap-3">
              <a
                href={`mailto:${contactEmail}`}
                className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 hover:border-[#c9922a]/35 hover:bg-white/[0.06] transition-all duration-300"
              >
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20">
                  <Mail size={17} className="text-[#c9922a]" />
                </span>
                <span>
                  <span className="block label-xs text-white/35 mb-2">Direct email</span>
                  <span className="block text-base text-white">{contactEmail}</span>
                </span>
              </a>
              <a
                href={`tel:${contactPhone.replace(/\s+/g, "")}`}
                className="flex items-start gap-4 rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-5 hover:border-[#c9922a]/35 hover:bg-white/[0.06] transition-all duration-300"
              >
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20">
                  <PhoneCall size={17} className="text-[#c9922a]" />
                </span>
                <span>
                  <span className="block label-xs text-white/35 mb-2">WhatsApp / Call</span>
                  <span className="block text-base text-white">{contactPhone}</span>
                </span>
              </a>
            </div>

            {/* Steps */}
            <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-black/25 p-6 backdrop-blur-sm">
              <p className="label-xs text-[#c9922a] mb-6">How it works</p>
              <div className="space-y-5">
                {enquirySteps.map((step, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <span className="font-display text-2xl text-[#c9922a] leading-none shrink-0 w-8">0{i + 1}</span>
                    <p className="text-sm leading-6 text-white/58 pt-0.5">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            {...revealUp}
            transition={{ ...tr, delay: reduceMotion ? 0 : 0.1 }}
            className="rounded-[2.5rem] border border-white/10 bg-[#060d08]/90 p-8 lg:p-10 shadow-panel backdrop-blur-xl"
          >
            <form onSubmit={onSubmit} className="space-y-6">
              <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="float-label-wrap">
                  <input required name="fullName" placeholder=" " id="fullName" />
                  <label htmlFor="fullName">Full name</label>
                </div>
                <div className="float-label-wrap">
                  <input required type="email" name="email" placeholder=" " id="email" />
                  <label htmlFor="email">Email address</label>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div className="float-label-wrap">
                  <select required name="targetSpecies" id="targetSpecies" defaultValue="Red Deer">
                    {speciesCatalog.map((s) => (
                      <option key={s.name} value={s.name} style={{ background: "#060d08" }}>{s.name}</option>
                    ))}
                  </select>
                  <label htmlFor="targetSpecies">Target species</label>
                </div>
                <div className="float-label-wrap">
                  <select required name="groupSize" id="groupSize" defaultValue="2 hunters">
                    {["1 hunter", "2 hunters", "3 hunters", "4 hunters", "Hunter + observer"].map((o) => (
                      <option key={o} value={o} style={{ background: "#060d08" }}>{o}</option>
                    ))}
                  </select>
                  <label htmlFor="groupSize">Group size</label>
                </div>
              </div>

              <div className="float-label-wrap">
                <input name="preferredMonth" placeholder=" " id="preferredMonth" />
                <label htmlFor="preferredMonth">Preferred window (e.g. Autumn 2026)</label>
              </div>

              <div className="float-label-wrap">
                <textarea
                  required
                  name="message"
                  rows={5}
                  placeholder=" "
                  id="message"
                  style={{ resize: "none" }}
                />
                <label htmlFor="message">Tell us about the trip</label>
              </div>

              {/* What happens next */}
              <div className="flex items-start gap-4 rounded-[1.4rem] border border-white/8 bg-white/[0.03] p-5">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-black/20">
                  <Wind size={15} className="text-[#c9922a]" />
                </span>
                <div>
                  <p className="label-xs text-white/35 mb-1.5">What happens next</p>
                  <p className="text-sm leading-6 text-white/55">We use this note to match you with the right species, territory, and seasonal window before refining logistics.</p>
                </div>
              </div>

              <div>
                <TurnstileWidget onTokenChange={setTurnstileToken} />
              </div>

              <button
                type="submit"
                disabled={submitting || (turnstileEnabled && !turnstileToken)}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#c9922a] px-6 py-5 label-xs font-semibold tracking-[0.32em] text-[#020403] transition-all duration-300 hover:bg-[#e4b668] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 rounded-full border-2 border-[#020403]/30 border-t-[#020403] animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Submit Enquiry
                    <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </button>

              {turnstileEnabled && !turnstileToken && (
                <p className="text-center label-xs text-white/32">Complete verification to enable submission.</p>
              )}

              <AnimatePresence>
                {status && (
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={`text-center label-xs ${statusTone === "ok" ? "text-[#c9922a]" : "text-red-400"}`}
                  >
                    {status}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
