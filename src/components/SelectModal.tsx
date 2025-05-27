import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  StyleSheet,
} from "react-native";

interface SelectModalProps {
  visible: boolean;
  options: string[];
  onSelect: (value: string) => void;
  onClose: () => void;
}

export const SelectModal = ({ visible, options, onSelect, onClose }: SelectModalProps) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableOpacity style={styles.overlay} onPress={onClose} activeOpacity={1}>
        <View style={styles.modal}>
          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => { onSelect(item); onClose(); }} style={styles.option}>
                <Text style={styles.optionText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modal: {
    width: '80%', backgroundColor: 'white', borderRadius: 8, padding: 10, maxHeight: '60%'
  },
  option: {
    paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ccc'
  },
  optionText: {
    fontSize: 16, textAlign: 'center'
  }
});
