import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styles from '../styles/HomeScreenStyles';
import defaultBreedImages from '../constants/defaultBreedImages';
import { Pet } from '../types';

interface AddPetModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (pet: Pet) => void;
}

export const AddPetModal: React.FC<AddPetModalProps> = ({ visible, onClose, onSave }) => {
  const [pet, setPet] = useState<Omit<Pet, 'image'>>({ name: '', breed: '', age: '', image: '' });

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
    onSave({ ...pet, image: imageUri });
    setPet({ name: '', breed: '', age: '', image: '' });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Agregar Mascota</Text>
          <TextInput placeholder="Nombre" value={pet.name} onChangeText={text => setPet(s => ({ ...s, name: text }))} style={styles.input} />
          <TextInput placeholder="Raza" value={pet.breed} onChangeText={text => setPet(s => ({ ...s, breed: text }))} style={styles.input} />
          <TextInput placeholder="Edad" value={pet.age} onChangeText={text => setPet(s => ({ ...s, age: text }))} style={styles.input} />
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