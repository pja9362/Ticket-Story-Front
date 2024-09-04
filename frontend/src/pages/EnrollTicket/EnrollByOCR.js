import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ticket from '../../images/ticket_ocr_info.png';
import closeIcon from '../../images/icon_close_white.png';
import OCR from '../../components/EnrollTicket/OCR';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomText } from '../../components/CustomText';

const EnrollByOCR = ({route, navigation}) => {
  const {categoryInfo} = route.params;

  console.log('categoryInfo:', categoryInfo);
  console.log('categoryInfo:', categoryInfo.category);

  const [showGuide, setShowGuide] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      onCloseGuide();
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, []);

  const onCloseGuide = () => {
    setShowGuide(false);
  }

  const onNextStep = async() => {
    await AsyncStorage.removeItem('ticket');
    navigation.navigate('EnrollInfoByOCR', {categoryInfo})
  }


  return (
    <>
      {showGuide ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCloseGuide}>
            <Image source={closeIcon} style={styles.closeImg} />
          </TouchableOpacity>

          <Image source={ticket} style={styles.image} />
          <CustomText style={styles.mainText} fontWeight="bold">
            관람한 티켓의{'\n'}제목과 시간, 좌석 정보 부분이{'\n'}잘 나오게 찍어주세요
          </CustomText>
          <CustomText style={styles.subText}>
            잠시 후 카메라가 작동됩니다
          </CustomText>
        </View>
      ) : (
        <OCR onNextStep={onNextStep} category={categoryInfo.category}/>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0,0,0,0.3)',
    backgroundColor: '#525252',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
  },
  closeImg: {
    width: 40,
    height: 40,
  },
  image: {
    width: 50,
    height: 25,
  },
  mainText: {
    fontSize: 20,
    lineHeight: 26,
    color: '#fff',
    textAlign: 'center',
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});

export default EnrollByOCR;
