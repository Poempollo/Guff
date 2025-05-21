import { useState, useCallback } from 'react';
import { validateEmail, validatePassword } from '../utils/useFormValidation';
import { loginUser } from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { getUserPets } from '../api/petApi';
import { usePetContext } from '../context/PetContext';

export const useLogin = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const {setPets } = usePetContext();

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
      await AsyncStorage.setItem('token', data.access_token);

      const pets = await getUserPets();
      setPets(pets);

      setLoginError('');

      navigation.reset({
        index: 0,
        routes: [{ name: 'Main', state: { routes: [{ name: 'Home' }] } }],
      });
    } catch (error: any) {
      const message = error.message || 'Error de conexión';
      setLoginError(message.includes('servidor') ? message : 'Credenciales incorrectas');
      setLoginFailed(true);
    } finally {
      setLoading(false);
    }
  }, [email, password, navigation]);

  return {
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
  };
};
