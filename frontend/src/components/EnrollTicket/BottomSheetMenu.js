import React from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';

const BottomSheetMenu = ({closeBottomSheet, onClick}) => {
  return (
    <Modal transparent={true} visible={true} onRequestClose={closeBottomSheet}>
      <TouchableOpacity
        style={{flex: 1, justifyContent: 'flex-end'}}
        onPress={closeBottomSheet}>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View style={styles.contentContainer}>
            <TouchableOpacity>
              <Text style={styles.btnText}>글쓰기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClick('camera')}>
              <Text style={styles.btnText}>카메라로 티켓 등록하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onClick('hand')}>
              <Text style={styles.btnText}>직접 입력으로 티켓 등록하기</Text>
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
  btnText: {
    fontSize: 20,
    lineHeight: 29,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default BottomSheetMenu;
