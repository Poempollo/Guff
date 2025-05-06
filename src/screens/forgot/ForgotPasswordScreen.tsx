import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import ForgotPasswordForm from './ForgotPasswordForm';
import styles from '../../styles/LoginStyles';
import { validateEmail } from '../../utils/useFormValidation';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { forgotPassword } from '../../api/authApi';
import { ActivityIndicator } from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (serverError) setServerError('');
  }

  const handleResetPassword = useCallback(async () => {
    setSubmitted(true);

    const emailError = validateEmail(email);
    if(emailError) {
      setErrorMessage(emailError);
      return;
    }
    
    setLoading(true);
    
    try {
      await forgotPassword(email);
      setServerError('');
      Alert.alert("Instrucciones enviadas. Revisa tu correo.");
      navigation.goBack();
    } catch (error: any) {
      const message = error?.message || 'Error al enviar el correo.'
      setServerError(message);
      return
    } finally {
      setLoading(false);
    }
  }, [email, navigation]);

  if (!fontsLoaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
              source={require('../.././../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
          />
          <Text style={styles.title}>¿Olvidaste tu contraseña?</Text>
          <Text style={styles.subtitle}>Te ayudaremos a recuperarla</Text>
        </View>

        <ForgotPasswordForm 
          email={email} 
          onEmailChange={handleEmailChange} 
          showErrors={submitted}
          errorMessage={errorMessage}
          serverError={serverError}
        />

        {serverError !== '' && <Text style={styles.bigErrorMessage}>{serverError}</Text>}
        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.5 }]} 
          onPress={handleResetPassword}
          disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff"/>
            ) : (
              <Text style={styles.buttonText}>Enviar instrucciones</Text>
            )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.footerLink}>Volver al inicio de sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPasswordScreen;