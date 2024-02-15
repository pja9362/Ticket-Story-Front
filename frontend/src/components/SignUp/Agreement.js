import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import noCheck from '../../images/no_check.png';
import check from '../../images/check.png';
const Agreement = ({updateAgreementStatus}) => {
  const [agreements, setAgreements] = useState({
    terms: false,
    personalInfo: false,
    thirdPartyInfo: false,
    newsAndBenefits: false,
  });

  const toggleAgreement = key => {
    setAgreements(prevAgreements => ({
      ...prevAgreements,
      [key]: !prevAgreements[key],
    }));
    
    updateAgreementStatus(key);
  };


  return (
    <View>
      <AgreementItem
        label="필수"
        guideText="티켓스토리 이용약관에 동의합니다."
        buttonText="이용약관"
        isChecked={agreements.terms}
        onPress={() => toggleAgreement('terms')}
      />

      <AgreementItem
        label="필수"
        guideText="필수 개인정보의 수집 및 사용에 동의합니다."
        buttonText="필수 개인정보의 수집 및 사용"
        isChecked={agreements.personalInfo}
        onPress={() => toggleAgreement('personalInfo')}
      />

      <AgreementItem
        label="필수"
        guideText="제3자에게 정보제공에 동의합니다."
        buttonText="제3자에게 정보제공"
        isChecked={agreements.thirdPartyInfo}
        onPress={() => toggleAgreement('thirdPartyInfo')}
      />

      <AgreementItem
        label="선택"
        guideText="티켓스토리의 소식 및 혜택 정보를 받겠습니다."
        isChecked={agreements.newsAndBenefits}
        onPress={() => toggleAgreement('newsAndBenefits')}
      />
    </View>
  );
};

const AgreementItem = ({label, guideText, buttonText, isChecked, onPress}) => (
  <View style={styles.itemContainer}>
    <View style={styles.labelBox}>
      <Text style={styles.label}>{label}</Text>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <Text style={styles.guideText}>{guideText}</Text>

      <TouchableOpacity onPress={onPress}>
        <View style={styles.checkboxContainer}>
          {isChecked ? (
            <Image source={check} style={styles.checkbox} />
          ) : (
            <Image source={noCheck} style={styles.checkbox} />
          )}
        </View>
      </TouchableOpacity>
    </View>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.btnText}>{buttonText}</Text>
    </TouchableOpacity>
  </View>
);
const styles = StyleSheet.create({
  labelBox: {
    backgroundColor: 'rgba(217, 217, 217, 1)',
    width: 30,
    height: 20,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 22,
  },
  label: {
    fontSize: 10,
    lineHeight: 20,
    color: '#000',
  },
  guideText: {
    paddingVertical: 10,
    fontSize: 10,
    color: '#000',
  },
  btnText: {
    fontSize: 10,
    color: '#000',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    marginTop: 5,
  },
  checkbox: {
    width: 28,
    height: 28,
  },
});

export default Agreement;
