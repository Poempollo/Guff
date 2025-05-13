import React from "react";
import { View, StyleSheet } from "react-native";
import ChatWidget from "../../components/chatbot/ChatWidget";

const ChatbotScreen = () => {
  return (
    <View style={styles.screen}>
      <ChatWidget visible={true} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFF",
  },
});

export default ChatbotScreen;
