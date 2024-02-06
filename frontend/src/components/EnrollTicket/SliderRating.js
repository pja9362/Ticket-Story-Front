import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';

const SliderRating = ({category, value, onValueChange}) => {
  return (
    <View>
      <Text style={styles.sliderText}>
        {category === 'art' ? '작품' : '좌석'} 평점
      </Text>

      <View style={styles.sliderContainer}>
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

        <Text style={styles.sliderValue}> {value} </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderText: {
    fontSize: 16,
    marginTop: 15,
    marginBottom: 8,
    color: '#000',
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    textAlign: 'center',
  },
  sliderContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
});

export default SliderRating;
