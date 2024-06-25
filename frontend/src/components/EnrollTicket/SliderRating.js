import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Slider from '@react-native-community/slider';
import GoldTicketIcon from '../../images/icon_ticket_gold.png';
import SilverTicketIcon from '../../images/icon_ticket_silver.png';
import BronzeTicketIcon from '../../images/icon_ticket_bronze.png';
import BlackTicketIcon from '../../images/icon_ticket_black.png';
import { CustomText } from '../../components/CustomText';

const SliderRating = ({category, value, onValueChange}) => {
  const getTicketIcon = () => {
    if (value >= 90) {
      return GoldTicketIcon;
    } else if (value >= 70) {
      return SilverTicketIcon;
    } else if (value >= 50) {
      return BronzeTicketIcon;
    } else {
      return BlackTicketIcon;
    }
  };

  return (
    <View style={{marginTop: category === 'art' ? 12 : 0}}>
      <CustomText style={styles.sliderText}>
        {category === 'art' ? '작품' : '좌석'} 평점
        <CustomText style={styles.requiredIndicator}>*</CustomText>
      </CustomText>
    
      <View style={styles.sliderContainer}>
        <View style={styles.ticketIconContainer}>
          <Image source={getTicketIcon()} style={styles.ticketIcon} />
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={100}
          minimumTrackTintColor='#000000'
          maximumTrackTintColor='lightgray'
          step={1}
          tapToSeek
          value={value}
          onValueChange={rating => onValueChange(category, rating)}
        />

        <CustomText style={styles.sliderValue} fontWeight="bold"> {value} </CustomText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderText: {
    fontSize: 16,
    marginTop: 5,
    color: '#000',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
    fontSize: 20,
    color: '#525252',
    width: 45,
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  requiredIndicator: {
    color: '#5D70F9',
  },
  ticketIcon: {
    width: 52,
    height: 52,
  },
  ticketIconContainer: {
    alignItems: 'center',
  }
});

export default SliderRating;
