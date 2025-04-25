import React from "react";
import {View, TextInput, Text } from 'react-native';
import styles from '../../styles/LoginStyles';

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
    errorMessage: string;
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
    errorMessage,
}: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Nombre"
                value={name}
                onChangeText={onNameChange}
            />
            {showErrors && nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                value={email}
                onChangeText={onEmailChange}
            />
            {showErrors && nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Nombre de usuario"
                value={username}
                onChangeText={onUsernameChange}
            />
            {showErrors && nameError && <Text style={styles.errorText}>{nameError}</Text>}

            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={onPasswordChange}
            />
            {showErrors && passwordError && <Text style={styles.errorText}>{nameError}</Text>}
        </View>
    );
};

export default React.memo(SignUpForm);