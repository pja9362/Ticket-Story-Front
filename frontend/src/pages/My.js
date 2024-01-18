// 개별 영화 스크랩
import React, { useRef, useState } from 'react';
import { SafeAreaView, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { scrapeCGVTicketDetails, injectCGVScrapButton, scrapeInterparkTicketDetails, scrapeLotteCinemaTicketDetails, injectMegaboxScrapButton, scrapeMegaboxTicketDetails, scrapeYes24TicketDetails } from '../utils/scrapingUtils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const My = () => {
  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const [showCGVWebView, setShowCGVWebView] = useState(false);
  const [showInterparkWebView, setShowInterparkWebView] = useState(false);
  const [showLotteCinemaWebView, setShowLotteCinemaWebView] = useState(false);
  const [showMegaboxWebView, setShowMegaboxWebView] = useState(false);
  const [showYes24WebView, setShowYes24WebView] = useState(false);
  const [showTicketlinkWebView, setShowTicketlinkWebView] = useState(false);

  const handleCGVNavigationStateChange = (state) => {
    if (state.url === 'https://movielog.cgv.co.kr/movielog/main') {
      injectCGVScrapButton(webViewRef);
    } else if (state.url === 'https://movielog.cgv.co.kr/movielog/watchMovieDetail') {
      scrapeCGVTicketDetails(webViewRef);
    }
  };

  const handleInterparkNavigationStateChange = (state) => {
    if (state.url === 'https://mticket.interpark.com/MyPage/BookedDetail') {
      scrapeInterparkTicketDetails(webViewRef);
    } else if (state.url === 'https://www.interpark.com/') {
      const redirectScript = `
        window.location.href = 'https://mticket.interpark.com/MyPage/BookedList?PeriodSearch=03#';
      `;
      webViewRef.current.injectJavaScript(redirectScript);
    }
  };

  const handleLotteCinemaNavigationStateChange = (state) => {
    if (state.url === 'https://www.lottecinema.co.kr/NLCMW/MyPage/MyMovieManageHistory?mTab=2') {
      scrapeLotteCinemaTicketDetails(webViewRef);
    } else if (state.url === 'https://www.lottecinema.co.kr/NLCMW/MyPage') {
      const redirectScript = `
        window.location.href = 'https://www.lottecinema.co.kr/NLCMW/MyPage/MyMovieManageHistory?mTab=2';
      `;
      webViewRef.current.injectJavaScript(redirectScript);
    }
  };

  const handleMegaboxNavigationStateChange = (state) => {
    if (state.url === 'https://m.megabox.co.kr/') {
      const redirectScript = `
        window.location.href = 'https://m.megabox.co.kr/myMegabox';
      `;
      webViewRef.current.injectJavaScript(redirectScript);
    } else if (state.url === 'https://m.megabox.co.kr/myMegabox') {
      injectMegaboxScrapButton(webViewRef);
    } else if (state.url === 'https://m.megabox.co.kr/mypage/moviestory?divCd=WATCHED') {
      scrapeMegaboxTicketDetails(webViewRef);
    }
  }

  const handleYes24NavigationStateChange = (state) => {
    const targetURL = 'https://m.ticket.yes24.com:442/MyPage/OrderDetail.aspx';
    if (state.url.startsWith(targetURL)) {
      scrapeYes24TicketDetails(webViewRef);
    }
  }

  const handleTicketlinkNavigationStateChange = (state) => {
    console.log('Current URL:', state.url);
  
    if (state.url === 'https://m.ticketlink.co.kr/auth/validate?selfRedirect=N') {
      console.log('Reached validation page');
      const redirectScript = `
        window.location.href = 'https://m.ticketlink.co.kr/my';
      `;
      webViewRef.current.injectJavaScript(redirectScript);
    } else if (state.url === 'https://m.ticketlink.co.kr/auth/logout') {
      console.log('logout success');
    }
  };
  
  const handleScraping = ({platform}) => {
    if (platform === 'cgv') {
      setShowCGVWebView(true);
    } else if (platform === 'interpark') {
      setShowInterparkWebView(true);
    } else if (platform === 'lottecinema') {
      setShowLotteCinemaWebView(true); 
    } else if (platform === 'megabox') {
      setShowMegaboxWebView(true);
    } else if (platform === 'yes24') {
      setShowYes24WebView(true);
    } else if (platform === 'ticketlink') {
      setShowTicketlinkWebView(true);
    }
  };

  const handleMessage = (event, source) => {
    if (event.nativeEvent.data) {
      const ticketInfo= JSON.parse(event.nativeEvent.data);
      console.log('Ticket Info:', ticketInfo);
      
      navigation.navigate('ScrapInfo', { ticketInfo: ticketInfo, source: source });
    } 
  };

  
  return (
    <SafeAreaView style={styles.container}>
      {showCGVWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://m.cgv.co.kr/WebApp/Member/Login.aspx?RedirectURL=%2fWebApp%2fMobileMovieLog%2fGateway.aspx%3ftype%3d' }}
          onNavigationStateChange={handleCGVNavigationStateChange}
          onMessage={(event) => handleMessage(event, 'cgv')}
        />
      ) : showInterparkWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://accounts.interpark.com/login/form' }}
          onNavigationStateChange={handleInterparkNavigationStateChange}
          onMessage={(event) => handleMessage(event, 'interpark')}
        />
      ) : showLotteCinemaWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://www.lottecinema.co.kr/NLCMW/member/login?hidUrlReferrer=/NLCMW/MyPage' }}
          onNavigationStateChange={handleLotteCinemaNavigationStateChange}
          onMessage={(event) => handleMessage(event, 'lottecinema')}
        />
      ) : showMegaboxWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://m.megabox.co.kr' }}
          onNavigationStateChange={handleMegaboxNavigationStateChange}
          onMessage={(event) => handleMessage(event, 'megabox')}
        />
      ) : showYes24WebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://m.yes24.com/Momo/Templates/FTLogin.aspx?ReturnURL=https://m.ticket.yes24.com:442/MyPage/OrderList.aspx' }}
          onNavigationStateChange={handleYes24NavigationStateChange}
          onMessage={(event) => handleMessage(event, 'yes24')}
        /> 
      ) : showTicketlinkWebView ? (
        <WebView
          ref={webViewRef}
          style={styles.webview}
          source={{ uri: 'https://m.ticketlink.co.kr/my' }}
          onNavigationStateChange={handleTicketlinkNavigationStateChange}
          onMessage={(event) => handleMessage(event, 'ticketlink')}
        />
      ):
        (
        <>
          <TouchableOpacity
            style={{ padding: 25, backgroundColor: 'red' }}
            onPress={() => handleScraping({ platform: 'cgv' })}
          >
            <Text>CGV Scrap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 25, backgroundColor: 'green' }}
            onPress={() => handleScraping({ platform: 'interpark' })}
          >
            <Text>인터파크 Scrap</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ padding: 25,backgroundColor: 'orange' }}
            onPress={() => handleScraping({ platform: 'lottecinema' })}
          >
            <Text>롯데시네마 Scrap</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ padding: 25, backgroundColor: 'yellow' }}
            onPress={() => handleScraping({ platform: 'megabox' })}
          >
            <Text>메가박스 Scrap</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ padding: 25, backgroundColor: 'skyblue' }}
            onPress={() => handleScraping({ platform: 'yes24' })}
          >
            <Text>Yes24 Scrap</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={{ padding: 25, backgroundColor: 'blue' }}
            onPress={() => handleScraping({ platform: 'ticketlink' })}
          >
            <Text>티켓링크 Scrap</Text>
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