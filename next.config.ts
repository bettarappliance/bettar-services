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
      
      // Redirect old contact paths
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
