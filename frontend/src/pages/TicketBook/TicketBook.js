import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';
import NavHeader from '../../components/NavHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getMyTickets } from '../../actions/ticket/ticket';
import { useFocusEffect } from '@react-navigation/native';
import noTicket from '../../images/no_ticket.png';
import addIcon from '../../images/icon_add_ticket.png';

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const TicketBook = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const ticketData = useSelector((state) => state.ticket.myTickets);
  const totalPages = useSelector((state) => state.ticket.myTickets.totalPages);

  const [page, setPage] = useState(0);
  const [allTickets, setAllTickets] = useState([]);

  const refreshTickets = useCallback(() => {
    if (auth) {
      setPage(0); // Reset page to 0 when refreshing
      setAllTickets([]); // Clear current tickets
      dispatch(getMyTickets(0, 10, 'DESC', 'registerTime', (newTickets) => {
        setAllTickets([]);
        setAllTickets(newTickets);
      }));
    }
  }, [auth, dispatch]);

  useFocusEffect(
    useCallback(() => {
      refreshTickets();
    }, [refreshTickets])
  );

  useEffect(() => {
    if (auth && page > 0) {
      dispatch(getMyTickets(page, 10, 'DESC', 'registerTime', (newTickets) => {
        setAllTickets((prevTickets) => [...prevTickets, ...newTickets]);
      }));
    }
  }, [auth, page]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 30;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      if (page <= totalPages - 1) {
        setPage(page + 1);
      }
    }
  };

  // Add a function to delete a ticket by its ID
  const deleteTicketById = (ticketId) => {
    setAllTickets((prevTickets) => prevTickets.filter(ticket => ticket.ticketId !== ticketId));
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={300}>
        <View style={styles.rowContainer}>
          {allTickets && allTickets.length !== 0 ? allTickets.map((ticket, index) => (
            <View key={index}>
              <TicketItem {...ticket} deleteTicketById={deleteTicketById} />
            </View>
          ))
          : (
            <View style={styles.noTicketContainer}>
              <Image source={noTicket} style={styles.ticketCard} />
              <TouchableOpacity onPress={() => console.log('Add ticket')}>
                <Image source={addIcon} style={styles.addIcon} />
              </TouchableOpacity>
            </View>
          )
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollViewContent: {
    width: '92%',
    alignSelf: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  ticketCard: {
    width: imageWidth,
    height: imageHeight,
    resizeMode: 'cover',
  },
  noTicketContainer: {
    width: imageWidth,
    height: imageHeight,
    alignItems: 'center',
  },
  addIcon: {
    width: 31, 
    height: 31,  
    bottom: imageHeight*0.6,
  },
});

export default TicketBook;
