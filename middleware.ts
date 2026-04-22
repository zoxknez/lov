import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './i18n.config';

function getLocale(request: NextRequest): string | undefined {
  // Simple locale resolution: For now, default to English if no cookie/header.
  // We can enhance this with negotiator if needed, but for simplicity we'll just return default.
  // In a real app, you might parse accept-language header here.
  const acceptLanguage = request.headers.get('accept-language');
  if (acceptLanguage) {
    const preferredLocales = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim().split('-')[0]);
    const match = preferredLocales.find(lang => i18n.locales.includes(lang as any));
    if (match) return match;
  }
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Skip API routes, Next.js internals, and public files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/admin') ||
    pathname.includes('.') // like .png, .ico, .svg
  ) {
    return NextResponse.next();
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|admin|favicon.ico|manifest.webmanifest|media|logo|.*\\.).*)'],
};
