const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// Modify asset and source extensions for SVG support
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== 'svg'
);
config.resolver.sourceExts.push('svg');
config.transformer.babelTransformerPath = require.resolve(
  'react-native-svg-transformer'
);

module.exports = withNativeWind(config, { input: './app/global.css' });
