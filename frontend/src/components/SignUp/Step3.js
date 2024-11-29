import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import NextButton from './NextButton';
import GenderButton from './GenderButton';
import Agreement from './Agreement';
import { signUpRequest } from '../../actions/auth/auth';
import {CustomText, CustomTextInput} from '../CustomText';
import analytics from '@react-native-firebase/analytics';

const Step3 = ({nextStep, handleChange, values}) => {
  const [year, setYear] = useState(values.birthday?.split('.')[0] || '');
  const [month, setMonth] = useState(values.birthday?.split('.')[1] || '');
  const [day, setDay] = useState(values.birthday?.split('.')[2] || '');


  const birthday = `${year}.${month}.${day}`;

  // const [gender, setGender] = useState('');
  const [gender, setGender] = useState(values.gender || '');
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
    analytics().logEvent('sign_up_try_general', {step: '3'});
  }, []);

  useEffect(() => {
    handleChange('birthday', birthday);
  }, [year, month, day]);

  const isValid =
    // year !== '' &&
    // month !== '' &&
    // day !== '' &&
    // gender !== '' &&
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
      alert(`입력한 값이 올바른지
다시 한번 확인해주세요`);
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
              style={{...styles.inputBox, width: 70}}
              value={year}
              // onChangeText={text => setYear(text)}
              onChangeText={text => {
                // 숫자 4자리로 제한
                const filteredText = text.replace(/[^0-9]/g, ''); // 숫자만 남기기
                if (filteredText.length <= 4) {
                  setYear(filteredText);
                }
              }}
              keyboardType='numeric'
              placeholder="YYYY"
              placeholderTextColor="#ccc"
            />
            <CustomText style={{color:'#525252'}}>년</CustomText>
          </View>
          <View style={styles.dateItem}>
            <CustomTextInput
              style={{...styles.inputBox, width: 54}}
              value={month}
              // onChangeText={text => setMonth(text)}
              onChangeText={text => {
                // 숫자 2자리로 제한
                const filteredText = text.replace(/[^0-9]/g, ''); // 숫자만 남기기
                if (filteredText.length <= 2) {
                  setMonth(filteredText);
                }
              }}
              onBlur={handleMonthBlur}
              keyboardType='numeric'
              placeholder="MM"
              placeholderTextColor="#ccc"
            />
            <CustomText style={{color:'#525252'}}>월</CustomText>
          </View>
          <View style={styles.dateItem}>
            <CustomTextInput
              style={{...styles.inputBox, width: 50}}
              value={day}
              // onChangeText={text => setDay(text)}
              onChangeText={text => {
                // 숫자 2자리로 제한
                const filteredText = text.replace(/[^0-9]/g, ''); // 숫자만 남기기
                if (filteredText.length <= 2) {
                  setDay(filteredText);
                }
              }}
              onBlur={handleDayBlur}
              keyboardType='numeric'
              placeholder="DD"
              placeholderTextColor="#ccc"
            />
            <CustomText style={{color:'#525252'}}>일</CustomText>
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
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 12,
    textAlign: 'center',
    height: 35,
    color: '#525252',
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
