import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ForgotPasswordForm from './ForgotPasswordForm';
import styles from '../../styles/LoginStyles';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const handleResetPassword = useCallback(() => {
    if (email) {
      Alert.alert("Correo enviado", `Se han enviado instrucciones a ${email}`);
      // Aquí podrías llamar a una API para enviar el correo de recuperación
    } else {
      Alert.alert("Error", "Por favor ingresa tu correo electrónico");
    }
  }, [email]);

  if (!fontsLoaded) return null;

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🐾</Text>
        <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
        <Text style={styles.subtitle}>Te ayudaremos a recuperarla</Text>
      </View>

      <ForgotPasswordForm email={email} onEmailChange={setEmail} />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Enviar instrucciones</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.footerLink}>Volver al inicio de sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;