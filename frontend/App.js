// import React from 'react';
import React, {useEffect} from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Text, TextInput } from 'react-native';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';

import InitScreen from './src/pages/Auth/Init';
import LoginScreen from './src/pages/Auth/Login';
import SignUpScreen from './src/pages/Auth/SignUp';
import FindPasswordScreen from './src/pages/Auth/FindPassword';
import ChangePWScreen from './src/pages/Auth/ChangePW';
import EnrollAgreement from './src/pages/EnrollTicket/EnrollAgreement';
import EnrollByOCR from './src/pages/EnrollTicket/EnrollByOCR';
import EnrollByScrape from './src/pages/EnrollTicket/EnrollByScrape';
import EnrollInfoByOCR from './src/pages/EnrollTicket/EnrollInfoByOCR';
import EnrollInfoByHand from './src/pages/EnrollTicket/EnrollInfoByHand';
import EnrollInfoByScrape from './src/pages/EnrollTicket/EnrollInfoByScrape';
import EnrollReview from './src/pages/EnrollTicket/EnrollReview';
import EnrollFinish from './src/pages/EnrollTicket/EnrollFinish';
import OCRFail from './src/pages/EnrollTicket/OCRFail';
import MainStack from './src/navigation/MainStack';
import OAuthWebView from './src/pages/Scrape/OAuthWebView';
import TicketlinkWebView from './src/pages/Scrape/TicketlinkWebView';
import TicketDetail from './src/pages/TicketBook/TicketDetail';
import EditInfo from './src/pages/EnrollTicket/EditInfo';
import EditReview from './src/pages/EnrollTicket/EditReview';

// dummy
import ShowImageScreen from './src/pages/ShowImage';
import ShowContentScreen from './src/pages/ShowContent';

const App = () => {
  const Stack = createNativeStackNavigator();

  useEffect(() => {
    const customTextProps = {
      style: {
        fontFamily: "Pretendard-Bold",
      },
    };

    const customTextInputProps = {
      style: {
        fontFamily: 'Pretendard',
      },
    };

    setCustomText(customTextProps);
    setCustomTextInput(customTextInputProps);
  }, []);

  const screenOptions = {
    headerShown: false,
  };

  const customTheme = {
    ...DefaultTheme,
    fonts: {
      black: 'Pretendard-Black',
      bold: 'Pretendard-Bold',
      extraBold: 'Pretendard-ExtraBold',
      regular: 'Pretendard-Regular',
      medium: 'Pretendard-Medium',
      light: 'Pretendard-Light',
      thin: 'Pretendard-Thin',
    },
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{flex: 1}}>
        <Provider store={store}>
          <NavigationContainer theme={customTheme}>
            <Stack.Navigator screenOptions={screenOptions}>
              <Stack.Screen name="Init" component={InitScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="SignUp" component={SignUpScreen} />
              <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
              <Stack.Screen name="ChangePW" component={ChangePWScreen} />
              <Stack.Screen name="MainStack">
                {({navigation}) => <MainStack navigation={navigation} />}
              </Stack.Screen>
              <Stack.Screen name="EnrollAgreement" component={EnrollAgreement} />
              <Stack.Screen name="EnrollByOCR" component={EnrollByOCR} />
              <Stack.Screen name="EnrollByScrape" component={EnrollByScrape} />
              <Stack.Screen name="EnrollInfoByOCR" component={EnrollInfoByOCR} />
              <Stack.Screen name="EnrollInfoByHand" component={EnrollInfoByHand} />
              <Stack.Screen name="EnrollInfoByScrape" component={EnrollInfoByScrape} />
              <Stack.Screen name="EnrollReview" component={EnrollReview} />
              <Stack.Screen name="EnrollFinish" component={EnrollFinish} />
              <Stack.Screen name="OCRFail" component={OCRFail} />
              <Stack.Screen name="TicketDetail" component={TicketDetail} />
              <Stack.Screen name="EditInfo" component={EditInfo} />
              <Stack.Screen name="EditReview" component={EditReview} />
              {/* Ticket Link */}
              <Stack.Screen name="OAuthWebView" component={OAuthWebView} />
              <Stack.Screen name="TicketlinkWebView" component={TicketlinkWebView} />

              {/* Dummy */}
              <Stack.Screen name="ShowImageView" component={ShowImageScreen} />
              <Stack.Screen name="ShowContentView" component={ShowContentScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
