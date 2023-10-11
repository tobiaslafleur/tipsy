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
    BASE_URL: process.env.BASE_URL,
  },
  output: 'standalone',
};

module.exports = nextConfig;
