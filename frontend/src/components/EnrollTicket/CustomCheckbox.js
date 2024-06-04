import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import iconChecked from '../../images/icon_check.png';
import iconUnchecked from '../../images/icon_uncheck.png';

const CustomCheckbox = ({ checked, onPress, label}) => {
  return (
    <View style={{alignItems: 'center', display: 'flex', flexDirection: 'row', marginLeft: 10}}>
        <TouchableOpacity style={styles.checkboxButton} onPress={onPress}>
            <Image source={checked ? iconChecked : iconUnchecked} style={styles.checkboxImage} />
        </TouchableOpacity>
        <Text style={styles.checkboxText}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  checkboxButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxImage: {
    width: 15, 
    height: 15, 
    marginRight: 4,
  },
  checkboxText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#525252',
  },
});

export default CustomCheckbox;
