import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import styles from '../../styles/ProfileStyles';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        <Text style={styles.title}>Mi Perfil</Text>
        <Text style={styles.subtitle}>Aquí puedes ver y editar tu información personal.</Text>
      </Animated.View>
    </View>
  );
};

export default React.memo(ProfileScreen);