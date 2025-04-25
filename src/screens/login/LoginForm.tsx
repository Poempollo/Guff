import React from "react";
import { View, TextInput, Text, StyleSheet } from 'react-native';
import styles from '../../styles/LoginStyles';

type Props = {
    email: string;
    password: string;
    onEmailChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
    showErrors: boolean;
    errors: {
        email: string;
        password: string;
    };
};

const LoginForm = 
({ email, 
    password, 
    onEmailChange, 
    onPasswordChange, 
    showErrors,
    errors,
}: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={onEmailChange}
            />
            {showErrors && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput 
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={onPasswordChange}
            />
            {showErrors && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}
        </View>
    );
};

export default React.memo(LoginForm);