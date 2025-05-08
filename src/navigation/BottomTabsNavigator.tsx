import React, { useEffect, useRef, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, StyleSheet, Animated, Easing } from "react-native";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/home/ProfileScreen";
import ChatWindow from "../components/ChatWindows";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import SettingsStack from "./SettingsStackNavigator";

const Tab = createBottomTabNavigator();

// Componente personalizado para el botón de AI con efecto.
const AIButton = ({ focused }) => {
  // Estado para controlar los colores actuales
  const [colorIndex, setColorIndex] = useState(0);
  
  // Crear animaciones para diferentes efectos
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const glowOpacityAnim = useRef(new Animated.Value(0.3)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  
  // Colores
  const aiColors = [
    { text: 'rgb(88, 86, 214)', inner: 'rgb(100, 210, 255)', outer: 'rgb(255, 149, 0)' },
    { text: 'rgb(100, 210, 255)', inner: 'rgb(48, 176, 199)', outer: 'rgb(88, 86, 214)' },
    { text: 'rgb(48, 176, 199)', inner: 'rgb(52, 199, 89)', outer: 'rgb(100, 210, 255)' },
    { text: 'rgb(52, 199, 89)', inner: 'rgb(255, 149, 0)', outer: 'rgb(48, 176, 199)' },
    { text: 'rgb(255, 149, 0)', inner: 'rgb(88, 86, 214)', outer: 'rgb(52, 199, 89)' },
  ];
  
  // Índice de color actual
  const currentColors = aiColors[colorIndex];

  useEffect(() => {
    let colorInterval;
    
    if (focused) {
      // Reiniciar animaciones
      pulseAnim.setValue(1);
      
      // Efecto de pulso
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
          easing: Easing.inOut(Easing.ease),
        }),
      ]).start();
      
      // Efecto de brillo pulsante continuo
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowOpacityAnim, {
            toValue: 0.8,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin),
          }),
          Animated.timing(glowOpacityAnim, {
            toValue: 0.3,
            duration: 1500,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin),
          }),
        ])
      ).start();
      
      // Efecto de rotación sutil para el brillo
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 4000,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      ).start();
      
      // Cambiar colores utilizando un intervalo de tiempo en lugar de usar Animated
      colorInterval = setInterval(() => {
        setColorIndex((prevIndex) => (prevIndex + 1) % aiColors.length);
      }, 1500);
    }
    
    return () => {
      // Limpiar animaciones al desmontar o cuando pierde el foco
      pulseAnim.stopAnimation();
      glowOpacityAnim.stopAnimation();
      rotateAnim.stopAnimation();
      if (colorInterval) clearInterval(colorInterval);
    };
  }, [focused]);

  // Calcular valores de la animación
  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.aiContainer}>
      {focused && (
        <>
          {/* Capa de brillo exterior - con colores cambiantes */}
          <Animated.View
            style={[
              styles.outerGlow,
              {
                opacity: glowOpacityAnim,
                transform: [
                  { scale: pulseAnim },
                  { rotate }
                ],
                borderColor: currentColors.outer
              },
            ]}
          />
          
          {/* Capa de brillo interior - con colores cambiantes */}
          <Animated.View
            style={[
              styles.glowEffect,
              {
                opacity: glowOpacityAnim,
                transform: [{ scale: pulseAnim }],
                backgroundColor: currentColors.inner
              },
            ]}
          />
        </>
      )}
      
      {/* Contenedor del texto AI */}
      <Animated.View
        style={[
          styles.aiButtonContainer,
          focused && styles.aiButtonContainerFocused,
          { transform: [{ scale: pulseAnim }] },
        ]}
      >
        <Text 
          style={[
            styles.aiText, 
            focused ? { color: currentColors.text } : styles.aiTextInactive
          ]}
        >
          AI
        </Text>
      </Animated.View>
    </View>
  );
};

const BottomTabsNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home";
          
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
            return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
            return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
            return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
          } else if (route.name === "Chat") {
            return <AIButton focused={focused} />;
          }
          
          return <Ionicons name={iconName} size={focused ? 28 : 24} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 70,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
          paddingBottom: 10,
          bottom: 0,
          left: 0,
          right: 0,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Chat" component={ChatWindow} />
      <Tab.Screen name="Settings" component={SettingsStack} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  aiContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  aiButtonContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  aiButtonContainerFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  aiText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  aiTextInactive: {
    color: 'gray',
  },
  glowEffect: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    opacity: 0.2,
    zIndex: 1,
  },
  outerGlow: {
    position: 'absolute',
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    opacity: 0.3,
    zIndex: 0,
  },
});

export default BottomTabsNavigator;