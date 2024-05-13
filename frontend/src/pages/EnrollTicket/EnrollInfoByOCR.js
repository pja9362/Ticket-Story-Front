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

const EnrollInfoByOCR = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;

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

  useEffect(() => {
    if(title.trim() !== '') {
      let mappedCategory = getMappedCategory(category);
      dispatch(searchContent(title, date, mappedCategory, "OCR"));
      console.log('searchContent: ', title, date, mappedCategory);
    }
  }, [title]);

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

  const isFormValid = () => {
    return title !== '' && date !== '' && time !== '' && location !== '';
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
            onIconClick={() => { navigation.navigate('EnrollReview', {title: title}) }}
          />
            <ScrollView style={{backgroundColor: '#fff'}} showsVerticalScrollIndicator={false}>
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
                                <View style={styles.imageContainer}>
                                  {content.imageUrl.length > 0 ? (
                                    content.imageUrl.map((url, imageIndex) => (
                                      <Image
                                        key={imageIndex}
                                        style={styles.posterImage}
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
                  
                  <Text style={styles.sectionText}>
                      관람 장소
                      <Text style={styles.requiredIndicator}>*</Text>
                  </Text>
                  <View style={styles.inputBoxContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      { locationId !== null &&
                        <Image style={styles.checkIcon} source={checkIcon} />
                      }
                      {category === 'MOVIE' ? (
                        <TextInput
                          style={[styles.inputBox, { fontWeight: 'bold', color: '#525252', textAlign: 'center', marginRight: 15}]}
                          value={categoryDetail}
                          editable={false}
                        />
                      ) : null}
                      <TextInput
                        style={[styles.inputBox, { flex: 1 }]}
                        value={location}
                        onChangeText={text => setLocation(text)}
                        placeholder={getCategoryPlaceholder(category, 'location')}
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
                        handleNext();
                      }
                    }}
                  />
                </View>
            </ScrollView>
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
    position: 'absolute',
    bottom: 100,
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
  imageContainer: {
    flexDirection: 'row',
  },
});

export default EnrollInfoByOCR;
