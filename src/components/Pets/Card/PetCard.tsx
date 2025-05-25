import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Alert,
  TouchableOpacity,
} from "react-native";
import styles from "../../../styles/HomeScreenStyles";
import { usePetContext } from "../../../context/PetContext";
import { Pet } from "../../../api/petApi";
import { usePets } from "../../../hooks/usePets";
import { getUserPets } from "../../../api/petApi";

interface PetCardProps {
  pet: Pet;
  index: number;
  onDelete: (pet: Pet) => void;
}

export const PetCard: React.FC<PetCardProps> = ({ pet, index }) => {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.8)).current;
  const { deletePet } = usePets();
  const { setPets } = usePetContext();
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: 400,
        delay: index * 100,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 6,
        delay: index * 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fade, scale, index]);

  const confirmDelete = async () => {
    Alert.alert("Eliminar mascota", `¿Eliminar a ${pet.name}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: async () => {
          await deletePet(pet);

          // Cargamos las mascotas del usuario, para que aparezcan al guardar.
          const pets = await getUserPets();
          setPets(pets);
        }
      },
    ]);
  };

  return (
    <Animated.View
      style={[styles.profileCard, { opacity: fade, transform: [{ scale }] }]}
    >
      <Image
        source={{ uri: pet.photo_url }}
        style={styles.headerImage}
        resizeMode="cover"
      />
      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>{pet.name}</Text>
        <Text style={styles.profileDetails}>
          {pet.breed} • {pet.age ? `${pet.age} años` : ""}
        </Text>
        <TouchableOpacity onPress={confirmDelete} style={styles.deleteButton}>
          <Text style={styles.deleteText}>Eliminar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
