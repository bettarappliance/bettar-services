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
  async redirects() {
    return [
      // Redirect old maintenance paths
      {
        source: '/Maintenance',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/Maintenance/Service',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/maintenance',
        destination: '/services/handyman',
        permanent: true,
      },
      
      // Redirect old plumbing paths
      {
        source: '/Plumbing',
        destination: '/services/plumbing',
        permanent: true,
      },
      {
        source: '/Plumbing/Service',
        destination: '/services/plumbing',
        permanent: true,
      },
      {
        source: '/plumbing',
        destination: '/services/plumbing',
        permanent: true,
      },
      // Note: /Plumbing → /services/plumbing is handled by middleware (case-sensitive redirect)
      // Redirect /Plumbing/* subpaths (like /Plumbing/About)
      {
        source: '/Plumbing/:path+',
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
      // Redirect other /Services/* subpaths
      {
        source: '/Services/:path+',
        destination: '/services',
        permanent: true,
      },
      
      // Only redirect if there's a subpath after Appliances (like /Appliances/About)
      {
        source: '/Appliances/:path+',
        destination: '/appliances',
        permanent: true,
      },
      
      // Redirect old maintenance paths (order matters - more specific first)
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
        source: '/Maintenance/:path*',
        destination: '/services/handyman',
        permanent: true,
      },
      
      // Redirect old UserAccount paths (old registration/login pages)
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
      
      // Redirect old Kitchen paths
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
        source: '/Kitchen/:path*',
        destination: '/services/renovations',
        permanent: true,
      },
      
      // Redirect malformed tracking URLs (old email links with query parameters)
      // These are old tracking links that should redirect to home page
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
