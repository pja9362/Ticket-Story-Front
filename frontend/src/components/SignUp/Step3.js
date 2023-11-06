import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import formatPhoneNum from '../../utils/formatPhoneNum';
import NextButton from './NextButton';

const Step3 = ({nextStep, prevStep}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleChange = text => {
    const formattedPhoneNumber = formatPhoneNum(text);
    setPhoneNumber(formattedPhoneNumber);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionText}>전화번호</Text>
      <TextInput
        style={styles.inputBox}
        value={phoneNumber}
        onChangeText={handleChange}
        keyboardType="phone-pad"
        placeholder="010-1234-5678"
      />

      <NextButton onClick={nextStep} isValid={phoneNumber.length === 13} />
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
  },
  inputBox: {
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
  },
});

export default Step3;
