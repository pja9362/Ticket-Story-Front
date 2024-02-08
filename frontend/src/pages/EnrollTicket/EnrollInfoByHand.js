import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';

const EnrollInfoByHand = ({ route, navigation }) => {
  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;

  useEffect(() => {
    console.log(category);
    console.log(categoryDetail);
  }, []);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seats, setSeats] = useState('');

  return (
    <>
      <EnrollHeader title="티켓 정보 입력" onIconClick={() => navigation.navigate('EnrollReview', { title })} />
      <View style={styles.container}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
          작품 정보를 입력해주세요.
        </Text>

        <Text style={styles.sectionText}>관람 작품</Text>
        <TextInput
          style={styles.inputBox}
          value={title}
          onChangeText={text => setTitle(text)}
        />

        <Text style={styles.sectionText}>관람 장소</Text>
        <TextInput
          style={styles.inputBox}
          value={location}
          onChangeText={text => setLocation(text)}
        />

        <Text style={styles.sectionText}>관람 상영관</Text>
        <TextInput
          style={styles.inputBox}
          value={locationDetail}
          onChangeText={text => setLocationDetail(text)}
        />

        <Text style={styles.sectionText}>관람 좌석</Text>
        <View style={styles.seatInputContainer}>
          <TextInput
            style={[styles.inputBox, { marginRight: 5,flex: 1 }]}
            value={seats}
            onChangeText={text => setSeats(text)}
          />
        </View>

        <Text style={styles.sectionText}>관람 일시</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.inputBox, {flex: 3 }]}
            value={date}
            onChangeText={text => setDate(text)}
          />

          <TextInput
            style={[styles.inputBox, { flex: 1 }]}
            value={time}
            onChangeText={text => setTime(text)}
          />
        </View>
      </View>
    </>
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
  seatInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputLabel: {
    fontSize: 14,
    marginLeft: 8,
    marginRight: 15,
    color: '#000',
  },
  dateInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20
  },
});

export default EnrollInfoByHand;
