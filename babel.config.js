module.exports = {
  presets: ['babel-preset-expo'],
  plugins: [
    ['module-resolver', {
        root: ['./'],
        alias: {
          '*': './src',
          'pages': './src/pages',
          'components': './src/components',
          'constants': './src/constants',
        }
    }],
  ],
};
