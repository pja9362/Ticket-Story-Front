import React, {useState, useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import InitScreen from './src/pages/Auth/Init';
import LoginScreen from './src/pages/Auth/Login';
import SignUpScreen from './src/pages/Auth/SignUp';
import EnrollAgreement from './src/pages/EnrollTicket/EnrollAgreement';
import EnrollByOCR from './src/pages/EnrollTicket/EnrollByOCR';
import EnrollInfoByOCR from './src/pages/EnrollTicket/EnrollInfoByOCR';
import EnrollInfoByHand from './src/pages/EnrollTicket/EnrollInfoByHand';
import EnrollInfoByScrape from './src/pages/EnrollTicket/EnrollInfoByScrape';
import EnrollReviewByOCR from './src/pages/EnrollTicket/EnrollReviewByOCR';
import EnrollReview from './src/pages/EnrollTicket/EnrollReview';
import EnrollFinish from './src/pages/EnrollTicket/EnrollFinish';
import OCRFail from './src/pages/EnrollTicket/OCRFail';
import MainStack from './src/navigation/MainStack';
import OAuthWebView from './src/pages/Scrape/OAuthWebView';
import TicketlinkWebView from './src/pages/Scrape/TicketlinkWebView';

const App = () => {
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  const customTheme = {
    ...DefaultTheme,
    fonts: {
      black: 'Inter-Black',
      bold: 'Inter-Bold',
      extraBold: 'Inter-ExtraBold',
      regular: 'Inter-Regular',
      medium: 'Inter-Medium',
      light: 'Inter-Light',
      thin: 'Inter-Thin',
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{flex: 1}}>
        <NavigationContainer theme={customTheme}>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Init" component={InitScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MainStack">
              {({navigation}) => <MainStack navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen name="EnrollAgreement" component={EnrollAgreement} />
            <Stack.Screen name="EnrollByOCR" component={EnrollByOCR} />
            <Stack.Screen name="EnrollInfoByOCR" component={EnrollInfoByOCR} />
            <Stack.Screen name="EnrollInfoByHand" component={EnrollInfoByHand} />
            <Stack.Screen name="EnrollInfoByScrape" component={EnrollInfoByScrape} />
            <Stack.Screen name="EnrollReviewByOCR" component={EnrollReviewByOCR} />
            <Stack.Screen name="EnrollReview" component={EnrollReview} />
            <Stack.Screen name="EnrollFinish" component={EnrollFinish} />
            <Stack.Screen name="OCRFail" component={OCRFail} />
            {/* Ticket Link */}
            <Stack.Screen name="OAuthWebView" component={OAuthWebView} />
            <Stack.Screen name="TicketlinkWebView" component={TicketlinkWebView} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
