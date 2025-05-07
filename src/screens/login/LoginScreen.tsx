// src/screens/login/LoginScreen.tsx
import React, { useCallback, useState } from 'react';
import { Text, View, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import LoginForm from './LoginForm';
import styles from '../../styles/LoginStyles';
import { validateEmail, validatePassword } from '../../utils/useFormValidation';
import { loginUser } from '../../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (loginFailed) setLoginFailed(false);
    if (loginError) setLoginError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (loginFailed) setLoginFailed(false);
    if (loginError) setLoginError('');
  };

  const handleLogin = useCallback(async () => {
    setSubmitted(true);

    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const newErrors = { email: emailError, password: passwordError };
    setErrors(newErrors);

    if (emailError || passwordError) return;

    setLoading(true);

    try {
      const data = await loginUser(email, password);
      console.log('Login correcto: ', data);
      setLoginError('');

      await AsyncStorage.setItem('token', data.access_token);
      // Resetear navegación y entrar directamente a Main > Home tab
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'Main',
            state: {
              routes: [{ name: 'Home' }],
            },
          },
        ],
      });
    } catch (error: any) {
      console.error('Error al iniciar sesión: ', error);
      if (error.message === 'No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.') {
        setLoginError(error.message);
      } else {
        setLoginError('Credenciales de inicio de sesión incorrectas');
      }
      setLoginFailed(true);
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../.././../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Guff</Text>
          <Text style={styles.subtitle}>Para nuestros mejores amigos peludos</Text>
        </View>

        <LoginForm
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          showErrors={submitted}
          errors={errors}
          loginFailed={loginFailed}
        />

        {loginError !== '' && <Text style={styles.bigErrorMessage}>{loginError}</Text>}

        <TouchableOpacity
          style={[styles.button, loading && { opacity: 0.5 }]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
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
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
