import React, {useEffect, useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../../components/CustomText';
import Header from '../../../components/Header';
import {scale, verticalScale, moderateScale} from '../../../utils/sizeUtil'
import analytics from '@react-native-firebase/analytics';

const NoticeContent = ({route}) => {

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [date, setDate] = useState('');
  
  useEffect(() => {
    if (route.params.gotNoticeDetails) {
      setTitle(route.params.gotNoticeDetails.noticeTitle);
      setDetail(route.params.gotNoticeDetails.noticeDetails);
      setDate(route.params.gotNoticeDetails.createdDate);
    }
  }, [route.params]);

  useEffect(() => {
    analytics().logScreenView({
      screen_name: '공지사항-{{'+route.params.gotNoticeDetails.noticeTitle+'}}',
      screen_class: 'menu'
    })
  }, [])

  return (
    <View style={styles.container}>
    <Header title='공지사항'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
        <CustomText style={styles.menuText} fontWeight="bold">{title}</CustomText>
    </View>
    <View style={{marginLeft: scale(270)}}>
        <CustomText style={styles.menuTextDate}>{date}</CustomText>
    </View>
    <View>
        <CustomText style={styles.textContent}>
          {detail}
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
    padding: moderateScale(20),
    paddingTop: 0
  },
  menuText: {
    marginTop: verticalScale(20),
    marginBottom: verticalScale(18),
    fontSize: scale(20),
    color: '#525252',
  },
  menuTextDate: {
    fontSize: scale(14),
    color: '#525252',
    marginBottom: verticalScale(30),
  },
  textContent: {
    fontSize: scale(16),
    color: '#525252',
    lineHeight: verticalScale(22)
  } 
});

export default NoticeContent;
