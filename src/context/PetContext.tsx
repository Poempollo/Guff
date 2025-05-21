import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet } from '../types';
import { getStoredPets, savePets } from '../services/storageService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserPets } from '../api/petApi';

interface PetContextProps {
  pets: Pet[];
  setPets: (pets: Pet[]) => void;
  addPet: (pet: Pet) => void;
  deletePet: (id: string) => void;
}

const PetContext = createContext<PetContextProps | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const apiPets = await getUserPets();
        setPets(apiPets);
        savePets(apiPets);
      } catch (error) {
        console.error('Error al cargar mascotas desde la API:', error);
        const storedPets = await getStoredPets();
        setPets(storedPets);
      }
    };

    loadPets();
  }, []);

  const addPet = (pet: Pet) => {
    const updated = [...pets, { ...pet, id: Date.now().toString() }];
    setPets(updated);
    savePets(updated);
  };

  const deletePet = (id: string) => {
    const updated = pets.filter(p => p.id !== id);
    setPets(updated);
    savePets(updated);
  };

  return (
    <PetContext.Provider value={{ pets, setPets, addPet, deletePet }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePetContext = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePetContext debe usarse dentro de un <PetProvider>');
  }
  return context;
};
