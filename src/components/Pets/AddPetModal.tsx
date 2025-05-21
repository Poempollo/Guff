import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "../../styles/PetStyles";
import { usePets } from "../../hooks/usePets";
import { PetData } from "../../api/petApi";
import { SelectModal } from "../SelectModal";

const speciesOptions = ["Perro", "Gato", "Conejo"];
const breedOptions: Record<string, string[]> = {
  Perro: ["Bodeguero", "Labrador", "Chihuahua", "Bulldog", "PastorAleman", "Pitbull", "Bullterrier", "Rottweiler", "Chowchow", "Pomerania", "Yorkshire", "Shibainu", "Dóberman"],
  Gato: ["Siames", "Persa", "Maine Coon", "Bengala", "Sphynx"],
  Conejo: ["Enano", "Angora", "Gigante", "Rex"],
};

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({ visible, onClose }) => {
  const { addPet } = usePets();
  const [form, setForm] = useState<Omit<PetData, 'vaccinations' | 'next_vaccines' | 'distance_walked_km'>>({
    name: "",
    species: "",
    breed: "",
    gender: "",
    birth_date: "",
    photo_url: "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showSpeciesModal, setShowSpeciesModal] = useState(false);
  const [showBreedModal, setShowBreedModal] = useState(false);
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInput = (field: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!res.canceled && res.assets?.length) {
      handleInput("photo_url", res.assets[0].uri);
    }
  };

  const onDateChange = (_: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) handleInput("birth_date", date.toISOString().split("T")[0]);
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.name) newErrors.name = "El nombre es obligatorio.";
    if (!form.species) newErrors.species = "Selecciona una especie.";
    if (!form.breed) newErrors.breed = "Selecciona una raza.";
    if (!form.gender) newErrors.gender = "Selecciona un género.";
    if (!form.birth_date) newErrors.birth_date = "Selecciona una fecha de nacimiento.";
    if (!form.photo_url) newErrors.photo_url = "Selecciona una imagen.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    try {
      const data: PetData = {
        ...form,
        vaccinations: [],
        next_vaccines: [],
        distance_walked_km: 0,
      };
      await addPet(data);
      onClose();
      setForm({ name: "", species: "", breed: "", gender: "", birth_date: "", photo_url: "" });
      setErrors({});
    } catch (e) {
      console.error("Error guardando mascota:", e);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Mascota</Text>

          <Text style={styles.label}>Nombre</Text>
          <TextInput
            placeholder="Nombre"
            placeholderTextColor="#aaa"
            value={form.name}
            onChangeText={t => handleInput("name", t)}
            style={[styles.input, errors.name && { borderColor: 'red' }]}
          />
          {!!errors.name && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.name}</Text>}

          <Text style={styles.label}>Especie</Text>
          <TouchableOpacity onPress={() => setShowSpeciesModal(true)} style={[styles.input, { justifyContent: 'center' }, errors.species && { borderColor: 'red' }]}>
            <Text style={{ color: form.species ? styles.input.color : '#aaa' }}>
              {form.species || "Selecciona especie"}
            </Text>
          </TouchableOpacity>
          {!!errors.species && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.species}</Text>}

          <Text style={styles.label}>Raza</Text>
          <TouchableOpacity onPress={() => setShowBreedModal(true)} style={[styles.input, { justifyContent: 'center' }, errors.breed && { borderColor: 'red' }]}>
            <Text style={{ color: form.breed ? styles.input.color : '#aaa' }}>
              {form.breed || "Selecciona raza"}
            </Text>
          </TouchableOpacity>
          {!!errors.breed && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.breed}</Text>}

          <Text style={styles.label}>Fecha de nacimiento</Text>
          <TouchableOpacity onPress={() => setShowDatePicker(true)} style={[styles.input, { justifyContent: 'center' }, errors.birth_date && { borderColor: 'red' }]}>
            <Text style={{ color: form.birth_date ? styles.input.color : '#aaa' }}>
              {form.birth_date || "Selecciona fecha"} 📅
            </Text>
          </TouchableOpacity>
          {!!errors.birth_date && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.birth_date}</Text>}
          {showDatePicker && (
            <DateTimePicker
              value={form.birth_date ? new Date(form.birth_date) : new Date()}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <Text style={styles.label}>Género</Text>
          <TouchableOpacity onPress={() => setShowGenderModal(true)} style={[styles.input, { justifyContent: 'center' }, errors.gender && { borderColor: 'red' }]}>
            <Text style={{ color: form.gender ? styles.input.color : '#aaa' }}>
              {form.gender || "Selecciona género"}
            </Text>
          </TouchableOpacity>
          {!!errors.gender && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.gender}</Text>}

          <TouchableOpacity onPress={pickImage} style={[styles.imagePicker, errors.photo_url && { borderColor: 'red' }]}>
            <Text style={{ color: styles.input.color }}>
              {form.photo_url ? "Imagen seleccionada ✅" : "Seleccionar imagen 📷"}
            </Text>
          </TouchableOpacity>
          {!!errors.photo_url && <Text style={{ color: 'red', marginBottom: 5 }}>{errors.photo_url}</Text>}

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <SelectModal
        visible={showSpeciesModal}
        options={speciesOptions}
        onSelect={(value) => {
          handleInput("species", value);
          handleInput("breed", "");
        }}
        onClose={() => setShowSpeciesModal(false)}
      />

      <SelectModal
        visible={showBreedModal}
        options={breedOptions[form.species] || []}
        onSelect={(value) => handleInput("breed", value)}
        onClose={() => setShowBreedModal(false)}
      />

      <SelectModal
        visible={showGenderModal}
        options={["Macho", "Hembra"]}
        onSelect={(value) => handleInput("gender", value)}
        onClose={() => setShowGenderModal(false)}
      />
    </Modal>
  );
};
