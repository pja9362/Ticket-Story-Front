// 개별 영화 스크랩
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { scrapeCGVMovieDetails, injectCGVScrapButton } from '../utils/scrapingUtils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const My = () => {
  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const [showCGVWebView, setShowCGVWebView] = useState(false);
  const [showInterparkWebView, setShowInterparkWebView] = useState(false);

  const handleNavigationStateChange = (state) => {
    if (state.url === 'https://movielog.cgv.co.kr/movielog/main') {
      injectCGVScrapButton(webViewRef);
    } else if (state.url === 'https://movielog.cgv.co.kr/movielog/watchMovieDetail') {
      scrapeCGVMovieDetails(webViewRef);
    }
  };

  const handleScraping = ({platform}) => {
    if (platform === 'cgv') {
      setShowCGVWebView(true);
    } else if (platform === 'interpark') {
      setShowInterparkWebView(true);
    }
  };

  const handleMessage = (event) => {
    if (event.nativeEvent.data) {
      const movieList = JSON.parse(event.nativeEvent.data);
      console.log('Movie Info:', movieList);
      
      navigation.navigate('ScrapInfo', {movieInfo: movieList});
    } 
  };

  return (
    <SafeAreaView style={styles.container}>
      {showCGVWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://m.cgv.co.kr/WebApp/Member/Login.aspx?RedirectURL=%2fWebApp%2fMobileMovieLog%2fGateway.aspx%3ftype%3d' }}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={handleMessage}
        />
      ) : (
        <>
          <TouchableOpacity
            style={{ padding: 25, margin: 25, backgroundColor: 'red' }}
            onPress={() => handleScraping({ platform: 'cgv' })}
          >
            <Text>CGV Scrap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 25, margin: 25, backgroundColor: 'green' }}
            onPress={handleScraping}
          >
            <Text>인터파크 Scrap</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
});

export default My;