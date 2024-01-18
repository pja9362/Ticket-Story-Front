// ScrapInfo.js
import React from 'react';
import { View, Text, Image } from 'react-native';

const ScrapInfo = ({ route }) => {
  const { ticketInfo, source } = route.params;

  return (
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      <Image source={{ uri: ticketInfo.image }} style={{ width: 100, height: 150 }} />
      <Text>{ticketInfo.title}</Text>
      <Text>{ticketInfo.date}</Text>
      <Text>{ticketInfo.location}</Text>

      {source === 'cgv' && (
        <>
          <Text>{ticketInfo.cinema}</Text>
          <Text>{ticketInfo.seat}</Text>
          <Text>{ticketInfo.seatCount}</Text>
        </>
      )}

      {source === 'interpark' && (
        <>
          <Text>{ticketInfo.seatCount}</Text>
          {ticketInfo.seatDetails.map((seatDetail, index) => (
            <View key={index}>
              <Text>[좌석 {index+1}]</Text>
              <Text>좌석 등급: {seatDetail.seatGrade}</Text>
              <Text>가격 등급: {seatDetail.priceGrade}</Text>
              <Text>좌석 번호: {seatDetail.seatNumber}</Text>
            </View>
          ))}
        </>
      )}

      {
        source === 'lottecinema' && (
          <>
            <Text>{ticketInfo.time}</Text>
            <Text>{ticketInfo.seatCount}</Text>
          </>
        )
      }

      {
        source === 'yes24' && (
          <>
            <Text>{ticketInfo.seat}</Text>
            <Text>{ticketInfo.seatCount}명</Text>
          </>
        )
      }
    </View>
  );
};

export default ScrapInfo;
