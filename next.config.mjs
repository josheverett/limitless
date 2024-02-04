/** @type {import('next').NextConfig} */
const nextConfig = {
  // The entirety of webpack() is copypasta from https://react-svgr.com/docs/next/
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        // More copypasta from: https://stackoverflow.com/a/75165980/229130
        // use: ['@svgr/webpack'],
        use: {
          loader: '@svgr/webpack',
          options: { icon: true }
         }
      },
    )

    fileLoaderRule.exclude = /\.svg$/i

    return config
  },

  // images: {
  //   unoptimized: true,
  // },
};

export default nextConfig;
