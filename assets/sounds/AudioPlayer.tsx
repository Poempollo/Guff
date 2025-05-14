import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { Audio } from 'expo-audio';

export const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const loadAndPlaySound = async () => {
    if (soundRef.current) {
      await soundRef.current.unloadAsync();
    }

    const { sound } = await Audio.Sound.createAsync(
      require('../sounds/notification.mp3')
    );

    soundRef.current = sound;
    await sound.playAsync();
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate(status => {
      if (!status.isLoaded) return;
      if (status.didJustFinish) {
        setIsPlaying(false);
      }
    });
  };

  const stopSound = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18 }}>Reproductor de Audio</Text>
      <Button
        title={isPlaying ? 'Detener' : 'Reproducir'}
        onPress={isPlaying ? stopSound : loadAndPlaySound}
      />
    </View>
  );
};
