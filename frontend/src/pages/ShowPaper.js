import React, {useEffect, useState} from 'react';
import { SafeAreaView, Dimensions, View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, ImageBackground } from 'react-native';
import {CustomText} from '../components/CustomText';
import Header from '../components/Header';
import paperTicket from '../images/paper_ticket.png';
import {scale, verticalScale, moderateScale} from '../utils/sizeUtil'

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const ShowPaper = ({route}) => {

  const [title, setTitle] = useState('');
  const [detail, setDetail] = useState('');
  const [date, setDate] = useState('');


  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
          <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
            <Header title="관람 세부 정보 보기" />
          </View> 
          <ScrollView style={styles.cardContainer}>
            <View style={styles.paperContainer}>
              <ImageBackground source={paperTicket} style={styles.image}>
                <View style={styles.titleContainer}>
                  <CustomText style={styles.title} fontWeight="extrabold"> 노량 </CustomText>
                  <CustomText style={styles.info} fontWeight="extrabold"> 영화・2022・김한민 </CustomText>
                </View>
                <View style={styles.infoContainer}>
                  <CustomText style={styles.about} fontWeight="medium"> 관람일시 </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> 2024.02.12 18:00 </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 관람장소 </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> CGV 용산아이파크몰 </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 관람장소 (세부) </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> 박찬욱관 </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 관람좌석 </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> E열 12번 </CustomText>
                </View>
                <View style={styles.rateContainer}>
                  <CustomText style={styles.about} fontWeight="medium"> 나의 콘텐츠 평점 </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 나의 좌석 평점 </CustomText>
                </View>
              </ImageBackground>
            </View>
          </ScrollView>
      </SafeAreaView>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  cardContainer: {
    paddingLeft: scale(17),
    paddingTop: scale(10),
    // padding: 17,
    flex: 1,
  },
  paperContainer: {
    width: scale(356),
    height: scale(712),
    marginVertical: verticalScale(10),
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: scale(24),
    color: '#525252',
  },
  info: {
    fontSize: scale(16),
    color: '#525252',
    marginTop: verticalScale(10),
  },
  titleContainer: {
    marginLeft: scale(30),
    marginVertical: verticalScale(110),
    height: imageHeight*0.3,
    // backgroundColor:'red',
  },
  infoContainer: {
    marginLeft: scale(30),
    marginVertical: verticalScale(-55),
  },
  about:{
    color: '#525252',
    fontSize: scale(16),
    marginBottom: scale(10),
  },
  ticketData: {
    color: '#525252',
    fontSize: scale(16),
    marginBottom: scale(20),
  },
  rateContainer: {
    marginLeft: scale(30),
    marginVertical: verticalScale(105),
  }
});

export default ShowPaper;
