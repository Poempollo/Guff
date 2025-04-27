import { StyleSheet } from "react-native";
import { colors } from "../styles/theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    fontSize: 64,
    marginBottom: 10,
    color: colors.primary,
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
    // ✨ Sombra moderna
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Android
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

    // Sombreado.
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
});

export default styles;