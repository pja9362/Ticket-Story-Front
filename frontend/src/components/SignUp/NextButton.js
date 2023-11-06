import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const NextButton = ({onClick, isValid, isLast}) => {
  const handleNextClick = () => {
    if (!isValid) {
      console.log('disabled');
    } else {
      // 다음 단계로 이동
      onClick();
    }
  };

  return (
    <TouchableOpacity
      style={[styles.nextBtn, !isValid && styles.disabledBtn]}
      onPress={handleNextClick}
      disabled={!isValid}>
      <Text style={styles.text}>{isLast ? '완료' : '다음'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtn: {
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'skyblue',
    marginVertical: 36,
    borderRadius: 8,
  },
  disabledBtn: {
    backgroundColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NextButton;
