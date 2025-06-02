import React, { useContext } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthContext from "../../context/AuthContext";
import styles from "../../styles/Plans/UpgradePlanButtonStyles";

const UpgradePlanButton = () => {
  const navigation = useNavigation();
  const { userPlan } = useContext(AuthContext);

  const label = userPlan === "premium" ? "Ver Plan Actual" : "Mejorar Plan";

  return (
    <TouchableOpacity
      style={styles.upgradeButton}
      onPress={() => navigation.navigate("Plans" as never)}
    >
      <Text style={styles.upgradeButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

export default UpgradePlanButton;
