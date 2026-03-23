'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, Globe } from 'lucide-react';
import TextReveal from '@/components/text-reveal';
import MagneticButton from '@/components/magnetic-button';

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

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

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

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
    <section id="contact" className="relative overflow-hidden bg-forest-950 py-24 md:py-40 font-sans">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-forest-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">
             <TextReveal>Journey Start</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-9xl uppercase tracking-tighter">
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
          {/* Form Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-3"
          >
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-forest-900/30 p-12 backdrop-blur-xl shadow-premium">
              <div className="flex items-center gap-6 mb-12">
                 <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
                    <MessageSquare className="h-5 w-5" />
                 </div>
                 <h3 className="font-display text-4xl font-bold text-white uppercase tracking-tighter">Direct Inquiry</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Smith"
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder-gray-600 transition-all focus:border-gold-400/40 focus:outline-none focus:ring-8 focus:ring-gold-400/5"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder-gray-600 transition-all focus:border-gold-400/40 focus:outline-none focus:ring-8 focus:ring-gold-400/5"
                    />
                  </div>
                </div>

                <div className="grid gap-10 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60 ml-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1..."
                      className="w-full rounded-2xl border border-white/5 bg-white/[0.03] px-8 py-5 text-white placeholder-gray-600 transition-all focus:border-gold-400/40 focus:outline-none focus:ring-8 focus:ring-gold-400/5"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60 ml-1">Inquiry Type</label>
                    <div className="relative">
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full appearance-none rounded-2xl border border-white/5 bg-white/[0.03] px-8 py-5 text-white transition-all focus:border-gold-400/40 focus:outline-none focus:ring-8 focus:ring-gold-400/5 cursor-pointer"
                      >
                        <option value="" disabled className="bg-forest-950">Select Subject</option>
                        <option value="booking" className="bg-forest-950">Book a Hunt</option>
                        <option value="species-pricing" className="bg-forest-950">Species & Pricing</option>
                        <option value="travel" className="bg-forest-950">Travel Logistics</option>
                        <option value="other" className="bg-forest-950">General Inquiry</option>
                      </select>
                      <div className="pointer-events-none absolute right-6 top-1/2 -translate-y-1/2">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold-400" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your trophy goals and preferred dates..."
                    rows={6}
                    className="w-full rounded-3xl border border-white/5 bg-white/[0.03] px-8 py-6 text-white placeholder-gray-600 transition-all focus:border-gold-400/40 focus:outline-none focus:ring-8 focus:ring-gold-400/5 resize-none"
                  />
                </div>

                <MagneticButton
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-2xl bg-gold-400 py-6 font-bold uppercase tracking-[0.3em] text-[11px] text-black transition-all hover:bg-gold-300 disabled:opacity-50 shadow-glow-gold"
                >
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  {submitStatus === 'loading' ? 'Encrypting...' : 'Dispatch Inquiry'}
                </MagneticButton>

                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 rounded-2xl bg-gold-400/10 p-5 border border-gold-400/20 shadow-glow-gold"
                  >
                     <div className="h-8 w-8 flex items-center justify-center rounded-lg bg-gold-400/20 text-gold-400">
                        <ShieldCheck className="h-4 w-4" />
                     </div>
                     <p className="text-xs font-bold text-gold-200 uppercase tracking-widest">Message dispatched. We&apos;ll be in touch within 24h.</p>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Info Column */}
          <div className="lg:col-span-2 space-y-10">
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="rounded-[2.5rem] border border-white/5 bg-forest-900/10 p-12 transition-all hover:border-white/10 shadow-premium"
            >
               <div className="flex items-center gap-6 mb-8">
                  <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gold-400/10 text-gold-400">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-white uppercase tracking-tight">Response Time</h4>
               </div>
               <p className="font-sans text-gray-400 leading-relaxed italic">
                  &quot;Field operations are usually out of reach, but we keep the Ohakune base connected. Whether it&apos;s technical logistics or a simple arrival check, we&apos;re here to manage the details.&quot;
               </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="group relative rounded-[3rem] border border-gold-400/10 bg-gold-400/5 p-12 overflow-hidden shadow-glow-gold"
            >
               <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Globe className="h-32 w-32 text-gold-400" />
               </div>
               
               <div className="relative">
                  <div className="flex items-center gap-6 mb-8">
                     <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gold-400/20 text-gold-400">
                        <Globe className="h-6 w-6" />
                     </div>
                     <h4 className="font-display text-2xl font-bold text-white uppercase tracking-tight">International</h4>
                  </div>
                  <p className="font-sans text-gray-400 leading-relaxed text-base mb-8 italic">
                     Most guests arrive via Auckland (AKL). We coordinate all domestic travel, firearms paperwork, and trophy logistics from that point onward.
                  </p>
                  <div className="h-px w-full bg-gold-400/20 mb-8" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">Note on Firearms</p>
                  <p className="text-xs leading-relaxed text-gray-500 font-medium">
                     Visitor firearms licenses require 4 months processing. Rifle hire is available for NZD 100/day.
                  </p>
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
