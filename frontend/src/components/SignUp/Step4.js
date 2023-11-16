import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import NextButton from './NextButton';
import GenderButton from './GenderButton';
import Agreement from './Agreement';

const Step4 = ({nextStep, prevStep}) => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('');

  const isValid = nickname !== '' && gender !== '';

  const genderOptions = ['남성', '여성'];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>닉네임</Text>
        <TextInput
          style={styles.inputBox}
          value={nickname}
          onChangeText={text => setNickname(text)}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>성별</Text>
        <View style={styles.genderContainer}>
          {genderOptions.map(option => (
            <GenderButton
              key={option}
              label={option}
              isActive={gender === option}
              onPress={() => setGender(option)}
            />
          ))}
        </View>
      </View>

      <Agreement />

      <NextButton
        isLast={true}
        isValid={isValid}
        onClick={nextStep}
      />
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
