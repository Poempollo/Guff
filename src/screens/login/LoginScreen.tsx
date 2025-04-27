import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LoginForm from './LoginForm';
import styles from '../../styles/LoginStyles';
import { validateEmail, validatePassword } from '../../utils/useFormValidation';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
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
    setSubmitted(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    if (emailError ||passwordError) return;

    console.log('Credenciales: ', email, password);

    if (email && password) {
      navigation.navigate('Home');
    }
  }, [email, password, navigation]);

  if (!fontsLoaded) {
    return null;
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
        showErrors={submitted}
        errors={errors}
      />

      <TouchableOpacity style={styles.button} onPress={(handleLogin)}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.footerLink}>¿No tienes cuenta? Regístrate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.footerLink}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
