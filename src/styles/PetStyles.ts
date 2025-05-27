import { Dimensions, StyleSheet } from 'react-native';
import { colors } from './theme';

const { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',    // CENTRADO vertical
    alignItems: 'center',        // CENTRADO horizontal
  },
  modalContent: {
    width: '90%',                // un poco de margen lateral
    height: height * 0.8,        // 💡 ocupa el 80% de la altura de pantalla
    backgroundColor: colors.white,
    borderRadius: 20,            // bordes suaves
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 15,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: colors.text,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    color: colors.text,
    marginBottom: 10,
  },
  picker: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginBottom: 10,
    height: 50,
    justifyContent: 'center',
  },
  imagePicker: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 6,
    padding: 12,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  saveButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  cancelText: {
    color: colors.error,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default styles;
