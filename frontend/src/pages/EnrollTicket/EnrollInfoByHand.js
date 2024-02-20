import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import NextBtn from '../../components/EnrollTicket/NextBtn';

const EnrollInfoByHand = ({ route, navigation }) => {
  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;
  
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seats, setSeats] = useState('');

  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== '' && time.trim() !== '' && location.trim() !== '';
  };


  return (
    <>
      <EnrollHeader 
        title="티켓 정보 입력" 
        onIconClick={() => isFormValid() ? navigation.navigate('EnrollReview', { title }) : alert('필수 입력 항목을 모두 입력해주세요!')} 
      />
      <View style={styles.container}>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 5}}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
            작품 정보를 입력해주세요.
          </Text>
          <Text style={{ fontSize: 12, color: '#939393' }}>
            *표시는 필수 항목입니다.
          </Text>
        </View>

        <Text style={styles.sectionText}>
          관람 일시
          <Text style={styles.requiredIndicator}>*</Text>
        </Text>
        <View style={styles.dateInputContainer}>
          <TextInput
            style={[styles.inputBox, {flex: 2 }]}
            value={date}
            onChangeText={text => setDate(text)}
            placeholder='YYYY.MM.DD'
          />

          <TextInput
            style={[styles.inputBox, { flex: 1 }]}
            value={time}
            onChangeText={text => setTime(text)}
            placeholder='HH:MM'
          />
        </View>
        
        <Text style={styles.sectionText}>
          관람 콘텐츠
          <Text style={styles.requiredIndicator}>*</Text>
        </Text>
        <TextInput
          style={styles.inputBox}
          value={title}
          onChangeText={text => setTitle(text)}
          placeholder='콘텐츠 제목'
        />

        <Text style={styles.sectionText}>
          관람 장소
          <Text style={styles.requiredIndicator}>*</Text>
        </Text>
        <View style={styles.inputBoxContainer}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            {category === '영화' ? (
              <TextInput
                style={[styles.inputBox, { flex: 1, fontWeight: 'bold', color: '#525252', textAlign: 'center'}]}
                value={categoryDetail}
                editable={false}
              />
            ) : null}
            <TextInput
              style={[styles.inputBox, { flex: 3 }]}
              value={location}
              onChangeText={text => setLocation(text)}
              placeholder={getCategoryPlaceholder(category, 'location')}
            />
          </View>
        </View>

        <Text style={styles.sectionText}>관람 장소 (세부)</Text>
        <TextInput
          style={styles.inputBox}
          value={locationDetail}
          onChangeText={text => setLocationDetail(text)}
          placeholder={getCategoryPlaceholder(category, 'locationDetail')}
        />

        <Text style={styles.sectionText}>관람 좌석</Text>
        <View style={styles.seatInputContainer}>
          <TextInput
            style={[styles.inputBox, { flex: 1 }]}
            value={seats}
            onChangeText={text => setSeats(text)}
            placeholder={getCategoryPlaceholder(category, 'seats')}
          />
        </View>
      </View>
      <View style={styles.floatingButtonContainer}>
        <NextBtn
          isDisabled={!isFormValid()}
          onPress={() => {
            if (isFormValid()) {
              navigation.navigate('EnrollReview', { title })
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 27,
    paddingVertical: 28,
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
    gap: 15,
    width: '70%',
  },
  requiredIndicator: {
    color: '#5D70F9',
  },
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    alignItems: 'center',
  },
});

export default EnrollInfoByHand;
