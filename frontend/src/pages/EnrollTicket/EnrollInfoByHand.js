import React, { useCallback, useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Image, Modal, Keyboard, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent, searchLocation, clearContent, clearLocation } from '../../actions/enrollTicketSearch/search';
import checkIcon from '../../images/icon_circleCheck.png';
import defaultImage from '../../images/ticket_default_poster_movie.png'
import { CustomText, CustomTextInput } from '../../components/CustomText';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { State } from 'react-native-gesture-handler';
import AskGoBack from '../../components/EnrollTicket/AskGoBack';

import DateTimePickerModal from 'react-native-modal-datetime-picker'; //

const EnrollInfoByHand = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;

  useEffect(() => {
    console.log('categoryInfo:', categoryInfo);
  }, []);

  const [modalVisible, setModalVisible] = useState(false); 

  const onSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      setModalVisible(true);
    }
  };

  const handleBack = () => {
    setModalVisible(false);
    navigation.goBack();
  }

  //
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  // useEffect(() => { 
  //   navigation.addListener('beforeRemove', (e) => {
  //     console.log('hello',e);
  //   });
  // }, []);

  //
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

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

  // const handleConfirmDate = async (selectedDate) => {
  //   console.log('selectedDate',selectedDate);
  //   const formattedDate = await selectedDate.toISOString().split('T')[0].replace(/-/g, '.');
  //   console.log('formattedDate', formattedDate);
  //   setDate(formattedDate);
  //   hideDatePicker();
  // };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime) => {
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

  const [contentsId, setContentsId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seats, setSeats] = useState('');

  const isDateTimeInputFinish = date.trim() !== '' && time.trim() !== '';

  const [showContentDropdown, setShowContentDropdown] = useState(false);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);


  useEffect(() => {
    if (title.trim() !== '' && isContentSelected === false) {
      const timeoutId = setTimeout(() => {
        dispatch(searchContent(title, date, category, 'BASIC'));
        setShowContentDropdown(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [title]);

  useEffect(() => {
    if (location.trim() !== '' && isLocationSelected === false) {
      const timeoutId = setTimeout(() => {
        dispatch(searchLocation(location));
        setShowLocationDropdown(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  //
  const handleNoItemSelect = () => {
    setShowContentDropdown(false);
    setIsContentSelected(true);
    setContentsId(null);
  }

  const handleNoLocationSelect = () => {
    setShowLocationDropdown(false);
    setIsLocationSelected(true);
    setLocationId(null);
  }
  //

  const handleContentSelect = (content) => {
    setTitle(content.title);
    setContentsId(content.content_id);

    console.log('어찌뜨는데?', content);
    content.location_id !== null && setLocation(content.location_name); 
    content.location_id !== null && setLocationId(content.location_id);
    content.location_name !== null && setIsLocationSelected(true);
    setShowContentDropdown(false);
    handleClearList('content');
    setIsContentSelected(true);
  };
  
  const handleClearList = (type) => {
    if (type === 'content') {
      dispatch(clearContent());
    } else if (type === 'location') {
      dispatch(clearLocation());
    }
  };

  const isFormValid = () => {
    return title.trim() !== '' && isDateTimeInputFinish && isContentSelected && isLocationSelected;
  };
  
  const handleNext = async () => {
    const seatsArray = seats.split(/,|-/).map(seat => seat.trim());
  
    const ticketData = {
      registerBy: 'BASIC',
      category,
      categoryDetail: categoryDetail === '메가박스' || categoryDetail === 'CGV' || categoryDetail === '롯데시네마' ? 'MOVIE' : categoryDetail,
      platform: '',
      ticketImg: '',
      contentsDetails: {
        date,
        location: location,
        locationDetail,
        seats: seatsArray,
        time,
        title,
        contentsId: contentsId,
        locationId: locationId,
      }
    }
    if (isFormValid()) {
      navigation.navigate('EnrollReview', { title, ticketData })
    } else {
      alert('필수 입력 항목을 모두 입력해주세요!');
    }
  };

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



  const content = (
    <View style={{ flex: 1 }}>
      <EnrollHeader 
        title="티켓 정보 입력" 
        needAlert="true" 
        backDestination="MainStack"
        // onIconClick={() => isFormValid() ? navigation.navigate('EnrollReview', { title }) : alert('필수 입력 항목을 모두 입력해주세요!')} 
      />
        <KeyboardAwareScrollView style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
          <View style={styles.container}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: 5}}>
              <CustomText style={{ fontSize: 16, color: '#000' }} fontWeight="bold">
                작품 정보를 입력해주세요.
              </CustomText>
              <CustomText style={{ fontSize: 12, color: '#939393' }}>
                *표시는 필수 항목입니다.
              </CustomText>
            </View>

            <CustomText style={styles.sectionText}>
              관람 일시
              <CustomText style={styles.requiredIndicator}>*</CustomText>
            </CustomText>
            
            <View style={styles.dateInputContainer}>

              <TouchableOpacity onPress={showDatePicker}>
                <View pointerEvents="none">
                  <CustomTextInput
                    style={[styles.inputBox, { flex: 2 }]}
                    value={date}
                    textAlign="center"
                    placeholder='YYYY.MM.DD'
                    // mm='YYYY.MM.DD'
                    // placeholder='티켓'
                    placeholderTextColor="#B6B6B6"
                    editable={false}
                    placeholderStyle={{ fontFamily: 'Pretendard-Regular', color: '#B6B6B6' }}
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={showTimePicker}>
                <View pointerEvents="none">
                  <CustomTextInput
                    style={[styles.inputBox, { flex: 1 }]}
                    value={time}
                    placeholder='HH:MM'
                    textAlign="center"
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
                date={selectedTime || new Date()}
                mode="time"
                onConfirm={handleConfirmTime}
                onCancel={hideTimePicker}
                locale="ko"
                minuteInterval={5}
              />

            </View>
            {
              isDateTimeInputFinish && (
                <>
                  <CustomText style={styles.sectionText}>
                    관람 콘텐츠
                    <CustomText style={styles.requiredIndicator}>*</CustomText>
                  </CustomText>

                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    { contentsId !== null &&
                          <Image style={styles.checkIcon} source={checkIcon} />
                    }
                    {/* <CustomTextInput style={{...styles.inputBox, flex: 1}} value={title} onChangeText={(text) => {setTitle(text); setIsContentSelected(false); setContentsId(null);}} placeholder='콘텐츠 검색' placeholderTextColor="#B6B6B6"/> */}
                    <CustomTextInput style={{ ...styles.inputBox, flex: 1, paddingRight: 30 }} value={title} onChangeText={handleTitleChange} placeholder='콘텐츠 제목' placeholderTextColor="#B6B6B6" />
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
                                          style={[styles.posterImage, category == 'SPORTS' && { width: 50, height: 40, resizeMode: 'contain'}]}
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
                                    <CustomText style={{color: '#8A8A8A'}} fontWeight="medium">{content.detail.join(', ')}</CustomText>
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
                </>
              )
            }
            {
              isDateTimeInputFinish && isContentSelected && (
                <>
                  <CustomText style={styles.sectionText}>
                    관람 장소
                    <CustomText style={styles.requiredIndicator}>*</CustomText>
                  </CustomText>
                  <View style={styles.inputBoxContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      { locationId !== null &&
                            <Image style={styles.checkIcon} source={checkIcon} />
                      }
                      {category === 'MOVIE' ? (
                        <CustomTextInput
                          style={[styles.inputBox, { color: '#525252', textAlign: 'center', paddingHorizontal: 15, marginRight: 15}]}
                          value={categoryDetail}
                          editable={false}
                          fontWeight="bold"
                        />
                      ) : null}
                      <CustomTextInput
                        style={[styles.inputBox, { flex: 1, paddingRight: 30 }]}
                        value={location}
                        onChangeText={handleLocationChange}
                        placeholder={getCategoryPlaceholder(category, 'location')}
                        placeholderTextColor="#B6B6B6"
                      />
                    </View>
                  </View>
                  {/* Location Dropdown */}
                  {
                      showLocationDropdown && (
                        <View style={{marginVertical: 10}}>
                          <View style={styles.dropdown}>
                            {locationLists && locationLists.slice(0, 5).map((location, index) => (
                              <View key={index} style={styles.dropdownLocation}>
                                <TouchableOpacity
                                  onPress={() => {
                                    setLocation(location.name || location.location_name);
                                    setLocationId(location.location_id);
                                    setShowLocationDropdown(false);
                                    setIsLocationSelected(true);
                                  }}
                                  style={styles.dropdownItemTouchable}
                                >
                                  <View style={styles.locationDetails}>
                                    <CustomText style={{ flex: 1, color: '#525252' }} fontWeight="bold">{location.name}</CustomText>
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
                    <CustomText style={styles.sectionText}>관람 장소 (세부)</CustomText>
                    <CustomTextInput
                      style={styles.inputBox}
                      value={locationDetail}
                      onChangeText={text => setLocationDetail(text)}
                      placeholder={getCategoryPlaceholder(category, 'locationDetail')}
                      placeholderTextColor="#B6B6B6"
                    />

                    <CustomText style={styles.sectionText}>관람 좌석</CustomText>
                    <View style={styles.seatInputContainer}>
                      <CustomTextInput
                        style={[styles.inputBox, { flex: 1 }]}
                        value={seats}
                        onChangeText={text => setSeats(text)}
                        placeholder={getCategoryPlaceholder(category, 'seats')}
                        placeholderTextColor="#B6B6B6"
                      />
                    </View>
                </>
              )
            }
          </View>
          {
            isFormValid() && (
              <View style={styles.floatingButtonContainer}>
              <NextBtn
                isDisabled={!isFormValid()}
                onPress={() => { handleNext(); }}
              />
            </View>
            )
          }
        </KeyboardAwareScrollView>
    </View>
  )
  

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {Platform.OS === 'ios' ? (
          <PanGestureHandler onHandlerStateChange={onSwipe}>
            {content}
          </PanGestureHandler>
        ) : (
          content
        )}
      </GestureHandlerRootView>

    <Modal  
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', width: 280, padding: 18, borderRadius: 10 }}>
          <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', marginTop: 2, lineHeight: 25}} fontWeight="bold">이전으로 돌아가시겠어요? {'\n'} <CustomText style={{color: '#B6B6B6'}} fontWeight="bold">지금까지의 작성은 저장되지 않습니다</CustomText></CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 115, padding: 10, borderRadius: 10 }}>
              <CustomText style={{ color: '#525252', textAlign : 'center', fontSize: 17}} fontWeight="medium">취소</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack} style={{ backgroundColor: '#5D70f9', width: 115, padding: 10, borderRadius: 10 }}>
              <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 17}} fontWeight="medium">확인</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
    {/* {modalVisible ? <AskGoBack /> : null} */}
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
    borderColor: '#B6B6B6',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#525252',
    // letterSpacing: 2,
    // fontSize: 20,
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
    // position: 'absolute',
    // bottom: 100,
    // width: '100%',
    // alignItems: 'center',
    width: '100%',
    alignItems: 'center',
  },
  // dropdown
  dropdown: {
    borderWidth: 1,
    borderColor: '#B6B6B6',
    borderRadius: 5,
    padding: 10,
  },
  dropdownItem: {
    padding: 5,
    marginBottom: 5,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
  },
  dropdownLocation: {
    padding: 9,
    marginBottom: 5,
    borderBottomColor: '#EEEEEE',
    borderBottomWidth: 1,
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
  textDetails: {
    textAlign: 'center',
    fontSize: 15,
    color: '#9A9A9A',
  },
  subText: {
    fontSize: 12,
    color: '#8A8A8A'
  },
});

export default EnrollInfoByHand;