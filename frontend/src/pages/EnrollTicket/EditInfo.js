import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import CategoryBtnContainer from '../../components/EnrollTicket/CategoryBtnContainer';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import { searchContent, searchLocation, clearContent, clearLocation } from '../../actions/enrollTicketSearch/search';
import { useDispatch, useSelector } from 'react-redux';
import { getMappedDetailCategory, getMappedCategory, getReverseMappedCategory } from '../../utils/getMappedCategory';
import checkIcon from '../../images/icon_circleCheck.png';
import defaultImage from '../../images/ticket_default_poster_movie.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; //
import { updateInfo } from '../../actions/ticket/ticket';
import { CustomText, CustomTextInput } from '../../components/CustomText';

const EnrollInfoByScrape = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const [showContentDropdown, setShowContentDropdown] = useState(true);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    //
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirmDate = (selectedDate) => {
      const formattedDate = selectedDate.toISOString().split('T')[0].replace(/-/g, '.');
      setDate(formattedDate);
      hideDatePicker();
    };
  
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleConfirmTime = (selectedTime) => {
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
      hideTimePicker();
    };
  //

//   const { ticketInfo } = route.params;
  const { ticketId, ticketData } = route.params;

//   const {
//     title: initialTitle = '',
//     date: initialDate = '',
//     time: initialTime = '',
//     location: initialLocation = '',
//     locationDetail: initialLocationDetail = '',
//     seats: initialSeats = [],
//     platform: initialPlatform = '',
//     category: initialCategory = '',
//   } = ticketInfo;

  const {
    title: initialTitle = '',
    date: initialDate = '',
    time: initialTime = '',
    location: initialLocation = '',
    locationDetail: initialLocationDetail = '',
    seats: initialSeats = [],
  } = ticketData.contentsDetails;

  const [contentsId, setContentsId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);
  const [location, setLocation] = useState(initialLocation);
  const [locationDetail, setLocationDetail] = useState(initialLocationDetail);
  const [seats, setSeats] = useState(initialSeats.join(', '));
  const [platform, setPlatform] = useState(ticketData.platform);
  const [category, setCategory] = useState('');
  const [categoryDetail, setCategoryDetail] = useState('');

  const categories = ['영화', '공연', '스포츠'];
  const detailCategories = {
    공연: ['뮤지컬', '연극', '기타'],
    스포츠: ['야구', '축구', '기타'],
  }

  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);
    console.log(selectedCategory);
    if (selectedCategory !== '영화') {
    setCategoryDetail('');
    }
  };

  const handleCategoryDetailSelect = (selectedCategoryDetail) => {
    setCategoryDetail(selectedCategoryDetail);
  };

  const isFormValid = () => {
    return title !== '' && date !== '' && time !== '' && location !== '' && isContentSelected == true && isLocationSelected == true; //
  };


  const handleNext = async () => {
    const { category: mappedCategory, categoryDetail: mappedCategoryDetail } = getMappedDetailCategory(category, categoryDetail);
  
    const ticket = {
      registerBy: ticketData.registerBy,
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

    const reviewDetails = {
      isPublic: ticketData.reviewDetails.isPublic,
      isSpoiler: ticketData.reviewDetails.isSpoiler,
      reviewTitle : ticketData.reviewDetails.reviewTitle,
      reviewDetails: ticketData.reviewDetails.reviewDetails,
      reviewImages: ticketData.reviewDetails.reviewImages
    };

    const ratingDetails = {
      contentsRating: ticketData.ratingDetails.contentsRating,
      seatRating: ticketData.reviewDetails.seatRating,
    };

    const requestData = {
      ...ticket,
      reviewDetails,
      ratingDetails
    }
  
    if (isFormValid()) {
      try {
        // const updatedInfo = await updateInfo(ticketId, requestData);
        const updatedInfo = await dispatch(updateInfo(ticketId, requestData));
        // navigation.navigate('EnrollFinish');
        navigation.navigate('EditFinish', { ticket: ticket, ticketId: ticketId, reviewDetails : reviewDetails });
      } catch (error) {
        console.error('Error Updating Info:', error);
      }
    } else {
      alert('필수 입력 항목을 모두 입력해주세요!');
    }
  }

  //
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  const handleNoItemSelect = () => {
    setShowContentDropdown(false);
    setIsContentSelected(true);
    setContentsId(null);
    handleLocationSearch(location);
  }

  const handleNoLocationSelect = () => {
    setShowLocationDropdown(false);
    setIsLocationSelected(true);
    setLocationId(null);
  }
  //

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
    // setLocationId(content.location_id);
    content.location_id !== null && setLocationId(content.location_id);
    content.location_id !== null && setLocation(content.location_name);
    setShowContentDropdown(false);
    content.location_id == null && handleLocationSearch(location);
    handleClearList('content');
    setIsContentSelected(true); //
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
      let mappedCategory = getMappedCategory(category);
      dispatch(searchContent(title, date, mappedCategory, 'SCRAPE'));
    }
  }, [category, categoryDetail]);

  useEffect(() => {
    const reversedCategory = getReverseMappedCategory(ticketData.category);
    setCategory(reversedCategory);
    
    setDate(new Date(date).toISOString().split('T')[0].replace(/-/g, '.'));
  }, []);

  // useEffect(() => {
  //   console.log('나는 귀여운 이노',date);
  //   const handleConfirmDate = async () => {
  //     const formattedDate = await date.toISOString().split('T')[0].replace(/-/g, '.');
  //     console.log('나는 귀여운 이노2',formattedDate);
  //     setDate(formattedDate);
  //   };
  // }, [date]);

  useEffect(() => {
    if (title.trim() !== '' && isContentVisible && isContentSelected === false) {
      let mappedCategory = getMappedCategory(category);
      const timeoutId = setTimeout(() => {
        dispatch(searchContent(title, date, mappedCategory, 'SCRAPE'));
        setShowContentDropdown(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [title]);
  

  useEffect(() => {
    if (location.trim() !== '' && isContentVisible && isLocationSelected === false) {
      const timeoutId = setTimeout(() => {
        dispatch(searchLocation(location));
        setShowLocationDropdown(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  
  return (
    <>
      <EnrollHeader title="티켓 정보 입력" onIconClick={handleNext}/>
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
          <View style={{...styles.container, paddingBottom: 0}}>
            <CustomText style={styles.sectionText} fontWeight="bold">
              관람한 콘텐츠의 분야를 선택해 주세요.
            </CustomText>
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
                  <CustomText style={styles.sectionText} fontWeight="bold">관람한 {category == '공연' ? '공연 종류를' : '스포츠 종목을'} 선택해 주세요.</CustomText>
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
                  <CustomText style={styles.sectionText} fontWeight="bold">
                    입력된 정보를 확인해주세요.
                  </CustomText>
                  <CustomText style={{ fontSize: 12, color: '#939393' }}>
                    *표시는 필수 항목입니다.
                  </CustomText>
                </View>

                {/* Date */}
                <CustomText style={styles.subsectionText}>
                  관람 일시
                  <CustomText style={styles.requiredIndicator}>*</CustomText>
                </CustomText>
                
                <View style={styles.dateInputContainer}>

                  <TouchableOpacity onPress={showDatePicker}>
                    <View pointerEvents="none">
                      <CustomTextInput
                        style={[styles.inputBox, { flex: 2}]}
                        value={date}
                        placeholder='YYYY.MM.DD'
                        editable={false}
                      />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={showTimePicker}>
                    <View pointerEvents="none">
                      <CustomTextInput
                        style={[styles.inputBox, { flex: 1 }]}
                        value={time}
                        placeholder='HH:MM'
                        editable={false}
                      />
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                    locale="ko"
                  />

                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirmTime}
                    onCancel={hideTimePicker}
                    locale="ko"
                    minuteInterval={5}
                  />

                </View>
              
                {/* Title */}
                <CustomText style={styles.subsectionText}>
                  관람 콘텐츠
                  <CustomText style={styles.requiredIndicator}>*</CustomText>
                </CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  { contentsId !== null &&
                        <Image style={styles.checkIcon} source={checkIcon} />
                  }
                  <CustomTextInput style={{...styles.inputBox, flex: 1}} value={title} onChangeText={(text) => {setTitle(text); setIsContentSelected(false); setContentsId(null);}} placeholder='콘텐츠 제목'/>
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
                              <View style={styles.imageContainer}>
                                {content.imageUrl.length > 0 ? (
                                  content.imageUrl.map((url, imageIndex) => (
                                    <Image
                                      key={imageIndex}
                                      style={[styles.posterImage, category == '스포츠' && { width: 50, height: 40, resizeMode: 'contain'}]}
                                      source={{ uri: url }}
                                    />
                                  ))
                                ) : (
                                  <Image
                                    style={styles.posterImage}
                                    source={{ defaultImage }}
                                  />
                                )}
                              </View>
                              <View style={styles.contentDetails}>
                                <CustomText fontWeight="bold">{content.title}</CustomText>
                                <CustomText>{content.detail.join(', ')}</CustomText>
                              </View>
                            </TouchableOpacity>
                          </View>
                        ))}
                        <View style={styles.lastdropdownItem}>
                          <TouchableOpacity
                            onPress={handleNoItemSelect}
                            style={styles.dropdownItemTouchable}
                          >
                            <View style={styles.contentDetails}>
                              <CustomText style={styles.textDetails} fontWeight="bold"> 콘텐츠 선택하지 않고 입력하기 </CustomText>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )
                }

                {/* Location */}
                <CustomText style={styles.subsectionText}>
                  관람 장소
                  <CustomText style={styles.requiredIndicator}>*</CustomText>
                </CustomText>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  { locationId !== null &&
                        <Image style={styles.checkIcon} source={checkIcon} />
                  }
                  <CustomTextInput style={{...styles.inputBox, flex: 1}} value={location} onChangeText={(text) => {setLocation(text); setIsLocationSelected(false); setLocationId(null);}} placeholder={getCategoryPlaceholder(category, 'location')} />
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
                                setIsLocationSelected(true);
                                setLocation(location.name);
                                setLocationId(location.location_id);
                                setShowLocationDropdown(false);
                                handleClearList('location');
                              }}
                              style={styles.dropdownItemTouchable}
                            >
                              <View style={styles.locationDetails}>
                                <CustomText style={{ flex: 1 }} fontWeight="bold">{location.name}</CustomText>
                                <CustomText style={styles.subText}>{location.address}</CustomText>
                              </View>
                            </TouchableOpacity>
                          </View>
                        ))}
                        <View style={styles.lastdropdownLocation}>
                          <TouchableOpacity
                            onPress={handleNoLocationSelect}
                            style={styles.dropdownItemTouchable}
                          >
                            <View style={styles.contentDetails}>
                              <CustomText style={styles.textDetails} fontWeight="bold"> 장소 선택하지 않고 입력하기 </CustomText>
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  )
                }

                {/* Location Detail */}
                {
                  initialLocationDetail !=='' && (
                    <>
                      <CustomText style={styles.subsectionText}>관람 장소 (세부)</CustomText>
                      <CustomTextInput style={styles.inputBox} value={locationDetail} onChangeText={setLocationDetail} placeholder={getCategoryPlaceholder(category, 'locationDetail')}/>
                    </>
                  )
                }

                {/* Seats */}
                <CustomText style={styles.subsectionText}>관람 좌석</CustomText>
                <CustomTextInput style={styles.inputBox} value={seats} onChangeText={setSeats} placeholder={getCategoryPlaceholder(category, 'seats')}/>
            </>
          }
          </View>
          {
            isContentVisible && 
            (<View style={styles.floatingButtonContainer}>
                <NextBtn
                  isDisabled={!isFormValid()}
                  onPress={() => {
                    if (isFormValid()) {
                      handleNext();
                    }
                  }}
                />
            </View>)
          }
        </KeyboardAwareScrollView>
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
    checkIcon: {
      width: 12,
      height: 12,
      position: 'absolute',
      right: 10,
    },
    imageContainer: {
      flexDirection: 'row',
    },
    lastdropdownItem: {
      padding: 15,
      marginBottom: 0,
      borderBottomColor: '#EEEEEE',
    },
    lastdropdownLocation: {
      padding: 12,
      marginBottom: 0,
      borderBottomColor: '#EEEEEE',
    },
    textDetails: {
      textAlign: 'center',
      fontSize: 15,
      color: '#9A9A9A',
    },
});

export default EnrollInfoByScrape;
