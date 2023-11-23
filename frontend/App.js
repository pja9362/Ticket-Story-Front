import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import InitScreen from './src/pages/Auth/Init';
import LoginScreen from './src/pages/Auth/Login';
import SignUpScreen from './src/pages/Auth/SignUp';
import EnrollByOCRAgreement from './src/pages/EnrollTicket/EnrollByOCRAgreement';
import EnrollInfoByHandAgreement from './src/pages/EnrollTicket/EnrollByHandAgreement';
import EnrollInfoByOCR from './src/pages/EnrollTicket/EnrollInfoByOCR';
import EnrollInfoByHand from './src/pages/EnrollTicket/EnrollInfoByHand';
import EnrollReviewByHand from './src/pages/EnrollTicket/EnrollReviewByHand';
import EnrollFinish from './src/pages/EnrollTicket/EnrollFinish';
import OCRFail from './src/pages/EnrollTicket/OCRFail';
import MainStack from './src/navigation/MainStack';

const App = () => {
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={screenOptions}>
            <Stack.Screen name="Init" component={InitScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="MainStack">
              {({navigation}) => <MainStack navigation={navigation} />}
            </Stack.Screen>
            <Stack.Screen
              name="EnrollByOCRAgreement"
              component={EnrollByOCRAgreement}
            />
            <Stack.Screen
              name="EnrollByHandAgreement"
              component={EnrollInfoByHandAgreement}
            />
            <Stack.Screen
              name="EnrollInfoByHand"
              component={EnrollInfoByHand}
            />
            <Stack.Screen
              name="EnrollReviewByHand"
              component={EnrollReviewByHand}
            />
            <Stack.Screen name="EnrollFinish" component={EnrollFinish} />
            <Stack.Screen name="EnrollInfoByOCR" component={EnrollInfoByOCR} />
            <Stack.Screen name="OCRFail" component={OCRFail} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
