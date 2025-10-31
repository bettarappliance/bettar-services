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
      // Note: Redirects for /Services, /Appliances, and /Contact are disabled
      // because Next.js redirects appear to be case-insensitive, causing loops.
      // Old URLs will show 404, but this is better than breaking the actual pages.
      
      // TODO: Implement case-sensitive redirects using middleware if needed
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
    ];
  },
};

export default nextConfig;
