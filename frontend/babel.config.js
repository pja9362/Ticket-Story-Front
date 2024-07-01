module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  // plugins: [
  //   [
  //     'module:react-native-dotenv',
  //     {
  //       moduleName: '@env',
  //       path: '.env',
  //       blacklist: null,
  //       whitelist: null,
  //       safe: false,
  //       allowUndefined: true,
  //     },
  //   ],
  // ],
  plugins: [
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    "react-native-reanimated/plugin",
  ],
};
