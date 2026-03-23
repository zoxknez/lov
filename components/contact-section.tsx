'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck, Globe } from 'lucide-react';

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
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  return (
    <section id="contact" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Background Accents */}
      <div className="absolute top-0 left-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-forest-600/10 blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">Journey Start</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Secure Your Dates
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl">
            Start planning your New Zealand hunting adventure today. We respond to all serious inquiries within 24 hours.
          </p>
        </div>

        {/* Info Cards Row */}
        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {contactInfo.map((info, idx) => {
            const Icon = info.icon;
            return (
              <div 
                key={info.title} 
                className={`group relative rounded-3xl border border-white/5 bg-forest-900/10 p-10 transition-all duration-700 hover:border-gold-500/20 hover:bg-forest-900/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-400/5 text-gold-400 border border-gold-400/10 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2 tracking-tight uppercase">{info.title}</h3>
                <p className="text-lg font-medium text-gold-200/90 mb-2 truncate">{info.details}</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">{info.description}</p>
              </div>
            );
          })}
        </div>

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Form Column */}
          <div className={`lg:col-span-3 transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-forest-900/30 p-10 backdrop-blur-sm shadow-panel">
              <div className="flex items-center gap-4 mb-10">
                 <div className="h-px w-8 bg-gold-400" />
                 <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tight">Direct Inquiry</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. John Smith"
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-all focus:border-gold-500/40 focus:outline-none focus:ring-4 focus:ring-gold-500/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-all focus:border-gold-500/40 focus:outline-none focus:ring-4 focus:ring-gold-500/5"
                    />
                  </div>
                </div>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1..."
                      className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-all focus:border-gold-500/40 focus:outline-none focus:ring-4 focus:ring-gold-500/5"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Inquiry Type</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full appearance-none rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-white transition-all focus:border-gold-500/40 focus:outline-none focus:ring-4 focus:ring-gold-500/5"
                    >
                      <option value="" disabled className="bg-forest-950">Select Subject</option>
                      <option value="booking" className="bg-forest-950">Book a Hunt</option>
                      <option value="species-pricing" className="bg-forest-950">Species & Pricing</option>
                      <option value="travel" className="bg-forest-950">Travel Logistics</option>
                      <option value="other" className="bg-forest-950">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell us about your trophy goals and preferred dates..."
                    rows={6}
                    className="w-full rounded-2xl border border-white/5 bg-white/5 px-6 py-4 text-white placeholder-gray-600 transition-all focus:border-gold-500/40 focus:outline-none focus:ring-4 focus:ring-gold-500/5"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitStatus === 'loading'}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gold-400 px-8 py-5 font-bold uppercase tracking-widest text-black transition-all hover:bg-gold-300 disabled:opacity-50"
                >
                  <Send className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  {submitStatus === 'loading' ? 'Encrypting...' : 'Send Inquiry'}
                </button>

                {submitStatus === 'success' && (
                  <div className="animate-fade-up flex items-center gap-3 rounded-2xl bg-forest-800/50 p-4 border border-gold-500/20">
                     <ShieldCheck className="h-5 w-5 text-gold-400" />
                     <p className="text-sm font-medium text-gold-200">Message dispatched. We will be in touch shortly.</p>
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Info Column */}
          <div className={`lg:col-span-2 space-y-8 transition-all duration-1000 delay-700 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="rounded-[2rem] border border-white/5 bg-forest-900/10 p-10">
               <div className="flex items-center gap-4 mb-6">
                  <Clock className="h-6 w-6 text-gold-400" />
                  <h4 className="font-display text-xl font-bold text-white uppercase tracking-tight">Response Time</h4>
               </div>
               <p className="font-sans text-gray-400 leading-relaxed">
                  We operate personally. Every email and WhatsApp is handled by the lead guide or logistics coordinator. Expect a reply within 24 hours.
               </p>
            </div>

            <div className="rounded-[3rem] border border-gold-400/10 bg-gold-400/5 p-10">
               <div className="flex items-center gap-4 mb-6">
                  <Globe className="h-6 w-6 text-gold-400" />
                  <h4 className="font-display text-xl font-bold text-white uppercase tracking-tight">International Arrival</h4>
               </div>
               <p className="font-sans text-gray-400 leading-relaxed text-sm mb-6">
                  Most guests arrive via Auckland (AKL). We coordinate all domestic travel, firearms paperwork, and trophy logistics from that point onward.
               </p>
               <div className="h-px w-full bg-gold-400/10 mb-6" />
               <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold-500">Note on Firearms</p>
               <p className="mt-2 text-[11px] leading-relaxed text-gray-500">
                  Visitor firearms licenses require 4 months processing. Rifle hire is available for NZD 100/day.
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
