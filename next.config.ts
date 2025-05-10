import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hgss-fus-prod.s3.ap-southeast-2.amazonaws.com',
        pathname: '/**'
      }
    ]
  }
}

export default nextConfig;
