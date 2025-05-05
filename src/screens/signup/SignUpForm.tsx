import React from "react";
import {View, TextInput, Text } from 'react-native';
import styles from '../../styles/LoginStyles';
import { colors } from "../../styles/theme";

type Props = {
    email: string;
    username: string;
    password: string;
    passwordConfirmation: string;
    onEmailChange: (text: string) => void;
    onUsernameChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
    onPasswordConfirmationChange: (text: string) => void;
    showErrors: boolean;
    errors: {
        email: string;
        username: string;
        password: string;
        passwordConfirmation: string;
    }
};

const SignUpForm = ({
    email,
    username,
    password,
    passwordConfirmation,
    onEmailChange, 
    onUsernameChange, 
    onPasswordChange,
    onPasswordConfirmationChange,
    showErrors,
    errors,
}: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={[styles.input, showErrors && errors.username && styles.inputError]}
                placeholder="Nombre de usuario"
                autoCapitalize="none"
                autoFocus
                returnKeyType="next"
                value={username}
                onChangeText={onUsernameChange}
            />
            {showErrors && errors.username && (
                <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
                style={[styles.input, showErrors && errors.email && styles.inputError]}
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
                style={[styles.input, showErrors && (errors.password || errors.passwordConfirmation) && styles.inputError]}
                placeholder="Contraseña"
                secureTextEntry
                returnKeyType="next"
                value={password}
                onChangeText={onPasswordChange}
            />
            {showErrors && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <TextInput
                style={[styles.input, showErrors && errors.passwordConfirmation && styles.inputError]}
                placeholder="Confirmar contraseña"
                secureTextEntry
                returnKeyType="done"
                value={passwordConfirmation}
                onChangeText={onPasswordConfirmationChange}
            />
            {showErrors && errors.passwordConfirmation && (
                <Text style={styles.errorText}>{errors.passwordConfirmation}</Text>
            )}
        </View>
    );
};

export default React.memo(SignUpForm);