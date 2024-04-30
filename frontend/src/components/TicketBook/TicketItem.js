import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';

import movieTicket from '../../images/ticekt_info_movie.png';
import performanceTicket from '../../images/ticket_info_performance.png';
import sportsTicket from '../../images/ticket_info_sports.png';
import playTicket from '../../images/ticket_info_play.png';
import musicalTicket from '../../images/ticket_info_musical.png';

import iconReviewOn from '../../images/icon_ReviewOn.png';
import iconReviewOff from '../../images/icon_ReviewOff.png';

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const TicketItem = ({ category, title, date, time, location, seat, rating }) => {
  let ticketImageSource;
  switch (category) {
    case 'movie':
    case 'MOVIE':
      ticketImageSource = movieTicket;
      break;
    case 'performance':
    case 'PERFORMANCE':
      ticketImageSource = performanceTicket;
      break;
    case 'sports':
    case 'SPORTS':
      ticketImageSource = sportsTicket;
      break;
    case 'play':
    case 'PLAY':
      ticketImageSource = playTicket;
      break;
    case 'musical':
    case 'MUSICAL':
      ticketImageSource = musicalTicket;
      break;
  }

  return (
    <ImageBackground source={ticketImageSource} style={styles.imageBackground}>
      <View style={styles.overlay}>
        <View >
          <Text numberOfLines={2} style={styles.title}>{title}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text numberOfLines={1} style={styles.info}>{date}</Text>
          <Text numberOfLines={1} style={[styles.info, { marginTop: 2.5 }]}>{time}</Text>
          <Text numberOfLines={1} style={[styles.info, { marginTop: 2.5 }]}>{location}</Text>
          <Text numberOfLines={1} style={[styles.info, { marginTop: 2.5 }]}>{seat}</Text>
        </View>
        <View style={styles.bottomContainer}>
          <Text numberOfLines={1} style={[styles.info, { marginTop: 2.5, textAlign: 'center' }]}>{rating}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'cover',
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
    marginVertical: 10,
    height: imageHeight*0.3,
  },
  bottomContainer: {
    width: imageWidth*0.35,
    height: imageHeight*0.1,
    marginTop: imageHeight*0.03,
  },
});

export default TicketItem;
