import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';

const LockedScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userPlan } = useContext(AuthContext);

  const { featureName, requiredPlan } = route.params as {
    featureName: string;
    requiredPlan: 'intermediate' | 'premium';
  };

  return (
    <View style={styles.overlay}>
      <Ionicons name="lock-closed" size={64} color="#fff" />
      <Text style={styles.title}>Contenido Exclusivo</Text>
      <Text style={styles.subtitle}>
        La función "{featureName}" está disponible solo para usuarios con el plan{' '}
        <Text style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>{requiredPlan}</Text>.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Plans' as never)}
      >
        <Text style={styles.buttonText}>Mejorar Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  subtitle: {
    color: '#ccc',
    fontSize: 16,
    marginVertical: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    marginTop: 18,
  },
  cancelText: {
    color: '#aaa',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default LockedScreen;
