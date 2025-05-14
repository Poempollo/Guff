import React from "react";
import { View, StyleSheet } from "react-native";
import ChatWidget from "../../components/chatbot/ChatWidget";

const ChatbotScreen = () => {
  return (
    <View style={styles.container}>
      <ChatWidget />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default ChatbotScreen;
