import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';

const EnrollInfoByScrape = ({ route, navigation }) => {
  const { ticketInfo } = route.params;

  const {
    title: initialTitle = '',
    date: initialDate = '',
    time: initialTime = '',
    location: initialLocation = '',
    locationDetail: initialLocationDetail = '',
    seats: initialSeats = [],
    platform: initialPlatform = '',
    category: initialCategory = '',
  } = ticketInfo;

  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [location, setLocation] = useState(initialLocation);
  const [locationDetail, setLocationDetail] = useState(initialLocationDetail);
  const [seats, setSeats] = useState(initialSeats.join(', '));
  const [platform, setPlatform] = useState(initialPlatform);
  const [category, setCategory] = useState(initialCategory);

  const handleNext = () => {
    console.log('Updated ticketInfo: ', {
      title,
      date,
      time,
      location,
      locationDetail,
      seats: seats.split(',').map(seat => seat.trim()),
      platform,
      category,
    });
    
    navigation.navigate('EnrollReviewByHand', {name: title})
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <EnrollHeader title="티켓 정보 입력" onIconClick={handleNext}/>
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
            작품 정보를 입력해주세요.
        </Text>

        {/* Title */}
        <Text style={styles.sectionText}>관람 작품</Text>
        <TextInput style={styles.inputBox} value={title} onChangeText={setTitle} />

        {/* Date */}
        <Text style={styles.sectionText}>관람 날짜</Text>
        <TextInput style={styles.inputBox} value={date} onChangeText={setDate} />

        {/* Time */}
        <Text style={styles.sectionText}>시작 시간</Text>
        <TextInput style={styles.inputBox} value={time} onChangeText={setTime} />

        {/* Location */}
        <Text style={styles.sectionText}>관람 장소</Text>
        <TextInput style={styles.inputBox} value={location} onChangeText={setLocation} />

        {/* Location Detail */}
        <Text style={styles.sectionText}>관람 장소 상세</Text>
        <TextInput style={styles.inputBox} value={locationDetail} onChangeText={setLocationDetail} />

        {/* Seats */}
        <Text style={styles.sectionText}>관람 좌석</Text>
        <TextInput style={styles.inputBox} value={seats} onChangeText={setSeats} />

        {/* Category */}
        <Text style={styles.sectionText}>관람 장르</Text>
        <TextInput style={styles.inputBox} value={category} onChangeText={setCategory} />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 27,
      paddingVertical: 24,
    },
    inputBox: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      height: 40,
      paddingHorizontal: 10,
    },
    sectionText: {
      fontSize: 16,
      marginTop: 15,
      marginBottom: 8,
      color: '#000',
    },
});

export default EnrollInfoByScrape;
