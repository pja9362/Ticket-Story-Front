import React, {useRef, useState} from 'react';
import {Dimensions, SafeAreaView, View, Image, StyleSheet, Platform, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';
import {scrapeCGVTicketDetails, injectCGVScrapButton, scrapeInterparkTicketDetails, scrapeLotteCinemaTicketDetails, injectMegaboxScrapButton, scrapeMegaboxTicketDetails, scrapeYes24TicketDetails, injectTicketlinkScrapButton, scrapeTicketlinkTicketDetails} from '../../utils/scrapingUtils';
import TicketlinkWebView from '../Scrape/TicketlinkWebView';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import logo_cgv from '../../images/logo_cgv.png';
import logo_interpark from '../../images/logo_interpark.png';
import logo_lottecinema from '../../images/logo_lottecinema.png';
import logo_megabox from '../../images/logo_megabox.png';
import logo_yes24 from '../../images/logo_yes24.png';
import logo_ticketlink from '../../images/logo_ticketlink.png';
import { CustomText } from '../../components/CustomText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const EnrollByScrape = () => {
  const navigation = useNavigation();

  const webViewRef = useRef(null);

  const isIOS = Platform.OS === 'ios';

  const [showCGVWebView, setShowCGVWebView] = useState(false);
  const [showInterparkWebView, setShowInterparkWebView] = useState(false);
  const [showLotteCinemaWebView, setShowLotteCinemaWebView] = useState(false);
  const [showMegaboxWebView, setShowMegaboxWebView] = useState(false);
  const [showYes24WebView, setShowYes24WebView] = useState(false);
  const [showTicketlinkWebView, setShowTicketlinkWebView] = useState(false);

  const isWebViewVisible = showCGVWebView || showInterparkWebView || showLotteCinemaWebView || showMegaboxWebView || showYes24WebView || showTicketlinkWebView;

  const handleCGVNavigationStateChange = (state) => {
    if (state.url === 'https://movielog.cgv.co.kr/movielog/main') {
      injectCGVScrapButton(webViewRef);
    } else if (state.url === 'https://movielog.cgv.co.kr/movielog/watchMovieDetail') {
      scrapeCGVTicketDetails(webViewRef);
    }
  };

  const handleInterparkNavigationStateChange = (state) => {
    // console.log('current url: ', state.url);
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
    // console.log('current url: ', state.url);
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
    // console.log('current url: ', state.url);
    if (state.url === 'https://m.megabox.co.kr/') {
      const redirectScript = `
        window.location.href = 'https://m.megabox.co.kr/myMegabox';
      `;
      webViewRef.current.injectJavaScript(redirectScript);
    } else if (state.url === 'https://m.megabox.co.kr/main') {
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
    // console.log('current url: ', state.url);
    const targetURL = 'https://m.ticket.yes24.com:442/MyPage/OrderDetail.aspx';
    if (state.url.startsWith(targetURL)) {
      scrapeYes24TicketDetails(webViewRef);
    }
  }
  
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
      if(isIOS) {
        setShowTicketlinkWebView(true);
      } else {
        Alert.alert('준비 중입니다.');
      }
    } 
  };

  const handleMessage = (event, source) => {
    if (event.nativeEvent.data) {
      const ticketInfo= JSON.parse(event.nativeEvent.data);
      // console.log(`${source} Ticket Info: `, ticketInfo);
      console.log('God Please',ticketInfo);
      
      navigation.navigate('EnrollInfoByScrape', { ticketInfo: ticketInfo, source: source });
    } 
  };
  
  return (
    <SafeAreaView style={styles.container}>
        <EnrollHeader title={ isWebViewVisible ? '가져올 티켓 선택하기' : '온라인 티켓 등록하기' } backDestination="MainStack"/>
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
        <TicketlinkWebView />
      ) : (
        <>
          <CustomText style={styles.guideText} fontWeight="bold">티켓을 가져올 사이트를 선택해 주세요.</CustomText>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleScraping({ platform: 'cgv' })}
            >
              <View style={styles.imageContainer}>
                <Image source={logo_cgv} style={styles.logoImage} />
                <CustomText style={styles.btnText} fontWeight="bold">CGV</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleScraping({ platform: 'megabox' })}
            >
              <View style={styles.imageContainer}>
                <Image source={logo_megabox} style={styles.logoImage} />
                <CustomText style={styles.btnText} fontWeight="bold">메가박스</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleScraping({ platform: 'lottecinema' })}
            >
              <View style={styles.imageContainer}>
                <Image source={logo_lottecinema} style={styles.logoImage} />
                <CustomText style={styles.btnText} fontWeight="bold">롯데시네마</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleScraping({ platform: 'interpark' })}
            >
              <View style={styles.imageContainer}>
                <Image source={logo_interpark} style={styles.logoImage} />
                <CustomText style={styles.btnText} fontWeight="bold">인터파크 티켓</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => handleScraping({ platform: 'yes24' })}
            >
              <View style={styles.imageContainer}>
                <Image source={logo_yes24} style={styles.logoImage} />
                <CustomText style={styles.btnText} fontWeight="bold">예스24 티켓</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, !isIOS && styles.disabledButton]}
              onPress={() => handleScraping({ platform: 'ticketlink' })}
            >
              <View style={styles.imageContainer}>
                <Image source={logo_ticketlink} style={styles.logoImage} />
                <CustomText style={styles.btnText} fontWeight="bold">티켓링크</CustomText>
              </View>
            </TouchableOpacity>

            
          </View>
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
    backgroundColor: '#fff',
  },
  webview: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 60,
  },
  button: {
    width: '30%',
    marginBottom: 10,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.5,
  },
  imageContainer: {
    alignItems: 'center',
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 13,
    color: '#525252',
    paddingTop: 5,
    paddingBottom: 15,
    // backgroundColor: 'red'
  },
  guideText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#525252',
    marginTop: 40,
    marginBottom: 28,
  },
});

export default EnrollByScrape;
