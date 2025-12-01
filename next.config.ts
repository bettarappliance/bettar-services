import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Prevent indexing of Next.js static assets
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Prevent indexing of font files
        source: '/:path*\\.(woff|woff2|ttf|otf|eot)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Prevent indexing of favicon and icon files
        source: '/:path*\\.(ico|svg)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Prevent indexing of old UserAccount pages
        source: '/UserAccount/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        // Prevent indexing of old Maintenance/Service pages
        source: '/Maintenance/Service/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Redirect old maintenance paths (order matters - specific before wildcard)
      // Note: /Maintenance → /services/handyman is handled by middleware (case-sensitive redirect)
      {
        source: '/Maintenance/Service/:path*',
        destination: '/request-service',
        permanent: true,
      },
      {
        source: '/Maintenance/Contact/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/Maintenance/Service',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/Maintenance/:path+',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/Maintenance',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/maintenance',
        destination: '/services/handyman',
        permanent: true,
      },
      
      // Redirect old plumbing paths (order matters - specific before wildcard)
      // Note: /Plumbing → /services/plumbing is handled by middleware (case-sensitive redirect)
      {
        source: '/Plumbing/Service',
        destination: '/services/plumbing',
        permanent: true,
      },
      {
        source: '/Plumbing/:path+',
        destination: '/services/plumbing',
        permanent: true,
      },
      {
        source: '/Plumbing',
        destination: '/services/plumbing',
        permanent: true,
      },
      {
        source: '/plumbing',
        destination: '/services/plumbing',
        permanent: true,
      },
      
      // Redirect old contact paths - be very specific to avoid loops
      {
        source: '/Contact/SendInquiry.aspx',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/Contact/SendInquiry',
        destination: '/contact',
        permanent: true,
      },
      // Redirect old Services subpaths (specific paths to avoid conflicts)
      // Note: /Services → /services is handled by middleware (case-sensitive redirect)
      // These redirects ONLY match capitalized /Services/* to avoid conflicts with /services/*
      {
        source: '/Services/Sales.aspx',
        destination: '/appliances',
        permanent: true,
      },
      {
        source: '/Services/PropertyManagement.aspx',
        destination: '/services',
        permanent: true,
      },
      // IMPORTANT: Only redirect if path matches /Services/* (capital S) - NOT /services/*
      // Use has condition to ensure we only redirect actual old URLs
      // Note: Next.js redirects are case-insensitive, so we can't use :path+ here
      // Instead, handle specific old /Services/* paths individually
      
      // Only redirect if there's a subpath after Appliances (like /Appliances/About)
      {
        source: '/Appliances/:path+',
        destination: '/appliances',
        permanent: true,
      },
      
      
      // Redirect old UserAccount paths (old registration/login pages)
      {
        source: '/UserAccount/SignIn.aspx',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/UserAccount/RegisterUserAccountMember.aspx',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/UserAccount/:path*',
        destination: '/contact',
        permanent: true,
      },
      
      // Redirect old About paths
      {
        source: '/About/PrivacyNotice.aspx',
        destination: '/about',
        permanent: true,
      },
      // Note: /About → /about is handled by middleware (case-sensitive redirect)
      // Only redirect /About/* subpaths (not /About itself) to avoid conflict
      {
        source: '/About/:path+',
        destination: '/about',
        permanent: true,
      },
      
      // Redirect old Kitchen/Renovations paths (order matters - specific before wildcard)
      // Note: /Kitchen → /services/renovations is handled by middleware (case-sensitive redirect)
      {
        source: '/Kitchen/Service/KitchenServiceRequest.aspx',
        destination: '/request-service',
        permanent: true,
      },
      {
        source: '/Kitchen/Service/:path*',
        destination: '/request-service',
        permanent: true,
      },
      {
        source: '/Kitchen/:path+',
        destination: '/services/renovations',
        permanent: true,
      },
      // Also handle Renovations (plural) variations
      {
        source: '/Renovations/:path+',
        destination: '/services/renovations',
        permanent: true,
      },
      {
        source: '/Renovation/:path+',
        destination: '/services/renovations',
        permanent: true,
      },
      
      // Redirect malformed tracking URLs (old email links with query parameters)
      // These are old tracking links that should redirect to clean URLs
      // Match URLs with E= and T= query parameters (common in old email tracking)
      {
        source: '/:path*',
        has: [
          {
            type: 'query',
            key: 'E',
          },
          {
            type: 'query',
            key: 'T',
          },
        ],
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
