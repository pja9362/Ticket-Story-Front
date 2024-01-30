import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import formatPhoneNum from '../../utils/formatPhoneNum';
import NextButton from './NextButton';

const Step3 = ({nextStep, handleChange, values}) => {
  const [name, setName] = useState('');
  const [firstPartIdentityNum, setFirstPartIdentityNum] = useState('');
  const [secondPartIdentityNum, setSecondPartIdentityNum] = useState('');
  const [telecom, setTelecom] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  useEffect(() => {
    console.log('Step3: ', values);
  }, []);

  const handlePhoneNumChange = text => {
    const formattedPhoneNumber = formatPhoneNum(text);
    setPhoneNumber(formattedPhoneNumber);
    handleChange('phoneNum', formattedPhoneNumber);
  };

  const handleFirstPartChange = text => {
    setFirstPartIdentityNum(text.slice(0, 6));
  };

  const handleSecondPartChange = text => {
    setSecondPartIdentityNum(text.slice(0, 1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>본인인증</Text>
      <TextInput
        style={styles.inputBox}
        value={name}
        placeholder="이름"
        placeholderTextColor="gray"
        onChangeText={text => setName(text)}
      />
      <View style={styles.identityNumContainer}>
        <TextInput
          style={styles.inputBox}
          value={firstPartIdentityNum}
          placeholder="주민번호 앞 6자리"
          placeholderTextColor="gray"
          keyboardType="numeric"
          onChangeText={handleFirstPartChange}
        />
        <Text style={{alignSelf: 'center', fontSize: 24}}>-</Text>
        <View style={styles.secondIdentity}>
          <TextInput
            style={[styles.inputBox, styles.singleDigitInput]}
            value={secondPartIdentityNum}
            placeholder="●"
            placeholderTextColor="gray"
            keyboardType="numeric"
            onChangeText={handleSecondPartChange}
          />
          <Text style={styles.maskedText}>●●●●●●</Text>
        </View>
      </View>

      <TextInput
        style={styles.inputBox}
        value={telecom}
        placeholder="통신사"
        placeholderTextColor="gray"
        onChangeText={text => setTelecom(text)}
      />
      <TextInput
        style={styles.inputBox}
        value={phoneNumber}
        onChangeText={handlePhoneNumChange}
        keyboardType="numeric"
        placeholder="전화번호"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.inputBox}
        value={verifyCode}
        keyboardType="numeric"
        placeholder="인증번호"
        placeholderTextColor="gray"
        onChangeText={text => setVerifyCode(text)}
      />
      <NextButton onClick={nextStep} isValid={phoneNumber.length === 13} />
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
  inputBox: {
    fontSize: 16,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  identityNumContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
    height: 50,
    marginBottom: 20,
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
  },
  identityInputBox: {
    flex: 1,
  },
  secondIdentity: {
    flex: 1,
    flexDirection: 'row',
  },
  singleDigitInput: {
    width: 'auto',
  },
  maskedText: {
    fontSize: 16,
    lineHeight: 50,
  },
});

export default Step3;
