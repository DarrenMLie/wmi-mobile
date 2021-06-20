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
        'clients': './src/clients',
        'utils': './src/utils',
        'models': './src/models',
      }
    }],
    ['module:react-native-dotenv', {
      "moduleName": "@env",
      "path": ".env",
      "blacklist": null,
      "whitelist": null,
      "safe": false,
      "allowUndefined": false
    }],
  ],
};
