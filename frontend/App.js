import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
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

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Init"
          options={{headerShown: false}}
          component={InitScreen}
        />
        <Stack.Screen
          name="Login"
          options={{headerShown: false}}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{headerShown: false}}
          component={SignUpScreen}
        />
        <Stack.Screen name="MainStack" options={{headerShown: false}}>
          {({navigation}) => <MainStack navigation={navigation}/>}
        </Stack.Screen>

        <Stack.Screen
          name="EnrollByOCRAgreement"
          options={{headerShown: false}}
          component={EnrollByOCRAgreement}
        />
        <Stack.Screen
          name="EnrollByHandAgreement"
          options={{headerShown: false}}
          component={EnrollInfoByHandAgreement}
        />
        <Stack.Screen
          name="EnrollInfoByHand"
          options={{headerShown: false}}
          component={EnrollInfoByHand}
        />
        <Stack.Screen
          name="EnrollReviewByHand"
          options={{headerShown: false}}
          component={EnrollReviewByHand}
        />
        <Stack.Screen
          name="EnrollFinish"
          options={{headerShown: false}}
          component={EnrollFinish}
        />
        <Stack.Screen
          name="EnrollInfoByOCR"
          options={{headerShown: false}}
          component={EnrollInfoByOCR}
        />
        <Stack.Screen
          name="OCRFail"
          options={{headerShown: false}}
          component={OCRFail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
