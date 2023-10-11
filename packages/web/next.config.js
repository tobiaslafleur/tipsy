/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.discordapp.com',
      'wow.zamimg.com',
      'media.pitchfork.com',
      'localhost',
    ],
  },
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  output: 'standalone',
};

module.exports = nextConfig;
