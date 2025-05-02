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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [serverError, setServerError] = useState('');
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
    
    try {
      await forgotPassword(email);
      setServerError('');
      Alert.alert("Instrucciones enviadas. Revisa tu correo.");
      navigation.goBack();
    } catch (error: any) {
      const message = error?.message || 'Error al enviar el correo.'
      setServerError(message);
      return
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
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Enviar instrucciones</Text>
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