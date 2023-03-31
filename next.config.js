/* eslint-disable @typescript-eslint/no-var-requires */

const nextSafe = require("next-safe");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// NextPWA Config
// const withPWA = require("next-pwa")({
//   dest: "public",
//   register: true,
//   scope: "/",
//   sw: "sw.js",
//   buildExcludes: [/\.next/, /node_modules/],
//   cacheStartUrl: false,
//   dynamicStartUrl: false,
//   reloadOnOnline: true,
//   disable: true,
// });

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
      {
        protocol: "https",
        hostname: "is3.cloudhost.id",
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
            "img-src":
              "'self' https://is3.cloudhost.id/teknologipendidikan/objectstorage-pamerankarya/",
            "manifest-src": "'self'",
            "media-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src":
              "'self' 'unsafe-eval' 'unsafe-inline' https://www.youtube.com/ https://www.googletagmanager.com/gtag/js 'sha256-wzRmNN3+4L3v3ZHovwiO9F+QFCmvsqZ8zZ05lCRcmOY='",
            "style-src": "'self' 'unsafe-inline'",
            "worker-src": "'self' blob:",
            "report-uri": "https://dptsi.edtech.or.id",
          },
        }),
      },
    ];
  },
};

module.exports = withPlugins(
  [
    // [withPWA],
    [withBundleAnalyzer],
  ],
  nextConfig,
);
