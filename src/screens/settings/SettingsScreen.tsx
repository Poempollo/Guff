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

const SettingsScreen = () => {
  const settingsNav = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  const rootNav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        <SettingSection title="Notificaciones">
          <SettingItem title="Recordatorios" toggle />
          <SettingItem title="Promociones" toggle />
        </SettingSection>

        <SettingSection title="Region">
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
            onPress={() => {}}
            icon="person-remove-outline"
            danger
          />
        </SettingSection>
      </Animated.View>
    </ScrollView>
  );
};

export default React.memo(SettingsScreen);
