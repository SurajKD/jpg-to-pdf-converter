/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Fix .mjs loading issues for IMG.LY and onnxruntime-web
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },

  // OPTIONAL — only enable if you want SharedArrayBuffer (IMG.LY GPU mode)
  // WARNING: These headers must NOT block loading external scripts that
  // don't include CORP headers — otherwise Next.js HMR breaks.
  async headers() {
    return [
      {
        source: "/imgly/:path*", // Only protect IMG.LY assets you self-host
        headers: [
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
        ],
      },

      // Allow local development to access your production manifest without CORS errors
      {
        source: "/site.webmanifest",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
