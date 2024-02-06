import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import NextButton from './NextButton';
import GenderButton from './GenderButton';
import Agreement from './Agreement';
import api from '../../api/api';

const Step4 = ({nextStep, handleChange, values}) => {
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');

  const isValid = birthday !== '' && gender !== '';

  const genderOptions = [
    {label: '여성', value: 'Female'},
    {label: '남성', value: 'Male'},
  ];

  useEffect(() => {
    console.log('Step4: ', values);
  }, []);

  const handleSignUp = async () => {
    try {
      const signUpResponse = await api.signUpRequest(values);
      console.log('Sign-up response:', signUpResponse);

      nextStep();
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  const handleBirthdayChange = text => {
    setBirthday(text);
    handleChange('birthday', text);
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>생년월일</Text>
        <TextInput
          style={styles.inputBox}
          value={birthday}
          onChangeText={handleBirthdayChange}
          placeholder="YYYYMMDD"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>성별</Text>
        <View style={styles.genderContainer}>
          {genderOptions.map(option => (
            <GenderButton
              key={option.value}
              label={option.label}
              isActive={gender === option.value}
              onPress={() => {
                setGender(option.value);
                handleChange('gender', option.value);
              }}
            />
          ))}
        </View>
      </View>

      <Agreement />

      <NextButton isLast={true} isValid={isValid} onClick={handleSignUp}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 16,
    paddingTop: 10,
    marginBottom: 0,
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
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
  },
});

export default Step4;
