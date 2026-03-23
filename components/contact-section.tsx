'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, ShieldCheck, Zap, Radio, Signal } from 'lucide-react';
import TextReveal from '@/components/text-reveal';
import MagneticButton from '@/components/magnetic-button';
import TurnstileWidget from '@/components/turnstile-widget';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  antiBotField: string;
}

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
  const MAX_MESSAGE = 800;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
      setTurnstileKey((c) => c + 1);
      setTimeout(() => setSubmitStatus('idle'), 6000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Transmission failed. Re-establish link.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactNodes = [
    { icon: Phone, label: 'Voice/WhatsApp', value: '+64 21 088 50131' },
    { icon: Mail, label: 'Digital Dispatch', value: 'hunting@kaimanawasafaris.com' },
    { icon: MapPin, label: 'Operational Base', value: 'Ohakune · NZ' },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-24 md:py-32 font-sans">
      <div className="absolute inset-0 bg-forest-950/10 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[700px] w-[700px] rounded-full bg-gold-500/3 blur-[140px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* ── Header ── */}
        <div className="mb-12 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.44em] text-gold-400 mb-4">
            <TextReveal>Secure Field Link</TextReveal>
          </p>
          <h2 className="font-display text-6xl font-bold uppercase tracking-tight text-white md:text-8xl lg:text-[8rem] leading-none">
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
          <p className="mx-auto mt-8 max-w-xl text-lg italic leading-relaxed text-gray-400">
            <TextReveal delay={0.3}>
              Start planning your New Zealand adventure. Serious inquiries reviewed within 24 operational hours.
            </TextReveal>
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-12">
          
          {/* ── Left Column: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-forest-900/15 p-8 md:p-12 shadow-premium">
              <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-gold-400/50 to-transparent" />
              
              <div className="flex items-center justify-between mb-12">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/8 border border-gold-400/20 text-gold-400 shadow-glow">
                    <Radio className="h-4 w-4 animate-pulse" />
                  </div>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-white">Inquiry Dispatch</h3>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                   <Signal className="h-3 w-3 text-gold-400/40" />
                   <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400/40">Link: Stable</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid gap-10 sm:grid-cols-2">
                    <div className="group relative">
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/80">Full Name</label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        className="w-full border-b border-white/15 bg-transparent py-3 text-lg font-medium text-white placeholder-white/30 transition-all focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                    <div className="group relative">
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/80">Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full border-b border-white/15 bg-transparent py-3 text-lg font-medium text-white placeholder-white/30 transition-all focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-10 sm:grid-cols-2">
                    <div className="group relative">
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/80">Inquiry Type</label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full appearance-none border-b border-white/15 bg-transparent py-3 text-lg font-medium text-white transition-all focus:border-gold-400 focus:outline-none cursor-pointer"
                      >
                        <option value="" disabled className="bg-forest-950">Select Type</option>
                        <option value="booking" className="bg-forest-950">Book a Hunt</option>
                        <option value="pricing" className="bg-forest-950">Species & Rates</option>
                        <option value="travel" className="bg-forest-950">Logistics/Travel</option>
                        <option value="other" className="bg-forest-950">General Inquiry</option>
                      </select>
                    </div>
                    <div className="group relative">
                      <label className="mb-2 block text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/80">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full border-b border-white/15 bg-transparent py-3 text-lg font-medium text-white placeholder-white/30 transition-all focus:border-gold-400 focus:outline-none"
                      />
                    </div>
                  </div>

                <div className="group relative">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/80">Requirements & Trophy Goals</label>
                    <span className={`text-[9px] font-black tabular-nums ${formData.message.length > MAX_MESSAGE * 0.9 ? 'text-red-400' : 'text-gold-400/60'}`}>
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
                    className="w-full border border-white/15 bg-white/[0.03] rounded-2xl px-5 py-4 text-lg font-medium text-white placeholder-white/20 transition-all focus:border-gold-400 focus:outline-none resize-none"
                  />
                </div>

                {turnstileEnabled && (
                  <div className="flex items-center gap-6 rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                    <div className="hidden sm:block">
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-400/40">Humanity Check</p>
                    </div>
                    <TurnstileWidget key={turnstileKey} onTokenChange={setTurnstileToken} />
                  </div>
                )}

                <MagneticButton
                  type="submit"
                  disabled={submitStatus === 'loading' || (turnstileEnabled && !turnstileToken)}
                  className={`group relative w-full overflow-hidden rounded-[1.5rem] bg-gold-400 py-7 text-[11px] font-bold uppercase tracking-[0.5em] text-black transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 shadow-premium shadow-gold-500/20`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer" />
                  <div className="flex items-center justify-center gap-4">
                    <Send className={`h-4 w-4 ${submitStatus === 'loading' ? 'animate-spin' : 'group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'}`} />
                    <span>{submitStatus === 'loading' ? 'Opening Field Link...' : 'Dispatch Transmission'}</span>
                  </div>
                </MagneticButton>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-5 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-6 shadow-glow">
                      <ShieldCheck className="h-5 w-5 text-gold-400" />
                      <p className="text-xs font-bold uppercase tracking-widest text-gold-200">{submitMessage}</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-xs font-bold uppercase tracking-widest text-red-100">
                      {submitMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* ── Right Column: Nodes & Specs ── */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Contact Nodes */}
            <div className="grid gap-4">
              {contactNodes.map((n) => {
                const Icon = n.icon;
                return (
                  <motion.div
                    key={n.label}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-5 rounded-[2rem] border border-white/8 bg-forest-900/20 p-6 shadow-premium hover:border-gold-400/30 transition-all"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400 group-hover:scale-110 transition-transform shadow-glow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-400/80 mb-1">{n.label}</p>
                      <p className="text-sm font-bold text-white tracking-widest truncate">{n.value}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Response Node */}
            <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium">
               <div className="absolute top-0 right-0 h-px w-24 bg-gradient-to-l from-gold-400/30 to-transparent" />
               <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400 shadow-glow">
                    <Clock className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gold-400">Response Protocol</p>
               </div>
               <p className="text-sm italic font-medium leading-relaxed text-gray-200 border-l border-gold-400/40 pl-6">
                 &ldquo;Field operations are out of reach, but the Ohakune base stays connected. Technical logistics or simple checks — we manage the details.&rdquo;
               </p>
            </div>

            {/* Intl / Firearms Node */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/8 bg-forest-900/20 p-8 shadow-premium">
               <div className="absolute top-0 left-0 h-px w-32 bg-gradient-to-r from-gold-400/40 to-transparent" />
               <div className="flex items-center gap-4 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/10 border border-gold-400/20 text-gold-400">
                    <Globe className="h-4 w-4" />
                  </div>
                  <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gold-400">International</p>
               </div>
               <p className="text-sm font-medium leading-relaxed text-white mb-6">
                 Domestic travel and trophy logistics managed comprehensively from Auckland (AKL) arrival.
               </p>
               <div className="rounded-2xl border border-white/5 bg-forest-950/40 p-5 mt-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold-400/60 mb-2">Firearms Notice</p>
                  <p className="text-[12px] leading-relaxed text-gray-200 font-medium italic">
                    Licenses require 4 months processing. High-quality rifle hire available for NZD 100/day.
                  </p>
               </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
