import React, {useEffect} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../../components/CustomText';
import Header from '../../../components/Header';
import analytics from '@react-native-firebase/analytics';

const IconoirLicense = () => {

  useEffect(() => {
    analytics().logScreenView({
      screen_name: '오픈소스 라이선스',
      screen_class: 'menu'
    })
  }, [])

  return (
    <View style={styles.container}>
    <Header title='Iconoir'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
      <CustomText style={styles.textContent}>

      {`
        
      MIT License Copyright (c) 2021 Luca Burgio 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions: 

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

`}

      </CustomText>
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
  menuItem: {
    paddingLeft: 10,
    marginTop: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderBottomStartRadius : 10, 
    borderBottomEndRadius : 10, 
  },
  menuText: {
    marginTop: 20,
    marginBottom: 18,
    fontSize: 20,
    color: '#525252',
  },
  textContent: {
    marginTop: 20,
    fontSize: 14,
    color: '#525252',
    lineHeight: 15
  } 
});

export default IconoirLicense;
