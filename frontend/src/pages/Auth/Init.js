import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Linking} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../images/logo.png';
import axios from 'axios';

const Init = ({navigation}) => {

  const handleKaKaoLogin = async () => {
    console.log('handleKaKaoLogin');
  };

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Image source={logo} style={styles.image} />
      </View>

      <View style={styles.mainBtnContainer}>
        <TouchableOpacity
          style={styles.snsBtn}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={{...styles.text, color: '#fff'}}>회원가입</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.snsBtn, backgroundColor: '#fff', borderWidth: 1}}
          onPress={handleKaKaoLogin}>
          {/* <Icon name="chat" size={20} color="#000" /> */}
          <Text style={styles.text}>카카오톡 계정으로 시작하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tmpBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('MainStack')}>
          <View style={styles.tempBtn}></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tempBtn}></View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.tempBtn}></View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.authBtnContainer}
        onPress={() => navigation.navigate('Login')}>
        <Text>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 38,
  },
  text: {
    fontSize: 14,
    color: '#000000',
    lineHeight: 20,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  image: {
    width: 140,
    height: 140,
  },
  mainBtnContainer: {
    marginTop: 20,
    flex: 1.5,
  },
  snsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  authBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },

  // 임시 버튼
  tmpBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    gap: 25,
  },
  tempBtn: {
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#D9D9D9',
  },
});

export default Init;
