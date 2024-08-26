import React, { useState, useRef, useEffect } from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import WebView from 'react-native-webview';
import Header from '../../components/Header';
import { handleOAuthKaKaoQuit, handleOAuthAppleQuit, deleteAccount } from '../../actions/auth/auth';
import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SocialLogin = ({route, navigation}) => {

    const {socialType, reasonNumber} = route.params;

    const webViewRef = useRef(null);

    const [webViewTitle, setWebViewTitle] = useState('');
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [webViewOpacity, setWebViewOpacity] = useState(1);

    useEffect(() => {
        if(socialType === 'KAKAO') {
            handleKaKaoLogin();
        } else if(socialType === 'APPLE') {
            handleAppleLogin();
        }
    }, []);

    const handleKaKaoLogin = async () => {
        try {
          const response = await handleOAuthKaKaoQuit();
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

        const jsonString = data.replace(/<\/?[^>]+(>|$)/g, '') || '';
        const jsonData = JSON.parse(jsonString);

        if (jsonData.result) {
            setWebViewOpacity(0);
            deleteAccount(reasonNumber);
            navigation.navigate('Init');
        } 

        AsyncStorage.removeItem('accessToken');
        AsyncStorage.removeItem('refreshToken');
    };
    
    const handleAppleLogin = async () => {
        console.log('Apple Login');
        try {
          const response = await handleOAuthAppleQuit();
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
                            if (window.location.href.startsWith('${API_URL}/api/v1/auth/oauth/kakao/unlink?code=')) {
                                window.ReactNativeWebView.postMessage(document.body.innerHTML);
                            } else if (window.location.href.startsWith('${API_URL}/api/v1/auth/oauth/apple/unlink?code=')) {
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