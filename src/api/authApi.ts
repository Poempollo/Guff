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