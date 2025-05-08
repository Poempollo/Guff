import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { Header } from '../../components/Header';
import { PetCarousel } from '../../components/PetCarousel';
import { AddPetModal } from '../../components/AddPetModal';
import { VaccineBanner } from '../../components/VaccineBanner';
import { MedicationList } from '../../components/MedicationList';
import { ChatWidget } from '../../components/ChatWidget';
import { usePets } from '../../hooks/usePets';
import defaultBreedImages from '../../constants/defaultBreedImages';
import styles from '../../styles/HomeScreenStyles';
import { Vaccine, Medication } from '../../types';

const HomeScreen: React.FC = () => {
  const { pets, addPet, deletePet, error } = usePets();
  const [modalVisible, setModalVisible] = useState(false);

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.errorText}>Error cargando datos.</Text>
      </SafeAreaView>
    );
  }

  const nextVaccine: Vaccine = {
    name: 'Rabia',
    date: '2024-03-15',
    daysLeft: 31,
  };

  const medications: Medication[] = [
    { name: 'Antiparasitario', frequency: 'Cada 3 meses', nextDose: '2024-02-28' },
    { name: 'Vitaminas B12', frequency: 'Diario', nextDose: '2024-02-13' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <AddPetModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSave={addPet}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <Header />

        {pets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>
              Aún no has registrado ninguna mascota 🐾
            </Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.saveButtonText}>
                Agregar mi primera mascota
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <PetCarousel
            pets={pets}
            onDelete={deletePet}
            onAdd={() => setModalVisible(true)}
          />
        )}

        {pets.length > 0 && <VaccineBanner nextVaccine={nextVaccine} />}

        <Text style={styles.sectionTitle}>Medicamentos Actuales</Text>
        <MedicationList medications={medications} />
      </ScrollView>

      <ChatWidget visible={false} />
    </SafeAreaView>
  );
};

export default HomeScreen;
