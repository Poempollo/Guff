import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";


import LoginScreen from "./src/screens/login/LoginScreen";
import BottomTabsNavigator from "./src/navigation/BottomTabsNavigator";
import SignUpScreen from "./src/screens/signup/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/forgot/ForgotPasswordScreen";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={BottomTabsNavigator} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
