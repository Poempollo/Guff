import React from "react";
import { View, TextInput, Text, StyleSheet } from 'react-native';
import styles from '../../styles/LoginStyles';
import { colors } from '../../styles/theme';

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
    loginFailed: boolean;
};

const LoginForm = 
({ email, 
    password, 
    onEmailChange, 
    onPasswordChange, 
    showErrors,
    errors,
    loginFailed,
}: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={[styles.input, loginFailed && styles.inputError]}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
                value={email}
                onChangeText={onEmailChange}
            />
            {showErrors && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput 
                style={[styles.input, loginFailed && styles.inputError]}
                placeholder="Contraseña"
                secureTextEntry
                returnKeyType="done"
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