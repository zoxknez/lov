'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Globe, Mail, MapPin, Phone, Radio, Send, ShieldCheck, Signal } from 'lucide-react';
import MagneticButton from '@/components/magnetic-button';
import TextReveal from '@/components/text-reveal';
import TurnstileWidget from '@/components/turnstile-widget';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  antiBotField: string;
}

const MAX_MESSAGE = 800;

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    antiBotField: '',
  });
  const [turnstileToken, setTurnstileToken] = useState('');
  const [turnstileKey, setTurnstileKey] = useState(0);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [submitMessage, setSubmitMessage] = useState('');
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Unable to send transmission.');
      }

      setSubmitStatus('success');
      setSubmitMessage('Transmission received. Operations will review within 24 standard hours.');
      setFormData({ fullName: '', email: '', phone: '', subject: '', message: '', antiBotField: '' });
      setTurnstileToken('');
      setTurnstileKey((count) => count + 1);
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Transmission failed. Re-establish link.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactNodes = [
    { icon: Phone, label: 'Voice / WhatsApp', value: '+64 21 088 50131' },
    { icon: Mail, label: 'Digital Dispatch', value: 'hunting@kaimanawasafaris.com' },
    { icon: MapPin, label: 'Operational Base', value: 'Ohakune - NZ' },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-20 font-sans md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/3 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400">
            <TextReveal>Secure Field Link</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase leading-none tracking-tight text-white sm:text-6xl md:text-8xl lg:text-[8rem]">
            <TextReveal delay={0.1}>Dispatch</TextReveal>
          </h2>
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 120, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="mx-auto mt-6 flex items-center gap-3"
          >
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-400/50 to-transparent" />
            <div className="h-1.5 w-1.5 shrink-0 rotate-45 border border-gold-400/60 bg-gold-400/20" />
            <div className="h-px w-full bg-gradient-to-l from-transparent via-gold-400/50 to-transparent" />
          </motion.div>
          <p className="mx-auto mt-6 max-w-xl text-base italic leading-relaxed text-gray-400 sm:text-lg md:mt-8">
            <TextReveal delay={0.3}>
              Start planning your New Zealand adventure. Serious inquiries reviewed within 24 operational hours.
            </TextReveal>
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/15 p-6 shadow-premium sm:p-8 md:rounded-[2.5rem] md:p-12">
              <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/50 to-transparent" />

              <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-center md:mb-12">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/8 text-gold-400 shadow-glow">
                    <Radio className="h-4 w-4 animate-pulse" />
                  </div>
                  <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                    Inquiry Dispatch
                  </h3>
                </div>
                <div className="hidden items-center gap-2 sm:flex">
                  <Signal className="h-3 w-3 text-gold-400/40" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400/40">Link: Stable</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                  <div className="group relative">
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/80 sm:tracking-[0.4em]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full border-b border-white/15 bg-transparent py-3 text-base font-medium text-white placeholder-white/30 transition-all focus:border-gold-400 focus:outline-none sm:text-lg"
                    />
                  </div>
                  <div className="group relative">
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/80 sm:tracking-[0.4em]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border-b border-white/15 bg-transparent py-3 text-base font-medium text-white placeholder-white/30 transition-all focus:border-gold-400 focus:outline-none sm:text-lg"
                    />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
                  <div className="group relative">
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/80 sm:tracking-[0.4em]">
                      Inquiry Type
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full cursor-pointer appearance-none border-b border-white/15 bg-transparent py-3 text-base font-medium text-white transition-all focus:border-gold-400 focus:outline-none sm:text-lg"
                    >
                      <option value="" disabled className="bg-forest-950">
                        Select Type
                      </option>
                      <option value="booking" className="bg-forest-950">
                        Book a Hunt
                      </option>
                      <option value="pricing" className="bg-forest-950">
                        Species and Rates
                      </option>
                      <option value="travel" className="bg-forest-950">
                        Logistics / Travel
                      </option>
                      <option value="other" className="bg-forest-950">
                        General Inquiry
                      </option>
                    </select>
                  </div>
                  <div className="group relative">
                    <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/80 sm:tracking-[0.4em]">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full border-b border-white/15 bg-transparent py-3 text-base font-medium text-white placeholder-white/30 transition-all focus:border-gold-400 focus:outline-none sm:text-lg"
                    />
                  </div>
                </div>

                <div className="group relative">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label className="block text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/80 sm:tracking-[0.4em]">
                      Requirements and Trophy Goals
                    </label>
                    <span
                      className={`text-[9px] font-black tabular-nums ${
                        formData.message.length > MAX_MESSAGE * 0.9 ? 'text-red-400' : 'text-gold-400/60'
                      }`}
                    >
                      {formData.message.length}/{MAX_MESSAGE}
                    </span>
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    maxLength={MAX_MESSAGE}
                    className="w-full resize-none rounded-2xl border border-white/15 bg-white/[0.03] px-4 py-4 text-base font-medium text-white placeholder-white/20 transition-all focus:border-gold-400 focus:outline-none sm:px-5 sm:text-lg"
                  />
                </div>

                {turnstileEnabled && (
                  <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400/40">Humanity Check</p>
                    </div>
                    <TurnstileWidget key={turnstileKey} onTokenChange={setTurnstileToken} />
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={submitStatus === 'loading' || (turnstileEnabled && !turnstileToken)}
                  className="group relative w-full overflow-hidden rounded-[1.5rem] bg-gold-400 py-6 text-[10px] font-bold uppercase tracking-[0.24em] text-black shadow-premium shadow-gold-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 sm:py-7 sm:text-[11px] sm:tracking-[0.5em]"
                >
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shimmer" />
                  <div className="flex items-center justify-center gap-4">
                    <Send
                      className={`h-4 w-4 ${
                        submitStatus === 'loading'
                          ? 'animate-spin'
                          : 'transition-transform group-hover:-translate-y-1 group-hover:translate-x-1'
                      }`}
                    />
                    <span>{submitStatus === 'loading' ? 'Opening Field Link...' : 'Dispatch Transmission'}</span>
                  </div>
                </MagneticButton>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-4 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-5 shadow-glow sm:gap-5 sm:p-6"
                    >
                      <ShieldCheck className="h-5 w-5 text-gold-400" />
                      <p className="text-sm font-bold text-gold-200">{submitMessage}</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm font-bold text-red-100 sm:p-6"
                    >
                      {submitMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          <div className="flex flex-col gap-4 sm:gap-6 lg:col-span-4">
            <div className="grid gap-4">
              {contactNodes.map((node) => {
                const Icon = node.icon;

                return (
                  <motion.div
                    key={node.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-4 rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-5 shadow-premium transition-all hover:border-gold-400/30 sm:gap-5 sm:p-6 md:rounded-[2rem]"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10 text-gold-400 shadow-glow transition-transform group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="mb-1 text-[10px] font-black uppercase tracking-[0.28em] text-gold-400/80 sm:tracking-[0.4em]">
                        {node.label}
                      </p>
                      <p className="break-words text-sm font-bold text-white sm:tracking-widest">{node.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="relative overflow-hidden rounded-[1.8rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium sm:p-8 md:rounded-[2rem]">
              <div className="absolute right-0 top-0 h-px w-24 bg-gradient-to-l from-gold-400/30 to-transparent" />
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10 text-gold-400 shadow-glow">
                  <Clock className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gold-400 sm:text-[11px] sm:tracking-[0.4em]">
                  Response Protocol
                </p>
              </div>
              <p className="border-l border-gold-400/40 pl-5 text-sm italic font-medium leading-relaxed text-gray-200 sm:pl-6">
                &ldquo;Field operations are out of reach, but the Ohakune base stays connected. Technical logistics or simple checks - we manage the details.&rdquo;
              </p>
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium sm:p-8 md:rounded-[2.5rem]">
              <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/40 to-transparent" />
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/10 text-gold-400">
                  <Globe className="h-4 w-4" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.28em] text-gold-400 sm:text-[11px] sm:tracking-[0.4em]">
                  International
                </p>
              </div>
              <p className="mb-6 text-sm font-medium leading-relaxed text-white">
                Domestic travel and trophy logistics are managed from Auckland (AKL) arrival through final field movement.
              </p>
              <div className="mt-4 rounded-2xl border border-white/5 bg-forest-950/40 p-5">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400/60">Firearms Notice</p>
                <p className="text-[12px] font-medium italic leading-relaxed text-gray-200">
                  Visitor firearms licenses should be started about 4 months ahead. High-quality rifle hire is available from NZD 100/day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
