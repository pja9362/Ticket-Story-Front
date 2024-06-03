import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import Header from '../../components/Header';
import DetailCard from '../../components/TicketBook/DetailCard';
import { getTicketDetail } from '../../actions/ticket/ticket';

const TicketDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { ticketId, title, date, time, location } = route.params; //

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    dispatch(getTicketDetail(ticketId))
      .then((response) => {

        console.log('티켓아이디 확인:',response);

        const updatedTicket = {
          ...response, 
          date: date,
          location: location,
          time: time,
          title: title
        };
  
        setTicket(updatedTicket);

      })
  }, []);


  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
          <Header title="스토리 카드 보기" />
        </View> 
        <ScrollView style={styles.cardContainer}>
          {
            ticket === null ? <Text>Loading...</Text> : 
            <DetailCard ticket={ticket} ticketId ={ticketId}/>
          }
        </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  mainText: {
    color: '#525252',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    padding: 20,
    flex: 1,
  },
});

export default TicketDetail;