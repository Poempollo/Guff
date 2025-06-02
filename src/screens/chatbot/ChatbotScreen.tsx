import React, { useContext, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import ChatWidget from "../../components/chatbot/ChatWidget";
import { hasAccess } from "../../utils/subscriptionAccess";

const ChatbotScreen = () => {
  const auth = useContext(AuthContext);
  const navigation = useNavigation();
  const [blocked, setBlocked] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (!hasAccess(auth.userPlan, "premium")) {
        setBlocked(true);
      } else {
        setBlocked(false);
      }
    }, [auth.userPlan])
  );

  if (blocked) {
    return (
      <View style={lockedStyles.lockedOverlay}>
        <Ionicons name="lock-closed" size={64} color="#fff" />
        <Text style={lockedStyles.lockedTitle}>Acceso exclusivo</Text>
        <Text style={lockedStyles.lockedSubtitle}>
          Esta función es solo para usuarios con el plan <Text style={{ fontWeight: 'bold' }}>Premium</Text>.
        </Text>

        <TouchableOpacity
          style={lockedStyles.upgradeButton}
          onPress={() => navigation.navigate('Plans' as never)}
        >
          <Text style={lockedStyles.upgradeText}>Mejorar mi plan</Text>
        </TouchableOpacity>
      </View>
    );
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

const lockedStyles = StyleSheet.create({
  lockedOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  lockedTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  lockedSubtitle: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center",
  },
  upgradeButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  upgradeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default ChatbotScreen;
