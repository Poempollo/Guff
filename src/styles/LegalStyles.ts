import { StyleSheet } from "react-native";
import { colors } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontFamily: "Montserrat_700Bold",
    color: colors.primary,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
    fontFamily: "Montserrat_500Medium",
  },
  bold: {
    fontWeight: "500",
    color: colors.primary,
  }
});

export default styles;
