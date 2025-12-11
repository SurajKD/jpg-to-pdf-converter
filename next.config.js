// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Ensure .mjs files are parsed as ESM/javascript modules
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    return config;
  },
};

module.exports = nextConfig;