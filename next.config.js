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
};

module.exports = nextConfig;
