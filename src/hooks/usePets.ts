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
      await api.createPet(pet);
      setPets(prev => [...prev, pet]);
    } catch (e) {
      setError(e as Error);
    }
  }, []);

  const deletePet = useCallback(async (petId: number) => {
    try {
      await api.deletePet(petId);
      setPets(prev => prev.filter(p => p.id !== petId));
    } catch (e) {
      setError(e as Error);
    }
  }, []);

  return { pets, addPet, deletePet, error };
};