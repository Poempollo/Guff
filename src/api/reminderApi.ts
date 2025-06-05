import { getToken } from "./authApi";

const BASE_URL = 'https://guff-api-production.up.railway.app/reminders';

export interface Reminder {
    id: number;
    title: string;
    description?: string;
    start_date: string;
    finish_date: string;
    pet_id: number;
}

export interface ReminderCreate {
  title: string;
  description?: string;
  start_date: string;
  finish_date: string;
  pet_id: number;
}

// Crear un recordatorio
export const createReminder = async (data: ReminderCreate): Promise<Reminder> => {
    const token = await getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const res = await fetch(`${BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Error al crear el recordatorio');
    return await res.json();
};

// Actualizar un recordatorio
export const updateReminder = async (id: number, data: ReminderCreate): Promise<Reminder> => {
    const token = await getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error('Error al actualizar el recordatorio');
    return await res.json();
};

// Borrar un recordatorio
export const deleteReminder = async (id: number): Promise<void> => {
    const token = await getToken();
    if (!token) throw new Error("Usuario no autenticado");

    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!res.ok) throw new Error('Error al eliminar el recordatorio');
};

// Obtener recordatorios futuros
export const getFutureReminders = async (): Promise<Reminder[]> => {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}/future`, {
        headers: {'Authorization': `Bearer ${token}`},
    });
    if(!res.ok) throw new Error("Error al obtener recordatorios futuros");
    return await res.json();
}

// Obtener recordatorios activos
export const getActiveReminders = async (): Promise<Reminder[]> => {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}/active`, {
        headers: {'Authorization': `Bearer ${token}`},
    });
    if(!res.ok) throw new Error("Error al obtener recordatorios activos");
    return await res.json();
}

// Obtener recordatorios pasados
export const getPastReminders = async (): Promise<Reminder[]> => {
    const token = await getToken();
    const res = await fetch(`${BASE_URL}/past`, {
        headers: {'Authorization': `Bearer ${token}`},
    });
    if(!res.ok) throw new Error("Error al obtener recordatorios pasados");
    return await res.json();
}