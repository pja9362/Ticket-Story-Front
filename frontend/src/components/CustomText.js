import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

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
      style={[styles.text, fontStyle(), props.style]} // 여기에서 추가적인 스타일을 적용할 수 있습니다.
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
});

export { CustomText, CustomTextInput };
