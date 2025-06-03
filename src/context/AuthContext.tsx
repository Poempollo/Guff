import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PlanLevel } from '../utils/subscriptionAccess';

interface AuthContextProps {
  userPlan: PlanLevel;
  loading: boolean;
  signIn: (plan: PlanLevel) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  userPlan: 'free',
  loading: true,
  signIn: () => {},
  signOut: () => {},
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
        console.error('Error al cargar el plan desde AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredPlan();
  }, []);

  const signIn = useCallback(async (plan: PlanLevel) => {
    try {
      await AsyncStorage.setItem('@userPlan', plan);
      setUserPlan(plan);
    } catch (error) {
      console.error('Error al guardar el plan en AsyncStorage:', error);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await AsyncStorage.removeItem('@userPlan');
      setUserPlan('free');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userPlan, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
