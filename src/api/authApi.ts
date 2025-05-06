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
    
        return await response.json();
    } catch (error: any) {
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.');
        }

        throw error;
    }
    
}

export const registerUser = async (email: string, username: string, password: string) => {
    try {
        const response = await fetch('https://guff-api-production.up.railway.app/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ email, username, password }),
        });
    
        if (!response.ok) {
            const errorData = await response.json();
            throw errorData.detail || { general: 'Error al registrar usuario' };
        }

        return await response.json();
    } catch (error: any) {
        if (error instanceof TypeError) {
            throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.');
        }

        throw error;
    }
}

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
}