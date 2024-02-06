import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import CategoryBtnContainer from '../../components/EnrollTicket/CategoryBtnContainer';

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
  const [category, setCategory] = useState(initialCategory === '뮤지컬' || initialCategory === '연극' ? '공연' : initialCategory);
  const [categoryDetail, setCategoryDetail] = useState(initialCategory === '뮤지컬' || initialCategory === '연극' ? initialCategory : '');

  const categories = ['영화', '공연', '스포츠', '기타'];
  const detailCategories = {
    공연: ['뮤지컬', '연극', '일반'],
    스포츠: ['축구', '야구', '기타'],
  }

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleCategoryDetailSelect = (selectedCategoryDetail) => {
    setCategoryDetail(selectedCategoryDetail);
  };

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
      categoryDetail,
    });
    
    navigation.navigate('EnrollReview', {name: title})
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

        {/* Category */}
        <Text style={styles.sectionText}>관람 장르</Text>
        <CategoryBtnContainer
          categories={categories}
          selectedCategory={category}
          onSelectCategory={handleCategorySelect}
        />

        {/* Category Detail */}
        {
          detailCategories[category] && (
            <>
              <Text style={styles.sectionText}>관람 장르 상세</Text>
              <CategoryBtnContainer
                categories={detailCategories[category]}
                selectedCategory={categoryDetail}
                onSelectCategory={handleCategoryDetailSelect}
              />
            </>
          )
        }
        
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
        {
          initialLocationDetail !=='' && (
            <>
              <Text style={styles.sectionText}>관람 장소 상세</Text>
              <TextInput style={styles.inputBox} value={locationDetail} onChangeText={setLocationDetail} />
            </>
          )
        }

        {/* Seats */}
        <Text style={styles.sectionText}>관람 좌석</Text>
        <TextInput style={styles.inputBox} value={seats} onChangeText={setSeats} />

        
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
