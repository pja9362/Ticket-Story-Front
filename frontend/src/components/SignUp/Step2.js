import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import NextButton from './NextButton';

const Step2 = ({nextStep, prevStep}) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const isValid = password !== '' && password === passwordCheck;

  useEffect(() => {
    console.log(password + 'vs' + passwordCheck);
    console.log(isValid);
  }, [isValid, password, passwordCheck]);

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>비밀번호</Text>
        <TextInput
          style={styles.inputBox}
          value={password}
          secureTextEntry={true}
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
    paddingVertical: 36,
  },
  sectionText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#3b3b3b',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputBox: {
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
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
