import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';

const EnrollInfoByHand = ({navigation}) => {
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [hall, setHall] = useState('');

  const [seatRow, setSeatRow] = useState('');
  const [seatNum, setSeatNum] = useState('');

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  return (
    <>
      <EnrollHeader title="티켓 정보 입력" onIconClick={()=> navigation.navigate('EnrollReview', {name})}/>
      <View style={styles.container}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#000'}}>
          작품 정보를 입력해주세요.
        </Text>

        <Text style={styles.sectionText}>관람 작품</Text>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={text => setName(text)}
        />

        <Text style={styles.sectionText}>관람 장소</Text>
        <TextInput
          style={styles.inputBox}
          value={place}
          onChangeText={text => setPlace(text)}
        />

        <Text style={styles.sectionText}>관람 상영관</Text>
        <TextInput
          style={styles.inputBox}
          value={hall}
          onChangeText={text => setHall(text)}
        />

        <Text style={styles.sectionText}>관람 좌석</Text>
        <View style={styles.seatInputContainer}>
          <TextInput
            style={[styles.inputBox, {marginRight: 5, width: 35}]}
            value={seatRow}
            onChangeText={text => setSeatRow(text)}
          />
          <Text style={styles.inputLabel}>열</Text>
          <TextInput
            style={[styles.inputBox , {width: 35}]}
            value={seatNum}
            onChangeText={text => setSeatNum(text)}
          />
          <Text style={styles.inputLabel}>번</Text>
        </View>

        <Text style={styles.sectionText}>관람 일시</Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.inputBox, {width: 65}]}
            value={year}
            onChangeText={text => setYear(text)}
          />

          <Text style={styles.inputLabel}>년</Text>
          <TextInput
            style={[styles.inputBox, {width: 35}]}
            value={month}
            onChangeText={text => setMonth(text)}
          />

          <Text style={styles.inputLabel}>월</Text>
          <TextInput
            style={[styles.inputBox, {width: 35}]}
            value={day}
            onChangeText={text => setDay(text)}
          />

          <Text style={styles.inputLabel}>일</Text>
          <TextInput
            style={[styles.inputBox, {width: 65}]}
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
  },
});

export default EnrollInfoByHand;
