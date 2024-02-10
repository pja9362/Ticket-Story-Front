import React from 'react';
import { TouchableHighlight, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const NextButton = ({ onPress, isDisabled }) => {
  return (
    <TouchableHighlight
      underlayColor={isDisabled ? '#D3D3D3' : '#5D70F9'}
      style={[styles.floatingButton, { backgroundColor: isDisabled ? '#D3D3D3' : '#5D70F9' }]}
      disabled={isDisabled}
      onPress={onPress}
    >
      <Icon name="angle-right" size={30} color="#fff" />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NextButton;
