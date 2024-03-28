import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions, Image } from 'react-native';

import goldenTicket from '../../images/ticketbook_gold.png';
import silverTicket from '../../images/ticketbook_silver.png';
import bronzeTicket from '../../images/ticketbook_bronze.png';
import basicTicket from '../../images/ticketbook_basic.png';

import iconReviewOn from '../../images/icon_ReviewOn.png';
import iconReviewOff from '../../images/icon_ReviewOff.png';
import iconPhotoOn from '../../images/icon_PhotoOn.png';
import iconPhotoOff from '../../images/icon_PhotoOff.png';
import iconEdit from '../../images/icon_edit.png';

const TicketItem = ({ type, title, review, photo, contentRating, seatRating, date, category, location, seat }) => {
  let ticketImageSource;
  switch (type) {
    case 'gold':
      ticketImageSource = goldenTicket;
      break;
    case 'silver':
      ticketImageSource = silverTicket;
      break;
    case 'bronze':
      ticketImageSource = bronzeTicket;
      break;
    default:
      ticketImageSource = basicTicket;
  }

  return (
    <ImageBackground source={ticketImageSource} style={styles.imageBackground} resizeMode="contain">
      <View style={styles.textContentContainer}>
        <View style={styles.leftContent}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.guideText}>리뷰</Text>
              <Image source={review !== '' ? iconReviewOn : iconReviewOff} style={styles.icon}/>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.guideText}>사진</Text>
              <Image source={photo !== '' ? iconPhotoOn : iconPhotoOff} style={styles.icon}/>
            </View>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10}}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.guideText}>콘텐츠</Text>
              <Text style={styles.rate}>{contentRating}</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.guideText}>좌석</Text>
              <Text style={styles.rate}>{seatRating}</Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginBottom: 8}}>
            <View style={{height: 17, width: 5, backgroundColor: category === 'MUSICAL'?  '#DC0000' :  category === 'MOVIE' ? '#6B00F6' : category === 'SPORTS' ? '#03C75A' : '#FF5C00' }} />
            <Text style={styles.category}>{title}</Text>
          </View>

          <Text style={styles.infoText}>일시: {date}</Text>
          <Text style={styles.infoText}>장소: {location}</Text>
          <Text style={styles.infoText}>좌석: {seat}</Text>
        </View>
      </View>
      <View style={{position: 'absolute', bottom: 10, right: 28}}>
        <Image source={iconEdit} style={{width: 20, height: 20}}/>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    marginBottom: 20,
    marginHorizontal: 13,
    width: Dimensions.get('window').width - 26,
    height: '100%',
    maxHeight: 132,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  leftContent: {
    flex: 1,
    marginRight: 12,
    gap: 3,
  },
  rightContent: {
    flex: 2,
    paddingLeft: 12,
    justifyContent: 'center',
  },
  guideText: {
    fontSize: 12,
    color: '#9A9A9A',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  rate: {
    fontSize: 19,
    color: '#525252',
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#525252',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 16,
    color: '#525252',
    fontWeight: 'bold',
  },
});

export default TicketItem;
