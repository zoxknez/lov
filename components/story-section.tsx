'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { MousePointer2, ShieldCheck, Award } from 'lucide-react';

export default function StorySection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const founders = [
    {
      name: 'Alex Sipka',
      role: 'Co-founder',
      origin: 'Serbia',
      experience: '40 years',
      description: 'Veteran hunter whose decades in the field shaped the standards and pace behind the Kaimanawa program.',
      image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
    },
    {
      name: 'Artem Prikazov',
      role: 'Co-founder',
      origin: 'Russia',
      experience: '15 years',
      description: 'Internationally travelled hunter focused on the quality of New Zealand game and the experience around it.',
      image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
    },
    {
      name: 'Vuk Mijatovic',
      role: 'Guide',
      origin: 'New Zealand field operations',
      experience: '35+ years',
      description: 'Lead field guide with deep knowledge of New Zealand terrain, animal behaviour, and hunt execution.',
      image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
    },
  ];

  return (
    <section id="story" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Background Decorative Elements */}
      <div className="absolute left-0 top-0 h-full w-full pointer-events-none overflow-hidden opacity-20">
        <div className="absolute -left-[10%] top-[10%] h-[500px] w-[500px] rounded-full bg-gold-400/5 blur-[120px]" />
        <div className="absolute -right-[10%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-forest-600/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">The Legacy</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-8xl">
            Our Story
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl">
            Founded in 2025 to introduce international hunters to the quality of New Zealand trophies and the raw majesty of its wild landscapes.
          </p>
        </div>

        {/* Mission Statement / Feature Box */}
        <div className={`mb-32 transform transition-all duration-1000 delay-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-forest-900/40 p-1 font-sans shadow-panel backdrop-blur-md">
             <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-forest-600/5" />
             <div className="relative flex flex-col items-center justify-center p-8 md:p-16">
                <span className="mb-6 inline-block rounded-full bg-gold-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold-200 border border-gold-500/20">
                  Established 2025
                </span>
                <p className="max-w-4xl text-center text-xl font-light leading-relaxed text-gray-200 md:text-3xl">
                  "Kaimanawa Trophy Safaris was born from a shared passion for the New Zealand wilderness. Our aim is simple: to create a <span className="text-gold-300 font-medium">properly hosted</span> hunting program that feels authentic in the field and <span className="text-gold-300 font-medium">meticulously polished</span> in the planning."
                </p>
                <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm uppercase tracking-widest text-gold-400/60">
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-gold-400" />
                    <span>Artem Prikazov</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-gold-400" />
                    <span>Alex Sipka</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-1 rounded-full bg-gold-400" />
                    <span>Vuk Mijatovic</span>
                  </div>
                </div>
                <p className="mt-8 font-display text-2xl italic text-gold-200/80">
                  Combined Experience: Well over 90 years in the field.
                </p>
             </div>
          </div>
        </div>

        {/* Core Values / Standards */}
        <div className="mb-32 grid gap-10 md:grid-cols-2">
          <div className={`group relative rounded-2xl border border-white/5 bg-forest-900/30 p-10 transition-all duration-500 hover:border-gold-500/20 hover:bg-forest-900/50 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 transition-transform duration-500 group-hover:scale-110">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h3 className="mb-4 font-display text-3xl font-bold text-white">Fair Chase Hunting</h3>
            <p className="text-lg leading-relaxed text-gray-400 group-hover:text-gray-300">
              The hunt should still feel like a real hunt: earned, physical, respectful of the animal, and true to the rugged New Zealand backcountry. We believe in the ethics of the pursuit.
            </p>
            <div className="absolute right-6 top-6 opacity-0 transition-opacity duration-500 group-hover:opacity-20">
               <span className="font-display text-7xl font-bold text-gold-400">01</span>
            </div>
          </div>

          <div className={`group relative rounded-2xl border border-white/5 bg-forest-900/30 p-10 transition-all duration-500 hover:border-gold-500/20 hover:bg-forest-900/50 delay-200 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/10 text-gold-400 transition-transform duration-500 group-hover:scale-110">
              <Award className="h-8 w-8" />
            </div>
            <h3 className="mb-4 font-display text-3xl font-bold text-white">Ethical Standards</h3>
            <p className="text-lg leading-relaxed text-gray-400 group-hover:text-gray-300">
              Shot selection, recovery, camp conduct, and deep respect for the land are our baseline. We don't just hunt; we steward the tradition for future generations.
            </p>
            <div className="absolute right-6 top-6 opacity-0 transition-opacity duration-500 group-hover:opacity-20">
               <span className="font-display text-7xl font-bold text-gold-400">02</span>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="relative">
          <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-400">Our Experts</p>
              <h3 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">Meet The Team</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-gold-500/20 to-transparent hidden md:block mx-10" />
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {founders.map((founder, idx) => (
              <div 
                key={founder.name} 
                className={`group relative overflow-hidden rounded-2xl border border-white/5 bg-forest-900/20 transition-all duration-700 hover:border-gold-500/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                style={{ transitionDelay: `${600 + idx * 150}ms` }}
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={getBlobAssetUrl(founder.image)}
                    alt={founder.name}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  {/* Subtle Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-80" />
                  <div className="absolute inset-0 bg-gold-900/10 opacity-0 transition-opacity duration-500 group-hover:opacity-40" />
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-8 transition-transform duration-500 group-hover:-translate-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">{founder.role}</p>
                    <h4 className="mt-2 font-display text-3xl font-bold text-white">{founder.name}</h4>
                    <p className="mt-1 text-sm text-gold-400/80">{founder.experience} experience</p>
                  </div>
                </div>
                
                <div className="relative p-8 pt-6">
                  <div className="mb-4 h-px w-12 bg-gold-500/30 transition-all duration-500 group-hover:w-full" />
                  <p className="text-sm uppercase tracking-widest text-[#d9b167] opacity-60 mb-2">{founder.origin}</p>
                  <p className="text-base leading-relaxed text-gray-400 transition-colors duration-300 group-hover:text-gray-200">
                    {founder.description}
                  </p>
                </div>
                
                {/* Decorative border glow on hover */}
                <div className="absolute inset-0 border border-gold-400/0 transition-all duration-500 group-hover:border-gold-400/20 rounded-2xl pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
