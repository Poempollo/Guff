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

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const handleResetPassword = useCallback(() => {
    setSubmitted(true);

    const emailError = validateEmail(email);
    if(emailError) {
      setErrorMessage(emailError);
      return;
    }
    Alert.alert(
      "Correo enviado si existe.\n Complete el proceso de cambio de contraseña, y vuelva a iniciar sesión", 
      `Se han enviado instrucciones a ${email}`);

    // Llamada a la API
    
    navigation.goBack();
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
          onEmailChange={setEmail} 
          showErrors={submitted}
          errorMessage={errorMessage}
        />

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