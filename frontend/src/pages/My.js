// 개별 영화 스크랩
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const My = () => {
  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const [showWebView, setShowWebView] = useState(false);

  const handleNavigationStateChange = (state) => {
    // Check if the user is redirected to the desired page
    if (state.url === 'https://movielog.cgv.co.kr/movielog/main') {
      const script = `
        var scrapButton = document.createElement('button');
        scrapButton.innerHTML = '스크랩 하러가기';
        scrapButton.onclick = function() {
          // Redirect to the desired page
          window.location.href = 'https://movielog.cgv.co.kr/movielog/watchMovie';
        };
        document.body.appendChild(scrapButton);
        true;
      `;
      const style = `
        var style = document.createElement('style');
        style.innerHTML = 'button { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); width: 50%; background-color: red; color: white; padding: 15px; text-align: center; }';
        document.head.appendChild(style);
        true;
      `;
      webViewRef.current.injectJavaScript(style);
      webViewRef.current.injectJavaScript(script);
    } else if (state.url === 'https://movielog.cgv.co.kr/movielog/watchMovieDetail') {
        const injectScrapButtonScript = `
          var scrapButton = document.createElement('button');
          scrapButton.innerHTML = '스크랩';
          scrapButton.onclick = function() {
            var movieInfoElement = document.querySelector('.movieLog_detail_movie_info_wrap .btn_movieInfo');
            var title = movieInfoElement.childNodes[0].textContent.trim(); 
            
            var dateElement = document.querySelector('.movieLog_detail_movie_info_wrap .movieInfo_date');
            var dateTime = dateElement.innerText.replace('관람', '').trim(); 

            var locationElement = document.querySelector('.detail_info_list .map');
            var location = locationElement.innerText.replace('map', '').trim();

            var seatElement = document.querySelector('.detail_info_list .seat');
            var seat = seatElement.innerText.replace('seat', '').trim();

            var cinemaElement = document.querySelector('.detail_info_list .film');
            var cinema = cinemaElement.innerText.replace('film', '').trim();

            var memberElement = document.querySelector('.detail_info_list .member');
            var seatCountText = memberElement.innerText.trim();
            var seatCount = seatCountText.split(' ')[1];

            var movieDetail = {
              title: title,
              date: dateTime,
              image: document.querySelector('.movie_info_poster_wrap .img_wrap img').getAttribute('data-ng-src'),
              location: location,
              cinema: cinema,
              seat: seat,
              seatCount: seatCount
            };
    
            // Send movieDetail to React Native
            window.ReactNativeWebView.postMessage(JSON.stringify(movieDetail));
          };
    
          // Append the scrap button to the body
          document.body.appendChild(scrapButton);
          true;
        `;
        const style = `
          var style = document.createElement('style');
          style.innerHTML = 'button { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); width: 50%; background-color: red; color: white; padding: 15px; text-align: center; }';
          document.head.appendChild(style);
          true;
        `;
        webViewRef.current.injectJavaScript(style);
        webViewRef.current.injectJavaScript(injectScrapButtonScript);
      }
  }; 

  const handleScraping = () => {
    setShowWebView(true);
  };

  const handleMessage = (event) => {
    if (event.nativeEvent.data) {
      // 전체 영화 스크랩
      const movieList = JSON.parse(event.nativeEvent.data);
      console.log('Movie Info:', movieList);
      
      navigation.navigate('ScrapInfo', {movieInfo: movieList});
    } 
  };

  return (
    <SafeAreaView style={styles.container}>
      {showWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://m.cgv.co.kr/WebApp/Member/Login.aspx?RedirectURL=%2fWebApp%2fMobileMovieLog%2fGateway.aspx%3ftype%3d' }}
          onNavigationStateChange={handleNavigationStateChange}
          onMessage={handleMessage}
        />
      ) : (
        <TouchableOpacity
          style={{ padding: 25, margin: 25, backgroundColor: 'red' }}
          onPress={handleScraping}
        >
          <Text>CGV Scrap</Text>
        </TouchableOpacity>
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

