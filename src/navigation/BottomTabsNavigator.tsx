import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { colors } from "../styles/theme";

import ChatbotScreen from "../screens/chatbot/ChatbotScreen";
import SettingsStack from "./SettingsStackNavigator";
import PetsScreen from "../screens/pets/PetsScreen";
import MarketScreen from "../screens/market/MarketScreen";
import MapScreen from "../screens/map/MapScreen";

import AuthContext from "../context/AuthContext";
import { hasAccess } from "../utils/subscriptionAccess";

// 👉 Tipado de las rutas del tab navigator
export type TabsParamList = {
  Home: undefined;
  Market: undefined;
  Chatbot: undefined;
  Settings: undefined;
  Map: undefined;
};

const Tab = createBottomTabNavigator<TabsParamList>();

const BottomTabsNavigator = () => {
  const { userPlan } = useContext(AuthContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "paw-outline";
          let showLock = false;

          if (route.name === "Home") {
            iconName = focused ? "paw" : "paw-outline";
          } else if (route.name === "Market") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Chatbot") {
            iconName = focused ? "chatbox" : "chatbox-outline";
            showLock = !hasAccess(userPlan, "premium");
          } else if (route.name === "Map") {
            iconName = focused ? "map" : "map-outline";
            showLock = !hasAccess(userPlan, "intermediate");
          }

          const animatedStyle = useAnimatedStyle(() => ({
            transform: [
              {
                scale: withSpring(focused ? 1.3 : 1, {
                  damping: 8,
                  stiffness: 120,
                }),
              },
            ],
          }), [focused]);

          return (
            <Animated.View style={animatedStyle}>
              <Ionicons
                name={showLock ? "lock-closed" : iconName}
                size={24}
                color={color}
              />
            </Animated.View>
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 90,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          paddingBottom: 10,
          paddingTop: 15,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={PetsScreen} />
      <Tab.Screen name="Market" component={MarketScreen} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen name="Settings" component={SettingsStack} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
