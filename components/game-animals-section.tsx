'use client';

import Image from 'next/image';
import { getBlobAssetUrl } from '@/lib/blob-asset';

export default function GameAnimalsSection() {
  const animals = [
    {
      name: 'Red Deer',
      scientific: 'Cervus elaphus',
      description: 'Classic New Zealand roar hunting for mature stags in mixed bush, hill country, and basin-edge terrain.',
      trophy: 'Typical trophy target: 350-400 SCI points',
      season: 'Late March to April',
      duration: '2-3 days',
      image: '/media/hunting%20area%20%20and%20deers/Red%20Deer%20Stag.jpg',
      characteristics: ['Roar-led autumn timing', 'Mature stag focus', 'Mixed private and public access'],
    },
    {
      name: 'Fallow Deer',
      scientific: 'Dama dama',
      description: 'Selective autumn hunting for palmate bucks on suitable blocks and open country by arrangement.',
      trophy: 'Trophy judged by shape, maturity, and palm development',
      season: 'April to mid-May',
      duration: '2-3 days',
      image: '/media/hunting%20area%20%20and%20deers/Fellow%20%20deer.jpg',
      characteristics: ['Autumn rut focus', 'Selective trophy standard', 'Private-country emphasis'],
    },
    {
      name: 'Rusa Deer',
      scientific: 'Rusa timorensis',
      description: 'A dedicated North Island option usually planned separately from autumn deer and alpine programs.',
      trophy: 'Late-winter trophy program by arrangement',
      season: 'July to August',
      duration: '1-2 days',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg',
      characteristics: ['Later-winter itinerary', 'Dense cover habitat', 'Specialist add-on species'],
    },
    {
      name: 'Sika Deer',
      scientific: 'Cervus nippon',
      description: 'The signature Kaimanawa species: elusive bush deer prized for their behaviour, voice, and trophy quality.',
      trophy: 'Typical trophy target: 160-200 Douglas points',
      season: 'Late March to early May',
      duration: '1-2 days',
      image: '/media/hunting%20area%20%20and%20deers/Sika%20%20deer%20Stag.jpg',
      characteristics: ['Kaimanawa story species', 'Dense bush stalking', 'Rut-driven autumn timing'],
    },
    {
      name: 'Arapawa Ram',
      scientific: 'Ovis aries',
      description: 'A specialist guided add-on for hunters wanting a distinctive New Zealand feral sheep trophy by arrangement.',
      trophy: 'Specialist trophy option',
      season: 'By arrangement',
      duration: 'By arrangement',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg',
      characteristics: ['Guided-access only', 'Specialist add-on', 'Flexible timing depending on access'],
    },
    {
      name: 'Chamois',
      scientific: 'Rupicapra rupicapra',
      description: 'A true mountain hunt for a wary alpine species that rewards patience, glassing, and careful movement in exposed country.',
      trophy: 'Typical trophy target: 8-10 inches',
      season: 'Year-round; favoured May to June',
      duration: 'Multi-day alpine hunt',
      image: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg',
      characteristics: ['Favoured rut period in May-June', 'Steep alpine faces', 'Long glassing sessions'],
    },
    {
      name: 'Himalayan Tahr',
      scientific: 'Hemitragus jemlahicus',
      description: 'One of New Zealand\'s great alpine trophies, pursued in steep Southern Alps country where access and weather shape every day.',
      trophy: 'Typical trophy target: 10-13 inches',
      season: 'Year-round; rut late May to mid-July',
      duration: 'Multi-day alpine hunt',
      image: '/media/hunting%20area%20%20and%20deers/Hunting%20%20area%20%20near%20Rotorua%202%20jpg.jpg',
      characteristics: ['Winter coat trophy period', 'Remote mountain terrain', 'Weather-led planning'],
    },
  ];

  return (
    <section id="animals" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">Premium Trophies</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Species Available
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Trophy programs built around the right terrain, the right seasonal window, and the kind of hunt you want to pursue.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {animals.map((animal) => (
            <div
              key={animal.name}
              className="group overflow-hidden rounded-lg border border-white/10 bg-gradient-to-br from-gray-900/40 to-gray-950 backdrop-blur transition-all duration-300 hover:border-[#d9b167]/50"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-800">
                <Image
                  src={getBlobAssetUrl(animal.image)}
                  alt={animal.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="font-display text-2xl font-bold text-white">{animal.name}</h3>
                  <p className="text-xs italic text-gray-400">{animal.scientific}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="mb-4 leading-relaxed text-gray-300">{animal.description}</p>

                <div className="mb-4 space-y-2 border-t border-white/10 pt-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Typical Trophy</p>
                    <p className="mt-1 font-semibold text-[#d9b167]">{animal.trophy}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Prime Window</p>
                    <p className="mt-1 font-semibold text-white">{animal.season}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-gray-500">Typical Hunt</p>
                    <p className="mt-1 font-semibold text-white">{animal.duration}</p>
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/10 pt-4">
                  {animal.characteristics.map((char) => (
                    <div key={char} className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#d9b167]" />
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 rounded-lg border border-[#d9b167]/20 bg-gradient-to-r from-[#d9b167]/10 via-transparent to-transparent p-8 md:p-12">
          <p className="text-center text-lg leading-relaxed text-gray-300">
            All hunts follow fair-chase principles. Multiple-species itineraries can be built by arrangement, with the final
            program shaped by trophy goals, seasonal timing, travel dates, and the country best suited to the species.
          </p>
        </div>
      </div>
    </section>
  );
}
