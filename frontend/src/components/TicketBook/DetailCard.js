import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
// import Swiper from 'react-native-swiper';
import { handleShareBtn, handleSaveBtn } from '../../utils/shareAndSaveUtils';
import iconLeft from '../../images/icon_left_pagination.png';
import iconRight from '../../images/icon_right_pagination.png';
import iconLogo from '../../images/logo_black.png';
import iconShare from '../../images/icon_share.png';
import iconSave from '../../images/icon_save.png';
import logo from '../../images/logo_white.png';
import darklogo from '../../images/logo_dark.png';
import defaultReviewImage from '../../images/default_reviewImage.png';
import {CustomText} from '../CustomText';
import { getTicketDetails, uploadImage, updateReviewImage } from '../../actions/ticket/ticket';
import ImagePicker from 'react-native-image-crop-picker';
import {scale, verticalScale, moderateScale} from '../../utils/sizeUtil'
import { TouchableWithoutFeedback } from 'react-native';


const DetailCard = ({ ticket, ticketId }) => {

    const viewRef = useRef();
    const navigation = useNavigation();

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideImageInfo: false, hideImageTitle: false, hideReviewInfo: false, hideReviewTitle: false, darkText: false };
    const { hideImageInfo, hideImageTitle, hideReviewInfo, hideReviewTitle, darkText } = overlayState;

    const [modalVisible, setModalVisible] = useState(false);
    const [imageVisible, setImageVisible] = useState(false);
    const [reviewVisible, setReviewVisible] = useState(false);


    const handleShareBtnPress = () => {
        handleShareBtn(viewRef);
    }

    const handleSaveBtnPress = async() => {
        try {
            const response = await handleSaveBtn(viewRef);
            console.log(response);
            setModalVisible(true);
        } catch (error) {
        console.error('Error Saving ticket?:', error.response);
        }
    }

    // const handleImagePress = (idx) => {
    //     navigation.navigate('ShowImageView', {images: ticket.reviewImages, index: idx, ticket: ticket});
    // }

    const handleImagePress = () => {
        if (ticket.reviewImages !== null) {
            navigation.navigate('ShowImageView', {images: ticket.reviewImages[0], ticket: ticket, ticketId: ticketId});
        } else {
            // alert('등록된 사진이 없어요. 등록하러 가실래요?');
            setImageVisible(true);
        }
    }

    const handleContentPress = () => {
        if (ticket.reviewTitle == '' && ticket.reviewDetails == '') {
            setReviewVisible(true);
        } else {
            console.log('ticket info', ticket);
            console.log('ticketId', ticketId);
            navigation.navigate('ShowContentView', {ticket: ticket, ticketId : ticketId});
        }
    }

    const handleReviewEdit = async() => {
        const editReview = {
          ticketId : ticketId
        }
        try {
          setReviewVisible(false);
          const response = await getTicketDetails(editReview);
          if (response !== null) {
            console.log("성공", response);
            
            //navigate 하면서 response 값들 보내야함
            navigation.navigate('EditReview', {
              ticketId : ticketId,
              ticketData : response,
              reviewId : ticket.reviewId
             });
    
          } else {
            alert('Fail');
          }
        } catch (error) {
          console.error('Error Editing ticket review1:', error.response);
        }
      }

    const handleImageEdit = async () => {

        try {
    
            const image = await ImagePicker.openPicker({
                cropping: true,
                mediaType: 'photo',
                width: 1000,
                height: 1000
            });

            setImageVisible(false);
        
            const uploadedImagePath = await uploadImage(image.path);
            console.log(uploadedImagePath);
    
            const requestData = {
                imageOrder : 0,
                imageUrl : uploadedImagePath
            }
    
                try {
                    const updatedReviewImage = await updateReviewImage(ticket.reviewId, requestData)
                    console.log(updatedReviewImage);
                    navigation.replace('TicketDetail', {ticketId: ticketId, title: ticket.title, date : ticket.date, time: ticket.time, location: ticket.location})
                } catch (error){
                    console.log('Update Review Image Error: ', error);  
                }
    
    
            } catch (error) {
            console.log('ImagePicker Error: ', error);
            } 

    }

    const shadowTextStyle = !darkText ? styles.textShadow : {};


    return (
        ticket && (
        <View style={styles.container}>
        {/* <ScrollView scrollEnabled={true}> */}
        <ScrollView 
                contentContainerStyle={styles.scrollViewContent} // 수정된 부분
                scrollEnabled={true}
                // Android에서 ScrollView가 작동하도록 하기 위해 이 속성을 추가했습니다.
                overScrollMode="always" 
                showsVerticalScrollIndicator={false} 
        >
            <View ref={viewRef} collapsable={false}>
            
                <View style={styles.imageContainer}>
                    {/* <Swiper
                        showsButtons={true}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        paginationStyle={{justifyContent: 'flex-end', right: 20, bottom: 10}}
                        nextButton={<Image source={iconRight} style={styles.arrowImage}/>}
                        prevButton={<Image source={iconLeft} style={styles.arrowImage}/>}
                    >
                    {ticket.reviewImages.map((image, index) => (
                    <TouchableOpacity key={index} style={styles.slide} onPress={()=>handleImagePress(index)}> */}
                    <TouchableOpacity style={styles.slide} onPress={()=>handleImagePress()}>
                        <>
                            <Image source={ticket.reviewImages !== null ? {uri: ticket.reviewImages[0]} : defaultReviewImage} style={styles.image} />
                            {darkText ? (
                                <Image source={darklogo} style={styles.logo} />
                            ) : (
                                <Image source={logo} style={styles.logo} />
                            )}
                            {/* Overlay Text */}
                            <View style={styles.overlay}>
                            {/* <View style={[styles.overlay, styles.shadowTextStyle]}> */}
                                {(!hideImageTitle && !hideImageInfo) && (
                                <CustomText style={darkText ? { ...styles.overlayText, fontSize: moderateScale(20), color: darkText ? '#525252' : '#fff' } : {...styles.overlayText, ...styles.textShadow, fontSize: scale(20), color: darkText ? '#525252' : '#fff'}} fontWeight="bold">{ticket.title}</CustomText>
                                )}
                                {!hideImageInfo && (
                                <>
                                    <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Date</CustomText>
                                    <CustomText style={[styles.overlayText, shadowTextStyle, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.date}</CustomText>
                                    <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Time</CustomText>
                                    <CustomText style={[styles.overlayText, shadowTextStyle, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.time}</CustomText>
                                    <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Place</CustomText>
                                    <CustomText style={[styles.overlayText, shadowTextStyle, {color: darkText ? '#525252' : '#fff'}]} fontWeight="extrabold">{ticket.location}</CustomText>
                                </>
                                )}
                            </View>
                        </>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleContentPress}>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            {(!hideReviewTitle && !hideReviewInfo) && (
                                <CustomText style={{...styles.mainText, flex: 0.65}} fontWeight="bold">{ticket.title}</CustomText>
                            )}
                            <Image source={iconLogo} style={{position: 'absolute', width : scale(110), height : scale(42), right : scale(-18), top: verticalScale(-18)}} />
                        </View>
                        { (ticket.reviewTitle == '' && ticket.reviewDetails == '') ?
                            <View style={{alignItems:'center'}}>
                             <CustomText style={styles.noReviewText}> 등록된 리뷰가 없어요 :( </CustomText>
                            </View>
                        :
                            <>
                             {!hideReviewInfo && (
                                <View style={{position: 'absolute', top: scale(50), right: scale(23), gap : scale(2)}}>
                                    <CustomText style={styles.subText} fontWeight="bold">{ticket.date}</CustomText>
                                    <CustomText style={styles.subText} fontWeight="bold">{ticket.location}</CustomText>
                                </View>
                             )}

                                <View style={styles.reviewContainer}>
                                    <CustomText style={{...styles.mainText, color: '#000000', fontSize: scale(14)}} fontWeight="bold"> {ticket.reviewTitle}</CustomText>
                                    <CustomText style={{...styles.text, textAlign: 'justify'}}>{ticket.reviewDetails}</CustomText>
                                </View>
                            </>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{width: scale(45), height: scale(45)}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{width: scale(45), height: scale(45)}} />
                </TouchableOpacity>
            </View>
        </ScrollView>

            {modalVisible && (
                <Modal  
                transparent={true}
                visible={true}
                onRequestClose={()=>setModalVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <View style={{ backgroundColor: 'white', height: 120, width: 280, padding: 18, borderRadius: 10 }}>
                        <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', top: 5}} fontWeight="bold">스토리카드를 앨범에 저장했어요</CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                          <TouchableOpacity onPress={()=>setModalVisible(false)} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5, marginTop: 5}}>
                            <CustomText style={{ color: 'white', textAlign : 'center'}} fontWeight="bold">확인</CustomText>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                </Modal>
            )}

            {reviewVisible && (
                <Modal  
                transparent={true}
                visible={true}
                onRequestClose={()=>setReviewVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', width: 260, padding: 15, borderRadius: 10 }}>
                        <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', lineHeight: 24}} fontWeight="bold"> 등록된 리뷰가 존재하지 않습니다. {'\n'} 지금 등록하시겠어요? </CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity onPress={()=>setReviewVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 110, padding: 10, borderRadius: 12 }}>
                            <CustomText style={{ color: '#525252', textAlign : 'center', fontSize: 16}} fontWeight="medium">취소</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleReviewEdit} style={{ backgroundColor: '#5D70f9', width: 110, padding: 10, borderRadius: 12 }}>
                            <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 16}} fontWeight="medium">확인</CustomText>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
            )}

            {imageVisible && (
                <Modal  
                transparent={true}
                visible={true}
                onRequestClose={()=>setImageVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ backgroundColor: 'white', width: 260, padding: 15, borderRadius: 10 }}>
                        <CustomText style={{color: '#525252', fontSize: 16, textAlign: 'center', lineHeight: 24}} fontWeight="bold"> 등록된 사진이 존재하지 않습니다. {'\n'} 지금 등록하시겠어요? </CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity onPress={()=>setImageVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 110, padding: 10, borderRadius: 12 }}>
                            <CustomText style={{ color: '#525252', textAlign : 'center', fontSize: 16}} fontWeight="medium">취소</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleImageEdit} style={{ backgroundColor: '#5D70f9', width: 110, padding: 10, borderRadius: 12 }}>
                            <CustomText style={{ color: 'white', textAlign : 'center', fontSize: 16}} fontWeight="medium">확인</CustomText>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
            )}

        </View>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50,
    },
    imageContainer: {
        width: scale(356),
        height: scale(356),
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    dot: {
        backgroundColor: '#fff',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    activeDot: {
        backgroundColor: '#525252',
        width: 10,
        height: 10,
        borderRadius: 5,
    },
    arrowImage: {
        width: 12,
        height: 38,
    },
    contentContainer: {
        padding: moderateScale(20),
        backgroundColor: '#fff',
        width: scale(356),
        height: scale(356),
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: moderateScale(40),
    },
    reviewContainer: {
        position: 'absolute',
        left : scale(18),
        top: scale(90),
        right : scale(20),
    },
    mainText: {
        color: '#525252',
        fontSize: scale(16),
    },
    subText: {
        color: '#B6B6B6',
        fontSize: scale(12),
        textAlign: 'right',
    },
    text: {
        color: '#525252',
        fontSize: scale(14),
        lineHeight: verticalScale(18),
        paddingVertical: verticalScale(5),
    },
    btnContainer: {
        flexDirection: 'row',
        padding: 20,
        gap: 45,
        justifyContent: 'center',
    },
    overlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: moderateScale(12),
    },
    overlayText: {
        color: '#fff',
        fontSize: scale(16),
    },
    textShadow: {
        color: 'white', // 텍스트 색상과 일치하도록 설정
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // 그림자의 투명도를 조절
        textShadowOffset: { width: 0, height: 2 }, // 그림자 오프셋
        textShadowRadius: 4, // 그림자 블러 반경
        elevation: 5, // Android에서 그림자 효과를 추가하기 위해 사용
    },
    overlayGuideText: {
        color: '#fff',
        fontSize: scale(16),
        marginTop: verticalScale(4),
    },
    logo: {
        position: 'absolute',
        top: verticalScale(2),
        right: moderateScale(2),
        width: scale(110),
        height: scale(42),
    },
    noReviewText: {
        position: 'absolute',
        top : verticalScale(120),
        // left : 90,
        fontSize : scale(18),
        color: '#9A9A9A',
    },
});

export default DetailCard;