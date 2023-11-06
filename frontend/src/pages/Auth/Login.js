import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';

const Login = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.title}>
        <Text style={styles.titleText}>Ticket-Story</Text>
      </View>

      <View style={styles.formContainer}>
        <TextInput style={styles.inputBox} placeholder="아이디" />
        <TextInput
          secureTextEntry={true}
          style={styles.inputBox}
          placeholder="비밀번호"
        />

        <View style={styles.findBtnContainer}>
          <TouchableOpacity style={styles.findBtn}>
            <Text>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.findBtn}>
            <Text>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.signupBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signupText}>계정이 없으신가요? 회원가입</Text>
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
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 2,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {
    flex: 5,
    gap: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  inputBox: {
    backgroundColor: '#eff8fc',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },
  findBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 15,
    gap: 10,
  },
  signupBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  signupText: {
    fontSize: 14,
    color: 'gray',
    lineHeight: 20,
    textDecorationLine: 'underline',
  },
});

export default Login;
