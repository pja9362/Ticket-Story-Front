import React, {useState} from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import ticket from '../../images/ticket_white.png';
import closeIcon from '../../images/icon_close_white.png';
import OCR from '../../components/EnrollTicket/OCR';

const EnrollInfoByOCR = ({navigation}) => {
  const [showGuide, setShowGuide] = useState(true);

  const onCloseGuide = () => {
    setShowGuide(false);
  }

  const onNextStep = () => {
    navigation.navigate('EnrollInfoByHand');
  }

  return (
    <>
      {showGuide ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onCloseGuide}>
            <Image source={closeIcon} style={styles.closeImg} />
          </TouchableOpacity>

          <Image source={ticket} style={styles.image} />
          <Text style={styles.mainText}>
            직접 관람한 티켓의{'\n'}제목과 좌석 정보가{'\n'}잘 나오게
            찍어주세요.
          </Text>
        </View>
      ) : (
        <OCR onNextStep={onNextStep}/>
      )}

      {/* 임시 버튼 */}
      {/* <View style={{flexDirection: 'row', gap: 20, marginVertical: 20}}>
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 15}}
          onPress={() => navigation.navigate('EnrollInfoByOCR')}>
          <Text style={{color: '#fff'}}>카메라</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor: 'black', padding: 15}}
          onPress={() => navigation.navigate('OCRFail')}>
          <Text style={{color: '#fff'}}>인식 실패</Text>
        </TouchableOpacity>
      </View> */}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 20,
  },
  closeImg: {
    width: 40,
    height: 40,
  },
  image: {
    width: 86,
    height: 122,
  },
  mainText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
    color: '#fff',
    textAlign: 'center',
    marginTop: 40,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
});

export default EnrollInfoByOCR;
