import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import logo from '../../images/logo.png';
import api from '../../api/api';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const apiUrl = 'http://192.168.219.134:8080';

const Init = ({navigation}) => {
  const webViewRef = useRef(null);

  const [webViewVisible, setWebViewVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

  const handleKaKaoLogin = async () => {
    try {
      const response = await api.handleKaKaoLogin();

      setRedirectUrl(response);
      setWebViewVisible(true);
    } catch (error) {
      console.error('KaKao Login error:', error);
      throw error;
    }
  };

  const handleWebViewClose = () => {
    setWebViewVisible(false);
  }

  const handleSaveToken = async (url) => {
    try {
      const response = await api.saveTokens(url);

      await AsyncStorage.setItem('accessToken', response.accessToken);
      await AsyncStorage.setItem('refreshToken', response.refreshToken);

      navigation.navigate('MainStack');
    } catch (error) {
      console.error('Error storing tokens:', error);
    }
  };

  const handleOAuthNavigationChange = (state) => {
    if (state.url.startsWith(`${apiUrl}/api/v1/auth/oauth/kakao?code=`)) {
      handleWebViewClose();
      handleSaveToken(state.url);
    }
  }

  return (
    <View style={styles.container}>
      {webViewVisible && (redirectUrl != null) ? (
        <WebView
          ref={webViewRef}
          style={{... styles.webview, margin: 0, padding: 0}}
          source={{ uri: redirectUrl }} 
          onNavigationStateChange={handleOAuthNavigationChange}
          onClose={handleWebViewClose}
        />
      )
    :
     (
      <View style={{padding: 38, flex: 1}}>
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
     )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
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
