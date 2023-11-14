import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import formatPhoneNum from '../../utils/formatPhoneNum';
import NextButton from './NextButton';

const Step3 = ({ nextStep, prevStep }) => {
  const [name, setName] = useState('');
  const [firstPartIdentityNum, setFirstPartIdentityNum] = useState('');
  const [secondPartIdentityNum, setSecondPartIdentityNum] = useState('');
  const [telecom, setTelecom] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verifyCode, setVerifyCode] = useState('');

  const handleChange = (text) => {
    const formattedPhoneNumber = formatPhoneNum(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  const handleFirstPartChange = (text) => {
    setFirstPartIdentityNum(text.slice(0, 6));
  };

  const handleSecondPartChange = (text) => {
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
        onChangeText={(text) => setName(text)}
      />
      <View style={styles.identityNumContainer}>
        <TextInput
          style={[styles.inputBox, styles.firstPartInput]}
          value={firstPartIdentityNum}
          placeholder="주민번호 앞 6자리"
          placeholderTextColor="gray"
          onChangeText={handleFirstPartChange}
        />
        <TextInput
          style={[styles.inputBox, styles.secondPartInput]}
          value={secondPartIdentityNum}
          placeholder="뒷자리"
          placeholderTextColor="gray"
          onChangeText={handleSecondPartChange}
        />
      </View>
      <TextInput
        style={styles.inputBox}
        value={telecom}
        placeholder="통신사"
        placeholderTextColor="gray"
        onChangeText={(text) => setTelecom(text)}
      />
      <TextInput
        style={styles.inputBox}
        value={phoneNumber}
        onChangeText={handleChange}
        keyboardType="phone-pad"
        placeholder="전화번호"
        placeholderTextColor="gray"
      />
      <TextInput
        style={styles.inputBox}
        value={verifyCode}
        placeholder="인증번호"
        placeholderTextColor="gray"
        onChangeText={(text) => setVerifyCode(text)}
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
  },
  firstPartInput: {
    flex: 1,
    marginRight: 5,
  },
  secondPartInput: {
    flex: 1,
    marginLeft: 5,
  },
});

export default Step3;
