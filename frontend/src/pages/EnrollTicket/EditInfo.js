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
import analytics from '@react-native-firebase/analytics';

const EditInfo = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const [showContentDropdown, setShowContentDropdown] = useState(true);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);

    //
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

    useEffect(() => {
      analytics().logScreenView({
        screen_name: '티켓 정보 수정',
        screen_class: 'ticket_edit'
      })
    }, [])
  
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };
  
    const handleConfirmDate = async (selectedDate) => {
      hideDatePicker();

      const timezoneOffset = 9 * 60 * 60 * 1000; // 9시간을 밀리초로 변환
      const adjustedDate = new Date(selectedDate.getTime() + timezoneOffset);
  
      const formattedDate = await adjustedDate.toISOString().split('T')[0].replace(/-/g, '.');
      setDate(formattedDate);
    };
  
    const showTimePicker = () => {
      setTimePickerVisibility(true);
    };
  
    const hideTimePicker = () => {
      setTimePickerVisibility(false);
    };
  
    const handleConfirmTime = (selectedTime) => {
      console.log(selectedTime);
      hideTimePicker();

      const roundedMinutes = Math.floor(selectedTime.getMinutes() / 5) * 5;
      selectedTime.setMinutes(roundedMinutes);
      selectedTime.setSeconds(0); // 초를 0으로 설정
  
      const hours = selectedTime.getHours().toString().padStart(2, '0');
      const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
      setTime(`${hours}:${minutes}`);
      setSelectedTime(selectedTime);
    };
  //

  const [selectedTime, setSelectedTime] = useState(''); 

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
  const [category, setCategory] = useState(ticketData.category);
  const [categoryDetail, setCategoryDetail] = useState(ticketData.categoryDetail);

  const categories = ['영화', '공연', '스포츠'];
  const detailCategories = {
    영화: ['CGV', '메가박스', '롯데시네마', '독립영화관'],
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

  useEffect(() => {
    console.log(isLocationSelected);
  }, [title])


  const handleNext = async () => {
    const { category: mappedCategory, categoryDetail: mappedCategoryDetail } = getMappedDetailCategory(category, categoryDetail);
  
    const ticket = {
      registerBy: ticketData.registerBy,
      category: mappedCategory === '영화' ? 'MOVIE' : mappedCategory,
      // categoryDetail: mappedCategoryDetail,
      categoryDetail: mappedCategoryDetail === '메가박스' ? 'MEGABOX' : mappedCategoryDetail === '롯데시네마' ? 'LOTTECINEMA' : mappedCategoryDetail === '독립영화관' ? 'ETC' : mappedCategoryDetail,
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
        analytics().logEvent('ticketcard_info_edit')
        analytics().logScreenView({
          screen_name: '티켓 정보 수정 완료',
          screen_class: 'ticket_edit'
        })
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

    console.log('어찌뜨는데?', content);
    // setLocationId(content.location_id);
    content.location_id !== null && setLocationId(content.location_id);
    content.location_id !== null && setLocation(content.location_name);
    content.location_name !== null && setIsLocationSelected(true);
    setShowContentDropdown(false);
    content.location_id == null && handleLocationSearch(location);
    handleClearList('content');
    setIsContentSelected(true); //
  }

  const handleLocationSearch = (location) => {
    const { category: mappedCategory, categoryDetail: mappedCategoryDetail } = getMappedDetailCategory(category, categoryDetail);
    let parsedCategory = (mappedCategory == 'MUSICAL' || mappedCategory == 'PLAY') ? 'PERFORMANCE' : mappedCategory

    if(locationId !== null) return;
    else {
      // dispatch(searchLocation(location, category, categoryDetail));
      dispatch(searchLocation(location, parsedCategory, mappedCategoryDetail));
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
      const { category: mappedCategory, categoryDetail: mappedCategoryDetail } = getMappedDetailCategory(category, categoryDetail);
      const timeoutId = setTimeout(() => {
        // dispatch(searchLocation(location, category, categoryDetail));
        dispatch(searchLocation(location, mappedCategory, mappedCategoryDetail));
        setShowLocationDropdown(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  const handleTitleChange = (text) => {
    if (text.length <= 30) {
      console.log(text.length);
      setTitle(text);
      setIsContentSelected(false);
      setContentsId(null);
    } else {
      alert('콘텐츠 제목은 30자 이내로 입력해주세요.');
    }
  };

  const handleLocationChange = (text) => {
    if (text.length <= 20) {
      console.log(text.length);
      setLocation(text);
      setIsLocationSelected(false);
      setLocationId(null);
    } else {
      alert('관람 장소는 20자 이내로 입력해주세요.');
    }
  };

  const parseLocation = (address) => {
    const addressList = address && address.split(' ');
    if (addressList == null) {
      return '';
    } else if (addressList.length == 1) {
      return addressList[0];
    } else {
      return address.split(' ').slice(0, 2).join(' ')
    }
  }

  
  return (
    <>
      <EnrollHeader title="티켓 정보 수정" needAlert="true" />
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
                  {/* <CustomText style={styles.sectionText} fontWeight="bold">관람한 {category == '공연' ? '공연 종류를' : '스포츠 종목을'} 선택해 주세요.</CustomText> */}
                  <CustomText style={styles.sectionText} fontWeight="bold">관람한 {category == '영화' ? '멀티플렉스를' : category == '공연' ? '공연 종류를' : '스포츠 종목을'} 선택해 주세요.</CustomText>
                  <CategoryBtnContainer
                    categories={detailCategories[category]}
                    selectedCategory={categoryDetail}
                    onSelectCategory={handleCategoryDetailSelect}
                    makeSmall={category === '영화'} 
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
                        placeholderTextColor="#B6B6B6"
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
                        placeholderTextColor="#B6B6B6"
                        editable={false}
                      />
                    </View>
                  </TouchableOpacity>

                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    date={date !== '' ? new Date(date.replace(/\./g, '-')) : new Date()}
                    onConfirm={handleConfirmDate}
                    onCancel={hideDatePicker}
                    locale="ko"
                    display="inline"
                  />

                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    // date={selectedTime || new Date()}
                    date={time ? new Date(`1970-01-01T${time}:00`) : new Date()}
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
                  <CustomTextInput style={{...styles.inputBox, flex: 1, paddingRight: 30}} value={title} onChangeText={handleTitleChange} placeholder={getCategoryPlaceholder(category, 'title')} placeholderTextColor="#B6B6B6"/>
                  {/* <CustomTextInput style={{ ...styles.inputBox, flex: 1 }} value={title} onChangeText={(text) => { if (text.length <= 20) { setTitle(text); setIsContentSelected(false); setContentsId(null); } }} placeholder='콘텐츠 제목' placeholderTextColor="#B6B6B6" /> */}
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
                                <CustomText style={{color: '#525252'}} fontWeight="bold">{content.title}</CustomText>
                                <CustomText style={{color: '#8A8A8A'}}>{content.detail.join(', ')}</CustomText>
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
                  <CustomTextInput style={{...styles.inputBox, flex: 1, paddingRight: 30}} value={location} onChangeText={handleLocationChange} placeholder={getCategoryPlaceholder(category, 'location')} placeholderTextColor="#B6B6B6"/>
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
                                <CustomText style={{ flex: 1, color: '#525252' }} fontWeight="bold">{location.name}</CustomText>
                                <CustomText style={styles.subText}>{parseLocation(location.address) || ''}</CustomText>
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
                
                {/* {
                  initialLocationDetail !=='' && (
                    <> */}
                      <CustomText style={styles.subsectionText}>관람 장소 (세부)</CustomText>
                      <CustomTextInput style={styles.inputBox} value={locationDetail} onChangeText={setLocationDetail} placeholder={getCategoryPlaceholder(category, 'locationDetail')} placeholderTextColor="#B6B6B6"/>
                    {/* </>
                  )
                } */}

                {/* Seats */}
                <CustomText style={styles.subsectionText}>관람 좌석</CustomText>
                <CustomTextInput style={styles.inputBox} value={seats} onChangeText={setSeats} placeholder={getCategoryPlaceholder(category, 'seats')} placeholderTextColor="#B6B6B6"/>
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
      borderColor: '#B6B6B6',
      borderRadius: 5,
      height: 40,
      paddingHorizontal: 10,
      color: '#525252',
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
      marginBottom : 80
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

export default EditInfo;
