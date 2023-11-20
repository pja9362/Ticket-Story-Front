import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import HomeScreen from '../pages/Home';
import MainScreen from '../pages/Main';
import EnrollByOCRAgreement from '../pages/EnrollTicket/EnrollByOCRAgreement';
import EnrollByHandAgreement from '../pages/EnrollTicket/EnrollByHandAgreement';

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

const MainStack = () => {
  return (
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
        component={EnrollByHandAgreement}
      />
      <Tab.Screen
        name="Main"
        options={{headerShown: false, tabBarLabel: ''}}
        component={MainScreen}
      />
      <Tab.Screen
        name="Community"
        options={{headerShown: false, tabBarLabel: '게시판'}}
        component={EnrollByOCRAgreement}
      />
      <Tab.Screen
        name="Profile"
        options={{headerShown: false, tabBarLabel: '프로필'}}
        component={HomeScreen}
      />
    </Tab.Navigator>
  );
};

export default MainStack;