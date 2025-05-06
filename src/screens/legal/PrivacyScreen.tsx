import React from "react";
import { Text, ScrollView } from "react-native";
import styles from "../../styles/LegalStyles";

const PrivacyScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Política de privacidad</Text>
      <Text style={styles.text}>
        En Guff, valoramos tu privacidad. Esta política explica cómo recopilamos y usamos tus datos:
        {"\n\n"}1. Solo recopilamos la información necesaria para ofrecerte nuestros servicios.
        {"\n\n"}2. Tus datos no se comparten con terceros sin tu consentimiento.
        {"\n\n"}3. Utilizamos herramientas de análisis de uso, pero de forma anónima y con fines de mejora.
        {"\n\n"}4. Puedes solicitar la eliminación de tus datos en cualquier momento.
        {"\n\n"}5. Aplicamos medidas de seguridad para proteger tu información.
        {"\n\n"}Al usar Guff, aceptas esta política de privacidad.
      </Text>
    </ScrollView>
  );
};

export default PrivacyScreen;
