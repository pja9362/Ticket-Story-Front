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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const EditReview = ({navigation, route}) => {
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

  //
  const [inputHeight, setInputHeight] = useState(0);
  const maxHeight = 200; // 최대 높이 설정

  const scrollViewRef = useRef(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow);
    console.log('뭐냐대체');
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
      const updatedReview = await updateReview(reviewId, requestData);
      console.log('Updated Review:', updatedReview);
      
      // navigation.navigate('EditFinish', { ticket: ticket, ticketId: ticketId });
      navigation.navigate('EditFinish', { ticket: ticket, ticketId: ticketId, reviewDetails : reviewDetails });

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
    if (inputHeight <= maxHeight) {
      setReviewContent(text);
    } else {
      alert('더 이상 입력 불가');
      setReviewContent(prevText => prevText.slice(0, -1)); // 마지막 입력 제거
    }
  };

  return (
    <>
      <EnrollHeader title="티켓 후기 입력" onIconClick={handleNext} />
      <KeyboardAwareScrollView style={styles.container} ref={scrollViewRef}>
        <CustomText style={{fontSize: 16, color: '#525252', lineHeight: 24}} fontWeight="bold">
          관람한 <CustomText style={{color: '#5D70F9'}} fontWeight="bold">{ticketData.contentsDetails.title || '콘텐츠'}</CustomText>의 후기를 알려주세요.
        </CustomText>
        <CustomText style={{ fontSize: 12, color: '#939393' }}>*표시는 필수 항목입니다.</CustomText>

        <SliderRating category="art" value={artRating} onValueChange={handleSliderChange} />

        <SliderRating category="seat" value={seatRating} onValueChange={handleSliderChange} />
        
        <CustomText style={styles.sectionText}>작품 후기</CustomText>

        <View style={styles.reviewImageContainer}>
          <View>
            <TouchableOpacity onPress={handleImagePicker}>
              <Image source={addPhoto} style={styles.image} />
            </TouchableOpacity>
            <CustomText style={{ width: 48, textAlign: 'center' }}>{selectedImages.length} / 1</CustomText>
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
        <View style={styles.reviewTextContainer}>
          <CustomTextInput
            style={{...styles.inputArea, height: 30, fontSize: 16, color: '#525252'}}
            value={reviewTitle}
            placeholder = "제목"
            placeholderTextColor = "#B6B6B6"
            maxLength={20}
            onChangeText={text => setReviewTitle(text)}
            fontWeight="bold"
          />
          <CustomTextInput
            // style={{...styles.inputArea, flex: 1}}
            style={[styles.inputArea, { flex : 1, height: Math.min(inputHeight, maxHeight) }]}
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
            onFocus={handleKeyboardDidShow}
          />
        </View>

        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 20}} >
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
    paddingHorizontal: 27,
    paddingVertical: 12,
  },
  sectionText: {
    fontSize: 16,
    marginTop: 5,
    color: '#000',
  },
  image: {
    width: 48,
    height: 48,
    marginTop: 10,
  },
  inputArea: {
    width: '100%',
  },
  reviewImageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 17,
  },
  deleteIconContainer: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'transparent',
  },
  deleteIcon: {
    width: 14,
    height: 14,
  },
  previewImageContainer: {
    marginRight: 8,
    position: 'relative',
  },
  previewImage: {
    width: 72,
    height: 72,
    borderRadius: 5,
  },
  reviewTextContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 250,
    marginVertical: 11,
    padding: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});

export default EditReview;
