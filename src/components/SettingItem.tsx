import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import styles from "../styles/SettingsStyles";

interface Props {
  title: string;
  icon?: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  toggle?: boolean;
  danger?: boolean;
  disabled?: boolean;
}

const SettingItem = ({
  title,
  icon,
  onPress,
  toggle = false,
  danger = false,
  disabled = false,
}: Props) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const handleToggle = () => setIsEnabled((prev) => !prev);

  const textColor = danger
    ? "red"
    : disabled
    ? "#aaa"
    : colors.primary || "#000";

  const content = (
    <View style={styles.itemRow}>
      {icon && (
        <Ionicons name={icon} size={20} color={textColor} style={styles.itemIcon} />
      )}
      <Text style={[styles.itemTitle, { color: textColor }]}>{title}</Text>
    </View>
  );
  return (
    <TouchableOpacity
      style={[styles.item, disabled && styles.itemDisabled]}
      onPress={toggle ? undefined : onPress}
      disabled={disabled}
      activeOpacity={toggle ? 1 : 0.6}
    >
      {content}
      {toggle && (
        <Switch
          trackColor={{ false: "#ccc", true: colors.primary }}
          thumbColor="#fff"
          onValueChange={handleToggle}
          value={isEnabled}
        />
      )}
    </TouchableOpacity>
  );
};

export default SettingItem;