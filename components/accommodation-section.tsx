'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { MapPin, Wifi, Utensils, Users, Home, Mountain, Bed } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

export default function AccommodationSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const lodges = [
    {
      name: 'Ohakune Lodge Base',
      location: 'Ohakune, North Island',
      description: 'A comfortable base for Central North Island hunting programs and the hosted rhythm of the trip.',
      features: [
        'Private bedrooms',
        'Heating and fireplace',
        'Chef-prepared meals',
        'Communal lounge',
      ],
      image: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
      capacity: '2-4 hunters',
      type: 'Primary Base',
    },
    {
      name: 'Remote Alpine Camps',
      location: 'South Island alpine country',
      description: 'Simple field camps used when the hunt calls for more reach into serious mountain country.',
      features: [
        'Backcountry atmosphere',
        'Full mountain immersion',
        'Weather-led access',
        'Hunt-focused living',
      ],
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      capacity: '1-2 hunters',
      type: 'Backcountry',
    },
  ];

  const amenities = [
    {
      icon: Utensils,
      title: 'Hosted Dining',
      description: 'Chef-prepared meals tailored to the group, the hunting schedule, and any dietary preferences.',
    },
    {
      icon: Wifi,
      title: 'Connectivity',
      description: 'Lodge Wi-Fi for international coordination, while camps offer a full reset from signal.',
    },
    {
      icon: MapPin,
      title: 'Strategic Basing',
      description: 'Ohakune works as a perfect North Island base, with alpine access planned separately.',
    },
    {
      icon: Users,
      title: 'Personal Hosting',
      description: 'Trips are usually run for 2-4 hunters so the program stays personal and flexible.',
    },
  ];

  return (
    <section id="stay" className="relative overflow-hidden bg-forest-950 py-24 md:py-40">
      {/* Background radial glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className={`mb-20 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <p className="text-[13px] uppercase tracking-[0.3em] text-gold-300">Where You Rest</p>
          <h2 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl">
            Lodge & Camps
          </h2>
          <div className="mx-auto mt-6 h-px w-24 bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
          <p className="mx-auto mt-8 max-w-2xl font-sans text-lg leading-relaxed text-gray-400 md:text-xl">
            Comfortable lodge hosting where it makes sense, with remote camps only when the hunt really needs extra reach.
          </p>
        </div>

        {/* Lodges Display */}
        <div className="mb-32 space-y-24">
          {lodges.map((lodge, idx) => (
            <div
              key={lodge.name}
              className={`group relative grid gap-12 items-center md:grid-cols-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'} transition-all duration-1000`}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              <div className={`relative aspect-video w-full overflow-hidden rounded-3xl border border-white/10 shadow-panel transition-transform duration-700 group-hover:scale-[1.02] ${idx % 2 === 1 ? 'md:order-2' : ''}`}>
                <Image
                  src={getBlobAssetUrl(lodge.image)}
                  alt={lodge.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                <div className="absolute top-6 left-6">
                   <div className="rounded-full bg-forest-950/60 px-4 py-1.5 backdrop-blur-md border border-white/10">
                      <p className="text-[10px] font-bold tracking-widest text-gold-300 uppercase">{lodge.type}</p>
                   </div>
                </div>
              </div>

              <div className={`p-4 ${idx % 2 === 1 ? 'md:order-1 md:text-right' : ''}`}>
                <div className={`flex items-center gap-2 text-gold-400 mb-4 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-widest">{lodge.location}</span>
                </div>
                <h3 className="font-display text-4xl font-bold text-white md:text-5xl leading-tight mb-6">{lodge.name}</h3>
                <p className="font-sans text-lg leading-relaxed text-gray-400 mb-8 max-w-xl mx-auto md:mx-0">
                   {lodge.description}
                </p>
                
                <div className={`flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8 ${idx % 2 === 1 ? 'justify-end text-right' : ''}`}>
                   {lodge.features.map((feature) => (
                     <div key={feature} className="flex items-center gap-3">
                        <div className="h-1.5 w-1.5 rounded-full bg-gold-500/40" />
                        <span className="text-sm font-medium text-gray-300 uppercase tracking-wide">{feature}</span>
                     </div>
                   ))}
                </div>
                
                <div className={`mt-10 flex items-center gap-4 ${idx % 2 === 1 ? 'justify-end' : ''}`}>
                   <div className="h-px w-12 bg-gold-500/20" />
                   <p className="text-xs font-bold tracking-widest text-gold-200">SPACE: {lodge.capacity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Amenities Row */}
        <div className="mb-32 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity, idx) => {
            const Icon = amenity.icon;
            return (
              <div 
                key={amenity.title} 
                className={`group relative rounded-2xl border border-white/5 bg-forest-900/10 p-8 transition-all duration-500 hover:border-gold-500/20 hover:bg-forest-900/20 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
                style={{ transitionDelay: `${800 + idx * 100}ms` }}
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gold-500/5 text-gold-400 border border-gold-500/10 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-display text-xl font-bold text-white mb-3 tracking-tight">{amenity.title}</h4>
                <p className="text-sm leading-relaxed text-gray-400 group-hover:text-gray-300 transition-colors">{amenity.description}</p>
              </div>
            );
          })}
        </div>

        {/* Dining Accent */}
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-forest-900/40 p-1 font-sans shadow-panel">
             <div className="absolute inset-0 bg-gradient-to-br from-gold-500/5 via-transparent to-forest-600/5" />
             <div className="relative flex flex-col items-center justify-center p-12 md:p-20 text-center">
                <Utensils className="h-12 w-12 text-gold-400 mb-8 opacity-40" />
                <h3 className="mb-6 font-display text-3xl font-bold text-white md:text-4xl">Wilderness Dining</h3>
                <p className="max-w-4xl text-lg italic leading-relaxed text-gray-300">
                  "Meals at the lodge are prepared around the rhythm of the hunt, not the other way around. The goal is simple: excellent food, reliable hospitality, and a stay that feels relaxed after long days in the bush or the hills."
                </p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
