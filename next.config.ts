import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
        pathname: "/**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*\\.(woff|woff2|ttf|otf|eot)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*\\.(ico|svg)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/UserAccount/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/Maintenance/Service/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/appliances/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/appliances/admin",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },

  async redirects() {
    return [
      /* ---------------------------------
         OLD APPLIANCE URLS → /appliances
      ---------------------------------- */
      {
        source: "/appliances/washer-repair",
        destination: "/appliances",
        permanent: true,
      },
      {
        source: "/appliances/sale-appliances",
        destination: "/appliances",
        permanent: true,
      },
      {
        source: "/appliances/refrigerator-service",
        destination: "/appliances",
        permanent: true,
      },

      /* ---------------------------------
         MAINTENANCE (legacy)
      ---------------------------------- */
      {
        source: "/Maintenance/Service/:path*",
        destination: "/request-service",
        permanent: true,
      },
      {
        source: "/Maintenance/Contact/:path*",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Maintenance/Service",
        destination: "/services/handyman",
        permanent: true,
      },
      {
        source: "/Maintenance/:path+",
        destination: "/services/handyman",
        permanent: true,
      },
      {
        source: "/Maintenance",
        destination: "/services/handyman",
        permanent: true,
      },
      {
        source: "/maintenance",
        destination: "/services/handyman",
        permanent: true,
      },

      /* ---------------------------------
         PLUMBING (legacy)
      ---------------------------------- */
      {
        source: "/Plumbing/Service",
        destination: "/services/plumbing",
        permanent: true,
      },
      {
        source: "/Plumbing/:path+",
        destination: "/services/plumbing",
        permanent: true,
      },
      {
        source: "/Plumbing",
        destination: "/services/plumbing",
        permanent: true,
      },
      {
        source: "/plumbing",
        destination: "/services/plumbing",
        permanent: true,
      },

      /* ---------------------------------
         CONTACT (legacy)
      ---------------------------------- */
      {
        source: "/Contact/SendInquiry.aspx",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/Contact/SendInquiry",
        destination: "/contact",
        permanent: true,
      },

      /* ---------------------------------
         SERVICES (legacy specific only)
      ---------------------------------- */
      {
        source: "/Services/Sales.aspx",
        destination: "/appliances",
        permanent: true,
      },
      {
        source: "/Services/PropertyManagement.aspx",
        destination: "/services",
        permanent: true,
      },

      /* ---------------------------------
         USER ACCOUNT (legacy)
      ---------------------------------- */
      {
        source: "/UserAccount/SignIn.aspx",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/UserAccount/RegisterUserAccountMember.aspx",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/UserAccount/:path*",
        destination: "/contact",
        permanent: true,
      },

      /* ---------------------------------
         ABOUT (legacy)
      ---------------------------------- */
      {
        source: "/About/PrivacyNotice.aspx",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/About/:path+",
        destination: "/about",
        permanent: true,
      },

      /* ---------------------------------
         KITCHEN / RENOVATIONS (legacy)
      ---------------------------------- */
      {
        source: "/Kitchen/Service/KitchenServiceRequest.aspx",
        destination: "/request-service",
        permanent: true,
      },
      {
        source: "/Kitchen/Service/:path*",
        destination: "/request-service",
        permanent: true,
      },
      {
        source: "/Kitchen/:path+",
        destination: "/services/renovations",
        permanent: true,
      },
      {
        source: "/Renovations/:path+",
        destination: "/services/renovations",
        permanent: true,
      },
      {
        source: "/Renovation/:path+",
        destination: "/services/renovations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
