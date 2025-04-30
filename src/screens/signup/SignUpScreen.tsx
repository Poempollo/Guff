import React, { useCallback, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useFonts } from 'expo-font';
import { Montserrat_500Medium, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../App';
import styles from '../../styles/LoginStyles';
import SignUpForm from './SignUpForm';
import { validateEmail, validateName, validateUsername, validatePassword } from '../../utils/useFormValidation';

const SignUpScreen = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    });
    const [fontsLoaded] = useFonts({
        Montserrat_500Medium,
        Montserrat_700Bold,
    });

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const handleSignUp = useCallback(() => {
        setSubmitted(true);

        // validaciones de credenciales
        const nameError = validateName(name);
        const emailError = validateEmail(email);
        const usernameError = validateUsername(username);
        const passwordError = validatePassword(password);

        const newErrors = {
            name: nameError,
            email: emailError,
            username: usernameError,
            password: passwordError,
        };

        setErrors(newErrors);

        if (nameError || emailError || passwordError || usernameError) return;

        // Llamada a la API
    
        console.log('Registrando: ', {email, username, password, name});
        navigation.navigate('Home');
    }, [email, username, password, name, navigation]);

    if (!fontsLoaded) return null;

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                        source={require('../.././../assets/logo.png')} // Ajusta la ruta según tu estructura
                        style={styles.logo}
                        resizeMode="contain"
                  />
                <Text style={styles.title}>Guff</Text>
                <Text style={styles.subtitle}>¡Únete a nuestra comunidad!</Text>
            </View>

            <SignUpForm
                email={email}
                username={username}
                password={password}
                name={name}
                showErrors={submitted}
                onEmailChange={setEmail}
                onUsernameChange={setUsername}
                onPasswordChange={setPassword}
                onNameChange={setName}  
                errors={errors}
            />
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.footerLink}>¿Ya tienes cuenta? Inicia sesión</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default SignUpScreen;