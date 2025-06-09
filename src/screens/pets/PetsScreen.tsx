import React, { useState } from "react";
import { usePets } from "../../hooks/usePets";
import { Vaccine, Medication } from "../../api/petApi"; // Posiblemente estas ya no sean necesarias si las reemplazamos
import styles from "../../styles/HomeScreenStyles";
import petStyles from "../../styles/PetStyles"; // Importar estilos de mascotas si necesitamos alguno
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
// import { VaccineBanner } from "../../components/Pets/Vaccine/VaccineBanner"; // Comentamos/eliminamos si ya no se usa
// import { MedicationList } from "../../components/Pets/Medication/MedicationList"; // Comentamos/eliminamos si ya no se usa
import UpgradePlanButton from "../../components/Plans/UpgradePlanButton";

import { AddReminderModal, Reminder } from "../../components/Pets/AddReminderModal";

const PetsScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { pets, deletePet, refreshPets } = usePets();
  const [addPetModalVisible, setAddPetModalVisible] = useState(false); // Renombramos para evitar conflicto
  const [addReminderModalVisible, setAddReminderModalVisible] = useState(false); // Nuevo estado para el modal de recordatorios

  const [reminders, setReminders] = useState<Reminder[]>([]); // Estado para almacenar los recordatorios

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      await refreshPets();
      // Si los recordatorios se guardaran en la API, también los refrescaríamos aquí
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

            {/* <Text style={styles.sectionTitle}>Próxima Vacuna</Text>
            <VaccineBanner nextVaccine={nextVaccine} />

            <Text style={styles.sectionTitle}>Medicamentos</Text>
            <MedicationList medications={medications} /> */}

            <Text style={styles.sectionTitle}>Mis Recordatorios</Text>
            {reminders.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No tienes recordatorios programados.</Text>
              </View>
            ) : (
              reminders.map((reminder) => (
                <View key={reminder.id} style={petStyles.reminderItem}>
                  <Text style={petStyles.reminderTitle}>{reminder.title}</Text>
                  <Text style={petStyles.reminderDescription}>{reminder.description}</Text>
                  <Text style={petStyles.reminderInfo}>Tipo: {reminder.type}</Text>
                  <Text style={petStyles.reminderInfo}>Fecha: {reminder.date}</Text>
                </View>
              ))
            )}

            <TouchableOpacity
              style={[styles.saveButton, { marginTop: 20 }]} // Estilo para el botón de añadir recordatorio
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