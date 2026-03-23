'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Award, CheckCircle2, Quote, Trophy } from 'lucide-react';

export default function GuideSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const guide = {
    name: 'Vuk Mijatovic',
    title: 'Professional Hunting Guide',
    country: 'New Zealand Field Operations',
    experience: '35+ years',
    bio: 'With more than 35 years in the field, Vuk Mijatovic brings deep knowledge of New Zealand terrain, animal behaviour, and the patient, fair-chase pace required for successful trophy hunting.',
    image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg', // Placeholder for actual guide photo
    specialties: [
      'Persistence in the field',
      'Sika stalking expertise',
      'Mountain red deer programs',
      'Tahr and chamois mountain hunting',
      'Shot selection discipline',
      'Small-group hunt delivery',
    ],
    philosophy:
      'Every hunt is conducted with respect for the animal, the country, and the traditions of true hunting. The goal is not simply a result, but a result earned through skill, patience, and sound field judgement.',
    notableAchievements: [
      '13.5-inch bull tahr',
      'Multiple gold medal sika deer',
      'Gold medal red stags',
      'Gold medal sambar stag',
    ],
    closing:
      'What Vuk enjoys most about guiding is sharing his passion for hunting and helping clients work toward exceptional trophies in the right way.',
  };

  return (
    <section id="guide" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Background Decorative Element */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] rounded-full bg-gold-400/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">Field Leadership</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Lead Guide
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
        </div>

        {/* Guide Profile */}
        <div className="grid gap-16 md:grid-cols-2 lg:items-center">
          {/* Image Column */}
          <div className={`relative transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-3xl border border-white/10 shadow-panel">
              <Image 
                src={getBlobAssetUrl(guide.image)} 
                alt={guide.name} 
                fill 
                className="object-cover transition-transform duration-1000 hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-transparent opacity-60" />
              
              {/* Experience Badge */}
              <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-forest-900/80 p-4 border border-white/10 backdrop-blur-md">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-gold-400 mb-1">Field Experience</p>
                 <p className="text-2xl font-display font-bold text-white">{guide.experience}</p>
              </div>
            </div>
            
            {/* Decorative Frame */}
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-3xl border-2 border-gold-500/10" />
          </div>

          {/* Content Column */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-gold-400">{guide.country}</p>
              <h3 className="mt-4 font-display text-5xl font-bold text-white leading-tight">{guide.name}</h3>
              <p className="mt-2 text-xl text-gray-400 font-sans italic">{guide.title}</p>
            </div>

            <p className="text-lg leading-relaxed text-gray-300 mb-10 font-sans">
              {guide.bio}
            </p>

            {/* Specialties Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {guide.specialties.map((specialty, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-1 h-4 w-4 text-gold-500/60 flex-shrink-0" />
                  <span className="text-sm font-medium text-gray-400">{specialty}</span>
                </div>
              ))}
            </div>
            
            {/* Philosophy Snippet */}
            <div className="mt-12 relative p-8 rounded-2xl bg-gold-500/5 border border-gold-500/10 italic text-gray-300 font-sans leading-relaxed">
               <Quote className="absolute -top-4 -left-4 h-10 w-10 text-gold-500/20" />
               "{guide.philosophy}"
            </div>
          </div>
        </div>

        {/* Notable Achievements */}
        <div className={`mt-32 transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-400">Track Record</p>
              <h3 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">Notable Results</h3>
            </div>
            <div className="h-px flex-1 bg-gradient-to-r from-gold-500/20 to-transparent hidden md:block mx-10" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {guide.notableAchievements.map((achievement, idx) => (
              <div key={idx} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-forest-900/20 p-8 transition-all duration-500 hover:border-gold-500/30">
                <Trophy className="mb-4 h-6 w-6 text-gold-400 opacity-40 group-hover:opacity-100 transition-opacity" />
                <p className="text-sm font-semibold tracking-wide text-gray-300 group-hover:text-white transition-colors">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Statment */}
        <div className={`mt-24 text-center transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <p className="mx-auto max-w-3xl text-xl font-display italic text-gold-200/60 leading-relaxed px-4">
             "{guide.closing}"
          </p>
        </div>
      </div>
    </section>
  );
}
