import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { OPENROUTER_API_KEY } from "@env";

const asistentes = [
  { nombre: "Ana Felipe", avatar: "https://i.pravatar.cc/300?img=1" },
  { nombre: "Ana Nerea", avatar: "https://i.pravatar.cc/300?img=2" },
  { nombre: "Raul", avatar: "https://i.pravatar.cc/300?img=3" },
  { nombre: "Javier", avatar: "https://i.pravatar.cc/300?img=4" },
  { nombre: "Lucas", avatar: "https://i.pravatar.cc/300?img=5" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatWindow = () => {
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [asistente, setAsistente] = useState<{ nombre: string; avatar: string } | null>(null);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const aleatorio = asistentes[Math.floor(Math.random() * asistentes.length)];
    setAsistente(aleatorio);

    const bienvenida: Message = {
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
      const { sound } = await Audio.Sound.createAsync(
        require("../../assets/sounds/notification.mp3")
      );
      await sound.playAsync();
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    const allMessages = [...messages, userMessage];
    setMessages(allMessages);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          Referer: "https://tuapp.com",
          "X-Title": "Guff Chatbot",
        },
        body: JSON.stringify({
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "Eres un asistente amigable que ayuda con dudas generales." },
            ...allMessages,
          ],
        }),
      });

      const data = await resp.json();
      if (!resp.ok) {
        throw new Error(data.message || "Error desconocido en OpenRouter");
      }

      const botContent = data.choices?.[0]?.message?.content ?? "Lo siento, no entendí eso.";
      const botMessage: Message = { role: "assistant", content: botContent };

      setTimeout(() => {
        setMessages((prev) => [...prev, botMessage]);
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
        playBotSound();
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("Error al procesar el mensaje:", err);
      const errorMsg: Message = {
        role: "assistant",
        content: "Lo siento, ha ocurrido un error al procesar tu mensaje.",
      };
      setMessages((prev) => [...prev, errorMsg]);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.bubble, item.role === "user" ? styles.user : styles.bot]}>
      <Text style={[styles.text, item.role === "user" ? styles.userText : styles.botText]}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={[styles.container, { paddingBottom: insets.bottom }]}
    >
      <LinearGradient colors={["#0072ff", "#00c6ff"]} style={[styles.header, { paddingTop: insets.top + 10}]}>
        <View style={styles.avatarRow}>
          {asistente && (
            <>
              <Image source={{ uri: asistente.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.title}>Chat con {asistente.nombre}</Text>
                <Text style={styles.subtitle}>Normalmente respondemos en pocos minutos.</Text>
              </View>
            </>
          )}
        </View>
      </LinearGradient>

      <FlatList
        ref={flatListRef}
        data={[...messages].reverse()}
        keyExtractor={(_, i) => i.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messages}
        inverted
      />

      {loading && (
        <View style={styles.typingIndicator}>
          <ActivityIndicator size="small" color="#0072ff" />
          <Text style={styles.typingText}>Escribiendo...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <Ionicons name="happy-outline" size={22} color="#888" />
        <TextInput
          placeholder="Escribe tu mensaje..."
          placeholderTextColor="#888"
          style={styles.input}
          value={input}
          onChangeText={setInput}
          editable={!loading}
        />
        <TouchableOpacity onPress={sendMessage} disabled={loading} style={styles.sendButton}>
          <Ionicons name="send" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 15,
    paddingBottom: 20,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  subtitle: {
    color: "#e0f7ff",
    fontSize: 12,
  },
  messages: {
    padding: 10,
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "80%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  user: {
    backgroundColor: "#0072ff",
    alignSelf: "flex-end",
  },
  bot: {
    backgroundColor: "#f1f1f1",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 14,
  },
  userText: {
    color: "white",
  },
  botText: {
    color: "#222",
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 6,
    gap: 6,
  },
  typingText: {
    color: "#555",
    fontStyle: "italic",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 12,
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#0072ff",
    padding: 10,
    borderRadius: 20,
    marginLeft: 8,
  },
});

export default ChatWindow;
