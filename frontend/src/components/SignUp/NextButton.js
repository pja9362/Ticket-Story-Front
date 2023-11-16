import React from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';

const NextButton = ({onClick, isValid, isLast}) => {
  const handleNextClick = () => {
    if (!isValid) {
      console.log('disabled');
    } else {
      onClick();
    }
  };

  return (
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity
        style={[styles.nextBtn, !isValid && styles.disabledBtn]}
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
    paddingHorizontal: 20,
    height: 43,
    backgroundColor: '#000',
    marginTop: 38,
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
});

export default NextButton;
