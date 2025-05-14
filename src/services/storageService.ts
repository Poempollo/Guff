import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from '../types';

const PETS_KEY = 'stored_pets';

export const savePets = async (pets: Pet[]): Promise<void> => {
  try {
    const json = JSON.stringify(pets);
    await AsyncStorage.setItem(PETS_KEY, json);
  } catch (e) {
    console.error('Error guardando mascotas:', e);
  }
};

export const getStoredPets = async (): Promise<Pet[]> => {
  try {
    const json = await AsyncStorage.getItem(PETS_KEY);
    return json ? JSON.parse(json) : [];
  } catch (e) {
    console.error('Error cargando mascotas:', e);
    return [];
  }
};
