import GalleryAdminConsole from '@/components/gallery-admin-console';
import { getGalleryAdminConfigState, isGalleryAdminAuthenticated } from '@/lib/gallery-admin-auth';
import { getGalleryAdminManifest, hasGalleryBlobAccess } from '@/lib/gallery-admin-server';

export default async function GalleryAdminPage() {
  const config = getGalleryAdminConfigState();
  const authenticated = config.configured ? await isGalleryAdminAuthenticated() : false;
  const manifest = authenticated ? await getGalleryAdminManifest() : null;

  return (
    <GalleryAdminConsole
      authenticated={authenticated}
      initialManifest={manifest}
      config={{
        ...config,
        hasBlobToken: hasGalleryBlobAccess(),
      }}
    />
  );
}
