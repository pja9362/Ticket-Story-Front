// import React from 'react';
import React, { useState } from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';

const CustomText = (props) => {
  // 폰트 스타일 설정
  const fontStyle = () => {
    switch (props.fontWeight) {
      case 'bold':
        return styles.bold;
      case 'medium':
        return styles.medium;
      default:
        return styles.regular;
    }
  };

  return (
    <Text numberOfLines={props.numberOfLines} style={[styles.text, fontStyle(), props.style]}>
      {props.children}
    </Text>
  );
};

const CustomTextInput = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  // 폰트 스타일 설정
  const fontStyle = () => {
    switch (props.fontWeight) {
      case 'bold':
        return styles.bold;
      case 'medium':
        return styles.medium;
      default:
        return styles.regular;
    }
  };

  return (
    <TextInput
      {...props}
      style={[styles.text, fontStyle(), props.style]}
    />
  );

};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard-Regular',
  },
  regular: {
    fontFamily: 'Pretendard-Regular',
  },
  bold: {
    fontFamily: 'Pretendard-Bold',
  },
  medium: {
    fontFamily: 'Pretendard-Medium',
  },
  inputContainer: {
    position: 'relative',
    width: '100%',
  },
  placeholder: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: '#B6B6B6',
  },
  textInput: {
    height: 40,
    borderColor: '#B6B6B6',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 14,
    fontFamily: 'Pretendard-Regular',
  },
});

export { CustomText, CustomTextInput };
