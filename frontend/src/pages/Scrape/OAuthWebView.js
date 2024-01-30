// Ticket Link
import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';

const OAuthWebView = ({ route, navigation }) => {
  const { uri } = route.params;
  const webViewRef = useRef(null);

  const handleNavigationStateChange = (state) => {
    if (state.url === 'https://m.ticketlink.co.kr/auth/validate?selfRedirect=N') {
      navigation.navigate('TicketlinkWebView');
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri }}
      useWebKit={true}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default OAuthWebView;
