const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  target: 'serverless',
  env: {
    BASE_URL: process.env.BASE_URL,
  },

  webpack(conf) {
    conf.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    conf.resolve.modules.push(__dirname);
    return conf;
  },
});
