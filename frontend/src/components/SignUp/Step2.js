import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import NextButton from './NextButton';

const Step2 = ({nextStep, prevStep}) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const isValid = password !== '' && password === passwordCheck;

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>비밀번호</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          secureTextEntry={true}
          placeholder='8자리 이상'
          placeholderTextColor='gray'
          onChangeText={text => setPassword(text)}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>비밀번호 확인</Text>
        <TextInput
          style={styles.inputBox}
          value={passwordCheck}
          secureTextEntry={true}
          onChangeText={text => setPasswordCheck(text)}
        />
      </View>

      <NextButton onClick={nextStep} isValid={isValid} />
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
    marginBottom: 20,
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
});

export default Step2;
