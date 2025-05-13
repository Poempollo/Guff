import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../styles/HomeScreenStyles';
import { Pet } from '../../../types';
import { PetCard } from '../Card/PetCard';

interface PetCarouselProps {
  pets: Pet[];
  onDelete: (index: number) => void;
  onAdd: () => void;
}

export const PetCarousel: React.FC<PetCarouselProps> = ({ pets, onDelete, onAdd }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
      snapToInterval={275} // 260 card width + 15 marginRight
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {pets.map((pet, index) => (
        <PetCard key={index} pet={pet} index={index} onDelete={onDelete} />
      ))}

      <TouchableOpacity onPress={onAdd} style={styles.addPetButton}>
        <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#0072ff" />
      </TouchableOpacity>
    </ScrollView>
  );
};
