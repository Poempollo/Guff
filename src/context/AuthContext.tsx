import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlanLevel } from '../utils/subscriptionAccess';

interface AuthContextProps {
  userPlan: PlanLevel;
  signOut: () => void;
  signIn: (plan: PlanLevel) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  userPlan: 'free',
  signOut: () => {},
  signIn: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userPlan, setUserPlan] = useState<PlanLevel>('free');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredPlan = async () => {
      try {
        const storedPlan = await AsyncStorage.getItem('@userPlan');
        if (storedPlan) {
          setUserPlan(storedPlan as PlanLevel);
        }
      } catch (error) {
        console.error('Error al cargar plan desde almacenamiento:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredPlan();
  }, []);

  const signIn = async (plan: PlanLevel) => {
    try {
      await AsyncStorage.setItem('@userPlan', plan);
      setUserPlan(plan);
    } catch (error) {
      console.error('Error al guardar el plan:', error);
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('@userPlan');
      setUserPlan('free');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userPlan, signOut, signIn, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
