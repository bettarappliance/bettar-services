// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const url = req.nextUrl.clone();

  // Strip old tracking query parameters (CountryISONumericCode, LanguageISOAlpha2Code, E, T)
  const trackingParams = ['CountryISONumericCode', 'LanguageISOAlpha2Code', 'E', 'T'];
  let hasTrackingParams = false;
  
  trackingParams.forEach(param => {
    if (searchParams.has(param)) {
      searchParams.delete(param);
      hasTrackingParams = true;
    }
  });

  // CRITICAL: Allow /appliances/admin to pass through FIRST (before ANY other logic)
  // This must be checked before any redirect logic to prevent conflicts
  const normalizedPath = pathname.toLowerCase();
  if (normalizedPath === '/appliances/admin' || normalizedPath.startsWith('/appliances/admin/')) {
    console.log('[Middleware] Allowing /appliances/admin to pass through');
    return NextResponse.next();
  }
  
  console.log('[Middleware] Processing path:', pathname);

  // If we removed tracking parameters, redirect to clean URL
  if (hasTrackingParams) {
    url.search = searchParams.toString();
    // Add noindex header for old tracking URLs
    const response = NextResponse.redirect(url, 301);
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

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
    const redirectUrl = new URL(redirects[normalized], req.url);
    // Use 307 and no-store while stabilizing (avoids sticky browser caching)
    const res = NextResponse.redirect(redirectUrl, 307);
    res.headers.set('Cache-Control', 'no-store');
    return res;
  }

  // Redirect old /Appliances/* paths (capitalized, not lowercase)
  // Only match paths that start with capital 'A' to avoid catching new routes
  // This will match /Appliances/About but NOT /appliances/admin
  if (pathname.startsWith('/Appliances/')) {
    const redirectUrl = new URL('/appliances', req.url);
    return NextResponse.redirect(redirectUrl, 301);
  }

  // Add noindex headers for old UserAccount and Maintenance/Service paths
  if (pathname.startsWith('/UserAccount/') || pathname.startsWith('/Maintenance/Service/')) {
    const response = NextResponse.next();
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // keep your existing matcher; just make sure it doesn’t exclude /services/*
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
