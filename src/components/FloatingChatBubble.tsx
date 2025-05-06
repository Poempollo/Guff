import React from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  onPress: () => void;
}

const FloatingChatBubble: React.FC<Props> = ({ onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    <LinearGradient
      colors={["#00c6ff", "#0072ff", "#c471f5", "#fa71cd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientCircle}
    >
      <View style={styles.innerCircle} />
    </LinearGradient>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    zIndex: 1000,
  },
  gradientCircle: {
    flex: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
  },
  innerCircle: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderRadius: 20,
  },
});

export default FloatingChatBubble;
