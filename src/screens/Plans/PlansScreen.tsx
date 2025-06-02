import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';
import AuthContext from '../../context/AuthContext';

const { width } = Dimensions.get('window');

type Plan = {
  id: 'free' | 'intermediate' | 'premium';
  name: string;
  price: string;
  color: string;
  features: string[];
  description: string;
  image: string;
};

const PlansScreen = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const auth = useContext(AuthContext);

  const plans: Plan[] = [
    {
      id: 'free',
      name: 'Gratis',
      price: '€0',
      color: '#8E9AAF',
      description: 'Plan básico con funcionalidades limitadas',
      image: 'https://api.a0.dev/assets/image?text=Plan%20Básico&aspect=1:1&seed=1',
      features: [
        'Acceso al catálogo básico',
        'Funcionalidades limitadas',
        'Sin acceso a tienda de mascotas',
        'Soporte por email',
      ],
    },
    {
      id: 'intermediate',
      name: 'Intermedio',
      price: '€9.99/mes',
      color: '#5E60CE',
      description: 'Acceso a la tienda de mascotas y más',
      image: 'https://api.a0.dev/assets/image?text=Plan%20Intermedio&aspect=1:1&seed=2',
      features: [
        'Acceso completo a tienda de mascotas',
        'Descuentos en productos seleccionados',
        'Soporte prioritario',
        'Sin anuncios',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '€19.99/mes',
      color: '#FF6B6B',
      description: 'Acceso VIP con todos los beneficios',
      image: 'https://api.a0.dev/assets/image?text=Plan%20Premium&aspect=1:1&seed=3',
      features: [
        'Acceso completo a todas las secciones',
        'Envío gratuito en todos los productos',
        'Soporte 24/7 con asistencia personalizada',
        'Ofertas exclusivas y preventas',
        'Consultas veterinarias ilimitadas',
      ],
    },
  ];

  const handlePlanSelection = async (planId: Plan['id']) => {
    setSelectedPlan(planId);
    setIsLoading(true);

    setTimeout(() => {
      auth.signIn(planId); // usa signIn en vez de setPlan
      Toast.show({
        type: 'success',
        text1: `¡Plan ${planId} activado con éxito!`,
      });
      setIsLoading(false);
      navigation.navigate('Main' as never); // redirige a pestaña principal
    }, 1500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Elige tu Plan</Text>
      <Text style={styles.subtitle}>Selecciona el plan que mejor se adapte a tus necesidades</Text>

      <View style={styles.plansContainer}>
        {plans.map((plan) => {
          const isSelected = selectedPlan === plan.id;
          const isPremium = plan.id === 'premium';
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
                    <Ionicons name="checkmark-circle" size={20} color={plan.color} style={styles.checkIcon} />
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
                    {isCurrentPlan ? 'Plan Actual' : 'Seleccionar'}
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
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  contentContainer: { padding: 20, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 8, textAlign: 'center', color: '#333' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 24, textAlign: 'center' },
  plansContainer: {
    flexDirection: width > 768 ? 'row' : 'column',
    justifyContent: 'center',
    alignItems: width > 768 ? 'stretch' : 'center',
    flexWrap: 'wrap',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    marginHorizontal: width > 768 ? 10 : 0,
    width: width > 768 ? (width / 3) - 40 : '100%',
    maxWidth: 380,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedCard: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  premiumCard: {
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  planImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 16,
  },
  planName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  planPrice: {
    fontSize: 20,
    marginBottom: 16,
    textAlign: 'center',
    color: '#555',
    fontWeight: '500',
  },
  planDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkIcon: { marginRight: 8 },
  featureText: { fontSize: 14, color: '#666', flex: 1 },
  selectButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  popularTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FF6B6B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  popularTagText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  currentPlanBadge: {
    position: 'absolute',
    top: -10,
    left: '50%',
    transform: [{ translateX: -50 }],
    backgroundColor: '#4CAF50',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  currentPlanText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
});

export default PlansScreen;
