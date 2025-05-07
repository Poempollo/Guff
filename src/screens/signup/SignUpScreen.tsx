import React, { useCallback, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useFonts } from "expo-font";
import {
  Montserrat_500Medium,
  Montserrat_700Bold,
} from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../../App";
import styles from "../../styles/LoginStyles";
import SignUpForm from "./SignUpForm";
import {
  validateEmail,
  validateUsername,
  validatePassword,
} from "../../utils/useFormValidation";
import { registerUser } from "../../api/authApi";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [signUpError, setSignUpError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [fontsLoaded] = useFonts({
    Montserrat_500Medium,
    Montserrat_700Bold,
  });

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
  };

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (errors.password) setErrors((prev) => ({ ...prev, password: "" }));
  };

  const handlePasswordConfirmationChange = (text: string) => {
    setPasswordConfirmation(text);
    if (errors.passwordConfirmation) setErrors((prev) => ({ ...prev, passwordConfirmation: "" }));
  };

  const handleSignUp = useCallback(async () => {
    setSubmitted(true);

    // validaciones de credenciales
    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const passwordConfirmationError = password !== passwordConfirmation 
      ? "Las contraseñas no coinciden" : "";

    const newErrors = {
      email: emailError,
      username: usernameError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError,
    };

    setErrors(newErrors);

    if (emailError || passwordError || usernameError || passwordConfirmationError) return;

    setLoading(true);

    try {
      const data = await registerUser(email, username, password);
      await AsyncStorage.setItem('token', data.token);
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
      console.error("Error al registrar: ", error);

      if (error.message === 'No se pudo conectar con el servidor. Inténtelo de nuevo más tarde.') {
        setSignUpError(error.message);
      } else if (typeof error === "object") {
        setErrors((prev) => ({
          ...prev,
          ...error,
        }));
      }
    } finally {
      setLoading(false);
    }
  }, [email, username, password, passwordConfirmation, navigation]);

  if (!fontsLoaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../.././../assets/logo.png")} // Ajusta la ruta según tu estructura
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>Guff</Text>
          <Text style={styles.subtitle}>¡Únete a nuestra comunidad!</Text>
        </View>

        <SignUpForm
          email={email}
          username={username}
          password={password}
          passwordConfirmation={passwordConfirmation}
          showErrors={submitted}
          onEmailChange={handleEmailChange}
          onUsernameChange={handleUsernameChange}
          onPasswordChange={handlePasswordChange}
          onPasswordConfirmationChange={handlePasswordConfirmationChange}
          errors={errors}
        />
        {signUpError !== '' && <Text style={styles.bigErrorMessage}>{signUpError}</Text>}
        <TouchableOpacity 
          style={[styles.button, loading && { opacity: 0.5 }]} 
          onPress={handleSignUp}
          disabled={loading}  
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff"/>
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </TouchableOpacity>

        <View style={styles.footerContainer}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.footerLink}>
              ¿Ya tienes cuenta? Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUpScreen;
