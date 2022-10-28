/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['web3marketplace-testing.infura-ipfs.io', 'infura-ipfs.io'],
  },
};

module.exports = nextConfig;
