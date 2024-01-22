// Ticket Link
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { scrapeTicketlinkTicketDetails } from '../../utils/scrapingUtils';
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TicketlinkWebView = ({ onMessage }) => {
    const webViewRef = useRef(null);
    const navigation = useNavigation();

    const handleTicketlinkNavigationStateChange = (state) => {   
      const targetPattern = /^https:\/\/m\.ticketlink\.co\.kr\/my\/reserve\/\d+$/;

      if(state.url.startsWith('https://id.payco.com/oauth2.0/authorize')) {
        console.log('OAuth process started!');
        navigation.navigate('OAuthWebView', { uri: state.url });
      } else if (targetPattern.test(state.url)) {
        console.log('Ticket Link Ticket Details Page!');
        scrapeTicketlinkTicketDetails(webViewRef);
      } else if (state.url === 'http://www.ticketlink.co.kr/') {
        const redirectScript = `
          window.location.href = 'https://m.ticketlink.co.kr';
        `;
        webViewRef.current.injectJavaScript(redirectScript);
      } 
    };

    return (
      <WebView
        ref={webViewRef}
        style={{ width: windowWidth, height: windowHeight }}
        source={{ uri: 'https://m.ticketlink.co.kr/my' }}
        onNavigationStateChange={handleTicketlinkNavigationStateChange}
        onMessage={(event) => onMessage(event, 'ticketlink')}
      />
    );
};

export default TicketlinkWebView;
