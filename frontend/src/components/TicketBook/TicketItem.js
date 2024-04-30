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

const TicketItem = ({ category, title, time, photo, contentRating, seatRating, date, location, seat }) => {
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

  const overlayStyles = StyleSheet.create({
    overlay: {
      flex: 1,
      paddingHorizontal: 22,
    },
    title: {
      color: '#fff',
      fontSize: 15,
      fontWeight: 'bold'
    },
    info: {
      color: '#fff',
      fontSize: 14,
      marginTop: imageHeight*0.202,
      marginLeft: imageWidth*0.22
    },
  });

  return (
    <ImageBackground source={ticketImageSource} style={styles.imageBackground}>
      <View style={overlayStyles.overlay}>
        <Text style={[overlayStyles.title, { top: imageHeight*0.11}]}>{title}</Text>
        <Text style={overlayStyles.info}>{date}</Text>
        <Text style={[overlayStyles.info, { marginTop: 2.5 }]}>{time}</Text>
        <Text style={[overlayStyles.info, { marginTop: 2.5 }]}>{seat}</Text>
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
});

export default TicketItem;
