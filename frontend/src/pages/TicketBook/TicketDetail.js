import React, { useEffect, useState } from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView} from 'react-native';
import Header from '../../components/Header';
import DetailCard from '../../components/TicketBook/DetailCard';
import { useSelector } from 'react-redux';

const TicketDetail = ({ route, navigation }) => {

  const myTickets = useSelector((state) => state.ticket.myTickets.content);

  const { ticketId } = route.params;

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    if(myTickets) {
      const ticket = myTickets.find((ticket) => ticket.ticketId == ticketId);
      setTicket(ticket);
    }
  }, [myTickets]);

  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
          <Header title="스토리 카드 보기" />
        </View> 
        <ScrollView style={styles.cardContainer}>
          <DetailCard ticket={ticket} />
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