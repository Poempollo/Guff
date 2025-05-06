import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import styles from "../../styles/HomeScreenStyles";
import ChatWindow from "../../components/ChatWindows";
import FloatingChatBubble from "../../components/FloatingChatBubble";

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [showChat, setShowChat] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.logo}>🐾</Text>
        <Text style={styles.title}>Guff</Text>
        <Text style={styles.subtitle}>¡Bienvenido de nuevo!</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Profile")}
        >
          <Text style={styles.buttonText}>Ir a Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Settings")}
        >
          <Text style={styles.buttonSecondaryText}>Configuración</Text>
        </TouchableOpacity>
      </View>

      {showChat && <ChatWindow />}
      <FloatingChatBubble onPress={() => setShowChat(!showChat)} />
    </View>
  );
};

export default React.memo(HomeScreen);
