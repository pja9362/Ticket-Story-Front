import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Modal, BackHandler, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import { CustomText } from '../../components/CustomText';
import AskGoBack from '../../components/EnrollTicket/AskGoBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import backButton from './../../images/back_button.png';
import { removeTempReviews } from '../../utils/removeTempReviewsUtils';

const EnrollHeader = ({title = '', backDestination, backParams, needAlert}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false); 

  const onBackClick = async () => {
    if (backParams) {
      const tempReview = {
        contentsId: backParams.contentsId,
        contentsTitle: backParams.contentsTitle,
        reviewTitle: backParams.reviewTitle,
        reviewContent: backParams.reviewContent,
        artRating: backParams.artRating,
        seatRating: backParams.seatRating,
        selectedImages: backParams.selectedImages,
      };
      await AsyncStorage.setItem(`tempReview_${backParams.contentsId || 'temp'}`, JSON.stringify(tempReview));
    }

    if (needAlert) {
      setModalVisible(true);
    } else if (backDestination) {
      navigation.navigate(backDestination, backParams);
    } else {
      navigation.goBack();
    }
  };


  const handleBack = async () => {
    await removeTempReviews();

    setModalVisible(false);
    if (backDestination) {
      navigation.navigate(backDestination, backParams);
    } else {
      navigation.goBack();
    }
  }

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        console.log("Back PARAMS3: ", backParams);
        if (needAlert) {
          setModalVisible(true);
          return true; // Prevent default behavior (go back)
        }
        return false; // Allow default behavior
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [needAlert])
  );


  return (
    <>
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackClick}>
        {/* <Icon name="chevron-back-sharp" size={20} color="black" /> */}
        <Image source={backButton} style={{width: 28, height: 28}}/>
      </TouchableOpacity>
      <View style={styles.titleContainer} pointerEvents="none">
        <CustomText style={styles.title} fontWeight="bold">{title}</CustomText>
      </View>
      {/* <TouchableOpacity onPress={onIconClick}>
        <Icon name="chevron-forward-sharp" size={20} color="black" />
      </TouchableOpacity> */}
      <View width={20} />
    </View>

    {/* {modalVisible ? <AskGoBack /> : null} */}

    <Modal  
      // animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ backgroundColor: 'white', width: 280, padding: 18, borderRadius: 10 }}>
          <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', marginTop: 2, lineHeight: 25}} fontWeight="bold">이전으로 돌아가시겠어요? {'\n'} 지금까지의 작성은 저장되지 않습니다</CustomText>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 115, padding: 10, borderRadius: 10 }}>
              <CustomText style={{ color: '#000', textAlign : 'center', fontSize: 17}} fontWeight="medium">취소</CustomText>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleBack} style={{ backgroundColor: '#5D70f9', width: 115, padding: 10, borderRadius: 10 }}>
              <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 17}} fontWeight="medium">확인</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>

  </>

  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: '#525252',
  },
  titleContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
});

export default EnrollHeader;
