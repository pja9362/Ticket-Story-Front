import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions} from 'react-native';
import {CustomText} from '../CustomText';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'

// const { width, height } = Dimensions.get('window');
// const baseWidth = 375; // 기준 너비 (iPhone 11 Pro 기준)
// const baseHeight = 812; // 기준 높이 (iPhone 11 Pro 기준)
// const scaleWidth = width / baseWidth
// const scaleHeight = height / baseHeight;

const BottomSheetMenu = ({closeBottomSheet, onClick}) => {
  return (
    <Modal transparent={true} visible={true} onRequestClose={closeBottomSheet} animationType='slide'>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'flex-end'}}
        onPress={closeBottomSheet}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            // backgroundColor: 'rgba(0, 0, 0, 0.3)'
          }}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              onPress={() => onClick('scrape')}
              style={styles.textArea}>
              <CustomText style={styles.btnText} fontWeight="bold">온라인 티켓 <CustomText style={styles.btnText} fontWeight="medium">등록하기</CustomText></CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClick('camera')}
              style={styles.textArea}>
              <CustomText style={styles.btnText} fontWeight="bold">카메라로 <CustomText style={styles.btnText} fontWeight="medium">티켓 등록하기</CustomText></CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClick('hand')}
              style={styles.textAreaF}>
              <CustomText style={styles.btnText} fontWeight="bold">직접 입력으로 <CustomText style={styles.btnText} fontWeight="medium">티켓 등록하기</CustomText></CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#EAEAEA',
    alignItems: 'center',
    gap: 18,
    // padding: 25,
    paddingTop: 20,
    paddingBottom: verticalScale(20),
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray', 
    width: '100%', 
  },
  btnText: {
    fontSize: 22,
    lineHeight: 25,
    marginBottom: verticalScale(10),
    color: '#525252',
  },
  textArea: {
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: '#D6D6D6',
    borderBottomStartRadius : 5, 
    borderBottomEndRadius : 5,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  textAreaF: {
    width: '100%',
    paddingBottom: 6,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
});

export default BottomSheetMenu;
