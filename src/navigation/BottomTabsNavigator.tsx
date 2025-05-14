import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatbotScreen from "../screens/chatbot/ChatbotScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import SettingsStack from "./SettingsStackNavigator";
import PetsScreen from "../screens/pets/PetsScreen";
import MarketScreen from "../screens/market/MarketScreen";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";

const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";

          if (route.name === "Home") {
            iconName = focused ? "paw" : "paw-outline";
          } else if (route.name === "Market") {
            iconName = focused ? "cart" : "cart-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          } else if (route.name === "Chatbot") {
            iconName = focused ? "chatbox" : "chatbox-outline";
          }

          const animatedStyle = useAnimatedStyle(() => {
            return {
              transform: [
                {
                  scale: withSpring(focused ? 1.3 : 1, {
                    damping: 8,
                    stiffness: 120,
                  }),
                },
              ],
            };
          }, [focused]);

          return (
            <Animated.View style={animatedStyle}>
              <Ionicons name={iconName} size={24} color={color} />
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
    </Tab.Navigator>
  );
};

export default BottomTabsNavigator;
