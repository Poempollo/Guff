import { useEffect, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteAccount, getToken } from '../api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

export const useSettings = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [token, setToken] = useState<string | null>(null);

  // Obtener token almacenado
  useEffect(() => {
    const fetchToken = async () => {
      const stored = await getToken();
      setToken(stored);
    };
    fetchToken();
  }, []);

  // Eliminar cuenta con confirmación
  const handleDeleteAccount = useCallback(() => {
    if (!token) {
      Alert.alert('Error', 'No estás autenticado.');
      return;
    }

    Alert.alert(
      'Eliminar cuenta',
      '¿Estás seguro de que quieres eliminar tu cuenta permanentemente?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar cuenta',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount(token);
              await AsyncStorage.removeItem('authToken');
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (error: any) {
              Alert.alert('Error', error.message || 'Algo salió mal.');
            }
          },
        },
      ]
    );
  }, [token, navigation]);

  // Cerrar sesión con confirmación
  const handleLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('authToken');
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  return {
    handleDeleteAccount,
    handleLogout,
  };
};
