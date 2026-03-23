'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Calendar, Clock, Trophy, Target } from 'lucide-react';

export default function GameAnimalsSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const animals = [
    {
      name: 'Red Deer',
      scientific: 'Cervus elaphus',
      description: 'Classic New Zealand roar hunting for mature stags in mixed bush, hill country, and alpine basins.',
      trophy: '350-400 SCI',
      season: 'Mar - Apr',
      duration: '2-3 days',
      image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
      characteristics: ['Roar-led autumn timing', 'Mature stag focus', 'Mixed hill country'],
    },
    {
      name: 'Sika Deer',
      scientific: 'Cervus nippon',
      description: 'The signature Kaimanawa species: elusive bush deer prized for their voice and trophy quality.',
      trophy: '160-200 Douglas',
      season: 'Mar - May',
      duration: '1-2 days',
      image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
      characteristics: ['Kaimanawa story species', 'Dense bush stalking', 'Rut-driven timing'],
    },
    {
      name: 'Himalayan Tahr',
      scientific: 'Hemitragus jemlahicus',
      description: 'A great alpine trophy, pursued in steep Southern Alps country where access shapes every day.',
      trophy: '10-13 inches',
      season: 'May - Jul',
      duration: 'Alpine hunt',
      image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua%202%20jpg.jpg',
      characteristics: ['Winter coat trophy', 'Remote mountain terrain', 'Alpine basins'],
    },
    {
      name: 'Fallow Deer',
      scientific: 'Dama dama',
      description: 'Selective autumn hunting for palmate bucks on suitable blocks and open country by arrangement.',
      trophy: 'Palmate maturity',
      season: 'Apr - May',
      duration: '2-3 days',
      image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
      characteristics: ['Autumn rut focus', 'Selective trophy standard', 'Private-country'],
    },
    {
      name: 'Chamois',
      scientific: 'Rupicapra rupicapra',
      description: 'A true mountain hunt for a wary alpine species that rewards patience and careful glassing.',
      trophy: '8-10 inches',
      season: 'May - Jun',
      duration: 'Alpine hunt',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      characteristics: ['Favoured rut period', 'Steep alpine faces', 'Long glassing sessions'],
    },
    {
      name: 'Rusa Deer',
      scientific: 'Rusa timorensis',
      description: 'A dedicated North Island option usually planned separately from autumn deer and alpine programs.',
      trophy: 'Late-winter trophy',
      season: 'Jul - Aug',
      duration: '1-2 days',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg',
      characteristics: ['Later-winter itinerary', 'Dense cover habitat', 'Specialist add-on'],
    },
  ];

  return (
    <section id="animals" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Decorative background element */}
      <div className="absolute left-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-forest-600/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">Premium Trophies</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Species Profiles
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl">
            Trophy programs built around the right terrain, the right seasonal window, and the kind of hunt you want to pursue.
          </p>
        </div>

        {/* Animals Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal, idx) => (
            <div
              key={animal.name}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-forest-900/10 transition-all duration-700 hover:border-gold-500/30 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={getBlobAssetUrl(animal.image)}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <div className="absolute top-4 left-4">
                   <div className="rounded-full bg-forest-950/60 px-3 py-1 backdrop-blur-md border border-white/10">
                      <p className="text-[10px] font-medium italic tracking-widest text-gold-200/80 uppercase">{animal.scientific}</p>
                   </div>
                </div>
                <div className="absolute bottom-6 left-8">
                  <h3 className="font-display text-4xl font-bold text-white group-hover:text-gold-200 transition-colors uppercase tracking-tight">{animal.name}</h3>
                </div>
              </div>

              <div className="p-8">
                <p className="mb-8 min-h-[4rem] text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">
                  {animal.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 mb-6">
                  <div className="flex items-center gap-3">
                    <Trophy className="h-4 w-4 text-gold-400 flex-shrink-0" />
                    <div>
                       <p className="text-[9px] uppercase tracking-widest text-gray-500">Trophy</p>
                       <p className="text-xs font-semibold text-gray-200">{animal.trophy}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-gold-400 flex-shrink-0" />
                    <div>
                       <p className="text-[9px] uppercase tracking-widest text-gray-500">Window</p>
                       <p className="text-xs font-semibold text-gray-200">{animal.season}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                  {animal.characteristics.map((char) => (
                    <span key={char} className="rounded-full border border-gold-500/10 bg-gold-500/5 px-3 py-1 text-[10px] font-medium tracking-wide text-gold-300/80">
                      {char}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="absolute top-0 right-0 p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-10 pointer-events-none">
                 <Target className="h-16 w-16 text-gold-400" />
              </div>
            </div>
          ))}
        </div>

        {/* Ethical Footer */}
        <div className={`mt-24 transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative overflow-hidden rounded-3xl border border-gold-500/10 bg-forest-900/40 p-1 font-sans">
             <div className="absolute inset-0 bg-gradient-to-r from-gold-500/5 via-transparent to-forest-600/5" />
             <div className="relative p-10 text-center">
                <p className="mx-auto max-w-4xl text-lg italic leading-relaxed text-gray-300">
                  "All hunts follow fair-chase principles. Multiple-species itineraries can be built by arrangement, with the final program shaped by trophy goals, seasonal timing, and the country best suited to the pursuit."
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
