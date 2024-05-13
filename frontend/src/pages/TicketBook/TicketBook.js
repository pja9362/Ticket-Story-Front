import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import TicketItem from '../../components/TicketBook/TicketItem';
import NavHeader from '../../components/NavHeader';
import { useSelector, useDispatch } from 'react-redux';
import { getMyTickets } from '../../actions/ticket/ticket';
import noTicket from '../../images/no_ticket.png';
import addIcon from '../../images/icon_add_ticket.png';

const imageHeight = Dimensions.get('window').width * 0.45 * 1.43;
const imageWidth = Dimensions.get('window').width * 0.45;

const TicketBook = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth.isAuthenticated);
  const myTickets = useSelector((state) => state.ticket.myTickets.contents);
  const ticketData = useSelector((state) => state.ticket.myTickets);
  const totalPages = useSelector((state) => state.ticket.myTickets.totalPages);

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allTickets, setAllTickets] = useState([]);

  useEffect(() => {
    if (auth) {
      console.log('page:', page, 'totalPages:', totalPages, 'ticketData.last:', ticketData.last);
      dispatch(getMyTickets(page, 6, 'DESC', 'registerTime', (newTickets) => {
        setAllTickets((prevTickets) => [...prevTickets, ...newTickets]);
      }));
    }
  }, [auth, page]);

  useEffect(() => {
    console.log("TICKET DATA", ticketData)
    myTickets && console.log('myTickets:', myTickets, "myTickets.length: ", myTickets.length)
  }, [myTickets]);

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const paddingToBottom = 20;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom && !loading) {
      if (page <= totalPages) {
        setLoading(true);
        setPage(page + 1);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHeader />
      <ScrollView 
        contentContainerStyle={styles.scrollViewContent}
        onScroll={handleScroll}
        scrollEventThrottle={400}>
        <View style={styles.rowContainer}>
          {/* {myTickets && myTickets.length !=0 ? myTickets.map((ticket, index) => (
            <View key={index}>
              <TicketItem {...ticket}/>
            </View>
          )) */}
          {allTickets && allTickets.length !== 0 ? allTickets.map((ticket, index) => (
            <View key={index}>
              <TicketItem {...ticket} />
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
