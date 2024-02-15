import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import NextButton from './NextButton';
import api from '../../api/api';

const Step1 = ({nextStep, handleChange, values}) => {
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isIdCheck, setIsIdCheck] = useState(true);
  
  const isValid = id !== '';

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    console.log('Step1: ', values);
  }, []);

  const handleIdCheck = async () => {
    try {
      if (!isValidEmail(id)) {
        setErrorMessage('이메일 형식으로 입력해주세요.');
        return;
      }

      console.log('아이디 중복확인:', id);
      const isIdDuplicated = await api.checkIdDuplicate(id);
      console.log('isIdDuplicated:', isIdDuplicated);

      if (isIdDuplicated === false) {
        console.log('사용 가능한 아이디입니다.');
        setIsIdCheck(true);
        nextStep();
      } else {
        setErrorMessage('중복된 아이디예요');
        setIsIdCheck(false);
      }
    } catch (error) {
      console.error('id-check error:', error);
    }
  };

  const handleNext = () => {
    handleIdCheck();
    console.log('id:', id);
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>아이디</Text>
      <TextInput
        style={styles.inputBox}
        value={id}
        placeholder='example@naver.com'
        onChangeText={text => {
          setId(text);
          handleChange('id', text);
        }}
      />

      {/* 중복확인 버튼 */}
      <NextButton onClick={handleNext} isValid={isValid} message={errorMessage !== '' ? errorMessage : null}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    paddingVertical: 10,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  formContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  inputBox: {
    fontSize: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
  },
  checkBtn: {
    backgroundColor: '#e4f3fb',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 8,
  },
  checkBtnLabel: {
    color: '#666666',
    fontSize: 14,
  },
  alertText: {
    color: '#FF0000',
    fontSize: 12,
    lineHeight: 40,
    textAlign: 'center',
  },
});

export default Step1;
