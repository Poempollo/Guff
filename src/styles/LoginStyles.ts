import { StyleSheet } from "react-native";
import { colors } from "./theme";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.background,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 10,
        alignSelf: 'center',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 5,
        color: colors.primary,
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        color: colors.subtitle,
    },
    button: {
        backgroundColor: colors.primary,
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
    },
    footerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerLink: {
        color: colors.primary,
        marginTop: 10,
        fontSize: 14,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
        color: colors.text,
        borderWidth: 1,
        borderColor: colors.primary,
    },
    inputError: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
        color: colors.text,
        borderWidth: 2,
        borderColor: colors.error,
    },
    errorText: {
        color: colors.error,
        fontSize: 12,
        marginTop: -5,
        marginBottom: 10,
    },      
});