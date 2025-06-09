import React, { useState } from "react";
import { usePets } from "../../hooks/usePets";
// import { Vaccine, Medication } from "../../api/petApi"; // Posiblemente estas ya no sean necesarias
import styles from "../../styles/HomeScreenStyles";
// import petStyles from "../../styles/PetStyles"; // Ya no necesitamos esto si usamos los estilos de HomeScreenStyles directamente
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { PetCarousel } from "../../components/Pets/Carousel/PetCarousel";
import { AddPetModal } from "../../components/Pets/AddPetModal";
// import { VaccineBanner } from "../../components/Pets/Vaccine/VaccineBanner";
// import { MedicationList } from "../../components/Pets/Medication/MedicationList";
import UpgradePlanButton from "../../components/Plans/UpgradePlanButton";

import { AddReminderModal, Reminder } from "../../components/Pets/AddReminderModal";
import { ReminderItem } from "../../components/Pets/ReminderItem";

const PetsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { pets, deletePet, refreshPets } = usePets();
  const [addPetModalVisible, setAddPetModalVisible] = useState(false);
  const [addReminderModalVisible, setAddReminderModalVisible] = useState(false);

  const [reminders, setReminders] = useState<Reminder[]>([]);

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

  const handleSaveReminder = (newReminder: Reminder) => {
    setReminders((prevReminders) => {
      const updatedReminders = [...prevReminders, newReminder];
      // Ordenar por fecha ascendente
      return updatedReminders.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    });
    setAddReminderModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <AddPetModal
        visible={addPetModalVisible}
        onClose={() => setAddPetModalVisible(false)}
      />
      <AddReminderModal
        visible={addReminderModalVisible}
        onClose={() => setAddReminderModalVisible(false)}
        onSaveReminder={handleSaveReminder}
      />

      <ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.titleCentered}>Mis Mascotas</Text>

        {pets.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Aún no tienes mascotas registradas.</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setAddPetModalVisible(true)}
            >
              <Text style={styles.saveButtonText}>Agregar mi primera mascota</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <PetCarousel
              pets={pets}
              onAdd={() => setAddPetModalVisible(true)}
              onDelete={deletePet}
            />

            {/* Mantendremos el título de la sección de recordatorios */}
            <Text style={styles.sectionTitle}>Mis Recordatorios</Text>
            {reminders.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tienes recordatorios programados.</Text>
              </View>
            ) : (
              // ¡Aquí usamos el nuevo componente ReminderItem!
              reminders.map((reminder) => (
                <ReminderItem key={reminder.id} reminder={reminder} />
              ))
            )}

            <TouchableOpacity
              style={[styles.saveButton, { marginTop: 20 }]}
              onPress={() => setAddReminderModalVisible(true)}
            >
              <Text style={styles.saveButtonText}>Añadir Recordatorio</Text>
            </TouchableOpacity>
          </>
        )}

        <UpgradePlanButton />
      </ScrollView>
    </SafeAreaView>
  );
};

export default PetsScreen;