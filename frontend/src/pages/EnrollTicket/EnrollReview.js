import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
  Platform
} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import SliderRating from '../../components/EnrollTicket/SliderRating';
import addPhoto from '../../images/icon_add_photo.png';
import deleteIcon from '../../images/icon_delete_photo.png';
import NextButton from '../../components/EnrollTicket/NextBtn';
import CustomCheckbox from '../../components/EnrollTicket/CustomCheckbox';
import ImagePicker from 'react-native-image-crop-picker';
import { saveNewTicket, uploadImage } from '../../actions/ticket/ticket';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'

import { useDispatch } from 'react-redux';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import { State } from 'react-native-gesture-handler';

const EnrollReview = ({navigation, route}) => {
  const dispatch = useDispatch();
  
  const { title, ticketData } = route.params;

  useEffect(() => {
    console.log("TICKET DATA1", ticketData);
    console.log("TICKET DATA2", ticketData.contentsDetails.contentsId);
  }, []);
  
  const [sliderTouched, setSliderTouched] = useState(false);

  const [artRating, setArtRating] = useState(0);
  const [seatRating, setSeatRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewContent, setReviewContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  // const [spoilerChecked, setSpoilerChecked] = useState(false);
  // const [privateChecked, setPrivateChecked] = useState(false);
  const [saveProcessing, setSaveProcessing] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);

  const [inputHeight, setInputHeight] = useState(0);
  const maxHeight = 200; // 최대 높이 설정

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const getTempReview = async () => {
      // ticketData.contentsDetails.contentsId로 저장된 임시 리뷰 불러오기 만약 null이면 tempReview_temp로 불러오기
      const tempReview = await AsyncStorage.getItem(`tempReview_${ticketData.contentsDetails.contentsId || 'temp'}`);

      if (tempReview) {
        const {
          contentsId,
          contentsTitle,
          reviewTitle,
          reviewContent,
          artRating,
          seatRating,
          selectedImages,
        } = JSON.parse(tempReview);
      
      
        if (
          (ticketData.contentsDetails.contentsId !== null && ticketData.contentsDetails.contentsId == contentsId) ||
          ticketData.contentsDetails.title == contentsTitle
        ) {
          setReviewTitle(reviewTitle);
          setReviewContent(reviewContent);
          setArtRating(artRating);
          setSeatRating(seatRating);
          setSelectedImages(selectedImages);
        }
      }
    };
  
    getTempReview();
  }, [ticketData.contentsDetails.contentsId]);  
  
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleKeyboardDidShow = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSliderChange = (category, rating) => {
    if (category === 'art') {
      setArtRating(rating);
    } else if (category === 'seat') {
      setSeatRating(rating);
    }
    setSliderTouched(true);
  };

  const handleNext = async () => {

    if (saveProcessing) {
      return;
    }

    const reviewDetails = {
      // isPublic: !privateChecked,
      // isSpoiler: spoilerChecked,
      reviewTitle,
      reviewDetails: reviewContent,
      reviewImages: selectedImages
    };

    const ratingDetails = {
      contentsRating: artRating,
      seatRating: seatRating
    };

    const requestData = {
        ...ticketData,
        ratingDetails,
        reviewDetails
    };

    try {
      setSaveProcessing(true);
      console.log("티켓 등록 요청", requestData);
      // const savedTicket = await saveNewTicket(requestData);
      const savedTicket = await dispatch(saveNewTicket(requestData));
      const ticketId = savedTicket.value
      console.log('Saved ticket:', savedTicket.value); 
      console.log('Saved ticket:', ticketId);

      await AsyncStorage.removeItem(`tempReview_${ticketData.contentsDetails.contentsId || 'temp'}`);

      navigation.navigate('EnrollFinish', {ticketId});
    } catch (error) {
      console.error('Error saving review:', error);
    } finally {
      setSaveProcessing(false);
    }
  };

  const handleImagePicker = async () => {

    if (imageProcessing) {
      return;
    }

    if (selectedImages.length >= 1) {
      alert('이미지는 1개 등록할 수 있습니다.');
      return; 
    }
    try {
      setImageProcessing(true);

      const image = await ImagePicker.openPicker({
        cropping: true,
        mediaType: 'photo',
        width: 1000,
        height: 1000
      });

      const uploadedImagePath = await uploadImage(image.path);
      setSelectedImages(prevImages => [...prevImages, uploadedImagePath]);
    } catch (error) {
      console.log('ImagePicker Error: ', error);
    } finally {
      setImageProcessing(false);
    }
  };

  const handleImageDelete = index => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  // const handleReviewContentChange = (text) => {
  //   const lines = text.split('\n');
  //   if (lines.length > 5) {
  //     console.log('5줄까지만 입력할 수 있습니다.');
  //     return;
  //   }
  //   setReviewContent(text);
  // };

  const handleChangeText = (text) => {
    if (inputHeight <= maxHeight) {
      setReviewContent(text);
    } else {
      alert('더 이상 입력 불가');
      setReviewContent(prevText => prevText.slice(0, -1)); // 마지막 입력 제거
    }
  };

  const onSwipe = async (event) => {
    if (event.nativeEvent.state === State.END) {
      //
      const backParams = {
        reviewTitle,
        reviewContent,
        artRating,
        seatRating,
        selectedImages,
        contentsId: ticketData.contentsDetails.contentsId,
        contentsTitle: ticketData.contentsDetails.title
      }

      await AsyncStorage.setItem(`tempReview_${backParams.contentsId || 'temp'}`, JSON.stringify(backParams));
      await navigation.goBack();
    }
  };

  const content = (
    // <>
    <View style={{ flex: 1 }}>
      <EnrollHeader 
          title="콘텐츠 스토리 카드 입력" 
          backParams={{
            reviewTitle,
            reviewContent,
            artRating,
            seatRating,
            selectedImages,
            contentsId: ticketData.contentsDetails.contentsId,
            contentsTitle: ticketData.contentsDetails.title
          }} 
      />
      <KeyboardAwareScrollView style={styles.container} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        <CustomText style={{fontSize: scale(16), color: '#525252', lineHeight: scale(24)}} fontWeight="bold">
          관람한 <CustomText style={{color: '#5D70F9'}} fontWeight="bold">{title || '콘텐츠'}</CustomText>의 후기를 알려주세요.
        </CustomText>
        <CustomText style={{ fontSize: scale(12), color: '#939393' }}>*표시는 필수 항목입니다.</CustomText>

        <SliderRating category="art" value={artRating} onValueChange={handleSliderChange} />

        <SliderRating category="seat" value={seatRating} onValueChange={handleSliderChange} />
        
        <CustomText style={styles.sectionText}>사진 첨부 <CustomText style={{ fontSize: scale(12), marginTop: verticalScale(5), color: '#939393'}}> 사진 첨부는 한 장씩 가능합니다. </CustomText> </CustomText>

        <View style={styles.reviewImageContainer}>
          <View>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image source={addPhoto} style={styles.image} />
            </TouchableOpacity>
            <CustomText style={{ width: scale(48), textAlign: 'center', color: '#525252'}}>{selectedImages.length} / 1</CustomText>
          </View>
          <FlatList
            data={selectedImages}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            renderItem={({ item, index }) => (
              <View key={index} style={styles.previewImageContainer}>
                <Image source={{ uri: item }} style={styles.previewImage} />
                <TouchableOpacity onPress={() => handleImageDelete(index)} style={styles.deleteIconContainer}>
                  <Image source={deleteIcon} style={styles.deleteIcon} />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>

        <CustomText style={styles.sectionTextTwo}>관람 후기</CustomText>

        <View style={styles.reviewTextContainer}>
          <CustomTextInput
            // style={{...styles.inputArea, height: scale(30), fontSize: scale(16), color: '#000000', backgroundColor: 'blue'}}
            style={{...styles.inputArea, paddingVertical: Platform.OS === 'android' ? 0 : verticalScale(4), fontSize: scale(16), color: '#000000'}}
            value={reviewTitle}
            maxLength={20}
            placeholder = "제목"
            placeholderTextColor = "#B6B6B6"
            onChangeText={text => setReviewTitle(text)}
            fontWeight="bold"
          />
          <CustomTextInput
            style={{...styles.inputArea, flex:1, color: '#525252', textAlignVertical: 'top', paddingVertical: verticalScale(4), fontSize: scale(14)}}
            multiline={true}
            placeholder="관람 후기를 입력해주세요"
            placeholderTextColor = "#D9D9D9"
            value={reviewContent}
            // maxLength={280}
            onChangeText={handleChangeText}
            onContentSizeChange={(e) => {
              const newHeight = e.nativeEvent.contentSize.height;
              setInputHeight(newHeight);
            }}
            onFocus={handleKeyboardDidShow}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: verticalScale(20), marginBottom: verticalScale(50)}} >
          {/* <NextButton isDisabled={saveProcessing || imageProcessing || artRating === 0 || seatRating === 0 || !sliderTouched} onPress={handleNext} /> */}
          <NextButton isDisabled={saveProcessing || imageProcessing || artRating === 0 || seatRating === 0 } onPress={handleNext} />
        </View>
      </KeyboardAwareScrollView>  
    </View>
    // </>
  )


  return (
    <>
      <GestureHandlerRootView style={{ flex: 1}}>
        {Platform.OS === 'ios' ? (
          <PanGestureHandler onHandlerStateChange={onSwipe}>
            {content}
          </PanGestureHandler>
        ) : (
          content
        )}
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: scale(27),
    paddingVertical: verticalScale(12),
  },
  sectionText: {
    fontSize: scale(16),
    marginTop: verticalScale(5),
    color: '#525252',
  },
  sectionTextTwo: {
    fontSize: scale(16),
    marginTop: verticalScale(22),
    marginBottom: verticalScale(5),
    color: '#525252',
  },
  image: {
    width: scale(48),
    height: scale(48),
    marginTop: verticalScale(10),
  },
  inputArea: {
    width: '100%',
  },
  reviewImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
    gap: scale(17),
  },
  deleteIconContainer: {
    position: 'absolute',
    top: verticalScale(2),
    right: scale(2),
    backgroundColor: 'transparent',
  },
  deleteIcon: {
    width: scale(14),
    height: scale(14),
  },
  previewImageContainer: {
    marginRight: scale(8),
    position: 'relative',
  },
  previewImage: {
    width: scale(72),
    height: scale(72),
    borderRadius: 5,
  },
  reviewTextContainer: {
    width: '100%',
    borderWidth: 1,
    // borderColor: '#000',
    borderColor: '#B6B6B6',
    borderRadius: 5,
    height: scale(250),
    marginVertical: verticalScale(11),
    padding: scale(12),
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default EnrollReview;

