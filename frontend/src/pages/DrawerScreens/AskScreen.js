import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../components/CustomText';
import Header from '../../components/Header';

const AskScreen = () => {

  return (
    <View style={styles.container}>
    <Header title='문의하기'/>
    <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.centeredView}>
            <CustomText style={styles.text} fontWeight="bold"> Contact Us </CustomText>
            <CustomText style={styles.text} > admin@ticketstory.com </CustomText>
        </View>
    </ScrollView>
    </View>

  );
};


const styles = StyleSheet.create({
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
