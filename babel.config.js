module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // other plugins...
    ['react-native-reanimated/plugin', {
      relativeSourceLocation: true,
      simplify: true,
    }],
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-reanimated/plugin'],
    },
  },
};
