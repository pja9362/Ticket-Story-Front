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

const EnrollInfoByOCR = ({ route, navigation }) => {
  const { categoryInfo } = route.params;
  const { category, categoryDetail } = categoryInfo;

  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [seatRow, setSeatRow] = useState('');
  const [seatNum, setSeatNum] = useState('');
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [time, setTime] = useState('');

  const [ocrResponse, setOcrResponse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingIcon, setLoadingIcon] = useState(1); 

  const initValues = () => {
    if (ocrResponse) {

      let ocrResult = ocrResponse.ocr_result;
      setTitle(ocrResult.title);
      setLocation(ocrResult.location);
      setLocationDetail(ocrResult.locationDetail);
      console.log(ocrResult.title, ocrResult.location, ocrResult.locationDetail)
    }
  };

  useEffect(() => {
    const getOcrResponse = async () => {
      try {
        const response = await AsyncStorage.getItem('ticket');
        
        if (response && response.trim() !== '') {
          setOcrResponse(JSON.parse(response));
          console.log('ocrResponse: ', JSON.parse(response));
          initValues();
          setLoading(false);
        } else {
          const intervalId = setInterval(async () => {
            const updatedResponse = await AsyncStorage.getItem('ticket');
            if (updatedResponse && updatedResponse.trim() !== '') {
              setOcrResponse(JSON.parse(updatedResponse));
              clearInterval(intervalId);
              initValues();
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

  const parseSeatInfo = () => {
    if (ocrResponse && ocrResponse.seat) {
      const seatInfo = ocrResponse.seat.trim();
  
      // Extract seatRow and seatNum using regex
      const seatRowMatch = seatInfo.match(/(\w+)열/);
      const seatRow = seatRowMatch ? seatRowMatch[1] : '';
  
      const seatNumMatch = seatInfo.match(/\d+-\d+|\d+(?=(번|$))/g);
      const seatNum = seatNumMatch ? seatNumMatch.join(', ') : '';

      setSeatRow(seatRow.trim());
      setSeatNum(seatNum.trim());
    }
  };  

  const parseTimeInfo = () => {
    if (ocrResponse && ocrResponse.time) {
      const [date, time] = ocrResponse.time.split(' ');
      const [year, month, day] = date.split('-');
      setYear(year || '');
      setMonth(month || '');
      setDay(day || '');
      setTime(time || '');
    }
  };

  useEffect(() => {
    parseSeatInfo();
    parseTimeInfo();
  }, [ocrResponse]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoadingIcon((prevIcon) => (prevIcon % 4) + 1); 
    }, 200);

    return () => clearInterval(intervalId);
  }, []);

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
              <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#000' }}>
                작품 정보를 입력해주세요.
              </Text>

              <Text style={styles.sectionText}>관람 작품</Text>
              <TextInput
                style={styles.inputBox}
                value={title}
                onChangeText={(text) => setTitle(text)}
              />

              <Text style={styles.sectionText}>관람 장소</Text>
              <TextInput
                style={styles.inputBox}
                value={location}
                onChangeText={(text) => setLocation(text)}
              />

              <Text style={styles.sectionText}>관람 상영관</Text>
              <TextInput style={styles.inputBox} value={locationDetail} onChangeText={(text) => setLocationDetail(text)} />

              <Text style={styles.sectionText}>관람 좌석</Text>
              <View style={styles.seatInputContainer}>
                <TextInput
                  style={[styles.inputBox, { marginRight: 5, width: 35 }]}
                  value={seatRow}
                  onChangeText={(text) => setSeatRow(text)}
                />
                <Text style={styles.inputLabel}>열</Text>
                <TextInput
                  style={[styles.inputBox, { width: 'max-content' }]}
                  value={seatNum}
                  onChangeText={(text) => setSeatNum(text)}
                />
                <Text style={styles.inputLabel}>번</Text>
              </View>

              <Text style={styles.sectionText}>관람 일시</Text>
              <View style={styles.dateInputContainer}>
                <TextInput
                  style={[styles.inputBox, { width: 65 }]}
                  value={year}
                  onChangeText={(text) => setYear(text)}
                />
                <Text style={styles.inputLabel}>년</Text>
                <TextInput
                  style={[styles.inputBox, { width: 45 }]}
                  value={month}
                  onChangeText={(text) => setMonth(text)}
                />
                <Text style={styles.inputLabel}>월</Text>
                <TextInput
                  style={[styles.inputBox, { width: 45 }]}
                  value={day}
                  onChangeText={(text) => setDay(text)}
                />
                <Text style={styles.inputLabel}>일</Text>
                <TextInput
                  style={[styles.inputBox, { width: 65 }]}
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
          </View> 
        </>
        )
      }
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
});

export default EnrollInfoByOCR;
