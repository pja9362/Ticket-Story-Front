import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import api from '../../api/api';

const FindPassword = () => {
  const [id, setId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showGuideText, setShowGuideText] = useState(false);

  const isValid = id !== '';    

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleFindPW = async () => {
    try {
      if (!isValidEmail(id)) {
        setErrorMessage('이메일 형식의 아이디를 입력해주세요.');
        setShowGuideText(false);
        return;
      }
      const isIdDuplicated = await api.checkIdDuplicate(id);
      console.log('isIdDuplicated:', isIdDuplicated);

      if (isIdDuplicated === false) {
        setErrorMessage('입력한 아이디를 찾을 수 없어요.')
        setShowGuideText(false);
      } else {
        setErrorMessage('');
        setShowGuideText(true);
      }

    } catch (error) {
      console.error('id-check error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title='비밀번호 찾기'/>
      <View style={{paddingHorizontal: 18}}>
        <View style={{...styles.guideContainer, marginTop: 24}}>
          <Text style={styles.guideText}>
            가입한 이메일 아이디를 입력해주세요.
          </Text>
          <Text style={styles.guideText}>
            입력한 이메일로 비밀번호 재설정 링크를 보내드립니다.
          </Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.sectionText}>아이디</Text>
          <View style={styles.inputContainer}>
            <TextInput
              value={id}
              onChangeText={text => setId(text)}
              style={styles.inputBox}
              placeholder='example@naver.com'
            />
          </View>
          {
            !showGuideText && errorMessage !== '' ? 
            <Text style={{color: '#FF0000', textAlign: 'center', lineHeight: 40, fontSize: 12}}>{errorMessage}</Text> : <View height={40}></View>
          }

          {
            showGuideText? 
            <Text style={styles.guideText}>
              이메일로 비밀번호 재설정 링크를 보내드렸어요. {'\n'}
              링크를 통해서 비밀번호 재설정을 진행해주세요.
            </Text> : (
              <TouchableOpacity
                onPress={()=> handleFindPW()}
                disabled={!isValid}
                style={{ ...styles.findBtn, backgroundColor: isValid ? '#5D70F9' : '#BDBDBD' }}
              >
                <Text style={styles.btnText}>비밀번호 찾기</Text>
              </TouchableOpacity>
            )
          }

        </View>
        </View>
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
    color: '#000',
  },
  guideContainer: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#525252',
    borderRadius: 5,
  },
  guideText: {
    fontSize: 12,
    lineHeight: 20,
    color: '#525252',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: 20,
    paddingVertical: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    marginBottom: 22
  },
  inputBox: {
    fontSize: 16,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
    flex: 1,
  },
  findBtn: {
    margin: 30,
    marginTop: 0,
    paddingVertical: 10,
    width: 138,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    lineHeight: 20,
    fontSize: 16,
  },
});

export default FindPassword;
