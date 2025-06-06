import React from "react";
import { ScrollView, Alert } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/SettingsStyles";
import SettingSection from "../../components/SettingsSection";
import SettingItem from "../../components/SettingItem";
import { useSettings } from "../../hooks/useSettings";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { SettingsStackParamList } from "../../navigation/SettingsStackNavigator";

const SettingsScreen = () => {
  const { handleLogout, handleDeleteAccount } = useSettings();

  const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
          
          <SettingSection title="Notificaciones">
            <SettingItem title="Recordatorios" toggle />
            <SettingItem title="Promociones" toggle />
          </SettingSection>

          <SettingSection title="Región">
            <SettingItem
              title="Spain"
              onPress={() => navigation.navigate("Region")}
              icon="earth-outline"
            />
          </SettingSection>

          <SettingSection title="Acerca de">
            <SettingItem
              title="Versión 0.2.5"
              icon="information-circle-outline"
              disabled
            />
            <SettingItem
              title="Términos y condiciones"
              onPress={() => navigation.navigate("Terms")}
            />
            <SettingItem
              title="Política de privacidad"
              onPress={() => navigation.navigate("Privacy")}
            />
          </SettingSection>

          <SettingSection title="Cuenta">
            <SettingItem
              title="Cerrar sesión"
              onPress={handleLogout}
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
