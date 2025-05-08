import { useState, useEffect, useCallback } from 'react';
import * as storage from '../services/storageService';
import { Pet } from '../types';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    storage.getPets()
      .then(setPets)
      .catch(setError);
  }, []);

  const addPet = useCallback(async (pet: Pet) => {
    const updated = [...pets, pet];
    await storage.savePets(updated);
    setPets(updated);
  }, [pets]);

  const deletePet = useCallback(async (index: number) => {
    const updated = pets.filter((_, i) => i !== index);
    await storage.savePets(updated);
    setPets(updated);
  }, [pets]);

  return { pets, addPet, deletePet, error };
};
