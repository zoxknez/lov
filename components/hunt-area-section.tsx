'use client';

import { useEffect, useState } from 'react';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { MapPin, Compass, Mountain, Wind } from 'lucide-react';

export default function HuntAreaSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const regions = [
    {
      name: 'North Island | Central Plateau',
      location: 'Taupo, Turangi, and Kaimanawa country',
      description:
        'Native bush, river valleys, and rugged hill country. This is the heart of the Kaimanawa sika story and a strong region for red deer, fallow deer, and selected rusa programs.',
      species: ['Red Deer', 'Sika Deer', 'Fallow Deer', 'Rusa Deer'],
      terrain: ['Dense native bush', 'River valleys', 'Hill country'],
      accessNote: 'Main lodge base in Ohakune, with daily logistics built around the specific hunt block.',
      image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua.jpg',
    },
    {
      name: 'South Island | Southern Alps',
      location: 'Alpine basins and remote backcountry',
      description:
        'Steep basins, exposed faces, and remote terrain for Himalayan tahr, chamois, and selected mountain red deer programs.',
      species: ['Himalayan Tahr', 'Chamois', 'Red Deer'],
      terrain: ['High alpine basins', 'Steep river valleys', 'Rocky faces'],
      accessNote: 'Helicopter support is utilized where terrain and weather make it the right tool for the hunt.',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
    },
  ];

  const seasonWindows = [
    {
      window: 'Mar - Apr',
      title: 'Red Deer Roar',
      description: 'The classic autumn window for mature red stags. One of our most popular travel periods.',
    },
    {
      window: 'Mar - May',
      title: 'Sika Rut',
      description: 'Prime sika period tied closely to the Kaimanawa story and the North Island program.',
    },
    {
      window: 'Apr - May',
      title: 'Fallow Rut',
      description: 'Best timing for selective fallow trophy hunting in suitable open country.',
    },
    {
      window: 'May - Jun',
      title: 'Chamois Focus',
      description: 'A favoured buck period in alpine country, with weather shaping the daily itinerary.',
    },
    {
      window: 'May - Jul',
      title: 'Tahr Rut',
      description: 'The main trophy period for bull tahr, when winter coats are at their most impressive.',
    },
    {
      window: 'Jul - Aug',
      title: 'Rusa Program',
      description: 'A dedicated late-winter North Island option, ideal as a final season hunt.',
    },
  ];

  return (
    <section id="hunt" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Background Decorative Accent */}
      <div className="absolute right-0 top-1/4 h-[600px] w-[600px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">The Territory</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Where You Hunt
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mx-auto mt-8 max-w-3xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl">
            Our programs are built around the right country first, matched to the species, the seasonal window, and the pace your group wants in the field.
          </p>
        </div>

        {/* Regions Grid */}
        <div className="mb-32 grid gap-12 md:grid-cols-2">
          {regions.map((region, idx) => (
            <div
              key={region.name}
              className={`group relative overflow-hidden rounded-3xl border border-white/5 bg-forest-900/20 transition-all duration-1000 hover:border-gold-500/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={getBlobAssetUrl(region.image)}
                  alt={region.name}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="flex items-center gap-2 text-gold-300 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-semibold uppercase tracking-widest">{region.location}</span>
                  </div>
                  <h4 className="font-display text-4xl font-bold text-white leading-tight">{region.name}</h4>
                </div>
              </div>

              <div className="p-8">
                <p className="mb-8 font-sans text-lg leading-relaxed text-gray-400 min-h-[4rem] group-hover:text-gray-300 transition-colors">
                  {region.description}
                </p>

                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-8">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400/60 mb-4">Core Species</p>
                    <div className="flex flex-wrap gap-2">
                      {region.species.map((sp) => (
                        <span key={sp} className="text-sm font-medium text-gray-300">
                          {sp} <span className="text-gold-500/40 ml-1">•</span>
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400/60 mb-4">Prime Terrain</p>
                    <div className="flex flex-wrap gap-2">
                      {region.terrain.map((t) => (
                        <span key={t} className="text-sm font-medium text-gray-300">
                          {t} <span className="text-forest-400/40 ml-1">•</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 rounded-xl bg-gold-500/5 p-4 border border-gold-500/10">
                  <Compass className="h-5 w-5 text-gold-400 flex-shrink-0" />
                  <p className="text-xs leading-relaxed text-gold-200/70">
                    <span className="font-semibold text-gold-300">Access Note:</span> {region.accessNote}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Access Philosophy */}
        <div className={`mb-32 grid gap-10 md:grid-cols-3 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} transition-all duration-1000 delay-500`}>
           <div className="flex flex-col items-center text-center p-6 border-r border-white/5 last:border-0">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-900/50 text-gold-400 border border-white/5 shadow-glow">
                <Wind className="h-8 w-8" />
              </div>
              <h5 className="font-display text-xl font-bold text-white mb-3">Versatile Access</h5>
              <p className="text-sm text-gray-400 leading-relaxed">Foot travel, 4WD exploration, and helicopter support where the hunt requires it.</p>
           </div>
           <div className="flex flex-col items-center text-center p-6 border-r border-white/5 last:border-0">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-900/50 text-gold-400 border border-white/5 shadow-glow">
                <Mountain className="h-8 w-8" />
              </div>
              <h5 className="font-display text-xl font-bold text-white mb-3">Diverse Country</h5>
              <p className="text-sm text-gray-400 leading-relaxed">Integrated programs across both private and public land based on species and season.</p>
           </div>
           <div className="flex flex-col items-center text-center p-6 border-r border-white/5 last:border-0">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-forest-900/50 text-gold-400 border border-white/5 shadow-glow">
                <Compass className="h-8 w-8" />
              </div>
              <h5 className="font-display text-xl font-bold text-white mb-3">Remote Camps</h5>
              <p className="text-sm text-gray-400 leading-relaxed">Authentic alpine experiences when the hunt pushes beyond our comfortable lodge base.</p>
           </div>
        </div>

        {/* Season Windows */}
        <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="mb-12 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gold-400">Seasonal Rhythms</p>
              <h3 className="mt-2 font-display text-4xl font-bold text-white md:text-5xl">Season Windows</h3>
            </div>
            <p className="max-w-md text-sm text-gray-500 text-right">
              The main travel window runs from March through July, with dedicated rusa programs usually sitting later in winter.
            </p>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {seasonWindows.map((item, idx) => (
              <div 
                key={item.title} 
                className="group relative overflow-hidden rounded-2xl border border-white/5 bg-forest-900/20 p-8 transition-all duration-500 hover:border-gold-500/20 hover:bg-forest-900/40"
              >
                <div className="flex justify-between items-start mb-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-400/80">{item.window}</p>
                  <div className="h-px w-8 bg-gold-500/20 group-hover:w-16 transition-all duration-500" />
                </div>
                <h4 className="font-display text-2xl font-bold text-white group-hover:text-gold-100 transition-colors uppercase tracking-tight">{item.title}</h4>
                <p className="mt-4 text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
