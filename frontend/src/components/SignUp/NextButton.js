import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const NextButton = ({onClick, isValid = 'true', isLast, message}) => {
  const handleNextClick = () => {
    if (!isValid) {
      console.log('disabled');
    } else {
      onClick();
    }
  };

  return (
    <View style={{alignItems: 'center', marginTop: 22}}>
      {
        message && <Text style={styles.errorMessage}>{message}</Text>
      }
      <TouchableOpacity
        style={[styles.nextBtn, !isValid && styles.disabledBtn, message == null && {marginTop: 40}]}
        onPress={handleNextClick}
        disabled={!isValid}>
        <Text style={styles.text}>{isLast ? '계정 만들기' : '다음'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22.5,
    height: 43,
    backgroundColor: '#5D70F9',
    marginBottom: 15,
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
  errorMessage: {
    color: '#FF0000',
    fontSize: 12,
    lineHeight: 40,
  },
});

export default NextButton;
