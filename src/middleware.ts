import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hostname = request.nextUrl.hostname;
  const protocol = request.nextUrl.protocol;

  // Skip production redirects in development (localhost, 127.0.0.1, etc.)
  const isDevelopment = 
    hostname === 'localhost' || 
    hostname === '127.0.0.1' || 
    hostname === '[::1]' ||
    hostname?.startsWith('localhost:') ||
    hostname?.startsWith('127.0.0.1:');
  
  const isProduction = !isDevelopment && (hostname === 'bettarservices.com' || hostname?.endsWith('.bettarservices.com'));

  // Only apply production redirects in production
  if (isProduction) {
    // 1. Redirect www to non-www (canonical domain is non-www)
    if (hostname && hostname.startsWith('www.')) {
      const url = request.nextUrl.clone();
      url.hostname = 'bettarservices.com';
      url.protocol = 'https:';
      // Preserve pathname and query parameters
      return NextResponse.redirect(url, 301); // Permanent redirect
    }

    // 2. Redirect HTTP to HTTPS
    if (protocol === 'http:') {
      const url = request.nextUrl.clone();
      url.protocol = 'https:';
      return NextResponse.redirect(url, 301);
    }
  }

  // 3. Case-sensitive redirects for old capitalized URLs (check BEFORE trailing slash removal)
  // Only redirect if the path starts with capital letters
  const redirects: Record<string, string> = {
    '/Services': '/services',
    '/Appliances': '/appliances',
    '/Contact': '/contact',
    '/About': '/about',
    '/Kitchen': '/services/renovations',
  };

  // Check if pathname matches any capitalized redirect (case-sensitive check)
  // Only match exact capitalization - lowercase paths pass through
  for (const [oldPath, newPath] of Object.entries(redirects)) {
    // Check for exact match (with or without trailing slash)
    // This ensures case-sensitive matching: /Services matches but /services does NOT
    if (pathname === oldPath || pathname === `${oldPath}/`) {
      const url = request.nextUrl.clone();
      url.pathname = newPath;
      // Preserve query parameters (e.g., ?CountryISONumericCode=840&LanguageISOAlpha2Code=en)
      return NextResponse.redirect(url, 301); // Permanent redirect
    }
  }

  // 4. Remove trailing slashes (except for root path)
  // Canonical: /contact, /services, /appliances (no trailing slash)
  // Redirect: /contact/, /services/, /appliances/ → remove trailing slash
  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(0, -1); // Remove trailing slash
    return NextResponse.redirect(url, 301);
  }

  // Allow request to continue normally for all other paths
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};

