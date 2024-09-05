/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["pdf2json"],
  },
  transpilePackages: ["pdf2json"],
};

module.exports = nextConfig;