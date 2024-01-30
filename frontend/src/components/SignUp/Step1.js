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
  const [isIdCheck, setIsIdCheck] = useState(true);
  const isValid = id !== '';

  useEffect(() => {
    console.log('Step1: ', values);
  }, []);

  // const handleIdCheck = async () => {
  //   try {
  //     const isIdDuplicated = await api.checkIdDuplicate(id);
  
  //     if (isIdDuplicated === false) {
  //       console.log('사용 가능한 아이디입니다.');
  //       setIsIdCheck(true);
  //       nextStep();
  //     } else {
  //       console.log('중복된 아이디입니다.');
  //       setIsIdCheck(false);
  //     }
  //   } catch (error) {
  //     console.error('id-check error:', error);
  //   }
  // };

  const handleNext = () => {
    nextStep();
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>아이디</Text>
      <TextInput
        style={styles.inputBox}
        value={id}
        onChangeText={text => {
          setId(text);
          handleChange('id', text);
        }}
      />
      {/* {!isIdCheck && <Text style={styles.alertText}>중복된 아이디예요.</Text>} */}
      {/* 중복확인 버튼 */}
      <NextButton onClick={handleNext} isValid={isValid} />
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
    backgroundColor: '#D9D9D9',
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
    color: '#000',
    fontSize: 12,
    lineHeight: 40,
  },
});

export default Step1;
