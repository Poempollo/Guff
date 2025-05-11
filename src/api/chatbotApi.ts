export const sendMessageToBot = async (messages: { role: string; content: string }[]) => {
  try {
    const response = await fetch(`https://guff-api-production.up.railway.app/chatbot`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Error al contactar con el bot');
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    if (error instanceof TypeError) {
      throw new Error('No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.');
    }
    throw error;
  }
};
