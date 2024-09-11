import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Modal, StyleSheet} from 'react-native';
import {CustomText} from '../CustomText';
import {WebView} from 'react-native-webview';
import noCheck from '../../images/no_check.png';
import check from '../../images/check.png';
import backButton from '../../images/back_button.png';

const AgreementItem = ({label, guideText, buttonText, isChecked, onPress, onLabelPress}) => (
  <View style={styles.itemContainer}>
    <View style={styles.labelBox}>
      <CustomText style={styles.label}>{label}</CustomText>
    </View>
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <CustomText style={styles.guideText}>{guideText}</CustomText>

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
    <TouchableOpacity onPress={onLabelPress}>
      <CustomText style={styles.btnText}>{buttonText}</CustomText>
    </TouchableOpacity>
  </View>
);

const Agreement = ({updateAgreementStatus}) => {
  const [agreements, setAgreements] = useState({
    terms: false,
    personalInfo: false,
    thirdPartyInfo: false,
    newsAndBenefits: false,
  });

  const [webViewVisible, setWebViewVisible] = useState(false);
  const [webViewUrl, setWebViewUrl] = useState('');

  const toggleAgreement = key => {
    const allAgreed = Object.values(agreements).every(value => value);

    setAgreements(prevAgreements => ({
      ...prevAgreements,
      [key]: !prevAgreements[key],
    }));
    
    updateAgreementStatus(key, allAgreed);
  };

  const handlePressAllBtn = () => {
    const allAgreed = Object.values(agreements).every(value => value);

    if (allAgreed) {
      setAgreements({
        terms: false,
        personalInfo: false,
        thirdPartyInfo: false,
        newsAndBenefits: false,
      });
      updateAgreementStatus('all', true);
    } else {
      setAgreements({
        terms: true,
        personalInfo: true,
        thirdPartyInfo: true,
        newsAndBenefits: true,
      });
      updateAgreementStatus('all', false);
    }
  };

  const handleLabelPress = (idx) => {
    let url = '';
    switch (idx) {
      case 1:
        url = 'https://sugar-dresser-cb0.notion.site/16ea3dbb19534ea3a14a567254f63168?pvs=4';
        break;
      case 2:
        url = 'https://app.catchsecu.com/document/C/9a77778561d8ddc';
        break;
      case 3:
        url = 'https://app.catchsecu.com/document/C/20c406134e3164f';
        break;
      default:
        break;
    }
    if (url) {
      setWebViewUrl(url);
      setWebViewVisible(true);
    }
  }

  return (
    <>
      <View style={{marginLeft: 8}}>
        <View style={styles.allAgreement}>
          <CustomText style={{color: '#525252', fontSize: 12}} fontWeight="bold">전체 동의하기</CustomText>
          <TouchableOpacity onPress={() => handlePressAllBtn()}>
            <View>
              {Object.keys(agreements).every(key => agreements[key]) ? (
                <Image source={check} style={styles.checkbox} />
              ) : (
                <Image source={noCheck} style={styles.checkbox} />
              )}
            </View>
          </TouchableOpacity>
        </View>
        <CustomText style={[styles.guideText, { paddingTop: 0, paddingBottom: 15}]}>선택적 약관에 대한 동의를 포함합니다. 전체 동의하기 선택 후 선택적 약관에 대한 동의를 변경하실 수 있습니다.</CustomText>
      </View>

      <View style={styles.agreementLists}>
        <AgreementItem
          label="필수"
          guideText="티켓스토리 이용약관에 동의합니다."
          buttonText="이용약관"
          isChecked={agreements.terms}
          onPress={() => toggleAgreement('terms')}
          onLabelPress={() => handleLabelPress(1)}
        />

        <AgreementItem
          label="필수"
          guideText="필수 개인정보의 수집 및 사용에 동의합니다."
          buttonText="필수 개인정보의 수집 및 사용"
          isChecked={agreements.personalInfo}
          onPress={() => toggleAgreement('personalInfo')}
          onLabelPress={() => handleLabelPress(2)}
        />

        <AgreementItem
          label="필수"
          guideText="제3자에게 정보제공에 동의합니다."
          buttonText="제3자에게 정보제공"
          isChecked={agreements.thirdPartyInfo}
          onPress={() => toggleAgreement('thirdPartyInfo')}
          onLabelPress={() => handleLabelPress(3)}
        />

        <AgreementItem
          label="선택"
          guideText="티켓스토리의 소식 및 혜택 정보를 받겠습니다."
          isChecked={agreements.newsAndBenefits}
          onPress={() => toggleAgreement('newsAndBenefits')}
        />
      </View>

      {/* WebView Modal */}
      <Modal visible={webViewVisible} onRequestClose={() => setWebViewVisible(false)}>
        <TouchableOpacity style={{paddingTop: 16, paddingBottom: 10}} onPress={() => setWebViewVisible(false)}>
          <Image source={backButton} style={{width: 28, height: 28, marginHorizontal: 20}}/>
        </TouchableOpacity>
        <WebView source={{ uri: webViewUrl }} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  allAgreement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 15,
  },
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
    color: '#525252',
  },
  btnText: {
    fontSize: 10,
    color: '#525252',
    textDecorationLine: 'underline',
  },
  checkboxContainer: {
    marginTop: 3,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  agreementLists: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: 5,
    paddingHorizontal: 18,
  },
});

export default Agreement;
