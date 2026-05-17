import { list } from '@vercel/blob';
import { readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(projectRoot, 'public');
const mediaDir = path.join(publicRoot, 'media');

process.loadEnvFile(path.join(projectRoot, '.env'));

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error('Error: BLOB_READ_WRITE_TOKEN is missing in .env');
  process.exit(1);
}

function slugifySegment(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-') || 'asset';
}

function localToBlobPathname(relativePath) {
  const ext = path.extname(relativePath).toLowerCase();
  const withoutExt = relativePath.slice(0, relativePath.length - ext.length);
  const normalized = withoutExt.split(path.sep).map(slugifySegment).join('/');
  return `site-media/${normalized}${ext}`;
}

async function collectFiles(directory) {
  const dirEntries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of dirEntries) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

async function main() {
  console.log('=== Comparing Vercel Blob storage with local files ===\n');

  try {
    // 1. Sakupi lokalne fajlove i napravi set njihovih očekivanih Vercel Blob putanja
    const localAbsoluteFiles = await collectFiles(mediaDir);
    const localBlobPathnames = new Set(
      localAbsoluteFiles.map(f => {
        const relative = path.relative(publicRoot, f);
        return localToBlobPathname(relative);
      })
    );

    // 2. Preuzmi sve sa Vercel Blob-a
    let hasMore = true;
    let cursor;
    let allBlobs = [];

    while (hasMore) {
      const response = await list({ token, cursor, limit: 500 });
      allBlobs.push(...response.blobs);
      hasMore = response.hasMore;
      cursor = response.cursor;
    }

    console.log(`Total files on Vercel: ${allBlobs.length}`);
    console.log(`Total files locally in public/media: ${localAbsoluteFiles.length}\n`);

    const untrackedBlobs = [];
    const galleryBlobs = [];

    for (const blob of allBlobs) {
      if (blob.pathname.startsWith('gallery/slike/')) {
        galleryBlobs.push(blob);
        continue;
      }

      const existsLocally = localBlobPathnames.has(blob.pathname);

      if (!existsLocally) {
        untrackedBlobs.push(blob);
      }
    }

    console.log(`--- Files on Vercel Blob that DO NOT exist locally (${untrackedBlobs.length}) ---`);
    if (untrackedBlobs.length === 0) {
      console.log('None! All site-media files on Vercel are perfectly tracked locally.');
    } else {
      untrackedBlobs.forEach((blob, i) => {
        console.log(`[${i + 1}] ${blob.pathname} (${(blob.size / 1024 / 1024).toFixed(2)} MB) - URL: ${blob.url}`);
      });
    }

    console.log('\n--- Gallery (gallery/slike/*) Blobs on Vercel ---');
    console.log(`Found ${galleryBlobs.length} gallery images on Vercel Blob.`);

  } catch (error) {
    console.error('Error:', error.message);
  }
}

main();
