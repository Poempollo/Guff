import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveToken = async (token: string) => {
    await AsyncStorage.setItem("authToken", token);
};

export const getToken = async (): Promise<string | null> => {
    return await AsyncStorage.getItem("authToken");
};

export const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch('https://guff-api-production.up.railway.app/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
    
        if (!response.ok) {
            throw new Error('Credenciales inválidas');
        }

        const data = await response.json();
        await saveToken(data.access_token);
        return data;
    } catch (error: any) {
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.');
        }

        throw error;
    }
};

export const registerUser = async (email: string, username: string, password: string) => {
    try {
        const response = await fetch('https://guff-api-production.up.railway.app/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, username, password }),
        });

        const text = await response.text();

        let data;
        try {
            data = JSON.parse(text);
        } catch {
            console.error('Respuesta no JSON del servidor: ', text);
            throw new Error('Error inesperado del servidor');
        }

        if (!response.ok) {
            throw new Error(data.detail || 'Error al registrar usuario');
        }

        await saveToken(data.token || data.access_token);
        return data;
    } catch (error: any) {
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.');
        }

        throw error;
    }
};

export const forgotPassword = async (email: string) => {
    try {
        const response = await fetch('https://guff-api-production.up.railway.app/auth/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
        })

        if (!response.ok) {
            throw new Error('No se pudo enviar el correo de recuperación.');
        }
    } catch (error: any) {
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.')
        }

        throw error;
    }
};

export const deleteAccount = async (token: string) => {
    try {
        const response = await fetch('https://guff-api-production.up.railway.app/auth/delete-account', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al eliminar la cuenta.');
        }
    } catch (error:any) {
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.')
        }

        throw error;
    }
};