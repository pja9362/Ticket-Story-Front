import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CustomText, CustomTextInput } from '../../components/CustomText';

const ChangePassword = () => {
    const navigation = useNavigation();

    const [exPassword, setExPassword] = useState('');
    const [showExPassword, setShowExPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    const isValid = exPassword !== '' && passwordRegex.test(exPassword);


    const handleNext = () => {
        if (isValid) {
            alert('아직 개발안함');
            // navigation.navigate('Init');
        } else {
            if(!passwordRegex.test(exPassword)) {
                setErrorMessage('영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header title='회원 탈퇴'/>

            <View style={{paddingHorizontal: 18}}>

                <View style={styles.formContainer}>
                    <CustomText style={styles.sectionText} fontWeight="bold">계정 비밀번호</CustomText>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            style={styles.inputBox}
                            value={exPassword}
                            secureTextEntry={!showExPassword}
                            onChangeText={(text) => setExPassword(text)}
                        />
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setShowExPassword(!showExPassword)}
                        >
                            <Icon name={showExPassword ? 'eye-off' : 'eye'} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <CustomText style={styles.guideText}>
                        탈퇴 시 개인정보, 저장한 티켓, 리뷰 등의 데이터가 삭제되며 복구할 수 없습니다. 자세한 내용은 개인정보처리방침을 확인해 주세요.
                    </CustomText>
                </View>

                <View style={{marginTop: 120}}>
                {
                errorMessage !== '' ? 
                    <CustomText style={{color: '#FF0000', textAlign: 'center', lineHeight: 40, fontSize: 12}}>{errorMessage}</CustomText> : <View height={40}></View>
                }
                <TouchableOpacity
                    disabled={!exPassword}
                    onPress={handleNext}
                    style={{...styles.changeBtn, backgroundColor: exPassword ? '#5D70F9' : '#BDBDBD'}}            
                >
                    <CustomText style={styles.btnText}>회원 탈퇴</CustomText>
                </TouchableOpacity>
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
    color: '#525252',
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
  },
  inputBox: {
    fontSize: 16,
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
    flex: 1,
  },
  changeBtn: {
    margin: 5,
    // marginTop: 150,
    paddingVertical: 10,
    width: 312,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor:'#5D70F9' 
  },
  btnText: {
    color: '#fff',
    lineHeight: 20,
    fontSize: 16,
  },
  iconContainer: {
    padding: 15,
    backgroundColor: '#EEEEEE',
    height: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  guideText: {
    marginTop: 10,
    fontSize: 12,
    lineHeight: 18,
    color: '#B6B6B6',
  },
});

export default ChangePassword;
