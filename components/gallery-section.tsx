'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gallerySlike from '@/lib/gallery-slike.json';
import { getBlobAssetUrl } from '@/lib/blob-asset';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import TextReveal from '@/components/text-reveal';
import MagneticButton from '@/components/magnetic-button';

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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);


  const galleries = [
    {
      category: 'trophies',
      title: 'Trophies',
      description: 'The pinnacle of the hunt. Portraits of world-class Red Stag, Fallow, and Sika deer.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red Stag Trophy' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika Deer' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow Deer' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Hunting Area Trophy' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'landscape',
      title: 'Alpine & Bush',
      description: 'The rugged beauty of New Zealand. From misty river valleys to high alpine basins.',
      images: [
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Alpine Terrain' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Bush Country' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', alt: 'Mountain Views' },
        { src: '/media/hunting area  and deers/main  photo. small size .png', alt: 'Forest Valleys' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'hunting',
      title: 'The Stalk',
      description: 'Raw moments from the field. Glassing, tracking, and the ultimate reward.',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Successful Hunt' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Stalking' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Field Work' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Trophy Moment' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'lodge',
      title: 'Lodge Life',
      description: 'Hostelry and recovery. Ohakune base comfort after a long day in the bush.',
      images: [
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', alt: 'Lodge Interior' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg', alt: 'Dining Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg', alt: 'Living Area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg', alt: 'Guest Room' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'recent',
      title: 'Recent Success',
      description: 'Latest client captures and field highlights from the current season.',
      images: gallerySlike.map((image) => ({
        src: image.localSrc,
        fallbackSrc: image.localSrc,
        blobPath: image.blobPath,
        alt: image.alt,
      })),
    },
  ];

  const categories = ['all', 'trophies', 'landscape', 'hunting', 'lodge', 'recent'];
  
  const curatedAllImages = [
    galleries[0].images[0],
    galleries[1].images[0],
    galleries[2].images[1],
    galleries[3].images[0],
    galleries[0].images[1],
    galleries[1].images[3],
  ];

  const activeGallery = selectedCategory === 'all' 
    ? { title: 'Highlights', description: 'A curated selection of the finest New Zealand hunting moments.', images: curatedAllImages }
    : galleries.find(g => g.category === selectedCategory)!;

  const handleNext = useCallback(() => setLightboxIndex(prev => (prev !== null ? (prev + 1) % activeGallery.images.length : null)), [activeGallery.images.length]);
  const handlePrev = useCallback(() => setLightboxIndex(prev => (prev !== null ? (prev - 1 + activeGallery.images.length) % activeGallery.images.length : null)), [activeGallery.images.length]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeGallery.images.length, handleNext, handlePrev]);

  return (
    <section id="gallery" className="relative overflow-hidden bg-transparent py-24 md:py-40 font-sans gallery-lighttable">
      {/* Lighttable Reveal */}
      <div className="absolute inset-0 bg-forest-950/20 backdrop-blur-[1px] pointer-events-none" />
      <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-gold-600/5 blur-[120px] pointer-events-none" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-forest-600/10 blur-[120px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-4">
             <TextReveal>The Visual Archive</TextReveal>
          </p>
          <h2 className="font-display text-5xl font-bold uppercase tracking-tight text-white md:text-7xl lg:text-9xl uppercase tracking-tighter">
             <TextReveal delay={0.2}>Gallery</TextReveal>
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 140 }}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" 
          />
        </div>

        {/* Filter Navigation */}
        <div className="mb-20 flex flex-wrap justify-center gap-4">
          {categories.map((cat) => (
            <MagneticButton
              key={cat}
              strength={0.2}
              onClick={() => setSelectedCategory(cat)}
              className={`group relative overflow-hidden rounded-full px-8 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-700 shadow-premium ${
                selectedCategory === cat ? 'text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              <div className={`absolute inset-0 transition-all duration-700 ${selectedCategory === cat ? 'bg-gold-400 scale-100 opacity-100' : 'bg-white/5 opacity-0 scale-50 group-hover:scale-100 group-hover:opacity-100'}`} />
              <span className="relative z-10">
                {cat === 'all' ? 'All' : cat === 'landscape' ? 'Country' : cat === 'hunting' ? 'Experience' : cat === 'lodge' ? 'Lodge' : cat === 'recent' ? 'Recent' : 'Trophies'}
              </span>
            </MagneticButton>
          ))}
        </div>

        {/* Active Content Meta */}
        <motion.div 
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
           <h3 className="font-display text-3xl font-bold text-white uppercase tracking-tighter mb-6 underline decoration-gold-400/30 decoration-offset-4">{activeGallery.title}</h3>
           <p className="text-lg text-gray-400 italic leading-relaxed">{activeGallery.description}</p>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-6 md:gap-8 h-[700px] md:h-[900px]">
          {activeGallery.images.slice(0, 6).map((image, idx) => {
            const resolvedSrc = buildBlobImageSrc(image);
            const gridClasses = [
              "md:col-span-2 md:row-span-2 col-span-2 row-span-1", 
              "md:col-span-1 md:row-span-1 col-span-1",
              "md:col-span-1 md:row-span-1 col-span-1",
              "md:col-span-1 md:row-span-1 col-span-1",
              "md:col-span-1 md:row-span-1 col-span-1",
              "hidden md:block md:col-span-2 md:row-span-1",
            ][idx] || "col-span-1";

            return (
              <motion.div
                key={`${selectedCategory}-${idx}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                onClick={() => setLightboxIndex(idx)}
                className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-forest-900/10 cursor-none transition-all duration-700 hover:border-gold-500/40 shadow-premium ${gridClasses}`}
              >
                <Image
                  src={resolvedSrc}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="h-full w-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-90" />
                <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0 translate-y-8">
                   <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold-400 mb-2">Perspective</p>
                      <p className="text-xl font-display font-bold text-white uppercase tracking-widest">{image.alt}</p>
                   </div>
                   <div className="h-12 w-12 flex items-center justify-center rounded-full bg-gold-400 text-black shadow-glow-gold transition-transform group-hover:rotate-45">
                      <Maximize2 className="h-5 w-5" />
                   </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/98 p-4 md:p-12 backdrop-blur-3xl"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="absolute inset-0 cursor-zoom-out" />

            <button 
              onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
              className="absolute top-10 right-10 z-[110] text-gold-400/50 hover:text-gold-400 transition-all hover:scale-110 p-4 bg-white/5 rounded-full hover:bg-white/10 shadow-premium"
            >
              <X className="h-10 w-10" />
            </button>
            
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between px-6 md:px-12 pointer-events-none">
              <MagneticButton
                strength={0.4}
                onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-gold-400/50 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-gold-400 border border-gold-400/10"
              >
                <ChevronLeft className="h-12 w-12" />
              </MagneticButton>
              <MagneticButton
                strength={0.4}
                onClick={(e) => { e.stopPropagation(); handleNext(); }}
                className="pointer-events-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/5 text-gold-400/50 backdrop-blur-xl transition-all hover:bg-white/10 hover:text-gold-400 border border-gold-400/10"
              >
                <ChevronRight className="h-12 w-12" />
              </MagneticButton>
            </div>

            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-[105] max-w-7xl w-full h-[70vh] md:h-[80vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image 
                src={buildBlobImageSrc(activeGallery.images[lightboxIndex])} 
                alt="Gallery Preview"
                width={1920}
                height={1080}
                className="max-w-full max-h-full object-contain rounded-3xl shadow-glow-gold border border-white/10"
              />
              <div className="absolute bottom-[-100px] text-center w-full">
                 <h4 className="font-display text-4xl font-bold text-white uppercase tracking-tighter mb-4">{activeGallery.images[lightboxIndex].alt}</h4>
                 <div className="flex items-center justify-center gap-6">
                    <div className="h-px w-10 bg-gold-400/30" />
                    <p className="text-[10px] text-gold-400 uppercase tracking-[0.5em] font-bold">
                      {lightboxIndex + 1} <span className="text-gray-700 mx-3">|</span> {activeGallery.images.length}
                    </p>
                    <div className="h-px w-10 bg-gold-400/30" />
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
