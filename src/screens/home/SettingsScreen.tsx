// screens/SettingsScreen.tsx
import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import styles from '../../styles/SettingsStyles';

const SettingsScreen = () => {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        <Text style={styles.title}>Configuración</Text>
        <Text style={styles.subtitle}>Administra las opciones de tu cuenta aquí.</Text>
      </Animated.View>
    </View>
  );
};

export default React.memo(SettingsScreen);