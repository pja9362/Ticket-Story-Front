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
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const result = await api.signInRequest(id, password);
      console.log('login result:', result);
      if (result.accessToken) {
        navigation.navigate('MainStack');
      }
      
    } catch (error) {
      console.error('login error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>아이디</Text>
        <TextInput
          value={id}
          onChangeText={text => setId(text)}
          style={styles.inputBox}
        />

        <Text style={styles.sectionText}>비밀번호</Text>
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true}
          style={styles.inputBox}
        />

        <View style={styles.findBtnContainer}>
          <TouchableOpacity style={styles.findBtn}>
            <Text>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.findBtn}>
            <Text>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.loginBtn}>
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
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    height: 50,
    paddingHorizontal: 12,
    marginBottom: 25,
  },
  findBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },

  loginBtn: {
    backgroundColor: '#000',
    margin: 30,
    paddingVertical: 8,
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
});

export default Login;
