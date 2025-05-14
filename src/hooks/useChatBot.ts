import { useState, useEffect, useRef } from "react";
import { Audio } from "expo-av";
import { ChatMessage } from "../services/chatbotService";
import { sendMessageToBot } from "../api/chatbotApi";
import { avatars } from "../../assets/avatars/Assistants";
import { ScrollView } from "react-native";

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [asistente, setAsistente] = useState<{ nombre: string; avatar: string } | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    const asistentes = [
      { nombre: "Ana Felipe", avatar: avatars.anaFelipe },
      { nombre: "Raul", avatar: avatars.raul },
      { nombre: "Javier", avatar: avatars.javier },
      { nombre: "Lucas", avatar: avatars.lucas },
    ];

    const aleatorio = asistentes[Math.floor(Math.random() * asistentes.length)];
    setAsistente(aleatorio);

    const bienvenida: ChatMessage = {
      role: "assistant",
      content: `¡Hola! Soy ${aleatorio.nombre} 😊 ¿En qué puedo ayudarte hoy?`,
    };

    const timer = setTimeout(() => {
      setMessages([bienvenida]);
      playBotSound();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const playBotSound = async () => {
    try {
      const sound = new Audio.Sound();
      await sound.loadAsync(require("../../assets/sounds/notification.mp3"));
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate(status => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const newUserMessage: ChatMessage = { role: "user", content: input };
    const updatedMessages = [...messages, newUserMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await sendMessageToBot(updatedMessages);
      const assistantReply = response.content ?? "Lo siento, no entendí eso.";

      const botMessage: ChatMessage = { role: "assistant", content: assistantReply };
      setMessages([...updatedMessages, botMessage]);
      playBotSound();
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error al contactar con el asistente 😕" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return {
    messages,
    input,
    setInput,
    loading,
    asistente,
    handleSend,
    scrollViewRef,
  };
};
