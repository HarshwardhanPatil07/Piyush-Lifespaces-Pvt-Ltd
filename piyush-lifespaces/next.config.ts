import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimize for production deployment
  output: 'standalone',
  
  // Image optimization
  images: {
    domains: ['localhost'],
    unoptimized: false,
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Enable experimental features if needed
  experimental: {
    // Add any experimental features here
  },
  
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
