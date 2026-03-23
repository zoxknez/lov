'use client';

import Image from 'next/image';
import { MapPin, Wifi, Utensils, Users } from 'lucide-react';
import { getBlobAssetUrl } from '@/lib/blob-asset';

export default function AccommodationSection() {
  const lodges = [
    {
      name: 'Ohakune Lodge Base',
      location: 'Ohakune, North Island',
      description: 'A comfortable base for Central North Island hunting programs and the hosted rhythm of the trip.',
      features: [
        'Private bedrooms',
        'Bathroom facilities for the group',
        'Heating and fireplace',
        'Wi-Fi available',
        'Chef-prepared meals',
        'Comfortable communal lounge',
      ],
      image: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
      capacity: '2-4 hunters',
    },
    {
      name: 'Remote Alpine Camps',
      location: 'South Island alpine country',
      description: 'Simple field camps used when the hunt calls for more reach into serious mountain country.',
      features: [
        'Camp living shaped by the hunt',
        'No signal in many remote areas',
        'Weather-dependent mountain access',
        'Simple but comfortable field setup',
        'Early starts and long alpine days',
        'Remote backcountry atmosphere',
      ],
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      capacity: '1-2 hunters per camp',
    },
    {
      name: 'Hotel Add-Ons By Arrangement',
      location: 'Regional centres and gateway cities',
      description: 'Extra hotel nights can be added for clients combining hunting with sightseeing or flight connections.',
      features: [
        'Useful for arrival and departure nights',
        'Can be added around North Island touring',
        'Booked to suit the final itinerary',
        'Flexible around species mix and travel route',
        'A good option for non-hunting companions',
      ],
      image: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg',
      capacity: 'As required',
    },
  ];

  const amenities = [
    {
      icon: Utensils,
      title: 'Hosted Dining',
      description: 'Chef-prepared lodge meals tailored to the group, the hunting schedule, and any dietary preferences.',
    },
    {
      icon: Wifi,
      title: 'Modern Connectivity',
      description: 'The lodge has Wi-Fi for international coordination, while remote camps often mean a full reset from signal.',
    },
    {
      icon: MapPin,
      title: 'Practical Basing',
      description: 'Ohakune works well as a hosted North Island base, with alpine access planned separately when the hunt shifts south.',
    },
    {
      icon: Users,
      title: 'Intimate Groups',
      description: 'Trips are usually run for 2-4 hunters so the program stays personal and flexible.',
    },
  ];

  return (
    <section id="stay" className="relative bg-gray-950 py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">Where You Rest</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Accommodation
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Comfortable lodge hosting where it makes sense, with remote camps only when the hunt really needs extra reach.
          </p>
        </div>

        <div className="mb-20 space-y-12">
          {lodges.map((lodge) => (
            <div
              key={lodge.name}
              className="group grid gap-8 overflow-hidden rounded-lg border border-white/10 bg-gradient-to-r from-gray-900/40 to-gray-950 backdrop-blur md:grid-cols-2"
            >
              <div className="relative h-64 w-full overflow-hidden bg-gray-800 md:h-auto">
                <Image
                  src={getBlobAssetUrl(lodge.image)}
                  alt={lodge.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-950 to-transparent" />
              </div>

              <div className="flex flex-col justify-center p-8 md:p-12">
                <h3 className="font-display text-2xl font-bold text-white md:text-3xl">{lodge.name}</h3>
                <p className="mt-2 flex items-center gap-2 text-gray-400">
                  <MapPin className="h-4 w-4 text-[#d9b167]" />
                  {lodge.location}
                </p>

                <p className="mt-4 leading-relaxed text-gray-300">{lodge.description}</p>

                <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
                  <p className="font-display text-sm font-semibold uppercase text-[#d9b167]">Features</p>
                  <ul className="space-y-2">
                    {lodge.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#d9b167]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="mt-6 text-sm font-semibold text-white">Group Size: {lodge.capacity}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-20">
          <h3 className="mb-12 text-center font-display text-3xl font-bold text-white">What The Stay Feels Like</h3>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {amenities.map((amenity) => {
              const Icon = amenity.icon;
              return (
                <div key={amenity.title} className="rounded-lg border border-white/10 bg-white/5 p-6 backdrop-blur">
                  <Icon className="h-8 w-8 text-[#d9b167]" />
                  <h4 className="mt-4 font-display text-lg font-bold text-white">{amenity.title}</h4>
                  <p className="mt-2 text-sm text-gray-400">{amenity.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-lg border border-[#d9b167]/20 bg-gradient-to-r from-[#d9b167]/10 to-transparent p-8 md:p-12">
          <h3 className="mb-4 font-display text-2xl font-bold text-white">Dining</h3>
          <p className="leading-relaxed text-gray-300">
            Meals at the lodge are prepared around the rhythm of the hunt, not the other way around. The goal is simple:
            excellent food, reliable hospitality, and a stay that feels relaxed after long days in the bush or the hills.
          </p>
        </div>
      </div>
    </section>
  );
}
