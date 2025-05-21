import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/petApi';
import { Pet } from '../types';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.getPets()
      .then(setPets)
      .catch(setError);
  }, []);

  const addPet = useCallback(async (pet: Pet) => {
    try {
      await api.addPet(pet);
      setPets(prev => [...prev, pet]);
    } catch (e) {
      setError(e as Error);
    }
  }, []);

  const deletePet = useCallback(async (index: number) => {
    try {
      const petToDelete = pets[index];
      if (!petToDelete || !petToDelete.id) return;

      await api.deletePet(petToDelete.id);
      setPets(prev => prev.filter((_, i) => i !== index));
    } catch (e) {
      setError(e as Error);
    }
  }, [pets]);

  return { pets, addPet, deletePet, error };
};