import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryBtn = ({ title, onPress, isSelected, isDisabled }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isSelected ? '#007AFF' : '#FFFFFF' },
      ]}
      onPress={onPress}
      disabled={isDisabled}
    >
      <Text style={[styles.buttonText, { color: isSelected ? '#FFFFFF' : '#000000' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CategoryBtn;
