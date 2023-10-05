/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.discordapp.com', 'wow.zamimg.com', 'media.pitchfork.com'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
