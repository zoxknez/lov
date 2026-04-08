import { Suspense } from 'react';
import GalleryAdminConsole from '@/components/gallery-admin-console';
import { getGalleryAdminConfigState, isGalleryAdminAuthenticated } from '@/lib/gallery-admin-auth';
import { getGalleryAdminManifest, hasGalleryBlobAccess } from '@/lib/gallery-admin-server';

function GalleryAdminLoadingState() {
  return (
    <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-10 text-white sm:px-6">
      <section className="w-full rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-premium backdrop-blur-3xl sm:p-8">
        <p className="text-[10px] font-black uppercase tracking-[0.34em] text-gold-300/60">Control Room // Loading</p>
        <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight">Preparing Gallery Admin</h1>
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          The control room is loading your session and latest archive manifest.
        </p>
      </section>
    </main>
  );
}

async function GalleryAdminGate() {
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

export default function GalleryAdminPage() {
  return (
    <Suspense fallback={<GalleryAdminLoadingState />}>
      <GalleryAdminGate />
    </Suspense>
  );
}
