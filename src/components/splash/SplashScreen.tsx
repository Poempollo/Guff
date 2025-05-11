import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native"
import first from '../../../assets/lotties/first.json'

//Mirar lottie-react-native para animaciones de inicio de sesión.
//Mirar este video: https://youtu.be/i4dNESMH2w8

export default function SplashScreen({ onFinish = (isCancelled) => {} } : { onFinish?: (isCancelled: boolean) => void }) {
    return (
        <SafeAreaView style={{ flex: 1}}>
            <LottieView
                source={first}
                onAnimationFinish={onFinish}
                autoPlay
                resizeMode="cover"
                loop={false}
                style={{
                    flex: 1,
                    width: "100%"
                }}
            />
        </SafeAreaView>
    )
}