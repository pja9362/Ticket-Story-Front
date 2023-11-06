import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>Ticket-Story</Text>
      </View>

      <View style={styles.snsBtnContainer}>
        <TouchableOpacity style={styles.snsBtn}>
          <Icon name="chat" size={20} color="#000" />
          <Text style={styles.text}>카카오로 계속하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.snsBtn, backgroundColor: '#fff', borderWidth: 1}}>
          <Icon name="apple" size={22} color="#000" />
          <Text style={styles.text}>Apple로 계속하기</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.authBtnContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>로그인</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>회원가입</Text>
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
  text: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 5,
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000',
  },
  snsBtnContainer: {
    marginTop: 20,
    flex: 1.5,
  },
  snsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f9e000',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  authBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    gap: 10,
  },
});

export default Home;
