import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text} from 'react-native';
import HomeScreen from '../pages/Home';
import MainScreen from '../pages/Main';
import EnrollByOCRAgreement from '../pages/EnrollTicket/EnrollByOCRAgreement';
import EnrollByHandAgreement from '../pages/EnrollTicket/EnrollByHandAgreement';
import BottomSheetMenu from '../components/EnrollTicket/BottomSheetMenu';

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

const MainStack = ({navigation}) => {

  const MainBackground = () => {
    return (
      <View />
    );
  };

  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
  };

  const onClick = (page) => {
    navigation.navigate(page);
    closeBottomSheet();
  }

  return (
    <>
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
          component={HomeScreen}
        />
        <Tab.Screen
          name="Main"
          options={{headerShown: false, tabBarLabel: ''}}
          component={MainBackground}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              openBottomSheet();
            },
          })}
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

      {bottomSheetVisible && (
        <BottomSheetMenu
          closeBottomSheet={closeBottomSheet}
          onClick={onClick}
        />
      )}
    </>
  );
};

export default MainStack;
