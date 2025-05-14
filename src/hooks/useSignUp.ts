import { useCallback, useState } from 'react';
import { validateEmail, validateUsername, validatePassword } from '../utils/useFormValidation';
import { registerUser } from '../api/authApi';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export const useSignUp = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
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

  const handleEmailChange = (text: string) => {
    setEmail(text);
    if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
  };
  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (errors.username) setErrors((prev) => ({ ...prev, username: "" }));
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

    const emailError = validateEmail(email);
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    const passwordConfirmationError = password !== passwordConfirmation ? "Las contraseñas no coinciden" : "";

    const newErrors = {
      email: emailError,
      username: usernameError,
      password: passwordError,
      passwordConfirmation: passwordConfirmationError,
    };

    setErrors(newErrors);
    if (emailError || usernameError || passwordError || passwordConfirmationError) return;

    setLoading(true);
    try {
      const data = await registerUser(email, username, password);
      await AsyncStorage.setItem("token", data.token);
      navigation.reset({
        index: 0,
        routes: [{ name: "Main", state: { routes: [{ name: "Home" }] } }],
      });
    } catch (error: any) {
      const message = error.message || "Error desconocido";
      if (message.includes("conectar")) {
        setSignUpError(message);
      } else {
        setErrors((prev) => ({ ...prev, ...error }));
      }
    } finally {
      setLoading(false);
    }
  }, [email, username, password, passwordConfirmation, navigation]);

  return {
    email,
    username,
    password,
    passwordConfirmation,
    signUpError,
    submitted,
    loading,
    errors,
    handleEmailChange,
    handleUsernameChange,
    handlePasswordChange,
    handlePasswordConfirmationChange,
    handleSignUp,
  };
};
