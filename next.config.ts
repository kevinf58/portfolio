import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/kevinf58/portfolio-images/**",
      },
    ],
  },
};

export default nextConfig;
