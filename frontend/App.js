import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import InitScreen from './src/pages/Auth/Init';
import LoginScreen from './src/pages/Auth/Login';
import SignUpScreen from './src/pages/Auth/SignUp';
import HomeScreen from './src/pages/Home';
import MainScreen from './src/pages/Main';


import EnrollInfoByHandAgreement from './src/pages/EnrollTicket/EnrollByHandAgreement';
import EnrollInfoByHand from './src/pages/EnrollTicket/EnrollInfoByHand';
import EnrollReviewByHand from './src/pages/EnrollTicket/EnrollReviewByHand';

const App = () => {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const CustomTabIcon = ({focused}) => (
    <View
      style={{
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: focused ? '#565656' : '#B6B6B6',
      }}
    />
  );

  const MainStack = () => (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          height: 90,
          backgroundColor: '#EAEAEA',
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          color: '#000',
          paddingBottom: 18,
        },
        tabBarIcon: ({focused}) => <CustomTabIcon focused={focused} />,
        tabBarLabel: ({focused, color}) => (
          <Text style={{color}}>{focused ? 'Active' : 'Inactive'}</Text>
        ),
      })}>
      <Tab.Screen
        name="Home"
        options={{headerShown: false, tabBarLabel: '홈'}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="TicketBook"
        options={{headerShown: false, tabBarLabel: '티켓북'}}
        component={EnrollInfoByHandAgreement}
      />
      <Tab.Screen
        name="Main"
        options={{headerShown: false, tabBarLabel: ''}}
        component={MainScreen}
      />
      <Tab.Screen
        name="Community"
        options={{headerShown: false, tabBarLabel: '게시판'}}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{headerShown: false, tabBarLabel: '프로필'}}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );

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
          {() => <MainStack />}
        </Stack.Screen>

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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
