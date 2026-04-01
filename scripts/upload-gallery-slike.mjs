import { put } from '@vercel/blob';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const inputDir = path.join(projectRoot, 'public', 'media', 'slike');
const outputFile = path.join(projectRoot, 'lib', 'gallery-slike.json');

process.loadEnvFile(path.join(projectRoot, '.env'));

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  throw new Error('BLOB_READ_WRITE_TOKEN is required.');
}

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

function toSlug(filename) {
  const ext = path.extname(filename).toLowerCase();
  const base = path.basename(filename, ext);
  return (
    base
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .replace(/-+/g, '-') + ext
  );
}

const dirEntries = await readdir(inputDir, { withFileTypes: true });
const files = dirEntries
  .filter((entry) => entry.isFile())
  .map((entry) => entry.name)
  .sort((left, right) => left.localeCompare(right));

const manifest = [];

for (const [index, filename] of files.entries()) {
  const ext = path.extname(filename).toLowerCase();
  const localPath = path.join(inputDir, filename);
  const localSrc = `/media/slike/${encodeURIComponent(filename)}`;
  const pathname = `gallery/slike/${String(index + 1).padStart(2, '0')}-${toSlug(filename)}`;
  const body = await readFile(localPath);

  const blob = await put(pathname, body, {
    access: 'private',
    token,
    allowOverwrite: true,
    addRandomSuffix: false,
    ...(mimeTypes[ext] ? { contentType: mimeTypes[ext] } : {}),
  });

  manifest.push({
    alt: `Field photo ${String(index + 1).padStart(2, '0')}`,
    localSrc,
    blobPath: blob.pathname,
    blobUrl: blob.url,
  });

  console.log(`[${index + 1}/${files.length}] ${filename} -> ${blob.pathname}`);
}

await writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Saved gallery manifest to ${outputFile}`);
