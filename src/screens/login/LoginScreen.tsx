import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import LoginForm from './LoginForm';
import styles from './LoginStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return null; // O algún componente de carga
  }

  /**
   * 
   * Lógica de autenticación, aquí llamamos a la API.
   * useCallback() guarda la función en memoria, y solo se re-renderiza
   * si cambian email o password.
   */
  const handleLogin = useCallback(() => {
    console.log('Credenciales: ', email, password);
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🐾</Text>
        <Text style={styles.title}>PetCare Pro</Text>
        <Text style={styles.subtitle}>Tu compañero veterinario de confianza</Text>
      </View>

      <LoginForm 
        email={email}
        password={password}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <TouchableOpacity>
          <Text style={styles.footerLink}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.footerLink}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;