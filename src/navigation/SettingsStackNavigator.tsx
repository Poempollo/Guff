import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import RegionScreen from "../screens/legal/RegionScreen";
import TermsScreen from "../screens/legal/TermsScreen";
import PrivacyScreen from "../screens/legal/PrivacyScreen";

export type SettingsStackParamList = {
  SettingsMain: undefined;
  Region: undefined;
  Terms: undefined;
  Privacy: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: "Ajustes" }} />
      <Stack.Screen name="Region" component={RegionScreen} options={{ title: "Región" }} />
      <Stack.Screen name="Terms" component={TermsScreen} options={{ title: "Términos" }} />
      <Stack.Screen name="Privacy" component={PrivacyScreen} options={{ title: "Privacidad" }} />
    </Stack.Navigator>
  );
};

export default SettingsStack;
