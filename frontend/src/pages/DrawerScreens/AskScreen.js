import React, {useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';
import askInfo from '../../images/ask_info.png';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'
import analytics from '@react-native-firebase/analytics';

const AskScreen = () => {

  useEffect(() => {
    analytics().logScreenView({
      screen_name: '문의하기',
      screen_class: 'menu'
    })
  }, [])

  return (
    <View style={styles.container}>
    <Header title='문의하기'/>
      <View style={styles.askContainer}> 
        <Image source={askInfo} style={styles.askCard} />
      </View>
    {/* <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.centeredView}>
            <CustomText style={styles.text} fontWeight="bold"> Contact Us </CustomText>
            <CustomText style={styles.text} > admin@ticketstory.com </CustomText>
        </View>
    </ScrollView> */}
    </View>

  );
};


const styles = StyleSheet.create({
  askContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  askCard: {
    marginTop: scale(120),
    marginRight: scale(2),
    width: scale(380),
    height: scale(380),
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0
  },
  text: { 
    color:'#525252',
    fontSize: 16,
    marginTop: 15
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20, // 추가적인 패딩 조정 가능
  },
});

export default AskScreen;
