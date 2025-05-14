import React from "react";
import { View, Text } from "react-native";
import styles from "../styles/SettingsStyles";

interface Props {
  title: string;
  children: React.ReactNode;
}

const SettingSection = ({ title, children }: Props) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
};

export default SettingSection;