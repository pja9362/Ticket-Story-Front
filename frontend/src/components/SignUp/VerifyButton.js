import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const VerifyButton = ({isValid}) => {
  const handleNextClick = () => {
    if (!isValid) {
      console.log('disabled');
    } else {
        // onClick();
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        style={[styles.nextBtn, !isValid && styles.disabledBtn]}
        onPress={handleNextClick}
        disabled={!isValid}>
        <Text style={styles.text}>인증번호 요청</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 78,
    height: 43,
    backgroundColor: '#000',
    marginTop: 60,
    borderRadius: 50,
  },
  disabledBtn: {
    backgroundColor: '#D9D9D9',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: 40,
  },
});

export default VerifyButton;
