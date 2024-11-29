// import React from 'react';
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import closeIcon from '../../images/icon_close.png';
import { CustomText } from '../../components/CustomText';
import home from '../../images/icon_home.png';
import storycard from '../../images/icon_storycard.png';
import addticket from '../../images/icon_addticket.png';
import analytics from '@react-native-firebase/analytics';
// import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'

const OCRFail = ({navigation, route}) => {
  const { categoryInfo } = route.params;

  useEffect(() => {
    console.log('categoryInfo in OCRFail : ',categoryInfo);
    analytics().logEvent('ticket_camera_ocr_fail');
  },[]);

  const ocrAgain = () => {
    navigation.replace('EnrollByOCR', {categoryInfo})
    analytics().logEvent('ticket_camera_ocr_redo');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={()=> navigation.navigate('MainStack')}>
        <Image source={closeIcon} style={styles.img} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <CustomText style={styles.mainText} fontWeight="bold">티켓 인식에 실패했습니다.</CustomText>
        <CustomText style={styles.subText}>
          깨끗한 배경에 티켓을 놓고{'\n'}전체가 잘 나오도록 촬영해 주세요.
        </CustomText>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.replace('EnrollByOCR', {categoryInfo})}>
            <Image style={styles.storyIcon} source={storycard}/>
            <CustomText style={styles.btnText} fontWeight="medium">다시 촬영하기</CustomText>
        </TouchableOpacity>
        <TouchableOpacity style={{...styles.navButton, backgroundColor: '#5D70F9' }} onPress={() => navigation.navigate('MainStack')}>
            <Image style={styles.homeIcon} source={home} />
            <CustomText style={{...styles.btnText, color: '#fff'}} fontWeight="medium">홈으로 가기</CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
  },
  img: {
    width: 40,
    height: 40,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
    gap: 20,
  },
  mainText: {
    fontSize: 18,
    color: '#525252',
  },
  subText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#525252',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#000',
    height: 40,
    paddingHorizontal: 23,
    borderRadius: 50,
  },
  // btnText: {
  //   lineHeight: 40,
  //   color: '#fff',
  //   fontSize: 16,
  // },
  btnText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '20%',
    paddingHorizontal: 40,
    width: '100%',
    gap: 16,
    marginBottom: -150
  },
  navButton: {
    backgroundColor: '#EEEEEE',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 10,
  },
  homeIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
    left: 20,
    top: '50%',
    marginTop: 3,
  },
  storyIcon: {
      width: 50,
      height: 50,
      position: 'absolute',
      left: 5,
      marginTop: 3,
  },
  addticket: {
      width: 50,
      height: 50,
      position: 'absolute',
      left: 6,
      marginTop: 3,
  },
});

export default OCRFail;
