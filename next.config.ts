import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'covers.openlibrary.org',
      },
      {
        protocol: 'https',
        hostname: 'kzyovz1pw9hzao1o.public.blob.vercel-storage.com',
      },
    ],
  },
};

export default nextConfig;
