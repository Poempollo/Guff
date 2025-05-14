import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../styles/HomeScreenStyles';
import { Pet } from '../../../types';
import { PetCard } from '../Card/PetCard';

interface PetCarouselProps {
  pets: Pet[];
  onAdd: () => void;
}

export const PetCarousel: React.FC<PetCarouselProps> = ({ pets, onAdd }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.carouselContainer}
      snapToInterval={275}
      decelerationRate="fast"
      snapToAlignment="start"
    >
      {pets.map((pet, index) => (
        <PetCard key={pet.id} pet={pet} index={index} />
      ))}

      <TouchableOpacity onPress={onAdd} style={styles.addPetButton}>
        <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#0072ff" />
      </TouchableOpacity>
    </ScrollView>
  );
};
