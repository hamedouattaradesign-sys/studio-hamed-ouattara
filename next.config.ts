import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "studiohamedouattara.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
