import React from 'react';
import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/HomeScreenStyles';
import { Vaccine } from '../types';

interface VaccineBannerProps {
  nextVaccine: Vaccine;
}

export const VaccineBanner: React.FC<VaccineBannerProps> = ({ nextVaccine }) => (
  <View style={styles.vaccineCard}>
    <LinearGradient colors={["#FF6B6B", "#FF8E8E"]} style={styles.gradientBanner}>
      <MaterialCommunityIcons name="needle" size={24} color="white" />
      <Text style={styles.bannerText}>Próxima Vacuna</Text>
      <Text style={styles.bannerSubtext}>{nextVaccine.name}</Text>
      <Text style={styles.daysLeft}>{nextVaccine.daysLeft} días</Text>
    </LinearGradient>
  </View>
);
