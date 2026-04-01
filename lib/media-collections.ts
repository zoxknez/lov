export type MediaItem = {
  src: string;
  alt: string;
};

export type VideoMediaItem = {
  src: string;
  alt: string;
  poster: string;
  durationLabel: string;
  orientation: 'landscape' | 'portrait';
};

function humanizeFileLabel(src: string) {
  const fileName = decodeURIComponent(src.split('/').pop() ?? src);

  return fileName
    .replace(/\.[^.]+$/, '')
    .replace(/13 Ruapehu Rd Ohakune/gi, 'Ohakune lodge')
    .replace(/WhatsApp Image \d{4}-\d{2}-\d{2} at [\d. ]+/gi, '')
    .replace(/WhatsApp Video \d{4}-\d{2}-\d{2} at [\d. ]+/gi, '')
    .replace(/WhatsApp Video \d+/gi, '')
    .replace(/\(\d+\)/g, '')
    .replace(/\bjpg\b/gi, '')
    .replace(/\bjpeg\b/gi, '')
    .replace(/\bpng\b/gi, '')
    .replace(/dinning/gi, 'dining')
    .replace(/loundry/gi, 'laundry')
    .replace(/owev/gi, 'oven')
    .replace(/\s+/g, ' ')
    .trim();
}

function createMediaItems(paths: string[], fallbackLabel: string) {
  return paths.map((src, index) => {
    const label = humanizeFileLabel(src);

    return {
      src,
      alt: label || `${fallbackLabel} ${index + 1}`,
    };
  });
}

const countyPaths = [
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.57 (1).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.57 (2).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.57.jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.58 (1).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.58 (2).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.58 (3).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.58 (4).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.58 (5).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.58.jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.59 (1).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.59 (2).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.59 (3).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.59 (4).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.03.59.jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.04.00 (1).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.04.00 (2).jpeg',
  '/media/County/WhatsApp Image 2026-03-25 at 00.04.00.jpeg',
];

const backcountryPaths = [
  '/media/Backcountry/WhatsApp Image 2026-03-25 at 00.05.30 (1).jpeg',
  '/media/Backcountry/WhatsApp Image 2026-03-25 at 00.05.30.jpeg',
];

const lodgeAccommodationPaths = [
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 1 .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 2 .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 3 .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  bedroom 3a .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  dinning area .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  house .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  kitchen.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area  TV.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  living area.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  loundry jpg.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  pergola 1 .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  pergola 2 .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  pergola pizza owev .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  shower .jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune  toilet and loundry jpg.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune Lodge   sky  view. 2 jpg.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune Lodge   sky  view. 3 jpg.jpg',
  '/media/hunting lodge  accommodation/13 Ruapehu Rd Ohakune Lodge   sky  view.jpg',
];

const stayPaths = [
  '/media/smestaj/WhatsApp Image 2026-03-25 at 00.526.38.jpeg',
  '/media/smestaj/WhatsApp Image 2026-03-25 at 00.56.38.jpeg',
  '/media/smestaj/WhatsApp Image 2026-03-25 at 00.56.382232.jpeg',
  '/media/smestaj/WhatsApp Image 2026-03-25 at 21200.56.38.jpeg',
];

export const alexFounderMedia = createMediaItems(['/media/founders/Alex.jpeg'], 'Founder portrait');
export const countyMedia = createMediaItems(countyPaths, 'County landscape');
export const backcountryMedia = createMediaItems(backcountryPaths, 'Backcountry landscape');
export const lodgeAccommodationMedia = createMediaItems(lodgeAccommodationPaths, 'Ohakune lodge frame');
export const stayMedia = createMediaItems(stayPaths, 'Hosted stay frame');
export const stayVideoMedia: VideoMediaItem[] = [
  {
    src: '/media/smestaj/WhatsApp Video 12.mp4',
    alt: 'Panorama lookout sweep',
    poster: stayMedia[1]?.src ?? stayMedia[0].src,
    durationLabel: '00:15',
    orientation: 'landscape',
  },
  {
    src: '/media/smestaj/WhatsApp Video 2026-03-25 at 00.56.37.mp4',
    alt: 'Vertical valley outlook scan',
    poster: stayMedia[1]?.src ?? stayMedia[0].src,
    durationLabel: '00:23',
    orientation: 'portrait',
  },
  {
    src: '/media/smestaj/WhatsApp Video 2026-03-25 at 00.56.38.mp4',
    alt: 'Covered lounge walkthrough',
    poster: stayMedia[0]?.src ?? stayMedia[1].src,
    durationLabel: '00:39',
    orientation: 'landscape',
  },
];
