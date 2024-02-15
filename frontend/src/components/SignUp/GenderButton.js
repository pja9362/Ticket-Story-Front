import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const GenderButton = ({label, isActive, onPress}) => (
  <TouchableOpacity
    style={[
      styles.genderBtn,
      isActive && {backgroundColor: '#B6B6B6'},
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
    borderColor: '#D9D9D9',
    borderRadius: 5,
  },
  optionText: {
    fontSize: 14,
    color: '#525252',
    lineHeight: 22,
  },
  activeText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 22,
  },
});


export default GenderButton;