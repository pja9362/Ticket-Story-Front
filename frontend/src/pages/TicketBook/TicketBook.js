import React, { useEffect } from 'react';
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
  const myTickets = useSelector((state) => state.ticket.myTickets.content);

  useEffect(() => {
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
          {myTickets && myTickets.length !=0 ? myTickets.map((ticket, index) => (
            <View key={index}>
              <TicketItem {...ticket}/>
            </View>
          ))
          : (
            <View style={styles.noTicketContainer}>
              <Image source={noTicket} style={styles.ticketCard} />
              {/* onPress add Icon, console.log */}
              {/* <Image source={addIcon} style={styles.addIcon} /> */}
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
