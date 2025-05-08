import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../styles/HomeScreenStyles';
import { Pet } from '../types';
import { PetCard } from './PetCard';

interface PetCarouselProps {
  pets: Pet[];
  onDelete: (index: number) => void;
  onAdd: () => void;
}

export const PetCarousel: React.FC<PetCarouselProps> = ({ pets, onDelete, onAdd }) => (
  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.carouselContainer}>
    {pets.map((p, i) => (
      <PetCard key={i} pet={p} index={i} onDelete={onDelete} />
    ))}
    <TouchableOpacity onPress={onAdd} style={styles.addPetButton}>
      <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#0072ff" />
    </TouchableOpacity>
  </ScrollView>
);