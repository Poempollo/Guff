import { getToken } from "./authApi";

const BASE_URL = 'https://guff-api-production.up.railway.app/pets';

export interface Pet extends PetData{
  id: number;
  age: number;
}

export interface PetData {
    name: string;
    species: string;
    breed?: string;
    gender: string;
    birth_date: string; // YYYY-MM-DD
    vaccinations?: { name: string, date: string}[];
    next_vaccines?: { name: string, date: string}[];
    distance_walked_km?: number;
    photo_url?: string;
};

export interface Vaccine {

}

export interface Medication {

}

export const createPet = async (petData: PetData) => {
    const token = await getToken();
    if (!token) throw new Error('Usuario no autenticado');

    const response = await fetch(`${BASE_URL}`, {
       method: 'POST',
       headers:  {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
       },
       body: JSON.stringify(petData),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Error al crear la mascota');
    }

    return await response.json();
};

export const getUserPets = async () => {
    const token = await getToken();
    if (!token) throw new Error('Usuario no autenticado');

    const response = await fetch(`${BASE_URL}/all`, {
        headers: { 'Authorization': `Bearer ${token}`},
    });

    if (!response.ok) {
        throw new Error('Error al obtener las mascotas');
    }

    return await response.json();
};

export const getPetById = async (petId: number) => {
  const token = await getToken();
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${BASE_URL}/${petId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Error al obtener la mascota');
  }

  return await response.json();
};

export const updatePet = async (petId: number, petData: PetData) => {
  const token = await getToken();
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${BASE_URL}/${petId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(petData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al actualizar la mascota');
  }

  return await response.json();
};

export const deletePet = async (petId: number) => {
  const token = await getToken();
  if (!token) throw new Error('Usuario no autenticado');

  const response = await fetch(`${BASE_URL}/${petId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error al eliminar la mascota');
  }

  return await response.json();
};