import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../../images/logo.png';
import {CustomText} from '../CustomText';

const Step4 = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigation.replace('MainStack');
    }, 1000);

    return () => clearTimeout(timeoutId); 
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image} />
      <CustomText style={styles.guideText}>계정 생성이 완료되었어요.</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    marginTop: '50%',
    marginBottom: 15,
    width: 163,
    height: 150,
    resizeMode: 'contain',
  },
  guideText: {
    fontSize: 14,
    lineHeight: 40,
    color: '#525252'
  },
});

export default Step4;