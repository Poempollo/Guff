import React from "react";
import { View, TextInput, Text } from 'react-native';
import styles from '../../styles/LoginStyles';

type Props = {
    email: string;
    onEmailChange: (text: string) => void;
};

const ForgotPasswordForm = ({ email, onEmailChange }: Props) => {
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
        </View>
    );
};

export default React.memo(ForgotPasswordForm);