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

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Init = ({navigation}) => {

  const webViewRef = useRef(null);
  const dispatch = useDispatch();

  const [webViewTitle, setWebViewTitle] = useState('');
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [webViewOpacity, setWebViewOpacity] = useState(1);

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
    } catch (error) {
      console.error('HANDLE KAKAO LOGIN error:', error);
      throw error;
    }
  };

  const handleOAuthNavigationChange = (navState) => {
    console.log('------NAVIGATION CHANGE------');
    console.log('navState:', navState.url);
    if (navState.url.startsWith(`${API_URL}/api/v1/auth/oauth/kakao?code=`)) {
      setWebViewOpacity(0);
      console.log("Kakao Login Success!");
      analytics().logEvent('login', {method: 'kakao'});
    } else if (navState.url == `${API_URL}/api/v1/auth/oauth/apple`) {
      setWebViewOpacity(0);
      console.log("Apple Login Success!");
      analytics().logEvent('login', {method: 'apple'});
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
