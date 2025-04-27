import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./src/screens/login/LoginScreen";
import BottomTabsNavigator from './src/navigation/BottomTabsNavigator';
import SignUpScreen from "./src/screens/signup/SignUpScreen";
import ForgotPasswordScreen from "./src/screens/forgot/ForgotPasswordScreen";

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Home" component={BottomTabsNavigator} />
        <Stack.Screen name="SignUp" component={SignUpScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}