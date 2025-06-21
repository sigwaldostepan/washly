import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_MAX_AGE: process.env.JWT_MAX_AGE,
    JWT_COOKIE_NAME: process.env.JWT_COOKIE_NAME,
    NEXT_PUBLIC_DOMAIN_URL: process.env.NEXT_PUBLIC_DOMAIN_URL,
  },
};

export default nextConfig;
