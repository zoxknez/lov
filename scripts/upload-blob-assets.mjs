import { put } from '@vercel/blob';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(projectRoot, 'public');
const inputDir = path.join(publicRoot, 'media');
const outputFile = path.join(projectRoot, 'lib', 'blob-asset-manifest.json');

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  throw new Error('BLOB_READ_WRITE_TOKEN is required.');
}

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
};

function slugifySegment(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-') || 'asset';
}

function toLocalSrc(relativePath) {
  return `/${relativePath.split(path.sep).map(encodeURIComponent).join('/')}`;
}

function toBlobPath(relativePath) {
  const ext = path.extname(relativePath).toLowerCase();
  const withoutExt = relativePath.slice(0, relativePath.length - ext.length);
  const normalized = withoutExt.split(path.sep).map(slugifySegment).join('/');
  return `site-media/${normalized}${ext}`;
}

async function collectFiles(directory) {
  const dirEntries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of dirEntries.sort((left, right) => left.name.localeCompare(right.name))) {
    const absolutePath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectFiles(absolutePath)));
      continue;
    }

    files.push(absolutePath);
  }

  return files;
}

const files = (await collectFiles(inputDir))
  .map((absolutePath) => path.relative(publicRoot, absolutePath))
  .filter((relativePath) => !relativePath.startsWith(path.join('media', 'slike') + path.sep));

const manifest = [];

for (const [index, relativePath] of files.entries()) {
  const ext = path.extname(relativePath).toLowerCase();
  const absolutePath = path.join(publicRoot, relativePath);
  const localSrc = toLocalSrc(relativePath);
  const pathname = toBlobPath(relativePath);
  const body = await readFile(absolutePath);

  const blob = await put(pathname, body, {
    access: 'private',
    token,
    allowOverwrite: true,
    addRandomSuffix: false,
    ...(mimeTypes[ext] ? { contentType: mimeTypes[ext] } : {}),
  });

  manifest.push({
    localSrc,
    blobPath: blob.pathname,
    blobUrl: blob.url,
  });

  console.log(`[${index + 1}/${files.length}] ${relativePath} -> ${blob.pathname}`);
}

await writeFile(outputFile, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');

console.log(`Saved Blob asset manifest to ${outputFile}`);
