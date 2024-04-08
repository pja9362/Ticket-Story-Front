import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from '../../components/LoadingScreen';
import NextBtn from '../../components/EnrollTicket/NextBtn';
import getCategoryPlaceholder from '../../utils/getCategoryPlaceholder';
import checkIcon from '../../images/icon_circleCheck.png';

const EnrollInfoByOCR = ({ route, navigation }) => {
  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seats, setSeats] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const [ocrResponse, setOcrResponse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [loadingIcon, setLoadingIcon] = useState(1); 

  const isFormValid = () => {
    return title.trim() !== '' && location.trim() !== '';
  }

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
              <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={text => setTitle(text)}
                placeholder='콘텐츠 제목'
              />

              <Text style={styles.sectionText}>
                  관람 장소
                  <Text style={styles.requiredIndicator}>*</Text>
              </Text>
              <View style={styles.inputBoxContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                  {category === 'MOVIE' ? (
                    <TextInput
                      style={[styles.inputBox, { flex: 1, fontWeight: 'bold', color: '#525252', textAlign: 'center'}]}
                      value={categoryDetail}
                      editable={false}
                    />
                  ) : null}
                  <TextInput
                    style={[styles.inputBox, { flex: 3 }]}
                    value={location}
                    onChangeText={text => setLocation(text)}
                    placeholder={getCategoryPlaceholder(category, 'location')}
                  />
                </View>
              </View>

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
          {/* <View style={styles.floatingButtonContainer}>
            <NextBtn
              isDisabled={!isFormValid()}
              onPress={() => {
                if (isFormValid()) {
                  handleEnrollTicket();
                  navigation.navigate('EnrollReview', { title })
                }
              }}
            />
          </View> */}
        </View>
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
});

export default EnrollInfoByOCR;
