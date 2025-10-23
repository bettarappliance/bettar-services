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
      // Only redirect specific old paths that don't exist
      {
        source: '/Maintenance/Service',
        destination: '/services/handyman',
        permanent: true,
      },
      {
        source: '/Plumbing/Service',
        destination: '/services/plumbing',
        permanent: true,
      },
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
    ];
  },
};

export default nextConfig;
