import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../screens/settings/SettingsScreen";
import RegionScreen from "../screens/legal/RegionScreen";
import TermsScreen from "../screens/legal/TermsScreen";
import PrivacyScreen from "../screens/legal/PrivacyScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

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
      <Stack.Screen name="SettingsMain" component={SettingsScreen} options={{ title: "Ajustes", headerShown: false }} />
      <Stack.Screen name="Region" 
        component={RegionScreen} 
        options={({ navigation }) => ({
          headerTitle: '',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen name="Terms" 
        component={TermsScreen} 
        options={({ navigation }) => ({
          headerTitle: '',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })} 
      />
      <Stack.Screen name="Privacy" 
        component={PrivacyScreen} 
        options={({ navigation }) => ({
          headerTitle: '',
          headerBackVisible: false,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colors.background,
          },
          headerLeft: () => (
            <Ionicons
              name="chevron-back"
              size={24}
              style={{ marginLeft: 10 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })} 
      />
    </Stack.Navigator>
  );
};

export default SettingsStack;
