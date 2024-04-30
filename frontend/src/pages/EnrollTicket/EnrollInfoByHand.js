import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent, searchLocation } from '../../actions/enrollTicketSearch/search';
import checkIcon from '../../images/icon_circleCheck.png';

const EnrollInfoByHand = ({ route, navigation }) => {
  const dispatch = useDispatch();

  const contentLists = useSelector(state => state.enrollTicketSearch.contentLists);
  const locationLists = useSelector(state => state.enrollTicketSearch.locationLists);

  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;
  
  const [contentsId, setContentsId] = useState(null);
  const [locationId, setLocationId] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seats, setSeats] = useState('');

  const [showContentDropdown, setShowContentDropdown] = useState(false);
  const [isContentSelected, setIsContentSelected] = useState(false);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [isLocationSelected, setIsLocationSelected] = useState(false);

  useEffect(() => {
    if (title.trim() !== '' && isContentSelected === false) {
      const timeoutId = setTimeout(() => {
        dispatch(searchContent(title, date, category, 'BASIC'));
        setShowContentDropdown(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [title]);

  useEffect(() => {
    if (location.trim() !== '' && isLocationSelected === false) {
      const timeoutId = setTimeout(() => {
        dispatch(searchLocation(location));
        setShowLocationDropdown(true);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  const handleContentSelect = (content) => {
    setTitle(content.title);
    setContentsId(content.content_id);
    setLocationId(content.location_id);
    setShowContentDropdown(false);
    setIsContentSelected(true);
  };

  const isFormValid = () => {
    return title.trim() !== '' && date.trim() !== '' && time.trim() !== '' && location.trim() !== '';
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
        location: categoryDetail ? `${categoryDetail}${location}` : location,
        locationDetail,
        seats: seatsArray,
        time,
        title,
        contentsId: contentsId,
        locationId: locationId,
      }
    }

    console.log('Ticket:', ticketData);
    if (isFormValid()) {
      navigation.navigate('EnrollReview', { title, ticketData })
    } else {
      alert('필수 입력 항목을 모두 입력해주세요!');
    }
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
                style={[styles.inputBox, { fontWeight: 'bold', color: '#525252', textAlign: 'center', paddingHorizontal: 15, marginRight: 15}]}
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
                          setLocation(location.name || location.location_name);
                          setLocationId(location.location_id);
                          setShowLocationDropdown(false);
                          setIsLocationSelected(true);
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

export default EnrollInfoByHand;
