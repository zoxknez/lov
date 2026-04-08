import 'server-only';

import { del, get, put } from '@vercel/blob';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { z } from 'zod';
import {
  buildDefaultGalleryManifest,
  buildPublicGalleryGroupsFromAdminManifest,
  GALLERY_CATEGORY_DEFINITIONS,
  GALLERY_CATEGORY_KEYS,
  GALLERY_STATUSES,
  type GalleryAdminAssetKind,
  type GalleryAdminItem,
  type GalleryAdminManifest,
} from '@/lib/gallery-core';

const GALLERY_ADMIN_MANIFEST_PATH = 'admin/gallery/gallery-manifest.json';

const galleryCategoryEnum = z.enum(GALLERY_CATEGORY_KEYS);
const galleryStatusEnum = z.enum(GALLERY_STATUSES);

export const galleryAdminItemSchema = z.object({
  id: z.string().min(1).max(200),
  kind: z.enum(['image', 'video']),
  title: z.string().min(1).max(160),
  altText: z.string().min(1).max(220),
  categoryKey: galleryCategoryEnum,
  status: galleryStatusEnum,
  blobPath: z.string().min(1).max(500),
  blobUrl: z.string().url(),
  fallbackSrc: z.string().max(500).optional().default(''),
  posterBlobPath: z.string().max(500).optional().default(''),
  posterBlobUrl: z.string().max(500).optional().default(''),
  posterFallbackSrc: z.string().max(500).optional().default(''),
  orientation: z.enum(['landscape', 'portrait']).optional().default('landscape'),
  runtimeLabel: z.string().max(80).optional().default(''),
  referenceCode: z.string().max(60).optional().default(''),
  coords: z.string().max(120).optional().default(''),
  captureDate: z.string().max(120).optional().default(''),
  sortOrder: z.number().finite(),
  isVisible: z.boolean().default(true),
  notes: z.string().max(500).optional().default(''),
  filename: z.string().min(1).max(260),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export const galleryAdminManifestSchema = z.object({
  version: z.literal(1),
  updatedAt: z.string().min(1),
  source: z.enum(['default', 'admin']),
  items: z.array(galleryAdminItemSchema),
});

function getBlobToken() {
  return process.env.BLOB_READ_WRITE_TOKEN ?? '';
}

function getCategoryDefinition(categoryKey: GalleryAdminItem['categoryKey']) {
  return GALLERY_CATEGORY_DEFINITIONS.find((definition) => definition.key === categoryKey) ?? GALLERY_CATEGORY_DEFINITIONS[0];
}

function slugify(value: string) {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-');
}

function toBufferedText(stream: ReadableStream<Uint8Array>) {
  return new Response(stream).text();
}

function normalizeGalleryItem(item: GalleryAdminItem, index: number): GalleryAdminItem {
  const category = getCategoryDefinition(item.categoryKey);
  const title = item.title.trim() || `${category.label} Frame ${String(index + 1).padStart(2, '0')}`;
  const altText = item.altText.trim() || title;

  return {
    ...item,
    kind: item.kind ?? 'image',
    title,
    altText,
    coords: item.coords.trim() || category.defaultCoords,
    captureDate: item.captureDate.trim() || 'Recent',
    notes: item.notes?.trim() ?? '',
    referenceCode: item.referenceCode?.trim() ?? '',
    posterBlobPath: item.posterBlobPath?.trim() ?? '',
    posterBlobUrl: item.posterBlobUrl?.trim() ?? '',
    posterFallbackSrc: item.posterFallbackSrc?.trim() ?? '',
    orientation: item.orientation ?? 'landscape',
    runtimeLabel: item.runtimeLabel?.trim() ?? '',
    sortOrder: Number.isFinite(item.sortOrder) ? item.sortOrder : index * 10,
    isVisible: item.isVisible !== false,
    updatedAt: item.updatedAt || new Date().toISOString(),
  };
}

function createManifest(items: GalleryAdminItem[], source: GalleryAdminManifest['source']) {
  const normalizedItems = items
    .map((item, index) => normalizeGalleryItem(item, index))
    .sort((left, right) => {
      if (left.categoryKey === right.categoryKey) {
        return left.sortOrder - right.sortOrder || left.title.localeCompare(right.title);
      }

      return GALLERY_CATEGORY_KEYS.indexOf(left.categoryKey) - GALLERY_CATEGORY_KEYS.indexOf(right.categoryKey);
    });

  return {
    version: 1,
    updatedAt: new Date().toISOString(),
    source,
    items: normalizedItems,
  } satisfies GalleryAdminManifest;
}

function ensureBlobToken() {
  const token = getBlobToken();

  if (!token) {
    throw new Error('BLOB_READ_WRITE_TOKEN is required for gallery admin operations.');
  }

  return token;
}

function createUploadTitle(filename: string) {
  const extension = path.extname(filename);
  const base = path.basename(filename, extension);
  const cleaned = base.replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();

  return cleaned.replace(/\b\w/g, (character) => character.toUpperCase()) || 'New Gallery Asset';
}

function createUploadPath(filename: string) {
  const extension = (path.extname(filename) || '.jpg').toLowerCase();
  const base = path.basename(filename, extension);
  const slug = slugify(base) || 'gallery-asset';

  return `admin/gallery/uploads/${new Date().toISOString().slice(0, 10)}/${randomUUID()}-${slug}${extension}`;
}

async function loadRemoteGalleryManifest(): Promise<GalleryAdminManifest | null> {
  const token = getBlobToken();

  if (!token) {
    return null;
  }

  try {
    const blob = await get(GALLERY_ADMIN_MANIFEST_PATH, {
      access: 'private',
      token,
      useCache: false,
    });

    if (!blob || blob.statusCode !== 200 || !blob.stream) {
      return null;
    }

    const text = await toBufferedText(blob.stream);
    const parsed = galleryAdminManifestSchema.parse(JSON.parse(text));

    return createManifest(parsed.items, parsed.source);
  } catch {
    return null;
  }
}

export function hasGalleryBlobAccess() {
  return Boolean(getBlobToken());
}

export async function getGalleryAdminManifest() {
  return (await loadRemoteGalleryManifest()) ?? buildDefaultGalleryManifest();
}

export async function getGalleryPublicPayload() {
  const manifest = await getGalleryAdminManifest();

  return {
    manifest,
    groups: buildPublicGalleryGroupsFromAdminManifest(manifest),
    source: manifest.source,
    hasBlobToken: hasGalleryBlobAccess(),
  };
}

export async function saveGalleryAdminManifest(items: GalleryAdminItem[]) {
  const token = ensureBlobToken();
  const manifest = createManifest(items, 'admin');
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;

  await put(GALLERY_ADMIN_MANIFEST_PATH, serialized, {
    access: 'private',
    token,
    contentType: 'application/json; charset=utf-8',
    allowOverwrite: true,
    addRandomSuffix: false,
    cacheControlMaxAge: 60,
  });

  return manifest;
}

export async function uploadGalleryFiles(
  files: File[],
  defaults: {
    categoryKey: GalleryAdminItem['categoryKey'];
    status: GalleryAdminItem['status'];
    captureDate?: string;
    coords?: string;
    titlePrefix?: string;
  },
) {
  const token = ensureBlobToken();
  const currentManifest = await getGalleryAdminManifest();
  const category = getCategoryDefinition(defaults.categoryKey);
  const nextBaseOrder = currentManifest.items.reduce((max, item) => Math.max(max, item.sortOrder), -10) + 10;
  const now = new Date().toISOString();

  const uploadedItems: GalleryAdminItem[] = [];

  for (const [index, file] of files.entries()) {
    const kind: GalleryAdminAssetKind = file.type.startsWith('video/') ? 'video' : 'image';

    if (kind === 'image' && !file.type.startsWith('image/')) {
      throw new Error(`"${file.name}" is not a supported upload file.`);
    }

    const titleBase = defaults.titlePrefix?.trim() || createUploadTitle(file.name);
    const title = files.length > 1 ? `${titleBase} ${String(index + 1).padStart(2, '0')}` : titleBase;
    const pathname = createUploadPath(file.name);
    const blob = await put(pathname, file, {
      access: 'private',
      token,
      allowOverwrite: false,
      addRandomSuffix: false,
      contentType: file.type || undefined,
      cacheControlMaxAge: 60 * 60 * 24 * 30,
    });

    uploadedItems.push({
      id: randomUUID(),
      kind,
      title,
      altText: title,
      categoryKey: defaults.categoryKey,
      status: defaults.status,
      blobPath: blob.pathname,
      blobUrl: blob.url,
      fallbackSrc: '',
      posterBlobPath: '',
      posterBlobUrl: '',
      posterFallbackSrc: kind === 'video' ? '/media/logo.png' : '',
      orientation: 'landscape',
      runtimeLabel: '',
      referenceCode: '',
      coords: defaults.coords?.trim() || category.defaultCoords,
      captureDate: defaults.captureDate?.trim() || 'Recent',
      sortOrder: nextBaseOrder + index * 10,
      isVisible: true,
      notes: '',
      filename: file.name,
      createdAt: now,
      updatedAt: now,
    });
  }

  return saveGalleryAdminManifest([...currentManifest.items, ...uploadedItems]);
}

export async function deleteGalleryAdminItem(id: string) {
  const token = ensureBlobToken();
  const manifest = await getGalleryAdminManifest();
  const item = manifest.items.find((entry) => entry.id === id);

  if (!item) {
    throw new Error('Gallery item not found.');
  }

  if (item.blobPath) {
    await del(item.blobPath, { token });
  }

  return saveGalleryAdminManifest(manifest.items.filter((entry) => entry.id !== id));
}
