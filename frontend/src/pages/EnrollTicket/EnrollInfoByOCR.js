import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
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

const EnrollInfoByOCR = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;

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
      const formattedDate = await selectedDate.toISOString().split('T')[0].replace(/-/g, '.');
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

  useEffect(() => {
    const getOcrResponse = async () => {
      try {
        const response = await AsyncStorage.getItem('ticket');
        
        if (response && response.trim() !== '') {
          setOcrResponse(JSON.parse(response));
          console.log('ocrResponse: ', JSON.parse(response));
          setLoading(false);
        } else {
          const intervalId = setInterval(async () => {
            const updatedResponse = await AsyncStorage.getItem('ticket');
            if (updatedResponse && updatedResponse.trim() !== '') {
              setOcrResponse(JSON.parse(updatedResponse));
              clearInterval(intervalId);
              setLoading(false);
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
  }, []);

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

  // useEffect(() => {
  //   if(title.trim() !== '') {
  //     let mappedCategory = getMappedCategory(category);
  //     dispatch(searchContent(title, date, mappedCategory, "OCR"));
  //     console.log('searchContent: ', title, date, mappedCategory);
  //   }
  // }, [title]);

  useEffect(() => {
    if (title.trim() !== '' && isContentSelected === false) {
      let mappedCategory = getMappedCategory(category);
      const timeoutId = setTimeout(() => {
        dispatch(searchContent(title, date, mappedCategory, "OCR"));
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
    setShowContentDropdown(false);
    content.location_id == null && handleLocationSearch(location);
    handleClearList('content');
    setIsContentSelected(true);
  }


  const handleLocationSearch = (location) => {
    if(locationId !== null) return;
    else {
      dispatch(searchLocation(location));
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
      categoryDetail: mappedCategoryDetail,
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

  return (
    <>
      {loading ? (
          <LoadingScreen iconId={loadingIcon}/>
      ) : (
        <>
          <EnrollHeader
            title="티켓 정보 입력"
            backDestination="MainStack"
            onIconClick={() => { navigation.navigate('EnrollReview', {title: title}) }}
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
                          placeholderTextColor="#ccc"
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
                          placeholderTextColor="#ccc"
                          editable={false}
                        />
                      </View>
                    </TouchableOpacity>

                    <DateTimePickerModal
                      isVisible={isDatePickerVisible}
                      mode="date"
                      // date = {date != '' ? new Date('2014-6-4') : new Date()}
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

                  <CustomText style={styles.sectionText}>
                    관람 콘텐츠
                    <CustomText style={styles.requiredIndicator}>*</CustomText>
                  </CustomText>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    { contentsId !== null &&
                          <Image style={styles.checkIcon} source={checkIcon} />
                    }
                    <CustomTextInput style={{...styles.inputBox, flex: 1}} value={title} onChangeText={(text) => {setTitle(text); setIsContentSelected(false); setContentsId(null);}} placeholder='콘텐츠 검색' placeholderTextColor="#ccc"/> 
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
                          style={[styles.inputBox, {color: '#525252', textAlign: 'center', marginRight: 15}]}
                          value={categoryDetail}
                          editable={false}
                          fontWeight="bold"
                        />
                      ) : null}
                      <CustomTextInput
                        style={[styles.inputBox, { flex: 1 }]}
                        value={location}
                        onChangeText={(text) => {setLocation(text); setIsLocationSelected(false); setLocationId(null);}}
                        placeholder={getCategoryPlaceholder(category, 'location')}
                        placeholderTextColor="#ccc"
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

                  <CustomText style={styles.sectionText}>관람 장소 (세부)</CustomText>
                  <CustomTextInput
                    style={styles.inputBox}
                    value={locationDetail}
                    onChangeText={text => setLocationDetail(text)}
                    placeholder={getCategoryPlaceholder(category, 'locationDetail')}
                    placeholderTextColor="#ccc"
                  />

                  <CustomText style={styles.sectionText}>관람 좌석</CustomText>
                  <View style={styles.seatInputContainer}>
                    <CustomTextInput
                      style={[styles.inputBox, { flex: 1 }]}
                      value={seats}
                      onChangeText={text => setSeats(text)}
                      placeholder={getCategoryPlaceholder(category, 'seats')}
                      placeholderTextColor="#ccc"
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

export default EnrollInfoByOCR;
