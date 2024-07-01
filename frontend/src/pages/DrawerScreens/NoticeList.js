import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation  } from '@react-navigation/native';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';

const NoticeList = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
    <Header title='공지사항'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.navigate('NoticeContent02')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="bold">개인정보취급방침 변경 안내</CustomText>
        <CustomText style={styles.menuTextDate}>2024.07.01</CustomText>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('NoticeContent01')} style={styles.menuItem}>
        <CustomText style={styles.menuText} fontWeight="bold">티켓스토리 베타서비스 시행 안내</CustomText>
        <CustomText style={styles.menuTextDate}>2024.07.01</CustomText>
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
    paddingLeft: 10,
    marginTop: 20,
    paddingBottom: 14,
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
  menuTextDate: {
    fontSize: 13,
    color: '#525252',
  }
});

export default NoticeList;
