import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LoginForm from './LoginForm';
import styles from '../../styles/LoginStyles';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  /**
   * 
   * Lógica de autenticación, aquí llamamos a la API.
   * useCallback() guarda la función en memoria, y solo se re-renderiza
   * si cambian email o password.
   */
  const handleLogin = useCallback(() => {
    console.log('Credenciales: ', email, password);

    if (email && password) {
      navigation.navigate('Home');
    }
  }, [email, password, navigation]);

  if (!fontsLoaded) {
    return null; // O algún componente de carga
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>🐾</Text>
        <Text style={styles.title}>Guff</Text>
        <Text style={styles.subtitle}>Para nuestros mejores amigos peludos</Text>
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