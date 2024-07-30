import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';

const LicenseList = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Header title='오픈소스 라이선스'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('IconoirLicense')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">Iconoir</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('IconParkLicense')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">IconPark</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('MicrosoftLicense')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">Microsoft Corporation</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('PictogramLicense')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="medium">Pictogrammers</CustomText>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </View>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0
  },
  menuItem: {
    paddingLeft: 8,
    marginTop: 12,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius : 5, 
    borderBottomEndRadius : 5, 
  },
  menuText: {
    marginBottom: 8,
    fontSize: 16,
    color: '#525252',
  },
});

export default LicenseList;
