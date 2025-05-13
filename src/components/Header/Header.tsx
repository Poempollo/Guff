import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/HomeScreenStyles';

export const Header: React.FC = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>Guff</Text>
    <Text style={styles.subtitle}>¡Bienvenido de nuevo!</Text>
  </View>
);