import React from "react";
import { SafeAreaView, View } from "react-native"; // Importa View
import LottieView from "lottie-react-native";
import first from '../../../assets/lotties/first.json';

export default function SplashScreen({ onFinish = (isCancelled) => {} }: { onFinish?: (isCancelled: boolean) => void }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Añadimos un View intermedio */}
      <View style={{ flex: 1 }}>
        <LottieView
          source={first}
          onAnimationFinish={onFinish}
          autoPlay
          resizeMode="cover" // Prueba con "contain" o "stretch" si "cover" no funciona bien
          loop={false}
          style={{
            flex: 1,
            width: "100%",
          }}
        />
      </View>
    </SafeAreaView>
  );
}