import { StyleSheet } from "react-native";
import { colors } from "./theme";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: -15,
  },
  content: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#666",
    marginBottom: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemIcon: {
    marginRight: 12,
  },
  itemTitle: {
    fontSize: 18,
  },
  itemDisabled: {
    opacity: 0.5,
  },
});

export default styles;
