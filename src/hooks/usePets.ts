import { useState, useEffect, useCallback } from 'react';
import * as api from '../api/petApi';
import { PetData } from '../api/petApi';
import { Pet } from '../api/petApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const usePets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPets = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) return;

        const userPets = await api.getUserPets();
        setPets(userPets);
      } catch (err) {
        setError(err as Error);
      }
    };

    loadPets();
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

  const refreshPets = useCallback(async () => {
    try {
      const updatedPets = await api.getUserPets();
      setPets(updatedPets);
    } catch (e) {
      setError(e as Error);
    }
  }, []);


  return { pets, addPet, deletePet, refreshPets, error };
};