export const loginUser = async (email: string, password: string) => {
    const response = await fetch('http://192.168.100.83:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error('Credenciales inválidas');
    }

    return await response.json();
}