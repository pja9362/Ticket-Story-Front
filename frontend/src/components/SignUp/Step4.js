import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../images/character_black.png';
import {CustomText} from '../CustomText';

const Step4 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('MainStack');
    }, 1000);

    return () => clearTimeout(timeoutId); 
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <CustomText style={styles.mainText} fontWeight="bold">계정 생성이 완료되었어요.</CustomText>
      <CustomText style={styles.guideText} fontWeight="medium">잠시 후 메인 페이지로 이동합니다.</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: '60%',
    // marginBottom: 10,
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  mainText: {
    fontSize: 17,
    lineHeight: 25,
    color: '#525252'
  },
  guideText: {
    fontSize: 12,
    lineHeight: 25,
    color: '#B6B6B6'
  },
});

export default Step4;