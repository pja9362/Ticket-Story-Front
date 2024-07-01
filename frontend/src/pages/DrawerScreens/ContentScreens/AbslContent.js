import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {CustomText} from '../../../components/CustomText';
import Header from '../../../components/Header';

const AbslContent = () => {

  return (
    <View style={styles.container}>
    <Header title='absl'/>
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={{ flex: 1 }}>
      <CustomText style={styles.textcontent}>
        
      Apache License
                           Version 2.0, January 2004
                        http://www.apache.org/licenses/

   TERMS AND CONDITIONS FOR USE, REPRODUCTION, AND DISTRIBUTION

   1. Definitions.

      "License" shall mean the terms and conditions for use, reproduction,
      and distribution as defined by Sections 1 through 9 of this document.

      "Licensor" shall mean the copyright owner or entity authorized by
      the copyright owner that is granting the License.

      "Legal Entity" shall mean the union of the acting entity and all
      other entities that control, are controlled by, or are under common
      control with that entity. For the purposes of this definition,
      "control" means (i) the power, direct or indirect, to cause the
      direction or management of such entity, whether by contract or
      otherwise, or (ii) ownership of fifty percent (50%) or more of the
      outstanding shares, or (iii) beneficial ownership of such entity.

      "You" (or "Your") shall mean an individual or Legal Entity
      exercising permissions granted by this License.

      "Source" form shall mean the preferred form for making modifications,
      including but not limited to software source code, documentation
      source, and configuration files.

      "Object" form shall mean any form resulting from mechanical
      transformation or translation of a Source form, including but
      not limited to compiled object code, generated documentation,
      and conversions to other media types.
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
  textcontent: {
    marginTop: 20,
    fontSize: 14,
    color: '#525252',
    lineHeight: 15
  } 
});

export default AbslContent;
