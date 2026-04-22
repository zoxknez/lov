'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Globe, Mail, MapPin, Phone, Radio, Send, ShieldCheck, Signal, ChevronDown, Award, Info, Quote, Activity, Zap, Compass } from 'lucide-react';
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

export default function ContactSection({ dict }: { dict: any }) {
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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, turnstileToken }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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
      clearTimeout(timeoutId);
      setSubmitStatus('error');
      if (error instanceof Error && error.name === 'AbortError') {
        setSubmitMessage('Request timeout. Please try again.');
      } else {
        setSubmitMessage(error instanceof Error ? error.message : 'Transmission failed. Re-establish link.');
      }
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactNodes = [
    { icon: Phone, label: 'Voice / WhatsApp', value: '+64 21 088 50131' },
    { icon: Mail, label: 'Digital Dispatch', value: 'hunting@kaimanawasafaris.com' },
    { icon: MapPin, label: 'Operational Base', value: 'Ohakune - NZ' },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-16 font-sans sm:py-20 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/10 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute -left-[10%] bottom-[10%] h-[600px] w-[600px] rounded-full bg-gold-500/[0.02] blur-[160px]" />
      <div className="pointer-events-none absolute -right-[10%] top-[10%] h-[600px] w-[600px] rounded-full bg-gold-400/[0.02] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 text-center sm:mb-16">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400 sm:mb-4 sm:text-[11px] sm:tracking-[0.44em]">
            <TextReveal>{dict.tag}</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-black uppercase leading-none tracking-tighter text-white soft-text-glow sm:text-7xl md:text-9xl">
            <TextReveal delay={0.1}>{dict.title}</TextReveal>
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
          <p className="mx-auto mt-6 max-w-xl text-[15px] italic leading-relaxed text-gray-400 opacity-60 sm:mt-8 sm:text-lg">
               {dict.subtitle}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Form Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="h-full lg:col-span-8"
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,22,21,0.6),rgba(9,14,13,0.8))] p-6 shadow-premium md:rounded-[3rem] sm:p-8 lg:p-14">
              <div className="absolute left-0 top-0 h-px w-32 bg-gradient-to-r from-gold-400/40 to-transparent" />
              
              <div className="mb-8 flex flex-col items-start justify-between gap-4 border-b border-white/5 pb-6 sm:mb-12 sm:flex-row sm:items-center sm:pb-8">
                 <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-400/20 bg-gold-400/5 text-gold-400 shadow-glow">
                      <Radio className="h-5 w-5 animate-pulse" />
                    </div>
                    <div>
                       <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">{dict.formTitle}</h3>
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400/40">Field Link Protocol v2.6</p>
                    </div>
                 </div>
                 <div className="hidden items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1.5 backdrop-blur-sm sm:flex">
                    <Signal className="h-3 w-3 text-gold-400" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-gold-400">Stable Link</span>
                 </div>
              </div>

              <form onSubmit={handleSubmit} className="flex-grow space-y-8 sm:space-y-10 lg:space-y-12">
                <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
                  <div className="group relative">
                    <label className="mb-3 block text-[9px] font-black uppercase tracking-[0.26em] text-gold-400/60 transition-colors group-focus-within:text-gold-400 sm:text-[9.5px] sm:tracking-[0.4em]">
                      {dict.formName}
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Alexander Knight"
                      required
                      className="w-full border-b border-white/10 bg-transparent py-4 text-base font-medium text-white placeholder-white/10 transition-all focus:outline-none sm:text-lg"
                    />
                    <span className="form-focus-line" />
                  </div>
                  <div className="group relative">
                    <label className="mb-3 block text-[9px] font-black uppercase tracking-[0.26em] text-gold-400/60 transition-colors group-focus-within:text-gold-400 sm:text-[9.5px] sm:tracking-[0.4em]">
                      {dict.formEmail}
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="alex@knight-ops.com"
                      required
                      className="w-full border-b border-white/10 bg-transparent py-4 text-base font-medium text-white placeholder-white/10 transition-all focus:outline-none sm:text-lg"
                    />
                    <span className="form-focus-line" />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2 sm:gap-12">
                  <div className="group relative">
                    <label className="mb-3 block text-[9px] font-black uppercase tracking-[0.26em] text-gold-400/60 transition-colors group-focus-within:text-gold-400 sm:text-[9.5px] sm:tracking-[0.4em]">
                      {dict.formTarget}
                    </label>
                    <div className="relative">
                       <select
                         name="subject"
                         value={formData.subject}
                         onChange={handleInputChange}
                         required
                         className="w-full cursor-pointer appearance-none border-b border-white/10 bg-transparent py-4 text-base font-medium text-white transition-all focus:border-gold-400 focus:outline-none sm:text-lg"
                       >
                         <option value="" disabled className="bg-forest-950">{dict.selectOption}</option>
                         <option value="booking" className="bg-forest-950">Book a Safari Campaign</option>
                         <option value="pricing" className="bg-forest-950">Species & Quota Info</option>
                         <option value="travel" className="bg-forest-950">Logistics & Field Support</option>
                         <option value="other" className="bg-forest-950">General Operational Inquiry</option>
                       </select>
                       <ChevronDown className="pointer-events-none absolute right-0 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-400/40" />
                    </div>
                  </div>
                  <div className="group relative">
                    <label className="mb-3 block text-[9px] font-black uppercase tracking-[0.26em] text-gold-400/60 transition-colors group-focus-within:text-gold-400 sm:text-[9.5px] sm:tracking-[0.4em]">
                      {dict.formPhone}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+X XXX XXX XXXX"
                      className="w-full border-b border-white/10 bg-transparent py-4 text-base font-medium text-white placeholder-white/10 transition-all focus:outline-none sm:text-lg"
                    />
                    <span className="form-focus-line" />
                  </div>
                </div>

                <div className="group relative">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <label className="block text-[9px] font-black uppercase tracking-[0.26em] text-gold-400/60 transition-colors group-focus-within:text-gold-400 sm:text-[9.5px] sm:tracking-[0.4em]">
                      {dict.formDetails}
                    </label>
                    <span className={`text-[9px] font-black tabular-nums ${formData.message.length > MAX_MESSAGE * 0.9 ? 'text-red-400' : 'text-gold-400/40'}`}>
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
                    placeholder="Describe your desired campaign, target species, and timeline..."
                    className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-base font-medium text-white placeholder-white/10 transition-all focus:border-gold-400 focus:outline-none focus:bg-white/[0.05] sm:text-lg"
                  />
                </div>

                {turnstileEnabled && (
                  <div className="flex flex-col items-start gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 sm:flex-row sm:items-center sm:gap-8 lg:p-8">
                    <p className="text-[9px] font-bold uppercase tracking-[0.26em] text-gold-400/30 sm:text-[10px] sm:tracking-[0.5em]">Auth Protocol</p>
                    <TurnstileWidget key={turnstileKey} onTokenChange={setTurnstileToken} />
                  </div>
                )}

                <div className="pt-4">
                  <MagneticButton
                    type="submit"
                    disabled={submitStatus === 'loading' || (turnstileEnabled && !turnstileToken)}
                    className="group relative w-full overflow-hidden rounded-[1.6rem] bg-gold-400 py-5 text-[10px] font-black uppercase tracking-[0.22em] text-black shadow-premium shadow-gold-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 sm:rounded-[2rem] sm:py-8 sm:text-[11px] sm:tracking-[0.5em]"
                  >
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:animate-shimmer" />
                    <div className="flex items-center justify-center gap-5">
                      <Send className={`h-4 w-4 ${submitStatus === 'loading' ? 'animate-spin' : 'transition-transform group-hover:-translate-y-1 group-hover:translate-x-1'}`} />
                      <span>{submitStatus === 'loading' ? dict.submitting : dict.submitBtn}</span>
                    </div>
                  </MagneticButton>
                </div>

                <AnimatePresence>
                  {submitStatus === 'success' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-4 rounded-2xl border border-gold-400/20 bg-gold-400/5 p-5 shadow-glow sm:gap-5 sm:p-6">
                      <ShieldCheck className="h-6 w-6 text-gold-400" />
                      <p className="font-display font-bold text-gold-100">{submitMessage}</p>
                    </motion.div>
                  )}
                  {submitStatus === 'error' && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6 font-display font-bold text-red-200">
                      {submitMessage}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Space Filler: Operational Status Monitor */}
               <div className="mt-10 border-t border-white/5 pt-8 sm:mt-12 sm:pt-10">
                 <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-8">
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-gold-400">
                          <Activity className="h-3 w-3" />
                          <p className="text-[9px] font-black uppercase tracking-widest">Base Link</p>
                       </div>
                       <p className="text-xs font-bold text-white uppercase tracking-tight">Stable - 98ms</p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-gold-400">
                          <Compass className="h-3 w-3" />
                          <p className="text-[9px] font-black uppercase tracking-widest">Current Op</p>
                       </div>
                       <p className="text-xs font-bold text-white uppercase tracking-tight">Kaimanawa Bush</p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-gold-400">
                          <Zap className="h-3 w-3" />
                          <p className="text-[9px] font-black uppercase tracking-widest">Readiness</p>
                       </div>
                       <p className="text-xs font-bold text-white uppercase tracking-tight">Tactical Peak</p>
                    </div>
                    <div className="flex flex-col gap-2">
                       <div className="flex items-center gap-2 text-gold-400">
                          <Globe className="h-3 w-3" />
                          <p className="text-[9px] font-black uppercase tracking-widest">Field Status</p>
                       </div>
                       <p className="text-xs font-bold text-white uppercase tracking-tight">Active Ops</p>
                    </div>
                 </div>
                 
                 <div className="mt-8 flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-400/5 text-gold-400">
                       <ShieldCheck className="h-4 w-4" />
                    </div>
                    <p className="text-[11px] font-medium leading-relaxed text-gray-400 italic">
                      All transmissions are encrypted. We prioritize serious inquiries for upcoming alpine and bush campaigns.
                    </p>
                 </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Panel & Sidebar */}
          <div className="flex flex-col h-full gap-6 lg:col-span-4 lg:gap-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
             className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(15,22,21,0.6),rgba(9,14,13,0.8))] p-6 sm:rounded-[3rem] sm:p-8 lg:p-10"
           >
               <p className="mb-6 text-[9px] font-bold uppercase tracking-[0.28em] text-gold-400/60 sm:mb-8 sm:text-[10px] sm:tracking-[0.5em]">{dict.contactInfo}</p>
               <div className="space-y-6 sm:space-y-8">
                  {contactNodes.map((node) => {
                    const Icon = node.icon;
                    return (
                      <div key={node.label} className="group relative flex items-start gap-4 sm:gap-6">
                         <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-gold-400 transition-all group-hover:bg-gold-500/10 group-hover:border-gold-500/40">
                            <Icon className="h-5 w-5" />
                         </div>
                         <div className="min-w-0">
                            <p className="mb-1 text-[9px] font-black uppercase tracking-[0.3em] text-white/30">{node.label}</p>
                            <p className="break-words font-display text-sm font-bold text-white transition-colors group-hover:text-gold-400 tracking-tight sm:text-base">{node.value}</p>
                         </div>
                      </div>
                    );
                  })}
               </div>

               <div className="mt-10 border-t border-white/5 pt-8 sm:mt-12 sm:pt-10">
                  <div className="mb-6 flex items-center gap-4">
                    <Clock className="h-4 w-4 text-gold-400/60" />
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400">Field Protocol</p>
                  </div>
                  <div className="relative rounded-2xl border border-white/5 bg-white/[0.01] p-6 lg:p-8">
                     <Quote className="absolute -left-3 -top-3 h-8 w-8 text-gold-400/10" />
                     <p className="text-sm italic italic leading-relaxed text-gray-400">
                       &ldquo;Field operations are often out of reach, but the Ohakune base stays connected. Technical logistics or simple checks - we manage the details.&rdquo;
                     </p>
                  </div>
               </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-forest-900/20 p-6 shadow-premium sm:rounded-[2.5rem] sm:p-8 lg:p-10"
            >
               <div className="mb-8 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-400/5 text-gold-400">
                        <Globe className="h-5 w-5" />
                     </div>
                     <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-white">Logistics</p>
                  </div>
                  <Info className="h-4 w-4 text-white/10" />
               </div>
               
               <p className="mb-8 text-sm leading-relaxed text-gray-400">
                 Domestic travel and trophy logistics are managed from Auckland (AKL) arrival through final field movement.
               </p>
               
               <div className="rounded-2xl bg-[#090e0d] p-6 border border-white/5">
                  <div className="mb-3 flex items-center gap-2 text-gold-400">
                     <Award className="h-3.5 w-3.5" />
                     <p className="text-[9px] font-black uppercase tracking-[0.3em]">Notice</p>
                  </div>
                  <p className="text-[12px] font-medium italic leading-relaxed text-gray-300">
                    Visitor firearms licenses should be started about 4 months ahead. High-quality rifle hire is available from NZD 100/day.
                  </p>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
