import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/petApi';
import { PetData } from '../api/petApi';
import { Pet } from '../api/petApi';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    api.getUserPets()
      .then(setPets)
      .catch(setError);
  }, []);

  const addPet = useCallback(async (petData: PetData) => {
    try {
      const created = await api.createPet(petData);
      setPets(prev => [...prev, created]);
    } catch (e) {
      setError(e as Error);
    }
  }, [setPets]);

  const deletePet = useCallback(async (pet: Pet) => {
    try {
      await api.deletePet(pet.id);
      setPets(prev => prev.filter(p => p.id !== pet.id));
    } catch (e) {
      setError(e as Error);
    }
  }, []);

  return { pets, addPet, deletePet, error };
};