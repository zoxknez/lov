import 'server-only';

import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import type { NextResponse } from 'next/server';

export const GALLERY_ADMIN_COOKIE_NAME = 'kaimanawa_gallery_admin';

const SESSION_TTL_SECONDS = 60 * 60 * 12;

function encodeBase64Url(value: string) {
  return Buffer.from(value, 'utf8').toString('base64url');
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function getAdminPassword() {
  return process.env.GALLERY_ADMIN_PASSWORD ?? '';
}

function getAdminSessionSecret() {
  return process.env.GALLERY_ADMIN_SESSION_SECRET ?? '';
}

function signPayload(payload: string) {
  return createHmac('sha256', getAdminSessionSecret()).update(payload).digest('base64url');
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function createSessionToken() {
  const payload = encodeBase64Url(JSON.stringify({
    role: 'gallery-admin',
    exp: Date.now() + SESSION_TTL_SECONDS * 1000,
  }));

  return `${payload}.${signPayload(payload)}`;
}

function verifySessionToken(token: string | undefined) {
  if (!token) {
    return false;
  }

  const [payload, signature] = token.split('.');

  if (!payload || !signature || !getAdminSessionSecret()) {
    return false;
  }

  if (!safeEqual(signature, signPayload(payload))) {
    return false;
  }

  try {
    const decoded = JSON.parse(decodeBase64Url(payload)) as { exp?: number; role?: string };
    return decoded.role === 'gallery-admin' && typeof decoded.exp === 'number' && decoded.exp > Date.now();
  } catch {
    return false;
  }
}

export function getGalleryAdminConfigState() {
  const hasPassword = Boolean(getAdminPassword());
  const hasSessionSecret = Boolean(getAdminSessionSecret());

  return {
    hasPassword,
    hasSessionSecret,
    configured: hasPassword && hasSessionSecret,
  };
}

export function verifyGalleryAdminPassword(password: string) {
  const expected = getAdminPassword();

  if (!expected || !password) {
    return false;
  }

  return safeEqual(password, expected);
}

export async function isGalleryAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(GALLERY_ADMIN_COOKIE_NAME)?.value);
}

export function attachGalleryAdminSession(response: NextResponse) {
  response.cookies.set(GALLERY_ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_TTL_SECONDS,
  });

  return response;
}

export function clearGalleryAdminSession(response: NextResponse) {
  response.cookies.set(GALLERY_ADMIN_COOKIE_NAME, '', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 0,
  });

  return response;
}
