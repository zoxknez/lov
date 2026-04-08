import { NextResponse } from 'next/server';
import { getGalleryPublicPayload } from '@/lib/gallery-admin-server';

export async function GET() {
  const payload = await getGalleryPublicPayload();

  return NextResponse.json(
    {
      ok: true,
      groups: payload.groups,
      updatedAt: payload.manifest.updatedAt,
      source: payload.source,
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}
