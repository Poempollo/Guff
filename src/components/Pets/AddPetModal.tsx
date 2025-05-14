import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../styles/HomeScreenStyles';
import defaultBreedImages from '../../constants/defaultBreedImage';
import { Pet } from '../../types';
import { usePetContext } from '../../context/PetContext';

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({ visible, onClose }) => {
  const { addPet } = usePetContext();
  const [pet, setPet] = useState<Omit<Pet, 'id'>>({
    name: '',
    breed: '',
    age: '',
    gender: '',
    image: '',
  });

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length) {
      setPet(prev => ({ ...prev, image: result.assets[0].uri }));
    }
  };

  const handleSave = () => {
    const imageUri = pet.image || defaultBreedImages[pet.breed] || defaultBreedImages.default;
    const newPet: Pet = {
      ...pet,
      id: Date.now().toString(),
      image: imageUri,
    };

    addPet(newPet);
    setPet({ name: '', breed: '', age: '', gender: '', image: '' });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.modalOverlay}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Mascota</Text>

          <TextInput
            placeholder="Nombre"
            value={pet.name}
            onChangeText={text => setPet(s => ({ ...s, name: text }))}
            style={styles.input}
          />

          <TextInput
            placeholder="Raza"
            value={pet.breed}
            onChangeText={text => setPet(s => ({ ...s, breed: text }))}
            style={styles.input}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              placeholder="Edad"
              value={pet.age}
              onChangeText={text => {
                const numeric = text.replace(/[^0-9]/g, '');
                setPet(s => ({ ...s, age: numeric }));
              }}
              keyboardType="numeric"
              style={[styles.input, { flex: 1, marginRight: 10 }]}
            />
            <Text style={{ fontSize: 16, color: '#555' }}></Text>
          </View>

          <TextInput
            placeholder="Género (Macho / Hembra)"
            value={pet.gender}
            onChangeText={text => setPet(s => ({ ...s, gender: text }))}
            style={styles.input}
          />

          <TouchableOpacity onPress={pickImage} style={[styles.input, styles.imagePicker]}>
            <Text>{pet.image ? 'Imagen seleccionada ✅' : 'Seleccionar imagen 📷'}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
