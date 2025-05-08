import AsyncStorage from '@react-native-async-storage/async-storage';
import { Pet } from '../types';

const PETS_KEY = 'pets';

export const getPets = async (): Promise<Pet[]> => {
  const data = await AsyncStorage.getItem(PETS_KEY);
  return data ? JSON.parse(data) : [];
};

export const savePets = async (pets: Pet[]): Promise<void> => {
  await AsyncStorage.setItem(PETS_KEY, JSON.stringify(pets));
};