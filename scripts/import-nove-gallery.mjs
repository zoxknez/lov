import { get, put } from '@vercel/blob';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const blobAssetManifestFile = path.join(projectRoot, 'lib', 'blob-asset-manifest.json');
const gallerySlikeFile = path.join(projectRoot, 'lib', 'gallery-slike.json');
const remoteManifestPath = 'admin/gallery/gallery-manifest.json';
const sourceFolderPrefix = '/media/nove%20galerija/';

process.loadEnvFile(path.join(projectRoot, '.env'));

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  throw new Error('BLOB_READ_WRITE_TOKEN is required.');
}

const categoryDefinitions = {
  'red-deer': { label: 'Red Deer', title: 'Red Deer', defaultCoords: '39.25S 175.50E', shortCode: 'RD' },
  'sika-deer': { label: 'Sika Deer', title: 'Sika Deer', defaultCoords: '39.17S 176.02E', shortCode: 'SK' },
  'fallow-deer': { label: 'Fallow Deer', title: 'Fallow Deer', defaultCoords: '39.11S 175.81E', shortCode: 'FD' },
  'rusa-sambar': { label: 'Rusa / Sambar', title: 'Rusa / Sambar Deer', defaultCoords: '38.13S 176.24E', shortCode: 'RS' },
  'himalayan-tahr': { label: 'Himalayan Tahr', title: 'Himalayan Tahr', defaultCoords: '43.52S 170.18E', shortCode: 'HT' },
  chamois: { label: 'Chamois', title: 'Chamois', defaultCoords: '43.63S 170.48E', shortCode: 'CH' },
  'hunting-photos': { label: 'Hunting Photos', title: 'Hunting Photos', defaultCoords: 'New Zealand Field Grid', shortCode: 'HP' },
};

const legacyCategoryRfMap = {
  'red-deer': [1, 4, 12, 16, 17, 33, 36, 39, 40, 41, 42, 43],
  'sika-deer': [2, 5, 7, 15, 27, 28, 34],
  'fallow-deer': [8, 10, 29],
  'rusa-sambar': [3, 5, 19, 20, 21, 22, 24, 30, 32],
  'himalayan-tahr': [11, 14, 18, 23],
  chamois: [25, 26, 31],
  'hunting-photos': [6, 9, 13, 37, 38],
};

function decodeFilename(localSrc) {
  return decodeURIComponent(localSrc.split('/').pop() ?? localSrc);
}

function createTitle(filename) {
  const ext = path.extname(filename);
  const base = path.basename(filename, ext);
  const cleaned = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();

  return cleaned.replace(/\b\w/g, (character) => character.toUpperCase()) || 'New Gallery Asset';
}

function createDefaultManifest(gallerySlike) {
  const fixedDate = new Date('2026-04-08T00:00:00.000Z').toISOString();
  const items = Object.entries(legacyCategoryRfMap).flatMap(([categoryKey, rfNumbers]) => {
    const category = categoryDefinitions[categoryKey];

    return rfNumbers.flatMap((rfNumber, index) => {
      const entry = gallerySlike[rfNumber - 1];

      if (!entry) {
        return [];
      }

      return [{
        id: `legacy-${categoryKey}-${String(rfNumber).padStart(2, '0')}-${index + 1}`,
        kind: 'image',
        title: `${category.title} / RF-${String(rfNumber).padStart(2, '0')}`,
        altText: `${category.title} trophy frame ${String(index + 1).padStart(2, '0')}`,
        categoryKey,
        status: categoryKey === 'hunting-photos' ? 'FIELD' : 'CURATED',
        blobPath: entry.blobPath,
        blobUrl: entry.blobUrl,
        fallbackSrc: entry.localSrc,
        posterBlobPath: '',
        posterBlobUrl: '',
        posterFallbackSrc: '',
        orientation: 'landscape',
        runtimeLabel: '',
        referenceCode: `RF-${String(rfNumber).padStart(2, '0')}`,
        coords: category.defaultCoords,
        captureDate: 'RF Archive',
        sortOrder: index * 10,
        isVisible: true,
        notes: '',
        filename: decodeFilename(entry.localSrc),
        createdAt: fixedDate,
        updatedAt: fixedDate,
      }];
    });
  });

  return {
    version: 1,
    updatedAt: fixedDate,
    source: 'default',
    items,
  };
}

function normalizeItem(item, index) {
  return {
    id: item.id ?? `item-${index + 1}`,
    kind: item.kind === 'video' ? 'video' : 'image',
    title: item.title ?? `Gallery Item ${index + 1}`,
    altText: item.altText ?? item.title ?? `Gallery Item ${index + 1}`,
    categoryKey: item.categoryKey ?? 'hunting-photos',
    status: item.status ?? 'CURATED',
    blobPath: item.blobPath ?? '',
    blobUrl: item.blobUrl ?? '',
    fallbackSrc: item.fallbackSrc ?? '',
    posterBlobPath: item.posterBlobPath ?? '',
    posterBlobUrl: item.posterBlobUrl ?? '',
    posterFallbackSrc: item.posterFallbackSrc ?? '',
    orientation: item.orientation === 'portrait' ? 'portrait' : 'landscape',
    runtimeLabel: item.runtimeLabel ?? '',
    referenceCode: item.referenceCode ?? '',
    coords: item.coords ?? categoryDefinitions[item.categoryKey ?? 'hunting-photos']?.defaultCoords ?? 'New Zealand Field Grid',
    captureDate: item.captureDate ?? 'Recent',
    sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder : index * 10,
    isVisible: item.isVisible !== false,
    notes: item.notes ?? '',
    filename: item.filename ?? decodeFilename(item.fallbackSrc ?? item.blobPath ?? `asset-${index + 1}`),
    createdAt: item.createdAt ?? new Date().toISOString(),
    updatedAt: item.updatedAt ?? new Date().toISOString(),
  };
}

async function loadRemoteManifest() {
  const gallerySlike = JSON.parse(await readFile(gallerySlikeFile, 'utf8'));

  try {
    const blob = await get(remoteManifestPath, {
      access: 'private',
      token,
      useCache: false,
    });

    if (!blob || blob.statusCode !== 200 || !blob.stream) {
      return createDefaultManifest(gallerySlike);
    }

    const text = await new Response(blob.stream).text();
    const parsed = JSON.parse(text);

    return {
      version: 1,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
      source: 'admin',
      items: Array.isArray(parsed.items) ? parsed.items.map(normalizeItem) : createDefaultManifest(gallerySlike).items,
    };
  } catch {
    return createDefaultManifest(gallerySlike);
  }
}

const blobAssetManifest = JSON.parse(await readFile(blobAssetManifestFile, 'utf8'));
const importedAssets = blobAssetManifest
  .filter((entry) => entry.localSrc.startsWith(sourceFolderPrefix))
  .sort((left, right) => decodeFilename(left.localSrc).localeCompare(decodeFilename(right.localSrc), undefined, { numeric: true }));

if (!importedAssets.length) {
  throw new Error(`No Blob-backed assets found for ${sourceFolderPrefix}. Run npm run upload:blob-assets first.`);
}

const remoteManifest = await loadRemoteManifest();
const baseItems = remoteManifest.items.filter((item) => !(item.fallbackSrc ?? '').startsWith(sourceFolderPrefix));
const firstImage = importedAssets.find((entry) => /\.(jpe?g|png|webp)$/i.test(entry.localSrc));
const nextSortBase = baseItems.reduce((max, item) => Math.max(max, item.sortOrder), -10) + 10;
const now = new Date().toISOString();

const importedItems = importedAssets.map((entry, index) => {
  const filename = decodeFilename(entry.localSrc);
  const isVideo = /\.mp4$/i.test(filename);
  const title = createTitle(filename);

  return {
    id: `nove-galerija-${String(index + 1).padStart(2, '0')}-${filename.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    kind: isVideo ? 'video' : 'image',
    title,
    altText: title,
    categoryKey: 'hunting-photos',
    status: 'NEW',
    blobPath: entry.blobPath,
    blobUrl: entry.blobUrl,
    fallbackSrc: entry.localSrc,
    posterBlobPath: isVideo ? (firstImage?.blobPath ?? '') : '',
    posterBlobUrl: isVideo ? (firstImage?.blobUrl ?? '') : '',
    posterFallbackSrc: isVideo ? (firstImage?.localSrc ?? '/media/logo.png') : '',
    orientation: 'landscape',
    runtimeLabel: '',
    referenceCode: `NG-${String(index + 1).padStart(2, '0')}`,
    coords: 'New Zealand Field Grid',
    captureDate: 'April 2026',
    sortOrder: nextSortBase + index * 10,
    isVisible: true,
    notes: 'Imported from public/media/nove galerija',
    filename,
    createdAt: now,
    updatedAt: now,
  };
});

const finalManifest = {
  version: 1,
  updatedAt: now,
  source: 'admin',
  items: [...baseItems, ...importedItems].sort((left, right) => {
    if (left.categoryKey === right.categoryKey) {
      return left.sortOrder - right.sortOrder || left.title.localeCompare(right.title);
    }

    return left.categoryKey.localeCompare(right.categoryKey);
  }),
};

await put(remoteManifestPath, `${JSON.stringify(finalManifest, null, 2)}\n`, {
  access: 'private',
  token,
  contentType: 'application/json; charset=utf-8',
  allowOverwrite: true,
  addRandomSuffix: false,
  cacheControlMaxAge: 60,
});

console.log(`Imported ${importedItems.length} asset(s) from "${sourceFolderPrefix}" into ${remoteManifestPath}.`);
