import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  Platform,
  BackHandler
} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../components/LoadingScreen';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import { searchContent, searchLocation, clearContent, clearLocation } from '../../actions/enrollTicketSearch/search';
import { useDispatch, useSelector } from 'react-redux';
import { getMappedDetailCategory, getMappedCategory } from '../../utils/getMappedCategory';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import checkIcon from '../../images/icon_circleCheck.png';
import defaultImage from '../../images/ticket_default_poster_movie.png'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePickerModal from 'react-native-modal-datetime-picker'; //
import { CustomText, CustomTextInput } from '../../components/CustomText';
import { useFocusEffect } from '@react-navigation/native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { State } from 'react-native-gesture-handler';
import AskGoBack from '../../components/EnrollTicket/AskGoBack';

const EnrollInfoByOCR = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const { categoryInfo } = route.params;
  // const { category, categoryDetail } = categoryInfo;

    //
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [category, setCategory] = useState(categoryInfo.category);
    const [categoryDetail, setCategoryDetail] = useState(categoryInfo.categoryDetail);
  
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
  const [modalVisible, setModalVisible] = useState(false); 

  const onSwipe = (event) => {
    if (event.nativeEvent.state === State.END) {
      setModalVisible(true);
    }
  };

  const handleBack = () => {
    setModalVisible(false);
    navigation.navigate("MainStack");
  }

  const [selectedTime, setSelectedTime] = useState(''); 

  const [contentsId, setContentsId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seats, setSeats] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [ocrResponse, setOcrResponse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingIcon, setLoadingIcon] = useState(1); 

  const [showContentDropdown, setShowContentDropdown] = useState(true);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const getOcrResponse = async () => {
        try {
          const response = await AsyncStorage.getItem('ticket');

          if (response && response.trim() !== '') {
            setOcrResponse(JSON.parse(response));
            console.log('ocrResponse: ', JSON.parse(response));
            setLoading(false);
          } else {
            console.log('1', response);

            const intervalId = setInterval(async () => {
              const updatedResponse = await AsyncStorage.getItem('ticket');
              if (updatedResponse && updatedResponse.trim() !== '') {
                console.log('2', updatedResponse);

                const parsedResponse = JSON.parse(updatedResponse);
                const { title, location, seat, location_detail } = parsedResponse.ocr_result;
                const nonEmptyFields = [title, location, seat, location_detail].filter(field => field && field.trim() !== '').length;

                if (nonEmptyFields >= 2) {
                  console.log('3', parsedResponse);
                  setOcrResponse(parsedResponse);
                  clearInterval(intervalId);
                  setLoading(false);
                } else {
                  console.log(4);
                  clearInterval(intervalId);
                  navigation.navigate('OCRFail', { categoryInfo });
                }
              }
            }, 2000);

            if (response && response.trim() !== '') {
              clearInterval(intervalId);
              setLoading(false);
            }
            return () => clearInterval(intervalId);
          }
        } catch (error) {
          console.error('Error retrieving OCR response:', error);
          setLoading(false);
        }
      };
      getOcrResponse();
    }, [navigation])
  );


  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingIcon((prevIcon) => (prevIcon % 4) + 1); 
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (ocrResponse) {
      const { ocr_result } = ocrResponse;
      setTitle(ocr_result.title || '');
      setLocation(ocr_result.location || '');
      setLocationDetail(ocr_result.location_detail || '');
      setSeats(ocr_result.seat || '');
      setDate(ocr_result.time.split(' ')[0] || '');
      setTime(ocr_result.time.split(' ')[1] || '');
    }
  }, [ocrResponse]);

  useEffect(() => {
    let transformedCategoryDetail = '';
    if (categoryDetail === '메가박스') {
      transformedCategoryDetail = 'MEGABOX';
    } else if (categoryDetail === '롯데시네마') {
      transformedCategoryDetail = 'LOTTECINEMA';
    } else if (categoryDetail === '독립영화관') {
      transformedCategoryDetail = 'ETC';
    } else {
      transformedCategoryDetail = categoryDetail;
    }
    setCategoryDetail(transformedCategoryDetail);
  }, [categoryDetail]);

  useEffect(() => {
    if (title.trim() !== '' && isContentSelected === false) {
      let mappedCategory = getMappedCategory(category);
      const timeoutId = setTimeout(() => {

        if (category === 'PERFORMANCE') {
          dispatch(searchContent(title, date, categoryDetail, 'OCR'));
        } else {
          dispatch(searchContent(title, date, category, 'OCR'));
        }

        setShowContentDropdown(true);
      }, 300);
      return () => clearTimeout(timeoutId);
    }
  }, [title]);

  useEffect(() => {
    if (location.trim() !== '' && isLocationSelected === false) {
      const timeoutId = setTimeout(() => {
        dispatch(searchLocation(location, category, categoryDetail));
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
      handleLocationSearch(location);
      setShowLocationDropdown(true);
    }
  
    const handleNoLocationSelect = () => {
      setShowLocationDropdown(false);
      setIsLocationSelected(true);
      setLocationId(null);
    }
    //

  const handleClearList = (type) => {
    if(type === 'content') {
      dispatch(clearContent());
    } else if(type === 'location') {
      dispatch(clearLocation());
    }
  }

  const handleContentSelect = (content) => {
    setTitle(content.title);
    setContentsId(content.content_id);
    // setLocationId(content.location_id);
    content.location_id !== null && setLocation(content.location_name);
    content.location_id !== null && setLocationId(content.location_id);
    // content.location_name !== null && setIsLocationSelected(true);
    setShowContentDropdown(false);
    content.location_id == null && handleLocationSearch(location);
    handleClearList('content');
    setIsContentSelected(true);
  }


  const handleLocationSearch = (location) => {
    if(locationId !== null) return;
    else {
      // dispatch(searchLocation(location));
      dispatch(searchLocation(location, category, categoryDetail));
      setShowLocationDropdown(true);
    }
  }

  const isFormValid = () => {
    return title !== '' && date !== '' && time !== '' && location !== '' && isContentSelected == true && isLocationSelected == true;
  };

  const handleNext = async () => {
    const { category: mappedCategory, categoryDetail: mappedCategoryDetail } = getMappedDetailCategory(category, categoryDetail);
  
    const ticketData = {
      registerBy: 'OCR',
      category: mappedCategory,
      // categoryDetail: mappedCategoryDetail,
      categoryDetail: mappedCategoryDetail === '메가박스' ? 'MEGABOX' : mappedCategoryDetail === '롯데시네마' ? 'LOTTECINEMA' : mappedCategoryDetail === '독립영화관' ? 'ETC' : mappedCategoryDetail,
      platform: '',
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
  
    if (isFormValid()) {
        navigation.navigate('EnrollReview', { title, ticketData })
    } else {
      alert('필수 입력 항목을 모두 입력해주세요!');
    }
  }

  const handleTitleChange = (text) => {
    if (text.length <= title.length || text.length <= 30) {
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

  const content = (
    <View style={{ flex : 1}}>
      <EnrollHeader
            title="티켓 정보 입력"
            backDestination="MainStack"
            needAlert="true"
            // onIconClick={() => { navigation.navigate('EnrollReview', {title: title}) }}
          />
            <KeyboardAwareScrollView style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
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
                          style={[styles.inputBox, { flex: 2}]}
                          value={date}
                          placeholder='YYYY.MM.DD'
                          placeholderTextColor="#B6B6B6"
                          textAlign="center"
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
                          textAlign="center"
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

                  <CustomText style={styles.sectionText}>
                    관람 콘텐츠
                    <CustomText style={styles.requiredIndicator}>*</CustomText>
                  </CustomText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    { contentsId !== null &&
                          <Image style={styles.checkIcon} source={checkIcon} />
                    }
                    <CustomTextInput style={{...styles.inputBox, flex: 1, paddingRight: 30}} value={title} onChangeText={handleTitleChange} placeholder={getCategoryPlaceholder(category, 'title')} placeholderTextColor="#B6B6B6"/> 
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
                                  {/* <CustomText style={{color: '#8A8A8A'}} fontWeight="medium">{content.detail.join(', ')}</CustomText> */}
                                  <CustomText style={{color: '#8A8A8A'}} fontWeight="medium">{content.detail.join('・')}</CustomText>
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
                  
                  <CustomText style={styles.sectionText}>
                      관람 장소
                      <CustomText style={styles.requiredIndicator}>*</CustomText>
                  </CustomText>
                  <View style={styles.inputBoxContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      { locationId !== null &&
                        <Image style={styles.checkIcon} source={checkIcon} />
                      }
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
              </View>

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
            </KeyboardAwareScrollView>
    </View>
  )

  useEffect(() => {
    navigation.setOptions({ gestureEnabled: !loading })
  }, [loading])

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (loading) {
          return true; 
        }

        navigation.navigate("MainStack");
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [loading])
  );

  return (
    <>
      {loading ? (
          <LoadingScreen iconId={loadingIcon}/>
      ) : (
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
          {/* {modalVisible ? <AskGoBack backDestination="MainStack" /> : null} */}

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
        </>
      )}
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
    borderColor: '#B6B6B6',
    borderRadius: 5,
    height: 40,
    paddingHorizontal: 10,
    color: '#525252',
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
  subText: {
    fontSize: 12,
    color: '#8A8A8A'
  },
});

export default EnrollInfoByOCR;
