import React from "react";
import { View, StyleSheet } from "react-native";
import ChatWindow from "./ChatWindows";

const ChatWidget = () => {
  return (
    <View style={styles.container}>
      <ChatWindow />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
});

export default ChatWidget;
