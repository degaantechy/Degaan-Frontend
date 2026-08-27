/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['www.degaanrealestate.com', 'localhost'],
    unoptimized: false,
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://api.degaanrealestate.com',
  },
}

module.exports = nextConfig
