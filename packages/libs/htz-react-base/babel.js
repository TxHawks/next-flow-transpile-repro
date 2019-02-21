const presets = [
  '@babel/preset-react',
  '@babel/preset-flow',
  [
    '@babel/preset-env',
    {
      targets: { browsers: require('./browsers'), },
      useBuiltIns: 'entry',
      forceAllTransforms: false,
      modules: false,
    },
  ],
];

const plugins = [
  '@babel/plugin-proposal-class-properties',
  '@babel/plugin-proposal-object-rest-spread',
  '@babel/plugin-syntax-dynamic-import',
  [ '@babel/plugin-transform-runtime', { useESModules: true, }, ],
];

module.exports = function htzReactBasePreset(api, opts) {
  return {
    presets,
    plugins,
  };
};
