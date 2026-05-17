import { list } from '@vercel/blob';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

process.loadEnvFile(path.join(projectRoot, '.env'));

const token = process.env.BLOB_READ_WRITE_TOKEN;

if (!token) {
  console.error('Error: BLOB_READ_WRITE_TOKEN is missing in .env');
  process.exit(1);
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log('=== Checking all Vercel Blob Storage assets ===\n');

  try {
    let hasMore = true;
    let cursor;
    let allBlobs = [];

    while (hasMore) {
      const response = await list({
        token,
        cursor,
        limit: 500,
      });

      allBlobs.push(...response.blobs);
      hasMore = response.hasMore;
      cursor = response.cursor;
    }

    console.log(`Total blobs found on Vercel: ${allBlobs.length}\n`);

    // Sortirajmo blobi po veličini (najveći prvi)
    const sortedBlobs = allBlobs.sort((left, right) => right.size - left.size);

    console.log('--- Top 30 Largest Blobs on Vercel ---');
    let totalSize = 0;
    let countLarge = 0;

    for (const [index, blob] of sortedBlobs.entries()) {
      totalSize += blob.size;
      const isTooLarge = blob.size > 1024 * 1024; // > 1MB

      if (isTooLarge) {
        countLarge++;
      }

      if (index < 30) {
        console.log(
          `[${index + 1}] ${blob.pathname}\n` +
          `  - Size:         ${formatSize(blob.size)}${isTooLarge ? ' ⚠️ [TOO LARGE]' : ''}\n` +
          `  - URL:          ${blob.url}\n` +
          `  - Uploaded At:  ${new Date(blob.uploadedAt).toLocaleString()}\n`
        );
      }
    }

    console.log('------------------------------------');
    console.log(`Total size of all assets:  ${formatSize(totalSize)}`);
    console.log(`Blobs larger than 1MB:     ${countLarge} / ${allBlobs.length}\n`);

  } catch (error) {
    console.error('Error fetching Vercel Blob list:', error.message);
  }
}

main();
