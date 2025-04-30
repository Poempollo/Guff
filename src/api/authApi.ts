export const loginUser = async (email: string, password: string) => {
    const response = await fetch('https://guff-api-production.up.railway.app/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Credenciales inválidas');
    }

    return await response.json();
}

export const registerUser = async (name: string, email: string, username: string, password: string) => {
    const response = await fetch('https://guff-api-production.up.railway.app/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({ name, email, username, password }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw errorData.detail || { general: 'Error al registrar usuario' };
    }

    return await response.json();
}