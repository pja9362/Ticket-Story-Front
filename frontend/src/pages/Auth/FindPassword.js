import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from 'react-native';
import Header from '../../components/Header';
import { checkIdDuplicate, sendEmail, verfiyPasswordResetCode, sendPasswordResetEmail } from '../../actions/auth/auth';
import { formatTime } from '../../utils/countdownUtils';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import { useNavigation } from '@react-navigation/native';
import BackgroundTimer from 'react-native-background-timer'; // 백그라운드에서 타이머를 설정
import analytics from '@react-native-firebase/analytics';

const FindPassword = () => {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [firstBtnText, setFirstBtnText] = useState('인증번호 받기');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [validationNumber, setValidationNumber] = useState(''); 
  const [isNumberValid, setIsNumberValid] = useState(null);
  const [secondBtnClicked, setSecondBtnClicked] = useState(false);

  const [countdown, setCountdown] = useState(300);

  useEffect(() => {
    analytics().logEvent('pw_reset_try', {step: '1'});
    analytics().logScreenView({
      screen_name: '비밀번호 재설정',
      screen_class: 'password'
    })
  }, []);

  useEffect(() => {
    let timer;

    if (isEmailSent && countdown > 0) {
      // BackgroundTimer를 사용하여 타이머 설정
      timer = BackgroundTimer.setInterval(() => {
        setCountdown(prevCountdown => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            BackgroundTimer.clearInterval(timer);
            console.log('인증번호가 만료되었습니다. 다시 인증번호를 받아주세요.');
            setModalVisible(true);
            setIsEmailSent(false);
            return 0;
          }
        });
      }, 1000);
    }

    return () => {
      // BackgroundTimer에서 타이머 제거
      BackgroundTimer.clearInterval(timer);
    };
  }, [isEmailSent, countdown]);
  
  const formattedTime = () => formatTime(countdown);

  // useEffect(() => {
  //   let timer;
  
  //   if (isEmailSent && countdown > 0) {
  //     timer = startCountdown(countdown, newSeconds => setCountdown(newSeconds));
  //   } else if (countdown === 0) {
  //     console.log('인증번호가 만료되었습니다. 다시 인증번호를 받아주세요.');
  //     setModalVisible(true);
  //     setIsEmailSent(false);
  //   }
  
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [isEmailSent, countdown]);

  // const formattedTime = () => {
  //   return formatTime(countdown);
  // };


  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFindPW = async () => {
    try {
      if (!isValidEmail(id)) {
        setErrorMessage('이메일 형식의 아이디를 입력해주세요.');
        return;
      }
      const isIdDuplicated = await checkIdDuplicate(id);
      console.log('isIdDuplicated:', isIdDuplicated);

      if (isIdDuplicated === false) {
        setErrorMessage('입력한 아이디를 찾을 수 없어요.')
      } else {
        setErrorMessage('');
        console.log(111);

        const sendEmailStatus = await sendEmail(id);
        console.log('sendEmailStatus', sendEmailStatus);
          if (sendEmailStatus === true) {

          setErrorMessage('');
          setFirstBtnText('인증번호 발송됨');
          setIsEmailSent(true);
          analytics().logEvent('pw_reset_try', {step: '2'});

          } else {
            console.log('뭔가 잘못됨');
          }

      }

    } catch (error) {
      console.error('id-check error:', error);
    }
  };

  const handleValidateNumber = async () => {
    setSecondBtnClicked(true);
    console.log('인증번호 확인');

    try {
    const passwordReset = await verfiyPasswordResetCode(id, validationNumber);
    console.log('뭐야....',passwordReset);
    
    if (passwordReset) {
      // navigation.navigate('ChangePW');
      setIsNumberValid(true);
      navigation.replace('ChangePW');
    } else {
      setIsNumberValid(false);
      alert('에러');
    }
    } catch {
      setIsNumberValid(false);
    }
  }

  const handleTimeOver = () => {
    setModalVisible(false);
    setId('');
    setCountdown(300);
  }

  return (
    <View style={styles.container}>
      <Header title='비밀번호 재설정'/>
      <View style={{paddingHorizontal: 18}}>

        <View style={styles.formContainer}>
          <CustomText style={styles.sectionText} fontWeight="bold">아이디</CustomText>
          <View style={styles.inputContainer}>
            <CustomTextInput
              value={id}
              onChangeText={text => setId(text)}
              style={styles.inputBox}
              placeholder='example@naver.com'
              placeholderTextColor="#B6B6B6"
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          {
            errorMessage !== '' ? 
            <CustomText style={{color: '#FF0000', textAlign: 'center', lineHeight: 36, fontSize: 12}}>{errorMessage}</CustomText> : <View height={20}></View>
          }

          <TouchableOpacity
              onPress={()=> handleFindPW()}
              disabled={id === '' || isEmailSent}
              style={{ ...styles.findBtn, backgroundColor: id !== '' && !isEmailSent ? '#5D70F9' : '#BDBDBD' }}
          >
            <CustomText style={styles.btnText}>{firstBtnText}</CustomText>
          </TouchableOpacity>

          {
            isEmailSent ? 
            <View style={styles.formContainer}>
              <CustomText style={styles.sectionText} fontWeight="bold">인증번호</CustomText>
              <View style={styles.inputContainer}>
                <CustomTextInput
                  value={validationNumber}
                  onChangeText={text => setValidationNumber(text)}
                  style={styles.inputBox}
                  placeholder='인증번호를 입력해주세요'
                  placeholderTextColor="#B6B6B6"
                />
                <CustomText style={{ marginLeft: 10, color: '#FE5757' }}>{formattedTime()}</CustomText>
              </View>
              {
                secondBtnClicked && isNumberValid === false ? 
                <CustomText style={{color: '#FF0000', textAlign: 'center', lineHeight: 36, fontSize: 12}}>인증번호가 일치하지 않아요</CustomText> : 
                <CustomText style={{color: '#B6B6B6', fontSize: 10, textAlign: 'center', lineHeight: 36}}>
                  메일이 오지 않는다면 스팸 메일함이나 프로모션 메일함을 확인해주세요.
                </CustomText>
              }

              <TouchableOpacity
                onPress={handleValidateNumber}
                disabled={ validationNumber === '' }
                style={{ ...styles.findBtn, backgroundColor: validationNumber !== '' ? '#5D70F9' : '#BDBDBD' }}
              >
                <CustomText style={styles.btnText}>인증번호 확인</CustomText>
              </TouchableOpacity>
            </View> : null
          }
        </View>
        </View>

        {modalVisible && (
          <Modal  
          transparent={true}
          visible={true}
          onRequestClose={()=>setModalVisible(false)}
          >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', height: 125, width: 240, padding: 18, borderRadius: 10 }}>
                  {/* <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', top: 5}} fontWeight="bold">입력 시간이 만료되었어요. {'\n'} 처음부터 다시 진행해 주세요.</CustomText> */}
                  <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center'}} fontWeight="bold"> 입력 시간이 만료되었어요. </CustomText>
                  <CustomText style={{color: '#B6B6B6', fontSize: 14, textAlign: 'center'}} fontWeight="bold"> 처음부터 다시 진행해 주세요. </CustomText>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 10 }}>
                    <TouchableOpacity onPress={handleTimeOver} style={{ backgroundColor: '#5D70f9', width: 100, height: 40, padding: 10, borderRadius: 10, marginTop: 0}}>
                      <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 16}} fontWeight="bold">확인</CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
          </Modal>
        )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingBottom: 38,
    paddingHorizontal: 20,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#525252',
  },
  formContainer: {
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    justifyContent: 'space-between',
    paddingRight: 50,
  },
  inputBox: {
    fontSize: 16,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
    width: '100%',
    color: '#525252',
  },
  findBtn: {
    margin: 30,
    marginTop: 0,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%'
  },
  btnText: {
    color: '#fff',
    lineHeight: 20,
    fontSize: 16,
  },
});

export default FindPassword;
