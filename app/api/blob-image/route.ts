import { get } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';

function redirectToFallback(request: NextRequest, fallback: string | null) {
  if (!fallback) {
    return NextResponse.json({ error: 'Image not available.' }, { status: 404 });
  }

  return NextResponse.redirect(new URL(fallback, request.url), 307);
}

function getForwardHeaders(request: NextRequest) {
  const headers = new Headers();

  for (const key of ['range', 'if-none-match']) {
    const value = request.headers.get(key);

    if (value) {
      headers.set(key, value);
    }
  }

  return headers;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pathname = searchParams.get('pathname');
  const fallback = searchParams.get('fallback');
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!pathname) {
    return NextResponse.json({ error: 'pathname is required.' }, { status: 400 });
  }

  if (!token) {
    return redirectToFallback(request, fallback);
  }

  try {
    const blob = await get(pathname, {
      access: 'private',
      token,
      headers: getForwardHeaders(request),
    });

    if (!blob) {
      return redirectToFallback(request, fallback);
    }

    const responseHeaders = new Headers();

    for (const [key, value] of blob.headers.entries()) {
      responseHeaders.set(key, value);
    }

    return new NextResponse(blob.stream, {
      status: blob.statusCode,
      headers: responseHeaders,
    });
  } catch {
    return redirectToFallback(request, fallback);
  }
}
