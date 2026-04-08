import gallerySlike from '@/lib/gallery-slike.json';

export const GALLERY_CATEGORY_KEYS = [
  'red-deer',
  'sika-deer',
  'fallow-deer',
  'rusa-sambar',
  'himalayan-tahr',
  'chamois',
  'hunting-photos',
] as const;

export type GalleryCategoryKey = (typeof GALLERY_CATEGORY_KEYS)[number];

export const GALLERY_STATUSES = ['CURATED', 'FIELD', 'NEW', 'FEATURED'] as const;

export type GalleryAdminStatus = (typeof GALLERY_STATUSES)[number];
export type GalleryAdminAssetKind = 'image' | 'video';

export type AssetMeta = {
  fileId: string;
  coords: string;
  date: string;
  status: string;
  medium: 'PHOTO' | 'VIDEO';
  runtime?: string;
};

export type GalleryImageAsset = {
  kind: 'image';
  src: string;
  label: string;
  alt: string;
  blobPath?: string;
  fallbackSrc?: string;
  meta: AssetMeta;
};

export type GalleryVideoAsset = {
  kind: 'video';
  src: string;
  poster: string;
  blobPath?: string;
  fallbackSrc?: string;
  posterBlobPath?: string;
  posterFallbackSrc?: string;
  label: string;
  alt: string;
  orientation: 'landscape' | 'portrait';
  meta: AssetMeta;
};

export type GalleryAsset = GalleryImageAsset | GalleryVideoAsset;

export type GalleryGroup = {
  key: GalleryCategoryKey;
  label: string;
  title: string;
  sub: string;
  assets: GalleryAsset[];
};

export type GalleryCategoryDefinition = {
  key: GalleryCategoryKey;
  label: string;
  title: string;
  sub: string;
  shortCode: string;
  defaultCoords: string;
};

export type GalleryAdminItem = {
  id: string;
  kind: GalleryAdminAssetKind;
  title: string;
  altText: string;
  categoryKey: GalleryCategoryKey;
  status: GalleryAdminStatus;
  blobPath: string;
  blobUrl: string;
  fallbackSrc?: string;
  posterBlobPath?: string;
  posterBlobUrl?: string;
  posterFallbackSrc?: string;
  orientation?: 'landscape' | 'portrait';
  runtimeLabel?: string;
  referenceCode?: string;
  coords: string;
  captureDate: string;
  sortOrder: number;
  isVisible: boolean;
  notes?: string;
  filename: string;
  createdAt: string;
  updatedAt: string;
};

export type GalleryAdminManifest = {
  version: 1;
  updatedAt: string;
  source: 'default' | 'admin';
  items: GalleryAdminItem[];
};

export const GALLERY_CATEGORY_DEFINITIONS: GalleryCategoryDefinition[] = [
  {
    key: 'red-deer',
    label: 'Red Deer',
    title: 'Red Deer',
    sub: 'RF archive curated for classic red deer trophies, roar timing, and mature stag moments.',
    shortCode: 'RD',
    defaultCoords: '39.25S 175.50E',
  },
  {
    key: 'sika-deer',
    label: 'Sika Deer',
    title: 'Sika Deer',
    sub: 'Selected RF frames focused on Kaimanawa sika encounters, whistle timing, and bush-country trophies.',
    shortCode: 'SK',
    defaultCoords: '39.17S 176.02E',
  },
  {
    key: 'fallow-deer',
    label: 'Fallow Deer',
    title: 'Fallow Deer',
    sub: 'Fallow-specific archive frames grouped for quick review of antler character and field moments.',
    shortCode: 'FD',
    defaultCoords: '39.11S 175.81E',
  },
  {
    key: 'rusa-sambar',
    label: 'Rusa / Sambar',
    title: 'Rusa / Sambar Deer',
    sub: 'Dedicated archive grouping for rusa and sambar material, including overlapping RF frames noted by the client.',
    shortCode: 'RS',
    defaultCoords: '38.13S 176.24E',
  },
  {
    key: 'himalayan-tahr',
    label: 'Himalayan Tahr',
    title: 'Himalayan Tahr',
    sub: 'Alpine RF archive focused on tahr country, mountain trophy quality, and steep-terrain moments.',
    shortCode: 'HT',
    defaultCoords: '43.52S 170.18E',
  },
  {
    key: 'chamois',
    label: 'Chamois',
    title: 'Chamois',
    sub: 'High-country chamois archive selected from the RF set for light, terrain, and mountain stalking moments.',
    shortCode: 'CH',
    defaultCoords: '43.63S 170.48E',
  },
  {
    key: 'hunting-photos',
    label: 'Hunting Photos',
    title: 'Hunting Photos',
    sub: 'Miscellaneous hunting archive frames that are not assigned to a dedicated species grouping.',
    shortCode: 'HP',
    defaultCoords: 'New Zealand Field Grid',
  },
];

const galleryCategoryMap = new Map<GalleryCategoryKey, GalleryCategoryDefinition>(
  GALLERY_CATEGORY_DEFINITIONS.map((definition) => [definition.key, definition]),
);

const legacyCategoryRfMap: Record<GalleryCategoryKey, number[]> = {
  'red-deer': [1, 4, 12, 16, 17, 33, 36, 39, 40, 41, 42, 43],
  'sika-deer': [2, 5, 7, 15, 27, 28, 34],
  'fallow-deer': [8, 10, 29],
  'rusa-sambar': [3, 5, 19, 20, 21, 22, 24, 30, 32],
  'himalayan-tahr': [11, 14, 18, 23],
  chamois: [25, 26, 31],
  'hunting-photos': [6, 9, 13, 37, 38],
};

function getCategoryDefinition(key: GalleryCategoryKey) {
  return galleryCategoryMap.get(key) ?? GALLERY_CATEGORY_DEFINITIONS[0];
}

function getRecentImageAsset(rfNumber: number) {
  const entry = gallerySlike[rfNumber - 1];

  if (!entry) {
    return null;
  }

  return {
    localSrc: entry.localSrc,
    blobPath: entry.blobPath,
    blobUrl: entry.blobUrl,
    alt: entry.alt,
    fileId: `RF-${String(rfNumber).padStart(2, '0')}`,
  };
}

function createLegacyAdminItem(categoryKey: GalleryCategoryKey, rfNumber: number, index: number): GalleryAdminItem | null {
  const asset = getRecentImageAsset(rfNumber);

  if (!asset) {
    return null;
  }

  const category = getCategoryDefinition(categoryKey);
  const now = new Date('2026-04-08T00:00:00.000Z').toISOString();

  return {
    id: `legacy-${categoryKey}-${String(rfNumber).padStart(2, '0')}-${index + 1}`,
    kind: 'image',
    title: `${category.title} / ${asset.fileId}`,
    altText: `${category.title} trophy frame ${String(index + 1).padStart(2, '0')}`,
    categoryKey,
    status: categoryKey === 'hunting-photos' ? 'FIELD' : 'CURATED',
    blobPath: asset.blobPath,
    blobUrl: asset.blobUrl,
    fallbackSrc: asset.localSrc,
    referenceCode: asset.fileId,
    coords: category.defaultCoords,
    captureDate: 'RF Archive',
    sortOrder: index * 10,
    isVisible: true,
    notes: '',
    filename: asset.localSrc.split('/').pop() ?? asset.fileId,
    createdAt: now,
    updatedAt: now,
  };
}

function createPublicImageAsset(item: GalleryAdminItem, index: number): GalleryImageAsset {
  const category = getCategoryDefinition(item.categoryKey);

  return {
    kind: 'image',
    src: item.blobUrl || item.fallbackSrc || '/media/logo.png',
    label: item.title.trim() || item.referenceCode || `${category.label} ${index + 1}`,
    alt: item.altText.trim() || item.title.trim() || `${category.label} archive frame`,
    blobPath: item.blobPath,
    fallbackSrc: item.fallbackSrc,
    meta: {
      fileId: item.referenceCode?.trim() || `${category.shortCode}-${String(index + 1).padStart(2, '0')}`,
      coords: item.coords.trim() || category.defaultCoords,
      date: item.captureDate.trim() || 'Recent',
      status: item.status,
      medium: 'PHOTO',
    },
  };
}

function createPublicVideoAsset(item: GalleryAdminItem, index: number): GalleryVideoAsset {
  const category = getCategoryDefinition(item.categoryKey);
  const label = item.title.trim() || item.referenceCode || `${category.label} ${index + 1}`;
  const alt = item.altText.trim() || label;

  return {
    kind: 'video',
    src: item.fallbackSrc || item.blobUrl || '/media/hero-wilderness-demo.mp4',
    poster: item.posterFallbackSrc || item.fallbackSrc || '/media/logo.png',
    blobPath: item.blobPath,
    fallbackSrc: item.fallbackSrc,
    posterBlobPath: item.posterBlobPath,
    posterFallbackSrc: item.posterFallbackSrc,
    label,
    alt,
    orientation: item.orientation ?? 'landscape',
    meta: {
      fileId: item.referenceCode?.trim() || `${category.shortCode}-V${String(index + 1).padStart(2, '0')}`,
      coords: item.coords.trim() || category.defaultCoords,
      date: item.captureDate.trim() || 'Recent',
      status: item.status,
      medium: 'VIDEO',
      runtime: item.runtimeLabel?.trim() || undefined,
    },
  };
}

export function getFirstActiveGalleryKey(groups: GalleryGroup[]) {
  return groups.find((group) => group.assets.length > 0)?.key ?? groups[0]?.key ?? 'red-deer';
}

export function buildDefaultGalleryManifest(): GalleryAdminManifest {
  const items = GALLERY_CATEGORY_KEYS.flatMap((key) =>
    legacyCategoryRfMap[key]
      .map((rfNumber, index) => createLegacyAdminItem(key, rfNumber, index))
      .filter((item): item is GalleryAdminItem => item !== null),
  );

  return {
    version: 1,
    updatedAt: new Date('2026-04-08T00:00:00.000Z').toISOString(),
    source: 'default',
    items,
  };
}

export function buildPublicGalleryGroupsFromAdminManifest(manifest: GalleryAdminManifest): GalleryGroup[] {
  const visibleItems = manifest.items
    .filter((item) => item.isVisible)
    .slice()
    .sort((left, right) => {
      if (left.categoryKey === right.categoryKey) {
        return left.sortOrder - right.sortOrder || left.title.localeCompare(right.title);
      }

      return GALLERY_CATEGORY_KEYS.indexOf(left.categoryKey) - GALLERY_CATEGORY_KEYS.indexOf(right.categoryKey);
    });

  return GALLERY_CATEGORY_DEFINITIONS.map((category) => {
    const assets = visibleItems
      .filter((item) => item.categoryKey === category.key)
      .map((item, index) => (item.kind === 'video' ? createPublicVideoAsset(item, index) : createPublicImageAsset(item, index)));

    return {
      key: category.key,
      label: category.label,
      title: category.title,
      sub: category.sub,
      assets,
    };
  });
}

export function buildFallbackGalleryGroups() {
  return buildPublicGalleryGroupsFromAdminManifest(buildDefaultGalleryManifest());
}
