import React from 'react';
import { TouchableHighlight, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import blueButton from '../../images/nextbutton_blue.png';
import grayButton from '../../images/nextbutton_gray.png';

const NextButton = ({ onPress, isDisabled }) => {
  return (
    // <TouchableHighlight
    //   underlayColor={isDisabled ? '#D3D3D3' : '#5D70F9'}
    //   style={[styles.floatingButton, { backgroundColor: isDisabled ? '#D3D3D3' : '#5D70F9' }]}
    //   disabled={isDisabled}
    //   onPress={onPress}
    // >
    //   <Image source={blueButton} style={{width: 30, height: 30}}/>
    //   <Image source={grayButton} style={{width: 30, height: 30}}/>
    //   {/* <Icon name="angle-right" size={30} color="#fff" /> */}
    // </TouchableHighlight>
    <TouchableOpacity
      disabled={isDisabled}
      onPress={onPress}
    >
      {isDisabled ? (
        <Image source={grayButton} style={{width: 60, height: 60}} />
      ) : (
        <Image source={blueButton} style={{width: 60, height: 60}} />
      )}
    </TouchableOpacity>
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
