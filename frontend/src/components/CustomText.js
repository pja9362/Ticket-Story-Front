import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

const CustomText = (props) => {
  return <Text numberOfLines={props.numberOfLines} style={[styles.text, props.style]}>{props.children}</Text>;
};

const CustomTextInput = (props) => {
    return (
      <TextInput
        {...props}
        style={[styles.text, props.style]} // 여기에서 추가적인 스타일을 적용할 수 있습니다.
      />
    );
  };
  

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Pretendard',
    // fontWeight: 'bold',
  },
});

export {CustomText, CustomTextInput};