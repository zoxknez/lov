'use client';

import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, Globe } from 'lucide-react';
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

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus('loading');
    setSubmitMessage('');

    try {
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          turnstileToken,
        }),
      });

      const result = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !result.ok) {
        throw new Error(result.error ?? 'Unable to send your inquiry right now.');
      }

      setSubmitStatus('success');
      setSubmitMessage('Field operations will review your inquiry within 24 standard hours.');
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        antiBotField: '',
      });
      setTurnstileToken('');
      setTurnstileKey((current) => current + 1);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      setSubmitStatus('error');
      setSubmitMessage(error instanceof Error ? error.message : 'Unable to send your inquiry right now.');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  useEffect(() => {
    if (submitStatus === 'idle') {
      setSubmitMessage('');
    }
  }, [submitStatus]);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+64 21 088 50131',
      description: 'WhatsApp for international enquiries',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hunting@kaimanawasafaris.com',
      description: 'Primary inquiry channel',
    },
    {
      icon: MapPin,
      title: 'Base',
      details: 'Ohakune, New Zealand',
      description: 'Central North Island logistics hub',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans concierge-station">
      {/* Concierge Atmospheric Layer */}
      <div className="absolute inset-0 bg-forest-950/18 backdrop-blur-[2px] pointer-events-none" />
      {/* Background Accents */}
      <div className="absolute top-0 left-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-forest-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">
             <TextReveal>Journey Start</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl lg:text-9xl">
             <TextReveal delay={0.2}>Secure Your Dates</TextReveal>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" 
          />
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl italic">
             <TextReveal delay={0.4}>
                Start planning your New Zealand hunting adventure today. We respond to all serious inquiries within 24 hours.
             </TextReveal>
          </p>
        </div>

        {/* Info Cards Row */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-32 grid gap-8 md:grid-cols-3"
        >
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <motion.div 
                key={info.title} 
                variants={itemVariants}
                className="group relative rounded-[2rem] border border-white/5 bg-forest-900/10 p-12 transition-all duration-700 hover:border-gold-500/40 hover:bg-forest-900/20 shadow-premium"
              >
                <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-900 text-gold-400 border border-white/5 shadow-glow transition-transform group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-3 tracking-tight uppercase">{info.title}</h3>
                <p className="text-xl font-medium text-gold-200/90 mb-3 truncate font-display">{info.details}</p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold">{info.description}</p>
                
                {/* Decoration */}
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none">
                   <Icon className="h-20 w-20 text-gold-400" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <div className="grid gap-20 lg:grid-cols-5">
          {/* Form Column - High-Tech Operational Dispatch */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-forest-900/10 p-12 backdrop-blur-2xl shadow-premium">
              {/* Internal Accent */}
              <div className="absolute top-0 left-0 h-1 w-20 bg-gold-400/30" />
              
              <div className="flex items-center gap-6 mb-16">
                 <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/5 text-gold-400 border border-gold-400/10 backdrop-blur-md">
                    <MessageSquare className="h-5 w-5" />
                 </div>
                 <div>
                    <h3 className="font-display text-4xl font-bold text-white uppercase tracking-tighter leading-none">Inquiry Dispatch</h3>
                    <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400/40">Secure Field Channel</p>
                 </div>
              </div>
 
              <form onSubmit={handleSubmit} className="space-y-12">
                <div className="grid gap-12 sm:grid-cols-2">
                  {/* Floating Label Input: Name */}
                  <div className="group relative">
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      className="peer w-full border-b border-white/10 bg-transparent px-1 py-4 text-lg text-white placeholder-transparent transition-all focus:border-gold-400 focus:outline-none"
                    />
                    <label className="absolute left-1 top-4 -translate-y-0 text-sm font-bold uppercase tracking-[0.3em] text-gray-500 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-600 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold-400/60 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-400/60">
                      Full Name
                    </label>
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 group-hover:w-full peer-focus:w-full" />
                  </div>

                  {/* Floating Label Input: Email */}
                  <div className="group relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder=" "
                      className="peer w-full border-b border-white/10 bg-transparent px-1 py-4 text-lg text-white placeholder-transparent transition-all focus:border-gold-400 focus:outline-none"
                    />
                    <label className="absolute left-1 top-4 -translate-y-0 text-sm font-bold uppercase tracking-[0.3em] text-gray-500 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-600 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold-400/60 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-400/60">
                      Email Address
                    </label>
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 group-hover:w-full peer-focus:w-full" />
                  </div>
                </div>
 
                <div className="grid gap-12 sm:grid-cols-2">
                  {/* Floating Label Input: Phone */}
                  <div className="group relative">
                    <input
                      tabIndex={-1}
                      type="tel"
                      name="antiBotField"
                      value={formData.antiBotField}
                      onChange={handleInputChange}
                      autoComplete="off"
                      className="absolute left-0 top-0 h-0 w-0 opacity-0 pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder=" "
                      className="peer w-full border-b border-white/10 bg-transparent px-1 py-4 text-lg text-white placeholder-transparent transition-all focus:border-gold-400 focus:outline-none"
                    />
                    <label className="absolute left-1 top-4 -translate-y-0 text-sm font-bold uppercase tracking-[0.3em] text-gray-500 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-600 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold-400/60 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-400/60">
                      Phone (Optional)
                    </label>
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 group-hover:w-full peer-focus:w-full" />
                  </div>

                  {/* High-Tech Custom Select */}
                  <div className="group relative">
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="peer w-full appearance-none border-b border-white/10 bg-transparent px-1 py-4 text-lg text-white placeholder-transparent transition-all focus:border-gold-400 focus:outline-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-forest-950">Select Inquiry Type</option>
                      <option value="booking" className="bg-forest-950">Book a Hunt</option>
                      <option value="species-pricing" className="bg-forest-950">Species & Pricing</option>
                      <option value="travel" className="bg-forest-950">Travel Logistics</option>
                      <option value="other" className="bg-forest-950">General Inquiry</option>
                    </select>
                    <label className={`absolute left-1 top-4 transition-all text-xs font-bold uppercase tracking-[0.3em] text-gold-400/60 -translate-y-8`}>
                      Inquiry Type
                    </label>
                    <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 group-hover:w-full peer-focus:w-full" />
                    <div className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2">
                      <div className="h-1.5 w-1.5 rounded-full bg-gold-400 animate-pulse" />
                    </div>
                  </div>
                </div>
 
                <div className="group relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder=" "
                    rows={4}
                    className="peer w-full border-b border-white/10 bg-transparent px-1 py-4 text-lg text-white placeholder-transparent transition-all focus:border-gold-400 focus:outline-none resize-none"
                  />
                  <label className="absolute left-1 top-4 -translate-y-0 text-sm font-bold uppercase tracking-[0.3em] text-gray-500 transition-all peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-600 peer-focus:-translate-y-8 peer-focus:text-xs peer-focus:text-gold-400/60 peer-[:not(:placeholder-shown)]:-translate-y-8 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:text-gold-400/60">
                    Your Requirements & Trophy Goals
                  </label>
                  <div className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-700 group-hover:w-full peer-focus:w-full" />
                </div>

                {turnstileEnabled && (
                  <div className="rounded-[2rem] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm">
                    <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold-300/70">
                      Verification
                    </p>
                    <TurnstileWidget key={turnstileKey} onTokenChange={setTurnstileToken} />
                  </div>
                )}
 
                <MagneticButton
                  type="submit"
                  disabled={submitStatus === 'loading' || (turnstileEnabled && !turnstileToken)}
                  className="group relative flex w-full items-center justify-center gap-6 overflow-hidden rounded-[1.5rem] bg-gold-400 py-7 font-bold uppercase tracking-[0.4em] text-[11px] text-black transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-premium shadow-gold-500/20"
                >
                  <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0)_30%,rgba(255,255,255,0.2)_45%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.2)_55%,rgba(255,255,255,0)_70%)] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
                  <Send className="relative z-10 h-5 w-5 transition-transform group-hover:translate-x-2 group-hover:-translate-y-2" />
                  <span className="relative z-10">
                    {submitStatus === 'loading' ? 'Establishing Field Link...' : 'Dispatch Inquiry'}
                  </span>
                </MagneticButton>
 
                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-6 rounded-3xl bg-gold-400/5 p-8 border border-gold-400/20 backdrop-blur-md shadow-glow-gold"
                  >
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/20 text-gold-400">
                        <ShieldCheck className="h-6 w-6" />
                     </div>
                     <div>
                        <p className="text-xs font-bold text-gold-200 uppercase tracking-widest leading-none">Transmission Successful</p>
                        <p className="mt-2 text-[10px] text-gray-400 font-medium">{submitMessage}</p>
                     </div>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl border border-red-400/20 bg-red-500/10 p-6 text-sm text-red-100 shadow-premium"
                  >
                    {submitMessage}
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Info Column - Operational Nodes */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="group relative rounded-[3rem] border border-white/5 bg-forest-900/10 p-12 transition-all hover:border-gold-400/30 shadow-premium overflow-hidden"
            >
               <div className="absolute -top-10 -right-10 p-10 opacity-0 group-hover:opacity-5 transition-all duration-1000 rotate-12">
                  <Clock className="h-40 w-40 text-gold-400" />
               </div>
               
               <div className="relative">
                  <div className="flex items-center gap-6 mb-10">
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/5 text-gold-400 border border-gold-400/10 backdrop-blur-md">
                        <Clock className="h-6 w-6" />
                     </div>
                     <h4 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Response Time</h4>
                  </div>
                  <p className="font-sans text-gray-400 leading-relaxed italic text-lg border-l border-gold-400/20 pl-8">
                     &quot;Field operations are usually out of reach, but we keep the Ohakune base connected. Whether it&apos;s technical logistics or a simple arrival check, we&apos;re here to manage the details.&quot;
                  </p>
               </div>
            </motion.div>
 
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="group relative rounded-[3rem] border border-gold-400/10 bg-gold-400/5 p-12 overflow-hidden shadow-premium"
            >
               <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(163,126,67,0.1),transparent)]" />
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-all duration-1000">
                  <Globe className="h-48 w-48 text-gold-400" />
               </div>
               
               <div className="relative">
                  <div className="flex items-center gap-6 mb-10">
                     <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-400/10 text-gold-400 border border-gold-400/20 backdrop-blur-md">
                        <Globe className="h-6 w-6" />
                     </div>
                     <h4 className="font-display text-2xl font-bold text-white uppercase tracking-tight">International</h4>
                  </div>
                  <p className="font-sans text-gray-400 leading-relaxed text-base mb-10 italic border-l border-gold-400/20 pl-8">
                     Most guests arrive via Auckland (AKL). We coordinate all domestic travel, firearms paperwork, and trophy logistics from that point onward.
                  </p>
                  <div className="h-px w-full bg-gold-400/10 mb-10" />
                  <div className="bg-forest-950/50 rounded-2xl p-6 border border-white/5 backdrop-blur-sm">
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">Note on Firearms</p>
                    <p className="text-sm leading-relaxed text-gray-500 font-medium">
                       Visitor firearms licenses require 4 months processing. Rifle hire is available for NZD 100/day.
                    </p>
                  </div>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
