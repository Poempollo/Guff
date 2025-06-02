import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import LoginScreen from "./src/screens/login/LoginScreen";
import SignUpScreen from "./src/screens/signup/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/forgot/ForgotPasswordScreen";
import PlansScreen from "./src/screens/Plans/PlansScreen";
import BottomTabsNavigator from "./src/navigation/BottomTabsNavigator";
import SplashScreen from "./src/components/splash/SplashScreen";

import { AuthProvider, default as AuthContext } from "./src/context/AuthContext";
import { PetProvider } from "./src/context/PetContext";

import {
  Montserrat_500Medium,
  Montserrat_700Bold,
  useFonts,
} from "@expo-google-fonts/montserrat";

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Plans: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <PetProvider>
          <AppLoader />
        </PetProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

const AppLoader = () => {
  const { loading } = useContext(AuthContext);

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded || loading) {
    return <SplashScreen onFinish={() => {}} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Plans" component={PlansScreen} />
        <Stack.Screen name="Main" component={BottomTabsNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
