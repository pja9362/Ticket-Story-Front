import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import iconHamburger from '../images/icon_hamburger.png';
import iconHamburger from '../images/icon_hamburger.png';
import iconTutorial from '../images/icon_tutorial.png';
import logo from '../images/logo_navHeader.png';
import { DrawerActions } from '@react-navigation/native';

// const NavHeader = () => {
const NavHeader = () => {
  const navigation = useNavigation();

  const handleHamburger = () => {
    console.log(navigation)
    // console.log(navigation.dispatch(DrawerActions))
    navigation.openDrawer();
    // navigation.dispatch(DrawerActions.openDrawer());
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width: 30}} onPress={handleHamburger}>
        {/* <Image source={iconHamburger} style={{width: 21, height: 18}}/> */}
        <Image source={iconHamburger} style={{width: 25, height: 22}}/>
      </TouchableOpacity>
      <Image source={logo} style={{width: 131, height: 44, marginBottom: 10, marginLeft: 20}}/>
      <TouchableOpacity style={{width: 30, alignItems: 'flex-end'}}>
        <Image source={iconTutorial} style={{width: 24, height: 24}}/>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default NavHeader;
