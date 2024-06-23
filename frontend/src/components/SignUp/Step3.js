import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import NextButton from './NextButton';
import GenderButton from './GenderButton';
import Agreement from './Agreement';
import { signUpRequest } from '../../actions/auth/auth';
import {CustomText, CustomTextInput} from '../CustomText';

const Step3 = ({nextStep, handleChange, values}) => {
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  const birthday = `${year}.${month}.${day}`;

  const [gender, setGender] = useState('');
  const [requiredAgreements, setRequiredAgreements] = useState({
    terms: false,
    personalInfo: false,
    thirdPartyInfo: false,
  });

  const handleMonthBlur = () => {
    // 두 자릿수로 변환
    const formattedMonth = month.length === 1 ? `0${month}` : month;
    setMonth(formattedMonth);
  };

  const handleDayBlur = () => {
    // 두 자릿수로 변환
    const formattedDay = day.length === 1 ? `0${day}` : day;
    setDay(formattedDay);
  };

  useEffect(() => {
    handleChange('birthday', birthday);
  }, [year, month, day]);

  const isValid =
    year !== '' &&
    month !== '' &&
    day !== '' &&
    gender !== '' &&
    requiredAgreements.terms &&
    requiredAgreements.personalInfo &&
    requiredAgreements.thirdPartyInfo;

  const genderOptions = [
    {label: '남성', value: 'MALE'},
    {label: '여성', value: 'FEMALE'},
  ];

  const updateAgreementStatus = (key, isAllAgreed) => {
    if(key === 'all' && !isAllAgreed) {
      setRequiredAgreements({
        terms: true,
        personalInfo: true,
        thirdPartyInfo: true,
      })
    } else if(key === 'all' && isAllAgreed) {
      setRequiredAgreements({
        terms: false,
        personalInfo: false,
        thirdPartyInfo: false,
      })
    }
    else {
      setRequiredAgreements(prevAgreements => ({
        ...prevAgreements,
        [key]: !prevAgreements[key],
      }));
    }
  };

  const handleSignUp = async () => {
    try {
      const signUpResponse = await signUpRequest(values);
      console.log('Sign-up response:', signUpResponse);

      nextStep();
    } catch (error) {
      console.error('Sign-up error:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

    <View style={styles.formContainer}>
        <CustomText style={styles.sectionText} fontWeight="bold">성별</CustomText>
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

      <View style={styles.formContainer}>
        <CustomText style={styles.sectionText} fontWeight="bold">생년월일</CustomText>
        <View style={styles.dateContainer}>
          <View style={styles.dateItem}>
            <CustomTextInput
              style={{...styles.inputBox, width: 80}}
              value={year}
              onChangeText={text => setYear(text)}
              keyboardType='numeric'
              placeholder="YYYY"
              placeholderTextColor="#ccc"
            />
            <CustomText>년</CustomText>
          </View>
          <View style={styles.dateItem}>
            <CustomTextInput
              style={{...styles.inputBox, width: 60}}
              value={month}
              onChangeText={text => setMonth(text)}
              onBlur={handleMonthBlur}
              keyboardType='numeric'
              placeholder="MM"
              placeholderTextColor="#ccc"
            />
            <CustomText>월</CustomText>
          </View>
          <View style={styles.dateItem}>
            <CustomTextInput
              style={{...styles.inputBox, width: 60}}
              value={day}
              onChangeText={text => setDay(text)}
              onBlur={handleDayBlur}
              keyboardType='numeric'
              placeholder="DD"
              placeholderTextColor="#ccc"
            />
            <CustomText>일</CustomText>
          </View>
        </View>
      </View>

      <CustomText style={[styles.sectionText, { marginBottom: 0 }]} fontWeight="bold">약관 동의</CustomText>
      <Agreement updateAgreementStatus={updateAgreementStatus} />

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
    marginBottom: 12,
    color: '#000',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputBox: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  dateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default Step3;
