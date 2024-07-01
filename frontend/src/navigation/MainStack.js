import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image} from 'react-native';
import HomeScreen from '../pages/Home';
import TicketBookScreen from '../pages/TicketBook/TicketBook';
import MyScreen from '../pages/My/My';
import BottomSheetMenu from '../components/EnrollTicket/BottomSheetMenu';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import navIcon from '../images/navIcon_ticket.png';

import NavHeader from '../components/NavHeader';

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ focused}) => {
  const route = useRoute();
  const isMainTab = route.name === 'Main';

  let iconName;

  if (route.name === 'Home') {
    iconName = focused ? 'home-filled' : 'home';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person-outline';
  } else {
    iconName = 'ticketIcon';
  }

  return (
    <View
      style={{
        width: isMainTab ? 76 : 24,
        height: isMainTab ? 76 : 24,
        borderRadius: isMainTab ? 38 : 0,
        backgroundColor: isMainTab ? '#565656' : 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {
        iconName === 'ticketIcon' ?
          <Image source={navIcon} color={'#fff'} style={{width: 51, height: 51, marginBottom: 12}} />
        :
        (
          iconName === 'home' ?
          <Octicons name={iconName} size={21} color={'#525252'} /> :
          <Icon name={iconName} size={24} color={'#525252'} />
        )
      }
    </View>
  );
};

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

  const onClick = (action) => {
    if (action === 'scrape') navigation.navigate('EnrollByScrape', {action});
    else navigation.navigate('EnrollAgreement', { action });
    closeBottomSheet();
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: 90,
            backgroundColor: '#fff',
            padding: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            color: route.name == 'Main' ? '#fff' : '#525252',
            paddingBottom: 10,
            fontFamily: 'Pretendard-Bold'
          },
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon focused={focused} />
          ),
          tabBarLabel: ({focused, color}) => (
            <Text style={{color}}>{focused ? 'Active' : 'Inactive'}</Text>
          ),
          // headerShown: route.name === 'Home', // TicketBookScreen에서만 NavHeader 보이기
          // navigation: navigation, // navigation을 전달
        })}>

        <Tab.Screen
          name="Home"
          options={{headerShown: false, tabBarLabel: '홈'}}
          component={TicketBookScreen}
        />

        <Tab.Screen
          name="Main"
          options={{headerShown: false, tabBarLabel: '티켓 등록'}}
          component={MainBackground}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              openBottomSheet();
            },
          })}
        />

        {/* Icon : person-outline*/}
        <Tab.Screen
          name="Profile"
          options={{headerShown: false, tabBarLabel: '나의 통계'}}
          component={MyScreen}
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
