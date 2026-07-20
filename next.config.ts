import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "crests.football-data.org",
         },
         {
            protocol: "https",
            hostname: "www.google.com",
         },
      ],
   },
   experimental: {
      serverActions: {
         bodySizeLimit: "1000mb",
      },
      proxyClientMaxBodySize: "1000mb",
   },
   async headers() {
      return [
         {
            source: "/uploads/images/:path*",
            headers: [
               {
                  key: "Cache-Control",
                  value: "public, max-age=600, stale-while-revalidate=60",
               },
            ],
         },
         {
            source: "/uploads/thumbnails/:path*",
            headers: [
               {
                  key: "Cache-Control",
                  value: "public, max-age=600, stale-while-revalidate=60",
               },
            ],
         },
         {
            source: "/uploads/videos/:path*",
            headers: [
               {
                  key: "Cache-Control",
                  value: "public, max-age=3600, stale-while-revalidate=300",
               },
            ],
         },
      ];
   },
};

export default nextConfig;
