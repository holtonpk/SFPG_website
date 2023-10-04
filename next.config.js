/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // domains: [
    //   "localhost",
    //   "cdn.shopify.com",
    //   "flagsapi.com",

    //   "www.shortformbooks.com",
    // ],
  },
};

module.exports = nextConfig;
