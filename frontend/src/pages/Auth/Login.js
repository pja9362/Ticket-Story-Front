import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import { signInRequest } from '../../actions/auth/auth';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValid = id !== '' && password !== '';

  const handleLogin = () => {
    dispatch(signInRequest(id, password, ([result, response]) => {
      console.log('login result:', result);
      console.log('login response:', response);
      if(result) {
        navigation.navigate('MainStack');
      } else {
        console.log('login error:', response);
      }
    }))
  }

  useEffect(() => {
    console.log('isValid:', isValid);
    console.log('disabled:', !isValid);
  }, [isValid]);

  const handleFindPW = () => {
    navigation.navigate('FindPassword');
  }

  return (
    <View style={styles.container}>
      <Header title='로그인'/>

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>아이디</Text>
        <View style={styles.inputContainer}>
          <TextInput
            value={id}
            onChangeText={text => setId(text)}
            style={styles.inputBox}
          />
        </View>

        <Text style={styles.sectionText}>비밀번호</Text>
        <View style={{...styles.inputContainer, marginBottom: 15}}>
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
            style={styles.inputBox}
          />
          <TouchableOpacity
            style={styles.iconContainer}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={20} color="black" />
          </TouchableOpacity>
        </View>
        

        <View style={styles.findBtnContainer}>
          <TouchableOpacity onPress={handleFindPW} style={styles.findBtn}>
            <Text style={{fontSize: 13, color: '#525252'}}>비밀번호가 기억나지 않아요</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleLogin}
          disabled={!isValid}
          style={{
            ...styles.loginBtn,
            backgroundColor: isValid ? '#5D70F9' : '#B6B6B6', 
            pointerEvents: isValid ? 'auto' : 'none',
          }}
        >
          <Text style={styles.btnText}>로그인</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 12,
    color: '#000',
  },
  formContainer: {
    marginBottom: 20,
    margin: 16,
    paddingVertical: 10,
  },
  inputBox: {
    fontSize: 16,
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
    flex: 1,
  },
  findBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  findBtn: {
    borderBottomWidth: 1,
    borderBottomColor: '#525252',
  },
  loginBtn: {
    margin: 30,
    paddingVertical: 9,
    width: 90,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEEEE',
    borderRadius: 5,
    marginBottom: 22,
  },
  iconContainer: {
    padding: 15,
    backgroundColor: '#EEEEEE',
    height: 50,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
});

export default Login;
