import blobAssetManifest from '@/lib/blob-asset-manifest.json';

type BlobAssetEntry = {
  localSrc: string;
  blobPath: string;
  blobUrl: string;
};

function normalizeLocalSrc(localSrc: string) {
  const [pathname, suffix = ''] = localSrc.split(/([?#].*)/, 2);

  const encodedPath = decodeURIComponent(pathname)
    .split('/')
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join('/');

  return `${encodedPath}${suffix}`;
}

const assetMap = new Map<string, BlobAssetEntry>(
  (blobAssetManifest as BlobAssetEntry[]).map((entry) => [normalizeLocalSrc(entry.localSrc), entry]),
);

export function getBlobAssetUrl(localSrc: string) {
  const normalizedSrc = normalizeLocalSrc(localSrc);
  const entry = assetMap.get(normalizedSrc);

  if (!entry) {
    return normalizedSrc;
  }

  const params = new URLSearchParams({
    pathname: entry.blobPath,
    fallback: normalizedSrc,
  });

  return `/api/blob-image?${params.toString()}`;
}

export function getAbsoluteBlobAssetUrl(localSrc: string, siteUrl?: string | null) {
  const resolvedSrc = getBlobAssetUrl(localSrc);

  if (!siteUrl) {
    return resolvedSrc;
  }

  return new URL(resolvedSrc, siteUrl).toString();
}
