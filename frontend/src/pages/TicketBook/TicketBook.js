import React, { useEffect } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';
import NavHeader from '../../components/NavHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getMyTickets } from '../../actions/ticket/ticket';

const TicketBook = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const myTickets = useSelector((state) => state.ticket.myTickets.content);

  useEffect(() => {
    console.log('Auth:', auth);
    if (auth) {
      dispatch(getMyTickets(0, 10, 'DESC', 'registerTime'));
    }
  }, []);

  useEffect(() => {
    console.log('My tickets:', myTickets);
  }, [myTickets]);

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.rowContainer}>
          {myTickets && myTickets.map((ticket, index) => (
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
