import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import { checkPassword, resetPassword } from '../../actions/auth/auth';
import analytics from '@react-native-firebase/analytics';

const ChangePassword = () => {
    const navigation = useNavigation();

    const [exPassword, setExPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showExPassword, setShowExPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        analytics().logScreenView({
          screen_name: '비밀번호 변경',
          screen_class: 'password'
        })
    }, [])

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&#^+=])[A-Za-z\d@$!%*?&#^+=]{8,16}$/;

    const isValid = password !== '' && password === passwordCheck && passwordRegex.test(password);

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleNext = async () => {
        if (isValid) {
            const passwordChecked = await checkPassword(exPassword);
            
            if (passwordChecked) {
                const newPassword = await resetPassword(password, passwordChecked.accessToken);
                if (newPassword) {
                    console.log('비밀번호 변경 완료 페이지로 넘어가기');
                    navigation.navigate('ChangePWFinish');
                    
                    analytics().logScreenView({
                        screen_name: '비밀번호 변경 완료',
                        screen_class: 'password'
                    })
                } else {
                    console.log('실패');
                }
            } else {
                setErrorMessage('기존 비밀번호가 일치하지 않아요.');
            }
            navigation.navigate('ChangePWFinish');
        } else {
            if(password !== passwordCheck) {
                setErrorMessage('비밀번호가 일치하지 않아요.');
            } else if (!passwordRegex.test(password)) {
                setErrorMessage('8~16자의 영문 대/소문자, 숫자, 특수문자를 세 종류 이상 사용해 주세요.');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header title='비밀번호 변경'/>

            <View style={{paddingHorizontal: 18}}>

                <View style={styles.formContainer}>
                    <CustomText style={styles.sectionText} fontWeight="bold">기존 비밀번호</CustomText>
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
                            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <CustomText style={{...styles.sectionText, marginTop: 10}} fontWeight="bold">새 비밀번호</CustomText>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            style={styles.inputBox}
                            value={password}
                            secureTextEntry={!showPassword}
                            onChangeText={handlePasswordChange}
                        />
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    <CustomText style={styles.guideText}>
                        영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.
                    </CustomText>
                </View>

                <View style={{...styles.formContainer, marginBottom: 22}}>
                    <CustomText style={{...styles.sectionText, marginTop: 10}} fontWeight="bold">비밀번호 확인</CustomText>
                    <View style={styles.inputContainer}>
                        <CustomTextInput
                            style={styles.inputBox}
                            value={passwordCheck}
                            secureTextEntry={!showPasswordCheck}
                            onChangeText={(text) => setPasswordCheck(text)}
                        />
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={() => setShowPasswordCheck(!showPasswordCheck)}
                        >
                            <Icon name={showPasswordCheck ? 'eye-off' : 'eye'} size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
                {
                errorMessage !== '' ? 
                    <CustomText style={{color: '#FF0000', textAlign: 'center', lineHeight: 40, fontSize: 12}}>{errorMessage}</CustomText> : <View height={40}></View>
                }
                <TouchableOpacity
                    disabled={!password || !passwordCheck}
                    onPress={handleNext}
                    style={{...styles.changeBtn, backgroundColor: password && passwordCheck ? '#5D70F9' : '#BDBDBD'}}            
                >
                    <CustomText style={styles.btnText}>완료</CustomText>
                </TouchableOpacity>
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
    margin: 30,
    marginTop: 0,
    paddingVertical: 10,
    width: 78,
    borderRadius: 20,
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
    fontSize: 11,
    lineHeight: 20,
    color: '#B6B6B6',
  },
});

export default ChangePassword;
