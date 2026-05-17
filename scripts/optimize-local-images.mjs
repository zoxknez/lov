import sharp from 'sharp';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');
const publicRoot = path.join(projectRoot, 'public');
const mediaDir = path.join(publicRoot, 'media');

const mimeTypes = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

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

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

async function main() {
  console.log('=== Kaimanawa Image Optimization Process ===');
  console.log(`Searching for images in: ${mediaDir}\n`);

  let allFiles;
  try {
    allFiles = await collectFiles(mediaDir);
  } catch (error) {
    console.error('Error listing files in media folder:', error);
    return;
  }

  const imageFiles = allFiles.filter((filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return ext in mimeTypes;
  });

  console.log(`Found ${imageFiles.length} image files to optimize.\n`);

  let totalOriginalSize = 0;
  let totalOptimizedSize = 0;
  let optimizedCount = 0;

  for (const [index, filePath] of imageFiles.entries()) {
    const relativePath = path.relative(publicRoot, filePath);
    const ext = path.extname(filePath).toLowerCase();

    try {
      const originalBuffer = await readFile(filePath);
      const originalSize = originalBuffer.length;
      totalOriginalSize += originalSize;

      // Inicijalizujemo sharp sa originalnim bufferom
      let pipeline = sharp(originalBuffer);

      // Dobijamo metapodatke slike (širinu i visinu)
      const metadata = await pipeline.metadata();
      const needsResize = metadata.width > 1920 || metadata.height > 1920;

      if (needsResize) {
        pipeline = pipeline.resize({
          width: 1920,
          height: 1920,
          fit: 'inside',
          withoutEnlargement: true,
        });
      }

      // Primenjujemo optimalnu kompresiju u zavisnosti od formata
      if (ext === '.jpg' || ext === '.jpeg') {
        pipeline = pipeline.jpeg({ quality: 80, progressive: true });
      } else if (ext === '.png') {
        // Koristimo lossy PNG kompresiju (quality: 80) koja pruža ogromnu uštedu za logo i UI elemente
        pipeline = pipeline.png({ quality: 80, compressionLevel: 9 });
      } else if (ext === '.webp') {
        pipeline = pipeline.webp({ quality: 80 });
      }

      const optimizedBuffer = await pipeline.toBuffer();
      const optimizedSize = optimizedBuffer.length;
      totalOptimizedSize += optimizedSize;

      const sizeDiff = originalSize - optimizedSize;
      const percentSaved = ((sizeDiff / originalSize) * 100).toFixed(1);

      if (sizeDiff > 0) {
        // Zamenjujemo originalni fajl optimizovanim
        await writeFile(filePath, optimizedBuffer);
        console.log(
          `[${index + 1}/${imageFiles.length}] OPTIMIZED: ${relativePath}\n` +
          `  - Original:  ${formatSize(originalSize)}\n` +
          `  - Optimized: ${formatSize(optimizedSize)}\n` +
          `  - Saved:     ${formatSize(sizeDiff)} (${percentSaved}%)\n`
        );
        optimizedCount++;
      } else {
        console.log(
          `[${index + 1}/${imageFiles.length}] SKIPPED (already optimized): ${relativePath}\n` +
          `  - Size: ${formatSize(originalSize)}\n`
        );
      }
    } catch (error) {
      console.error(`\nError optimizing ${relativePath}:`, error.message, '\n');
    }
  }

  const grandSaved = totalOriginalSize - totalOptimizedSize;
  const grandSavedPercent = ((grandSaved / totalOriginalSize) * 100).toFixed(1);

  console.log('=== Optimization Summary ===');
  console.log(`Total Images Processed: ${imageFiles.length}`);
  console.log(`Successfully Optimized: ${optimizedCount}`);
  console.log(`Total Original Size:    ${formatSize(totalOriginalSize)}`);
  console.log(`Total Optimized Size:   ${formatSize(totalOptimizedSize)}`);
  console.log(`Grand Total Saved:      ${formatSize(grandSaved)} (${grandSavedPercent}% saved!)\n`);
}

main();
