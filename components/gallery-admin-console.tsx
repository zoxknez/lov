'use client';

import { useDeferredValue, useEffect, useState, useTransition } from 'react';
import Image from 'next/image';
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Loader2,
  Lock,
  LogOut,
  Play,
  RefreshCcw,
  Save,
  Search,
  Trash2,
  UploadCloud,
} from 'lucide-react';
import {
  GALLERY_CATEGORY_DEFINITIONS,
  type GalleryAdminItem,
  type GalleryAdminManifest,
  type GalleryCategoryKey,
} from '@/lib/gallery-core';

type GalleryAdminConsoleProps = {
  authenticated: boolean;
  initialManifest: GalleryAdminManifest | null;
  config: {
    configured: boolean;
    hasPassword: boolean;
    hasSessionSecret: boolean;
    hasBlobToken: boolean;
  };
};

type BannerTone = 'success' | 'error' | 'info';

function buildAdminImageSrc(item: GalleryAdminItem) {
  if (!item.blobPath) {
    return item.fallbackSrc || item.blobUrl || '/media/logo.png';
  }

  const params = new URLSearchParams({
    pathname: item.blobPath,
    fallback: item.fallbackSrc || item.blobUrl || '/media/logo.png',
  });

  return `/api/blob-image?${params.toString()}`;
}

function buildAdminPosterSrc(item: GalleryAdminItem) {
  if (item.posterBlobPath) {
    const params = new URLSearchParams({
      pathname: item.posterBlobPath,
      fallback: item.posterFallbackSrc || '/media/logo.png',
    });

    return `/api/blob-image?${params.toString()}`;
  }

  return item.posterFallbackSrc || '/media/logo.png';
}

function isVideoItem(item: GalleryAdminItem) {
  return item.kind === 'video';
}

function formatTimestamp(value: string | undefined) {
  if (!value) return 'Not published yet';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(date);
}

function getBannerClasses(tone: BannerTone) {
  if (tone === 'success') return 'border-emerald-400/25 bg-emerald-400/10 text-emerald-100';
  if (tone === 'error') return 'border-rose-400/25 bg-rose-400/10 text-rose-100';
  return 'border-gold-400/25 bg-gold-400/10 text-gold-100';
}

export default function GalleryAdminConsole({ authenticated, initialManifest, config }: GalleryAdminConsoleProps) {
  const [manifest, setManifest] = useState<GalleryAdminManifest | null>(initialManifest);
  const [selectedId, setSelectedId] = useState(initialManifest?.items[0]?.id ?? '');
  const [banner, setBanner] = useState<{ tone: BannerTone; text: string } | null>(null);
  const [password, setPassword] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const [activeCategory, setActiveCategory] = useState<GalleryCategoryKey | 'all'>('all');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [uploadCategory, setUploadCategory] = useState<GalleryCategoryKey>('red-deer');
  const [uploadStatus, setUploadStatus] = useState<GalleryAdminItem['status']>('CURATED');
  const [uploadDate, setUploadDate] = useState('Recent');
  const [uploadCoords, setUploadCoords] = useState('');
  const [uploadTitlePrefix, setUploadTitlePrefix] = useState('');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!manifest?.items.length) {
      setSelectedId('');
      return;
    }

    if (!manifest.items.some((item) => item.id === selectedId)) {
      setSelectedId(manifest.items[0]?.id ?? '');
    }
  }, [manifest, selectedId]);

  const items = manifest?.items.slice().sort((left, right) => {
    if (left.categoryKey === right.categoryKey) {
      return left.sortOrder - right.sortOrder || left.title.localeCompare(right.title);
    }

    return GALLERY_CATEGORY_DEFINITIONS.findIndex((entry) => entry.key === left.categoryKey)
      - GALLERY_CATEGORY_DEFINITIONS.findIndex((entry) => entry.key === right.categoryKey);
  }) ?? [];

  const filteredItems = items.filter((item) => {
    if (activeCategory !== 'all' && item.categoryKey !== activeCategory) return false;
    if (!deferredSearchQuery.trim()) return true;

    const haystack = [item.title, item.referenceCode, item.filename, item.notes].filter(Boolean).join(' ').toLowerCase();
    return haystack.includes(deferredSearchQuery.trim().toLowerCase());
  });

  const selectedItem = items.find((item) => item.id === selectedId) ?? null;
  const visibleCount = items.filter((item) => item.isVisible).length;
  const usedCategories = new Set(items.map((item) => item.categoryKey)).size;

  function applyServerManifest(nextManifest: GalleryAdminManifest, tone: BannerTone, text: string) {
    setManifest(nextManifest);
    setIsDirty(false);
    setBanner({ tone, text });
    if (!nextManifest.items.some((item) => item.id === selectedId)) {
      setSelectedId(nextManifest.items[0]?.id ?? '');
    }
  }

  function updateManifestItems(updater: (current: GalleryAdminItem[]) => GalleryAdminItem[]) {
    setManifest((current) => {
      if (!current) return current;

      return {
        ...current,
        items: updater(current.items),
      };
    });
    setIsDirty(true);
  }

  function updateSelectedItem(patch: Partial<GalleryAdminItem>) {
    if (!selectedItem) return;

    updateManifestItems((current) =>
      current.map((item) =>
        item.id === selectedItem.id
          ? {
              ...item,
              ...patch,
              updatedAt: new Date().toISOString(),
            }
          : item,
      ),
    );
  }

  function moveSelectedItem(direction: 'up' | 'down') {
    if (!selectedItem) return;

    const sameCategory = items.filter((item) => item.categoryKey === selectedItem.categoryKey);
    const currentIndex = sameCategory.findIndex((item) => item.id === selectedItem.id);
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const target = sameCategory[targetIndex];

    if (!target) return;

    updateManifestItems((current) =>
      current.map((item) => {
        if (item.id === selectedItem.id) return { ...item, sortOrder: target.sortOrder, updatedAt: new Date().toISOString() };
        if (item.id === target.id) return { ...item, sortOrder: selectedItem.sortOrder, updatedAt: new Date().toISOString() };
        return item;
      }),
    );
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBanner(null);

    const response = await fetch('/api/admin/gallery/session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const payload = (await response.json()) as { ok?: boolean; error?: string };

    if (!response.ok || !payload.ok) {
      setBanner({ tone: 'error', text: payload.error || 'Login failed.' });
      return;
    }

    window.location.reload();
  }

  async function handleLogout() {
    await fetch('/api/admin/gallery/session', { method: 'DELETE' });
    window.location.reload();
  }

  async function refreshManifest() {
    const response = await fetch('/api/admin/gallery', { cache: 'no-store' });
    const payload = (await response.json()) as { ok?: boolean; error?: string; manifest?: GalleryAdminManifest };

    if (!response.ok || !payload.ok || !payload.manifest) {
      throw new Error(payload.error || 'Unable to refresh gallery.');
    }

    applyServerManifest(payload.manifest, 'info', 'Admin gallery refreshed.');
  }

  async function handleSave() {
    if (!manifest) return;

    setIsSaving(true);
    setBanner(null);

    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: manifest.items }),
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; manifest?: GalleryAdminManifest };

      if (!response.ok || !payload.ok || !payload.manifest) {
        throw new Error(payload.error || 'Unable to publish gallery changes.');
      }

      applyServerManifest(payload.manifest, 'success', 'Gallery changes have been published.');
    } catch (error) {
      setBanner({ tone: 'error', text: error instanceof Error ? error.message : 'Unable to publish gallery changes.' });
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uploadFiles.length) {
      setBanner({ tone: 'error', text: 'Select at least one image first.' });
      return;
    }

    setIsUploading(true);
    setBanner(null);

    try {
      const formData = new FormData();
      uploadFiles.forEach((file) => formData.append('files', file));
      formData.append('categoryKey', uploadCategory);
      formData.append('status', uploadStatus);
      formData.append('captureDate', uploadDate);
      formData.append('coords', uploadCoords);
      formData.append('titlePrefix', uploadTitlePrefix);

      const response = await fetch('/api/admin/gallery/upload', {
        method: 'POST',
        body: formData,
      });
      const payload = (await response.json()) as { ok?: boolean; error?: string; manifest?: GalleryAdminManifest };

      if (!response.ok || !payload.ok || !payload.manifest) {
        throw new Error(payload.error || 'Upload failed.');
      }

      setUploadFiles([]);
      setUploadTitlePrefix('');
      setUploadDate('Recent');
      setUploadCoords('');
      setSelectedId(payload.manifest.items[payload.manifest.items.length - 1]?.id ?? '');
      applyServerManifest(payload.manifest, 'success', 'Upload complete and added to the archive.');
    } catch (error) {
      setBanner({ tone: 'error', text: error instanceof Error ? error.message : 'Upload failed.' });
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDelete(itemId: string) {
    if (!window.confirm('Delete this gallery item permanently?')) return;

    const response = await fetch(`/api/admin/gallery?id=${encodeURIComponent(itemId)}`, {
      method: 'DELETE',
    });
    const payload = (await response.json()) as { ok?: boolean; error?: string; manifest?: GalleryAdminManifest };

    if (!response.ok || !payload.ok || !payload.manifest) {
      setBanner({ tone: 'error', text: payload.error || 'Unable to delete item.' });
      return;
    }

    applyServerManifest(payload.manifest, 'success', 'Gallery item deleted.');
  }

  if (!config.configured) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-4 py-10 text-white sm:px-6">
        <div className="rounded-[2.2rem] border border-rose-400/20 bg-rose-400/10 p-6 shadow-premium backdrop-blur-xl sm:p-8">
          <div className="flex items-start gap-4">
            <AlertCircle className="mt-1 h-6 w-6 shrink-0 text-rose-200" />
            <div>
              <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Gallery Admin Needs Configuration</h1>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">
                Add `GALLERY_ADMIN_PASSWORD`, `GALLERY_ADMIN_SESSION_SECRET`, and `BLOB_READ_WRITE_TOKEN` to unlock uploads and publishing.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl items-center px-4 py-10 text-white sm:px-6">
        <section className="w-full rounded-[2.2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-premium backdrop-blur-3xl sm:p-8">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold-400/25 bg-gold-400/10 text-gold-200">
            <Lock className="h-6 w-6" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-bold uppercase tracking-tight">Gallery Control Room</h1>
          <p className="mt-3 text-sm leading-relaxed text-white/65">Enter the shared password to open the admin workspace.</p>
          {banner && <div className={`mt-6 rounded-[1.3rem] border px-4 py-3 text-sm ${getBannerClasses(banner.tone)}`}>{banner.text}</div>}
          <form className="mt-6 space-y-4" onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
              placeholder="Admin password"
              className="w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none placeholder:text-white/20"
            />
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-[1.2rem] border border-gold-400/35 bg-gold-400/15 px-4 py-3 text-sm font-black uppercase tracking-[0.22em] text-gold-100">
              Open Admin
            </button>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,169,110,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_24%)]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <section className="mb-6 rounded-[2.4rem] border border-gold-400/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-6 shadow-premium backdrop-blur-3xl sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gold-300/60">Control Room // Gallery Administration</p>
              <h1 className="mt-4 font-display text-5xl font-bold uppercase tracking-tight sm:text-6xl">Client Gallery Admin</h1>
              <p className="mt-4 text-sm leading-relaxed text-white/65">
                Upload new photos, sort them by species, edit titles and alt text, then publish the public gallery from one place.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4">
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/28">Items</p>
                <p className="mt-2 font-display text-3xl font-bold">{String(items.length).padStart(2, '0')}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4">
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/28">Visible</p>
                <p className="mt-2 font-display text-3xl font-bold text-gold-300">{String(visibleCount).padStart(2, '0')}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/30 px-4 py-4">
                <p className="text-[9px] font-black uppercase tracking-[0.24em] text-white/28">Species</p>
                <p className="mt-2 font-display text-3xl font-bold">{String(usedCategories).padStart(2, '0')}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-sm text-white/60">Last published {formatTimestamp(manifest?.updatedAt)}</p>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => startTransition(() => void refreshManifest().catch((error) => setBanner({ tone: 'error', text: error instanceof Error ? error.message : 'Unable to refresh gallery.' })))}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/70"
            >
              <RefreshCcw className={`h-4 w-4 ${isPending ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={!isDirty || isSaving || !config.hasBlobToken}
              className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/15 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-gold-100 disabled:opacity-45"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {isDirty ? 'Publish Changes' : 'Published'}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white/70"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>

        {!config.hasBlobToken && (
          <div className="mb-6 rounded-[1.5rem] border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">
            `BLOB_READ_WRITE_TOKEN` is missing. Viewing still works, but upload, delete, and publish actions need Blob access.
          </div>
        )}
        {banner && <div className={`mb-6 rounded-[1.5rem] border px-4 py-3 text-sm ${getBannerClasses(banner.tone)}`}>{banner.text}</div>}

        <div className="grid gap-6 xl:grid-cols-[22rem_minmax(0,1fr)]">
          <aside className="space-y-6">
            <form onSubmit={handleUpload} className="rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-premium backdrop-blur-2xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold-400/25 bg-gold-400/10 text-gold-200">
                  <UploadCloud className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/28">Upload</p>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight">New Assets</h2>
                </div>
              </div>
              <div className="space-y-4">
                <input type="file" accept="image/*,video/mp4" multiple onChange={(event) => setUploadFiles(Array.from(event.target.files ?? []))} className="block w-full rounded-[1.2rem] border border-dashed border-white/15 bg-black/25 px-4 py-4 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-gold-400/15 file:px-3 file:py-2 file:text-xs file:font-black file:uppercase file:tracking-[0.18em] file:text-gold-100" />
                <select value={uploadCategory} onChange={(event) => setUploadCategory(event.target.value as GalleryCategoryKey)} className="w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none">
                  {GALLERY_CATEGORY_DEFINITIONS.map((category) => <option key={category.key} value={category.key}>{category.label}</option>)}
                </select>
                <select value={uploadStatus} onChange={(event) => setUploadStatus(event.target.value as GalleryAdminItem['status'])} className="w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none">
                  {['CURATED', 'FIELD', 'NEW', 'FEATURED'].map((status) => <option key={status} value={status}>{status}</option>)}
                </select>
                <input value={uploadTitlePrefix} onChange={(event) => setUploadTitlePrefix(event.target.value)} placeholder="Optional title prefix" className="w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none placeholder:text-white/20" />
                <div className="grid gap-3 sm:grid-cols-2">
                  <input value={uploadDate} onChange={(event) => setUploadDate(event.target.value)} placeholder="Recent" className="w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none placeholder:text-white/20" />
                  <input value={uploadCoords} onChange={(event) => setUploadCoords(event.target.value)} placeholder="Coords / location" className="w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none placeholder:text-white/20" />
                </div>
                <button type="submit" disabled={isUploading || !uploadFiles.length || !config.hasBlobToken} className="inline-flex w-full items-center justify-center gap-3 rounded-[1.2rem] border border-gold-400/30 bg-gold-400/15 px-4 py-3 text-[11px] font-black uppercase tracking-[0.22em] text-gold-100 disabled:opacity-45">
                  {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
                  Upload To Archive
                </button>
              </div>
            </form>

            <div className="rounded-[2rem] border border-white/10 bg-black/35 p-5 shadow-premium backdrop-blur-2xl">
              <div className="mb-4 flex items-center gap-3">
                <Search className="h-4 w-4 text-gold-300" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/28">Browser</p>
                  <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Archive Items</h2>
                </div>
              </div>
              <input value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} placeholder="Search title, code, file" className="mb-4 w-full rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none placeholder:text-white/20" />
              <div className="mb-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => setActiveCategory('all')} className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] ${activeCategory === 'all' ? 'border-gold-400/35 bg-gold-400/15 text-gold-100' : 'border-white/10 bg-white/[0.03] text-white/55'}`}>All</button>
                {GALLERY_CATEGORY_DEFINITIONS.map((category) => (
                  <button key={category.key} type="button" onClick={() => setActiveCategory(category.key)} className={`rounded-full border px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] ${activeCategory === category.key ? 'border-gold-400/35 bg-gold-400/15 text-gold-100' : 'border-white/10 bg-white/[0.03] text-white/55'}`}>
                    {category.label}
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                {filteredItems.length ? filteredItems.map((item) => (
                  <button key={item.id} type="button" onClick={() => setSelectedId(item.id)} className={`flex w-full items-center gap-3 rounded-[1.2rem] border p-3 text-left ${selectedId === item.id ? 'border-gold-400/35 bg-gold-400/12' : 'border-white/10 bg-white/[0.03]'}`}>
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[1rem] border border-white/10 bg-black/30">
                      {isVideoItem(item) ? (
                        <>
                          <video muted playsInline preload="metadata" poster={buildAdminPosterSrc(item)} className="h-full w-full object-cover">
                            <source src={buildAdminImageSrc(item)} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gold-400/30 bg-black/55 text-gold-200">
                              <Play className="ml-0.5 h-3.5 w-3.5" />
                            </div>
                          </div>
                        </>
                      ) : (
                        <Image src={buildAdminImageSrc(item)} alt={item.altText} fill sizes="64px" className="object-cover" />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[10px] font-black uppercase tracking-[0.2em] text-gold-200/80">{item.referenceCode || 'Draft Code'}</p>
                      <p className="truncate font-semibold text-white">{item.title}</p>
                      <p className="truncate text-xs text-white/40">{item.filename}</p>
                    </div>
                  </button>
                )) : <div className="rounded-[1.2rem] border border-dashed border-white/10 bg-black/20 px-4 py-6 text-center text-sm text-white/45">No items for this filter.</div>}
              </div>
            </div>
          </aside>

          <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5 shadow-premium backdrop-blur-3xl sm:p-6">
            {selectedItem ? (
              <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="space-y-4">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/30">
                    {isVideoItem(selectedItem) ? (
                      <video controls playsInline preload="metadata" poster={buildAdminPosterSrc(selectedItem)} className="h-full w-full object-cover">
                        <source src={buildAdminImageSrc(selectedItem)} type="video/mp4" />
                      </video>
                    ) : (
                      <Image src={buildAdminImageSrc(selectedItem)} alt={selectedItem.altText} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/10 bg-black/45 px-3 py-1 text-[9px] font-black uppercase tracking-[0.22em] text-gold-100">{selectedItem.referenceCode || 'Draft Code'}</div>
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gold-200/80">{GALLERY_CATEGORY_DEFINITIONS.find((entry) => entry.key === selectedItem.categoryKey)?.label}</p>
                      <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight">{selectedItem.title}</h2>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded-[1.3rem] border border-white/10 bg-black/25 px-4 py-4"><p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/28">Visible</p><p className="mt-2 text-sm font-semibold text-white">{selectedItem.isVisible ? 'Live on site' : 'Hidden'}</p></div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-black/25 px-4 py-4"><p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/28">Order</p><p className="mt-2 text-sm font-semibold text-white">{selectedItem.sortOrder}</p></div>
                    <div className="rounded-[1.3rem] border border-white/10 bg-black/25 px-4 py-4"><p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/28">Updated</p><p className="mt-2 text-sm font-semibold text-white">{formatTimestamp(selectedItem.updatedAt)}</p></div>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-[0.28em] text-white/28">Editor</p>
                      <h2 className="font-display text-3xl font-bold uppercase tracking-tight">Asset Details</h2>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button type="button" onClick={() => moveSelectedItem('up')} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/60"><ArrowUp className="h-4 w-4" />Up</button>
                      <button type="button" onClick={() => moveSelectedItem('down')} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-white/60"><ArrowDown className="h-4 w-4" />Down</button>
                      <button type="button" onClick={() => void handleDelete(selectedItem.id)} disabled={!config.hasBlobToken} className="inline-flex items-center gap-2 rounded-full border border-rose-400/20 bg-rose-400/10 px-3 py-2 text-[10px] font-black uppercase tracking-[0.22em] text-rose-100 disabled:opacity-45"><Trash2 className="h-4 w-4" />Delete</button>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <input value={selectedItem.title} onChange={(event) => updateSelectedItem({ title: event.target.value })} placeholder="Display title" className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none sm:col-span-2" />
                    <input value={selectedItem.altText} onChange={(event) => updateSelectedItem({ altText: event.target.value })} placeholder="Alt text" className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none sm:col-span-2" />
                    <select value={selectedItem.categoryKey} onChange={(event) => updateSelectedItem({ categoryKey: event.target.value as GalleryCategoryKey })} className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none">
                      {GALLERY_CATEGORY_DEFINITIONS.map((category) => <option key={category.key} value={category.key}>{category.label}</option>)}
                    </select>
                    <select value={selectedItem.status} onChange={(event) => updateSelectedItem({ status: event.target.value as GalleryAdminItem['status'] })} className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none">
                      {['CURATED', 'FIELD', 'NEW', 'FEATURED'].map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <input value={selectedItem.referenceCode || ''} onChange={(event) => updateSelectedItem({ referenceCode: event.target.value })} placeholder="Reference code" className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" />
                    <input type="number" value={selectedItem.sortOrder} onChange={(event) => updateSelectedItem({ sortOrder: Number(event.target.value) })} placeholder="Sort order" className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" />
                    <input value={selectedItem.captureDate} onChange={(event) => updateSelectedItem({ captureDate: event.target.value })} placeholder="Capture date" className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" />
                    <input value={selectedItem.coords} onChange={(event) => updateSelectedItem({ coords: event.target.value })} placeholder="Coords / location" className="rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none" />
                    <textarea value={selectedItem.notes || ''} onChange={(event) => updateSelectedItem({ notes: event.target.value })} placeholder="Internal notes" className="min-h-28 rounded-[1.2rem] border border-white/10 bg-black/35 px-4 py-3 text-white outline-none sm:col-span-2" />
                  </div>

                  <label className="flex items-center gap-3 rounded-[1.2rem] border border-white/10 bg-black/25 px-4 py-4">
                    <input type="checkbox" checked={selectedItem.isVisible} onChange={(event) => updateSelectedItem({ isVisible: event.target.checked })} className="h-4 w-4" />
                    <div>
                      <p className="text-sm font-semibold text-white">Visible on live site</p>
                      <p className="text-xs text-white/45">Turn this off to hide the asset without deleting it.</p>
                    </div>
                  </label>
                </div>
              </div>
            ) : (
              <div className="flex min-h-[28rem] items-center justify-center rounded-[1.8rem] border border-dashed border-white/10 bg-black/20 px-6 text-center text-white/55">
                Select an archive item on the left, or upload fresh images to start building the gallery.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
