import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pet } from '../types';
import { getStoredPets, savePets } from '../services/storageService';

interface PetContextProps {
  pets: Pet[];
  addPet: (pet: Pet) => void;
  deletePet: (id: string) => void;
}

const PetContext = createContext<PetContextProps | undefined>(undefined);

export const PetProvider = ({ children }: { children: ReactNode }) => {
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const loadPets = async () => {
      const storedPets = await getStoredPets();
      setPets(storedPets);
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
    <PetContext.Provider value={{ pets, addPet, deletePet }}>
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
