'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

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
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, send to your backend
      // const response = await fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) });

      console.log('Form submitted:', formData);
      setSubmitStatus('success');

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      });

      // Reset status after 5 seconds
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
      description: 'WhatsApp-friendly for international enquiries',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'hunting@kaimanawasafaris.com',
      description: 'Preferred contact method',
    },
    {
      icon: MapPin,
      title: 'Base',
      details: 'Ohakune, New Zealand',
      description: 'North Island lodge base with wider hunt logistics by itinerary',
    },
  ];

  return (
    <section id="contact" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">Get In Touch</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Contact Us
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Start planning your New Zealand hunting adventure today
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="mb-20 grid gap-8 md:grid-cols-3">
          {contactInfo.map((info) => {
            const Icon = info.icon;
            return (
              <div key={info.title} className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
                <Icon className="h-8 w-8 text-[#d9b167]" />
                <h3 className="mt-4 font-display text-lg font-bold text-white">{info.title}</h3>
                <p className="mt-2 font-semibold text-[#d9b167]">{info.details}</p>
                <p className="mt-1 text-sm text-gray-400">{info.description}</p>
              </div>
            );
          })}
        </div>

        {/* Contact Form */}
        <div className="grid gap-12 md:grid-cols-2">
          {/* Form */}
          <div className="rounded-lg border border-white/10 bg-gradient-to-br from-gray-900/40 to-gray-950 p-8 backdrop-blur">
            <h3 className="mb-6 font-display text-2xl font-bold text-white">Send Inquiry</h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-white">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your name"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-[#d9b167]/50 focus:outline-none focus:ring-1 focus:ring-[#d9b167]/20"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-white">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-[#d9b167]/50 focus:outline-none focus:ring-1 focus:ring-[#d9b167]/20"
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-white">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+64..."
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-[#d9b167]/50 focus:outline-none focus:ring-1 focus:ring-[#d9b167]/20"
                />
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-white">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:border-[#d9b167]/50 focus:outline-none focus:ring-1 focus:ring-[#d9b167]/20"
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="booking">Book a Hunt</option>
                  <option value="species-pricing">Species & Pricing</option>
                  <option value="travel-firearms">Travel & Firearms</option>
                  <option value="inquiry">General Inquiry</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-white">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  placeholder="Your message..."
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-600 transition-all focus:border-[#d9b167]/50 focus:outline-none focus:ring-1 focus:ring-[#d9b167]/20"
                />
              </div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="rounded-lg border border-green-500/30 bg-green-500/10 p-4">
                  <p className="text-sm text-green-400">Message sent successfully! We'll be in touch shortly.</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-4">
                  <p className="text-sm text-red-400">Error sending message. Please try again.</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitStatus === 'loading'}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-[#d9b167] bg-[#d9b167] px-6 py-3 font-semibold text-black transition-all duration-300 hover:bg-[#d9b167]/90 disabled:opacity-50"
              >
                <Send className="h-5 w-5" />
                {submitStatus === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>

          {/* Info & Map */}
          <div className="space-y-8">
            {/* Info Box */}
            <div className="rounded-lg border border-[#d9b167]/20 bg-gradient-to-r from-[#d9b167]/10 to-transparent p-8">
              <h3 className="mb-4 font-display text-2xl font-bold text-white">Response Time</h3>
              <p className="text-gray-400">
                We typically respond to all inquiries within 24 hours. For urgent bookings, please call directly or use WhatsApp.
              </p>
            </div>

            {/* Travel Planning */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="mb-4 font-display text-xl font-bold text-white">Travel Planning</h3>
              <p className="mb-4 text-gray-400">
                International guests usually arrive through Auckland International Airport. Domestic movements are then planned
                around the species mix, the timing of the hunt, and whether the itinerary stays lodge-based or shifts south into
                alpine country.
              </p>
              <p className="text-sm text-[#d9b167]">Preferred contact: email or WhatsApp.</p>
            </div>

            {/* Firearms */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="mb-4 font-display text-xl font-bold text-white">Firearms & Paperwork</h3>
              <p className="mb-4 text-gray-400">
                Hunters may bring their own rifle or arrange one locally. Rifle hire is NZD 100 per day per rifle.
              </p>
              <p className="text-sm text-gray-400">
                If you want to shoot without the immediate supervision of a New Zealand firearms licence holder, current Firearms
                Safety Authority guidance says to submit a visitor&apos;s firearms licence application at least 4 months before arrival.
              </p>
            </div>

            {/* Trophy Export */}
            <div className="rounded-lg border border-white/10 bg-white/5 p-8 backdrop-blur">
              <h3 className="mb-4 font-display text-xl font-bold text-white">Trophies & Export</h3>
              <p className="text-sm text-gray-400">
                Taxidermy and trophy-export services can be arranged after the hunt. Final paperwork depends on your destination
                country and any MPI or CITES requirements that apply to the trophy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
