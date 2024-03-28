import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';
import NavHeader from '../../components/NavHeader';

// 더미 데이터
const dummyData = [
  {
    type: 'gold',
    title: '뮤지컬 <사의찬미>',
    review: '와 개꿀잼 띵작이에요',
    photo: 'link',
    contentRating: 92,
    seatRating: 84,
    category: 'MUSICAL',
    date: '2024.01.31',
    location: '국립정동극장',
    seat: '1층 B열 13번',
  },
  {
    type: 'silver',
    title: '삼성 대 한화',
    review: '',
    photo: '',
    contentRating: 93,
    seatRating: 88,
    category: 'SPORTS',
    date: '2024.03.31',
    location: '대전한화생명이글스파크',
    seat: '외야커플석 B열 13번',
  },
  {
    type: 'bronze',
    title: '듄-2',
    review: '그냥 그랬어요',
    photo: '',
    contentRating: 93,
    seatRating: 88,
    category: 'MOVIE',
    date: '2024.05.31',
    location: '대전한화생명이글스파크',
    seat: '외야커플석 B열 13번',
  },
  {
    type: 'basic',
    title: '연극 <수상한 흥신소>',
    review: '',
    photo: 'link',
    contentRating: 93,
    seatRating: 88,
    category: 'PLAY',
    date: '2024.07.31',
    location: '대학로 소극장',
    seat: 'E열8-9번',
  },
];

const TicketBook = () => {
  
  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {dummyData.map((ticket, index) => (
          <View key={index}>
            <TicketItem {...ticket}/>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  scrollViewContent: {
    width: '100%',
    alignItems: 'center',
  },
});

export default TicketBook;
