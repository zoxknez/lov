'use client';

import { useState } from 'react';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';

type GalleryImage = {
  src: string;
  alt: string;
  blobPath?: string;
  fallbackSrc?: string;
};

function buildBlobImageSrc(image: GalleryImage) {
  if (!image.blobPath) {
    return getBlobAssetUrl(image.src);
  }

  const params = new URLSearchParams({
    pathname: image.blobPath,
    fallback: image.fallbackSrc ?? image.src,
  });

  return `/api/blob-image?${params.toString()}`;
}

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const galleries = [
    {
      category: 'trophies',
      title: 'Trophies',
      description: 'Trophy animals and field portraits from guided New Zealand hunts.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red Stag Trophy' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika Deer' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow Deer' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Hunting Area Trophy' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'landscape',
      title: 'Country',
      description: 'Bush country, alpine basins, river valleys, and the wider landscape behind the hunt.',
      images: [
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Alpine Terrain' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Bush Country' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', alt: 'Mountain Views' },
        { src: '/media/hunting area  and deers/main  photo. small size .png', alt: 'Forest Valleys' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'hunting',
      title: 'In The Hunt',
      description: 'Moments from the stalk, glassing sessions, and time spent moving through country.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Successful Hunt' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Stalking' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Field Work' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Trophy Moment' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'lodge',
      title: 'Lodge & Camp Life',
      description: 'Ohakune lodge life, hosted details, and the recovery side of the trip.',
      images: [
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', alt: 'Lodge Interior' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg', alt: 'Dining Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg', alt: 'Living Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg', alt: 'Guest Room' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'recent',
      title: 'Recent Field Photos',
      description: 'Client-provided additions from recent hunts, streamed from Vercel Blob with local fallback.',
      images: gallerySlike.map((image) => ({
        src: image.localSrc,
        fallbackSrc: image.localSrc,
        blobPath: image.blobPath,
        alt: image.alt,
      })),
    },
  ];

  const categories = ['all', 'trophies', 'landscape', 'hunting', 'lodge', 'recent'];

  const displayedGalleries = selectedCategory === 'all' ? galleries : galleries.filter((g) => g.category === selectedCategory);

  return (
    <section id="gallery" className="relative bg-black py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center md:mb-24">
          <p className="text-sm uppercase tracking-[0.2em] text-[#d9b167]">In The Field</p>
          <h2 className="mt-4 font-display text-4xl font-bold uppercase text-white md:text-6xl">
            Gallery
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-400">
            Trophy animals, hunt country, lodge life, and the atmosphere of a real New Zealand hunting trip.
          </p>
        </div>

        <div className="mb-16 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-6 py-2 text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                selectedCategory === cat
                  ? 'border-[#d9b167] bg-[#d9b167] text-black'
                  : 'border border-white/20 text-white hover:border-[#d9b167]/50'
              }`}
            >
              {cat === 'all'
                ? 'All'
                : cat === 'landscape'
                  ? 'Country'
                  : cat === 'hunting'
                    ? 'In The Hunt'
                    : cat === 'lodge'
                      ? 'Lodge'
                      : cat === 'recent'
                        ? 'Recent'
                        : 'Trophies'}
            </button>
          ))}
        </div>

        <div className="space-y-20">
          {displayedGalleries.map((gallery) => (
            <div key={gallery.category}>
              <div className="mb-8">
                <h3 className="font-display text-3xl font-bold text-white">{gallery.title}</h3>
                <p className="mt-2 text-gray-400">{gallery.description}</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {gallery.images.map((image, idx) => {
                  const resolvedSrc = buildBlobImageSrc(image);

                  return (
                    <div
                      key={`${gallery.category}-${idx}`}
                      className="group relative h-64 w-full overflow-hidden rounded-lg border border-white/10 bg-gray-900"
                    >
                      <img
                        src={resolvedSrc}
                        alt={image.alt}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-sm font-semibold text-white">{image.alt}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
