import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import NextButton from './NextButton';
import Icon from 'react-native-vector-icons/Ionicons';

const Step2 = ({ nextStep, handleChange, values }) => {
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const [showPasswordGuide, setShowPasswordGuide] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

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
  }, []);

  const handleNext = () => {
    if (isValid) {
      nextStep();
    } else {
      if(password !== passwordCheck) {
        setErrorMessage('비밀번호가 일치하지 않아요.');
      } else if (!passwordRegex.test(password)) {
        setErrorMessage('영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>비밀번호</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            value={password}
            secureTextEntry={!showPassword}
            onChangeText={handlePasswordChange}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        {showPasswordGuide ? (
          <Text style={styles.guideText}>
            영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.
          </Text>
        ) : null}
      </View>

      <View style={{...styles.formContainer, marginBottom: 0}}>
        <Text style={styles.sectionText}>비밀번호 확인</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            value={passwordCheck}
            secureTextEntry={!showPasswordCheck}
            onChangeText={(text) => setPasswordCheck(text)}
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
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#000',
  },
  guideText: {
    marginTop: 5,
    fontSize: 10,
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
