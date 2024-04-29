// Ticket Link
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { scrapeTicketlinkTicketDetails, injectTicketlinkScrapButton } from '../../utils/scrapingUtils';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TicketlinkWebView = () => {

    const webViewRef = useRef(null);
    const navigation = useNavigation();
    
    const handleTicketlinkNavigationStateChange = (state) => {   
      // console.log("current url: ", state.url);

      const targetPattern = /^https:\/\/m\.ticketlink\.co\.kr\/my\/reserve\/\d+$/;

      if(state.url.startsWith('https://id.payco.com/oauth2.0/authorize')) {
        navigation.navigate('OAuthWebView', { uri: state.url });
      } else if (targetPattern.test(state.url)) {
        console.log('Ticket Link Ticket Details Page!');
        scrapeTicketlinkTicketDetails(webViewRef);
      } else if (state.url === 'http://www.ticketlink.co.kr/') {
        const redirectScript = `
          window.location.href = 'https://m.ticketlink.co.kr';
        `;
        webViewRef.current.injectJavaScript(redirectScript);
      } else if (state.url === 'https://m.ticketlink.co.kr/my') {
        injectTicketlinkScrapButton(webViewRef);
      } else if (state.url === 'about:blank') {
        const homeRedirectScript = `
          window.location.href = 'https://m.ticketlink.co.kr/home';
        `;
        webViewRef.current.injectJavaScript(homeRedirectScript);
      }
    };

    const handleMessage = (event, source) => {
      if (event.nativeEvent.data) {
        const ticketInfo= JSON.parse(event.nativeEvent.data);
        console.log(`${source} Ticket Info: `, ticketInfo);
        
        navigation.navigate('EnrollInfoByScrape', { ticketInfo: ticketInfo, source: source });
      } 
    };

    return (
      <WebView
        ref={webViewRef}
        style={{ width: windowWidth, height: windowHeight }}
        source={{ uri: 'https://m.ticketlink.co.kr/my' }}
        onNavigationStateChange={handleTicketlinkNavigationStateChange}
        onMessage={(event) => handleMessage(event, 'ticketlink')}
      />
    );
};

export default TicketlinkWebView;
