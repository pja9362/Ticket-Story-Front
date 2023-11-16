import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';

const Login = () => {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.formContainer}>
        <Text style={styles.sectionText}>아이디</Text>
        <TextInput style={styles.inputBox} />

        <Text style={styles.sectionText}>비밀번호</Text>
        <TextInput secureTextEntry={true} style={styles.inputBox} />

        <View style={styles.findBtnContainer}>
          <TouchableOpacity style={styles.findBtn}>
            <Text>아이디 찾기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.findBtn}>
            <Text>비밀번호 찾기</Text>
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
    padding: 20,
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
});

export default Login;
