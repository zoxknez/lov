"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FormEvent, ReactNode } from "react";
import { ArrowRight, Mail, PhoneCall, ShieldCheck, Stamp } from "lucide-react";
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
    transition: { duration: reduceMotion ? 0 : 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }
  };

  return (
    <section id="contact" className="relative overflow-hidden py-28 lg:py-36">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,7,6,0.99)_0%,rgba(14,12,10,0.98)_44%,rgba(7,7,6,0.99)_100%)]" />
      <div className="concierge-station absolute inset-0 opacity-85" />

      <div className="shell-full relative z-10">
        <motion.div
          {...reveal}
          className="mb-12 grid gap-8 border-b border-white/[0.08] pb-12 xl:grid-cols-[minmax(0,1fr)_18rem] xl:items-end"
        >
          <div>
            <Label gold>Enquiry / Concierge Desk</Label>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(3rem,6vw,7rem)] leading-[0.88] tracking-[-0.05em] text-white">
              Request a privately
              <span className="block italic font-light text-white/42">tailored hunt brief.</span>
            </h2>
          </div>

          <div className="rounded-[1.7rem] border border-white/[0.08] bg-black/22 p-6 backdrop-blur-sm">
            <Label gold>Desk note</Label>
            <p className="mt-4 text-[14px] leading-[1.9] text-white/58">
              Kontakt vise ne izgleda kao genericki web form. Ovo je sada privatni dispatch desk:
              papiri, slipovi, briefing sheet i jasan tok sledeceg koraka.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-8 xl:grid-cols-[16rem_minmax(0,1fr)_18rem] xl:items-start">
          <motion.aside {...reveal} className="space-y-5">
            <article className="rounded-[1.7rem] bg-[#f1e3cb] p-5 text-[#17120d] shadow-[0_18px_60px_rgba(0,0,0,0.22)] rotate-[-2deg]">
              <p className="label text-[8px] tracking-[0.24em] text-[#826a52]">Direct channel</p>
              <a href={`mailto:${email}`} className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[1.7rem] leading-[0.95]">{email}</p>
                  <p className="mt-3 text-[12px] leading-[1.8] text-[#5b4a39]">For detailed trip notes, preferred species, and timing.</p>
                </div>
                <Mail size={18} className="mt-1 shrink-0 text-[#8a6b3c]" />
              </a>
            </article>

            <article className="rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(12,10,9,0.9),rgba(10,9,8,0.76))] p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.22)] rotate-[2deg]">
              <p className="label text-[8px] tracking-[0.24em] text-white/30">WhatsApp / Call</p>
              <a href={`tel:${phone.replace(/\s+/g, "")}`} className="mt-4 flex items-start justify-between gap-4">
                <div>
                  <p className="font-[family-name:var(--font-display)] text-[1.7rem] leading-[0.95] text-white">{phone}</p>
                  <p className="mt-3 text-[12px] leading-[1.8] text-white/52">For direct coordination once the outline is taking shape.</p>
                </div>
                <PhoneCall size={18} className="mt-1 shrink-0 text-[#c8a96e]" />
              </a>
            </article>

            <article className="rounded-[1.6rem] border border-white/[0.08] bg-black/18 p-5">
              <Label gold>Service note</Label>
              <div className="mt-4 flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                  <ShieldCheck size={16} className="text-[#c8a96e]" />
                </span>
                <p className="text-[13px] leading-[1.9] text-white/56">
                  Small groups, species fit, travel logic, and realistic timing come back in the
                  response, not canned brochure language.
                </p>
              </div>
            </article>
          </motion.aside>

          <motion.div {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.06 }} className="relative">
            <div className="absolute inset-4 rounded-[2.3rem] border border-white/[0.08] bg-black/10" />
            <div className="relative rounded-[2.4rem] bg-[#f3e7d3] p-5 text-[#17120d] shadow-[0_45px_120px_rgba(0,0,0,0.34)] sm:p-8 lg:p-10">
              <div className="grid gap-6 border-b border-[#cdbca6] pb-8 sm:grid-cols-[minmax(0,1fr)_10rem] sm:items-end">
                <div>
                  <p className="label text-[8px] tracking-[0.28em] text-[#8a735c]">Private hunt brief</p>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-[clamp(2.4rem,4vw,4.3rem)] leading-[0.92] text-[#17120d]">
                    Concierge intake sheet
                  </h3>
                  <p className="mt-4 max-w-[36rem] text-[14px] leading-[1.9] text-[#5b4a39]">
                    Share the species, group shape, and season you are considering. We will reply
                    with a tighter field-led outline instead of a generic sales response.
                  </p>
                </div>

                <div className="rounded-[1.4rem] border border-[#d4c2a9] bg-[#efe1ca] p-4">
                  <div className="flex items-center gap-2 text-[#8a6b3c]">
                    <Stamp size={16} />
                    <span className="label text-[8px] tracking-[0.24em]">Reviewed by concierge</span>
                  </div>
                  <p className="mt-3 text-[12px] leading-[1.8] text-[#6a5745]">Tailored scope, realistic window, and next-step clarity.</p>
                </div>
              </div>

              <form onSubmit={onSubmit} className="mt-8 space-y-8">
                <input type="text" name="antiBotField" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden />

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block rounded-[1.35rem] border border-[#d3c0a7] bg-[#f7edde] px-5 py-4">
                    <span className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Full name</span>
                    <input
                      required
                      name="fullName"
                      placeholder="Your name"
                      className="mt-3 w-full border-b border-[#ccb89f] bg-transparent pb-3 text-[15px] text-[#17120d] outline-none placeholder:text-[#b7a28d] focus:border-[#9f7d48]"
                    />
                  </label>

                  <label className="block rounded-[1.35rem] border border-[#d3c0a7] bg-[#f7edde] px-5 py-4">
                    <span className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Email address</span>
                    <input
                      required
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      className="mt-3 w-full border-b border-[#ccb89f] bg-transparent pb-3 text-[15px] text-[#17120d] outline-none placeholder:text-[#b7a28d] focus:border-[#9f7d48]"
                    />
                  </label>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <label className="block rounded-[1.35rem] border border-[#d3c0a7] bg-[#f7edde] px-5 py-4">
                    <span className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Target species</span>
                    <select
                      required
                      name="targetSpecies"
                      defaultValue="Red Deer"
                      className="mt-3 w-full border-b border-[#ccb89f] bg-transparent pb-3 text-[15px] text-[#17120d] outline-none focus:border-[#9f7d48]"
                    >
                      {speciesCatalog.map((species) => (
                        <option key={species.name} value={species.name}>
                          {species.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="block rounded-[1.35rem] border border-[#d3c0a7] bg-[#f7edde] px-5 py-4">
                    <span className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Group size</span>
                    <select
                      required
                      name="groupSize"
                      defaultValue="2 hunters"
                      className="mt-3 w-full border-b border-[#ccb89f] bg-transparent pb-3 text-[15px] text-[#17120d] outline-none focus:border-[#9f7d48]"
                    >
                      {["1 hunter", "2 hunters", "3 hunters", "4 hunters", "Hunter + observer"].map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_16rem]">
                  <label className="block rounded-[1.35rem] border border-[#d3c0a7] bg-[#f7edde] px-5 py-4">
                    <span className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Preferred window</span>
                    <input
                      name="preferredMonth"
                      placeholder="April, May-June, or by species"
                      className="mt-3 w-full border-b border-[#ccb89f] bg-transparent pb-3 text-[15px] text-[#17120d] outline-none placeholder:text-[#b7a28d] focus:border-[#9f7d48]"
                    />
                  </label>

                  <div className="rounded-[1.35rem] border border-[#d3c0a7] bg-[#efe1ca] px-5 py-4">
                    <p className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Response style</p>
                    <p className="mt-4 text-[13px] leading-[1.8] text-[#5b4a39]">
                      Tailored outline, species fit, travel logic, and next steps.
                    </p>
                  </div>
                </div>

                <label className="block rounded-[1.35rem] border border-[#d3c0a7] bg-[#f7edde] px-5 py-4">
                  <span className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Tell us about the trip</span>
                  <textarea
                    required
                    name="message"
                    rows={6}
                    placeholder="Species priorities, desired month, physical pace, lodge expectations, or anything else that helps shape the right program."
                    className="mt-3 w-full border-b border-[#ccb89f] bg-transparent pb-3 text-[15px] leading-[1.85] text-[#17120d] outline-none placeholder:text-[#b7a28d] focus:border-[#9f7d48]"
                    style={{ resize: "none" }}
                  />
                </label>

                <div className="rounded-[1.35rem] border border-[#d3c0a7] bg-[#efe1ca] px-5 py-5">
                  <p className="label text-[8px] tracking-[0.24em] text-[#8c765d]">Verification</p>
                  <TurnstileWidget onTokenChange={onTurnTokenChange} />
                </div>

                <button
                  type="submit"
                  disabled={submitting || (turnEnabled && !hasTurnToken)}
                  className="group flex w-full items-center justify-between gap-4 rounded-[1.5rem] bg-[#17120d] px-7 py-5 text-[#f3e7d3] transition-colors duration-300 hover:bg-[#231a12] disabled:cursor-not-allowed disabled:opacity-55"
                >
                  <span className="label text-[10px] tracking-[0.34em]">
                    {submitting ? "SENDING..." : "SUBMIT PRIVATE ENQUIRY"}
                  </span>
                  {!submitting && <ArrowRight size={15} className="shrink-0 transition-transform duration-300 group-hover:translate-x-1" />}
                  {submitting && <span className="h-3.5 w-3.5 rounded-full border border-[#f3e7d3]/30 border-t-[#f3e7d3] animate-spin" />}
                </button>

                <AnimatePresence>
                  {statusTone === "err" && status && (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="rounded-[1.2rem] border border-red-300/40 bg-red-100/70 px-4 py-3 text-[11px] uppercase tracking-[0.24em] text-red-700"
                    >
                      {status}
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          <motion.aside {...reveal} transition={{ ...reveal.transition, delay: reduceMotion ? 0 : 0.1 }} className="space-y-5">
            <article className="rounded-[1.8rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(12,10,9,0.88),rgba(9,8,7,0.72))] p-6">
              <Label gold>What happens next</Label>
              <div className="mt-5 space-y-5">
                {steps.map((step, index) => (
                  <div key={step} className="border-b border-white/[0.08] pb-5 last:border-b-0 last:pb-0">
                    <p className="label text-[8px] tracking-[0.24em] text-white/24">
                      STEP {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-3 text-[13px] leading-[1.85] text-white/56">{step}</p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-[1.8rem] border border-[#c8a96e]/18 bg-[#c8a96e]/[0.06] p-6">
              <Label gold>Desk filter</Label>
              <p className="mt-4 text-[13px] leading-[1.9] text-white/58">
                Best enquiries mention species priority, preferred travel window, group size, and the
                kind of field pace you want. That is enough for a meaningful first reply.
              </p>
            </article>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
