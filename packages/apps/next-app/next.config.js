/* eslint-disable no-param-reassign,import/no-extraneous-dependencies */

const fs = require('fs');
const path = require('path');

// //////////////////////////// //
//   Next and Webpack Plugins   //
// //////////////////////////// //

const withTranspiledModules = require('next-transpile-modules');
const withSourceMaps = require('@zeit/next-source-maps')();

// ////////////////// //
//   Config and Env   //
// ////////////////// //

const { NEXT_BUILD_ID, } = process.env;

/**
 * NOTE: Next.js builds the output directory in a temporary location before
 * replacing it at $PWD/.next. If you are referencing the .next directory
 * in any plugins in this config, you probably want to reference
 * `config.output.path` instead!
 */
const nextConfig = {
  transpileModules: [ '@haaretz', ],

  // Dealing with multi-server deployment
  // https://nextjs.org/docs/#customizing-webpack-config
  generateBuildId,
  pageExtensions: [ 'jsx', 'js', ],

  webpack: (config, { buildId, dev, isServer, defaultLoaders, }) => {
    // Correctly resolve local packages
    if (!config.resolve) config.resolve = {};
    if (!config.resolve.alias) config.resolve.alias = {};
    const treeToNodeModules = [ '..', '..', '..', 'node_modules', '@haaretz', ];
    const packagesPath = path.join(__dirname, ...treeToNodeModules);
    const packageAliases = fs
      .readdirSync(packagesPath)
      .filter(item => fs.statSync(path.join(packagesPath, item)).isDirectory())
      .reduce((result, pkg) => {
        let alias;
        try {
          const scopedPkg = `@haaretz/${pkg}`;
          alias = { [scopedPkg]: require.resolve(scopedPkg), };
        }
        catch (err) {
          alias = {};
        }

        return {
          ...result,
          ...alias,
        };
      }, {});

    config.resolve.alias = {
      ...config.resolve.alias,
      ...(packageAliases || {}),
    };

    return config;
  },
};

module.exports = withSourceMaps(withTranspiledModules(nextConfig));

// //////////////////// //
//   Helper Functions   //
// //////////////////// //

async function generateBuildId() {
  // For example get the latest git commit hash here
  // Since this is a production-only issue, provide this as an environment variable at prod
  const revision = NEXT_BUILD_ID || 'LATEST';
  console.log(`Next App BuildID is: ${revision}`);
  return revision;
}
