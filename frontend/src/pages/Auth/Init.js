import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, TouchableOpacity, View, Image, Dimensions, BackHandler, Alert, Platform} from 'react-native';
import logo from '../../images/logo.png';
import backgroundImage from '../../images/background_login_4.png';
import WebView from 'react-native-webview';
import icon_kakao from '../../images/icon_kakao.png';
import icon_apple from '../../images/icon_apple.png';
import logo_ticket_white from '../../images/logo_ticket_white.png';
import { API_URL } from '@env';
import { handleOAuthKaKaoLogin, handleOAuthAppleLogin, saveTokens } from '../../actions/auth/auth';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'
import analytics from '@react-native-firebase/analytics';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Init = ({navigation}) => {

  const webViewRef = useRef(null);
  const dispatch = useDispatch();
  const loggedUrlsRef = useRef(new Set());

  const [webViewTitle, setWebViewTitle] = useState('');
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [webViewOpacity, setWebViewOpacity] = useState(1);
  const [isKakaoLoginLogged, setIsKakaoLoginLogged] = useState(false);
  const [isAppleLoginLogged, setIsAppleLoginLogged] = useState(false);

  useEffect(() => {
    const backAction = () => {
      console.log('cannot go back');
      BackHandler.exitApp()
      return true; 
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);


  const handleKaKaoLogin = async () => {
    try {
      const response = await handleOAuthKaKaoLogin();
      setWebViewTitle('카카오톡 로그인');
      setRedirectUrl(response);
      setWebViewVisible(true);
      analytics().logEvent('main_kakao_click')
      // analytics().logEvent('sign_up_try_kakao',{step:1})
    } catch (error) {
      console.error('HANDLE KAKAO LOGIN error:', error);
      throw error;
    }
  };

  const handleOAuthNavigationChange = async (navState) => {
    console.log('------NAVIGATION CHANGE------');
    console.log('navState:', navState.url);

    // if (navState.url.includes('3Dtrue#login')){
    //   analytics().logEvent('sign_up_try_kakao',{step:1})
    //   analytics().logScreenView({
    //     screen_name: '카카오톡 회원가입',
    //     screen_class: 'signup'
    //   })
    //   console.log('test1');
    // }

    const url = navState.url;

    // 이미 기록된 URL인지 확인
    if (!loggedUrlsRef.current.has(url)) {
      // 기록되지 않은 URL이라면 이벤트 로그 후 기록
      loggedUrlsRef.current.add(url);
  
      // 특정 URL 조건에 따라 이벤트 기록
      if (url.includes('3Dtrue#login')) {

        const eventLogged = await AsyncStorage.getItem('eventLogged_first_kakao_page');
        if(!eventLogged) {
          analytics().logEvent('sign_up_try_kakao',{step:1})
          analytics().logScreenView({
            screen_name: '카카오톡 회원가입',
            screen_class: 'signup'
          })
          console.log('test1');
          await AsyncStorage.setItem('eventLogged_first_kakao_page', 'true');
        }
        console.log('test1!!!!');
      } else if (url.includes('through_account%3Dtrue#additionalAuth')) {

        const eventLogged = await AsyncStorage.getItem('eventLogged_second_kakao_page');
        if(!eventLogged) {
          analytics().logEvent('sign_up_try_kakao',{step:2})
          console.log('test2');
          await AsyncStorage.setItem('eventLogged_second_kakao_page', 'true');
        }
        console.log('test2!!!!')
      } else if (url.includes('https://logins.daum.net/accounts/kakaossotokenlogin.do')) {
        const eventLogged = await AsyncStorage.getItem('eventLogged_third_kakao_page');
        if(!eventLogged) {
          analytics().logEvent('sign_up_try_kakao',{step:3})
          analytics().logScreenView({
            screen_name: '카카오톡 동의 선택',
            screen_class: 'signup'
          })
          console.log('test3');
          await AsyncStorage.setItem('eventLogged_third_kakao_page', 'true');
        }
        console.log('test3!!!!')
      }

      if (url.includes('https://appleid.apple.com/auth/authorize')) {

        const eventLogged = await AsyncStorage.getItem('eventLogged_first_apple_page');
        if(!eventLogged) {
          analytics().logEvent('sign_up_try_apple', {step: 1}) 
          console.log('애플 로그인 시도');
          await AsyncStorage.setItem('eventLogged_first_apple_page', 'true');
        }
        analytics().logScreenView({
          screen_name: '애플 로그인',
          screen_class: 'login'
        })    
        console.log('애플 로그인 시도!!!!');
      }
    }


    if (navState.url.startsWith(`${API_URL}/api/v1/auth/oauth/kakao?code=`)) {
      setWebViewOpacity(0);
      console.log("Kakao Login Success!");

      if (!isKakaoLoginLogged) {
        analytics().logEvent('login', {method: 'kakao'});
        setIsKakaoLoginLogged(true);
      }

      const eventLogged = await AsyncStorage.getItem('eventLogged_fourth_kakao_page');
      if(!eventLogged) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
        analytics().logEvent('sign_up',{method:'kakao'})
        analytics().setUserProperty('signup_date', formattedDate);
        await AsyncStorage.setItem('eventLogged_fourth_kakao_page', 'true');
        console.log('kakao fourth')
      }      

    } else if (navState.url == `${API_URL}/api/v1/auth/oauth/apple`) {
      setWebViewOpacity(0);
      console.log("Apple Login Success!");

      if (!isAppleLoginLogged) {
        analytics().logEvent('login', {method: 'apple'});
        setIsAppleLoginLogged(true);
      }

      const eventLogged = await AsyncStorage.getItem('eventLogged_second_apple_page');
      if(!eventLogged) {
        const today = new Date();
        const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
        analytics().logEvent('sign_up',{method:'apple'})
        analytics().setUserProperty('signup_date', formattedDate);
        await AsyncStorage.setItem('eventLogged_second_apple_page', 'true');
        console.log('apple second')
      }

    } else {
      setWebViewOpacity(1);
    }
  };

  const handleWebViewMessage = (event) => {
    console.log('------WEBVIEW MESSAGE------');

    let data = event.nativeEvent.data;

    // Remove HTML tags and parse JSON
    const jsonString = data.replace(/<\/?[^>]+(>|$)/g, '') || '';
    const jsonData = JSON.parse(jsonString);

    console.log('WEB VIEW, LOGIN SUCCESS! :', jsonData);

    // Save tokens
    const { accessToken, refreshToken } = jsonData;
    
    if (accessToken && refreshToken) {      
      console.log('Tokens found');
      dispatch(saveTokens(jsonData, ([result, response]) => {
        console.log('saveToken:', result, response);
        if(result) {
          setWebViewVisible(false);
          setRedirectUrl(null);
          navigation.navigate('MainStackWithDrawer');
        } else {
          console.log('saveToken error');
          Alert.alert('카카오 로그인 에러. 잠시후 이용해주세요.');
        }
      })
      );
    } else {
      console.log('No tokens found');
      Alert.alert('소셜 로그인 에러. 잠시후 이용해주세요.');
  };
  };

  const handleAppleLogin = async () => {
    console.log('Apple Login');
    try {
      const response = await handleOAuthAppleLogin();
      setWebViewTitle('애플 로그인');
      setRedirectUrl(response);
      setWebViewVisible(true);
      analytics().logEvent('main_apple_click')
    } catch (error) {
      console.error('HANDLE KAKAO LOGIN error:', error);
      throw error;
    }
  }

  const handleLoginClick = () => {
    navigation.navigate('Login')
    analytics().logEvent('main_general_click')
  }

  const handleBackClick = () => {
    setWebViewVisible(false);
    setRedirectUrl(null);
  }

  return (
    <View style={styles.container}>
      {webViewVisible && (redirectUrl != null) ? (
        <>
            <Header title={webViewTitle} backClick={handleBackClick}/> 
            <WebView
              ref={webViewRef}
              style={{...styles.webview, margin: 0, padding: 0, opacity: webViewOpacity}}
              source={{ uri: redirectUrl }} 
              onNavigationStateChange={handleOAuthNavigationChange}
              onClose={() => setWebViewVisible(false)}
              onMessage={handleWebViewMessage}
              injectedJavaScript={`
                if (window.location.href.startsWith('${API_URL}/api/v1/auth/oauth/kakao?code=')) {
                  window.ReactNativeWebView.postMessage(document.body.innerHTML);
                } else if (window.location.href == '${API_URL}/api/v1/auth/oauth/apple') {
                  window.ReactNativeWebView.postMessage(document.body.innerHTML);
                }
                true;
              `}
            />
        </>
      )
    :
     (
      <View style={{padding: 20, flex: 1}}>
        <View style={styles.title}>
          <Image source={backgroundImage} style={styles.backgroundImg} />
        </View>
        
        <TouchableOpacity
            style={styles.snsBtn}
            onPress={() => navigation.navigate('SignUp')}>
            <View style={styles.signupContainer}>
              <Image source={logo_ticket_white} style={styles.logo} />
              <CustomText style={{...styles.text, color: '#fff'}}>티켓스토리 회원가입</CustomText>
            </View> 
        </TouchableOpacity>

        <View style={styles.oauthBtnContainer}>
          <TouchableOpacity
            onPress={handleKaKaoLogin}>
            <Image
              source={icon_kakao}
              style={{width: 48, height: 48}}
            />
          </TouchableOpacity>

          {Platform.OS == 'ios' && (
            <TouchableOpacity
              onPress={handleAppleLogin}>
              <Image
                source={icon_apple}
                style={{width: 48, height: 48}}
              />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={styles.authBtnContainer}
          onPress={handleLoginClick}>
          <CustomText style={{textDecorationLine: 'underline', fontSize: 16, lineHeight: 40, color: '#000000'}}>로그인</CustomText>
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
    flex: 12,
  },
  snsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#525252',
    padding: 8,
    margin: 20,
    marginTop: 0,
    borderRadius: 6,
    top: verticalScale(20),
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  logo: {
    width: 30,  
    height: 30, 
  },
  backgroundImg: {
    width: '100%',
    height: '200%',
    top: verticalScale(72),
    resizeMode: 'contain',
  },
  authBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '35%',
    top: verticalScale(40)
  },
  oauthBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 2,
    gap: 25,
    top: verticalScale(30),
  },
});

export default Init;
