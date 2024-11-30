import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ScrollView,
  Keyboard
} from 'react-native';
import EnrollHeader from '../../components/EnrollTicket/EnrollHeader';
import SliderRating from '../../components/EnrollTicket/SliderRating';
import addPhoto from '../../images/icon_add_photo.png';
import deleteIcon from '../../images/icon_delete_photo.png';
import NextButton from '../../components/EnrollTicket/NextBtn';
import CustomCheckbox from '../../components/EnrollTicket/CustomCheckbox';
import ImagePicker from 'react-native-image-crop-picker';
import { saveNewTicket, uploadImage, updateReview, getTicketDetail } from '../../actions/ticket/ticket';
import { CustomText, CustomTextInput } from '../../components/CustomText';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { useDispatch } from 'react-redux';

import analytics from '@react-native-firebase/analytics';

const EditReview = ({navigation, route}) => {
  const dispatch = useDispatch();
  
  const { ticketId, ticketData, reviewId } = route.params;
  
  const [sliderTouched, setSliderTouched] = useState(false);

  const [artRating, setArtRating] = useState(ticketData.ratingDetails.contentsRating);
  const [seatRating, setSeatRating] = useState(ticketData.ratingDetails.seatRating);
  const [reviewTitle, setReviewTitle] = useState(ticketData.reviewDetails.reviewTitle);
  const [reviewContent, setReviewContent] = useState(ticketData.reviewDetails.reviewDetails);
  const [selectedImages, setSelectedImages] = useState(ticketData.reviewDetails.reviewImages);
  const [spoilerChecked, setSpoilerChecked] = useState(false);
  const [privateChecked, setPrivateChecked] = useState(false);
  const [seats, setSeats] = useState(ticketData.contentsDetails.seats);
  const [updatedTicket, setUpdatedTicket] = useState(null);

  const [saveProcessing, setSaveProcessing] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);

  const [inputHeight, setInputHeight] = useState(0);
  const maxHeight = 200; // 최대 높이 설정

  const scrollViewRef = useRef(null);

  useEffect(() => {
    analytics().logScreenView({
      screen_name: '티켓 리뷰 수정',
      screen_class: 'ticket_edit'
    })
  }, [])

  // useEffect(() => {
  //   const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
  //   console.log('뭐냐대체');
  //   return () => {
  //     keyboardDidShowListener.remove();
  //   };
  // }, []);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
  
      return () => {
        keyboardDidShowListener.remove();
      };
    }
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

    const ticket = {
      registerBy: ticketData.registerBy,
      category: ticketData.category,
      categoryDetail: ticketData.categoryDetail,
      platform: ticketData.platform,
      ticketImg: ticketData.ticketImg,
      contentsDetails: ticketData.contentsDetails
    }

    const reviewDetails = {
      isPublic: !privateChecked,
      isSpoiler: spoilerChecked,
      reviewTitle,
      reviewDetails: reviewContent,
      reviewImages: selectedImages
    };

    const ratingDetails = {
      contentsRating: artRating,
      seatRating: seatRating
    };

    const requestData = {
        ticket,
        ratingDetails,
        reviewDetails
    };

    try {
      setSaveProcessing(true);
      console.log("티켓 등록 요청", requestData);
      // const updatedReview = await updateReview(reviewId, requestData);
      const updatedReview = await dispatch(updateReview(reviewId, requestData));
      console.log('Updated Review:', updatedReview);
      
      // navigation.navigate('EditFinish', { ticket: ticket, ticketId: ticketId });
      navigation.navigate('EditFinish', { ticket: ticket, ticketId: ticketId, reviewDetails : reviewDetails });
      analytics().logEvent('review_edit')
      analytics().logScreenView({
        screen_name: '티켓 리뷰 수정 완료',
        screen_class: 'ticket_edit'
      })

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

  const handleChangeText = (text) => {
    if (text.length <= reviewContent.length || inputHeight <= maxHeight) {
      setReviewContent(text);
    } else {
      alert('더 이상 입력 불가');
    }
  };

  return (
    <>
      <EnrollHeader title="티켓 리뷰 수정" needAlert="true" />
      <KeyboardAwareScrollView style={styles.container} ref={scrollViewRef}>
        <CustomText style={{fontSize: scale(16), color: '#525252', lineHeight: scale(24)}} fontWeight="bold">
          관람한 <CustomText style={{color: '#5D70F9'}} fontWeight="bold">{ticketData.contentsDetails.title || '콘텐츠'}</CustomText>의 후기를 알려주세요.
        </CustomText>
        <CustomText style={{ fontSize: scale(12), color: '#939393' }}>*표시는 필수 항목입니다.</CustomText>

        <SliderRating category="art" value={artRating} onValueChange={handleSliderChange} />

        <SliderRating category="seat" value={seatRating} onValueChange={handleSliderChange} />
        
        <CustomText style={styles.sectionText}>사진 첨부</CustomText>

        <View style={styles.reviewImageContainer}>
          <View>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image source={addPhoto} style={styles.image} />
            </TouchableOpacity>
            <CustomText style={{ width: scale(48), textAlign: 'center', color: '#525252' }}>{selectedImages.length} / 1</CustomText>
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
            style={{...styles.inputArea, paddingVertical: Platform.OS === 'android' ? 0 : verticalScale(4), fontSize: scale(16), color: '#000000'}}
            value={reviewTitle}
            placeholder = "제목"
            placeholderTextColor = "#B6B6B6"
            maxLength={20}
            onChangeText={text => setReviewTitle(text)}
            fontWeight="bold"
          />
          <CustomTextInput
            // style={{...styles.inputArea, flex: 1}}
            // style={[styles.inputArea, { flex : 1, height: Math.min(inputHeight, maxHeight), color: '#525252' }]}
            style={{...styles.inputArea, flex:1, color: '#525252', textAlignVertical: 'top', paddingVertical: verticalScale(4), fontSize: scale(14)}}
            multiline={true}
            placeholder="관람 후기를 입력해주세요"
            placeholderTextColor = "#D9D9D9"
            value={reviewContent}
            // maxLength={250}
            onChangeText={handleChangeText}
            onContentSizeChange={(e) => {
              const newHeight = e.nativeEvent.contentSize.height;
              setInputHeight(newHeight);
            }}
            // onFocus={handleKeyboardDidShow}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: verticalScale(20), marginBottom: verticalScale(50)}} >
          <NextButton isDisabled={saveProcessing || imageProcessing || artRating === 0 || seatRating === 0 } onPress={handleNext} />
        </View>
      </KeyboardAwareScrollView>
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

export default EditReview;
