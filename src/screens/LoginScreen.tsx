import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';

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

  const handleLogin = () => {
    // Aquí iría la lógica de autenticación
    console.log('Iniciando sesión con:', email, password);
    // ¡En una app real, llamarían a su API aquí!
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🐾</Text>
        <Text style={styles.title}>PetCare Pro</Text>
        <Text style={styles.subtitle}>Tu compañero veterinario de confianza</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    fontSize: 60,
    color: '#00bfff',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 5,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Montserrat_500Medium',
    color: '#777',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#00bfff',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
  },
  footerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerLink: {
    color: '#00bfff',
    marginTop: 10,
    fontSize: 14,
  },
});

export default LoginScreen;