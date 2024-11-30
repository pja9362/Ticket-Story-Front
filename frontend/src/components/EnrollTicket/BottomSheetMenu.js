import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Modal, TouchableOpacity, Animated, Easing} from 'react-native';
import {CustomText} from '../CustomText';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil';
import analytics from '@react-native-firebase/analytics';

const BottomSheetMenu = ({closeBottomSheet, onClick}) => {
  const slideAnim = useRef(new Animated.Value(0)).current;  
  const opacityAnim = useRef(new Animated.Value(0)).current;  

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const closeAndAnimate = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 160,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 20,
        useNativeDriver: true,
      })
    ]).start(() => closeBottomSheet());  
  };

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [300, 0],
  });

  const handleOnlineRegister = () => {
    onClick('scrape')
    analytics().logEvent('ticket_online_click')
  }

  const handleCameraRegister = () => {
    onClick('camera')
    analytics().logEvent('ticket_camera_click')
    analytics().logScreenView({
      screen_name: '카메라 티켓 등록',
      screen_class: 'ticket_register'
    })
  }

  const handleWriteRegister = () => {
    onClick('hand')
    analytics().logEvent('ticket_manual_click')
    analytics().logScreenView({
      screen_name: '직접 입력 티켓 등록',
      screen_class: 'ticket_register'
    })
  }

  return (
    <Modal transparent={true} visible={true} onRequestClose={closeAndAnimate} animationType='none'>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        {/* 어두운 배경 오버레이 */}
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeAndAnimate}>
          <Animated.View style={[styles.overlay, { opacity: opacityAnim }]} />
        </TouchableOpacity>

        {/* 바텀 시트 */}
        <Animated.View style={[styles.contentContainer, { transform: [{ translateY }] }]}>
          <TouchableOpacity onPress={handleOnlineRegister} style={styles.textArea}>
            <CustomText style={styles.btnText} fontWeight="extrabold">온라인 티켓 <CustomText style={styles.btnText} fontWeight="semibold">등록하기</CustomText></CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCameraRegister} style={styles.textArea}>
            <CustomText style={styles.btnText} fontWeight="extrabold">카메라로 <CustomText style={styles.btnText} fontWeight="semibold">티켓 등록하기</CustomText></CustomText>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleWriteRegister} style={styles.textAreaF}>
            <CustomText style={styles.btnText} fontWeight="extrabold">직접 입력으로 <CustomText style={styles.btnText} fontWeight="semibold">티켓 등록하기</CustomText></CustomText>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.36)',
  },
  contentContainer: {
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: 18,
    paddingTop: 20,
    paddingBottom: verticalScale(20),
    width: '100%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  btnText: {
    fontSize: 22,
    lineHeight: 25,
    marginBottom: verticalScale(10),
    color: '#525252',
  },
  textArea: {
    width: '85%',
    borderBottomWidth: 1,
    paddingBottom: 6,
    borderBottomColor: '#D6D6D6',
    alignItems: 'center',
  },
  textAreaF: {
    width: '100%',
    paddingBottom: 6,
    alignItems: 'center',
  },
});

export default BottomSheetMenu;