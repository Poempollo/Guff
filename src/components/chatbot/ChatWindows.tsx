import React, { useState, useEffect } from "react";
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
import { chatWindowStyles, getHeaderStyle, getMessageBubbleStyle, getMessageTextStyle } from "../../styles/ChatWindowStyles";
import { colors } from "../../styles/theme";

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

  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener("keyboardDidHide", () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={chatWindowStyles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={chatWindowStyles.innerContainer}>
          {/* Header */}
          <View style={getHeaderStyle(insets.top)}>
            {asistente && (
              <View style={chatWindowStyles.headerContent}>
                <View style={chatWindowStyles.avatarContainer}>
                  <Image
                    source={asistente.avatar} // Falla, pero muestra las imágenes, no es necesario solucionar.
                    style={chatWindowStyles.avatar}
                  />
                  <View style={chatWindowStyles.statusDot} />
                </View>
                <View>
                  <Text style={chatWindowStyles.nameText}>
                    {asistente.nombre}
                  </Text>
                  <Text style={chatWindowStyles.subtitleText}>
                    Disponible para ayudarte
                  </Text>
                </View>
              </View>
            )}
          </View>

          {/* Mensajes */}
          <ScrollView
            ref={scrollViewRef}
            style={{ flex: 1 }}
            contentContainerStyle={{ paddingVertical: 10 }}
            onContentSizeChange={() => {
              if (!keyboardVisible) {
                scrollViewRef.current?.scrollToEnd({ animated: true });
              }
            }}
          >
            {messages.map((msg, index) => (
              <View key={index} style={getMessageBubbleStyle(msg.role === "user")}>
                <Text style={getMessageTextStyle(msg.role === "user")}>
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
          <View style={chatWindowStyles.inputContainer}>
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Escribe un mensaje..."
              placeholderTextColor="#999"
              style={chatWindowStyles.input}
            />
            <TouchableOpacity onPress={handleSend} style={chatWindowStyles.sendButton}>
              <Ionicons name="send" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ChatWindow;
