import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LoginScreen from "./src/screens/login/LoginScreen";
import BottomTabsNavigator from "./src/navigation/BottomTabsNavigator";
import SignUpScreen from "./src/screens/signup/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/forgot/ForgotPasswordScreen";
import SplashScreen from "./src/components/splash/SplashScreen";
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";
import { PetProvider } from "./src/context/PetContext";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  /*const [isAppReady, setIsAppReady] = useState(false);
  const [loaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!loaded || !isAppReady) {
    return (
      <SplashScreen
        onFinish={(isCancelled) => !isCancelled && setIsAppReady(true)}
      />
    );
  }*/

  return (
    <SafeAreaProvider>
      {/* Envolvemos con el contexto de mascotas */}
      <PetProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
          >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Main" component={BottomTabsNavigator} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </PetProvider>
    </SafeAreaProvider>
  );
}
