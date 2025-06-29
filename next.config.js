/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  webpack(config) {
    if (process.env.__NEXT_NEW_BUNDLER !== 'turbo') {
      // Only add the svg loader for webpack
      config.module.rules.push({
        test: /\.svg$/,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });
    }
    return config;
  },
};

module.exports = nextConfig;
