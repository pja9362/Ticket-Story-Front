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

const DetailCard = ({ ticket, ticketId }) => {

    const viewRef = useRef();
    const navigation = useNavigation();

    const overlayState = useSelector((state) => state.overlay[ticketId]) || { hideImageInfo: false, hideImageTitle: false, hideReviewInfo: false, hideReviewTitle: false, darkText: false };
    const { hideImageInfo, hideImageTitle, hideReviewInfo, hideReviewTitle, darkText } = overlayState;

    const [modalVisible, setModalVisible] = useState(false);

    const closeModal = () => {
        setModalVisible(false);
    };

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
            alert('등록된 사진이 없어요. 등록하러 가실래요?');
        }
    }

    const handleContentPress = () => {
        if (ticket.reviewTitle == '' && ticket.reviewDetails == '') {
            alert('등록된 리뷰가 없어요. 등록하러 가실래요?');
        } else {
            navigation.navigate('ShowContentView', {ticket: ticket, ticketId : ticketId});
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
                                        <CustomText style={{ ...styles.overlayText, fontSize: 20, color: darkText ? '#525252' : '#fff'  }}>{ticket.title}</CustomText>
                                        )}
                                        {!hideImageInfo && (
                                        <>
                                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Date</CustomText>
                                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]}>{ticket.date}</CustomText>
                                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Time</CustomText>
                                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]}>{ticket.time}</CustomText>
                                            <CustomText style={[styles.overlayGuideText, {color: darkText ? '#525252' : '#fff'}]}>Place</CustomText>
                                            <CustomText style={[styles.overlayText, {color: darkText ? '#525252' : '#fff'}]}>{ticket.location}</CustomText>
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
                                <CustomText style={{...styles.mainText, flex: 1}}>{ticket.title}</CustomText>
                            )}
                            <Image source={iconLogo} style={{position: 'absolute', width : 110, height : 42, right : -18, top: -18}} />
                        </View>
                        { (ticket.reviewTitle == '' && ticket.reviewDetails == '') ?
                            <CustomText style={styles.noReviewText}> 등록된 리뷰가 없어요 :( </CustomText>
                        :
                            <>
                             {!hideReviewInfo && (
                                <View style={{position: 'absolute', top: 50, right: 23, gap : 2}}>
                                    <CustomText style={styles.subText}>{ticket.date}</CustomText>
                                    <CustomText style={styles.subText}>{ticket.location}</CustomText>
                                </View>
                             )}

                                <View style={styles.reviewContainer}>
                                    <CustomText style={{...styles.mainText, color: '#000', fontSize: 16}}> {ticket.reviewTitle}</CustomText>
                                    <CustomText style={styles.text}>{ticket.reviewDetails}</CustomText>
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
                onRequestClose={closeModal}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                      <View style={{ backgroundColor: 'white', height: 120, width: 280, padding: 18, borderRadius: 10 }}>
                        <CustomText style={{color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'center', top: 5}}>스토리카드가 앨범에 저장됐어요</CustomText>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }}>
                          <TouchableOpacity onPress={closeModal} style={{ backgroundColor: '#5D70f9', width: 100, padding: 10, borderRadius: 5, marginTop: 5}}>
                            <CustomText style={{ color: 'white', fontWeight: 'bold', textAlign : 'center'}}>확인</CustomText>
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
        fontWeight: 'bold',
    },
    subText: {
        color: '#B6B6B6',
        fontSize: 14,
        fontWeight: 'bold',
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
        fontWeight: 'bold',
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
        top : 160,
        left : 90,
        fontSize : 18,
        color: '#9A9A9A',
    },
});

export default DetailCard;