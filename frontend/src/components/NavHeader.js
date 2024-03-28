import React from 'react';
import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import iconHamburger from '../images/icon_hamburger.png';
import iconTutorial from '../images/icon_tutorial.png';
import logo from '../images/logo_navHeader.png';

const NavHeader = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{width: 30}}>
        <Image source={iconHamburger} style={{width: 21, height: 16}}/>
      </TouchableOpacity>
      <Image source={logo} style={{width: 131, height: 44}}/>
      <TouchableOpacity style={{width: 30, alignItems: 'flex-end'}}>
        <Image source={iconTutorial} style={{width: 22, height: 22}}/>
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
