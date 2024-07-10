// import React from 'react';
// import React, {useEffect} from 'react';
import React, {useEffect, useState} from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './src/store';
// import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {NavigationContainer, DefaultTheme, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import { Text, TextInput, StatusBar } from 'react-native';
import { setCustomText, setCustomTextInput } from 'react-native-global-props';
import {createDrawerNavigator} from '@react-navigation/drawer';

import InitScreen from './src/pages/Auth/Init';
import LoginScreen from './src/pages/Auth/Login';
import SignUpScreen from './src/pages/Auth/SignUp';
import FindPasswordScreen from './src/pages/Auth/FindPassword';
import ChangePWScreen from './src/pages/Auth/ChangePW';
import ChangePWFinish from './src/pages/Auth/ChangePWFinish';
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
import EditFinish from './src/pages/EnrollTicket/EditFinish';
import CustomDrawerContent from './src/pages/CustomDrawerContent';

// dummy
import ShowImageScreen from './src/pages/ShowImage';
import ShowContentScreen from './src/pages/ShowContent';

import NoticeList from './src/pages/DrawerScreens/NoticeList';
import NoticeContent from './src/pages/DrawerScreens/ContentScreens/NoticeContent';
import NoticeContent01 from './src/pages/DrawerScreens/ContentScreens/NoticeContent01';
import NoticeContent02 from './src/pages/DrawerScreens/ContentScreens/NoticeContent02';
import AskScreen from './src/pages/DrawerScreens/AskScreen';
import ServiceScreen from './src/pages/DrawerScreens/ServiceScreen';
import PrivacyScreen from './src/pages/DrawerScreens/PrivacyScreen';
import LicenseList from './src/pages/DrawerScreens/LicenseList';
import AbslContent from './src/pages/DrawerScreens/ContentScreens/AbslContent';
import ActivityContent from './src/pages/DrawerScreens/ContentScreens/ActivityContent';
import ChangePassword from './src/pages/DrawerScreens/ChangePassword';
import ResignScreen from './src/pages/DrawerScreens/ResignScreen';
import ResignReason from './src/pages/DrawerScreens/ResignReason';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  const navigationRef = useNavigationContainerRef();
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const initialNavState = {
      routes: [
        {
          name: 'MainStackWithDrawer',
          state: {
            routes: [
              {
                name: 'Init'
              }
            ]
          }
        },
        {
          name: 'Init'
        }
      ]
    };

    setInitialState(initialNavState);
    setIsReady(true);
  }, []);

  // useEffect(() => {
  //   const customTextProps = {
  //     style: {
  //       fontFamily: "Pretendard-Bold",
  //     },
  //   };

  //   const customTextInputProps = {
  //     style: {
  //       fontFamily: 'Pretendard',
  //     },
  //   };

  //   setCustomText(customTextProps);
  //   setCustomTextInput(customTextInputProps);
  // }, []);

  const screenOptions = {
    headerShown: false
  };

  // const customTheme = {
  //   ...DefaultTheme,
  //   fonts: {
  //     black: 'Pretendard-Black',
  //     bold: 'Pretendard-Bold',
  //     extraBold: 'Pretendard-ExtraBold',
  //     regular: 'Pretendard-Regular',
  //     medium: 'Pretendard-Medium',
  //     light: 'Pretendard-Light',
  //     thin: 'Pretendard-Thin',
  //   },
  // };


  const MainStackWithDrawer = () => (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false, drawerStyle: {width: '100%'} }}
    >
      <Drawer.Screen name="MainStack" component={MainStack} />
      {/* 추가적인 Drawer 항목들 */}
    </Drawer.Navigator>
  );

  if (!isReady) {
    return null; // 로딩 스피너를 추가할 수 있습니다.
  }


  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      <SafeAreaView edges={['top']} style={{flex: 1, backgroundColor: '#ffffff'}}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer initialState={initialState} ref={navigationRef}>
              <Stack.Navigator screenOptions={screenOptions}>
                <Stack.Screen name="Init" component={InitScreen} options={{ gestureEnabled: false }}/>
                <Stack.Screen name="MainStackWithDrawer" component={MainStackWithDrawer} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="FindPassword" component={FindPasswordScreen} />
                <Stack.Screen name="ChangePW" component={ChangePWScreen} />
                <Stack.Screen name="ChangePWFinish" component={ChangePWFinish} />
                {/* <Stack.Screen name="MainStack">
                  {({navigation}) => <MainStack navigation={navigation} />}
                </Stack.Screen> */}
                {/* <Stack.Screen name="MainStackWithDrawer" component={MainStackWithDrawer} /> */}
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
                <Stack.Screen name="EditFinish" component={EditFinish} />


                {/* Ticket Link */}
                <Stack.Screen name="OAuthWebView" component={OAuthWebView} />
                <Stack.Screen name="TicketlinkWebView" component={TicketlinkWebView} />

                {/* Dummy */}
                <Stack.Screen name="ShowImageView" component={ShowImageScreen} />
                <Stack.Screen name="ShowContentView" component={ShowContentScreen} />

                <Stack.Screen name="NoticeList" component={NoticeList} />
                <Stack.Screen name="NoticeContent" component={NoticeContent} />
                <Stack.Screen name="NoticeContent01" component={NoticeContent01} />
                <Stack.Screen name="NoticeContent02" component={NoticeContent02} />
                <Stack.Screen name="AskScreen" component={AskScreen} />
                <Stack.Screen name="ServiceScreen" component={ServiceScreen} />
                <Stack.Screen name="PrivacyScreen" component={PrivacyScreen} />
                <Stack.Screen name="LicenseList" component={LicenseList} />
                <Stack.Screen name="AbslContent" component={AbslContent} />
                <Stack.Screen name="ActivityContent" component={ActivityContent} />
                <Stack.Screen name="ChangePassword" component={ChangePassword} />
                <Stack.Screen name="ResignScreen" component={ResignScreen} />
                <Stack.Screen name="ResignReason" component={ResignReason} />

              </Stack.Navigator>
        
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
