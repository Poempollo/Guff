import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { PetCarousel } from '../../components/Pets/Carousel/PetCarousel';
import { AddPetModal } from '../../components/Pets/AddPetModal';
import { VaccineBanner } from '../../components/Pets/Vaccine/VaccineBanner';
import { MedicationList } from '../../components/Pets/Medication/MedicationList';
import { PetCard } from '../../components/Pets/Card/PetCard';
import defaultBreedImages from '../../constants/defaultBreedImage';
import styles from '../../styles/HomeScreenStyles';
import { Pet, Vaccine, Medication } from '../../types';
import { getStoredPets, savePets } from '../../services/storageService';

const PetsScreen: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const stored = await getStoredPets();
        setPets(stored);
      } catch (e) {
        console.error('Error cargando mascotas:', e);
      } finally {
        setLoading(false);
      }
    };

    loadPets();
  }, []);

  const addPet = async (pet: Pet) => {
    const newPet = { ...pet, id: Date.now().toString() };
    const updated = [...pets, newPet];
    setPets(updated);
    await savePets(updated);
  };

  const deletePet = async (index: number) => {
    const updated = pets.filter((_, i) => i !== index);
    setPets(updated);
    await savePets(updated);
  };

  const nextVaccine: Vaccine = {
    name: 'Rabia',
    date: '2024-06-15',
    daysLeft: 14,
  };

  const medications: Medication[] = [
    { name: 'Antiparasitario', frequency: 'Cada 3 meses', nextDose: '2024-06-01' },
    { name: 'Vitaminas', frequency: 'Diario', nextDose: '2024-05-14' },
  ];

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#0072ff" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <AddPetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={addPet}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Text style={styles.titleCentered}>Mis Mascotas</Text>

        {pets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aún no tienes mascotas registradas 🐶</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.saveButtonText}>Agregar mi primera mascota</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <PetCarousel
              pets={pets}
              onDelete={deletePet}
              onAdd={() => setModalVisible(true)}
            />
        
            <Text style={styles.sectionTitle}>Próxima Vacuna</Text>
            <VaccineBanner nextVaccine={nextVaccine} />

            <Text style={styles.sectionTitle}>Medicamentos</Text>
            <MedicationList medications={medications} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetsScreen;
