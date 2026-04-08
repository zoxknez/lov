import { NextResponse } from 'next/server';
import { z } from 'zod';
import { isGalleryAdminAuthenticated } from '@/lib/gallery-admin-auth';
import { GALLERY_CATEGORY_KEYS, GALLERY_STATUSES } from '@/lib/gallery-core';
import { uploadGalleryFiles } from '@/lib/gallery-admin-server';

const uploadSchema = z.object({
  categoryKey: z.enum(GALLERY_CATEGORY_KEYS),
  status: z.enum(GALLERY_STATUSES),
  captureDate: z.string().max(120).optional().default('Recent'),
  coords: z.string().max(120).optional().default(''),
  titlePrefix: z.string().max(120).optional().default(''),
});

export async function POST(request: Request) {
  if (!(await isGalleryAdminAuthenticated())) {
    return NextResponse.json({ ok: false, error: 'Unauthorized.' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const payload = uploadSchema.parse({
      categoryKey: formData.get('categoryKey'),
      status: formData.get('status'),
      captureDate: formData.get('captureDate') ?? 'Recent',
      coords: formData.get('coords') ?? '',
      titlePrefix: formData.get('titlePrefix') ?? '',
    });

    const files = formData
      .getAll('files')
      .filter((entry): entry is File => entry instanceof File && entry.size > 0);

    if (!files.length) {
      return NextResponse.json({ ok: false, error: 'Select at least one image to upload.' }, { status: 400 });
    }

    const manifest = await uploadGalleryFiles(files, payload);

    return NextResponse.json({ ok: true, manifest }, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ ok: false, error: 'Invalid upload parameters.' }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : 'Unable to upload gallery files.';
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
