import React, {useEffect, useState} from 'react';
import { SafeAreaView, Dimensions, View, TouchableOpacity, Text, StyleSheet, Image, ScrollView, ImageBackground, Platform } from 'react-native';
import {CustomText} from '../components/CustomText';
import Header from '../components/Header';
import paperTicket from '../images/paper_ticket.png';
import {scale, verticalScale, moderateScale} from '../utils/sizeUtil'


const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const ShowPaper = ({route}) => {

  const { ticketData } = route.params;

  const [artRating, setArtRating] = useState(ticketData.ratingDetails.contentsRating);
  const [seatRating, setSeatRating] = useState(ticketData.ratingDetails.seatRating);
  const [title, setTitle] = useState(ticketData.contentsDetails.title);
  const [date, setDate] = useState(ticketData.contentsDetails.date);
  const [time, setTime] = useState(ticketData.contentsDetails.time);
  const [location, setLocation] = useState(ticketData.contentsDetails.location);
  const [locationDetail, setLocationDetail] = useState(ticketData.contentsDetails.locationDetail);
  const [seats, setSeats] = useState(ticketData.contentsDetails.seats);
  const [category, setCategory] = useState(ticketData.category==='MOVIE' ? '영화' : ticketData.category==='PERFORMANCE' ? '공연' : '스포츠');
  const [categoryDetail, setCategoryDetail] = useState(
    ticketData.categoryDetail === 'MUSICAL' ? '・뮤지컬' :
    ticketData.categoryDetail === 'PLAY' ? '・연극' :
    ticketData.categoryDetail === 'PERFORMANCE' ? '・기타' :
    ticketData.categoryDetail === 'SOCCER' ? '・축구' :
    ticketData.categoryDetail === 'BASEBALL' ? '・야구' :
    ticketData.categoryDetail === 'ETC' ? '・기타' : 
    ''
  );

  const getFilledBarStyle = (score) => ({
    height: '100%',
    width: `${score}%`, 
    backgroundColor: '#525252', 
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  });

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
          <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
            <Header title="관람 세부 정보 보기" />
          </View> 
          <ScrollView 
            style={styles.cardContainer}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: Platform.OS ==='android' ? verticalScale(20) : null}}
          >
            <View style={styles.paperContainer}>
              <ImageBackground source={paperTicket} style={styles.image}>
                <View style={styles.titleContainer}>
                  <CustomText style={styles.title} fontWeight="extrabold"> {title} </CustomText>
                  <CustomText style={styles.info} fontWeight="extrabold"> {category} {categoryDetail} </CustomText>
                </View>
                <View style={styles.infoContainer}>
                  <CustomText style={styles.about} fontWeight="medium"> 관람일시 </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> {date}  {time} </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 관람장소 </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> {location} </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 관람장소 (세부) </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> {locationDetail} </CustomText>
                  <CustomText style={styles.about} fontWeight="medium"> 관람좌석 </CustomText>
                  <CustomText style={styles.ticketData} fontWeight="bold"> {seats} </CustomText>
                </View>
                <View style={styles.rateContainer}>
                  <CustomText style={styles.about} fontWeight="medium"> 나의 콘텐츠 평점 </CustomText>
                  <View style={styles.barRow}>
                    <View style={styles.bar}>
                      <View style={getFilledBarStyle(artRating)} />
                    </View>
                    <CustomText style={styles.scoreText} fontWeight="bold"> {artRating} </CustomText>
                  </View>
                  <CustomText style={styles.about} fontWeight="medium"> 나의 좌석 평점 </CustomText>
                  <View style={styles.barRow}>
                    <View style={styles.bar}>
                      <View style={getFilledBarStyle(seatRating)} />
                    </View>
                    <CustomText style={styles.scoreText} fontWeight="bold"> {seatRating} </CustomText>
                  </View>
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
    backgroundColor: '#EEEEEE',
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
  bar: {
    height: verticalScale(9),
    width: '80%',
    backgroundColor: '#D9D9D9',
    borderRadius: 5,
    marginLeft: scale(4),
    marginBottom: scale(30),
    // flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: scale(24),
    color: '#525252',
    right: scale(2),
    // textAlign: 'center',
    flexWrap: 'wrap',
    // marginVertical: verticalScale(5), // Adjust vertical margin to handle wrapping
  },
  info: {
    fontSize: scale(16),
    color: '#525252',
    marginTop: verticalScale(10),
  },
  titleContainer: {
    marginLeft: scale(30),
    marginVertical: Platform.OS === 'ios' ? verticalScale(100) : verticalScale(100),
    height: imageHeight*0.3,
    flex: 1,
    justifyContent: 'center', // Center vertically
  },
  infoContainer: {
    marginLeft: scale(30),
    top: Platform.OS === 'ios' ? verticalScale(15) : verticalScale(23),
    marginVertical: Platform.OS === 'ios' ? verticalScale(-60) : verticalScale(-80),
    flex: 3.6,
  },
  rateContainer: {
    marginHorizontal: scale(30),
    marginVertical: verticalScale(90),
    flex: 0.75,
  },
  about:{
    color: '#525252',
    fontSize: scale(16),
    marginBottom: verticalScale(10),
  },
  ticketData: {
    color: '#525252',
    fontSize: scale(16),
    marginBottom: scale(20),
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginBottom: verticalScale(5),
  },
  scoreText: {
    position: 'absolute',
    color: '#525252',
    fontSize: scale(24),
    marginLeft: scale(14),
    width: scale(40),
    // lineHeight: verticalScale(9),
    right: scale(5),
    paddingBottom: verticalScale(30),
    // marginBottom: verticalScale(14),
  },
});

export default ShowPaper;
