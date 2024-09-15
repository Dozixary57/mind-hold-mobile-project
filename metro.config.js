// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = config;




// const { getDefaultConfig } = require('expo/metro-config');

// module.exports = (async () => {
//   const {
//     resolver: { sourceExts },
//   } = await getDefaultConfig(__dirname);

//   return {
//     transformer: {
//       babelTransformerPath: require.resolve('react-native-typed-sass-transformer'),
//     },
//     resolver: {
//       sourceExts: [...sourceExts, 'scss', 'sass'],
//     },
//   };
// })();