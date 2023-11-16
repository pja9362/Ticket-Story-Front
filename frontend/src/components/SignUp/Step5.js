import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import logo from '../../images/logo.png';

const Step5 = ({nextStep}) => {
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <Text style={styles.guideText}>회원가입이 완료되었습니다.</Text>
      <TouchableOpacity style={styles.loginBtn} onPress={nextStep}>
        <Text style={styles.btnText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: '30%',
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  guideText: {
    fontSize: 18,
  },
  loginBtn: {
    backgroundColor: '#000',
    margin: 30,
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    lineHeight: 20,
  }
});

export default Step5;
