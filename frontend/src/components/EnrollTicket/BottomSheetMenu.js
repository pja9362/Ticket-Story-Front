import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import {CustomText} from '../CustomText';

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
              onPress={() => onClick('scrape')}>
              <CustomText style={styles.btnText}>온라인 티켓 등록하기</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClick('camera')}>
              <CustomText style={styles.btnText}>카메라로 티켓 등록하기</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClick('hand')}>
              <CustomText style={styles.btnText}>직접 입력으로 티켓 등록하기</CustomText>
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
    gap: 20,
    padding: 25,
    paddingBottom: 40,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  separator: {
    height: 1,
    backgroundColor: 'lightgray', 
    width: '100%', 
  },
  btnText: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BottomSheetMenu;
