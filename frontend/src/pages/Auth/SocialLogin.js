import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../components/Header';
import { handleOAuthKaKaoLogin, handleOAuthAppleLogin, saveTokens } from '../../actions/auth/auth';
import { API_URL } from '@env';
import { useDispatch } from 'react-redux';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SocialLogin = ({route, navigation}) => {

    const {socialType} = route.params;

    const dispatch = useDispatch();
    const webViewRef = useRef(null);

    const [webViewTitle, setWebViewTitle] = useState('');
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [webViewOpacity, setWebViewOpacity] = useState(1);

    useEffect(() => {
        console.log('socialType:', socialType);
        if(socialType === 'KAKAO') {
            handleKaKaoLogin();
        } else if(socialType === 'APPLE') {
            handleAppleLogin();
        }
    }, []);

    const handleKaKaoLogin = async () => {
        try {
          const response = await handleOAuthKaKaoLogin();
          setWebViewTitle('카카오톡 로그인');
          setRedirectUrl(response);
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
        } else if (navState.url.startsWith(`${API_URL}/api/v1/auth/oauth/apple?code=`)) {
          setWebViewOpacity(0);
          console.log("Apple Login Success!");
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
    
        // Save tokens
        const { accessToken, refreshToken } = jsonData;
        
        if (accessToken && refreshToken) {      
          dispatch(saveTokens(jsonData, ([result, response]) => {
            console.log('saveToken:', result, response);
            if(result) {
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
      };
    };
    
    const handleAppleLogin = async () => {
        console.log('Apple Login');
        try {
          const response = await handleOAuthAppleLogin();
          setWebViewTitle('애플 로그인');
          setRedirectUrl(response);
        } catch (error) {
          console.error('HANDLE KAKAO LOGIN error:', error);
          throw error;
        }
    }
    

    const handleBackClick = () => {
        if (redirectUrl) {
            setRedirectUrl(null);
        } else {
            navigation.goBack();
        }
    }

    return (
        <View style={styles.container}>
            {
                redirectUrl &&
                <>
                    <View style={{padding: 20, paddingTop: 0}}>
                        <Header title={webViewTitle} backClick={handleBackClick}/> 
                    </View>
                    <WebView 
                        ref={webViewRef}
                        style={{...styles.webview, margin: 0, padding: 0, opacity: webViewOpacity}}
                        source={{ uri: redirectUrl }} 
                        onNavigationStateChange={handleOAuthNavigationChange}
                        onMessage={handleWebViewMessage}
                        injectedJavaScript={`
                            if (window.location.href.startsWith('${API_URL}/api/v1/auth/oauth/kakao?code=')) {
                                window.ReactNativeWebView.postMessage(document.body.innerHTML);
                            } else if (window.location.href.startsWith('${API_URL}/api/v1/auth/oauth/apple?code=')) {
                                window.ReactNativeWebView.postMessage(document.body.innerHTML);
                            }
                            true;
                        `}
                    />
                </>
            }
        </View>
    );
}

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
      title: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 4
      },

});


export default SocialLogin;