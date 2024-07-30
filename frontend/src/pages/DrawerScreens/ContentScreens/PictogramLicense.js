import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../../components/CustomText';
import Header from '../../../components/Header';

const PictogramLicense = () => {

  return (
    <View style={styles.container}>
    <Header title='Pictogrammers'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
      <CustomText style={styles.textContent}>

      {`
        
      Pictogrammers Free License

This icon collection is released as free, open source, and GPL friendly by
the [Pictogrammers](http://pictogrammers.com/) icon group. You may use it
for commercial projects, open source projects, or anything really.

Icons: Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0)

Some of the icons are redistributed under the Apache 2.0 license. All other
icons are either redistributed under their respective licenses or are
distributed under the Apache 2.0 license.

Fonts: Apache 2.0 (https://www.apache.org/licenses/LICENSE-2.0)

All web and desktop fonts are distributed under the Apache 2.0 license. Web
and desktop fonts contain some icons that are redistributed under the Apache
2.0 license. All other icons are either redistributed under their respective
licenses or are distributed under the Apache 2.0 license.

Code: MIT (https://opensource.org/licenses/MIT)

The MIT license applies to all non-font and non-icon files.

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

export default PictogramLicense;
