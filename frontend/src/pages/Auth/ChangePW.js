import React, {useState} from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ChangePW = () => {
    const navigation = useNavigation();

    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordCheck, setShowPasswordCheck] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

    const isValid = password !== '' && password === passwordCheck && passwordRegex.test(password);

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleNext = () => {
        if (isValid) {
            navigation.navigate('MainStack');
        } else {
            if(password !== passwordCheck) {
                setErrorMessage('비밀번호가 일치하지 않아요.');
            } else if (!passwordRegex.test(password)) {
                setErrorMessage('영문, 숫자, 특수문자를 포함한 8~16자리로 입력해 주세요.');
            }
        }
    }

    return (
        <View style={styles.container}>
            <Header title='비밀번호 변경'/>

            <View style={{paddingHorizontal: 18}}>
                <View style={styles.formContainer}>
                    <Text style={styles.sectionText}>새 비밀번호</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
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
                </View>

                <View style={{...styles.formContainer, marginBottom: 22}}>
                    <Text style={styles.sectionText}>비밀번호 확인</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
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
                    <Text style={{color: '#FF0000', textAlign: 'center', lineHeight: 40, fontSize: 12}}>{errorMessage}</Text> : <View height={40}></View>
                }
                <TouchableOpacity
                    disabled={!password || !passwordCheck}
                    onPress={handleNext}
                    style={{...styles.changeBtn, backgroundColor: password && passwordCheck ? '#5D70F9' : '#BDBDBD'}}            
                >
                    <Text style={styles.btnText}>다음</Text>
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
    color: '#000',
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
});

export default ChangePW;
