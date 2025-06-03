import { StyleSheet } from "react-native";

export const lockedStyles = StyleSheet.create({
  lockedOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  lockedTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  lockedSubtitle: {
    color: "#ccc",
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center",
  },
  upgradeButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  upgradeText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
