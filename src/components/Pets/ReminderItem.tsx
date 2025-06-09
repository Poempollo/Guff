import React from 'react';
import { View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../styles/HomeScreenStyles'; // Importa HomeScreenStyles
import { Reminder } from './AddReminderModal'; // Importa la interfaz Reminder

interface ReminderItemProps {
  reminder: Reminder;
}

export const ReminderItem: React.FC<ReminderItemProps> = ({ reminder }) => {
  // Función para determinar el icono según el tipo de recordatorio
  const getReminderIcon = (type: Reminder['type']) => {
    switch (type) {
      case 'Vacuna':
        return { name: 'needle', color: '#6A5ACD' }; // Morado
      case 'Visita al veterinario':
        return { name: 'hospital-building', color: '#20B2AA' }; // Azul verdoso
      case 'Peluquería':
        return { name: 'content-cut', color: '#FFD700' }; // Dorado
      case 'Social':
        return { name: 'paw', color: '#FF4500' }; // Naranja rojizo
      default:
        return { name: 'bell', color: '#808080' }; // Gris por defecto
    }
  };

  const { name, color } = getReminderIcon(reminder.type);

  return (
    // Reutilizamos el estilo de la tarjeta de medicación
    <View style={styles.medicationCard}>
      <View style={styles.medicationIcon}>
        <MaterialCommunityIcons name={name as any} size={24} color={color} />
      </View>
      <View style={styles.medicationInfo}>
        <Text style={styles.medicationName}>{reminder.title}</Text>
        <Text style={styles.medicationFreq}>{reminder.description}</Text>
      </View>
      {/* Usamos el estilo para la fecha de medicación */}
      <Text style={styles.medicationDate}>{reminder.date}</Text>
    </View>
  );
};