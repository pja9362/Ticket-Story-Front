import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';
import NavHeader from '../../components/NavHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getMyTickets } from '../../actions/ticket/ticket';
// 더미 데이터
const dummyData = [
  {
    category: 'MUSICAL',
    title: '뮤지컬 <사의찬미>',
    review: '와 개꿀잼 띵작이에요',
    photo: 'link',
    contentRating: 92,
    seatRating: 84,
    date: '2024.01.31',
    time: '19:30',
    location: '국립정동극장',
    seat: '1층 B열 13번',
  },
  {
    category: 'SPORTS',
    title: '삼성 대 한화',
    review: '',
    photo: '',
    contentRating: 93,
    seatRating: 88,
    date: '2024.03.31',
    time: '15:30',
    location: '대전한화생명이글스파크',
    seat: '외야커플석 B열 13번',
  },
  {
    category: 'MOVIE',
    title: '듄-2',
    review: '그냥 그랬어요',
    photo: '',
    contentRating: 93,
    seatRating: 88,
    date: '2024.05.31',
    time: '22:00',
    location: '대전한화생명이글스파크',
    seat: '외야커플석 B열 13번',
  },
  {
    category: 'PLAY',
    title: '연극 <수상한 흥신소>',
    review: '',
    photo: 'link',
    contentRating: 93,
    seatRating: 88,
    date: '2024.07.31',
    time: '19:30',
    location: '대학로 소극장',
    seat: 'E열8-9번',
  },
];

const TicketBook = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const myTickets = useSelector((state) => state.ticket.myTickets);

  // useEffect(() => {
  //   console.log('Auth:', auth);
  //   if (auth) {
  //     dispatch(getMyTickets());
  //   }
  // }, []);

  // useEffect(() => {
  //   console.log('My tickets:', myTickets);
  // }, [myTickets]);

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.rowContainer}>
          {dummyData.map((ticket, index) => (
            <View key={index}>
              <TicketItem {...ticket}/>
            </View>
          ))}
        </View>
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
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TicketBook;
