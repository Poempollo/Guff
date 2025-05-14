import { Platform, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colors } from "./theme";

// Funciones para estilos dinámicos
export const getHeaderStyle = (top: number) => ({
  padding: 16,
  paddingTop: top + 10,
  backgroundColor: colors.primary,
});

export const getMessageBubbleStyle = (isUser: boolean): StyleProp<ViewStyle> => ({
  alignSelf: isUser ? "flex-end" : "flex-start" as ViewStyle["alignSelf"],
  backgroundColor: isUser ? "#08C6B7" : "#fff",
  padding: 12,
  marginVertical: 6,
  borderRadius: 18,
  maxWidth: "80%",
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
});

export const getMessageTextStyle = (isUser: boolean) => ({
  color: isUser ? "#fff" : colors.text,
  fontSize: 14,
  fontFamily: "Montserrat_500Medium",
});

// Estilos estáticos
export const chatWindowStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  innerContainer: {
    flex: 1,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#fff",
  },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#4CAF50",
    borderWidth: 2,
    borderColor: "#fff",
  },
  nameText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  subtitleText: {
    color: "#e0f7ff",
    fontSize: 13,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#f2f2f2",
  },
  scrollContent: {
    paddingBottom: 100,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "#eaeaea",
  },
  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === "ios" ? 10 : 8,
    fontSize: 14,
    fontFamily: "Montserrat_500Medium",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    marginLeft: 10,
  },
});
