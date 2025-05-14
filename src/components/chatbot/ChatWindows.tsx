import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useChatbot } from "../../hooks/useChatBot";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/theme";

const guffGreen = "#08C6B7";

const ChatWindow = () => {
  const {
    messages,
    input,
    setInput,
    loading,
    asistente,
    handleSend,
    scrollViewRef,
  } = useChatbot();

  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.background}}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View
            style={{
              padding: 16,
              paddingTop: insets.top + 10,
              backgroundColor: guffGreen,
            }}
          >
            {asistente && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ position: "relative", marginRight: 12 }}>
                  <Image
                    source={asistente.avatar}
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: "#fff",
                    }}
                  />
                  <View
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: "#4CAF50",
                      borderWidth: 2,
                      borderColor: "#fff",
                    }}
                  />
                </View>

                <View>
                  <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                    {asistente.nombre}
                  </Text>
                  <Text style={{ color: "#e0f7ff", fontSize: 13 }}>
                    Disponible para ayudarte
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Mensajes */}
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1, paddingHorizontal: 16, backgroundColor: "#f2f2f2" }}
            contentContainerStyle={{ paddingBottom: 100 }}
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={{
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                  backgroundColor: msg.role === "user" ? colors.primary : colors.white,
                  padding: 12,
                  marginVertical: 6,
                  borderRadius: 18,
                  maxWidth: "80%",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 2,
                  elevation: 2,
                }}
              >
                <Text
                  style={{
                    color: msg.role === "user" ? "#fff" : colors.text,
                    fontSize: 14,
                    fontFamily: "Montserrat_500Medium",
                  }}
                >
                  {msg.content}
                </Text>
              </View>
            ))}

            {loading && (
              <ActivityIndicator
                size="small"
                color={colors.primary}
                style={{ marginVertical: 10 }}
              />
            )}
          </ScrollView>

          {/* Input */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: colors.white,
              paddingHorizontal: 16,
              paddingVertical: 10,
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              borderTopWidth: 1,
              borderTopColor: "#eaeaea",
            }}
          >
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#999"
              style={{
                flex: 1,
                backgroundColor: "#f5f5f5",
                borderRadius: 20,
                paddingHorizontal: 14,
                paddingVertical: Platform.OS === "ios" ? 10 : 8,
                fontSize: 14,
                fontFamily: "Montserrat_500Medium",
                borderWidth: 1,
                borderColor: "#ddd",
              }}
            />
            <TouchableOpacity onPress={handleSend} style={{ marginLeft: 10 }}>
              <Ionicons name="send" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatWindow;
