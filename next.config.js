/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s2.coinmarketcap.com'],
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

module.exports = nextConfig
