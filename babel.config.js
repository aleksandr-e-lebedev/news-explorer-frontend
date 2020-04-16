const presets = [
  [
    '@babel/preset-env',
    {
      useBuiltIns: 'usage',
      corejs: '3.6.5',
      targets: {
        chrome: '64',
        firefox: '50',
        safari: '11.1',
        edge: '15',
      },
    },
  ],
];

module.exports = { presets };
