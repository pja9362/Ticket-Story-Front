import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import backButton from '../images/back_button.png';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {CustomText} from './CustomText';

const Header = ({title = '', icon, onIconClick, backDestination, backParams, backClick}) => {
  const navigation = useNavigation();

  const onBackClick = () => { 

    if (backClick) {
      backClick();
      return;
    }

    if (backDestination) {
      navigation.navigate(backDestination, backParams);
    } else {
      navigation.goBack();
    }

  };

  // const routeState = useNavigationState(state => state);

  // useEffect(() => {
  //   console.log('Current route stack:', routeState.routes);
  // },[]);


  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackClick}>
        {/* <Icon name="chevron-back-sharp" size={20} color="black" /> */}
        <Image source={backButton} style={{width: 28, height: 28}}/>
      </TouchableOpacity>
      <View style={styles.titleContainer} pointerEvents="none">
        <CustomText style={styles.title} fontWeight="bold">{title}</CustomText>
      </View>
      {icon === '' ? (
        <TouchableOpacity onPress={onIconClick}>
          <Icon name={icon} size={20} color="black" />
          <Text>Icon</Text>
        </TouchableOpacity>
      ) : (
        <View width={20} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',  
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#525252',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    // backgroundColor: 'red'
  },
});

export default Header;
