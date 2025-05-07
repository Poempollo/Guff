// screens/SettingsScreen.tsx
import React from "react";
import { ScrollView } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import styles from "../../styles/SettingsStyles";
import SettingSection from "../../components/SettingsSection";
import SettingItem from "../../components/SettingItem";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { SettingsStackParamList } from "../../navigation/SettingsStackNavigator";
import { RootStackParamList } from "../../../App";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { deleteAccount } from "../../api/authApi";
import { getToken } from "../../api/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SettingsScreen = () => {
  const settingsNav = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [token, setToken] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await getToken();
      setToken(storedToken)
    };
    fetchToken();
  }, []);

  const handleDeleteAccount = async () => {
    if (!token) {
      Alert.alert("Error", "No estás autenticado.");
      return;
    }

    Alert.alert(
      "Eliminar cuenta",
      "¿Estás seguro de que quieres eliminar tu cuenta permanentemente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar cuenta",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteAccount(token);
              await AsyncStorage.removeItem("authToken");
              rootNav.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            } catch (error: any) {
              Alert.alert("Error", error.message || "Algo salió mal.");
            }
          },
        },
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
          <SettingSection title="Notificaciones">
            <SettingItem title="Recordatorios" toggle />
            <SettingItem title="Promociones" toggle />
          </SettingSection>

          
          <SettingSection title="Región">
          <SettingItem title="Spain" onPress={() => settingsNav.navigate("Region")} icon="earth-outline" />
          </SettingSection>

          <SettingSection title="Acerca de">
            <SettingItem
              title="version 0.2.5"
              icon="information-circle-outline"
              disabled
            />
            <SettingItem title="Términos y condiciones" onPress={() => settingsNav.navigate("Terms")} />
            <SettingItem title="Política de privacidad" onPress={() => settingsNav.navigate("Privacy")} />
          </SettingSection>

          <SettingSection title="Cuenta">
            <SettingItem
              title="Cerrar sesión"
              onPress={() => {
                Alert.alert(
                  "Cerrar sesión",
                  "¿Estás seguro de que quieres cerrar sesión?",
                  [
                    {text: "Cancelar", style: "cancel"},
                    {
                      text: "Cerrar sesión",
                      style: "destructive",
                      onPress: () => {
                        AsyncStorage.removeItem("authToken");
                        rootNav.reset({
                          index: 0,
                          routes: [{ name: "Login"}],
                        });
                      },
                    },
                  ]
                );
              }}
              icon="log-out-outline"
              danger
            />
            <SettingItem
              title="Eliminar Cuenta"
              onPress={handleDeleteAccount}
              icon="person-remove-outline"
              danger
            />
          </SettingSection>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(SettingsScreen);
