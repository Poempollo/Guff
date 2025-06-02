// components/UpgradePlanButton.tsx

import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';

const UpgradePlanButton = () => {
  const navigation = useNavigation();
  const { userPlan } = useContext(AuthContext);

  const label = userPlan === 'premium' ? 'Ver Plan Actual' : 'Mejorar Plan';

  return (
    <TouchableOpacity
      style={styles.upgradeButton}
      onPress={() => navigation.navigate('Plans' as never)}
    >
      <Text style={styles.upgradeButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  upgradeButton: {
    backgroundColor: '#5E60CE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignSelf: 'center',
    marginTop: 24,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  upgradeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UpgradePlanButton;
