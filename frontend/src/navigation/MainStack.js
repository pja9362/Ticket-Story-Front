import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, Image, Dimensions, StyleSheet, Platform} from 'react-native';
import HomeScreen from '../pages/Home';
import TicketBookScreen from '../pages/TicketBook/TicketBook';
import MyScreen from '../pages/My/My';
import BottomSheetMenu from '../components/EnrollTicket/BottomSheetMenu';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import navIcon from '../images/navIcon_ticket.png';
import {scale, verticalScale, moderateScale} from '../utils/sizeUtil'
import NavHeader from '../components/NavHeader';

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const Tab = createBottomTabNavigator();

const CustomTabIcon = ({ focused }) => {
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

  const iconSize = isMainTab ? moderateScale(51) : moderateScale(24);

  return (
    <View
      style={[
        styles.iconContainer,
        isMainTab && styles.mainTabIconContainer,
      ]}
    >
      {iconName === 'ticketIcon' ? (
        <Image source={navIcon} style={{ width: iconSize, height: iconSize, marginBottom: verticalScale(18), marginRight: scale(2)}} />
      ) : (
        iconName === 'home' ? (
          <Octicons name={iconName} size={21} color={'#525252'}/>
        ) : (
          <Icon name={iconName} size={24} color={'#525252'} />
        )
      )}
    </View>
  );
};

const MainStack = ({ navigation }) => {
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
    if (action === 'scrape') navigation.navigate('EnrollByScrape', { action });
    else navigation.navigate('EnrollAgreement', { action });
    closeBottomSheet();
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            height: verticalScale(95),
            backgroundColor: '#fff',
            padding: moderateScale(5),
          },
          tabBarLabelStyle: {
            fontSize: moderateScale(13),
            color: route.name === 'Main' ? '#fff' : '#525252',
            // paddingBottom: verticalScale(15),
            paddingBottom: Platform.OS === 'android' ? verticalScale(35) : verticalScale(10),

            // paddingTop: verticalScale(10),
            fontFamily: 'Pretendard-Bold',
          },
          tabBarIcon: ({ focused }) => (
            <CustomTabIcon focused={focused} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <Text style={{ color }}>{focused ? 'Active' : 'Inactive'}</Text>
          ),
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ headerShown: false, tabBarLabel: '홈' }}
          component={TicketBookScreen}
        />

        <Tab.Screen
          name="Main"
          options={{ headerShown: false, tabBarLabel: '티켓 등록' }}
          component={MainBackground}
          listeners={() => ({
            tabPress: e => {
              e.preventDefault();
              openBottomSheet();
            },
          })}
        />

        <Tab.Screen
          name="Profile"
          options={{ headerShown: false, tabBarLabel: '나의 통계' }}
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

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Platform.OS === 'android' ? scale(1) : 0
  },
  mainTabIconContainer: {
    width: moderateScale(78),
    height: moderateScale(78),
    marginTop: verticalScale(10),
    borderRadius: moderateScale(38),
    backgroundColor: '#565656',
  },
});

export default MainStack;
