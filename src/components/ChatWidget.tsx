import React, { useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import ChatWindow from './ChatWindows';

interface ChatWidgetProps {
  visible: boolean;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ visible }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      ]).start();
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <Animated.View style={{ transform: [{ scale }], opacity, position: 'absolute', bottom: 100, right: 20 }}>
      <ChatWindow />
    </Animated.View>
  );
};