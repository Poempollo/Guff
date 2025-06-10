import { StyleSheet } from "react-native";
import { colors } from "../styles/theme";

const styles = StyleSheet.create({
  // Layout principal
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: 10,
  },

  // Encabezados
  headerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  titleCentered: {
  fontSize: 32,
  fontFamily: "Montserrat_700Bold",
  color: colors.primary,
  textAlign: "center",
  marginBottom: 30,
  paddingTop: 20,
},
  title: {
    fontSize: 32,
    fontFamily: "Montserrat_700Bold",
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    color: colors.subtitle,
    marginTop: 8,
    textAlign: "center",
  },

  // Botones
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: colors.white,
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },
  buttonSecondary: {
    borderColor: colors.primary,
    borderWidth: 2,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonSecondaryText: {
    color: colors.primary,
    fontFamily: "Montserrat_700Bold",
    fontSize: 16,
  },

  // Estado vacío
  emptyState: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 16,
    fontFamily: "Montserrat_500Medium",
    color: colors.subtitle,
    textAlign: "center",
    marginBottom: 24,
  },

  // Pet Card
  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 15,
    width: 260,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 24,
  },
  headerImage: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  profileInfo: {
    padding: 16,
  },
  profileName: {
    fontSize: 20,
    fontFamily: "Montserrat_700Bold",
    color: colors.text,
  },
  profileDetails: {
    fontSize: 14,
    color: colors.subtitle,
    fontFamily: "Montserrat_500Medium",
    marginTop: 4,
  },
  deleteButton: {
    marginTop: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  deleteText: {
    color: 'red',
    fontSize: 14,
  },

  // Pet Carousel
  carouselContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPetButton: {
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginVertical: 20,
  },

  // Vacuna
  vaccineCard: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
  },
  gradientBanner: {
    padding: 20,
    alignItems: "center",
  },
  bannerText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    marginTop: 10,
  },
  bannerSubtext: {
    color: "white",
    opacity: 0.9,
    fontFamily: "Montserrat_500Medium",
    marginTop: 4,
  },
  daysLeft: {
    color: "white",
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    marginTop: 10,
  },

  // Medicamentos
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    color: colors.text,
    marginLeft: 20,
    marginBottom: 20,
    marginTop: 20,
  },
  cardList: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  medicationCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  medicationIcon: {
    backgroundColor: "#FFE8E8",
    padding: 10,
    borderRadius: 10,
  },
  medicationInfo: {
    flex: 1,
    marginLeft: 15,
  },
  medicationName: {
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
    color: colors.text,
  },
  medicationFreq: {
    color: colors.subtitle,
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
  },
  medicationDate: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Montserrat_700Bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
  },
  imagePicker: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  saveButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
    width: 290,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat_700Bold",
  },
  cancelText: {
    color: colors.primary,
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    fontFamily: "Montserrat_500Medium",
  },

  // Error
  errorText: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
});

export default styles;
