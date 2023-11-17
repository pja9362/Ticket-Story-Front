import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const StarRating = ({ category, rating, onPress }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <TouchableOpacity key={i} onPress={() => onPress(category, i)}>
        <Icon
          name={i <= rating ? 'star' : 'star-outlined'}
          size={20}
          color={'black'}
        />
      </TouchableOpacity>,
    );
  }
  return (
    <View style={{ flexDirection: 'row', gap: 3 }}>
      {stars}
    </View>
  );
};

export default StarRating;
