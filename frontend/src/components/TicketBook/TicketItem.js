import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';

import movieTicket from '../../images/ticekt_info_movie.png';
import performanceTicket from '../../images/ticket_info_performance.png';
import sportsTicket from '../../images/ticket_info_sports.png';
import playTicket from '../../images/ticket_info_play.png';
import musicalTicket from '../../images/ticket_info_musical.png';

import iconReviewOn from '../../images/icon_ReviewOn.png';
import iconReviewOff from '../../images/icon_ReviewOff.png';

const TicketItem = ({ type, title, review, photo, contentRating, seatRating, date, category, location, seat }) => {
  let ticketImageSource;
  switch (type) {
    case 'movie':
      ticketImageSource = movieTicket;
      break;
    case 'performance':
      ticketImageSource = performanceTicket;
      break;
    case 'sports':
      ticketImageSource = sportsTicket;
      break;
    case 'play':
      ticketImageSource = playTicket;
      break;
    case 'musical':
      ticketImageSource = musicalTicket;
      break;
  }

  return (
    <ImageBackground source={ticketImageSource} style={styles.imageBackground} resizeMode="contain">
      <View style={styles.container}>
        
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    width: 168,
    height: 240,
  },
});

export default TicketItem;
