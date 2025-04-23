import React from "react";
import { View, TextInput, Text, StyleSheet } from 'react-native';
import styles from '../../styles/LoginStyles';

type Props = {
    email: string;
    password: string;
    onEmailChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
};

const LoginForm = ({ email, password, onEmailChange, onPasswordChange }: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={onEmailChange}
            />
            {email === '' && <Text style={styles.errorText}>Correo necesario</Text>}

            <TextInput 
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={onPasswordChange}
            />
            {password === '' && <Text style={styles.errorText}>Contraseña necesaria</Text>}
        </View>
    );
};

export default React.memo(LoginForm);