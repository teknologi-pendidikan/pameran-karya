/* eslint-disable @typescript-eslint/no-var-requires */

const nextSafe = require("next-safe");
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  scope: "/",
  sw: "sw.js",
  buildExcludes: [/\.next/, /node_modules/],
  cacheStartUrl: false,
  dynamicStartUrl: false,
  reloadOnOnline: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: nextSafe({
          isDev: false,
          contentSecurityPolicy: {
            "base-uri": "'none'",
            "child-src": "'none'",
            "connect-src": "'self' webpack://* https: data:",
            "default-src": "'self'",
            "font-src": "'self'",
            "form-action": "'self'",
            "frame-ancestors": "'none'",
            "frame-src": "'none' https://www.youtube.com/",
            "img-src": "'self'",
            "manifest-src": "'self'",
            "media-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src": "'self' 'unsafe-eval' https://www.youtube.com/ ",
            "style-src": "'self' 'unsafe-inline'",
            "worker-src": "'self' blob:",
          },
        }),
      },
    ];
  },
});

module.exports = nextConfig;
