import { apiRequest } from '../api/request';
import { Pet } from '../types';

const API_URL = 'https://guff-api-production.up.railway.app/pets';

export const getPets = () => apiRequest<Pet[]>(API_URL);

export const addPet = (pet: Pet) =>
  apiRequest<void>(API_URL, {
    method: 'POST',
    body: JSON.stringify(pet),
  });

export const deletePet = (id: string) =>
  apiRequest<void>(`${API_URL}/${id}`, {
    method: 'DELETE',
  });