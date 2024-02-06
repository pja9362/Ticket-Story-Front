import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions} from 'react-native';
import logo from '../../images/logo.png';
import api from '../../api/api';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const apiUrl = 'http://10.5.1.208:8080';

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
  
  // 수정 필요!
  const handleOAuthNavigationChange = async (state) => {
    console.log('OAUTH 현재 state:', state.url);
    if (state.url.startsWith(`${apiUrl}/api/v1/auth/oauth/kakao?code=`) ) {
      try {
        const response = await fetch(state.url);
        
        if (!response.ok) {
          const responseBody = await response.text();
          console.error(`Error fetching HTML content. Status: ${response.status}, Response Body: ${responseBody}`);
          throw new Error(`Error fetching HTML content. Status: ${response.status}`);
        } 

        const responseBody = await response.text();
        const startIndex = responseBody.indexOf('{');
        const endIndex = responseBody.lastIndexOf('}') + 1;
  
        if (startIndex === -1 || endIndex === -1) {
          throw new Error('JSON not found in HTML content');
        }
  
        const jsonString = responseBody.slice(startIndex, endIndex);
  
        const tokenInfo = JSON.parse(jsonString);
  
        const accessToken = tokenInfo.accessToken;
        const refreshToken = tokenInfo.refreshToken;
  
        console.log("토큰 정보! : ", tokenInfo);
  
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
  
        handleWebViewClose();
        navigation.navigate('MainStack');
      } catch (error) {
        console.error('Error extracting and storing tokens:', error);
      }
    }
  };  

  return (
    <View style={styles.container}>
      {webViewVisible && (redirectUrl != null) ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: redirectUrl }} 
          onNavigationStateChange={handleOAuthNavigationChange}
          onClose={handleWebViewClose}
        />
      )
    :
     (
      <>
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
      </>
     )
    }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 38,
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
