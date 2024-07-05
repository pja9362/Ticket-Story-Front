import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Swiper from 'react-native-swiper';
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
            console.log('ticket이 뭐야?', ticket);
            console.log('ticketId이 뭐야?', ticketId);
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
        console.log('밍밍');

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

    useEffect(() => {
        console.log('fdfdfdfadsfafdsd', ticket.reviewTitle !== '' && ticket.reviewDetails !== '');
    }, []);

    return (
        ticket &&
        <View style={styles.container}>
            <View ref={viewRef}>
                <View style={styles.imageContainer}>
                    {/* <Swiper
                        showsButtons={true}
                        dotStyle={styles.dot}
                        activeDotStyle={styles.activeDot}
                        paginationStyle={{justifyContent: 'flex-end', right: 20, bottom: 10}}
                        nextButton={<Image source={iconRight} style={styles.arrowImage}/>}
                        prevButton={<Image source={iconLeft} style={styles.arrowImage}/>}
                    > */}
                        {/* {ticket.reviewImages.map((image, index) => ( */}

                            {/* <TouchableOpacity key={index} style={styles.slide} onPress={()=>handleImagePress(index)}> */}
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
                                        {(!hideImageTitle && !hideImageInfo) && (
                                        <CustomText style={{ ...styles.overlayText, fontSize: 20, color: darkText ? '#525252' : '#fff'  }} fontWeight="bold">{ticket.title}</CustomText>
                                        )}
                                        {!hideImageInfo && (
                                        <>
                                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Date</CustomText>
                                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]} fontWeight="bold">{ticket.date}</CustomText>
                                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Time</CustomText>
                                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]} fontWeight="bold">{ticket.time}</CustomText>
                                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Place</CustomText>
                                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]} fontWeight="bold">{ticket.location}</CustomText>
                                        </>
                                        )}
                                    </View>
                                </>
                            </TouchableOpacity>
                        {/* ))} */}
                    {/* </Swiper> */}
                </View>
                <TouchableOpacity onPress={handleContentPress}>
                    <View style={styles.contentContainer}>
                        <View style={styles.titleContainer}>
                            {(!hideReviewTitle && !hideReviewInfo) && (
                                <CustomText style={{...styles.mainText, flex: 1}} fontWeight="bold">{ticket.title}</CustomText>
                            )}
                            <Image source={iconLogo} style={{position: 'absolute', width : 110, height : 42, right : -18, top: -18}} />
                        </View>
                        { (ticket.reviewTitle == '' && ticket.reviewDetails == '') ?
                            <View style={{alignItems:'center'}}>
                             <CustomText style={styles.noReviewText}> 등록된 리뷰가 없어요 :( </CustomText>
                            </View>
                        :
                            <>
                             {!hideReviewInfo && (
                                <View style={{position: 'absolute', top: 50, right: 23, gap : 2}}>
                                    <CustomText style={styles.subText} fontWeight="bold">{ticket.date}</CustomText>
                                    <CustomText style={styles.subText} fontWeight="bold">{ticket.location}</CustomText>
                                </View>
                             )}

                                <View style={styles.reviewContainer}>
                                    <CustomText style={{...styles.mainText, color: '#525252', fontSize: 16}} fontWeight="bold"> {ticket.reviewTitle}</CustomText>
                                    <CustomText style={styles.text} fontWeight="medium">{ticket.reviewDetails}</CustomText>
                                </View>
                            </>
                        }
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={handleShareBtnPress}>
                    <Image source={iconShare} style={{width: 45, height: 45}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSaveBtnPress}>
                    <Image source={iconSave} style={{width: 45, height: 45}} />
                </TouchableOpacity>
            </View>

            {/* {modalVisible && (
            <SaveCardImage
                closeModal={closeModal}
            />
            )} */}

            {modalVisible && (
                <Modal  
                transparent={true}
                visible={true}
                onRequestClose={()=>setModalVisible(false)}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <View style={{ backgroundColor: 'white', height: 120, width: 280, padding: 18, borderRadius: 10 }}>
                        <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', top: 5}} fontWeight="bold">스토리카드가 앨범에 저장됐어요</CustomText>
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
                    <View style={{ backgroundColor: 'white', width: 260, padding: 18, borderRadius: 10 }}>
                        <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', lineHeight: 24}} fontWeight="bold"> 등록된 리뷰가 존재하지 않습니다. {'\n'} 지금 등록하시겠어요? </CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                        <TouchableOpacity onPress={()=>setReviewVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 100, padding: 10, borderRadius: 5 }}>
                            <CustomText style={{ color: '#000', textAlign : 'center'}} fontWeight="bold">취소</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleReviewEdit} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}>
                            <CustomText style={{ color: 'white', textAlign : 'center'}} fontWeight="bold">확인</CustomText>
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
                    <View style={{ backgroundColor: 'white', width: 260, padding: 18, borderRadius: 10 }}>
                        <CustomText style={{color: '#000', fontSize: 16, textAlign: 'center', lineHeight: 24}} fontWeight="bold"> 등록된 사진이 존재하지 않습니다. {'\n'} 지금 등록하시겠어요? </CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                        <TouchableOpacity onPress={()=>setImageVisible(false)} style={{ backgroundColor: '#E8ECEF', width: 100, padding: 10, borderRadius: 5 }}>
                            <CustomText style={{ color: '#000', textAlign : 'center'}} fontWeight="bold">취소</CustomText>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleImageEdit} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5 }}>
                            <CustomText style={{ color: 'white', textAlign : 'center'}} fontWeight="bold">확인</CustomText>
                        </TouchableOpacity>
                        </View>
                    </View>
                    </View>
                </Modal>
            )}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 50
    },
    imageContainer: {
        height: 356,
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
        // borderTopLeftRadius: 5,
        // borderTopRightRadius: 5,
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
        padding: 20,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        height: 356,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 40,
    },
    reviewContainer: {
        position: 'absolute',
        left : 18,
        top: 95,
    },
    mainText: {
        color: '#525252',
        fontSize: 18,
    },
    subText: {
        color: '#B6B6B6',
        fontSize: 14,
        textAlign: 'right',
    },
    text: {
        color: '#525252',
        fontSize: 14,
        lineHeight: 18,
        paddingVertical: 5,
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
        padding: 12,
    },
    overlayText: {
        color: '#fff',
        fontSize: 16,
    },
    overlayGuideText: {
        color: '#fff',
        fontSize: 16,
        marginTop: 4,
    },
    logo: {
        position: 'absolute',
        top: 2,
        right: 2,
        width: 110,
        height: 42,
    },
    noReviewText: {
        position: 'absolute',
        top : 120,
        // left : 90,
        fontSize : 18,
        color: '#9A9A9A',
    },
});

export default DetailCard;