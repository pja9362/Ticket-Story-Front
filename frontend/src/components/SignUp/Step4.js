import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation, CommonActions } from '@react-navigation/native';
import logo from '../../images/character_black.png';
import {CustomText} from '../CustomText';
import analytics from '@react-native-firebase/analytics';
// import { useNavigation, CommonActions } from '@react-navigation/native';

const Step4 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const today = new Date();
    const formattedDate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
    analytics().logEvent('sign_up', {method: 'general'});
    analytics().setUserProperty('signup_date', formattedDate);
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.navigate('AppGuide');
      // navigation.dispatch(CommonActions.reset({
      //   index: 0,
      //   routes: [{name: 'AppGuide'}]
      // }))
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