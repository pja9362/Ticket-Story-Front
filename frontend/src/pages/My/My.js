import React from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const My = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center', paddingVertical: 10}}>
        <Text style={{color: '#525252', fontWeight: 'bold', fontSize: 17}}>나의 통계</Text>
      </View>

      <View>
        <Text style={styles.mainText}>
          <Text style={{color: '#5D70F9'}}>아이디</Text>님의 티켓스토리
        </Text>
        {/* dummy */}
        <TouchableOpacity onPress={()=> navigation.navigate('ShowImageView')}>
          <Text>사진 보기</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  mainText: {
    color: '#525252',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default My;