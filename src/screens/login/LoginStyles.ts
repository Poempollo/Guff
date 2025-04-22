import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f4f4f4',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        fontSize: 60,
        color: '#00bfff',
    },
    title: {
        fontSize: 24,
        fontFamily: 'Montserrat_700Bold',
        marginBottom: 5,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        fontFamily: 'Montserrat_500Medium',
        color: '#777',
    },
    button: {
        backgroundColor: '#00bfff',
        padding: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'Montserrat_700Bold',
    },
    footerContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerLink: {
        color: '#00bfff',
        marginTop: 10,
        fontSize: 14,
    },
    inputContainer: {
        width: '100%',
        marginBottom: 20,
    },
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: -5,
        marginBottom: 10,
    },      
});