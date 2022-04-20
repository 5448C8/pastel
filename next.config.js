const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");
const path = require("path");

/**
 * @returns {import('next').NextConfig}
 */
const nextConfig = (mode) => {
  return {
    /* config options here */
    reactStrictMode: true,
    swcMinify: true,
    experimental: {
      swcFileReading: true,
      plugins: true,
    },
    webpack(config) {
      if (config.module.rules[3].oneOf[7].include) {
        config.module.rules[3].oneOf[7].include = { or: [/node_modules/, path.join(process.cwd(), "build")] };
      }

      return config;
    },
  };
};

module.exports = nextConfig;
