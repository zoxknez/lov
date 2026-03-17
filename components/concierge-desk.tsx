"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FormEvent, ReactNode } from "react";
import {
  ArrowRight,
  Clock3,
  FileText,
  Mail,
  PhoneCall,
  ShieldCheck,
  Stamp
} from "lucide-react";
import TurnstileWidget from "@/components/turnstile-widget";
import { speciesCatalog } from "@/lib/site-content";

type ConciergeDeskProps = {
  email: string;
  phone: string;
  steps: readonly string[];
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | Promise<void>;
  onTurnTokenChange: (token: string) => void;
  submitting: boolean;
  status: string | null;
  statusTone: "ok" | "err" | null;
  turnEnabled: boolean;
  hasTurnToken: boolean;
};

function Label({ children, gold = false }: { children: ReactNode; gold?: boolean }) {
  return (
    <p className={`label text-[10px] tracking-[0.3em] uppercase ${gold ? "text-[#c8a96e]" : "text-white/38"}`}>
      {children}
    </p>
  );
}

function FieldShell({
  label,
  children,
  className = ""
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label
      className={`block rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))] px-5 py-4 transition-colors duration-300 focus-within:border-[#c8a96e]/45 focus-within:bg-white/[0.05] ${className}`}
    >
      <span className="label text-[8px] tracking-[0.24em] text-white/36">{label}</span>
      {children}
    </label>
  );
}

export default function ConciergeDesk({
  email,
  phone,
  steps,
  onSubmit,
  onTurnTokenChange,
  submitting,
  status,
  statusTone,
  turnEnabled,
  hasTurnToken
}: ConciergeDeskProps) {
  const reduceMotion = useReducedMotion();
  const reveal = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.12 },
    transition: {
      duration: reduceMotion ? 0 : 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
    }
  };

  const responseSignals = [
    {
      label: "Tailored scope",
      text: "Species fit, season reality, and travel rhythm are shaped before any vague sales copy."
    },
    {
      label: "Clear reply",
      text: "The answer should feel like a first planning packet, not a generic thank-you message."
    },
    {
      label: "Private pace",
      text: "The desk is built around small-group hosting and realistic next steps."
    }
  ] as const;

  const replyPacket = [
    "Species and season fit",
    "Territory and access logic",
    "Travel and group-shape next step"
  ] as const;

  const intakePoints = [
    "Species priority",
    "Preferred month or window",
    "Group size and field pace"
  ] as const;

  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,9,0.99)_0%,rgba(8,10,12,0.98)_44%,rgba(5,6,7,0.99)_100%)]" />
      <div className="concierge-station absolute inset-0 opacity-85" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(200,169,110,0.18),transparent_24%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_84%_20%,rgba(126,146,142,0.14),transparent_24%)]" />

      <div className="shell-full relative z-10">
        <motion.div
          {...reveal}
          className="mb-12 grid gap-8 border-b border-white/[0.08] pb-12 xl:grid-cols-[minmax(0,1fr)_22rem] xl:items-end"
        >
          <div className="max-w-[58rem]">
            <Label gold>Enquiry / Concierge Desk</Label>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,7rem)] leading-[0.88] tracking-[-0.05em] text-white">
              A private intake,
              <span className="block italic font-light text-[#d5cbc0]">with a clear next move.</span>
            </h2>
          </div>

          <div className="rounded-[1.9rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.88),rgba(8,9,11,0.72))] p-6 backdrop-blur-sm">
            <Label gold>Desk note</Label>
            <p className="mt-4 text-[14px] leading-[1.9] text-white/62">
              The section now behaves like a private planning intake: darker, cleaner, and more
              assured, with the form reading like the start of a real hunt brief.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[18rem_minmax(0,1fr)_19rem] xl:items-start">
          <motion.aside {...reveal} className="space-y-5">
            <article className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.92),rgba(8,9,11,0.76))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <p className="label text-[8px] tracking-[0.24em] text-white/30">Direct channel</p>
              <a href={`mailto:${email}`} className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[1.75rem] leading-[0.95] text-white">{email}</p>
                  <p className="mt-3 text-[12px] leading-[1.8] text-white/54">
                    Best for detailed trip notes, preferred species, and travel timing.
                  </p>
                </div>
                <Mail size={18} className="mt-1 shrink-0 text-[#c8a96e]" />
              </a>
            </article>

            <article className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.92),rgba(8,9,11,0.76))] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.22)]">
              <p className="label text-[8px] tracking-[0.24em] text-white/30">WhatsApp / Call</p>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[1.75rem] leading-[0.95] text-white">{phone}</p>
                  <p className="mt-3 text-[12px] leading-[1.8] text-white/54">
                    Best once the outline is taking shape and direct coordination makes sense.
                  </p>
                </div>
                <PhoneCall size={18} className="mt-1 shrink-0 text-[#c8a96e]" />
              </a>
            </article>

            <article className="rounded-[1.8rem] border border-[#c8a96e]/18 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.03))] p-5">
              <Label gold>Desk standard</Label>
              <div className="mt-4 flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <ShieldCheck size={16} className="text-[#c8a96e]" />
                </span>
                <p className="text-[13px] leading-[1.9] text-white/64">
                  Realistic timing, species fit, and travel logic come back in the reply, not canned brochure language.
                </p>
              </div>
            </article>
          </motion.aside>

          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.06 }}
            className="relative"
          >
            <div className="absolute inset-4 rounded-[2.4rem] border border-white/[0.08] bg-black/10" />
            <div className="relative overflow-hidden rounded-[2.55rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(9,11,13,0.96),rgba(8,9,11,0.9))] p-5 text-white shadow-[0_45px_120px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10">
              <div className="absolute inset-x-0 top-0 h-28 bg-[radial-gradient(circle_at_top,rgba(200,169,110,0.16),transparent_72%)]" />

              <div className="relative grid gap-6 border-b border-white/10 pb-8 sm:grid-cols-[minmax(0,1fr)_11rem] sm:items-end">
                <div>
                  <p className="label text-[8px] tracking-[0.28em] text-white/32">Private hunt brief</p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.5rem,4.2vw,4.4rem)] leading-[0.92] text-white">
                    Concierge intake sheet
                  </h3>
                  <p className="mt-4 max-w-[36rem] text-[14px] leading-[1.9] text-white/62">
                    Share the species, group shape, and season you are considering. The reply should
                    feel like a real first packet, not a generic sales acknowledgement.
                  </p>
                </div>

                <div className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-4 backdrop-blur-sm">
                  <div className="flex items-center gap-2 text-[#c8a96e]">
                    <Stamp size={16} />
                    <span className="label text-[8px] tracking-[0.24em]">Reviewed by concierge</span>
                  </div>
                  <p className="mt-3 text-[12px] leading-[1.8] text-white/54">
                    Tailored scope, realistic window, and next-step clarity.
                  </p>
                </div>
              </div>

              <div className="relative mt-6 grid gap-3 md:grid-cols-3">
                {responseSignals.map((item, index) => (
                  <div
                    key={item.label}
                    className={`rounded-[1.3rem] border border-white/10 bg-white/[0.03] p-4 ${
                      index === 1 ? "md:-translate-y-1" : ""
                    }`}
                  >
                    <Label gold={index === 0}>{item.label}</Label>
                    <p className="mt-3 text-[13px] leading-6 text-white/62">{item.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={onSubmit} className="relative mt-8 space-y-6">
                <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                <div className="grid gap-6 md:grid-cols-2">
                  <FieldShell label="Full name">
                    <input
                      required
                      name="fullName"
                      placeholder="Your name"
                      className="mt-3 w-full border-b border-white/12 bg-transparent pb-3 text-[15px] text-white outline-none placeholder:text-white/24 focus:border-[#c8a96e]"
                    />
                  </FieldShell>

                  <FieldShell label="Email address">
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="mt-3 w-full border-b border-white/12 bg-transparent pb-3 text-[15px] text-white outline-none placeholder:text-white/24 focus:border-[#c8a96e]"
                    />
                  </FieldShell>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <FieldShell label="Target species">
                    <select
                      required
                      name="targetSpecies"
                      defaultValue="Red Deer"
                      className="mt-3 w-full border-b border-white/12 bg-transparent pb-3 text-[15px] text-white outline-none focus:border-[#c8a96e]"
                    >
                      {speciesCatalog.map((species) => (
                        <option key={species.name} value={species.name} style={{ background: "#0b0d0f", color: "#ffffff" }}>
                          {species.name}
                        </option>
                      ))}
                    </select>
                  </FieldShell>

                  <FieldShell label="Group size">
                    <select
                      required
                      name="groupSize"
                      defaultValue="2 hunters"
                      className="mt-3 w-full border-b border-white/12 bg-transparent pb-3 text-[15px] text-white outline-none focus:border-[#c8a96e]"
                    >
                      {["1 hunter", "2 hunters", "3 hunters", "4 hunters", "Hunter + observer"].map((option) => (
                        <option key={option} value={option} style={{ background: "#0b0d0f", color: "#ffffff" }}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </FieldShell>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
                  <FieldShell label="Preferred window">
                    <input
                      name="preferredMonth"
                      placeholder="April, May-June, or by species"
                      className="mt-3 w-full border-b border-white/12 bg-transparent pb-3 text-[15px] text-white outline-none placeholder:text-white/24 focus:border-[#c8a96e]"
                    />
                  </FieldShell>

                  <div className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-4">
                    <p className="label text-[8px] tracking-[0.24em] text-white/34">Reply packet</p>
                    <div className="mt-4 space-y-3">
                      {replyPacket.map((item) => (
                        <div key={item} className="flex items-start gap-3 text-[13px] leading-6 text-white/66">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8a96e]" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <FieldShell label="Tell us about the trip">
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Species priorities, desired month, physical pace, lodge expectations, or anything else that helps shape the right program."
                    className="mt-3 w-full border-b border-white/12 bg-transparent pb-3 text-[15px] leading-[1.85] text-white outline-none placeholder:text-white/24 focus:border-[#c8a96e]"
                    style={{ resize: "none" }}
                  />
                </FieldShell>

                <div className="rounded-[1.45rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] px-5 py-5">
                  <p className="label text-[8px] tracking-[0.24em] text-white/34">
                    {turnEnabled ? "Verification" : "Direct intake"}
                  </p>
                  {turnEnabled ? (
                    <TurnstileWidget onTokenChange={onTurnTokenChange} />
                  ) : (
                    <p className="mt-4 text-[13px] leading-[1.85] text-white/56">
                      Turnstile is not active in this environment. The desk still accepts direct enquiries normally.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting || (turnEnabled && !hasTurnToken)}
                  className="group flex w-full items-center justify-between gap-4 rounded-[1.6rem] bg-[#c8a96e] px-7 py-5 text-[#070809] transition-colors duration-300 hover:bg-[#e8c98a] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <span className="label text-[10px] tracking-[0.34em]">
                    {submitting ? "SENDING..." : "SUBMIT PRIVATE ENQUIRY"}
                  </span>
                  {!submitting && <ArrowRight size={15} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
                  {submitting && <span className="h-3.5 w-3.5 rounded-full border border-[#070809]/30 border-t-[#070809] animate-spin" />}
                </button>

                <AnimatePresence>
                  {statusTone === "err" && status && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-[1.2rem] border border-red-400/30 bg-red-500/12 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-red-200"
                    >
                      {status}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          <motion.aside
            {...reveal}
            transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.1 }}
            className="space-y-5"
          >
            <article className="rounded-[1.9rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.9),rgba(8,9,11,0.74))] p-6">
              <Label gold>Response path</Label>
              <div className="mt-5 space-y-5">
                {steps.map((step, index) => (
                  <div key={step} className="border-b border-white/[0.08] pb-5 last:border-b-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#c8a96e]/30 bg-[#c8a96e]/10 text-[10px] font-medium tracking-[0.18em] text-[#e8c98a]">
                        {index + 1}
                      </span>
                      <p className="label text-[8px] tracking-[0.24em] text-white/26">
                        STEP {String(index + 1).padStart(2, "0")}
                      </p>
                    </div>
                    <p className="mt-4 text-[13px] leading-[1.85] text-white/58">{step}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.9rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(10,12,14,0.9),rgba(8,9,11,0.74))] p-6">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <FileText size={16} className="text-[#c8a96e]" />
                </span>
                <div>
                  <Label gold>Best brief includes</Label>
                  <div className="mt-4 space-y-3">
                    {intakePoints.map((item) => (
                      <div key={item} className="flex items-start gap-3 text-[13px] leading-6 text-white/60">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/26" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            <article className="rounded-[1.9rem] border border-[#c8a96e]/18 bg-[linear-gradient(135deg,rgba(200,169,110,0.12),rgba(255,255,255,0.03))] p-6">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05]">
                  <Clock3 size={16} className="text-[#c8a96e]" />
                </span>
                <div>
                  <Label gold>What comes back</Label>
                  <p className="mt-4 text-[13px] leading-[1.9] text-white/64">
                    A tighter, more useful first reply: the right species window, the likely territory fit, and the clearest next planning move.
                  </p>
                </div>
              </div>
            </article>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
