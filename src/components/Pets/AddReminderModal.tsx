import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../styles/PetStyles"; // Reutilizamos estilos de mascotas
import homeStyles from "../../styles/HomeScreenStyles"; // Para el botón de guardar, etc.
import { SelectModal } from "../SelectModal"; // Asumiendo que ya tienes este componente

// Interfaz para el objeto Recordatorio
export interface Reminder {
  id: string; // Para identificar unívocamente cada recordatorio
  title: string;
  description: string;
  type: "Vacuna" | "Visita al veterinario" | "Peluquería" | "Social";
  date: string; // Formato 'YYYY-MM-DD'
}

interface AddReminderModalProps {
  visible: boolean;
  onClose: () => void;
  onSaveReminder: (reminder: Reminder) => void;
}

const reminderTypeOptions = [
  "Vacuna",
  "Visita al veterinario",
  "Peluquería",
  "Social",
];

export const AddReminderModal: React.FC<AddReminderModalProps> = ({
  visible,
  onClose,
  onSaveReminder,
}) => {
  const [form, setForm] = useState<Omit<Reminder, "id">>({
    title: "",
    description: "",
    type: "" as any, // Se fuerza el tipo para el estado inicial
    date: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTypeModal, setShowTypeModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInput = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const onDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) handleInput("date", date.toISOString().split("T")[0]);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.title) newErrors.title = "El título es obligatorio.";
    if (!form.description)
      newErrors.description = "La descripción es obligatoria.";
    if (!form.type) newErrors.type = "Selecciona un tipo de recordatorio.";
    if (!form.date) newErrors.date = "Selecciona una fecha.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;

    const newReminder: Reminder = {
      ...form,
      id: Date.now().toString(), // Generamos un ID único simple para el ejemplo
    };

    onSaveReminder(newReminder);
    Alert.alert("¡Recordatorio guardado!", `"${newReminder.title}" ha sido añadido.`);
    // Reiniciar formulario y cerrar modal
    setForm({
      title: "",
      description: "",
      type: "" as any,
      date: "",
    });
    setErrors({});
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Recordatorio</Text>

          <Text style={styles.label}>Título</Text>
          <TextInput
            placeholder="Ej: Visita al veterinario anual"
            placeholderTextColor="#aaa"
            value={form.title}
            onChangeText={(t) => handleInput("title", t)}
            style={[styles.input, errors.title && { borderColor: "red" }]}
          />
          {!!errors.title && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {errors.title}
            </Text>
          )}

          <Text style={styles.label}>Descripción</Text>
          <TextInput
            placeholder="Ej: Llevar a Luna para su revisión de rutina."
            placeholderTextColor="#aaa"
            value={form.description}
            onChangeText={(t) => handleInput("description", t)}
            style={[styles.input, errors.description && { borderColor: "red" }]}
            multiline // Permite múltiples líneas para la descripción
            numberOfLines={3} // Altura inicial de 3 líneas
          />
          {!!errors.description && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {errors.description}
            </Text>
          )}

          <Text style={styles.label}>Tipo de Recordatorio</Text>
          <TouchableOpacity
            onPress={() => setShowTypeModal(true)}
            style={[
              styles.input,
              { justifyContent: "center" },
              errors.type && { borderColor: "red" },
            ]}
          >
            <Text style={{ color: form.type ? styles.input.color : "#aaa" }}>
              {form.type || "Selecciona un tipo"}
            </Text>
          </TouchableOpacity>
          {!!errors.type && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {errors.type}
            </Text>
          )}

          <Text style={styles.label}>Fecha</Text>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={[
              styles.input,
              { justifyContent: "center" },
              errors.date && { borderColor: "red" },
            ]}
          >
            <Text style={{ color: form.date ? styles.input.color : "#aaa" }}>
              {form.date || "Selecciona una fecha"}
            </Text>
          </TouchableOpacity>
          {!!errors.date && (
            <Text style={{ color: "red", marginBottom: 5 }}>
              {errors.date}
            </Text>
          )}
          {showDatePicker && (
            <DateTimePicker
              value={form.date ? new Date(form.date) : new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <TouchableOpacity
            style={homeStyles.saveButton} // Usamos un estilo de HomeScreenStyles para el botón de guardar
            onPress={handleSave}
          >
            <Text style={homeStyles.saveButtonText}>Guardar Recordatorio</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SelectModal
        visible={showTypeModal}
        options={reminderTypeOptions}
        onSelect={(value) => {
          handleInput("type", value as any);
        }}
        onClose={() => setShowTypeModal(false)}
      />
    </Modal>
  );
};