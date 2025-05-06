import React from "react";
import { View, Text } from "react-native";
import styles from "../../styles/LegalStyles";

const RegionScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Región seleccionada</Text>
      <Text style={styles.text}>
        Actualmente tu región está configurada como <Text style={styles.bold}>España</Text>.
        Esto afecta al idioma, formato de fecha y divisa de la app. Pronto podrás cambiarla desde aquí.
      </Text>
    </View>
  );
};

export default RegionScreen;
