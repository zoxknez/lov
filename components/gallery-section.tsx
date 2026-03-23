'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import MagneticButton from '@/components/magnetic-button';
import TextReveal from '@/components/text-reveal';
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

const categoryLabels: Record<string, string> = {
  all: 'All',
  trophies: 'Trophies',
  landscape: 'Country',
  hunting: 'Experience',
  lodge: 'Lodge',
  recent: 'Recent',
};

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleries = [
    {
      category: 'trophies',
      title: 'Trophy Archive',
      description: 'Portraits of mature stags and selective heads that define the standard of the program.',
      note: 'Red stag, sika, and fallow highlights',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red stag trophy portrait' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika stag trophy portrait' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow buck trophy portrait' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'Country and trophy moment' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'landscape',
      title: 'Country & Atmosphere',
      description: 'Native bush, river systems, and high-country texture that give the hunts their New Zealand identity.',
      note: 'North Island bush and alpine reach',
      images: [
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua.jpg', alt: 'North Island hill country' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Native bush and ridgelines' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 3 jpg.jpg', alt: 'Remote backcountry cover' },
        { src: '/media/hunting area  and deers/main  photo. small size .png', alt: 'Forest valley approach' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'hunting',
      title: 'Field Rhythm',
      description: 'Moments from the stalk, the glassing, and the patient pace that sits behind a proper hosted hunt.',
      note: 'Stalk, glass, recover, and host',
      images: [
        { src: '/media/hunting area  and deers/Red Deer Stag.jpg', alt: 'Red deer field result' },
        { src: '/media/hunting area  and deers/Sika  deer Stag.jpg', alt: 'Sika field result' },
        { src: '/media/hunting area  and deers/Fellow  deer.jpg', alt: 'Fallow field result' },
        { src: '/media/hunting area  and deers/Hunting  area  near Rotorua 2 jpg.jpg', alt: 'Bush-country approach' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'lodge',
      title: 'Hosted Base',
      description: 'Ohakune lodge life, warm recovery spaces, and the quieter side of the program once the field day is done.',
      note: 'Comfortable base between field days',
      images: [
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg', alt: 'Ohakune lodge exterior' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg', alt: 'Shared dining area' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg', alt: 'Lounge and recovery space' },
        { src: '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg', alt: 'Guest room interior' },
      ] satisfies GalleryImage[],
    },
    {
      category: 'recent',
      title: 'Recent Frames',
      description: 'Current-season captures from the field, including trophy moments, camps, and day-by-day atmosphere.',
      note: 'Latest archive pulled from recent field uploads',
      images: gallerySlike.map((image) => ({
        src: image.localSrc,
        fallbackSrc: image.localSrc,
        blobPath: image.blobPath,
        alt: image.alt,
      })),
    },
  ];

  const curatedAllImages = [
    galleries[0].images[0],
    galleries[1].images[1],
    galleries[2].images[0],
    galleries[3].images[1],
    galleries[0].images[2],
    galleries[1].images[3],
  ];

  const categories = [
    { key: 'all', label: 'All', count: curatedAllImages.length },
    ...galleries.map((gallery) => ({
      key: gallery.category,
      label: categoryLabels[gallery.category],
      count: gallery.images.length,
    })),
  ];

  const activeGallery =
    selectedCategory === 'all'
      ? {
          title: 'Curated Highlights',
          description: 'A distilled edit of trophy portraits, country texture, field rhythm, and hosted lodge atmosphere.',
          note: 'A first read of the Kaimanawa experience',
          images: curatedAllImages,
        }
      : galleries.find((gallery) => gallery.category === selectedCategory)!;

  const featuredImages = activeGallery.images.slice(0, 6);
  const previewStrip = activeGallery.images.slice(0, Math.min(activeGallery.images.length, 10));
  const remainingImages = Math.max(0, activeGallery.images.length - featuredImages.length);

  const handleNext = () => {
    setLightboxIndex((prev) => (prev !== null ? (prev + 1) % activeGallery.images.length : null));
  };

  const handlePrev = () => {
    setLightboxIndex((prev) =>
      prev !== null ? (prev - 1 + activeGallery.images.length) % activeGallery.images.length : null,
    );
  };

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : 'unset';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % activeGallery.images.length : null));
      }
      if (event.key === 'ArrowLeft') {
        setLightboxIndex((prev) =>
          prev !== null ? (prev - 1 + activeGallery.images.length) % activeGallery.images.length : null,
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, activeGallery.images.length]);

  const lightboxImage = lightboxIndex !== null ? activeGallery.images[lightboxIndex] : null;

  return (
    <section id="gallery" className="relative overflow-hidden bg-transparent py-24 font-sans gallery-lighttable md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-forest-950/12 backdrop-blur-[1px]" />
      <div className="pointer-events-none absolute left-[-10%] top-[-10%] h-[36rem] w-[36rem] rounded-full bg-gold-600/5 blur-[140px]" />
      <div className="pointer-events-none absolute bottom-[-10%] right-[-10%] h-[36rem] w-[36rem] rounded-full bg-forest-600/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="mb-14 grid gap-8 xl:grid-cols-[minmax(0,1fr)_25rem] xl:items-end">
          <div className="min-w-0">
            <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.4em] text-gold-400">
              <TextReveal>The Visual Archive</TextReveal>
            </p>
            <h2 className="font-display text-5xl font-bold uppercase tracking-tighter text-white md:text-7xl lg:text-[6.8rem]">
              <TextReveal delay={0.2}>Gallery</TextReveal>
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 140 }}
              viewport={{ once: true }}
              className="mt-6 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-[2rem] border border-white/10 bg-black/20 p-6 shadow-premium backdrop-blur-xl"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/60">Archive Note</p>
            <p className="mt-4 text-sm leading-7 text-gray-300">
              The gallery is structured as a quick visual read first, then a clean lightbox archive for closer viewing.
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-400/45">Visible Categories</p>
                <p className="mt-2 text-xl font-semibold text-white">{categories.length}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-400/45">Current Archive</p>
                <p className="mt-2 text-xl font-semibold text-white">{activeGallery.images.length} Frames</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mb-12 rounded-[2rem] border border-white/10 bg-black/20 p-3 shadow-premium backdrop-blur-xl">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <MagneticButton
                key={category.key}
                strength={0.18}
                onClick={() => {
                  setSelectedCategory(category.key);
                  setLightboxIndex(null);
                }}
                className={`group relative overflow-hidden rounded-full px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] transition-all duration-500 ${
                  selectedCategory === category.key ? 'text-black' : 'text-white/68 hover:text-white'
                }`}
              >
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    selectedCategory === category.key
                      ? 'bg-gold-400 opacity-100'
                      : 'bg-white/[0.04] opacity-100 group-hover:bg-white/[0.1]'
                  }`}
                />
                <span className="relative z-10 inline-flex items-center gap-3">
                  <span>{category.label}</span>
                  <span
                    className={`rounded-full px-2 py-1 text-[9px] tracking-[0.16em] ${
                      selectedCategory === category.key ? 'bg-black/10 text-black/70' : 'bg-black/20 text-gold-300/70'
                    }`}
                  >
                    {category.count}
                  </span>
                </span>
              </MagneticButton>
            ))}
          </div>
        </div>

        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mb-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]"
        >
          <div className="rounded-[2.25rem] border border-white/10 bg-forest-900/15 p-8 shadow-premium backdrop-blur-xl">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-gold-400/55">
                  {categoryLabels[selectedCategory]}
                </p>
                <h3 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight text-white md:text-5xl">
                  {activeGallery.title}
                </h3>
              </div>
              <div className="rounded-full border border-gold-400/15 bg-gold-400/[0.06] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-300">
                {activeGallery.note}
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-lg italic leading-8 text-gray-300">{activeGallery.description}</p>
          </div>

          <div className="rounded-[2.25rem] border border-white/10 bg-black/20 p-6 shadow-premium backdrop-blur-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/55">Viewing Mode</p>
            <div className="mt-5 space-y-5">
              <div>
                <p className="text-3xl font-semibold text-white">{activeGallery.images.length}</p>
                <p className="mt-1 text-sm text-gray-400">frames available in the active archive</p>
              </div>
              <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
              <p className="text-sm leading-7 text-gray-300">
                Open any frame for full-screen viewing, then move through the archive with arrows or the preview strip.
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid auto-rows-[11rem] grid-cols-2 gap-5 md:auto-rows-[13rem] md:grid-cols-12 md:gap-6">
          {featuredImages.map((image, index) => {
            const resolvedSrc = buildBlobImageSrc(image);
            const isLastVisible = index === featuredImages.length - 1 && remainingImages > 0;
            const gridClasses = [
              'col-span-2 row-span-2 md:col-span-7 md:row-span-2',
              'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-5 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
              'col-span-1 row-span-1 md:col-span-4 md:row-span-1',
              'col-span-2 row-span-1 md:col-span-4 md:row-span-1',
            ][index];

            return (
              <motion.button
                key={`${selectedCategory}-${image.alt}-${index}`}
                type="button"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: index * 0.06 }}
                onClick={() => setLightboxIndex(index)}
                className={`group relative overflow-hidden rounded-[2.35rem] border border-white/10 bg-forest-900/12 text-left shadow-premium transition-all duration-700 hover:-translate-y-1 hover:border-gold-400/35 ${gridClasses}`}
              >
                <Image
                  src={resolvedSrc}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/20 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(200,169,110,0.18),transparent_26%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                <div className="absolute left-6 top-6 flex items-center gap-3">
                  <div className="rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-gold-300 backdrop-blur-md">
                    Frame {String(index + 1).padStart(2, '0')}
                  </div>
                  {isLastVisible ? (
                    <div className="rounded-full border border-gold-400/20 bg-gold-400/[0.08] px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-gold-200 backdrop-blur-md">
                      +{remainingImages} More
                    </div>
                  ) : null}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                  <div className="flex items-end justify-between gap-5">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/70">Open Archive</p>
                      <p className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight text-white md:text-3xl">
                        {image.alt}
                      </p>
                    </div>
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-400/15 bg-gold-400/[0.08] text-gold-200 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-105">
                      <Maximize2 className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/10 bg-black/20 p-5 shadow-premium backdrop-blur-xl md:p-6">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.32em] text-gold-400/55">Filmstrip</p>
              <p className="mt-2 text-sm text-gray-400">A faster way to move through the current archive without opening random frames.</p>
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold-400/50">
              {previewStrip.length} preview frames
            </div>
          </div>

          <div className="no-scrollbar flex gap-3 overflow-x-auto pb-1">
            {previewStrip.map((image, index) => (
              <button
                key={`${selectedCategory}-preview-${index}`}
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative h-24 w-28 shrink-0 overflow-hidden rounded-[1.4rem] border border-white/10 bg-black/20 transition-all duration-300 hover:border-gold-400/30 md:h-28 md:w-36"
                aria-label={`Open ${image.alt}`}
              >
                <Image
                  src={buildBlobImageSrc(image)}
                  alt={image.alt}
                  fill
                  sizes="160px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                <div className="absolute left-3 top-3 rounded-full bg-black/35 px-2 py-1 text-[8px] font-bold uppercase tracking-[0.18em] text-gold-300 backdrop-blur-md">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && lightboxImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-forest-950/96 backdrop-blur-2xl"
            onClick={() => setLightboxIndex(null)}
          >
            <div className="absolute inset-x-0 top-0 z-[110] px-4 py-5 md:px-8 md:py-7">
              <div className="mx-auto flex max-w-7xl items-start justify-between gap-6">
                <div className="rounded-[1.75rem] border border-white/10 bg-black/25 px-5 py-4 shadow-premium backdrop-blur-xl">
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold-400/60">{activeGallery.title}</p>
                  <h4 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-white md:text-3xl">
                    {lightboxImage.alt}
                  </h4>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.28em] text-gold-300/70">
                    Frame {lightboxIndex + 1} / {activeGallery.images.length}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setLightboxIndex(null);
                  }}
                  className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/80 shadow-premium backdrop-blur-xl transition-all duration-300 hover:border-gold-400/30 hover:text-gold-200"
                  aria-label="Close gallery preview"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="absolute inset-y-0 left-0 right-0 z-[109] hidden items-center justify-between px-4 md:flex md:px-8">
              <div className="mx-auto flex w-full max-w-[92rem] items-center justify-between">
                <MagneticButton
                  strength={0.3}
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePrev();
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/80 shadow-premium backdrop-blur-xl transition-all duration-300 hover:border-gold-400/30 hover:text-gold-200"
                >
                  <ChevronLeft className="h-7 w-7" />
                </MagneticButton>

                <MagneticButton
                  strength={0.3}
                  onClick={(event) => {
                    event.stopPropagation();
                    handleNext();
                  }}
                  className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-black/25 text-white/80 shadow-premium backdrop-blur-xl transition-all duration-300 hover:border-gold-400/30 hover:text-gold-200"
                >
                  <ChevronRight className="h-7 w-7" />
                </MagneticButton>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 20 }}
              transition={{ duration: 0.35 }}
              className="relative z-[105] mx-auto flex h-full max-w-7xl items-center justify-center px-4 pb-28 pt-28 md:px-20 md:pb-40 md:pt-32"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[2.8rem] border border-white/10 bg-black/30 shadow-premium">
                <Image
                  src={buildBlobImageSrc(lightboxImage)}
                  alt={lightboxImage.alt}
                  width={1920}
                  height={1280}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            </motion.div>

            <div className="absolute inset-x-0 bottom-0 z-[110] px-4 pb-4 md:px-8 md:pb-7">
              <div className="mx-auto max-w-6xl rounded-[2rem] border border-white/10 bg-black/30 p-4 shadow-premium backdrop-blur-xl md:p-5">
                <div className="no-scrollbar flex gap-3 overflow-x-auto">
                  {previewStrip.map((image, index) => {
                    const isActive = index === lightboxIndex;

                    return (
                      <button
                        key={`lightbox-${index}`}
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setLightboxIndex(index);
                        }}
                        className={`group relative h-20 w-24 shrink-0 overflow-hidden rounded-[1.2rem] border transition-all duration-300 md:h-24 md:w-32 ${
                          isActive ? 'border-gold-400/60 shadow-glow-gold' : 'border-white/10 hover:border-gold-400/25'
                        }`}
                        aria-label={`Open frame ${index + 1}`}
                      >
                        <Image
                          src={buildBlobImageSrc(image)}
                          alt={image.alt}
                          fill
                          sizes="160px"
                          className="object-cover"
                        />
                        <div className={`absolute inset-0 ${isActive ? 'bg-black/20' : 'bg-black/45 group-hover:bg-black/25'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
