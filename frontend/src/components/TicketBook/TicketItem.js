import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, TouchableOpacity, Image, Modal, Button, Platform} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import movieTicket from '../../images/ticket_info_movie.png';
import performanceTicket from '../../images/ticket_info_performance.png';
import sportsTicket from '../../images/ticket_info_sports.png';
import playTicket from '../../images/ticket_info_play.png';
import musicalTicket from '../../images/ticket_info_musical.png';

import movieBasicTicket from '../../images/ticket_default_poster_movie2.png';
import performanceBasicTicket from '../../images/ticket_default_poster_performance2.png';
import sportsBasicTicket from '../../images/ticket_default_poster_sports2.png';

import iconReviewOn from '../../images/icon_ReviewOn.png';
import iconReviewOff from '../../images/icon_ReviewOff.png';
import iconEdit from '../../images/icon_dots.png';

import { deleteTicket, getTicketDetails } from '../../actions/ticket/ticket';
import {CustomText} from '../CustomText';

import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const TicketItem = ({ category, title, date, time, location, seat, contentsRating, seatRating, imageUrl = null, ticketId, reviewId, deleteTicketById, reviewExists}) => {
  const navigation = useNavigation();

  let ticketImageSource;
  let basicTicketImageSource;
  switch (category) {
    case 'movie':
    case 'MOVIE':
      ticketImageSource = movieTicket;
      basicTicketImageSource = movieBasicTicket;
      break;
    case 'performance':
    case 'PERFORMANCE':
      ticketImageSource = performanceTicket;
      basicTicketImageSource = performanceBasicTicket;
      break;
    case 'sports':
    case 'SPORTS':
      ticketImageSource = sportsTicket;
      basicTicketImageSource = sportsBasicTicket;
      break;
    case 'play':
    case 'PLAY':
      ticketImageSource = playTicket;
      basicTicketImageSource = performanceBasicTicket;
      break;
    case 'musical':
    case 'MUSICAL':
      ticketImageSource = musicalTicket;
      basicTicketImageSource = performanceBasicTicket;
      break;
  }

  const [isFront, setIsFront] = useState(true);
  const [dropdownVisible, setDropdownVisible] = useState(false); //
  const [modalVisible, setModalVisible] = useState(false); //
  const [makeCardVisible, setMakeCardVisible] = useState(false); //
  const animation = useRef(new Animated.Value(0)).current;


  const handlePress = () => {
    if (!dropdownVisible) {
      setIsFront(!isFront);
      Animated.timing(animation, {
        toValue: isFront ? 180 : 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
    setDropdownVisible(false);
    }
  };
  

  const handleReviewClick = () => {
    navigation.navigate('TicketDetail', {
      ticketId: ticketId,
      title : title,
      date : date,
      time : time,
      location : location
     });
  };

  const handleIconEditClick = () => {
    setDropdownVisible(!dropdownVisible);
    console.log('click');
  };


  const handleIconDelete = async() => {
    const deleteTicketData = {
      ticketId: ticketId
    };
  
    try {
      console.log("Deleting ticket with data:", deleteTicketData);
      const response = await deleteTicket(deleteTicketData);
      if (response && response.result) {
        deleteTicketById(ticketId); // Assuming this is a valid function to remove from state
        setDropdownVisible(false);
        setModalVisible(false);
        console.log("Dropdown and Modal visibility set to false");
      } else {
        alert('Failed to delete ticket.');
      }
      
      console.log('Deleted ticket response:', response);
    } catch (error) {
      console.error('Error deleting ticket:', error.message || error);
      alert('An error occurred while deleting the ticket.');
    }
  };  

  const handleInfoEdit = async() => {
    const editInfo = {
      ticketId : ticketId
    }
    try {
      const response = await getTicketDetails(editInfo);
      if (response !== null) {
        setDropdownVisible(false);
        console.log("성공", response);
        
        //navigate 하면서 response 값들 보내야함
        navigation.navigate('EditInfo', {
          ticketId : ticketId,
          ticketData : response
        });

      } else {
        alert('Fail');
      }
    } catch (error) {
      console.error('Error Editing ticket info:', error.response);
    }
  }

  const handleReviewEdit = async() => {
    const editReview = {
      ticketId : ticketId
    }
    try {
      setMakeCardVisible(false);
      const response = await getTicketDetails(editReview);
      if (response !== null) {
        setDropdownVisible(false);
        console.log("성공", response);
        
        //navigate 하면서 response 값들 보내야함
        navigation.navigate('EditReview', {
          ticketId : ticketId,
          ticketData : response,
          reviewId : reviewId
         });

      } else {
        alert('Fail');
      }
    } catch (error) {
      console.error('Error Editing ticket review:', error.response);
    }
  }

  const closeDropdown = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  const frontInterpolate = animation.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const backInterpolate = animation.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };


  return (
    <>
      <TouchableWithoutFeedback onPress={closeDropdown}>
        <View>
          <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.card}>
              <Animated.View style={[styles.cardContainer, frontAnimatedStyle, imageUrl && styles.imageCard]}>
                <ImageBackground 
                  source={imageUrl ? { uri: imageUrl } : basicTicketImageSource} 
                  style={imageUrl ? styles.posterBackground : styles.imageBackground}
                >          

                  {imageUrl == null || imageUrl == "" && (
                    <CustomText style={styles.backTitle} fontWeight="bold">{title}</CustomText>
                  )}  

                </ImageBackground>
              </Animated.View>
              <Animated.View style={[styles.cardContainer, styles.back, backAnimatedStyle]}>
                <ImageBackground source={ticketImageSource} style={styles.imageBackground}>
                  <View style={styles.overlay}>
                    <CustomText numberOfLines={2} style={styles.title} fontWeight="bold">{title}</CustomText>
                    <View style={styles.infoContainer}>
                      <CustomText numberOfLines={1} style={styles.info} fontWeight="semibold">{date}</CustomText>
                      <CustomText numberOfLines={1} style={[styles.info, { marginTop: Platform.OS === 'android' ? verticalScale(1) : verticalScale(4) }]} fontWeight="semibold">{time}</CustomText>
                      <CustomText numberOfLines={1} style={[styles.info, { marginTop: Platform.OS === 'android' ? verticalScale(1) : verticalScale(4) }]} fontWeight="semibold">{location}</CustomText>
                      <CustomText numberOfLines={1} style={[styles.info, { marginTop: Platform.OS === 'android' ? verticalScale(1) : verticalScale(4) }]} fontWeight="semibold">{seat}</CustomText>
                    </View>
                    <View style={styles.bottomContainer}>
                      <CustomText numberOfLines={1} style={[styles.info, { fontSize: scale(15), marginTop: verticalScale(6), textAlign: 'center' }]} fontWeight="bold">{contentsRating}</CustomText>
                    </View>
                    <View style={styles.bottomContainer}>
                      <CustomText numberOfLines={1} style={[styles.info, { fontSize: scale(15), top: verticalScale(13), textAlign: 'center' }]} fontWeight="bold">{seatRating}</CustomText>
                    </View>
                    <View style={styles.buttonContainer}>
                      <TouchableOpacity 
                        // onPress={reviewId !== 0 ? handleReviewClick : () => setMakeCardVisible(true)}
                        onPress={reviewExists ? handleReviewClick : () => setMakeCardVisible(true)}
                        style={[styles.reviewButton, { opacity: !isFront ? 1 : 0 }]}
                        // activeOpacity={reviewId !== 0 ? 0.2 : 1} // 터치 가능한 경우 activeOpacity 적용
                        activeOpacity={reviewExists ? 0.2 : 1} 
                        disabled={isFront} // isFront이 true일 때 버튼 비활성화
                      >
                        <Image 
                          // source={reviewId === 0 ? iconReviewOff : iconReviewOn}
                          source={reviewExists ? iconReviewOn : iconReviewOff}
                          // style={{width: scale(50), height: verticalScale(50)}}
                          style={{width: moderateScale(50), height: moderateScale(50)}}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </ImageBackground>
              </Animated.View>
            </View>
          </TouchableWithoutFeedback>

          <Animated.View style={[styles.editButton, frontAnimatedStyle, { opacity: isFront ? 1 : 0 }]}>
            <TouchableOpacity onPress={handleIconEditClick} disabled={!isFront}>
              <Image 
                source={iconEdit} 
                // style={{width: 30, height: 30, left: 18, bottom: 3}}
                // style={{width: moderateScale(30), height: moderateScale(30), left: moderateScale(18), bottom: moderateScale(3)}}
                style={{width: scale(30), height: verticalScale(30), left: moderateScale(18), bottom: verticalScale(3)}}
              />
            </TouchableOpacity>
          </Animated.View>

          {dropdownVisible && isFront && (
            // <View style={{position: 'absolute', right: 10, top: 10, backgroundColor: '#fff', borderRadius: 5, padding: 10, gap: 15}}>
            <View style={{position: 'absolute', right: moderateScale(10), top: verticalScale(10), backgroundColor: '#fff', borderRadius: 5, paddingVertical: moderateScale(12), gap: verticalScale(16), width: moderateScale(95)}}>
              <TouchableOpacity style={{paddingHorizontal: moderateScale(14)}} onPress={handleInfoEdit}>
                <CustomText style={{color: '#525252', fontSize: scale(15)}} fontWeight="semibold">정보 수정</CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingHorizontal: moderateScale(14)}} onPress={handleReviewEdit}>
                <CustomText style={{color: '#525252', fontSize: scale(15)}} fontWeight="semibold">리뷰 수정</CustomText>
              </TouchableOpacity>
              <TouchableOpacity style={{paddingHorizontal: moderateScale(14)}} onPress={() => setModalVisible(true)}>
                <CustomText style={{color: '#525252', fontSize: scale(15)}} fontWeight="semibold">삭제</CustomText>
              </TouchableOpacity>
            </View>
          )}

          <Modal  
            // animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', width: 270, padding: 15, borderRadius: 10 }}>
                <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', marginTop: 4}} fontWeight="bold">선택한 티켓을 삭제할까요?</CustomText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 115, padding: 10, borderRadius: 12 }}>
                    <CustomText style={{ color: '#000', textAlign : 'center', fontSize: 16}} fontWeight="medium">취소</CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleIconDelete} style={{ backgroundColor: '#5D70f9', width: 115, padding: 10, borderRadius: 12 }}>
                    <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 16}} fontWeight="medium">확인</CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <Modal  
            // animationType="slide"
            transparent={true}
            visible={makeCardVisible}
            onRequestClose={() => setMakeCardVisible(false)}
          >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <View style={{ backgroundColor: 'white', width: 260, padding: 15, borderRadius: 10 }}>
                <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', lineHeight: 24}} fontWeight="bold"> 등록된 리뷰나 사진이 없습니다. {'\n'} 지금 등록하시겠어요? </CustomText>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                  <TouchableOpacity onPress={() => setMakeCardVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 110, padding: 10, borderRadius: 12 }}>
                    <CustomText style={{ color: '#525252', textAlign : 'center', fontSize: 16}} fontWeight="medium">취소</CustomText>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleReviewEdit} style={{ backgroundColor: '#5D70f9', width: 110, padding: 10, borderRadius: 12 }}>
                    <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 16}} fontWeight="medium">확인</CustomText>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

        </View>
      </TouchableWithoutFeedback>

    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'cover',
  },
  posterBackground: {
    width: imageWidth-10,
    height: imageHeight-10,
    resizeMode: 'cover',
  },
  imageCard: {
    borderRadius: 10,
    overflow: 'hidden',
    width: imageWidth - 10,
    height: imageHeight - 18,
    margin: 5,
  },
  overlay: {
    flex: 1,
    // paddingHorizontal: 22,
    paddingHorizontal: scale(22),
    // top: imageHeight*0.07,
    top: verticalScale(17),
  },
  title: {
    color: '#fff',
    // fontSize: 15,
    fontSize: scale(15),
    height: imageHeight*0.17,
    overflow: 'hidden',
    // paddingTop: 5,
    paddingTop: verticalScale(5),
  },
  info: {
    color: '#fff',
    // fontSize: 14,
    fontSize: scale(13),
    overflow: 'hidden',
  },
  infoContainer: {
    // marginLeft: imageWidth*0.22,
    marginLeft: scale(35),
    // marginVertical: 8,
    marginVertical: verticalScale(8),
    height: imageHeight*0.3,
  },
  bottomContainer: {
    width: imageWidth*0.35,
    height: imageHeight*0.1,
    marginTop: imageHeight*0.03,
  },
  card: {
    width: imageWidth,
    height: imageHeight,
  },
  cardContainer: {
    width: imageWidth,
    height: imageHeight,
    position: 'absolute',
    backfaceVisibility: 'hidden',
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  backTitle: {
    color: '#525252',
    // fontSize: 15,
    // fontSize: moderateScale(15),
    fontSize: scale(14),
    // fontSize: verticalScale(15),
    overflow: 'hidden',
    textAlign: 'center',
    top: imageHeight*0.56,
    paddingHorizontal: 15,
  },
  editBtnContainer: {
    width: imageWidth*1,
    height: imageHeight*0.1,
    backgroundColor: 'blue',
    marginTop: 0,
  },
  editButton: {
    position: 'absolute',
    right: 28,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
  },
  reviewButton: {
    position: 'absolute',
    right: scale(28),
    bottom: verticalScale(32),
    width: scale(50),
    height: verticalScale(50),
    justifyContent: 'center',
  },
  buttonContainer: {
    width: imageWidth*0.875,
    height: imageHeight*0.1,
    marginTop: imageHeight*0.03,
  },
  editPageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  editPage: {
    width: 200,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    position: 'absolute',
    top: 60,
    right: 40,
    width: 100,
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  dropdownText: {
    fontSize: 14,
    marginBottom: 5,
  },
});

export default TicketItem;
