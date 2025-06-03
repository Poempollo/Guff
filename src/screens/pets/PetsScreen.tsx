import React, { useState } from "react";
import { usePets } from "../../hooks/usePets";
import { Vaccine, Medication } from "../../api/petApi";
import styles from "../../styles/HomeScreenStyles";
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, RefreshControl} from "react-native";
import { PetCarousel } from "../../components/Pets/Carousel/PetCarousel";
import { AddPetModal } from "../../components/Pets/AddPetModal";
import { VaccineBanner } from "../../components/Pets/Vaccine/VaccineBanner";
import { MedicationList } from "../../components/Pets/Medication/MedicationList";
import UpgradePlanButton from "../../components/Plans/UpgradePlanButton";

const PetsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { pets, deletePet, refreshPets } = usePets();
  const [modalVisible, setModalVisible] = useState(false);

  const nextVaccine: Vaccine = {
    name: "Rabia",
    date: "2024-06-15",
    daysLeft: 14,
  };

  const medications: Medication[] = [
    {
      name: "Antiparasitario",
      frequency: "Cada 3 meses",
      nextDose: "2024-06-01",
    },
    {
      name: "Vitaminas",
      frequency: "Diario",
      nextDose: "2024-05-14",
    },
  ];

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshPets();
    } catch (err) {
      console.error("Error refrescando mascotas:", err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddPetModal visible={modalVisible} onClose={() => setModalVisible(false)} />

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.titleCentered}>Mis Mascotas</Text>

        {pets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aún no tienes mascotas registradas.</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.saveButtonText}>Agregar mi primera mascota</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <PetCarousel pets={pets} onAdd={() => setModalVisible(true)} onDelete={deletePet} />

            <Text style={styles.sectionTitle}>Próxima Vacuna</Text>
            <VaccineBanner nextVaccine={nextVaccine} />

            <Text style={styles.sectionTitle}>Medicamentos</Text>
            <MedicationList medications={medications} />
          </>
        )}

      
        <UpgradePlanButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetsScreen;
