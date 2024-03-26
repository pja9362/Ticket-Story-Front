import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import goldenTicket from '../../images/ticketbook_gold.png';
import silverTicket from '../../images/ticketbook_silver.png';
import bronzeTicket from '../../images/ticketbook_bronze.png';
import basicTicket from '../../images/ticketbook_basic.png';

const TicketItem = ({ type, review, photo, contentRating, seatRating, category, date, location, seat }) => {
  let ticketImageSource;
  switch (type) {
    case 'gold':
      ticketImageSource = goldenTicket;
      break;
    case 'silver':
      ticketImageSource = silverTicket;
      break;
    case 'bronze':
      ticketImageSource = bronzeTicket;
      break;
    default:
      ticketImageSource = basicTicket;
  }

  return (
    <ImageBackground source={ticketImageSource} style={styles.imageBackground} resizeMode="contain">
      <View style={styles.textContentContainer}>
        <View style={styles.leftContent}>
          <Text style={styles.review}>{review}</Text>
          <Text style={styles.photo}>{photo}</Text>
          <Text style={styles.contentRating}>콘텐츠 평점: {contentRating}</Text>
          <Text style={styles.seatRating}>좌석 평점: {seatRating}</Text>
        </View>
        <View style={styles.rightContent}>
          <Text style={styles.category}>카테고리: {category}</Text>
          <Text style={styles.date}>일시: {date}</Text>
          <Text style={styles.location}>장소: {location}</Text>
          <Text style={styles.seat}>좌석: {seat}</Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  imageBackground: {
    marginBottom: 20,
    marginHorizontal: 13,
    width: Dimensions.get('window').width - 26,
    height: '100%',
    maxHeight: 132,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  leftContent: {
    flex: 1,
    paddingRight: 10,
  },
  rightContent: {
    flex: 2,
    paddingLeft: 10,
  },
});

export default TicketItem;

// import React from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

// import goldenTicket from '../../images/ticketbook_gold.png';
// import silverTicket from '../../images/ticketbook_silver.png';
// import bronzeTicket from '../../images/ticketbook_bronze.png';
// import basicTicket from '../../images/ticketbook_basic.png';

// const TicketItem = ({ type, review, photo, contentRating, seatRating, category, date, location, seat }) => {
//   let ticketImageSource;
//   switch (type) {
//     case 'gold':
//       ticketImageSource = goldenTicket;
//       break;
//     case 'silver':
//       ticketImageSource = silverTicket;
//       break;
//     case 'bronze':
//       ticketImageSource = bronzeTicket;
//       break;
//     default:
//       ticketImageSource = basicTicket;
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={ticketImageSource} style={styles.ticketImage} resizeMode="contain" />
//       {/* Text Content */}
//       <View style={styles.textContent}>
//         <View style={styles.leftContent}>
//             <Text style={styles.review}>{review}</Text>
//             <Text style={styles.photo}>{photo}</Text>
//             <Text style={styles.contentRating}>콘텐츠 평점: {contentRating}</Text>
//             <Text style={styles.seatRating}>좌석 평점: {seatRating}</Text>
//         </View>
//         <View style={styles.rightContent}>
//             <Text style={styles.category}>카테고리: {category}</Text>
//             <Text style={styles.date}>일시: {date}</Text>
//             <Text style={styles.location}>장소: {location}</Text>
//             <Text style={styles.seat}>좌석: {seat}</Text>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     marginBottom: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'red'
//   },
//   ticketImage: {
//     width: Dimensions.get('window').width -26,
//   },
//   textContent: {
//     position: 'absolute',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//     left: 20,
//     right: 20,
//   },
//   leftContent: {
//     flex: 1,
//   },
//   rightContent: {
//     flex: 1.5,
//   },
//   review: {
//     marginBottom: 5,
//   },
//   photo: {
//     marginBottom: 5,
//   },
//   contentRating: {
//     marginBottom: 5,
//   },
//   seatRating: {
//     marginBottom: 5,
//   },
//   category: {
//     marginBottom: 5,
//   },
//   date: {
//     marginBottom: 5,
//   },
//   location: {
//     marginBottom: 5,
//   },
//   seat: {
//     marginBottom: 5,
//   },
// });

// export default TicketItem;
