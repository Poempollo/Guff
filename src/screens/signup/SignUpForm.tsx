import React from "react";
import {View, TextInput, Text } from 'react-native';
import styles from '../../styles/LoginStyles';
import { colors } from "../../styles/theme";

type Props = {
    name: string;
    email: string;
    username: string;
    password: string;
    onNameChange: (text: string) => void;
    onEmailChange: (text: string) => void;
    onUsernameChange: (text: string) => void;
    onPasswordChange: (text: string) => void;
    showErrors: boolean;
    errors: {
        name: string;
        email: string;
        username: string;
        password: string;
    }
};

const SignUpForm = ({
    name,
    email,
    username,
    password,
    onNameChange,
    onEmailChange, 
    onUsernameChange, 
    onPasswordChange,
    showErrors,
    errors,
}: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={onNameChange}
            />
            {showErrors && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
                style={[styles.input, showErrors && errors.username && styles.inputError]}
                placeholder="Nombre de usuario"
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

export default React.memo(SignUpForm);