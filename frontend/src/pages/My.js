import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const My = () => {
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
    } else if (state.url === 'https://movielog.cgv.co.kr/movielog/watchMovie') {
      // Now that we are on the target page, initiate the scraping logic
      const scrapingScript = `
        // Your scraping logic here
        // Extract movie information and send it to React Native
        var movieList = [];
        var movieItems = document.querySelectorAll('li[data-ng-repeat="movie in data.watchMovies"]');

        movieItems.forEach(function(item) {
          var movieInfo = {
            title: item.querySelector('.btn_movieHistory_detail').innerText.trim(),
            // Add more properties as needed
          };
          movieList.push(movieInfo);
        });

        // Send movieList to React Native
        window.ReactNativeWebView.postMessage(JSON.stringify(movieList));
      `;
      webViewRef.current.injectJavaScript(scrapingScript);
    }
  };

  const handleScraping = () => {
    setShowWebView(true);
  };

  const handleMessage = (event) => {
    // Handle the message received from the WebView
    if (event.nativeEvent.data) {
      const movieList = JSON.parse(event.nativeEvent.data);
      // Process the movieList as needed
      console.log('Received movie list:', movieList);
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

// const My = () => {
//   const webViewRef = useRef(null);
//   const [showWebView, setShowWebView] = useState(false);

//   const handleNavigationStateChange = (state) => {
//     // Check if the user is redirected to the desired page
//     if (state.url === 'https://movielog.cgv.co.kr/movielog/main') {
//       const script = `
//         var scrapButton = document.createElement('button');
//         scrapButton.innerHTML = '스크랩 하러가기';
//         scrapButton.onclick = function() {
//           // Redirect to the desired page
//           window.location.href = 'https://movielog.cgv.co.kr/movielog/watchMovie';
//         };
//         document.body.appendChild(scrapButton);
//         true; // This line is added to avoid the warning
//       `;
//       const style = `
//         var style = document.createElement('style');
//         style.innerHTML = 'button { position: fixed; bottom: 50px; left: 50%; transform: translateX(-50%); width: 50%; background-color: red; color: white; padding: 15px; text-align: center; }';
//         document.head.appendChild(style);
//         true; // This line is added to avoid the warning
//       `;
//       webViewRef.current.injectJavaScript(style);
//       webViewRef.current.injectJavaScript(script);
//     }
//   };

//   const handleScraping = () => {
//     setShowWebView(true);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {showWebView ? (
//         <WebView
//           ref={webViewRef}
//           style={styles.webview}
//           source={{ uri: 'https://m.cgv.co.kr/WebApp/Member/Login.aspx?RedirectURL=%2fWebApp%2fMobileMovieLog%2fGateway.aspx%3ftype%3d' }}
//           onNavigationStateChange={handleNavigationStateChange}
//         />
//       ) : (
//         <TouchableOpacity
//           style={{ padding: 25, margin: 25, backgroundColor: 'red' }}
//           onPress={handleScraping}
//         >
//           <Text>CGV Scrap</Text>
//         </TouchableOpacity>
//       )}
//     </SafeAreaView>
//   );
// };

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
