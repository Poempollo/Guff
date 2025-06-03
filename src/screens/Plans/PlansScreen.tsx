import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  useWindowDimensions,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/Plans/PlansScreenStyles";
import { Plan } from "../../types";

const PlansScreen = () => {
  const { width } = useWindowDimensions();
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  const plans: Plan[] = [
    {
      id: "free",
      name: "Gratis",
      price: "0€",
      color: "#8E9AAF",
      description: "Plan básico con funcionalidades limitadas",
      image:
        "https://img.icons8.com/external-vitaliy-gorbachev-lineal-vitaly-gorbachev/60/external-free-sales-vitaliy-gorbachev-lineal-vitaly-gorbachev.png",
      features: [
        "Acceso al catálogo básico",
        "Funcionalidades limitadas",
        "Sin acceso a tienda de mascotas",
        "Soporte por email",
      ],
    },
    {
      id: "intermediate",
      name: "Intermedio",
      price: "9.99€/mes",
      color: "#5E60CE",
      description: "Acceso a la tienda de mascotas y más",
      image: "https://img.icons8.com/bubbles/100/message-bot.png",
      features: [
        "Acceso completo a tienda de mascotas",
        "Descuentos en productos seleccionados",
        "Soporte prioritario",
        "Sin anuncios",
      ],
    },
    {
      id: "premium",
      name: "Premium",
      price: "19.99€/mes",
      color: "#FF6B6B",
      description: "Acceso VIP con todos los beneficios",
      image:
        "https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-premium-service-mobile-app-development-flaticons-lineal-color-flat-icons.png",
      features: [
        "Acceso completo a todas las secciones",
        "Envío gratuito en todos los productos",
        "Soporte 24/7 con asistencia personalizada",
        "Ofertas exclusivas y preventas",
        "Consultas veterinarias ilimitadas",
      ],
    },
  ];

  const handlePlanSelection = async (planId: Plan["id"]) => {
    setSelectedPlan(planId);
    setIsLoading(true);

    setTimeout(() => {
      auth.signIn(planId);
      Toast.show({
        type: "success",
        text1: `¡Plan ${planId} activado con éxito!`,
      });
      setIsLoading(false);
      navigation.navigate("Main" as never);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Elige tu Plan</Text>
        <Text style={styles.subtitle}>Selecciona el plan que mejor se adapte a tus necesidades</Text>

        <View
          style={[
            styles.plansContainer,
            width > 768 && { flexDirection: "row", flexWrap: "wrap", alignItems: "stretch" },
          ]}
        >
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isPremium = plan.id === "premium";
            const isCurrentPlan = auth.userPlan === plan.id;

            return (
              <TouchableOpacity
                key={plan.id}
                style={[
                  styles.planCard,
                  isSelected && styles.selectedCard,
                  { borderColor: plan.color },
                  isPremium && styles.premiumCard,
                ]}
                onPress={() => setSelectedPlan(plan.id)}
                activeOpacity={0.85}
              >
                {isPremium && (
                  <View style={styles.popularTag}>
                    <Text style={styles.popularTagText}>Popular</Text>
                  </View>
                )}

                <Image source={{ uri: plan.image }} style={styles.planImage} resizeMode="cover" />

                <Text style={[styles.planName, { color: plan.color }]}>{plan.name}</Text>
                <Text style={styles.planPrice}>{plan.price}</Text>
                <Text style={styles.planDescription}>{plan.description}</Text>

                <View style={styles.featuresContainer}>
                  {plan.features.map((feature, idx) => (
                    <View key={idx} style={styles.featureRow}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color={plan.color}
                        style={styles.checkIcon}
                      />
                      <Text style={styles.featureText}>{feature}</Text>
                    </View>
                  ))}
                </View>

                <TouchableOpacity
                  style={[styles.selectButton, { backgroundColor: plan.color }]}
                  onPress={() => handlePlanSelection(plan.id)}
                  disabled={isLoading || isCurrentPlan}
                >
                  {isLoading && selectedPlan === plan.id ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text style={styles.selectButtonText}>
                      {isCurrentPlan ? "Plan Actual" : "Seleccionar"}
                    </Text>
                  )}
                </TouchableOpacity>

                {isCurrentPlan && (
                  <View style={styles.currentPlanBadge}>
                    <Text style={styles.currentPlanText}>Plan Activo</Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlansScreen;