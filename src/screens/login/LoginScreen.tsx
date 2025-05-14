import React from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
} from '@expo-google-fonts/montserrat';

import LoginForm from './LoginForm';
import styles from '../../styles/LoginStyles';
import { useLogin } from '../../hooks/useLogin';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const {
    email,
    password,
    errors,
    loginError,
    loginFailed,
    submitted,
    loading,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLogin();

  if (!fontsLoaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Guff</Text>
          <Text style={styles.subtitle}>Para nuestros mejores amigos peludos</Text>
        </View>

        {/* Formulario */}
        <LoginForm
          email={email}
          password={password}
          onEmailChange={handleEmailChange}
          onPasswordChange={handlePasswordChange}
          showErrors={submitted}
          errors={errors}
          loginFailed={loginFailed}
        />

        {/* Errores */}
        {!!loginError && (
          <Text style={styles.bigErrorMessage}>{loginError}</Text>
        )}

        {/* Botón de envío */}
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

        {/* Navegación */}
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
