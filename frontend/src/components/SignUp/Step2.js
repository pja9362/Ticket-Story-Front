import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import NextButton from './NextButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {CustomText, CustomTextInput} from '../CustomText';
import analytics from '@react-native-firebase/analytics';

const Step2 = ({ nextStep, handleChange, values }) => {
  // const [password, setPassword] = useState('');
  // const [passwordCheck, setPasswordCheck] = useState('');
  const [password, setPassword] = useState(values.password || '');
  const [passwordCheck, setPasswordCheck] = useState(values.password || '');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [showPasswordGuide, setShowPasswordGuide] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,16}$/;

  const isValid = password !== '' && password === passwordCheck && passwordRegex.test(password);

  const handlePasswordChange = (text) => {
    setPassword(text);
    handleChange('password', text);

    if (!passwordRegex.test(text)) {
      setShowPasswordGuide(true);
    } else {
      setShowPasswordGuide(false);
    }
  };

  useEffect(() => {
    console.log('Step2: ', values);
    analytics().logEvent('sign_up_try_general', {step: '2'});
  }, []);

  const handleNext = () => {
    if (isValid) {
      nextStep();
    } else {
      console.log(showPasswordGuide);
      if(password !== passwordCheck) {
        setErrorMessage('비밀번호가 일치하지 않아요.');
      } else if (!passwordRegex.test(password)) {
        setErrorMessage('영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.');
      }

      // if(showPasswordGuide) {
      //   console.log(1);
      //   // setErrorMessage('비밀번호가 일치하지 않아요.');
      //   setErrorMessage('영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.');
      // } else if (password !== passwordCheck) {
      //   // setErrorMessage('영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.');
      //   console.log(2);
      //   setErrorMessage('비밀번호가 일치하지 않아요.');
      // }

    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <CustomText style={styles.sectionText} fontWeight="bold">비밀번호</CustomText>
        <View style={styles.inputContainer}>
          <CustomTextInput
            style={styles.inputBox}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
            autoCapitalize='none'
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        {/* {showPasswordGuide ? ( */}
          <CustomText style={styles.guideText}>
            영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.
          </CustomText>
        {/* ) : null} */}
      </View>

      <View style={{...styles.formContainer, marginBottom: 0}}>
        <CustomText style={{...styles.sectionText, marginTop: 10}} fontWeight="bold">비밀번호 확인</CustomText>
        <View style={styles.inputContainer}>
          <CustomTextInput
            style={styles.inputBox}
            value={passwordCheck}
            secureTextEntry={!showPasswordCheck}
            onChangeText={(text) => setPasswordCheck(text)}
            autoCapitalize='none'
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPasswordCheck(!showPasswordCheck)}
          >
            <Icon name={showPasswordCheck ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      <NextButton onClick={handleNext} message={errorMessage}/>
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
    marginBottom: 12,
    color: '#000',
  },
  guideText: {
    marginTop: 10,
    fontSize: 11,
    lineHeight: 20,
    color: '#B6B6B6',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
  },
  inputBox: {
    flex: 1,
    fontSize: 16,
    height: 50,
    paddingHorizontal: 12,
    color: '#525252',
  },
  iconContainer: {
    padding: 15,
    backgroundColor: '#EEEEEE',
    height: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Step2;
