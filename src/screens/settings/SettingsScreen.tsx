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

const SettingsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<SettingsStackParamList>>();
  
  return (
    <ScrollView style={styles.container}>
      <Animated.View entering={FadeIn.duration(600)} style={styles.content}>
        <SettingSection title="Notificaciones">
          <SettingItem title="Recordatorios" toggle />
          <SettingItem title="Promociones" toggle />
        </SettingSection>

        <SettingSection title="Region">
        <SettingItem title="Spain" onPress={() => navigation.navigate("Region")} icon="earth-outline" />
        </SettingSection>

        <SettingSection title="Acerca de">
          <SettingItem
            title="version 0.2.5"
            icon="information-circle-outline"
            disabled
          />
          <SettingItem title="Términos y condiciones" onPress={() => navigation.navigate("Terms")} />
          <SettingItem title="Política de privacidad" onPress={() => navigation.navigate("Privacy")} />
        </SettingSection>

        <SettingSection title="Cuenta">
          <SettingItem
            title="Cerrar sesión"
            onPress={() => {}}
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
