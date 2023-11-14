import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const GenderButton = ({label, isActive, onPress}) => (
  <TouchableOpacity
    style={[
      styles.genderBtn,
      isActive && {backgroundColor: 'rgba(149, 149, 149, 1)'},
    ]}
    onPress={onPress}>
    <Text style={isActive ? styles.activeText : styles.optionText}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  genderBtn: {
    width: 48,
    alignItems: 'center',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(217, 217, 217, 1)',
    borderRadius: 15,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
    lineHeight: 22,
  },
  activeText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
});


export default GenderButton;