import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import closeIcon from '../../images/icon_close.png';

const OCRFail = ({navigation}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={()=> navigation.goBack()}>
        <Image source={closeIcon} style={styles.img} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.mainText}>티켓 인식에 실패했습니다.</Text>
        <Text style={styles.subText}>
          깨끗한 배경에 티켓을 놓고{'\n'}전체가 잘 나오도록 촬영해 주세요.
        </Text>
        <Text style={[styles.subText, {color: '#9E9E9E'}]}>
          해외 티켓은 인증이 불가능합니다.
        </Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>다시 촬영하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  subText: {
    fontSize: 16,
    lineHeight: 19,
    color: '#000',
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#000',
    height: 40,
    paddingHorizontal: 23,
    borderRadius: 50,
  },
  btnText: {
    lineHeight: 40,
    color: '#fff',
    fontSize: 16,
  },
});

export default OCRFail;
