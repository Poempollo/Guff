// src/components/chatbot/ChatWindow.tsx
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
} from "react-native";
import { sendMessageToBot } from "../../api/chatbotApi";
import { ChatMessage } from "../../services/chatbotService";
import { Audio } from "expo-av";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

const asistentes = [
  { nombre: "Ana Felipe", avatar: "https://i.pravatar.cc/300?img=1" },
  { nombre: "Ana Nerea", avatar: "https://i.pravatar.cc/300?img=2" },
  { nombre: "Raul", avatar: "https://i.pravatar.cc/300?img=3" },
  { nombre: "Javier", avatar: "https://i.pravatar.cc/300?img=4" },
  { nombre: "Lucas", avatar: "https://i.pravatar.cc/300?img=5" },
];

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [asistente, setAsistente] = useState<{ nombre: string; avatar: string } | null>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
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
    const soundAsset = require("../../../assets/sounds/notification.mp3");
    const { sound } = await Audio.Sound.createAsync(soundAsset);
    await sound.playAsync();
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
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Error al contactar con el asistente 😕" },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Encabezado con asistente */}
      <LinearGradient
        colors={["#0072ff", "#00c6ff"]}
        style={{ padding: 16, paddingTop: insets.top + 10 }}
      >
        {asistente && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: asistente.avatar }}
              style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
            />
            <View>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
                Chat con {asistente.nombre}
              </Text>
              <Text style={{ color: "#e0f7ff", fontSize: 12 }}>
                Normalmente respondemos en pocos minutos.
              </Text>
            </View>
          </View>
        )}
      </LinearGradient>

      {/* Mensajes */}
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1, paddingHorizontal: 16 }}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {messages.map((msg, index) => (
          <Text
            key={index}
            style={{
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.role === "user" ? "#DCF8C6" : "#EEE",
              borderRadius: 12,
              padding: 10,
              marginVertical: 4,
              maxWidth: "80%",
            }}
          >
            {msg.content}
          </Text>
        ))}
        {loading && <ActivityIndicator size="small" color="#999" style={{ marginVertical: 8 }} />}
      </ScrollView>

      {/* Input */}
      <View
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          right: 10,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Escribe algo..."
          style={{
            flex: 1,
            backgroundColor: "#FFF",
            borderRadius: 20,
            paddingHorizontal: 12,
            height: 40,
            borderWidth: 1,
            borderColor: "#CCC",
          }}
        />
        <TouchableOpacity onPress={handleSend} style={{ marginLeft: 8, justifyContent: "center" }}>
          <Text style={{ color: "#007AFF", fontWeight: "bold" }}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatWindow;
