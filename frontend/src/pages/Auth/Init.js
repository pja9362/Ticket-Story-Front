import React, { useState, useRef, useEffect } from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, BackHandler, Alert} from 'react-native';
import logo from '../../images/logo.png';
import WebView from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import icon_kakao from '../../images/icon_kakao.png';
import icon_apple from '../../images/icon_apple.png';
import logo_ticket_white from '../../images/logo_ticket_white.png';
import { API_URL } from '@env';
import { handleOAuthKaKaoLogin, saveTokens } from '../../actions/auth/auth';
import {CustomText} from '../../components/CustomText';
// import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import Header from '../../components/Header';
import { useDispatch } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Init = ({navigation}) => {

  const webViewRef = useRef(null);
  const dispatch = useDispatch();

  const [webViewVisible, setWebViewVisible] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState(null);

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

      setRedirectUrl(response);
      setWebViewVisible(true);
    } catch (error) {
      console.error('KaKao Login error:', error);
      throw error;
    }
  };


  const handleSaveToken = async (url) => {
    try {
      // const response = await saveTokens(url);
      dispatch(saveTokens(url, ([result, response]) => {
        if(result) {
          // navigation.navigate('MainStack');
          navigation.navigate('MainStackWithDrawer');
        } else {
          console.log('saveToken error');
          Alert.alert('카카오 로그인 에러. 잠시후 이용해주세요.');
        }
      }))

    } catch (error) {
      console.error('Error storing tokens:', error);
      Alert.alert('카카오 로그인 에러. 잠시후 이용해주세요.');
    }
  };

  const handleOAuthNavigationChange = (state) => {
    console.log('Navigating to:', state.url);
    if (state.url.startsWith(`${API_URL}/api/v1/auth/oauth/kakao?code=`)) {
      setWebViewVisible(false);
      handleSaveToken(state.url);
    }
  }

  // const handleSaveToken = async (url) => {
  //   if (isTokenSaved) return;
  
  //   try {
  //     setIsTokenSaved(true);
  //     dispatch(saveTokens(url, ([result, response]) => {
  //       if(result) {
  //         navigation.navigate('MainStackWithDrawer');
  //       } else {
  //         console.log('saveToken error');
  //         Alert.alert('카카오 로그인 에러. 잠시후 이용해주세요.');
  //       }
  //     }));
  //   } catch (error) {
  //     console.error('Error storing tokens:', error);
  //     Alert.alert('카카오 로그인 에러. 잠시후 이용해주세요.');
  //   }
  // };
  

  // const [isTokenSaved, setIsTokenSaved] = useState(false);

  // const handleOAuthNavigationChange = (state) => {
  //   if (state.url.startsWith(`${API_URL}/api/v1/auth/oauth/kakao?code=`) && !isTokenSaved) {
  //     setWebViewVisible(false);
  //     setIsTokenSaved(true);
  //     handleSaveToken(state.url);
  //   }
  // };

  const handleAppleLogin = () => {
    console.log('Apple Login');
    navigation.navigate('MainStack');
  }

  const handleBackClick = () => {
    setWebViewVisible(false);
    setRedirectUrl(null);
  }

  return (
    <View style={styles.container}>
      {webViewVisible && (redirectUrl != null) ? (
        <>
          <View style={{padding: 20, paddingTop: 0}}>
            <Header title="카카오톡 로그인" backClick={handleBackClick}/> 
          </View>
            <WebView
              ref={webViewRef}
              style={{... styles.webview, margin: 0, padding: 0}}
              source={{ uri: redirectUrl }} 
              onNavigationStateChange={handleOAuthNavigationChange}
              onClose={() => setWebViewVisible(false)}
            />
        </>
      )
    :
     (
      <View style={{padding: 38, flex: 1}}>
        <View style={styles.title}>
          <Image source={logo} style={styles.image} />
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
          <TouchableOpacity
            onPress={handleAppleLogin}>
            <Image
              source={icon_apple}
              style={{width: 48, height: 48}}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.authBtnContainer}
          onPress={() => navigation.navigate('Login')}>
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
    flex: 4
  },
  image: {
    width: 114,
    height: 105,
  },
  snsBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#525252',
    padding: 8,
    marginBottom: 20,
    borderRadius: 6,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  logo: {
    width: 30,  
    height: 30, 
  },
  authBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: '35%',
  },
  oauthBtnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    gap: 25,
  },
});

export default Init;
