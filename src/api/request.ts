export async function apiRequest<T>(url: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error en la solicitud');
    }

    // Si no hay cuerpo (por ejemplo en DELETE)
    if (response.status === 204) return {} as T;

    return await response.json();
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el servidor.');
    }
    throw error;
  }
}