// Ticket Link
import React, { useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const TicketlinkWebView = ({ onNavigationStateChange, onMessage }) => {
    return (
      <WebView
        style={{ flex: 1, width: windowWidth, height: windowHeight }}
        source={{ uri: 'https://m.ticketlink.co.kr/my' }}
        onNavigationStateChange={onNavigationStateChange}
        onMessage={(event) => onMessage(event, 'ticketlink')}
      />
    );
};

export default TicketlinkWebView;
