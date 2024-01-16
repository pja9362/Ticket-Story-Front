// ScrapInfo.js
import React from 'react';
import { View, Text, Image } from 'react-native';

const ScrapInfo = ({ route }) => {
  const { movieInfo } = route.params;

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Image source={{ uri: movieInfo.image }} style={{ width: 100, height: 150 }} />
      <Text>{movieInfo.title}</Text>
      <Text>{movieInfo.date}</Text>
      <Text>{movieInfo.location}</Text>
      <Text>{movieInfo.cinema}</Text>
      <Text>{movieInfo.seatCount}</Text>
      <Text>{movieInfo.seat}</Text>
    </View>
  );
};

export default ScrapInfo;
