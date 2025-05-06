import React from "react";
import { View, Text, Image } from 'react-native';
import styles from "../../styles/LoginStyles";

//Mirar lottie-react-native para animaciones de inicio de sesión.
//Mirar este video: https://youtu.be/i4dNESMH2w8

const SplashScreen = () => (
    <View style={styles.container}>
        <Image
            source={require('../../../assets/logo.png')}
            style={styles.logo}
            resizeMode="contain"
        />
        <Text style={styles.title}>Guff</Text>
        <Text style={styles.subtitle}>Cargando...</Text>
    </View>
);

export default SplashScreen;