import { StyleSheet } from 'react-native';
import { colors } from '../theme';

export default StyleSheet.create({
  upgradeButton: {
    backgroundColor: colors.primary,
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
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});