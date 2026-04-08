import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getGalleryAdminConfigState, isGalleryAdminAuthenticated } from '@/lib/gallery-admin-auth';
import {
  deleteGalleryAdminItem,
  galleryAdminItemSchema,
  getGalleryAdminManifest,
  hasGalleryBlobAccess,
  saveGalleryAdminManifest,
} from '@/lib/gallery-admin-server';

const updateSchema = z.object({
  items: z.array(galleryAdminItemSchema),
});

function unauthorizedResponse() {
  return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
}

export async function GET() {
  if (!(await isGalleryAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const manifest = await getGalleryAdminManifest();
  const authConfig = getGalleryAdminConfigState();

  return NextResponse.json(
    {
      ok: true,
      manifest,
      capabilities: {
        configured: authConfig.configured,
        hasBlobToken: hasGalleryBlobAccess(),
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    },
  );
}

export async function PUT(request: Request) {
  if (!(await isGalleryAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  try {
    const body = await request.json();
    const payload = updateSchema.parse(body);
    const manifest = await saveGalleryAdminManifest(payload.items);

    return NextResponse.json({ ok: true, manifest }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'Invalid gallery payload.' }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Unable to save gallery.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await isGalleryAdminAuthenticated())) {
    return unauthorizedResponse();
  }

  const itemId = new URL(request.url).searchParams.get('id');

  if (!itemId) {
    return NextResponse.json({ ok: false, error: 'Item id is required.' }, { status: 400 });
  }

  try {
    const manifest = await deleteGalleryAdminItem(itemId);

    return NextResponse.json({ ok: true, manifest }, { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to delete item.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
