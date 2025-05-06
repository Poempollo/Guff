import React from "react";
import { Text, StyleSheet, ScrollView } from "react-native";
import styles from "../../styles/LegalStyles";

const TermsScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Términos y condiciones</Text>
      <Text style={styles.text}>
        Bienvenido a Guff. Al utilizar esta aplicación, aceptas cumplir con estos términos y condiciones:
        {"\n\n"}1. Solo puedes crear una cuenta si eres mayor de edad o cuentas con permiso de un adulto.
        {"\n\n"}2. No se permite el uso de contenido ofensivo, ilegal o que infrinja derechos de terceros.
        {"\n\n"}3. Guff no se hace responsable por el contenido generado por los usuarios.
        {"\n\n"}4. Nos reservamos el derecho de suspender o eliminar cuentas que incumplan estas normas.
        {"\n\n"}5. El uso continuado de la app implica la aceptación de cualquier cambio en estos términos.
        {"\n\n"}Para más información, contacta con soporte.
      </Text>
    </ScrollView>
  );
};

export default TermsScreen;
