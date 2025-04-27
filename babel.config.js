module.exports = {
    presets: ['babel-preset-expo'],
    plugins: [
      // Si no se agrega este plugin, no se puede usar la librería react-native-reanimated
      'react-native-reanimated/plugin', 
    ],
  };