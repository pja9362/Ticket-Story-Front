import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../../components/CustomText';
import Header from '../../../components/Header';

const NoticeContent01 = () => {

  return (
    <View style={styles.container}>
    <Header title='공지사항'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
        <CustomText style={styles.menuText} fontWeight="bold">티켓스토리 베타서비스 시행 안내</CustomText>
    </View>
    <View style={{marginLeft: 280}}>
        <CustomText style={styles.menuTextDate}>2024.07.01</CustomText>
    </View>
    <View>
        <CustomText style={styles.textcontent}>
          축축 {'\n'}
          테스트 {'\n'}
          d dㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
          😍🙏
        </CustomText>
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
    borderBottomStartRadius : 10, 
    borderBottomEndRadius : 10, 
  },
  menuText: {
    marginTop: 20,
    marginBottom: 18,
    fontSize: 20,
    color: '#525252',
  },
  menuTextDate: {
    fontSize: 14,
    color: '#525252',
    marginBottom: 30,
  },
  textcontent: {
    fontSize: 16,
    color: '#525252',
    lineHeight: 22
  } 
});

export default NoticeContent01;
