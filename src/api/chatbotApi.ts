import axios from 'axios';

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "https://guff-api-production.up.railway.app";

export const sendMessageToBot = async (messages: { role: string; content: string }[]) => {
  try {
    const res = await axios.post(`${BASE_URL}/chatbot`, { messages });
    return res.data;
  } catch (error: any) {
    console.error("Error al enviar mensaje al bot:", error?.response?.data || error.message);
    throw new Error("No se pudo contactar con el bot");
  }
};
