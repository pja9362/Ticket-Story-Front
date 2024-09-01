import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {SafeAreaView, StyleSheet, Text, View, ScrollView, BackHandler} from 'react-native';
import Header from '../../components/Header';
import DetailCard from '../../components/TicketBook/DetailCard';
import { getTicketDetail } from '../../actions/ticket/ticket';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { State } from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'

const TicketDetail = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const { ticketId, title, date, time, location } = route.params; 

  const [ticket, setTicket] = useState(null);

  const onSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      navigation.navigate("MainStack");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate("MainStack");
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [])
  );

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

  const content = (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
          <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
            <Header title="스토리카드 보기" backDestination="MainStack"/>
          </View> 
          <ScrollView style={styles.cardContainer}>
            {
              ticket === null ? <Text>Loading...</Text> : 
              <DetailCard ticket={ticket} ticketId ={ticketId}/>
            }
          </ScrollView>
      </SafeAreaView>
    </View>
  )

  return (
    <>
    <GestureHandlerRootView style={{ flex: 1 }}>
    {Platform.OS === 'ios' ? (
      <PanGestureHandler onHandlerStateChange={onSwipe}>
        {content}
      </PanGestureHandler>
    ) : (
      content
    )}
    </GestureHandlerRootView>
    </>
  );
};


//   return (
//     <>
//     <GestureHandlerRootView style={{ flex: 1 }}>
//     <PanGestureHandler onHandlerStateChange={onSwipe}>
//     <View style={{ flex: 1 }}>
//       <SafeAreaView style={styles.container}>
//           <View style={{paddingHorizontal: 20, backgroundColor: '#fff'}}>
//             <Header title="스토리 카드 보기" backDestination="MainStack"/>
//           </View> 
//           <ScrollView style={styles.cardContainer}>
//             {
//               ticket === null ? <Text>Loading...</Text> : 
//               <DetailCard ticket={ticket} ticketId ={ticketId}/>
//             }
//           </ScrollView>
//       </SafeAreaView>
//     </View>
//     </PanGestureHandler>
//     </GestureHandlerRootView>
//     </>
//   );
// };


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eeeeee',
  },
  cardContainer: {
    paddingLeft: scale(17),
    paddingTop: scale(10),
    // padding: 17,
    flex: 1,
  },
});

export default TicketDetail;