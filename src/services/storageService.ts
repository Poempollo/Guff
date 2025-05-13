import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from '../types';

const PETS_KEY = 'stored_pets';

export const getStoredPets = async (): Promise<Pet[]> => {
  const json = await AsyncStorage.getItem(PETS_KEY);
  return json ? JSON.parse(json) : [];
};

export const savePets = async (pets: Pet[]): Promise<void> => {
  await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
};
