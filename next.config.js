/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [ 
      {
        protocol: "https",
        hostname: "api.netlify.com",
      },
      {
        protocol: "https",
        hostname: "api.um.ac.id",
      },
    ],
  },
}

module.exports = nextConfig
