import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/HomeScreenStyles';
import { Medication } from '../types';

interface MedicationListProps {
  medications: Medication[];
}

export const MedicationList: React.FC<MedicationListProps> = ({ medications }) => (
  <>
    {medications.map((m, i) => (
      <View key={i} style={styles.medicationCard}>
        <View style={styles.medicationIcon}>
          <MaterialCommunityIcons name="pill" size={24} color="#FF6B6B" />
        </View>
        <View style={styles.medicationInfo}>
          <Text style={styles.medicationName}>{m.name}</Text>
          <Text style={styles.medicationFreq}>{m.frequency}</Text>
        </View>
        <Text style={styles.medicationDate}>{m.nextDose}</Text>
      </View>
    ))}
  </>
);