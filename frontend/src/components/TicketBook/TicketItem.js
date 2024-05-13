import React, { useRef, useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Animated, TouchableWithoutFeedback, TouchableOpacity, Image, } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import movieTicket from '../../images/ticekt_info_movie.png';
import performanceTicket from '../../images/ticket_info_performance.png';
import sportsTicket from '../../images/ticket_info_sports.png';
import playTicket from '../../images/ticket_info_play.png';
import musicalTicket from '../../images/ticket_info_musical.png';

import movieBasicTicket from '../../images/ticket_default_poster_movie.png';
import performanceBasicTicket from '../../images/ticket_default_poster_performance.png';
import sportsBasicTicket from '../../images/ticket_default_poster_sports.png';

import iconReviewOn from '../../images/icon_ReviewOn.png';
import iconReviewOff from '../../images/icon_ReviewOff.png';
import iconEdit from '../../images/icon_dots.png';

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const TicketItem = ({ category, title, date, time, location, seat, contentsRating, seatRating, imageUrl = null, ticketId, reviewId }) => {
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
  const animation = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    setIsFront(!isFront);
    Animated.timing(animation, {
      toValue: isFront ? 180 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleReviewClick = () => {
    navigation.navigate('TicketDetail', { ticketId: ticketId });
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
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={styles.card}>
          <Animated.View style={[styles.cardContainer, frontAnimatedStyle, imageUrl && styles.imageCard]}>
          <ImageBackground 
              source={imageUrl ? { uri: imageUrl } : basicTicketImageSource} 
              style={styles.imageBackground}
            >              
             { imageUrl == null || imageUrl == "" ? 
                <Text style={styles.backTitle}>{title}</Text> 
                : <Image source={iconEdit} style={{width: 30, height: 30, position: 'absolute', top: 7, right: 10}} />
              }
            </ImageBackground>
          </Animated.View>
          <Animated.View style={[styles.cardContainer, styles.back, backAnimatedStyle]}>
            <ImageBackground source={ticketImageSource} style={styles.imageBackground}>
              <View style={styles.overlay}>
                <Text numberOfLines={2} style={styles.title}>{title}</Text>
                <View style={styles.infoContainer}>
                  <Text numberOfLines={1} style={styles.info}>{date}</Text>
                  <Text numberOfLines={1} style={[styles.info, { marginTop: 2 }]}>{time}</Text>
                  <Text numberOfLines={1} style={[styles.info, { marginTop: 2 }]}>{location}</Text>
                  <Text numberOfLines={1} style={[styles.info, { marginTop: 2 }]}>{seat}</Text>
                </View>
                <View style={styles.bottomContainer}>
                  <Text numberOfLines={1} style={[styles.info, { marginTop: 5, textAlign: 'center' }]}>{contentsRating}</Text>
                </View>
                <View style={styles.bottomContainer}>
                  <Text numberOfLines={1} style={[styles.info, { marginTop: 12, textAlign: 'center' }]}>{contentsRating}</Text>
                </View>
              </View>
            </ImageBackground>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
      {
        !isFront &&
        <TouchableOpacity onPress={handleReviewClick} style={[styles.reviewButton, { opacity: reviewId === null ? 0.5 : 1 }]}>
          <View style={{backgroundColor: 'transparent', width: 50, height: 50}}></View>
        </TouchableOpacity>
      }
    </>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: imageWidth,
    height: imageHeight,
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
    paddingHorizontal: 22,
    top: imageHeight*0.07,
  },
  title: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    height: imageHeight*0.17,
    overflow: 'hidden',
    paddingTop: 5,
  },
  info: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  infoContainer: {
    marginLeft: imageWidth*0.22,
    marginVertical: 8,
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
    fontSize: 15,
    fontWeight: 'bold',
    overflow: 'hidden',
    textAlign: 'center',
    top: imageHeight*0.58,
    paddingHorizontal: 15,
  },
  reviewButton: {
    position: 'absolute',
    right: 28,
    bottom: 32,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TicketItem;
