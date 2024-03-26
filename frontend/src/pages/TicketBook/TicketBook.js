import React from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text} from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';

// 더미 데이터
const dummyData = [
  {
    type: 'gold',
    review: '와 개꿀잼 띵작이에요',
    photo: '',
    contentRating: 93,
    seatRating: 88,
    category: 'MOVIE',
    date: '2024.01.31',
    location: 'CGV순천신대',
    seat: '1관 E열8-9번',
  },
  {
    type: 'silver',
    review: '너무 재밌더라 근데 골드는 아님',
    photo: '',
    contentRating: 93,
    seatRating: 88,
    category: 'MOVIE',
    date: '2024.03.31',
    location: 'CGV순천신대',
    seat: '1관 E열8-9번',
  }
];

const TicketBook = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      {/* <ScrollView> */}
        {dummyData.map((ticket, index) => (
            <TicketItem key={index} {...ticket} />
        ))}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default TicketBook;