// src/components/chatbot/ChatWindow.tsx
import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { sendMessageToChatbot, ChatMessage } from "../../services/chatbotService";
import { sendMessageToBot } from "../../api/chatbotApi";

const ChatWindow = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

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

      setMessages([...updatedMessages, { role: "assistant", content: assistantReply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: "assistant", content: "Error al contactar con el asistente 😕" }]);
    } finally {
      setLoading(false);
      setTimeout(() => scrollViewRef.current?.scrollToEnd({ animated: true }), 100);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <ScrollView
        ref={scrollViewRef}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 60 }}
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
        {loading && <ActivityIndicator size="small" color="#999" />}
      </ScrollView>

      <View style={{ position: "absolute", bottom: 10, left: 10, right: 10, flexDirection: "row" }}>
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
