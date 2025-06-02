import React, { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import { toast } from "sonner-native";
import ChatWidget from "../../components/chatbot/ChatWidget";
import { hasAccess } from "../../utils/subscriptionAccess";

const ChatbotScreen = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const userPlan = auth.userPlan;

  useEffect(() => {
    if (!hasAccess(userPlan, 'premium')) {
      toast.error('Necesitas el plan Premium para acceder al chatbot.');
      setTimeout(() => {
        navigation.navigate('Plans' as never);
      }, 1000);
    }
  }, []);

  if (!hasAccess(userPlan, 'premium')) {
    return null;
  }

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
