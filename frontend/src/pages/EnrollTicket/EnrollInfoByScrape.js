import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import CategoryBtnContainer from '../../components/EnrollTicket/CategoryBtnContainer';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import api from '../../api/api';
import { searchContent } from '../../actions/enrollTicketSearch/search';
import { useDispatch } from 'react-redux';

const EnrollInfoByScrape = ({ route, navigation }) => {
  const dispatch = useDispatch();

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

  const categories = ['영화', '공연', '스포츠'];
  const detailCategories = {
    공연: ['뮤지컬', '연극', '기타'],
    스포츠: ['야구', '축구', '기타'],
  }

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  const handleCategoryDetailSelect = (selectedCategoryDetail) => {
    setCategoryDetail(selectedCategoryDetail);
  };

  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== '' && time.trim() !== '' && location.trim() !== '';
  };

  const handleNext = async () => {
    // Map category and categoryDetail values here
    let mappedCategory = category;
    let mappedCategoryDetail = categoryDetail;
    
    if (category === '영화') {
      mappedCategory = 'MOVIE';
      mappedCategoryDetail = 'MOVIE';
    } else if (category === '공연') {
      if (categoryDetail === '뮤지컬') {
        mappedCategory = 'MUSICAL';
        mappedCategoryDetail = 'MUSICAL';
      } else if (categoryDetail === '연극') {
        mappedCategory = 'PLAY';
        mappedCategoryDetail = 'PLAY';
      } else {
        mappedCategory = 'PERFORMANCE';
        mappedCategoryDetail = 'PERFORMANCE';
      }
    } else if (category === '스포츠') {
      if (categoryDetail === '야구') {
        mappedCategory = 'SPORTS';
        mappedCategoryDetail = 'BASEBALL';
      } else if (categoryDetail === '축구') {
        mappedCategory = 'SPORTS';
        mappedCategoryDetail = 'SOCCER';
      } else {
        mappedCategory = 'SPORTS';
        mappedCategoryDetail = 'ETC';
      }
    }
  
    const ticketData = {
      registerBy: 'SCRAPE',
      category: mappedCategory,
      categoryDetail: mappedCategoryDetail,
      platform,
      ticketImg: '',
      contentDetails: {
        date,
        location,
        locationDetail,
        seats: seats.split(',').map(seat => seat.trim()),
        time,
        title,
        contentId: 0,
        locationId: 0,
      }
    }
  
    console.log('Updated ticketInfo: ', ticketData);
  
    if (isFormValid()) {
      try {
        const savedTicket = await api.saveNewTicket(ticketData);
        console.log('Saved ticket:', savedTicket);
  
        navigation.navigate('EnrollReview', { title })
      } catch (error) {
        console.error('Error handling new ticket:', error);
      }
    } else {
      alert('필수 입력 항목을 모두 입력해주세요!');
    }
  }

  useEffect(() => {
    if(initialTitle.trim() !== '') {
      console.log("검색 요청");
      dispatch(searchContent(initialTitle, initialDate, 'MOVIE', 'SCRAPE'));
    }
  }, []);

  return (
    <>
      <ScrollView style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
        <EnrollHeader title="티켓 정보 입력" onIconClick={handleNext}/>
        <View style={styles.container}>

          <Text style={styles.sectionText}>
            관람한 콘텐츠의 분야를 선택해 주세요.
          </Text>
          {/* Category */}
          <CategoryBtnContainer
            categories={categories}
            selectedCategory={category}
            onSelectCategory={handleCategorySelect}
          />

          {/* Category Detail */}
          {
            detailCategories[category] && (
              <>
                <Text style={styles.sectionText}>관람한 {category == '공연' ? '공연 종류를' : '스포츠 종목을'} 선택해 주세요.</Text>
                <CategoryBtnContainer
                  categories={detailCategories[category]}
                  selectedCategory={categoryDetail}
                  onSelectCategory={handleCategoryDetailSelect}
                />
              </>
            )
          }

          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 5}}>
            <Text style={styles.sectionText}>
              입력된 정보를 확인해주세요.
            </Text>
            <Text style={{ fontSize: 12, color: '#939393' }}>
              *표시는 필수 항목입니다.
            </Text>
          </View>

          {/* Date */}
          <Text style={styles.subsectionText}>
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
          
          {/* Title */}
          <Text style={styles.subsectionText}>
            관람 콘텐츠
            <Text style={styles.requiredIndicator}>*</Text>
          </Text>
          <TextInput style={styles.inputBox} value={title} onChangeText={setTitle} placeholder='콘텐츠 제목'/>

          {/* Location */}
          <Text style={styles.subsectionText}>
            관람 장소
            <Text style={styles.requiredIndicator}>*</Text>
          </Text>
          <TextInput style={styles.inputBox} value={location} onChangeText={setLocation} placeholder={getCategoryPlaceholder(category, 'location')} />

          {/* Location Detail */}
          {
            initialLocationDetail !=='' && (
              <>
                <Text style={styles.subsectionText}>관람 장소 (세부)</Text>
                <TextInput style={styles.inputBox} value={locationDetail} onChangeText={setLocationDetail} placeholder={getCategoryPlaceholder(category, 'locationDetail')}/>
              </>
            )
          }

          {/* Seats */}
          <Text style={styles.subsectionText}>관람 좌석</Text>
          <TextInput style={styles.inputBox} value={seats} onChangeText={setSeats} placeholder={getCategoryPlaceholder(category, 'seats')}/>
          
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
      </ScrollView>
    </>
  );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 27,
      paddingVertical: 30,
    },
    sectionText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#525252',
    },
    subsectionText: {
      fontSize: 16,
      marginTop: 15,
      marginBottom: 8,
      color: '#000',
    },
    inputBox: {
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 5,
      height: 40,
      paddingHorizontal: 10,
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
      width: '100%',
      alignItems: 'center',
    },
});

export default EnrollInfoByScrape;
