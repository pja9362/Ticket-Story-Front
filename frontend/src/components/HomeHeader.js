import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Header = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Ionicons name="search" size={30} color="black" />
      </TouchableOpacity>
      <TouchableOpacity>
        < MaterialCommunityIcons name="bell-outline" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
});

export default Header;
