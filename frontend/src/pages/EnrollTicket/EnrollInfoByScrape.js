import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import CategoryBtnContainer from '../../components/EnrollTicket/CategoryBtnContainer';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import { searchContent, searchLocation, clearContent, clearLocation } from '../../actions/enrollTicketSearch/search';
import { useDispatch, useSelector } from 'react-redux';
import { getMappedDetailCategory, getMappedCategory } from '../../utils/getMappedCategory';
import checkIcon from '../../images/icon_circleCheck.png';

const EnrollInfoByScrape = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const [showContentDropdown, setShowContentDropdown] = useState(true);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

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

  const [contentsId, setContentsId] = useState(null);
  const [locationId, setLocationId] = useState(null);
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
    return title !== '' && date !== '' && time !== '' && location !== '';
  };

  const handleNext = async () => {
    const { category: mappedCategory, categoryDetail: mappedCategoryDetail } = getMappedDetailCategory(category, categoryDetail);
  
    const ticketData = {
      registerBy: 'SCRAPE',
      category: mappedCategory,
      categoryDetail: mappedCategoryDetail,
      platform,
      ticketImg: '',
      contentsDetails: {
        date,
        location,
        locationDetail,
        seats: seats.split(',').map(seat => seat.trim()),
        time,
        title,
        contentsId: contentsId,
        locationId: locationId,
      }
    }
  
    console.log('Updated ticketInfo: ', ticketData);
  
    if (isFormValid()) {
        navigation.navigate('EnrollReview', { title, ticketData })
    } else {
      alert('필수 입력 항목을 모두 입력해주세요!');
    }
  }

  const handleClearList = (type) => {
    if (type === 'content') {
      dispatch(clearContent());
    } else if (type === 'location') {
      dispatch(clearLocation());
    }
  }

  const handleContentSelect = (content) => {
    setTitle(content.title);
    setContentsId(content.content_id);
    setLocationId(content.location_id);
    content.location_id !== null && setLocation(content.location_name);
    setShowContentDropdown(false);
    content.location_id == null && handleLocationSearch(location);
    handleClearList('content');
  }

  const handleLocationSearch = (location) => {
    if(locationId !== null) return;
    else {
      dispatch(searchLocation(location));
      setShowLocationDropdown(true);
    }
  }

  const isContentVisible = category !== '' && ((category != "영화" && categoryDetail !== '') || category == "영화");

  useEffect(() => {
    if (title !== '' && isContentVisible) {
      console.log('Initial title:', title);
      let mappedCategory = getMappedCategory(category);
      let mappedCategoryDetail = getMappedDetailCategory(category, categoryDetail);
      console.log(title, date, mappedCategory, mappedCategoryDetail.category, 'SCRAPE')
      dispatch(searchContent(title, date, mappedCategory, 'SCRAPE'));
    }
  }, [category, categoryDetail]);
  
  return (
    <>
      <ScrollView style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
        <EnrollHeader title="티켓 정보 입력" onIconClick={handleNext}/>
        <View style={{...styles.container, paddingBottom: 0}}>
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
        </View>
        <View style={{...styles.container, paddingTop: 10}}>
          {      
            isContentVisible &&
            <>
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
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                { contentsId !== null &&
                      <Image style={styles.checkIcon} source={checkIcon} />
                }
                <TextInput style={{...styles.inputBox, flex: 1}} value={title} onChangeText={setTitle} placeholder='콘텐츠 제목'/>
              </View>
              {/* Content Lists Dropdown */}
              {
                showContentDropdown && (
                  <View style={{marginVertical: 10}}>
                    <View style={styles.dropdown}>
                      {contentLists && contentLists.slice(0, 5).map((content, index) => (
                        <View key={index} style={styles.dropdownItem}>
                          <TouchableOpacity
                            onPress={() => handleContentSelect(content)}
                            style={styles.dropdownItemTouchable}
                          >
                            <Image
                              style={styles.posterImage}
                              source={{ uri: content.imageUrl[0] }}
                            />
                            <View style={styles.contentDetails}>
                              <Text style={styles.title}>{content.title}</Text>
                              <Text>{content.detail.join(', ')}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                )
              }

              {/* Location */}
              <Text style={styles.subsectionText}>
                관람 장소
                <Text style={styles.requiredIndicator}>*</Text>
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                { locationId !== null &&
                      <Image style={styles.checkIcon} source={checkIcon} />
                }
                <TextInput style={{...styles.inputBox, flex: 1}} value={location} onChangeText={setLocation} placeholder={getCategoryPlaceholder(category, 'location')} />
              </View>
              {/* Location Dropdown */}
              {
                showLocationDropdown && (
                  <View style={{marginVertical: 10}}>
                    <View style={styles.dropdown}>
                      {locationLists && locationLists.slice(0, 5).map((location, index) => (
                        <View key={index} style={styles.dropdownItem}>
                          <TouchableOpacity
                            onPress={() => {
                              setLocation(location.name);
                              setLocationId(location.location_id);
                              setShowLocationDropdown(false);
                              handleClearList('location');
                            }}
                            style={styles.dropdownItemTouchable}
                          >
                            <View style={styles.locationDetails}>
                              <Text style={styles.title}>{location.name}</Text>
                              <Text style={styles.subText}>{location.address}</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>
                  </View>
                )
              }

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
        </>
      }
      </View>
      {
        isContentVisible &&
        <View style={styles.floatingButtonContainer}>
            <NextBtn
              isDisabled={!isFormValid()}
              onPress={() => {
                if (isFormValid()) {
                  handleNext();
                }
              }}
            />
        </View>
      }
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
    subText: {
      fontSize: 12,
      color: '#8A8A8A'
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
    // dropdown
    dropdown: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
    },
    dropdownItem: {
      padding: 5,
      marginBottom: 5,
      borderBottomColor: '#EEEEEE',
      borderBottomWidth: 1,
    },
    dropdownItemTouchable: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    posterImage: {
      width: 28,
      height: 40,
      borderRadius: 2,
      marginRight: 10
    },
    contentDetails: {
      flex: 1,
    },
    locationDetails: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
    },
    title: {
      fontWeight: 'bold',
    },
    checkIcon: {
      width: 12,
      height: 12,
      position: 'absolute',
      right: 10,
    },
});

export default EnrollInfoByScrape;
