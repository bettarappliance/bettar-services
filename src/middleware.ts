// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // only redirect these exact, root-level paths (optionally with a trailing slash)
  const redirects: Record<string, string> = {
    '/Services': '/services',
    '/Appliances': '/appliances',
    '/Contact': '/contact',
    '/About': '/about',
    '/Kitchen': '/services/renovations',
    '/Plumbing': '/services/plumbing',
    '/Maintenance': '/services/handyman',
  };

  // Normalize for an optional trailing slash
  const normalized = pathname.endsWith('/') && pathname !== '/' 
    ? pathname.slice(0, -1) 
    : pathname;

  // ✅ exact match only — do NOT catch subpaths like /services/renovations
  if (normalized in redirects) {
    const url = new URL(redirects[normalized], req.url);
    // Use 307 and no-store while stabilizing (avoids sticky browser caching)
    const res = NextResponse.redirect(url, 307);
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // keep your existing matcher; just make sure it doesn’t exclude /services/*
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
