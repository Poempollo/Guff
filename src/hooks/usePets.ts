import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/petApi';
import { PetData } from '../api/petApi';

export const usePets = () => {
  const [pets, setPets] = useState<PetData[]>([]);
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