import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  attachGalleryAdminSession,
  clearGalleryAdminSession,
  getGalleryAdminConfigState,
  verifyGalleryAdminPassword,
} from '@/lib/gallery-admin-auth';

const loginSchema = z.object({
  password: z.string().min(1).max(200),
});

export async function POST(request: Request) {
  const config = getGalleryAdminConfigState();

  if (!config.configured) {
    return NextResponse.json(
      {
        ok: false,
        error: 'Gallery admin is not configured yet. Add GALLERY_ADMIN_PASSWORD and GALLERY_ADMIN_SESSION_SECRET.',
      },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const payload = loginSchema.parse(body);

    if (!verifyGalleryAdminPassword(payload.password)) {
      return NextResponse.json({ ok: false, error: 'Incorrect password.' }, { status: 401 });
    }

    return attachGalleryAdminSession(NextResponse.json({ ok: true }, { status: 200 }));
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid login request.' }, { status: 400 });
  }
}

export async function DELETE() {
  return clearGalleryAdminSession(NextResponse.json({ ok: true }, { status: 200 }));
}
