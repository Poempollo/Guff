import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from '../../../styles/HomeScreenStyles';
import { PetCard } from '../Card/PetCard';
import { PetData } from '../../../api/petApi';
import { Pet } from '../../../api/petApi';

interface PetCarouselProps {
  pets: Pet[];
  onAdd: () => void;
  onDelete: (pet: Pet) => void;
}

export const PetCarousel: React.FC<PetCarouselProps> = ({ pets, onAdd, onDelete }) => {
  
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
        <PetCard key={pet.id} pet={pet} index={index} onDelete={onDelete}/>
      ))}

      <TouchableOpacity onPress={onAdd} style={styles.addPetButton}>
        <MaterialCommunityIcons name="plus-circle-outline" size={40} color="#0072ff" />
      </TouchableOpacity>
    </ScrollView>
  );
};
