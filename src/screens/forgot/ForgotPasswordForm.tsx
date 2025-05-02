import React from "react";
import { View, TextInput, Text } from 'react-native';
import styles from '../../styles/LoginStyles';

type Props = {
    email: string;
    onEmailChange: (text: string) => void;
    showErrors: boolean;
    errorMessage: string;
    serverError: string;
};

const ForgotPasswordForm = ({ email, onEmailChange, showErrors, errorMessage, serverError }: Props) => {
    return (
        <View style={styles.inputContainer}>
            <TextInput 
                style={[styles.input, !!serverError && styles.inputError]}
                placeholder="Correo Electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                autoFocus
                returnKeyType="next"
                value={email}
                onChangeText={onEmailChange}
            />
            {showErrors && errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
};

export default React.memo(ForgotPasswordForm);